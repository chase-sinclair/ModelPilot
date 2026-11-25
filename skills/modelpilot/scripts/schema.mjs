import { createHash } from 'node:crypto';

export const HOSTS = Object.freeze({ codex: 'openai', claude: 'anthropic' });
export const EFFORTS = Object.freeze(['low', 'medium', 'high', 'xhigh', 'max']);
export const FEED_URL = 'https://models.dev/api.json';
export const SCHEMA_VERSION = 1;
export const MAX_LOCAL_BYTES = 1024 * 1024;
export const MAX_DISCOVERY_MODELS = 2048;

const providers = Object.values(HOSTS);
const identifier = /^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,119}$/;
const version = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z.-]+)?$/;
const hash = /^[0-9a-f]{64}$/;

export class ModelPilotError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

export function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function isIdentifier(value) {
  return typeof value === 'string' && identifier.test(value);
}

export function isText(value, maxLength) {
  return typeof value === 'string' && value.length <= maxLength &&
    value.trim().length > 0 && !/[\p{Cc}\p{Cf}]/u.test(value);
}

export function isDay(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const instant = new Date(value + 'T00:00:00.000Z');
  return !Number.isNaN(instant.valueOf()) && instant.toISOString().slice(0, 10) === value;
}

export function isETag(value) {
  return typeof value === 'string' && /^(?:W\/)?"[A-Za-z0-9._:+/=\-]{1,128}"$/.test(value);
}

export function digest(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

export function projectionDigest({ models, quarantined }) {
  return digest(JSON.stringify({ models, quarantined }));
}

export function cardKey({ host, provider, modelId }) {
  return [host, provider, modelId].join('/');
}

function requireData(condition) {
  if (!condition) throw new ModelPilotError('INVALID_DATA');
}

function fields(value, required, optional = []) {
  requireData(isRecord(value));
  requireData(required.every((key) => Object.hasOwn(value, key)));
  requireData(Object.keys(value).every((key) => required.includes(key) || optional.includes(key)));
}

function list(value, limit) {
  requireData(Array.isArray(value) && value.length <= limit);
}

function unique(records, key) {
  requireData(new Set(records.map(key)).size === records.length);
}

function identity({ host, provider, modelId }) {
  requireData(typeof host === 'string' && Object.hasOwn(HOSTS, host) && HOSTS[host] === provider && isIdentifier(modelId));
}

function source(value) {
  fields(value, ['title', 'url', 'reviewedOn']);
  requireData(isText(value.title, 120) && isText(value.url, 512) && isDay(value.reviewedOn));
  let url;
  try {
    url = new URL(value.url);
  } catch {
    throw new ModelPilotError('INVALID_DATA');
  }
  requireData(url.protocol === 'https:' && !url.username && !url.password && !url.search);
  const excludedSource = /(?:^|\.)artificialanalysis(?:cdn)?\./i;
  requireData(!excludedSource.test(url.hostname));
}

function guidance(document) {
  fields(document, ['schemaVersion', 'cards']);
  list(document.cards, 32);
  for (const card of document.cards) {
    fields(card, ['host', 'provider', 'modelId', 'label', 'native', 'guidance']);
    identity(card);
    requireData(isText(card.label, 120));
    fields(card.native, ['minimumClient', 'efforts', 'source']);
    requireData(isText(card.native.minimumClient, 48) && version.test(card.native.minimumClient));
    list(card.native.efforts, EFFORTS.length);
    requireData(card.native.efforts.length > 0 && card.native.efforts.every((effort) => EFFORTS.includes(effort)));
    unique(card.native.efforts, (effort) => effort);
    fields(card.guidance, ['fit', 'effort', 'source']);
    requireData(isText(card.guidance.fit, 360) && isText(card.guidance.effort, 360));
    source(card.native.source);
    source(card.guidance.source);
  }
  unique(document.cards, (card) => cardKey(card).toLowerCase());
}

function evidence(document) {
  fields(document, ['schemaVersion', 'measurements']);
  list(document.measurements, 40);
  for (const row of document.measurements) {
    fields(row, ['id', 'configuration', 'workload', 'result', 'source', 'rights', 'measuredOn']);
    requireData(isIdentifier(row.id) && isDay(row.measuredOn));
    fields(row.configuration, ['host', 'provider', 'modelId', 'effort', 'clientVersion']);
    identity(row.configuration);
    requireData(EFFORTS.includes(row.configuration.effort));
    requireData(isText(row.configuration.clientVersion, 48) && version.test(row.configuration.clientVersion));
    const workloadFields = ['benchmark', 'benchmarkVersion', 'taskSet', 'harness', 'harnessVersion', 'conditions'];
    fields(row.workload, workloadFields);
    requireData(workloadFields.every((key) => isText(row.workload[key], 240)));
    fields(row.result, ['metric', 'unit', 'value', 'denominator']);
    requireData(isText(row.result.metric, 100) && isText(row.result.unit, 60) && Number.isFinite(row.result.value));
    requireData(Number.isSafeInteger(row.result.denominator) && row.result.denominator > 0);
    source(row.source);
    requireData(row.measuredOn <= row.source.reviewedOn);
    fields(row.rights, ['scope', 'basis']);
    requireData(['personal-use', 'redistributable', 'original'].includes(row.rights.scope));
    requireData(isText(row.rights.basis, 360));
  }
  unique(document.measurements, (row) => row.id.toLowerCase());
}

function isInstant(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) return false;
  const instant = new Date(value);
  return !Number.isNaN(instant.valueOf()) && instant.toISOString() === value;
}

export function discoveryKey({ provider, modelId }) {
  return provider + '/' + modelId.toLowerCase();
}

function discovery(document) {
  fields(document, ['schemaVersion', 'source', 'models', 'quarantined', 'projectionSha256']);
  const origin = document.source;
  fields(origin, ['url', 'fetchedAt', 'checkedAt', 'responseSha256'], ['etag']);
  requireData(origin.url === FEED_URL && typeof origin.responseSha256 === 'string' && hash.test(origin.responseSha256));
  requireData(isInstant(origin.fetchedAt) && isInstant(origin.checkedAt) && origin.checkedAt >= origin.fetchedAt);
  requireData(!Object.hasOwn(origin, 'etag') || isETag(origin.etag));
  list(document.models, MAX_DISCOVERY_MODELS);
  list(document.quarantined, MAX_DISCOVERY_MODELS);
  for (const model of document.models) {
    fields(model, ['provider', 'modelId', 'displayName'], ['releaseDate']);
    requireData(providers.includes(model.provider) && isIdentifier(model.modelId) && isText(model.displayName, 120));
    requireData(!Object.hasOwn(model, 'releaseDate') || isDay(model.releaseDate));
  }
  for (const model of document.quarantined) {
    fields(model, ['provider', 'modelId']);
    requireData(providers.includes(model.provider) && isIdentifier(model.modelId));
  }
  requireData(providers.every((provider) => document.models.some((model) => model.provider === provider)));
  unique([...document.models, ...document.quarantined], discoveryKey);
  requireData(document.projectionSha256 === projectionDigest(document));
}

const validators = { guidance, evidence, discovery };

export function validate(kind, document) {
  requireData(isRecord(document) && document.schemaVersion === SCHEMA_VERSION);
  requireData(Object.hasOwn(validators, kind));
  validators[kind](document);
  return document;
}
