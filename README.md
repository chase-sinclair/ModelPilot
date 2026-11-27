# ModelPilot

ModelPilot advises on which model or reasoning effort to use for work already discussed in Codex or Claude Code. It uses reviewed local cards and your confirmed options. You make any setting change and request the work separately.

Personal V1 passed helper-backed native acceptance in local Windows Codex Desktop and Claude Code Terminal. Local Claude Desktop Code 6.28899.6 passed as an additional compatibility surface. Standalone Codex CLI compatibility is deferred. [Acceptance results](docs/ModelPilot-V1-Native-Acceptance.md) · [Release status](docs/ModelPilot-V1-Release-Candidate.md)

## Project-local installation

Use Node.js 24. From the ModelPilot checkout, run the command for your client with the absolute path to an existing project on a local volume. Claude Code Terminal and Claude Desktop Code use the same Claude package when opened on the same project.

```powershell
node scripts/package-modelpilot.mjs codex 'C:\work\codex-project'
node scripts/package-modelpilot.mjs claude 'C:\work\claude-project'
```

The builder installs into `.agents/skills/modelpilot` for Codex or `.claude/skills/modelpilot` for Claude. Each copy includes the instructions, cards, helper and notices. The builder refuses an existing target. Verify the installation from the matching project root. The helper should return JSON with `host` set to `codex` or `claude`.

```powershell
Set-Location -LiteralPath 'C:\work\codex-project'
node '.\.agents\skills\modelpilot\scripts\modelpilot.mjs' read

Set-Location -LiteralPath 'C:\work\claude-project'
node '.\.claude\skills\modelpilot\scripts\modelpilot.mjs' read
```

Open the installed project in a fresh local Codex Desktop chat, start `claude` in the project root for Terminal, or open that folder in a local Code session in Claude Desktop. Select ModelPilot explicitly. For helper-backed advice, approve the exact packaged `read` command for that action only when prompted.

To update, close the project's active sessions, verify the exact installed `modelpilot` directory, and move that folder to an unused backup location outside skill discovery. Build from the new checkout, then verify `read` with the same state base and reopen the project. Restore the backup to its original path if the target is empty after a failed update. To uninstall, close the sessions and move the installed folder out of skill discovery. Keep the separate `.modelpilot/` state or your override and any eligibility note if you want to use them again. [State and recovery](skills/modelpilot/references/data.md#state-and-recovery)

## Invocation

Queue the work and its acceptance conditions in an ordinary turn. Confirm your current model and effort and any options you want considered. In the same chat, invoke the installed skill with a short qualifier.

| Intent | Codex | Claude Code |
|---|---|---|
| Assess the discussed task | Select `$modelpilot` | `/modelpilot` |
| Consider the next agreed task | `$modelpilot next` | `/modelpilot next` |
| Keep the model and advise on effort | `$modelpilot effort` | `/modelpilot effort` |
| Compare options on the current host | `$modelpilot compare` | `/modelpilot compare` |
| Compare confirmed options across hosts | `$modelpilot global` | `/modelpilot global` |
| Request native discovery refresh (compatibility pending) | `$modelpilot refresh` | `/modelpilot refresh` |

On Codex, select the native skill and append the qualifier. On Claude, enter the entire command before sending. Keep the invocation to the request for advice or refresh. The probe's mixed advice-and-edit failures are documented. A separate ordinary request authorizes the queued work after you choose your settings. [Native feasibility results](docs/ModelPilot-Native-Feasibility.md)

Use the client's session controls for a trial and keep the prior pair for rollback. In Claude Code Terminal, use the session-only picker key (`s` by default). Enter or a typed ordinary effort level can save a default. Verify the picker scope on your build and check the effective setting before using it. [Reviewed controls by client](skills/modelpilot/SKILL.md#applying-a-trial)

## Intelligence and updates

The bundled review covers GPT-6.2 Sol and Astra on Codex and Claude Opus 5.5 and Sonnet 5.5 on Claude Code. Cards cite native support and provider guidance with separate review dates. Confirm what your picker actually offers. The initial catalog has no admitted matched native Windows performance measurements. Advice can suggest a reversible trial and a check, with uncertainty where appropriate. [Coverage and permissions](catalog/coverage.md)

Advice checks local freshness and uses local data. Denying the helper can end the advisory turn, as observed in Claude Code Terminal. If the host keeps the turn active and permits the bundled read, ModelPilot can use the dated cards and must disclose that local updates and withdrawals could not be checked. Verify local state before acting on advice that depends on it. [Denied-helper result](docs/ModelPilot-V1-Native-Acceptance.md#fallback-limitation)

Picker eligibility, provider guidance and performance evidence keep their own sources and update paths. Use trusted local imports to replace evidence or reviewed host guidance independently. Keep `.modelpilot/` and private eligibility notes out of version control. [Update commands, state and fallback](skills/modelpilot/references/data.md)

### Review discovered models

Explicit refresh sends one key-free GET to Models.dev and stores the permitted discovery projection. The V1 lifecycle workflow uses the [installed helper in your own terminal](skills/modelpilot/references/data.md). Native `refresh` invocation is a separate compatibility check. After a successful refresh, run this in your own PowerShell from the project root to list exact IDs missing a reviewed card. For Claude, use `.claude` in the helper path, `claude` in the state path and `anthropic` for the provider. If you use a state override, use its host subdirectory for `$state`.

```powershell
$state = '.\.modelpilot\codex'
$view = node '.\.agents\skills\modelpilot\scripts\modelpilot.mjs' read | ConvertFrom-Json
$reviewedIds = @($view.guidance.cards | ForEach-Object { $_.modelId })
$projection = Get-Content -LiteralPath (Join-Path $state 'discovery.json') -Raw | ConvertFrom-Json
$projection.models |
    Where-Object { $_.provider -ceq 'openai' -and $_.modelId -cnotin $reviewedIds } |
    Sort-Object modelId | Select-Object provider, modelId, releaseDate
```

The count is a review backlog. For additions since a previous refresh, compare exact provider and model IDs with your earlier list or the previous projection in `discovery.last-good.json` immediately after a changed refresh. Another successful check can advance that backup. Keep the list in your review workflow and verify native support and picker eligibility separately.

## Verification

```powershell
node --test tests/modelpilot.test.mjs
```

The default suite runs offline and generates disposable copies of both packages. To opt in to one Models.dev GET from each copy, set `MODELPILOT_LIVE_TEST` to `1` for the test process and add `--test-name-pattern 'live Models.dev GET'` before the test file. [Milestone status and native acceptance requirements](docs/ModelPilot-Implementation-Plan.md#6-current-decision-and-handoff)
