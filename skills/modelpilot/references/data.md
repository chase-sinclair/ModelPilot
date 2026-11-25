# ModelPilot local data

Run these commands with Node.js 24 from the installed package. The examples use the Codex project layout. For Claude Code, replace `.agents` with `.claude`.

```powershell
node '.\.agents\skills\modelpilot\scripts\modelpilot.mjs' read
node '.\.agents\skills\modelpilot\scripts\modelpilot.mjs' refresh
node '.\.agents\skills\modelpilot\scripts\modelpilot.mjs' import guidance 'C:\Reviewed\guidance.json'
node '.\.agents\skills\modelpilot\scripts\modelpilot.mjs' import evidence 'C:\Reviewed\evidence.json'
```

`read` takes no task or profile input. Add `cross-host` only for an explicit cross-host request. Guidance and measurements are scoped to that view. Measurements with no exact reviewed host, provider, model and effort match stay out of the view. Discovery reports freshness and counts. Its display names stay out of advisory context.

## State and recovery

State is project-local at `.modelpilot/codex/` or `.modelpilot/claude/` and separate from the installed skill. Keep `.modelpilot/` out of version control. To use an independently writable local volume, set `MODELPILOT_STATE_DIR` to an absolute local base in the process that runs the helper. The host subdirectory is always appended. Use distinct bases for projects that need independent state on the same host.

Discovery is stale after 14 days since its last successful check. Native support, provider guidance and evidence review are each stale after 90 days since their own reviews. Measurements older than 180 days are historical for current recommendations. A fresh check can establish that a feed was reached. It cannot change a measurement date, a native picker confirmation or the age of a source review.

Writes use a validated snapshot and a same-directory temporary file. If the live snapshot is unusable, read the last known good copy when present. A reviewed backup keeps only rows that were previously valid and survived the replacement unchanged, so a withdrawn row stays out of fallback. With no local reviewed state, use the bundled guidance and empty measurement set. An unusable reviewed layer without a valid backup is marked unavailable.

One writer per layer can update a host's state at a time. If an interrupted process leaves a `discovery.lock`, `guidance.lock` or `evidence.lock`, verify the process has ended before removing that exact lock file. Reads ignore locks and incomplete temporary files.

## Trusted replacements

Guidance and evidence are separate complete replacements. Copy the existing rows you intend to keep into your reviewed input before importing. Use UTF-8 JSON, `schemaVersion` 1, known keys and an absolute local file path. A successful import affects just that installation's named layer. To withdraw a record, import a replacement with the record omitted. Source links are citations and the importer never follows them.

- **Guidance.** The [bundled cards](../data/guidance.json) illustrate the format. Match the exact `host`, `provider` and `modelId`. Keep dates and citations for native support and provider guidance in their respective sections.
- **Evidence.** Before import, verify the exact settings and workload, source provenance and permission for your use, including indirect sources. Artificial Analysis remains outside scope. `rights.scope` may be `original`, `personal-use` or `redistributable`, with a short basis. These declarations record the review you performed. Import validation checks structure and scope boundaries.

Evidence shape with a synthetic example

```json
{
  "schemaVersion": 1,
  "measurements": [
    {
      "id": "synthetic-example",
      "configuration": {
        "host": "codex",
        "provider": "openai",
        "modelId": "synthetic-model",
        "effort": "high",
        "clientVersion": "0.166.0"
      },
      "workload": {
        "benchmark": "Example checks",
        "benchmarkVersion": "1",
        "taskSet": "ten synthetic checks",
        "harness": "Example runner",
        "harnessVersion": "1",
        "conditions": "Fixed task set and tool settings"
      },
      "result": { "metric": "passes", "unit": "checks", "value": 8, "denominator": 10 },
      "source": { "title": "Synthetic fixture", "url": "https://example.test/results", "reviewedOn": "2026-11-24" },
      "rights": { "scope": "original", "basis": "Invented data to illustrate this format." },
      "measuredOn": "2026-11-24"
    }
  ]
}
```

## Private eligibility

Confirm the current model and effort and any alternatives in the conversation before invoking ModelPilot. If you maintain a private eligibility note, keep it outside the skill, snapshots and version control. Record the host, exact model ID or picker label, observed effort labels, access constraints and confirmation date. Explicitly designate the exact note for use in the conversation. Reconfirm its entries when account, client or picker options change. The helper does not read a profile or include it in state or refresh requests.
