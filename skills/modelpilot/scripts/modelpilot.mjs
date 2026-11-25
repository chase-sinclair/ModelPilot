import { fileURLToPath } from 'node:url';
import { ModelPilotError } from './schema.mjs';
import { importReviewed, installedLayout, loadLayer, readView } from './state.mjs';

const usage = 'Usage: modelpilot.mjs read [cross-host] | refresh | import <guidance|evidence> <absolute-json-path>';
const messages = {
  USAGE: usage,
  INVALID_PATH: 'Use regular local folders and an absolute local path.',
  NOT_INSTALLED: 'Run the helper from a project-local ModelPilot package.',
  INVALID_DATA: 'The data or schema version did not pass validation.',
  INVALID_FEED: 'The Models.dev response did not match the approved projection.',
  INVALID_FILE: 'The local file exceeds the allowed size or changed during reading.',
  UPDATE_BUSY: 'An update for this layer already holds the local lock.',
  RESPONSE_TOO_LARGE: 'The Models.dev response exceeded the size limit.',
  UNEXPECTED_STATUS: 'Models.dev returned an unexpected status or redirect.',
  RATE_LIMITED: 'Models.dev rate-limited this refresh. Retry manually later.',
  REFRESH_TIMEOUT: 'The Models.dev request reached its time limit.',
  REFRESH_UNAVAILABLE: 'The Models.dev request could not complete.',
  FILESYSTEM_UNAVAILABLE: 'A local file operation failed. Check local access and retry if appropriate.'
};

const args = process.argv.slice(2);
const [command, qualifier, input] = args;
let layout;
try {
  if (args.length === 1 && command === '--help') {
    console.log(usage);
  } else {
    const read = command === 'read' && (args.length === 1 || (args.length === 2 && qualifier === 'cross-host'));
    const refresh = command === 'refresh' && args.length === 1;
    const imports = command === 'import' && args.length === 3 && ['guidance', 'evidence'].includes(qualifier);
    if (!read && !refresh && !imports) throw new ModelPilotError('USAGE');
    layout = installedLayout(fileURLToPath(new URL('..', import.meta.url)), process.env.MODELPILOT_STATE_DIR);
    let output;
    if (read) {
      output = await readView(layout, { crossHost: qualifier === 'cross-host' });
    } else if (refresh) {
      const { refreshDiscovery } = await import('./discovery.mjs');
      output = await refreshDiscovery(layout);
    } else {
      output = await importReviewed(layout, qualifier, input);
    }
    console.log(JSON.stringify(output));
  }
} catch (error) {
  const code = error instanceof ModelPilotError ? error.code : 'FILESYSTEM_UNAVAILABLE';
  const report = { error: code, message: messages[code] };
  if (command === 'refresh' && layout) {
    const existing = await loadLayer(layout, 'discovery').catch(() => ({ origin: 'unavailable' }));
    report.discovery = existing.origin;
  }
  console.error(JSON.stringify(report));
  process.exitCode = 1;
}
