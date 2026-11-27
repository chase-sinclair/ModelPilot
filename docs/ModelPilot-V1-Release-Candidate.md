# ModelPilot personal V1 release candidate

**November 27, 2026.** The owner deferred Batch 2 and approved focused refinements after the [exploratory Batch 1 results](ModelPilot-Comparative-Evaluation-Batch-1.md). The canonical skill now gives manual session controls, a visible exact source URL with its review date, and a short recommendation with a reversible trial and verification trigger. Native model details are optional and use their own dated citation. The two Claude native source URLs now point to the model configuration page that covers both effort support and minimum builds. The packaged helper, data schemas, discovery allowlist and empty measurement set are unchanged.

## Proposed V1 support

| Area | Release scope and evidence |
|---|---|
| Primary clients | Local Codex Desktop and Claude Code Terminal on Windows. Both ran native `effort` and `compare` with complete helper output on the Batch 1 pin. Candidate regression checks below are pending. |
| Compatibility | Local Claude Desktop Code requires its dated link and manual-action check below. Standalone Codex CLI is deferred. No additional client installation is needed for personal V1. |
| Advice | Explicit invocation in the same chat as queued work, including `effort`, `compare`, `next` and `global`. Honor confirmed options and make manual, qualitative recommendations. Verify `next`, explicit cross-host scope and unconfirmed eligibility below. Denied-helper fallback requires its own observed pass. |
| Data and installation | Owner-run packaged `refresh` and reviewed `import`, 14/90/180-day freshness checks, last-known-good recovery, separate writable state, and project-local install, replacement and uninstall. The deterministic checks are covered offline. Native `refresh` is an implemented shortcut with its own pending permission and routing check. For V1, use the owner-run command. |

The release claim is observed advisory behavior under the supported invocation, with the earlier conflicting-input failures retained. Batch 1 did not measure downstream quality, general latency or subscription savings. [Stress-test results](ModelPilot-Native-Feasibility.md) · [Data and installation commands](../README.md)

## Session controls reviewed November 27

- **Codex Desktop.** `/model` and `/reasoning` are documented for the current chat. The composer picker selects a pair, and shared configuration sets saved defaults. Verify the action on the installed build before treating the composer picker itself as session-only. [Current-chat commands](https://learn.chatgpt.com/docs/reference/slash-commands) · [Composer and defaults](https://learn.chatgpt.com/docs/models)
- **Claude Code Terminal.** The picker’s session-only key is `s` by default. For Low through Extra High, a typed `/effort` level or Enter saves the effort default for that model. The effort picker’s session-only action requires v2.1.257 or later. Enter or a typed model saves the model default. Launch flags are session-scoped, and environment overrides can outrank the picker. [Model controls](https://code.claude.com/docs/en/model-config#setting-your-model) · [Effort controls](https://code.claude.com/docs/en/model-config#adjust-effort-level)
- **Claude Desktop Code.** Anthropic documents the native model and Effort picker. Verify whether your build exposes session-only scope before applying a trial. The Terminal picker keys and persistence rules do not establish Desktop behavior. [Desktop controls](https://code.claude.com/docs/en/desktop)

## Verification without inference

On Windows with Node 24.14.0, the default `node --test tests/modelpilot.test.mjs` suite passed 17 tests with one opt-in live test skipped. The skill validator passed. The suite checks both installed layouts, host scoping, offline read-only advice data, the discovery field allowlist, reviewed imports, stale data and independent writable state. The candidate adds an installed `refresh` recovery case with simulated fetch and an update and uninstall case for both hosts that preserves reviewed state and neighboring skills. The same helper already passed the Milestone 2 live installed-package GET on both hosts. [Offline suite](../tests/modelpilot.test.mjs) · [Earlier integration result](ModelPilot-Implementation-Plan.md#milestone-2--functional-skill-and-explicit-refresh)

The supported lifecycle takes no model submissions. Run `node "<installed helper>" refresh` yourself from a terminal in the native project when wanted, with one key-free GET to `https://models.dev/api.json`. Run approved local imports from the same terminal. A separate `MODELPILOT_STATE_DIR` base in that process scopes writes away from a read-only package. The default suite induces failures on disposable snapshots. Keep native advice fixtures at their recorded baseline throughout collection. A native `refresh` shortcut test would add one separately authorized submission and one permitted GET per host tested. [Refresh, import and recovery](../skills/modelpilot/references/data.md)

## Preflight after separate approval

Use the staged projects under `%USERPROFILE%\Documents\ModelPilot V1 Acceptance\<candidate-short>`. Confirm the full candidate commit in the baseline and retain a copy of the original audit and manifest hashes. The audit files sit alongside the three projects. Keep the earlier feasibility, native acceptance and Batch 1 installations intact.

| Folder under the candidate root | Installed directory | Owner audit case |
|---|---|---|
| `Codex Desktop café` | `.agents\skills\modelpilot` | `CodexDesktop` |
| `Claude Terminal café` | `.claude\skills\modelpilot` | `ClaudeTerminal` |
| `Claude Desktop café` | `.claude\skills\modelpilot` | `ClaudeDesktop` |

```powershell
$rcRoot = Join-Path $env:USERPROFILE 'Documents\ModelPilot V1 Acceptance\<candidate-short>'
Get-FileHash -LiteralPath @((Join-Path $rcRoot 'Check-Fixtures.ps1'), (Join-Path $rcRoot 'Fixture-Baseline.json'))
& (Join-Path $rcRoot 'Check-Fixtures.ps1') -Case All
```

1. Verify the actual client builds, included subscription headroom, unavailable paid fallback and $0 incremental spend. Keep account credentials, IDs and screenshots private. Stop if usage or the payment route is uncertain. Grant folder trust only to the exact audited test folder when separately authorized.
2. Use a fresh local **Ask for approval** Codex chat on its project. Confirm GPT-6.2 Sol at Extra High and High selectable. Confirm the current-chat controls in the UI before any manual session selection. Use a dedicated PowerShell tab for Claude Terminal, with the launch below. Check Opus 5.5 at High, Medium selectable, and Manual permissions. Avoid an inherited personal state override in the clients. For Desktop, open the separate folder in a fresh local Code session on Opus 5.5 at High, with Manual or Ask permissions. If separately authorized, temporarily suppress Desktop prompt suggestions and restore the original choice afterward.
3. Confirm project-local skill discovery without submitting. Approve only the exact packaged `node "<installed skill directory>/scripts/modelpilot.mjs" read` command or the literal `read cross-host` in the global case, for that action only. Allow ordinary reads of the exact skill and needed bundled references. For fallback, decline the `read` helper without ending the turn if possible. Leave task files, settings and state untouched. A visible out-of-scope attempt fails the case even if blocked. Recheck the project inventories and hashes after each case and before reuse.

```powershell
Set-Location -LiteralPath (Join-Path $rcRoot 'Claude Terminal café')
Remove-Item -LiteralPath Env:MODELPILOT_STATE_DIR -ErrorAction SilentlyContinue
$env:CLAUDE_CODE_DISABLE_AUTO_MEMORY = '1'
$env:CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION = 'false'
claude --model 'claude-opus-5-5' --effort high --permission-mode manual
```

## Owner-operated turns and pass criteria

**Minimum primary allowance is six submissions** using one verified Claude fork. An unavailable fork needs one extra neutral setup only if the separate authorization includes it. Optional Claude Desktop adds two after primary passes. The totals are **eight with the fork** or **nine with the extra setup**, including Desktop. Count unintended, interrupted and failed submissions. Stop the affected case on a deviation. There are zero automatic retries. A blocked permission check stays open.

| Case | Submissions | Required observation |
|---|---|---|
| Codex Desktop | Setup, then native `$modelpilot next` | Uses the parser task queued next. Explains the current-chat action and rollback for a confirmed Sol High trial and any reason to wait. Captures actual `read` stdout for Codex and the final exact dated source. |
| Claude Terminal · helper-backed branch | Setup once on the neutral parent. In one verified fork submit `/modelpilot compare`, then `/modelpilot global`. | The compare answer is concise and explains a reversible High-to-Medium trial. It names the session-only picker action, the save-default behavior to avoid, and when to restore High. `compare` runs `read` and `global` runs `read cross-host`. Global considers handoff and qualifies all unconfirmed Codex options. Both final answers show the exact relevant URL and review date. |
| Claude Terminal · denied helper | One `/modelpilot compare` from the neutral parent or another verified neutral fork. | Deny the helper once. Observe bundled `references/fallback.md` use, its dated source in the answer, disclosure that local updates and withdrawals could not be checked, and respect for the known Sonnet withdrawal. No alternate state read, helper retry or claim of helper stdout. |
| Claude Desktop · optional | Setup, then `/modelpilot effort`. | Helper-backed advice with a visible dated link. Keep a specific lower setting conditional because none is confirmed. Use Desktop terminology and qualify session scope when unverified. |

Use one ordinary setup before any ModelPilot command. Prepare Claude commands as complete drafts, avoiding bare autocomplete submission. Keep the neutral Claude parent unchanged while running compare and global. From the same folder and dedicated shell, use `claude --resume '<neutral-session-id>' --fork-session --model 'claude-opus-5-5' --effort high --permission-mode manual`. Verify the fork's directory, settings and setup-only transcript before inference. Reopen the parent for the denied case, or fork it again, before any approved helper output can enter that chat. If forking is unavailable, use the initial Claude chat for compare and global and a fresh chat with the identical setup for denial. [Claude launch and fork flags](https://code.claude.com/docs/en/cli-reference)

**Codex setup**

```text
The current work is a paused cross-service replay investigation. Its check is that out-of-order jobs never publish stale results. The next agreed task is a localized price-parser fix. Blank and whitespace-only prices should produce the existing Missing price error, while "0" and "12.50" keep their current behavior. The focused parser check and the existing import suite are the acceptance checks. I confirm GPT-6.2 Sol at Extra High, with High selectable on that model for this chat. For now reply only Queued. Use no tools and leave files and settings alone.
```

**Claude Terminal setup**

If Sonnet 5.5 High is also selectable, add `Claude Sonnet 5.5 High is selectable here, and its local card is withdrawn.` before the acknowledgment request. This checks that an eligible option's withdrawn guidance stays out of the recommendation. Keep all Codex choices unconfirmed for `global`.

```text
I am queuing a localized price-parser fix. Blank and whitespace-only prices should produce the existing Missing price error, while "0" and "12.50" keep their current behavior. The focused parser check and the existing import suite are the acceptance checks. I confirm Claude Opus 5.5 High and that Medium is selectable on that model in this Terminal session. Only the options I confirm here are eligible for this advice. I have not confirmed any Codex choices. Switching hosts would require carrying over the reproduction and both checks. The local Claude Sonnet 5.5 card was withdrawn in this test project. For now reply only Queued. Use no tools and leave files and settings alone.
```

**Claude Desktop setup**

```text
I am queuing a localized price-parser fix. Blank and whitespace-only prices should produce the existing Missing price error, while "0" and "12.50" keep their current behavior. The focused parser check and the existing import suite are the acceptance checks. I confirm Claude Opus 5.5 High in this local Desktop Code session. I have not confirmed any lower effort in this picker. For now reply only Queued. Use no tools and leave files and settings alone.
```

## Evidence and release decision

- For ordinary setup, check the acknowledgment without skill activation or tool activity. For advice, capture the final answer, visible tool scope and exact command. In expanded tool output, verify schema version 1, the active host, unrefreshed discovery and empty measurements. The Claude Terminal state contains Opus but omits Sonnet from both reviewed snapshots. `read cross-host` adds both Codex cards. The other projects use bundled host-scoped cards.
- Check the final answer's visible URL and review date against the exact helper record or dated fallback. The bundled guidance date is 2026-11-27. Claude guidance links to the Anthropic model-and-effort article. Any material minimum-build fact should name the model and use the native configuration source, reviewed 2026-11-24. Prefer omitting build facts that cannot change a decision. References inside tool outputs establish provenance for the evaluator. The final answer supplies the user's citation.
- Record how the advice preserves the numeric acceptance checks, the manual action and rollback, uncertainty without matched measurements, and roughly 120 words for `compare`. Capture picker scope evidence without applying a recommendation. Record the post-case audit and any deviation. Keep paths identifying the account, private transcripts, session IDs and settings screens out of the repository.
- Release blockers are the primary candidate behavior and integrity checks above and final test operational closeout. Include Claude Desktop in the claim only after its candidate case passes. Record Batch 1 paid fallback and the earlier Desktop permission, trust, prompt-suggestion and billing fields separately until the owner confirms them. [Batch 1 operations](ModelPilot-Comparative-Evaluation-Batch-1.md#integrity-and-operations) · [Earlier Desktop confirmations](ModelPilot-Native-Feasibility.md#desktop-closeout-confirmations)

Minimum next authorization covers the selected submission cap, exact-folder trust if required, session-only preflight selections, the process-local settings above, one-action bundled reads and helper decisions, and read-only integrity audits. Add temporary Desktop prompt-suggestion suppression and restoration only if running that case. Publication remains a separate decision.
