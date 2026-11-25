# ModelPilot

ModelPilot advises on which model or reasoning effort to use for work already discussed in Codex or Claude Code. It uses reviewed local cards and your confirmed options. You make any setting change and request the work separately.

## Project-local installation

Use Node.js 24 and existing project directories on a local volume. From this checkout, build the package for the client you want to use.

```powershell
node scripts/package-modelpilot.mjs codex 'C:\work\codex-project'
node scripts/package-modelpilot.mjs claude 'C:\work\claude-project'
```

The builder installs into `.agents/skills/modelpilot` for Codex or `.claude/skills/modelpilot` for Claude Code. Each copy contains its own instructions, cards, helper and notices. The builder refuses an existing target. Open the project in the corresponding native client and select ModelPilot explicitly. The package needs Node for updates and the local helper. It includes [dated offline cards](skills/modelpilot/references/fallback.md) for advisory use when the helper is unavailable.

## Invocation

Queue the work and its acceptance conditions in an ordinary turn. Confirm your current model and effort and any options you want considered. In the same chat, invoke the installed skill with a short qualifier.

| Intent | Codex | Claude Code |
|---|---|---|
| Assess the discussed task | Select `$modelpilot` | `/modelpilot` |
| Consider the next agreed task | `$modelpilot next` | `/modelpilot next` |
| Keep the model and advise on effort | `$modelpilot effort` | `/modelpilot effort` |
| Compare options on the current host | `$modelpilot compare` | `/modelpilot compare` |
| Compare confirmed options across hosts | `$modelpilot global` | `/modelpilot global` |
| Update discovery metadata | `$modelpilot refresh` | `/modelpilot refresh` |

On Codex, select the native skill and append the qualifier. On Claude, enter the entire command before sending. Keep the invocation to the request for advice or refresh. The probe's mixed advice-and-edit failures are documented. A separate ordinary request authorizes the queued work after you choose your settings. [Native feasibility results](docs/ModelPilot-Native-Feasibility.md)

## Intelligence and updates

The bundled review covers GPT-6.2 Sol and Astra on Codex and Claude Opus 5.5 and Sonnet 5.5 on Claude Code. Cards cite native support and provider guidance with separate review dates. Confirm what your picker actually offers. The initial catalog has no admitted matched native Windows performance measurements. Advice can suggest a reversible trial and a check, with uncertainty where appropriate. [Coverage and permissions](catalog/coverage.md)

Advice checks local freshness and uses local data. Explicit refresh sends one key-free GET to Models.dev and stores only the permitted discovery projection. It can find identities for later review. Picker eligibility, provider guidance and performance evidence keep their own sources and update paths. Use trusted local imports to replace evidence or reviewed host guidance independently. Keep `.modelpilot/` and private eligibility notes out of version control. [Update commands, state and fallback](skills/modelpilot/references/data.md)

## Verification

```powershell
node --test tests/modelpilot.test.mjs
```

The default suite runs offline and generates disposable copies of both packages. To opt in to one Models.dev GET from each copy, set `MODELPILOT_LIVE_TEST` to `1` for the test process and add `--test-name-pattern 'live Models.dev GET'` before the test file. [Milestone status and native acceptance requirements](docs/ModelPilot-Implementation-Plan.md#6-current-decision-and-handoff)
