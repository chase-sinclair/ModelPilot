import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, realpath, readdir, rm, symlink, unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';
import test from 'node:test';
import { MAX_RESPONSE_BYTES, projectFeed, refreshDiscovery } from '../skills/modelpilot/scripts/discovery.mjs';
import { FEED_URL, digest, validate } from '../skills/modelpilot/scripts/schema.mjs';
import { HOST_DIRECTORIES, importReviewed, installedLayout, loadLayer, readView } from '../skills/modelpilot/scripts/state.mjs';

const run = promisify(execFile);
const repo = fileURLToPath(new URL('..', import.meta.url));
const canonical = join(repo, 'skills', 'modelpilot');
const seed = JSON.parse(await readFile(join(canonical, 'data', 'guidance.json'), 'utf8'));
const utf8 = (path) => readFile(path, 'utf8');
const writeJson = (path, value) => writeFile(path, JSON.stringify(value));
const fixtureTime = (day) => () => new Date(day + 'T12:00:00.000Z');
const dayOne = fixtureTime('2026-11-25');
const dayTwo = fixtureTime('2026-11-26');

async function sandbox(t) {
  const parent = await realpath(tmpdir());
  const root = await mkdtemp(join(parent, 'ModelPilot test café & '));
  t.after(async () => {
    const target = await realpath(root);
    assert.equal(target, root);
    assert.equal(dirname(target), parent);
    assert.ok(basename(target).startsWith('ModelPilot test café & '));
    await rm(target, { recursive: true });
  });
  return root;
}

async function runNode(args, cwd, extraEnv = {}) {
  const env = { ...process.env };
  delete env.MODELPILOT_STATE_DIR;
  Object.assign(env, extraEnv);
  try {
    return { code: 0, ...await run(process.execPath, args, { cwd, env, timeout: 20_000 }) };
  } catch (error) {
    if (typeof error.code !== 'number') throw error;
    return { code: error.code, stdout: error.stdout, stderr: error.stderr };
  }
}

async function pack(project, host) {
  const result = await runNode([join(repo, 'scripts', 'package-modelpilot.mjs'), host, project], project);
  assert.equal(result.code, 0, result.stderr);
  return installedLayout(join(project, HOST_DIRECTORIES[host], 'skills', 'modelpilot'));
}

async function setup(t, host = 'codex') {
  const root = await sandbox(t);
  return { root, layout: await pack(root, host) };
}

function helper(layout, ...args) {
  return [join(layout.skill, 'scripts', 'modelpilot.mjs'), ...args];
}

function feed(openai = {}, anthropic = {}) {
  return {
    openai: { id: 'openai', models: {
      'gpt-6.2-sol': { id: 'gpt-6.2-sol', name: 'Fixture Sol', release_date: '2026-11-20' },
      ...openai
    } },
    anthropic: { id: 'anthropic', models: {
      'claude-opus-5-5': { id: 'claude-opus-5-5', name: 'Fixture Opus' },
      ...anthropic
    } }
  };
}

function response(payload = feed(), etag = '"fixture-v1"') {
  return new Response(JSON.stringify(payload), {
    headers: { 'content-type': 'application/json', etag }
  });
}

function measurement(id, effort = 'high') {
  return {
    id,
    configuration: { host: 'codex', provider: 'openai', modelId: 'gpt-6.2-sol', effort, clientVersion: '0.166.0' },
    workload: {
      benchmark: 'Synthetic acceptance checks',
      benchmarkVersion: '1',
      taskSet: 'Original fixtures',
      harness: 'Synthetic runner',
      harnessVersion: '1',
      conditions: 'Ten cases in one fixed harness'
    },
    result: { metric: 'passes', unit: 'checks', value: 8, denominator: 10 },
    source: { title: 'Synthetic test source', url: 'https://example.test/results', reviewedOn: '2026-11-24' },
    rights: { scope: 'original', basis: 'Invented fixture for testing only.' },
    measuredOn: '2026-11-23'
  };
}

test('both project packages reuse one body and can read their own resources from another directory', async (t) => {
  const root = await sandbox(t);
  const codex = await pack(root, 'codex');
  const claude = await pack(root, 'claude');
  const body = await utf8(join(canonical, 'SKILL.md'));
  assert.equal(await utf8(join(codex.skill, 'SKILL.md')), body);
  assert.equal((await utf8(join(claude.skill, 'SKILL.md'))).replace(/disable-model-invocation: true\r?\n/, ''), body);
  assert.match(await utf8(join(codex.skill, 'agents', 'openai.yaml')), /allow_implicit_invocation: false/);
  await assert.rejects(readdir(join(claude.skill, 'agents')), { code: 'ENOENT' });
  const away = join(root, 'unrelated cwd');
  await mkdir(away);
  for (const layout of [codex, claude]) {
    const result = await runNode(helper(layout, 'read'), away);
    assert.equal(result.code, 0, result.stderr);
    const view = JSON.parse(result.stdout);
    const localCards = seed.cards.filter((card) => card.host === layout.host);
    assert.deepEqual(view.guidance.cards.map((card) => card.modelId), localCards.map((card) => card.modelId));
    assert.equal(view.guidance.origin, 'bundled');
    assert.deepEqual(view.evidence.measurements, []);
    const fallback = await utf8(join(layout.skill, 'references', 'fallback.md'));
    for (const card of localCards) {
      assert.ok(fallback.includes(card.modelId) && fallback.includes(card.native.source.reviewedOn));
    }
    await assert.rejects(readdir(layout.state), { code: 'ENOENT' });
  }
  const crossHost = await runNode(helper(claude, 'read', 'cross-host'), away);
  assert.equal(crossHost.code, 0, crossHost.stderr);
  assert.equal(JSON.parse(crossHost.stdout).guidance.cards.length, seed.cards.length);
});

test('packaging refuses to overwrite an existing skill or follow a linked project directory', async (t) => {
  const { root, layout } = await setup(t);
  const entry = join(layout.skill, 'SKILL.md');
  const original = await utf8(entry);
  const script = join(repo, 'scripts', 'package-modelpilot.mjs');
  const existing = await runNode([script, 'codex', root], root);
  assert.equal(existing.code, 1);
  assert.equal(JSON.parse(existing.stderr).error, 'PACKAGE_EXISTS');
  assert.equal(await utf8(entry), original);
  const actual = join(root, 'actual');
  const linked = join(root, 'linked');
  await mkdir(actual);
  await symlink(actual, linked, 'junction');
  const result = await runNode([script, 'codex', linked], root);
  assert.equal(result.code, 1);
  assert.equal(JSON.parse(result.stderr).error, 'INVALID_PATH');
  assert.deepEqual(await readdir(actual), []);
});

test('ordinary read is offline and read-only and excludes private profile and task strings', async (t) => {
  const { root, layout } = await setup(t);
  const marker = join(root, 'egress');
  const guard = join(root, 'intercept.mjs');
  await writeFile(guard, 'import { writeFile } from "node:fs/promises";\n' +
    'globalThis.fetch = async () => { await writeFile(' + JSON.stringify(marker) + ', "egress"); throw Error(); };\n');
  const canary = 'PRIVATE-TEST-CANARY';
  await mkdir(layout.state, { recursive: true });
  const profile = join(layout.state, 'profile.json');
  const sentinel = join(root, 'queued.txt');
  await writeFile(profile, canary);
  await writeFile(sentinel, 'original');
  const result = await runNode(['--import', pathToFileURL(guard).href, ...helper(layout, 'read')], root);
  assert.equal(result.code, 0, result.stderr);
  assert.ok(!result.stdout.includes(canary));
  const invalid = await runNode(helper(layout, 'read', canary), root);
  assert.equal(invalid.code, 1);
  assert.ok(!invalid.stderr.includes(canary));
  await assert.rejects(readFile(marker), { code: 'ENOENT' });
  assert.deepEqual(await readdir(layout.state), ['profile.json']);
  assert.equal(await utf8(profile), canary);
  assert.equal(await utf8(sentinel), 'original');
});

test('reviewed imports are independent, local and suppress evidence without an exact supported configuration', async (t) => {
  const { root, layout } = await setup(t);
  const other = await pack(root, 'claude');
  const input = join(root, 'evidence café & review.json');
  const current = measurement('supported', 'high');
  const mismatch = measurement('discovered-only', 'high');
  mismatch.configuration.modelId = 'synthetic-new';
  await writeJson(input, { schemaVersion: 1, measurements: [current, mismatch] });
  const result = await runNode(helper(layout, 'import', 'evidence', input), root);
  assert.equal(result.code, 0, result.stderr);
  const before = await utf8(join(layout.state, 'evidence.json'));
  const first = await readView(layout, { now: dayOne() });
  assert.deepEqual(first.evidence.measurements.map((row) => row.id), ['supported']);
  assert.equal(first.guidance.origin, 'bundled');

  const guidance = join(root, 'reviewed guidance.json');
  const reviewed = structuredClone(seed);
  reviewed.cards[0].native.efforts = ['low', 'medium'];
  await writeJson(guidance, reviewed);
  await importReviewed(layout, 'guidance', guidance);
  const second = await readView(layout, { now: dayOne() });
  assert.deepEqual(second.evidence.measurements, []);
  assert.equal(second.guidance.origin, 'local');
  assert.equal(await utf8(join(layout.state, 'evidence.json')), before);
  assert.equal((await readView(other)).guidance.origin, 'bundled');
  assert.equal((await readView(other)).evidence.origin, 'bundled');
});

test('schema rejects wrong versions, unsupported effort and rows missing review rights', () => {
  const version = { ...seed, schemaVersion: 99 };
  assert.throws(() => validate('guidance', version), { code: 'INVALID_DATA' });
  const ultra = measurement('unsupported', 'ultra');
  const denied = measurement('restricted');
  denied.source.url = 'https://artificialanalysiscdn.com/report.pdf';
  const wrongHost = measurement('wrongHost');
  wrongHost.configuration.host = 'claude';
  const mistypedHost = measurement('mistypedHost');
  mistypedHost.configuration.host = ['codex'];
  const invalidDenominator = measurement('invalidDenominator');
  invalidDenominator.result.denominator = 0;
  const noRights = measurement('noRights');
  delete noRights.rights;
  for (const row of [ultra, denied, wrongHost, mistypedHost, invalidDenominator, noRights]) {
    assert.throws(() => validate('evidence', { schemaVersion: 1, measurements: [row] }), { code: 'INVALID_DATA' });
  }
});

test('failed trusted import preserves bytes and diagnostic output contains no imported data or path', async (t) => {
  const { root, layout } = await setup(t);
  const path = join(root, 'PRIVATE-PATH.json');
  await writeJson(path, seed);
  await importReviewed(layout, 'guidance', path);
  const file = join(layout.state, 'guidance.json');
  const original = await utf8(file);
  await writeJson(path, { ...seed, privateTask: 'PRIVATE-TASK' });
  const denied = await runNode(helper(layout, 'import', 'guidance', path), root);
  assert.equal(denied.code, 1);
  assert.equal(JSON.parse(denied.stderr).error, 'INVALID_DATA');
  assert.doesNotMatch(denied.stderr, /PRIVATE-PATH|PRIVATE-TASK/);
  assert.equal(await utf8(file), original);
});

test('reviewed fallbacks preserve unchanged rows and never revive a withdrawal', async (t) => {
  const { root, layout } = await setup(t);
  const path = join(root, 'evidence.json');
  const removed = measurement('withdrawn');
  const retained = measurement('kept');
  await writeJson(path, { schemaVersion: 1, measurements: [removed, retained] });
  await importReviewed(layout, 'evidence', path);
  await writeJson(path, { schemaVersion: 1, measurements: [retained] });
  await importReviewed(layout, 'evidence', path);
  await writeFile(join(layout.state, 'evidence.json'), 'interrupted or damaged');
  const view = await readView(layout, { now: dayOne() });
  assert.equal(view.evidence.origin, 'last-known-good');
  assert.deepEqual(view.evidence.measurements.map((row) => row.id), ['kept']);
  await writeJson(path, { ...seed, cards: [] });
  await importReviewed(layout, 'guidance', path);
  await writeFile(join(layout.state, 'guidance.json'), '{');
  assert.deepEqual((await readView(layout)).guidance.cards, []);
  await writeFile(join(layout.state, 'guidance.last-good.json'), '{');
  assert.equal((await readView(layout)).guidance.origin, 'unavailable');
});

test('read-only package can use a separate writable state base and never alters its installed cards', async (t) => {
  const { root, layout } = await setup(t, 'claude');
  const base = join(root, 'separate state');
  const input = join(root, 'review update.json');
  await writeJson(input, seed);
  const cardFile = join(layout.skill, 'data', 'guidance.json');
  const before = await utf8(cardFile);
  const result = await runNode([
    '--permission', '--allow-fs-read=*', '--allow-fs-write=' + base + '*',
    ...helper(layout, 'import', 'guidance', input)
  ], root, { MODELPILOT_STATE_DIR: base });
  assert.equal(result.code, 0, result.stderr);
  assert.equal(await utf8(cardFile), before);
  assert.ok(await utf8(join(base, 'claude', 'guidance.json')));
  await assert.rejects(readdir(layout.state), { code: 'ENOENT' });
});

test('local age checks label guidance and measurements independently of a newer feed check', async (t) => {
  const { root, layout } = await setup(t);
  const path = join(root, 'reviewed.json');
  await writeJson(path, { schemaVersion: 1, measurements: [measurement('historical')] });
  await importReviewed(layout, 'evidence', path);
  const later = fixtureTime('2027-07-01');
  await refreshDiscovery(layout, { request: async () => response(), now: later });
  const view = await readView(layout, { now: later() });
  assert.equal(view.discovery.freshness, 'fresh');
  assert.equal(view.guidance.cards[0].nativeFreshness, 'stale');
  assert.equal(view.evidence.measurements[0].measurementFreshness, 'stale');
  assert.equal(view.evidence.measurements[0].measuredOn, '2026-11-23');
  assert.equal((await readView(layout, { now: fixtureTime('2027-08-01')() })).discovery.freshness, 'stale');
});

test('selected feed fields are projected, conflicting identities quarantined and new models excluded from cards', async (t) => {
  const { layout } = await setup(t);
  const payload = feed({
    'synthetic-new': {
      id: 'synthetic-new', name: 'New discovery', release_date: '2026-11-24',
      description: 'UNAPPROVED_DESCRIPTION', effort: 'max', benchmarks: [123], cost: 369
    },
    'conflict-key': { id: 'wrong-target', name: 'Suspect' },
    'wrong-target': { id: 'wrong-target', name: 'Claimed ID' },
    'CLASH': { id: 'CLASH', name: 'Case one' },
    'clash': { id: 'clash', name: 'Case two' }
  });
  payload.other = { id: 'other', models: { anything: { id: 'anything', name: 'Other' } } };
  const result = await refreshDiscovery(layout, { request: async () => response(payload), now: dayOne });
  assert.equal(result.models, 3);
  assert.equal(result.quarantined, 3);
  const { document } = await loadLayer(layout, 'discovery');
  assert.equal(document.source.responseSha256, digest(JSON.stringify(payload)));
  assert.deepEqual(document.models.find((row) => row.modelId === 'synthetic-new'), {
    provider: 'openai', modelId: 'synthetic-new', displayName: 'New discovery', releaseDate: '2026-11-24'
  });
  assert.doesNotMatch(JSON.stringify(document), /UNAPPROVED_DESCRIPTION|benchmarks|cost|effort/);
  const view = await readView(layout, { now: dayOne() });
  assert.equal(view.discovery.discoverableOnly, 1);
  assert.doesNotMatch(JSON.stringify(view.guidance), /synthetic-new/);
  assert.deepEqual(view.evidence.measurements, []);
});

test('one explicit request sends only fixed public GET metadata and an optional validator', async (t) => {
  const { root, layout } = await setup(t);
  await mkdir(layout.state, { recursive: true });
  await writeFile(join(layout.state, 'profile.json'), 'PRIVATE-PROFILE-CANARY');
  await writeFile(join(root, 'task.txt'), 'PRIVATE-TASK-CANARY');
  const calls = [];
  const request = async (url, options) => {
    calls.push({ url, ...options });
    return calls.length === 1 ? response() : new Response(null, { status: 304 });
  };
  await refreshDiscovery(layout, { request, now: dayOne });
  const original = (await loadLayer(layout, 'discovery')).document;
  const result = await refreshDiscovery(layout, { request, now: dayTwo });
  const updated = (await loadLayer(layout, 'discovery')).document;
  assert.equal(calls.length, 2);
  for (const call of calls) {
    assert.equal(call.url, FEED_URL);
    assert.equal(call.method, 'GET');
    assert.equal(call.redirect, 'manual');
    assert.equal(call.credentials, 'omit');
    assert.ok(!Object.hasOwn(call, 'body'));
  }
  assert.deepEqual(calls[0].headers, { Accept: 'application/json' });
  assert.deepEqual(calls[1].headers, { Accept: 'application/json', 'If-None-Match': '"fixture-v1"' });
  assert.doesNotMatch(JSON.stringify(calls), /PRIVATE-|task.txt|profile.json/);
  assert.equal(result.status, 'not-modified');
  assert.deepEqual(updated, { ...original, source: { ...original.source, checkedAt: dayTwo().toISOString() } });
  assert.equal(await utf8(join(layout.state, 'profile.json')), 'PRIVATE-PROFILE-CANARY');
});

test('refresh rejects malformed feed and projection, redirects, unsolicited 304, rate limit and oversized bodies', async (t) => {
  const { layout } = await setup(t);
  assert.throws(() => projectFeed({ openai: feed().openai }), { code: 'INVALID_FEED' });
  assert.throws(() => projectFeed(feed({ bad: { id: 'bad', name: 'Bad date', release_date: '2026-02-31' } })), { code: 'INVALID_FEED' });
  const cases = [
    ['UNEXPECTED_STATUS', () => new Response(null, { status: 304 })],
    ['UNEXPECTED_STATUS', () => new Response(null, { status: 302, headers: { location: 'https://example.test/redirect' } })],
    ['RATE_LIMITED', () => new Response(null, { status: 429 })],
    ['INVALID_FEED', () => new Response('<html>unapproved</html>', { headers: { 'content-type': 'text/html' } })],
    ['INVALID_DATA', () => new Response('{', { headers: { 'content-type': 'application/json' } })],
    ['RESPONSE_TOO_LARGE', () => new Response(null, { headers: { 'content-length': String(MAX_RESPONSE_BYTES + 1) } })],
    ['RESPONSE_TOO_LARGE', () => new Response(new Uint8Array(MAX_RESPONSE_BYTES + 1), { headers: { 'content-type': 'application/json' } })]
  ];
  for (const [code, makeResponse] of cases) {
    let requests = 0;
    await assert.rejects(refreshDiscovery(layout, { request: async () => {
      requests += 1;
      return makeResponse();
    } }), { code });
    assert.equal(requests, 1);
  }
  assert.equal((await loadLayer(layout, 'discovery')).origin, 'not-refreshed');
  assert.deepEqual(await readdir(layout.state), []);
});

test('a timeout keeps the previous snapshot and a subsequent valid refresh can recover', async (t) => {
  const { layout } = await setup(t);
  await refreshDiscovery(layout, { request: async () => response(), now: dayOne });
  const path = join(layout.state, 'discovery.json');
  const original = await utf8(path);
  const timeout = (_url, { signal }) => new Promise((resolve, reject) => {
    const hold = setTimeout(resolve, 200);
    signal.addEventListener('abort', () => {
      clearTimeout(hold);
      reject(signal.reason);
    }, { once: true });
  });
  await assert.rejects(refreshDiscovery(layout, { request: timeout, timeoutMs: 10 }), { code: 'REFRESH_TIMEOUT' });
  assert.equal(await utf8(path), original);
  await refreshDiscovery(layout, { request: async () => response(feed(), '"fixture-v2"'), now: dayTwo });
  await writeFile(path, '{"schemaVersion":999}');
  await writeFile(join(layout.state, '.discovery.json.interrupted.tmp'), '{}');
  assert.equal((await loadLayer(layout, 'discovery')).origin, 'last-known-good');
  assert.equal((await loadLayer(layout, 'discovery')).document.source.checkedAt, dayOne().toISOString());
  await refreshDiscovery(layout, { request: async () => response(), now: dayTwo });
  assert.equal((await loadLayer(layout, 'discovery')).origin, 'local');
});

test('an update in progress leaves the active snapshot readable and rejects a second writer', async (t) => {
  const { layout } = await setup(t);
  await refreshDiscovery(layout, { request: async () => response(), now: dayOne });
  const began = Promise.withResolvers();
  const finish = Promise.withResolvers();
  const first = refreshDiscovery(layout, {
    request: async () => {
      began.resolve();
      await finish.promise;
      return response();
    },
    now: dayTwo
  });
  await began.promise;
  try {
    assert.equal((await loadLayer(layout, 'discovery')).document.source.checkedAt, dayOne().toISOString());
    await assert.rejects(refreshDiscovery(layout, { request: () => assert.fail('concurrent GET') }), { code: 'UPDATE_BUSY' });
  } finally {
    finish.resolve();
    await first;
  }
  assert.equal((await loadLayer(layout, 'discovery')).document.source.checkedAt, dayTwo().toISOString());
  assert.deepEqual((await readdir(layout.state)).sort(), ['discovery.json', 'discovery.last-good.json']);
});

test('blocked writes and linked state fail locally and preserve unrelated files', async (t) => {
  const { root, layout } = await setup(t);
  const input = join(root, 'review.json');
  await writeJson(input, seed);
  await importReviewed(layout, 'guidance', input);
  const path = join(layout.state, 'guidance.json');
  const original = await utf8(path);
  const denied = await runNode(['--permission', '--allow-fs-read=*', ...helper(layout, 'import', 'guidance', input)], root);
  assert.equal(denied.code, 1);
  assert.equal(JSON.parse(denied.stderr).error, 'FILESYSTEM_UNAVAILABLE');
  assert.equal(await utf8(path), original);

  const other = join(root, 'unrelated');
  await mkdir(other);
  const sentinel = join(other, 'sentinel.txt');
  await writeFile(sentinel, 'preserve');
  const linked = join(root, 'linked state');
  await symlink(other, linked, 'junction');
  const bad = { ...layout, state: join(linked, 'codex') };
  await assert.rejects(refreshDiscovery(bad, { request: () => assert.fail('linked-state GET') }), { code: 'INVALID_PATH' });
  assert.deepEqual(await readdir(other), ['sentinel.txt']);
  assert.equal(await utf8(sentinel), 'preserve');
  await unlink(join(layout.state, 'guidance.last-good.json'));
  await mkdir(join(layout.state, 'guidance.last-good.json'));
  await assert.rejects(importReviewed(layout, 'guidance', input), { code: 'INVALID_PATH' });
  assert.equal(await utf8(path), original);
});

test('live Models.dev GET from both standalone packages', { skip: process.env.MODELPILOT_LIVE_TEST !== '1' }, async (t) => {
  const root = await sandbox(t);
  for (const host of ['codex', 'claude']) {
    const layout = await pack(root, host);
    const result = await runNode(helper(layout, 'refresh'), root);
    assert.equal(result.code, 0, result.stderr);
    const metadata = JSON.parse(result.stdout);
    assert.equal(metadata.status, 'updated');
    assert.equal(metadata.source, FEED_URL);
    const state = await loadLayer(layout, 'discovery');
    assert.equal(state.origin, 'local');
    for (const card of seed.cards) {
      assert.ok(state.document.models.some((model) => model.provider === card.provider && model.modelId === card.modelId));
    }
    t.diagnostic(host + ' retained ' + metadata.models + ' discovery identities and quarantined ' + metadata.quarantined);
  }
});
