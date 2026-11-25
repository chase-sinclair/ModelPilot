import { open, unlink } from 'node:fs/promises';
import { basename, dirname, isAbsolute, join, relative, sep } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { localPath, plainDirectory, readJson, writeJson } from './files.mjs';
import { HOSTS, ModelPilotError, SCHEMA_VERSION, cardKey, validate } from './schema.mjs';

export const HOST_DIRECTORIES = Object.freeze({ codex: '.agents', claude: '.claude' });
export const REVIEWED_LAYERS = Object.freeze({ guidance: 'cards', evidence: 'measurements' });

export function installedLayout(skillDirectory, stateOverride) {
  const skill = localPath(skillDirectory);
  const skills = dirname(skill);
  const hostDirectory = dirname(skills);
  const host = Object.keys(HOST_DIRECTORIES).find((key) => HOST_DIRECTORIES[key] === basename(hostDirectory));
  if (!host || basename(skill) !== 'modelpilot' || basename(skills) !== 'skills') {
    throw new ModelPilotError('NOT_INSTALLED');
  }
  const stateRoot = localPath(stateOverride ?? join(dirname(hostDirectory), '.modelpilot'));
  const state = join(stateRoot, host);
  const fromSkill = relative(skill, state);
  if (!isAbsolute(fromSkill) && fromSkill !== '..' && !fromSkill.startsWith('..' + sep)) {
    throw new ModelPilotError('INVALID_PATH');
  }
  return { host, skill, state };
}

function layerPath(layout, kind, suffix = '.json') {
  if (kind !== 'discovery' && !Object.hasOwn(REVIEWED_LAYERS, kind)) {
    throw new ModelPilotError('INVALID_DATA');
  }
  return join(layout.state, kind + suffix);
}

async function readSnapshot(path, kind) {
  try {
    return { present: true, document: validate(kind, await readJson(path)) };
  } catch (error) {
    if (error.code === 'ENOENT') return { present: false };
    return { present: true };
  }
}

export async function loadLayer(layout, kind) {
  if (await plainDirectory(layout.state)) {
    const live = await readSnapshot(layerPath(layout, kind), kind);
    if (live.document) return { origin: 'local', document: live.document };
    const backup = await readSnapshot(layerPath(layout, kind, '.last-good.json'), kind);
    if (backup.document) return { origin: 'last-known-good', document: backup.document };
    // A corrupt reviewed file can contain withdrawals. Avoid reviving older seed rows.
    if (live.present || backup.present) return { origin: 'unavailable' };
  }
  if (kind === 'discovery') return { origin: 'not-refreshed' };
  const dataDirectory = join(layout.skill, 'data');
  if (!await plainDirectory(dataDirectory)) return { origin: 'unavailable' };
  const seed = await readSnapshot(join(dataDirectory, kind + '.json'), kind);
  return seed.document ? { origin: 'bundled', document: seed.document } : { origin: 'unavailable' };
}

export async function withUpdate(layout, kind, work) {
  const lockPath = layerPath(layout, kind, '.lock');
  await plainDirectory(layout.state, true);
  let lock;
  try {
    lock = await open(lockPath, 'wx', 0o600);
  } catch (error) {
    if (error.code === 'EEXIST') throw new ModelPilotError('UPDATE_BUSY');
    throw error;
  }
  try {
    await lock.close();
    return await work();
  } finally {
    await unlink(lockPath);
  }
}

export async function storeLayer(layout, kind, next, previous) {
  validate(kind, next);
  let backup = previous.document;
  if (Object.hasOwn(REVIEWED_LAYERS, kind)) {
    const key = REVIEWED_LAYERS[kind];
    // A replacement can withdraw rights, sources or configurations. Only
    // previously validated, unchanged rows may survive as a reviewed fallback.
    const retained = (backup?.[key] ?? []).filter((row) => next[key].some((current) => isDeepStrictEqual(current, row)));
    backup = { schemaVersion: SCHEMA_VERSION, [key]: retained };
  }
  // Update the fallback first. A failed promotion leaves the existing live
  // snapshot readable, with a fallback that cannot reintroduce a withdrawn row.
  if (backup) await writeJson(layerPath(layout, kind, '.last-good.json'), backup);
  await writeJson(layerPath(layout, kind), next);
}

export async function importReviewed(layout, kind, input) {
  if (!Object.hasOwn(REVIEWED_LAYERS, kind)) throw new ModelPilotError('USAGE');
  const path = localPath(input);
  if (!await plainDirectory(dirname(path))) throw new ModelPilotError('INVALID_PATH');
  const document = validate(kind, await readJson(path));
  return withUpdate(layout, kind, async () => {
    const previous = await loadLayer(layout, kind);
    await storeLayer(layout, kind, document, previous);
    return { updated: kind, records: document[REVIEWED_LAYERS[kind]].length };
  });
}

function freshness(date, days, now) {
  const age = (now.valueOf() - Date.parse(date)) / 86_400_000;
  if (age < 0) return 'future';
  return age > days ? 'stale' : 'fresh';
}

export async function readView(layout, { crossHost = false, now = new Date() } = {}) {
  const [discovery, guidance, evidence] = await Promise.all(
    ['discovery', 'guidance', 'evidence'].map((kind) => loadLayer(layout, kind))
  );
  const cards = (guidance.document?.cards ?? []).filter((card) => crossHost || card.host === layout.host);
  const byModel = new Map(cards.map((card) => [cardKey(card), card]));
  const measurements = (evidence.document?.measurements ?? []).filter(({ configuration }) =>
    byModel.get(cardKey(configuration))?.native.efforts.includes(configuration.effort)
  );
  const discoveryStatus = { origin: discovery.origin };
  if (discovery.document) {
    const { source, models, quarantined } = discovery.document;
    const visible = (model) => crossHost || model.provider === HOSTS[layout.host];
    const known = new Set(cards.map(({ provider, modelId }) => provider + '/' + modelId));
    Object.assign(discoveryStatus, {
      source: source.url,
      fetchedAt: source.fetchedAt,
      checkedAt: source.checkedAt,
      freshness: freshness(source.checkedAt, 14, now),
      discoverableOnly: models.filter((model) => visible(model) && !known.has(model.provider + '/' + model.modelId)).length,
      quarantined: quarantined.filter(visible).length
    });
  }
  return {
    schemaVersion: SCHEMA_VERSION,
    host: layout.host,
    discovery: discoveryStatus,
    guidance: {
      origin: guidance.origin,
      cards: cards.map((card) => ({
        ...card,
        nativeFreshness: freshness(card.native.source.reviewedOn, 90, now),
        guidanceFreshness: freshness(card.guidance.source.reviewedOn, 90, now)
      }))
    },
    evidence: {
      origin: evidence.origin,
      measurements: measurements.map((row) => ({
        ...row,
        measurementFreshness: freshness(row.measuredOn, 180, now),
        reviewFreshness: freshness(row.source.reviewedOn, 90, now)
      }))
    }
  };
}
