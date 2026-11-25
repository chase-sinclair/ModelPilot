import { parseJson } from './files.mjs';
import {
  FEED_URL, HOSTS, MAX_DISCOVERY_MODELS, ModelPilotError, SCHEMA_VERSION, digest,
  discoveryKey, isDay, isETag, isIdentifier, isRecord, isText, projectionDigest
} from './schema.mjs';
import { loadLayer, storeLayer, withUpdate } from './state.mjs';

export const MAX_RESPONSE_BYTES = 16 * 1024 * 1024;
export const TIMEOUT_MS = 10_000;

export function projectFeed(payload) {
  if (!isRecord(payload)) throw new ModelPilotError('INVALID_FEED');
  const candidates = new Map();
  const conflicts = new Map();
  for (const provider of Object.values(HOSTS)) {
    const block = payload[provider];
    if (!isRecord(block) || block.id !== provider || !isRecord(block.models)) {
      throw new ModelPilotError('INVALID_FEED');
    }
    for (const [key, record] of Object.entries(block.models)) {
      if (!isIdentifier(key) || !isRecord(record) || !isIdentifier(record.id)) {
        throw new ModelPilotError('INVALID_FEED');
      }
      const identity = { provider, modelId: key };
      const canonical = discoveryKey(identity);
      if (record.id !== key) {
        const claimed = { provider, modelId: record.id };
        conflicts.set(canonical, identity);
        conflicts.set(discoveryKey(claimed), claimed);
        continue;
      }
      if (candidates.has(canonical)) {
        conflicts.set(canonical, identity);
        continue;
      }
      if (!isText(record.name, 120)) throw new ModelPilotError('INVALID_FEED');
      const projected = { ...identity, displayName: record.name };
      if (record.release_date !== undefined) {
        if (!isDay(record.release_date)) throw new ModelPilotError('INVALID_FEED');
        projected.releaseDate = record.release_date;
      }
      candidates.set(canonical, projected);
    }
  }
  const models = [...candidates].filter(([key]) => !conflicts.has(key)).map(([, row]) => row);
  const quarantined = [...conflicts.values()];
  if (!Object.values(HOSTS).every((provider) => models.some((row) => row.provider === provider)) ||
      models.length > MAX_DISCOVERY_MODELS || quarantined.length > MAX_DISCOVERY_MODELS) {
    throw new ModelPilotError('INVALID_FEED');
  }
  return { models, quarantined };
}

async function responseBytes(response) {
  const declared = response.headers.get('content-length');
  const contentType = response.headers.get('content-type') ?? '';
  if (declared && (!/^\d+$/.test(declared) || Number(declared) > MAX_RESPONSE_BYTES)) {
    await response.body?.cancel();
    throw new ModelPilotError('RESPONSE_TOO_LARGE');
  }
  if (!/^application\/json(?:\s*;|$)/i.test(contentType) || !response.body) {
    await response.body?.cancel();
    throw new ModelPilotError('INVALID_FEED');
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of response.body) {
    size += chunk.byteLength;
    if (size > MAX_RESPONSE_BYTES) throw new ModelPilotError('RESPONSE_TOO_LARGE');
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks, size);
}

async function requestFeed(previous, request, now, timeoutMs) {
  const headers = { Accept: 'application/json' };
  if (previous?.source.etag) headers['If-None-Match'] = previous.source.etag;
  try {
    const response = await request(FEED_URL, {
      method: 'GET',
      headers,
      credentials: 'omit',
      redirect: 'manual',
      signal: AbortSignal.timeout(timeoutMs)
    });
    if (response.status === 304) {
      await response.body?.cancel();
      if (!headers['If-None-Match']) throw new ModelPilotError('UNEXPECTED_STATUS');
      return {
        document: { ...previous, source: { ...previous.source, checkedAt: now().toISOString() } },
        status: 'not-modified'
      };
    }
    if (response.status !== 200) {
      await response.body?.cancel();
      throw new ModelPilotError(response.status === 429 ? 'RATE_LIMITED' : 'UNEXPECTED_STATUS');
    }
    const bytes = await responseBytes(response);
    const projection = projectFeed(parseJson(bytes));
    const checkedAt = now().toISOString();
    const source = { url: FEED_URL, fetchedAt: checkedAt, checkedAt, responseSha256: digest(bytes) };
    const etag = response.headers.get('etag');
    if (isETag(etag)) source.etag = etag;
    return {
      document: { schemaVersion: SCHEMA_VERSION, source, ...projection, projectionSha256: projectionDigest(projection) },
      status: 'updated'
    };
  } catch (error) {
    if (error instanceof ModelPilotError) throw error;
    const timeout = error.name === 'TimeoutError' || error.name === 'AbortError';
    throw new ModelPilotError(timeout ? 'REFRESH_TIMEOUT' : 'REFRESH_UNAVAILABLE');
  }
}

export async function refreshDiscovery(layout, { request = fetch, now = () => new Date(), timeoutMs = TIMEOUT_MS } = {}) {
  return withUpdate(layout, 'discovery', async () => {
    const previous = await loadLayer(layout, 'discovery');
    const { document, status } = await requestFeed(previous.document, request, now, timeoutMs);
    await storeLayer(layout, 'discovery', document, previous);
    return {
      status,
      source: document.source.url,
      fetchedAt: document.source.fetchedAt,
      checkedAt: document.source.checkedAt,
      models: document.models.length,
      quarantined: document.quarantined.length
    };
  });
}
