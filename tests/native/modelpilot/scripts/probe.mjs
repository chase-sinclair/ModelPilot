import { readFileSync } from 'node:fs';

const resource = new URL('../references/probe.txt', import.meta.url);
if (readFileSync(resource, 'utf8').trim() !== 'MP-RESOURCE-4E7B') {
  throw new Error('Native probe resource does not match the fixture.');
}

console.log('MP-NODE-E31C');
