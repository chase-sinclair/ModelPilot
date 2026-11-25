import { constants } from 'node:fs';
import { lstat, mkdir, open, rename, unlink } from 'node:fs/promises';
import { basename, dirname, isAbsolute, join, parse, resolve, sep } from 'node:path';
import { randomUUID } from 'node:crypto';
import { MAX_LOCAL_BYTES, ModelPilotError } from './schema.mjs';

export function localPath(value) {
  if (typeof value !== 'string' || !isAbsolute(value) || /[\x00-\x1f\x7f]/.test(value)) {
    throw new ModelPilotError('INVALID_PATH');
  }
  // Exclude UNC paths, Windows device paths and alternate data streams.
  if (process.platform === 'win32' && (!/^[a-z]:[\\/]/i.test(value) || value.slice(2).includes(':'))) {
    throw new ModelPilotError('INVALID_PATH');
  }
  return resolve(value);
}

export async function entryIfPresent(path) {
  try {
    return await lstat(path);
  } catch (error) {
    if (error.code === 'ENOENT') return undefined;
    throw error;
  }
}

export async function plainDirectory(path, create = false) {
  const directory = localPath(path);
  const root = parse(directory).root;
  let current = root;
  for (const part of directory.slice(root.length).split(sep).filter(Boolean)) {
    current = join(current, part);
    let entry = await entryIfPresent(current);
    if (!entry && create) {
      try {
        await mkdir(current, { mode: 0o700 });
      } catch (error) {
        if (error.code !== 'EEXIST') throw error;
      }
      entry = await entryIfPresent(current);
    }
    if (!entry) return false;
    if (!entry.isDirectory() || entry.isSymbolicLink()) throw new ModelPilotError('INVALID_PATH');
  }
  return true;
}

function requireRegular(entry) {
  if (entry && (!entry.isFile() || entry.isSymbolicLink())) {
    throw new ModelPilotError('INVALID_PATH');
  }
}

export async function readBounded(path, limit = MAX_LOCAL_BYTES) {
  requireRegular(await lstat(path));
  const file = await open(path, constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0));
  try {
    const info = await file.stat();
    if (!info.isFile() || info.size > limit) throw new ModelPilotError('INVALID_FILE');
    const bytes = Buffer.alloc(info.size + 1);
    let offset = 0;
    while (offset < bytes.length) {
      const { bytesRead } = await file.read(bytes, offset, bytes.length - offset, null);
      if (bytesRead === 0) break;
      offset += bytesRead;
    }
    if (offset !== info.size) throw new ModelPilotError('INVALID_FILE');
    return bytes.subarray(0, offset);
  } finally {
    await file.close();
  }
}

export function parseJson(bytes) {
  try {
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
  } catch {
    throw new ModelPilotError('INVALID_DATA');
  }
}

export async function readJson(path) {
  return parseJson(await readBounded(path));
}

export async function writeJson(path, document) {
  requireRegular(await entryIfPresent(path));
  const bytes = Buffer.from(JSON.stringify(document, null, 2) + '\n');
  if (bytes.length > MAX_LOCAL_BYTES) throw new ModelPilotError('INVALID_FILE');
  const pending = join(dirname(path), '.' + basename(path) + '.' + randomUUID() + '.tmp');
  const file = await open(pending, 'wx', 0o600);
  let promoted = false;
  try {
    try {
      await file.writeFile(bytes);
      await file.sync();
    } finally {
      await file.close();
    }
    requireRegular(await entryIfPresent(path));
    await rename(pending, path);
    promoted = true;
  } finally {
    if (!promoted) await unlink(pending);
  }
}
