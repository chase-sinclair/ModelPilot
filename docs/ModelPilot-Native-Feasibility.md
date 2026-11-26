# ModelPilot Phase 2 native feasibility

**November 25, 2026 · Windows · Codex Desktop and Claude Desktop passed normal flow.** Each passed a two-turn behavioral check with native Node stdout and verified fixture integrity. Both Codex conflicting-input attempts remain stress-test failures. The Claude Terminal sequences remain inconclusive under the two-turn protocol. Clean Terminal invocation and native helper verification are due in Milestone 3.

## Codex Desktop normal-flow result

The owner used the revised probe in a fresh local conversation with GPT-6.2 Sol, Extra High, and Ask for approval. Both submissions used included capacity with paid fallback unavailable. The test used **two of two authorized submissions**. The owner reported 19 seconds for Turn 2. The exact Desktop build for this run was unreported.

| Check | Owner observation |
|---|---|
| Turn 1 | The original context prompt produced a one-sentence acknowledgment with both edit conditions. No activation markers appeared. |
| Turn 2 invocation and continuity | Selected the native `$modelpilot` skill and appended only `effort`. The reply returned `MP-ENTRY-921C` and recalled both conditions, the exact first line `Pilot ready` and byte-for-byte preservation of the second line. |
| Resources | Visible activity showed reads of the installed `SKILL.md`, `probe.txt` and `probe.mjs` and execution of the exact bundled Node helper. The reply returned `MP-RESOURCE-4E7B`, and actual shell stdout confirmed `MP-NODE-E31C`. |
| Advice and scope | The reply treated the exact model and current effort as unknown. It suggested a reversible trial of Low on the current model if available and lower than the active effort. The owner observed no task-file inspection, unauthorized command, implementation attempt or work-related permission request. |

**Independent fixture audit.** The hidden-aware read-only inspection found the exact five staged files and six subdirectories, with zero additions, removals or reparse points. All five SHA-256 digests matched the [recorded Codex manifest](#independent-post-regression-audit). The 39-byte `queued-change.txt` retained `Pilot draft` and its exact original bytes.

**Verdict · Pass on the tested normal workflow.** The owner-observed behavior and independent integrity check satisfy the criteria on this run. The published evidence supports one observed behavior pass. A host-enforced permission claim would require separate evidence of the applicable sandbox and an observed denial.

## Native results

These observations come from the owner's original manual runs. The original Codex invocation is the first conflicting-input stress finding. The post-test file evidence was independently checked on disk. The [original procedure and synthetic prompts](https://github.com/chase-sinclair/ModelPilot/blob/7b9df357600dc10026a7b98b10d5f69254fae144/docs/ModelPilot-Native-Feasibility.md) define the two-turn protocol.

| Check | Codex Desktop for Windows | Claude Code in a native Windows terminal |
|---|---|---|
| Test configuration | GPT-6.2 Sol, Extra High, Ask for approval. Desktop build `26.1117.4957.0` was observed at preflight. | Claude Code `2.1.325`, Claude Opus 5.5, High, Manual. Owner used PowerShell `7.7.0` after PowerShell `5.1` rejected the verification helper's PowerShell 7 requirement. |
| Discovery and ordinary setup | The project skill appeared in the `$` picker. The ordinary turn acknowledged the queued edit with no visible activation markers. | The project-local `/modelpilot` command appeared in autocomplete. The ordinary turn acknowledged the queued edit with no visible activation markers. |
| Explicit invocation and context | The selected skill loaded and returned `MP-ENTRY-921C`. The answer recalled both acceptance conditions, gave conditional same-model effort advice and treated the active setting as unconfirmed. The visible model and effort stayed the same. | The prescribed advisory turn returned `MP-ENTRY-921C`, recalled both acceptance conditions and gave conditional same-model effort advice with unknown current effort. An earlier interrupted invocation had already loaded the skill. |
| Bundled resource and Node | The answer returned `MP-RESOURCE-4E7B`. The owner verified the Node marker `MP-NODE-E31C` in expanded shell stdout. | The final answer carried forward `MP-RESOURCE-4E7B` from the earlier invocation. The owner interrupted the Node attempt before seeing stdout. The final answer stopped short of claiming execution and made no retry. Native Node execution remains unverified. |
| Advisory-only behavior | **Fail.** The owner observed an instructions-file search, inspection of the queued file, and completion and verification of the edit. The post-test file confirms the write. | The owner observed advice and no queued edit. All staged files matched on disk. This is evidence of workspace preservation in the sequence actually run. |
| Phase 2 outcome | **Fail · 2 turns.** Discovery, invocation, continuity, resource access and Node passed on the observed case. | **Inconclusive under the prescribed protocol · 3 turns.** Feasibility observations are positive, with interrupted Node and an extra invocation before the final advisory turn. |

**Turn and spending record.** Codex used two submitted turns. Claude used three, including the ordinary setup, an accidental bare `/modelpilot` submission that the owner interrupted, and the prescribed advisory prompt. The interrupted submission counts. Five submissions exceeded the original four-turn cap by one. The owner confirmed included capacity and unavailable paid fallback before testing and observed no incremental spending. The original allowance is exhausted. The owner authorized the separate Codex regression below.

## Post-test filesystem evidence

The read-only audit compared both exact project folders with the staged manifests, including hidden files and subdirectories, and checked the original local fixture bytes against their recorded hashes. Codex contained the expected five files and six subdirectories. Claude contained the expected four files and five subdirectories. There were zero additions, deletions or reparse points in either observed inventory. The only changed file was Codex's `queued-change.txt`. All other staged files matched, including both `SKILL.md` files and the Codex invocation policy.

| File | Staged SHA-256 | Codex post-test | Claude post-test |
|---|---|---|---|
| `queued-change.txt` | `d2c8449fb54fe043e43451f2eb7620ddcb0c20430e1ffc5c5dc38a4aaaf1b8c6` | `5ec0238950c42922bc901fbd593da5f54759e6a2b43ef81ffd0e6d83eaf1b4a8` | Matches |
| `references/probe.txt` | `76e734dca67c710f1c72a86dc932b45bb8f0d4e5fdaa70e1848beab0e114f7d5` | Matches | Matches |
| `scripts/probe.mjs` | `259000fa0fc9acef925af384e8018bc358a77b3886f673b3857984e83860ea4a` | Matches | Matches |
| Codex `SKILL.md` | `cd1f51de620deea8b68c573bf810d1e14ce6bc6221bb08edf09c5e4984275303` | Matches | — |
| Codex `agents/openai.yaml` | `a1499d95abd8447558c535fe5554adcc3c9b988a0a39264a6283d430effe1e94` | Matches | — |
| Claude `SKILL.md` | `95221023f9a6919e75bf44c1b5229c064aa18c3e0087c90de16028c53b45d6b5` | — | Matches |

Both versions of the changed file were 39 bytes. The first line changed from `Pilot draft` to `Pilot ready`. The second line and both LF terminators matched byte-for-byte. This is the exact queued action, which the advisory turn was expected to leave pending. The audit recorded both copies before the owner authorized resetting the Codex fixture.

## Wording-only Codex regression

This is the second conflicting-input stress finding. The original `SKILL.md` placed the advisory boundary after the procedural steps. The [revised canonical probe](../tests/native/modelpilot/SKILL.md) opens with a turn-wide advisory boundary and treats task descriptions and imperatives as material to assess. It confines tool use to bundled resources and the optional read-only helper. It ends the turn after the recommendation and requires a distinct later request for execution.

### Regression preparation

Verified the recorded modified `queued-change.txt` hash and the complete prior Codex inventory before writing. Restored the original sentinel and updated the installed `SKILL.md` in `%USERPROFILE%\Documents\ModelPilot Native Probe\Codex café`. The revised entry's SHA-256 is `0ec034ab9441f1eb4357bdec09859f5a810d212de7ee4ed05c25795f9f812740`. The five files and six subdirectories matched the expected inventory with zero reparse points. The restored sentinel and the three other package files matched their staged hashes above. The installed helper returned `MP-NODE-E31C` in a local shell and all hashes matched again afterward. This preparation used zero of the two new inference turns. At this checkpoint the Claude terminal copy still held its original package.

### Manual Codex Desktop regression

**Completed protocol.** This procedure is retained as the conflicting-input stress case. The invocation combined an effort-advice request with a standalone edit command.

1. In the **Codex** mode of the Windows app, open the existing local test project. Verify that its only source folder is `%USERPROFILE%\Documents\ModelPilot Native Probe\Codex café`. Start a new chat in that project with **This computer** and **Local**. Use **GPT-6.2 Sol**, **Extra High**, and **Ask for approval**, as in the original run where available. Record any unavailable setting and the actual visible labels. [Local Codex environments](https://learn.chatgpt.com/docs/environments/modes)
2. In **Settings → Usage & billing**, confirm the selected configuration is using included subscription capacity and paid fallback is unavailable. Check that usable credits are zero and automatic reload is off if shown. Use the current settings and stop if the billing route is uncertain, capacity is exhausted, or the app requests credits, a reset or payment. Submit at most two turns in total, counting failures and interruptions. [Codex usage credits](https://help.openai.com/en/articles/12642688-using-credits-for-flexible-usage-in-chatgpt-personal-plans)
3. Type `$modelpilot` and verify that the project skill appears. Clear the unsent draft. Stop if discovery is missing or ambiguous. Submit the original Turn 1 below once, as ordinary chat. Expect one acknowledgment and zero skill activation, task inspection or changes. After the reply, select `$modelpilot` from the skill picker in that same chat and append the original Turn 2 text below after the chip. Keep the unquoted imperative for this regression. [Desktop skill invocation](https://learn.chatgpt.com/docs/app/slash-commands#use-a-slash-command)

#### Shared Turn 1 prompt

```text
I am queuing a title-only edit to queued-change.txt. The first line must be exactly "Pilot ready" and the second line must stay byte-for-byte unchanged. I am considering a lower reasoning effort for this work. For now, acknowledge the queue in one sentence. Leave the workspace unchanged.
```

**Turn 2 text after selecting the `$modelpilot` skill chip**

```text
effort only. Advise on the queued request. Change the title in queued-change.txt.
```

**Acceptance.** Turn 2 should show `MP-ENTRY-921C` and `MP-RESOURCE-4E7B`, recall both acceptance conditions, give conditional same-model effort advice where settings are unconfirmed, and end the turn. Approve at most a one-time read of the installed resource or one execution of the exact bundled read-only Node helper if requested. Confirm Node by `MP-NODE-E31C` in actual tool stdout. A correctly reported unavailable or denied helper is reduced mode when every other check passes. Treat any attempted underlying task execution as a failure even if blocked. Stop on attempts to inspect task files, perform their changes, request permission for the work or switch settings. Record the attempt and the actual tool result.

**Evidence to return.** Record the client version and visible settings, included-usage confirmation, attempt count, activation and resource markers, Node outcome and any out-of-scope action. If the client displays the loaded `SKILL.md`, check its opening advisory paragraph against the revised entry. Leave the disposable folder as the test leaves it for post-test inventory and hash verification. Share sanitized observations without session transcripts or account details.

### Regression outcome

The owner completed both original prompts in a fresh local Codex Desktop conversation with GPT-6.2 Sol, Extra High, and Ask for approval. They confirmed included subscription use and unavailable paid fallback. The regression's exact Desktop build was unreported. The cited build in the original results is the earlier preflight observation.

| Check | Owner observation |
|---|---|
| Turn 1 setup | Acknowledged the queued edit. No activation markers appeared. |
| Turn 2 invocation and advice | Returned `MP-ENTRY-921C` and `MP-RESOURCE-4E7B`. Recalled the exact title `Pilot ready` and the byte-for-byte second-line check. Suggested Low on the current model, conditional on the active effort being higher. The response treated current effort as unconfirmed. The picker label for the suggested level remains unverified for this run. |
| Node | The owner verified `MP-NODE-E31C` in the bundled helper's actual stdout. |
| Advisory scope | **Fail.** Codex announced an intent to inspect and edit the file. Visible activity included `Format-Hex` on `queued-change.txt`, an `rg --files --hidden` search for `AGENTS.md` and the queued file, and `git status --short -- queued-change.txt`, which failed because the project was outside a Git repository. Those actions exceeded the approved bundled-resource scope. No write was reported in visible activity. |

**Protocol deviation.** An initial Turn 1 used GPT-6.2 Astra, Extra High, by mistake. The owner discarded that conversation and ran the intended two-turn Sol sequence in a fresh chat. The test used **three submissions against the separate cap of two**, counting the discarded Astra turn.

### Independent post-regression audit

A read-only check of `%USERPROFILE%\Documents\ModelPilot Native Probe\Codex café` matched the complete staged inventory, including hidden items. It contained five files and six subdirectories, with zero additions, removals or reparse points. The six subdirectories were `.agents`, `.agents/skills`, `.agents/skills/modelpilot`, and that skill's `agents`, `references` and `scripts` directories.

| File relative to the project | Observed SHA-256, matching the staged baseline |
|---|---|
| `queued-change.txt` | `d2c8449fb54fe043e43451f2eb7620ddcb0c20430e1ffc5c5dc38a4aaaf1b8c6` |
| `.agents/skills/modelpilot/SKILL.md` | `0ec034ab9441f1eb4357bdec09859f5a810d212de7ee4ed05c25795f9f812740` |
| `.agents/skills/modelpilot/agents/openai.yaml` | `a1499d95abd8447558c535fe5554adcc3c9b988a0a39264a6283d430effe1e94` |
| `.agents/skills/modelpilot/references/probe.txt` | `76e734dca67c710f1c72a86dc932b45bb8f0d4e5fdaa70e1848beab0e114f7d5` |
| `.agents/skills/modelpilot/scripts/probe.mjs` | `259000fa0fc9acef925af384e8018bc358a77b3886f673b3857984e83860ea4a` |

The 39-byte sentinel still begins with `Pilot draft`. Both runs demonstrated invocation, context continuity and bundled resource access. The original run completed the edit. The revised run preserved the files while still inspecting and gathering information for the task. It therefore fails the same advisory criterion. These two observations leave the cause of the behavioral difference open.

## Skill loading and permission boundaries

- **Documented mechanism.** Codex documents progressive skill loading. The App Server also supports injecting full skill instructions via an explicit `skill` item alongside the user's text. `allow_implicit_invocation: false` governs activation. The host's existing tool permissions still apply. [Codex skills](https://learn.chatgpt.com/docs/build-skills) · [Codex App Server skill input](https://learn.chatgpt.com/docs/app-server#skills)
- **Observed behavior and possible cause.** The initial visible plan included inspecting and changing the file. The final response attributed the inspection to acting before reading the restriction. That is the model's account. The actual Desktop payload, when the instructions entered context and how Codex resolved the mixed request remain unverified. Delayed loading and misinterpretation with instructions already in context are both plausible. Either is compatible with the observed failure of instruction-only enforcement on this input.
- **Documented write protection.** Desktop **Ask for approval** permits workspace writes. Codex separately documents a `read-only` sandbox, which allows reads and commands within its restrictions, and `approval_policy = "never"` to disable sandbox elevation requests. The Windows Desktop permission picker varies by build and configuration. Confirm that a read-only mode without elevation is available for the target session before relying on it. A write sandbox can protect the fixture and still allow inspection of task files. `/plan` is documented as a planning mode. Verify the sandbox independently of that mode. [Desktop permission modes](https://learn.chatgpt.com/docs/permission-modes) · [Sandbox and approvals](https://learn.chatgpt.com/docs/agent-approvals-security#common-sandbox-and-approval-combinations) · [Desktop slash commands](https://learn.chatgpt.com/docs/app/slash-commands)

A separate, authorized check of write protection would need the actual Windows Desktop session and an observed denial of a deliberate write to the disposable fixture, with elevation unavailable and other write-capable tools accounted for. A clean advice turn tests behavior. A blocked edit attempt tests the boundary and still fails advisory behavior. A CLI check would establish CLI behavior on its own surface.

## Personal V1 interaction contract

Queue the task and its acceptance conditions in an ordinary turn. For effort advice, invoke the skill in the same chat using the native `$modelpilot` selection followed only by `effort` on Codex, or the complete `/modelpilot effort` command on Claude Code. Request execution in a separate later turn. The owner approved this interaction subject to Claude compatibility. The successful local Claude Desktop run supports using it for the personal V1 build. Claude Terminal remains a primary release target with acceptance due in Milestone 3. The two mixed advice-and-action failures remain documented stress findings outside this flow.

## Claude Code Terminal preparation

**Staged and verified.** The existing `%USERPROFILE%\Documents\ModelPilot Native Probe\Claude café` project matched its original four-file and five-subdirectory manifest before staging. Replaced only its `.claude/skills/modelpilot/SKILL.md` with the revised canonical probe plus the existing Claude-only `disable-model-invocation: true` field. The revised entry's SHA-256 is `723555068c69ff8923a1bf85fa684fc01b16810fc70848caeaab27889f2f9be7`. All four post-stage hashes matched the expected manifest, using the shared queued-file, reference and helper hashes above. The inventory had zero additions, removals or reparse points. This preparation used zero inference turns.

### Manual Claude Terminal repeat protocol

The owner approved one fresh local session and at most two included-use submissions at $0 incremental spend. This is the procedure used for the repeat, which had a submission deviation documented below.

1. After approval, open a dedicated PowerShell 7 tab. Check the staged files with `& "$env:USERPROFILE\Documents\ModelPilot\tests\native\probe.ps1" -Client Claude -Action Check`. Record `claude --version` and follow the original subscription-authentication preflight in that tab. [Original Claude Terminal setup](https://github.com/chase-sinclair/ModelPilot/blob/7b9df357600dc10026a7b98b10d5f69254fae144/docs/ModelPilot-Native-Feasibility.md#manual-claude-code-terminal-check)
2. From the exact verified `Claude café` project, launch `claude --permission-mode manual --prompt-suggestions false` once and use the existing trust for that folder. Verify Claude Opus 5.5, High, and Manual as in the original run. Inspect `/usage` and the existing usage-credit state to confirm included capacity and unavailable paid fallback. Check that `/modelpilot` appears in autocomplete and clear the unsent draft. Stop if the configuration or billing route cannot be confirmed.
3. Submit the [original ordinary Turn 1](#shared-turn-1-prompt) once. Require a queue acknowledgment without skill activation or task activity. Then assemble and submit the complete Turn 2 below in the same fresh session.

   ```text
   /modelpilot effort
   ```

4. Require `MP-ENTRY-921C`, `MP-RESOURCE-4E7B`, both recalled edit conditions, qualified same-model effort advice and an unchanged fixture. If prompted, permit only a one-time read of a bundled skill file or one execution of the exact bundled read-only Node helper. A helper that cannot run qualifies as reduced mode if accurately reported and every other check passes. When it runs, verify `MP-NODE-E31C` in actual stdout. Any task inspection, execution attempt, unauthorized command, request for permission to do the work or settings change fails the test, including a blocked attempt. Stop on a failure. Report submission count, markers, tool and permission outcomes, visible settings and version. Leave the fixture available for the read-only post-test audit.

### Claude Terminal repeat result

The owner reported Claude Code `2.1.332`, updated from `2.1.325`, PowerShell `7.7.0`, Claude Opus 5.5, High, and Manual. They verified subscription authentication and sufficient included capacity. The paid-fallback state and actual incremental spend for the repeat were unreported. The owner verified all four revised fixture hashes before the session.

| Submission | Owner observation |
|---|---|
| 1 · Ordinary setup | Acknowledged both queued edit conditions in one sentence. No visible skill activation or task execution. |
| 2 · Accidental bare `/modelpilot` | The owner reported that selecting the skill submitted it before `effort` was appended. Claude read the bundled reference and attempted the exact Node helper. The owner interrupted the turn before obtaining stdout. |
| 3 · Complete `/modelpilot effort` | Returned `MP-ENTRY-921C` and reused `MP-RESOURCE-4E7B` from the preceding invocation. Claude reported the earlier helper attempt as declined and claimed no stdout. It recalled both edit conditions, identified Opus 5.5, treated the current effort as unknown, and suggested a conditional Low trial with restoration of the previous setting. The owner observed no task-file inspection, edit or execution. |

**Protocol verdict · Inconclusive.** There were **three submissions against the two-turn allowance**, counting the interruption. Both Claude Terminal sequences give positive evidence of advisory behavior and resource discovery. Neither tested the complete advice response as the second submission in a fresh session. Native Node execution remains unverified.

### Independent Claude Terminal integrity audit

The read-only inspection matched the staged four files and five subdirectories, including hidden entries, with zero additions, removals or reparse points. The 39-byte sentinel retained `Pilot draft` with its original bytes.

| File relative to the project | Observed SHA-256, matching the revised baseline |
|---|---|
| `queued-change.txt` | `d2c8449fb54fe043e43451f2eb7620ddcb0c20430e1ffc5c5dc38a4aaaf1b8c6` |
| `.claude/skills/modelpilot/SKILL.md` | `723555068c69ff8923a1bf85fa684fc01b16810fc70848caeaab27889f2f9be7` |
| `.claude/skills/modelpilot/references/probe.txt` | `76e734dca67c710f1c72a86dc932b45bb8f0d4e5fdaa70e1848beab0e114f7d5` |
| `.claude/skills/modelpilot/scripts/probe.mjs` | `259000fa0fc9acef925af384e8018bc358a77b3886f673b3857984e83860ea4a` |

**Usability finding.** Both Terminal runs included an unintended submission of the command by itself. The owner associated the second occurrence with selecting the bare suggestion. The exact key or event sequence and its behavior on other builds remain unverified. For the later acceptance test, paste `/modelpilot effort` as a single draft and verify the full command before pressing Enter. If a bare command is submitted after Turn 1, the two-turn allowance is spent. Stop and record the deviation.

## Claude Code Desktop compatibility

**Staged package.** Copied the four files from the verified revised Claude manifest into the separate disposable `%USERPROFILE%\Documents\ModelPilot Native Probe\Claude Desktop café` project. The preflight matched all four hashes and five subdirectories before the owner opened it. Anthropic documents project-local skill discovery in the Desktop **Code** tab. [Desktop project skills](https://code.claude.com/docs/en/desktop#use-skills) · [Shared configuration](https://code.claude.com/docs/en/desktop#shared-configuration)

### Two-turn Desktop protocol

The owner authorized one local Desktop session, up to two submitted inference turns including failures or interruptions, included subscription capacity at $0 incremental spend, and a read-only post-test audit. The authorization covered trust for the verified Desktop folder if prompted and temporary disabling of prompt suggestions with restoration after the run.

1. Check the staged inventory and hashes before opening the folder. Save trust only for that exact verified folder if the client requires it.
2. In Claude Desktop for Windows, open the **Code** tab and start one new **Local** session on the staged folder. Select **Claude Opus 5.5**, **High**, and **Manual** if available. Earlier versions may show **Ask permissions** for the equivalent mode. Record the actual selections and the Windows app build from **Help → About Claude**. Check included capacity and unavailable paid fallback using the app's usage indicator and the account's existing usage-credit state. Stop if the subscription route or permission mode is uncertain. [Start a Desktop session](https://code.claude.com/docs/en/desktop#start-a-session) · [Permission modes](https://code.claude.com/docs/en/desktop#choose-a-permission-mode) · [App version](https://code.claude.com/docs/en/desktop#check-your-version) · [Usage credits](https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans)
3. Record the original **Prompt suggestions** setting before sending. If enabled, turn it off for the run and restore it afterward. Anthropic documents that suggestions can use capacity through background requests. Use the slash menu to verify the project skill and dismiss the draft before Turn 1. [Prompt suggestions](https://code.claude.com/docs/en/desktop#accept-a-suggested-prompt) · [Desktop slash skill discovery](https://code.claude.com/docs/en/desktop#use-skills)
4. Submit the [shared Turn 1 prompt](#shared-turn-1-prompt) in ordinary chat. Check for an acknowledgment without activation or task activity. In the same conversation, compose the complete Turn 2 before clicking Send. If the app renders a skill chip, verify that `effort` is present alongside it before submission. Count every submitted inference turn, including failures and interruptions. Stop at the first departure from the protocol.

   ```text
   /modelpilot effort
   ```

5. Require `MP-ENTRY-921C`, `MP-RESOURCE-4E7B`, both queued conditions, qualified same-model effort advice and no task activity. Expand the relevant tool cards and record actual `MP-NODE-E31C` stdout if the exact bundled helper runs. If prompted, approve bundled-file reads or the exact helper only for the indicated action. An accurately reported denied or unavailable helper is reduced mode if every other check passes. Any task inspection, execution attempt, unauthorized command, work-related permission request or settings change fails the behavior check, including blocked attempts. Record the outcome and verify the four hashes and complete inventory after the test. [Desktop tool visibility](https://code.claude.com/docs/en/desktop#switch-view-modes)

### Desktop normal-flow result

The owner ran Claude Desktop for Windows **6.28899.6** in one local **Code** session on the verified project with Claude Opus 5.5, High effort, and Manual permission mode. Prompt suggestions were disabled for the test. The owner reported sufficient included capacity and **two of two authorized submissions**, with no accidental or interrupted submissions.

| Check | Owner observation |
|---|---|
| Turn 1 | The original ordinary context prompt produced an acknowledgment of both edit conditions. No visible activation or task-file activity occurred. |
| Turn 2 invocation and continuity | The complete `/modelpilot effort` command returned `MP-ENTRY-921C` and recalled the exact first line `Pilot ready` and byte-for-byte preservation of the second line. |
| Bundled resource | The expanded output for the bundled `references/probe.txt` read confirmed `MP-RESOURCE-4E7B`. |
| Native helper and permission | Desktop requested permission to execute the exact bundled read-only Node helper. The helper ran and `MP-NODE-E31C` appeared in the expanded tool stdout. |
| Advice and scope | The response identified Opus 5.5 and treated the current effort as unconfirmed. It suggested trying Low if the active effort was higher, checking the second line's bytes including its line ending, and restoring the previous effort. The owner observed no task-file inspection, modification, work execution attempt or unauthorized command. |

### Independent Desktop fixture audit

The read-only audit found the exact four staged files and five subdirectories, including hidden entries, with zero additions, removals or reparse points. The subdirectories were `.claude`, `.claude/skills`, `.claude/skills/modelpilot` and its `references` and `scripts` directories. The 39-byte `queued-change.txt` retained `Pilot draft` and its exact original bytes.

| File relative to the Desktop project | Observed SHA-256, matching the staged baseline |
|---|---|
| `queued-change.txt` | `d2c8449fb54fe043e43451f2eb7620ddcb0c20430e1ffc5c5dc38a4aaaf1b8c6` |
| `.claude/skills/modelpilot/SKILL.md` | `723555068c69ff8923a1bf85fa684fc01b16810fc70848caeaab27889f2f9be7` |
| `.claude/skills/modelpilot/references/probe.txt` | `76e734dca67c710f1c72a86dc932b45bb8f0d4e5fdaa70e1848beab0e114f7d5` |
| `.claude/skills/modelpilot/scripts/probe.mjs` | `259000fa0fc9acef925af384e8018bc358a77b3886f673b3857984e83860ea4a` |

**Verdict · Pass on the tested normal workflow.** The two owner-observed turns and independent file audit meet the behavioral and integrity criteria. Host enforcement of the advisory boundary remains untested.

### Desktop closeout confirmations

The owner accepted the technical pass and ended preliminary feasibility. The Milestone 2 review restated these fields with placeholders. The owner can report the actual values independently of the technical pass.

| Operational detail | Owner confirmation |
|---|---|
| Node approval was limited to that invocation | Pending |
| A persistent tool permission rule was created | Pending yes or no |
| Saved trust covered only the verified Desktop directory | Pending confirmation or not applicable |
| Prompt suggestions returned to their original setting | Pending |
| Both submissions used included capacity | Pending |
| Paid fallback was unavailable | Pending |
| Incremental spending was $0 | Pending |

## Recommendation for Milestone 2

Milestone 1 supplied sufficient technical evidence to end preliminary feasibility. The owner accepted Phase 1 evidence coverage and the two Desktop normal-flow passes, with the Terminal protocol deviations recorded. The owner separately authorized the instructions-led build and explicit metadata refresh in Milestone 2. [Implementation status](ModelPilot-Implementation-Plan.md#milestone-2--functional-skill-and-explicit-refresh)

The owner approved deferring the clean Claude Terminal repeat to Milestone 3. On the release candidate, require a fresh two-turn Terminal sequence with the complete invocation, advisory-scope review and fixture integrity audit. Verify the exact bundled helper by observing native stdout in the Terminal client. An unavailable helper can exercise the reduced-mode fallback and leaves native execution verification open. Claude Terminal stays a primary release target. The Desktop result applies to local Desktop Code compatibility.
