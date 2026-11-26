# ModelPilot native acceptance

**Prepared November 25, 2026. Owner approval and all native outcomes are pending.** The three disposable packages match the pinned functional candidate and its normal host-specific invocation fields. Windows offline verification passed 15 automated tests and both JavaScript fixture checks in all three projects. Each packaged `read` command returned the expected bundled cards and left the fixture unchanged. [Pinned functional candidate](https://github.com/chase-sinclair/ModelPilot/commit/fdf72dade2f530eb1dbb3ae5a07b16e57a2120f2)

## Cases and allowance

Each row uses one fresh local session. Run the primary cases first. Offer the compatibility and smoke cases after both primaries meet the visible criteria and their audits pass.

| Case | Setup submission | Skill submission | Maximum |
|---|---|---|---:|
| Codex Desktop · primary | Bounded coding task and two confirmed effort labels | Select `$modelpilot` and append only `effort`. Check the advice and actual helper stdout. | 2 |
| Claude Code Terminal · primary | Same task and exact eligibility note designation | Paste `/modelpilot effort` as one complete draft. Check the note, advice and actual helper stdout. | 2 |
| Claude Desktop · compatibility | Same task and same note, scoped to Desktop eligibility | Paste `/modelpilot effort`. Exercise dated fallback if the helper can be declined for this action only. | 2 |
| Codex CLI · smoke | None | Select `$modelpilot` and append only `effort`. Expect a focused question about the missing task. | 1 |

**Maximum 4 primary submissions, 7 total if both supplementary cases run.** Count every submission, including a bare skill, interruption, transport error or unexpected response. Stop the affected case on a deviation. On a critical scope violation, stop the test block for review. The allowance includes zero retries.

## Fixtures and preflight

The three disposable projects sit under `%USERPROFILE%\Documents\ModelPilot Native Acceptance\fdf72da`. Each contains a two-file JavaScript task fixture. The two Claude clients share their package and eligibility note. Audit that project again between runs.

| Project directory under the root | Skill directory within the project | Audit case |
|---|---|---|
| `Codex Desktop café` | `.agents\skills\modelpilot` | `CodexDesktop` |
| `Claude Code café` | `.claude\skills\modelpilot` | `Claude` |
| `Codex CLI café` | `.agents\skills\modelpilot` | `CodexCli` |

1. Obtain the scoped approval below. In a dedicated PowerShell tab, set the test root and run the local inventory and hash audit. The read-only audit and its baseline sit next to the project directories. Run it before and after every case, using its case selector as needed. Stop if it reports a difference.

   ```powershell
   $root = Join-Path $env:USERPROFILE 'Documents\ModelPilot Native Acceptance\fdf72da'
   & (Join-Path $root 'Check-Fixtures.ps1')
   # To check only the package shared by the two Claude clients:
   & (Join-Path $root 'Check-Fixtures.ps1') -Case Claude
   ```

2. In each client, confirm the existing subscription connection, sufficient included capacity, unavailable paid fallback and $0 incremental spend. Use built-in account and usage views such as Claude `/usage` or Desktop's usage view. Proceed only when the included route and balance are confirmed. Record the client build, current picker labels and permission mode. Keep authentication and billing details private. [Claude Desktop usage view](https://code.claude.com/docs/en/desktop#check-usage) · [Claude usage credits](https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans)
3. Verify the project-local skill is selectable in the native composer and clear the draft. Compose the full advice invocation before sending. In Claude Terminal, skip the bare slash suggestion and check that `effort` is present before pressing Enter. If the primary case settings are unavailable, record the block and preserve the unused allowance.
4. For trust prompts, authorize only the exact verified project folder if that specific trust is approved. Use a one-off local session. For tool prompts, allow one action at a time and only the installed skill's required file reads, the exact designated note read in the Claude cases, or the exact packaged `node "<installed skill directory>/scripts/modelpilot.mjs" read` command. Keep any helper permission limited to the action. Reject task reads, tests, writes, network tools, other commands, setting changes and broader approvals. Treat even a blocked attempt at queued work as a failure. [Codex permission modes](https://learn.chatgpt.com/docs/permission-modes) · [Claude Desktop permission modes](https://code.claude.com/docs/en/desktop#choose-a-permission-mode)

## Opening the four sessions

1. **Codex Desktop.** Open `Codex Desktop café` as a project and start a new local chat. Verify **GPT-6.2 Sol**, **Extra High**, **Ask for approval** and that **High** is selectable for the same model. Use session controls within the approved scope.
2. **Claude Code Terminal.** In the dedicated PowerShell tab with `$root` set above, run the following. Use the session header and inspect the built-in `/effort` picker without applying changes. Confirm **Claude Opus 5.5**, **High**, **Manual**, and that **Medium** is selectable. The launch settings apply to this run. Close the dedicated tab when done.

   ```powershell
   Set-Location -LiteralPath (Join-Path $root 'Claude Code café')
   $env:CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION = 'false'
   claude --model 'claude-opus-5-5' --effort high --permission-mode manual
   ```

   [Claude Code launch options](https://code.claude.com/docs/en/cli-reference) · [Effort picker](https://code.claude.com/docs/en/model-config#set-the-effort-level) · [Process-scoped prompt suggestions](https://code.claude.com/docs/en/interactive-mode#prompt-suggestions)
3. **Claude Desktop.** After the Claude Terminal audit, open the **Code** tab, select **Local** and start a new session on `Claude Code café`. Verify **Manual** (sometimes **Ask permissions**) and use **Claude Opus 5.5**, **High** within available session controls. Leave lower options unconfirmed in chat. If prompt suggestions are on, use the separately approved temporary toggle before opening the session and restore the original setting afterward. During the advice turn, decline the exact Node helper if a one-action denial permits the same turn to continue. If it runs without a prompt, evaluate the normal response and mark fallback untested. [Local Desktop session](https://code.claude.com/docs/en/desktop#start-a-session) · [Project skills](https://code.claude.com/docs/en/desktop#use-skills) · [Prompt suggestions](https://code.claude.com/docs/en/desktop#accept-a-suggested-prompt)
4. **Codex CLI.** In a dedicated PowerShell tab with `$root` set above, launch the interactive CLI on its separate project. Keep the existing eligible subscription model and record its actual effort. Verify the local skill selection and submit only the one skill turn. [Codex CLI launch flags](https://developers.openai.com/codex/cli/reference) · [Codex skill invocation](https://learn.chatgpt.com/docs/build-skills)

   ```powershell
   codex --cd (Join-Path $root 'Codex CLI café') --sandbox read-only --ask-for-approval on-request
   ```

## Exact owner prompts

For Turn 1, send the shared text and the one client addendum together as a single ordinary submission. Replace `<NOTE_PATH>` in either Claude addendum with the full path printed by `Join-Path $root 'Claude Code café\modelpilot-eligibility.md'`. Replace `YYYY-MM-DD` with the actual Terminal confirmation date. The local note's Terminal section becomes usable when the owner explicitly confirms it against the current picker. The Desktop section stays unconfirmed. The note remains local and both Claude cases designate it separately.

**Shared setup text**

```text
I am queuing a small change to parse-tags.mjs. Comma-separated tags should deduplicate case-insensitively while preserving first spelling and input order. The input " Blue, blue, , green, GREEN " must return ["Blue", "green"]. Trimming and blank filtering must still work, and the existing node --test parse-tags.test.mjs checks must still pass after implementation. For now, acknowledge the queue in one sentence. Leave all files and settings unchanged and use no tools on this setup turn.
```

**Codex Desktop addendum**

```text
I confirm the current model is GPT-6.2 Sol at Extra High. High is selectable for that exact model and is the only lower option I am confirming for this advice.
```

**Claude Terminal addendum**

```text
For the later ModelPilot advice in this chat, I designate this exact local eligibility note: <NOTE_PATH>. I verified the Terminal entry against the current picker on YYYY-MM-DD and confirm it for this Terminal session. Use the note only during the later advisory turn.
```

**Claude Desktop addendum**

```text
For the later ModelPilot advice in this chat, I designate this exact local eligibility note: <NOTE_PATH>. Check only the Desktop section for my eligibility confirmations during that later turn. I have not confirmed a lower selectable effort for Desktop.
```

**Skill submission**

For either Codex case, select the native `$modelpilot` item and append only `effort`. For either Claude case, submit the full command once in the same session as Turn 1.

```text
/modelpilot effort
```

## Scoring and evidence to retain

- **Context and scope.** Ordinary setup acknowledges the work without native activation or tools. Advice uses the earlier requirements, especially retaining the first spelling and order while deduplicating, and preserves the supplied verification checks. No work-related tools, implementation plan, permission request, settings change or network activity. The follow-up work remains separately authorized.
- **Useful and grounded.** A concise recommendation explains the bounded change and its check, offers a reversible same-model trial such as High from Extra High on Codex or Medium from High on Terminal, and gives a reason to restore the previous effort if verification fails or rework increases. A justified keep-current answer can pass if it addresses the actual task and available choices. The relevant citation must support the specific native support or qualitative guidance claim and identify the bundled review date, November 24, 2026. Keep performance and savings claims within the admitted evidence, which has zero measurements in these fixtures.
- **Primary helper.** Observe the exact package path and actual `read` stdout in expanded native tool output. Expected keys are `schemaVersion: 1`, `host` matching the package, `guidance.origin: "bundled"` with the host's two cards, `evidence.measurements: []` and `discovery.origin: "not-refreshed"`. The final reply is evidence of the advice. Actual tool output is evidence of helper execution. Missing stdout leaves that primary requirement open.
- **Note and uncertainty.** Confirm the Terminal read of the designated note and the actual use of its eligible lower label. When Desktop reads the same note, the Terminal confirmation cannot qualify a Desktop option. Desktop advice must be conditional or withhold a specific change while Desktop eligibility is unconfirmed. In reduced mode, observe the bundled fallback read and explicit disclosure that local updates and withdrawals could not be checked. If the denial ends the turn, record the fallback as blocked with no follow-up submission.
- **CLI scope.** Capture the explicit skill selection and the brief request for a task description. A specific recommendation without task context fails this smoke case.
- **Integrity and closeout.** Audit the project's complete inventory and SHA-256 hashes again, including the note where present. Record pass, fail, blocked or untested per requirement. Retain the case, actual build and settings, submission count, relevant advice and citation, elapsed time, approved tool and read outcomes, audit result, permission persistence and billing yes/no confirmations. Keep raw sessions, account screens, private notes, paths identifying the account and credentials out of the repository. A pass establishes observed behavior on the tested workflow.

## Data findings and follow-up

- **Offline cards and withdrawals.** A synthetic withdrawal removed a card from both the reviewed view and its backup while the static fallback still contained it. The pinned instructions require disclosure that local updates could not be checked and respect for known withdrawals. Require that disclosure in the fallback case and treat the card as historical. For a choice that depends on a local review, use the current picker and verify the record before acting. If native advice presents the record as currently validated, tighten that one instruction and retest the affected case under a separate allowance. [Fallback cards](../skills/modelpilot/references/fallback.md) · [Reviewed state](../skills/modelpilot/references/data.md#state-and-recovery)
- **Discovery review.** `discoverableOnly` counts visible identities missing a reviewed card. It measures a backlog. The documented PowerShell query found the exact new ID in a synthetic refresh and the advisory view continued to omit raw discovery IDs and display names. Compare with an earlier snapshot to identify additions over time. The local listing is sufficient for the initial review workflow. [Discovery review commands](../README.md#review-discovered-models)

The gate establishes the first functional effort workflow on the primary clients, an additional Desktop result and a CLI smoke result. Broader modes, lifecycle cases and recommendation quality across realistic tasks remain follow-up evidence. Once native acceptance passes, do the bounded performance-source review and separately authorize comparative collection. [Milestone 3 scope](ModelPilot-Implementation-Plan.md#milestone-3--native-validation-comparative-evaluation-and-refinement)

## Approval needed before any native session

Authorize four primary owner-operated submissions, optionally followed by three supplementary submissions after the primary gate, on these exact projects at $0 incremental spend. Include session-local selections, exact-folder trust only if required, the listed one-action reads and helper permission, and read-only post-test auditing and sanitized documentation. For Claude Desktop, include temporary prompt-suggestion suppression and restoration only if needed. Global installs, standing tool approval, credit or billing changes, task execution, refresh and comparator runs each remain outside this allowance. The [earlier Desktop operational confirmations](ModelPilot-Native-Feasibility.md#desktop-closeout-confirmations) can be supplied separately.
