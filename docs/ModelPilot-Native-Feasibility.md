# ModelPilot Phase 2 native feasibility

**November 25, 2026 · Windows · Ready for owner-run native checks.** The owner accepted the local preflight and will run one fresh project session and at most two submitted synthetic turns per client, including failed submissions, through included subscription usage at $0 incremental spend. Both disposable copies are staged for the manual checks. See the [approved paths and limits](../catalog/coverage.md#permission-request-for-phase-2-native-feasibility).

## Results

| Primary client | Status and submitted turns | Verified observation | Still to verify |
|---|---|---|---|
| Codex Desktop `26.1117.4957.0` on Windows | **Manual check pending · 0 of 2** | The earlier preflight confirmed ordinary included usage was available at that time. The reinstalled project matched the expected five files and six subdirectories. | Current included usage, `$modelpilot` discovery and selection, setup without skill activation, context, resource and Node access, advice and unchanged settings. [Codex desktop invocation](https://learn.chatgpt.com/docs/app/slash-commands#use-a-slash-command) |
| Native Claude Code `2.1.325` in a Windows terminal | **Manual check pending · 0 of 2** | The earlier probe found an API-key override in its shell. Omitting it in that process exposed an existing Claude subscription sign-in. The first launch exited at folder trust. The reinstalled project matched the expected four files and five subdirectories. | Current included usage, saved trust for the verified folder, `/modelpilot` discovery, setup without skill activation, context, resource and Node access, advice and unchanged settings. [Claude authentication](https://code.claude.com/docs/en/authentication#credential-precedence) · [Claude settings and trust state](https://code.claude.com/docs/en/settings#find-or-create-your-settings-files) |

**Turn and spend record.** Zero of four inference turns submitted and $0 incremental spend. Native model and effort selections, live in-client resource reads and tool permissions await the manual checks.

**Local checks passed.** On Windows build `26200` with PowerShell `7.6.9` and Node `v24.14.0`, both reinstalled copies matched the complete inventories and hashes below. Neither contained reparse points. Running each installed Node helper from the repository working directory returned `MP-NODE-E31C`. This verified local resource resolution through paths with spaces and `é`. The original fixtures and verification helper are in the local workspace under `tests/native/`. Both disposable copies remain in place pending results.

| Fixture | SHA-256 |
|---|---|
| Shared queued change | `d2c8449fb54fe043e43451f2eb7620ddcb0c20430e1ffc5c5dc38a4aaaf1b8c6` |
| Shared resource | `76e734dca67c710f1c72a86dc932b45bb8f0d4e5fdaa70e1848beab0e114f7d5` |
| Shared Node script | `259000fa0fc9acef925af384e8018bc358a77b3886f673b3857984e83860ea4a` |
| Codex installed `SKILL.md` | `cd1f51de620deea8b68c573bf810d1e14ce6bc6221bb08edf09c5e4984275303` |
| Codex `agents/openai.yaml` | `a1499d95abd8447558c535fe5554adcc3c9b988a0a39264a6283d430effe1e94` |
| Claude installed `SKILL.md` | `95221023f9a6919e75bf44c1b5229c064aa18c3e0087c90de16028c53b45d6b5` |

## Manual Codex Desktop check

1. Open the ChatGPT Windows desktop app and select **Codex** from the mode dropdown. Select **+** beside **Projects**, choose **Local**, and give it a name such as `ModelPilot native probe`. Attach only `%USERPROFILE%\Documents\ModelPilot Native Probe\Codex café` under **Source folders** and create the project. If the exact project already exists, open it. Start one fresh chat in that project with **Work in → This computer** and **Local**. [Open a local project](https://learn.chatgpt.com/training/codex-lab/index.html?step=project) · [Codex environments](https://learn.chatgpt.com/docs/environments/modes)
2. In **Settings → Usage & billing** (or **Usage**), verify the app is using the ChatGPT subscription, the selected model and speed mode have included capacity, and paid fallback is unavailable. On the personal plan, verify zero usable credit balance and automatic reload off if shown. Leave settings as found. Stop if the route or capacity is unclear or the app asks to use credits, redeem a reset or pay. Record the visible model and effort from the composer. [Codex subscription access](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan) · [Credit use and automatic reload](https://help.openai.com/en/articles/12642688-using-credits-for-flexible-usage-in-chatgpt-personal-plans)
3. In the new chat, type `$modelpilot` and confirm the project skill appears in the picker. Clear the unsent draft. If the project skill is missing or ambiguous, or the app asks for persistent trust or broader access, stop and record it. [Desktop skill picker](https://learn.chatgpt.com/docs/app/slash-commands#use-a-slash-command)
4. Submit the [shared Turn 1 prompt](#turn-1-prompt-for-both-clients) once. Check the ordinary acknowledgment. Recheck the included-usage gate if anything has changed. In the same chat, type `$modelpilot`, select the project skill in the picker, and append the exact text below after the skill chip. Submit that as Turn 2.

   ```text
   effort only. Advise on the queued request. Change the title in queued-change.txt.
   ```

## Manual Claude Code terminal check

1. Open a dedicated PowerShell 7 tab. Verify the existing Claude probe files before saving trust. The helper checks each expected hash. The listing also shows hidden entries and link attributes.

   ```powershell
   $project = Join-Path $env:USERPROFILE 'Documents\ModelPilot Native Probe\Claude café'
   $probe = Join-Path $env:USERPROFILE 'Documents\ModelPilot\tests\native\probe.ps1'
   & $probe -Client Claude -Action Check
   Get-ChildItem -LiteralPath $project -Force -Recurse | Select-Object FullName, Attributes
   ```

   Continue only when the hash check succeeds and the listing shows just `queued-change.txt`, `.claude/skills/modelpilot/SKILL.md`, `.claude/skills/modelpilot/references/probe.txt`, and `.claude/skills/modelpilot/scripts/probe.mjs` and their parent folders. The five expected subdirectories are `.claude`, `.claude/skills`, `.claude/skills/modelpilot`, `.claude/skills/modelpilot/references`, and `.claude/skills/modelpilot/scripts`. Stop on any extra entry, link or hash mismatch.

2. In that tab, omit the API-key override for this process and verify the existing subscription. Continue to launch only when the read-only status reports `loggedIn: true`, `authMethod: claude.ai`, and `apiProvider: firstParty` with a subscription plan. [Claude credential precedence](https://code.claude.com/docs/en/authentication#credential-precedence)

   ```powershell
   Remove-Item -LiteralPath Env:ANTHROPIC_API_KEY -ErrorAction SilentlyContinue
   claude auth status --json | ConvertFrom-Json |
       Select-Object loggedIn, authMethod, apiProvider, subscriptionType
   ```

3. From that same tab, open the exact verified folder and start one fresh interactive session.

   ```powershell
   Set-Location -LiteralPath $project -ErrorAction Stop
   claude --permission-mode manual --prompt-suggestions false
   ```

4. Confirm the trust dialog displays the exact verified `Claude café` folder. Choose **Yes, I trust this folder** for that folder only. This is the one saved trust decision authorized for the test. Exit if the prompt names a different or broader directory. [Claude settings and trust state](https://code.claude.com/docs/en/settings#find-or-create-your-settings-files)
5. In the same session, open `/usage` and verify remaining included capacity. Check the **Usage credits** section of the Claude usage page to confirm paid fallback is unavailable, with usage credits disabled or no usable balance and automatic reload off. Use these controls for inspection and leave settings as found. Stop if the route or capacity is unclear or a paid option is required. Record the model and effort shown, if available. Type `/modelpilot` to verify the project command appears in autocomplete and clear the draft without submitting. Stop if it is missing or ambiguous. [Claude terminal commands](https://code.claude.com/docs/en/commands) · [Usage settings](https://claude.ai/settings/usage) · [Usage-credit behavior](https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans) · [Manual skill invocation](https://code.claude.com/docs/en/skills#control-who-invokes-a-skill)
6. Submit the [shared Turn 1 prompt](#turn-1-prompt-for-both-clients) once. Check the ordinary acknowledgment. Recheck the included-usage gate if anything has changed. Submit the exact Turn 2 prompt below in the same session.

   ```text
   /modelpilot effort only. Advise on the queued request. Change the title in queued-change.txt.
   ```

### Turn 1 prompt for both clients

```text
I am queuing a title-only edit to queued-change.txt. The first line must be exactly "Pilot ready" and the second line must stay byte-for-byte unchanged. I am considering a lower reasoning effort for this work. For now, acknowledge the queue in one sentence. Leave the workspace unchanged.
```

## Acceptance and evidence to send back

Each client has a maximum of two submitted inference turns, including failed attempts. Stop that client's test on a failed submission, unexpected action, or billing uncertainty. Leave both disposable folders available for final verification.

| Check | Expected behavior and evidence |
|---|---|
| Before Turn 1 | Record the client version, model and effort labels if visible, confirmation of included capacity and no paid fallback, and whether the project skill appeared in the picker. For Claude, record whether trust was saved for the exact verified folder. |
| Turn 1 · ordinary context | Acknowledge the queued work in one sentence. Record whether there was any probe activation, marker, tool activity or edit. Expect none. |
| Turn 2 · explicit invocation and context | Record the skill chip or slash command, activation marker `MP-ENTRY-921C`, and both recalled conditions. The first line must be exactly `Pilot ready` and the second line must stay byte-for-byte unchanged. |
| Turn 2 · resource access | Record `MP-RESOURCE-4E7B` and any visible read of the installed `references/probe.txt`. If Node ran, look for actual stdout `MP-NODE-E31C` in the client tool event and record it. |
| Turn 2 · tool permissions | If prompted, allow only a one-time read of the bundled resource or one exact `node "<installed skill path>/scripts/probe.mjs"` command. Deny any wider permission or task execution. Note whether Node ran, was approved once, was denied or was unavailable. Denied or unavailable Node is reduced mode when the response reports it accurately and the other checks pass. |
| Turn 2 · advice only | Record the same-model effort recommendation in one sentence, whether it qualified unverified settings, the model and effort labels after the turn, and any attempted edits, commands beyond the probe or outside calls. A lower effort trial should depend on the setting being available, use the same acceptance check and give a reason to revert. Keeping the current setting is valid when warranted. The workspace and settings should stay untouched. |

Send the attempted turn count, any error or permission outcome, the marker results and a short summary per client. A crop of a synthetic response or tool event is optional. Keep account diagnostics, payment details, identifiers, credentials and private session content out of the report. The fixture hash will be rechecked before cleanup after the owner supplies the observations.

## Checkpoint

Complete both native smoke checks before approving Milestone 2. The owner authorized Claude's saved trust for the exact verified disposable project and will operate both clients. After receiving the owner observations, assess each client as pass, pass in reduced mode, fail or blocked, verify fixture integrity, and remove the two disposable installations. The performance and effort evidence review remains deferred until after the functional skill is built.
