import { mkdir, open, rename, rmdir, unlink } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { entryIfPresent, localPath, plainDirectory, readBounded } from '../skills/modelpilot/scripts/files.mjs';
import { ModelPilotError, digest } from '../skills/modelpilot/scripts/schema.mjs';
import { HOST_DIRECTORIES } from '../skills/modelpilot/scripts/state.mjs';

const canonical = fileURLToPath(new URL('../skills/modelpilot/', import.meta.url));
const files = [
  'data/evidence.json',
  'data/guidance.json',
  'licenses/Codex-Apache-2.0.txt',
  'licenses/Codex-NOTICE.txt',
  'licenses/Models.dev-MIT.txt',
  'licenses/README.md',
  'references/data.md',
  'references/fallback.md',
  'scripts/discovery.mjs',
  'scripts/files.mjs',
  'scripts/modelpilot.mjs',
  'scripts/schema.mjs',
  'scripts/state.mjs',
  'SKILL.md'
];

async function packageFor(host, projectDirectory) {
  const project = localPath(projectDirectory);
  if (!await plainDirectory(project)) throw new ModelPilotError('INVALID_PATH');
  const destination = join(project, HOST_DIRECTORIES[host], 'skills', 'modelpilot');
  const contents = new Map();
  for (const name of files) {
    const source = join(canonical, name);
    if (!await plainDirectory(dirname(source))) throw new ModelPilotError('INVALID_PATH');
    contents.set(name, await readBounded(source));
  }
  const skill = contents.get('SKILL.md').toString('utf8');
  const nameLine = /^(---\r?\nname: modelpilot)(\r?\n)/;
  if (!nameLine.test(skill)) throw new ModelPilotError('INVALID_SKILL');
  contents.delete('SKILL.md');
  if (host === 'codex') {
    contents.set('agents/openai.yaml', Buffer.from('policy:\n  allow_implicit_invocation: false\n'));
  }
  const entry = host === 'claude' ? skill.replace(nameLine, '$1$2disable-model-invocation: true$2') : skill;
  // Write the discoverable entry point after the support files are present.
  contents.set('SKILL.md', Buffer.from(entry));

  await plainDirectory(dirname(destination), true);
  try {
    await mkdir(destination, { mode: 0o700 });
  } catch (error) {
    if (error.code === 'EEXIST') throw new ModelPilotError('PACKAGE_EXISTS');
    throw error;
  }
  const directories = [];
  const installed = [];
  try {
    for (const name of new Set([...contents.keys()].map(dirname))) {
      if (name === '.') continue;
      const directory = join(destination, name);
      await mkdir(directory);
      directories.push(directory);
    }
    for (const [name, bytes] of contents) {
      const target = join(destination, name === 'SKILL.md' ? '.SKILL.md.pending' : name);
      const file = await open(target, 'wx');
      installed.push(target);
      try {
        await file.writeFile(bytes);
      } finally {
        await file.close();
      }
      if (digest(await readBounded(target)) !== digest(bytes)) throw new ModelPilotError('VERIFY_FAILED');
    }
    const entryPath = join(destination, 'SKILL.md');
    if (await entryIfPresent(entryPath)) throw new ModelPilotError('PACKAGE_EXISTS');
    await rename(join(destination, '.SKILL.md.pending'), entryPath);
  } catch (error) {
    // Remove only entries written by this attempt, leaving foreign entries alone.
    for (const target of installed.reverse()) await unlink(target).catch(() => {});
    for (const directory of directories.reverse()) await rmdir(directory).catch(() => {});
    await rmdir(destination).catch(() => {});
    throw error;
  }
  return { host, installed: HOST_DIRECTORIES[host] + '/skills/modelpilot', files: contents.size };
}

try {
  const args = process.argv.slice(2);
  const [host, project] = args;
  if (args.length !== 2 || !Object.hasOwn(HOST_DIRECTORIES, host)) {
    throw new ModelPilotError('USAGE');
  }
  console.log(JSON.stringify(await packageFor(host, project)));
} catch (error) {
  const code = error instanceof ModelPilotError ? error.code : 'PACKAGE_FAILED';
  const messages = {
    USAGE: 'Usage: node scripts/package-modelpilot.mjs <codex|claude> <absolute-project-directory>',
    INVALID_PATH: 'Use an existing, regular local project directory and a regular source tree.',
    INVALID_SKILL: 'The canonical entry is missing its expected skill name.',
    PACKAGE_EXISTS: 'The target skill directory already exists. Choose a fresh project or a verified empty target.',
    VERIFY_FAILED: 'The packaged files did not match their source bytes.',
    PACKAGE_FAILED: 'The package could not be prepared. Check local file access and the target.'
  };
  console.error(JSON.stringify({ error: code, message: messages[code] }));
  process.exitCode = 1;
}
