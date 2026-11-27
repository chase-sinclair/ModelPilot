# ModelPilot comparative evaluation

**Preparation · November 27, 2026.** This exploratory comparison measures the usefulness of settings advice in Codex Desktop and Claude Code Terminal for Windows. The primary unit is one host and scenario with three independently produced answers. The [first native acceptance](ModelPilot-Native-Acceptance.md#observed-results) and this evaluation use different ModelPilot revisions. Collection requires separate authorization.

## Candidate and baselines

| Arm | Frozen input and behavior |
|---|---|
| **W · Ordinary web-enabled host advice** | The same local client, respondent configuration and context as the skill arms. Use its built-in web tool only for the permitted provider pages below. Verify a visible public lookup and supporting result. A missing or blocked lookup leaves the web arm incomplete. |
| **K · Model Picker** | Upstream `e1c46ebc9c4484c67ad96adfe0b7b4bb0716262e`. Keep its actual tier instructions, task matrix and host mapping. Customize only the shipped example profile as specified below. Verify invocation and reads of the installed files. Retain the MIT notice. [Pinned upstream](https://github.com/limchinhan123/model-picker/tree/e1c46ebc9c4484c67ad96adfe0b7b4bb0716262e) · [License](https://github.com/limchinhan123/model-picker/blob/e1c46ebc9c4484c67ad96adfe0b7b4bb0716262e/LICENSE) |
| **P · ModelPilot** | Source commit `86dd4705716f6dd1becc58f676948ef0bd06d598`, packaged per host. Use the bundled guidance and empty measurement set. Confirm the native skill and exact local `read` helper. Keep local state empty, with no refresh or import. [Source revision](https://github.com/chase-sinclair/ModelPilot/commit/86dd4705716f6dd1becc58f676948ef0bd06d598) · [Source review](../catalog/coverage.md#november-27-guidance-refinement) |

Model Picker hardcodes older Codex choices and recommends some controls outside these cases, including fast tier and extended thinking. The profile and shared prompt both give it the chance to respect the confirmed options. Preserve its published decision logic and flag mapping-related errors in the results. An advantage caused by stale mappings applies to this pinned comparator. [Codex mapping](https://github.com/limchinhan123/model-picker/blob/e1c46ebc9c4484c67ad96adfe0b7b4bb0716262e/platforms/codex.md) · [Claude mapping](https://github.com/limchinhan123/model-picker/blob/e1c46ebc9c4484c67ad96adfe0b7b4bb0716262e/platforms/claude-code.md)

### Allowed web sources

The digests identify November 27 snapshots obtained by public GET with `User-Agent: Mozilla/5.0` and `Accept-Encoding: identity`. Before each batch, check the cited passages against the reviewed guidance. Record any digest change. A material change in the permitted evidence stops the affected comparison pending review. Native indexed search can serve a different revision. Verify the passages it actually shows and record drift. Score unsupported citations in completed answers under the rubric. [Codex web search modes](https://learn.chatgpt.com/docs/web-search?surface=app)

| Host | Allowed page and sections | Snapshot identifier |
|---|---|---|
| Codex | Model fit under Recommended models and effort under Pick a reasoning effort. [Model guide](https://learn.chatgpt.com/docs/models#recommended-models) · [Effort guide](https://learn.chatgpt.com/docs/models#pick-a-reasoning-effort) | [Markdown body](https://learn.chatgpt.com/docs/models.md) SHA-256 `2ca411d02af5e803e25d60eedcac752c7a6153c2c6dffafdbd854aff61f4277c` |
| Claude | Current levels and their scope under Adjust effort level. [Model configuration](https://code.claude.com/docs/en/model-config#adjust-effort-level) | [Markdown body](https://code.claude.com/docs/en/model-config.md) SHA-256 `5af716d1c4a3db4f932fc9dd5400403f50f335d67a737ff1134dac8757eab0da` |
| Claude | How Claude Code effort level works, Picking an effort level, and What to change when Claude gets it wrong. [Model and effort article](https://claude.com/resources/articles/claude-model-and-effort-level-in-claude-code) | Section text SHA-256 `63643b39ff2c52448baa29bdd2f67e9ee5ad663297d35002311be7f76944a1d9` |

For the guide article, replace HTML tags with spaces from each named `h2` up to the next `h2`. Decode entities, collapse whitespace within each section, then hash the three sections joined by line feeds as UTF-8 with no trailing line feed. The section text matched on two independent fetches despite different surrounding HTML.

## Setup before collection

1. Use four disposable projects rooted at `%USERPROFILE%\Documents\ModelPilot Evaluation\86dd470\`. Create `Codex confirmed`, `Codex unconfirmed`, `Claude confirmed` and `Claude unconfirmed`. Use the confirmed project for A–C and the unconfirmed project for D. In each one install both explicit-only skills locally so that a neutral context can be forked without changing the available skills or directory. Keep the projects free of task files, extra instructions, personal notes and local ModelPilot state.
2. From a checkout of the pinned ModelPilot commit, run `node scripts/package-modelpilot.mjs <codex|claude> "<absolute project folder>"`. It creates `.agents\skills\modelpilot` or `.claude\skills\modelpilot`. In the same skills directory, place the pinned Model Picker under `model-picker`. Export `SKILL.md`, `profile.yaml`, `task-matrix.md`, `USAGE.md`, `LICENSE` and the matching `platforms/codex.md` or `platforms/claude-code.md` from the pinned Git tree. Include `agents/openai.yaml` in the Codex copy. Use a local copy of those files and avoid the upstream installer, symlinks and personal command locations. [Pinned files and usage](https://github.com/limchinhan123/model-picker/blob/e1c46ebc9c4484c67ad96adfe0b7b4bb0716262e/USAGE.md)
3. Adjust only the example Model Picker profile's active host `access` values using this table, plus the Codex example default. Use the exact pair list in the shared setup prompt as the authority on which combinations are confirmed. The profile lists the model and effort axes separately. Preserve the upstream budget policy, tier gating and task mappings. Freeze the final profile bytes alongside the package. [Upstream profile](https://github.com/limchinhan123/model-picker/blob/e1c46ebc9c4484c67ad96adfe0b7b4bb0716262e/profile.yaml)

   | Project | Profile keys for the evaluated host |
   |---|---|
   | Codex confirmed | `access.codex.models: [gpt-6.2-sol, gpt-6.2-astra]`, `reasoning: [high, xhigh]` and `fast_tier: unconfirmed`. Set `codex_default_override` to `gpt-6.2-sol` and `xhigh`. |
   | Codex unconfirmed | Same keys with `models: [gpt-6.2-sol]` and `reasoning: [xhigh]`. |
   | Claude confirmed | `access.claude_code.models: [claude-opus-5-5, claude-sonnet-5-5]`, `effort: [medium, high]` and `extended_thinking: unconfirmed`. |
   | Claude unconfirmed | Same keys with `models: [claude-opus-5-5]` and `effort: [high]`. |

4. Audit the projects before opening them. Save hidden-inclusive directory inventories and SHA-256 file hashes outside the test folders. Reject symbolic links and reparse points. Compare ModelPilot files with the pinned host package and Model Picker files with the pinned blobs, apart from the recorded profile edits. Recheck the complete baseline after every advice turn and before each later case. Keep the earlier acceptance fixtures intact.
5. Verify native discovery, client build, included capacity, unavailable paid fallback and the prescribed web tool. Use local Codex Desktop with **Ask for approval** and Claude Terminal with **Manual**. Use the last observed builds `26.1120.50957` and `2.1.332` or freeze the actual updated builds before any submission. An unavailable required pair blocks that trio. Check the exact settings below in the picker before disclosing them. [Earlier setup](ModelPilot-Native-Acceptance.md#opening-the-four-sessions) · [Claude effort controls](https://code.claude.com/docs/en/model-config#set-the-effort-level)
6. Use the verified project as the only folder. Keep prior chats and personal context out. Set `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` and `CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false` in the dedicated Claude launch shell only. If available, turn off Codex chat-local memory in all arms and verify it in each fork. Use one-action permissions for the arm's approved reads. Reject task inspection, writes, execution attempts, shell networking, connector lookups and broader permissions. Record visible behavior and audit the fixture. [Claude auto memory](https://code.claude.com/docs/en/memory#enable-or-disable-auto-memory) · [Codex desktop commands](https://learn.chatgpt.com/docs/developer-commands?surface=app)

### Frozen settings and common setup prompt

For A–C use the confirmed pair list for that host. For D give the same current pair and withhold all other confirmations, even if the owner knows other picker options. Verify the starting pair in the UI for **every** session. Never apply a recommendation during the experiment.

| Host | Starting pair | Exact other confirmed pairs for A–C |
|---|---|---|
| Codex Desktop | GPT-6.2 Sol, Extra High, all cases | GPT-6.2 Sol, High. GPT-6.2 Astra, High. |
| Claude Terminal | Claude Opus 5.5, High, in A, C and D. Claude Sonnet 5.5, High, in B. | Claude Opus 5.5, High and Medium. Claude Sonnet 5.5, High. Omit the current pair from the alternatives in each case. |

Construct one ordinary message from this template. Replace the bracketed fields with the exact host, that case's text, the confirmed pairs, and the scope below. Send the identical filled text in each branch or independent fresh session. The confirmation is the owner's current observation. Case facts are synthetic.

```text
I am queuing the portfolio development case below for a later settings recommendation on [host]. The case describes work under consideration. This turn is only for context. Reply exactly “Queued.” and use no tools or skills.

Case: [case paragraph]

My current model and effort are [current pair]. Other confirmed choices for this advice: [exact alternatives, or "I have not confirmed any other selectable model and effort pair."]. Use these exact current and selectable pairs ahead of examples or defaults. [case scope]

For my later question, give concise manual settings advice and the task-specific reason. Include the check or change in circumstances that would affect the recommendation. Support material external claims with traceable sources where available. I will request any actual work separately. No task inspection, commands for the task, edits, implementation plan or changes to model, effort or permissions are requested.
```

### Cases used on both primary hosts

| Case | Frozen case paragraph | Scope sentence |
|---|---|---|
| **A · Bounded implementation** | A portfolio dashboard imports holdings from CSV. Its TypeScript row parser turns blank or whitespace-only unit prices into zero. The agreed change is confined to that parser and its tests. Blank or whitespace-only input must produce the existing missing-price error. Literal `"0"` and `"12.50"` must keep their existing behavior. The focused parser test and existing import suite are fast and deterministic. The source of the failure is already localized. | `Keep the current model and compare effort only.` |
| **B · Cross-service diagnosis** | A portfolio snapshot importer sometimes displays old data after a newer refresh. A web handler enqueues refreshes, a worker retries timed-out jobs and a dashboard reads a cached snapshot. In a synthetic replay, the older job finishes last. Two attempted fixes passed local unit tests but failed that replay even with the observed event order captured. The next phase must explain the ordering across services and verify both out-of-order completion and retry cases before proposing a change. Stale values published as current would be a serious data-integrity problem. | `Compare the confirmed configurations on this host for the diagnosis and verification phase.` |
| **C · In-progress checkpoint** | A portfolio dashboard table is being updated for compact and mobile layouts. This chat has already resolved the column-priority and rounding rules, produced the current patch, and checked the wide layout and unit tests. Only the mobile overflow and empty-state regression checks remain before a review checkpoint. There is no unresolved design decision or repeated failure. I want to avoid re-explaining the reasoning behind the patch for these last checks. | `Consider keeping the current configuration through the checkpoint as an available option.` |
| **D · Incomplete research and eligibility** | A portfolio export will show when each data source was last updated. The provider's docs describe both a data timestamp and a response timestamp but leave their relationship unclear during delayed backfills. There is no representative delayed sample or confirmed freshness contract to choose from. The next useful result is evidence of which timestamp tracks the actual data and what the export should show when that value is absent. I have not checked alternate settings in this client's picker for this request. | `Assess the next step within this host using the options I have actually confirmed.` |

### Advice prompts

All arms receive the same setup and case scope. Use the exact prompt or skill qualifier for that arm. Approve only the approved read or lookup if it prompts.

- **W.** `Give settings advice only for the queued case and its confirmed choices. Use the built-in web tool to verify relevant official guidance at [allowed URL or URLs for this host]. Use only generic provider, model and effort terms in lookups. Keep case text, paths and account information out of tool arguments. Cite what the source actually supports.` Substitute the two Codex section links for Codex, or the two Claude page links for Claude. Allow a public read of those pages only. Record cached or live mode where visible. Keep shell and other network access off.
- **K on Codex.** Select **Model Picker** and append `Recommend settings only for the queued case and its confirmed choices.` Keep this project-local skill even if a similarly named global item is present. Verify the source path.
- **K on Claude.** `Use the installed project-local model-picker skill to recommend settings only for the queued case and its confirmed choices.` This is the upstream explicit plain-text route. Verify activation and the local resource reads. The upstream slash wrapper references a personal installation, so use the scoped plain-text route. [Upstream invoke syntax](https://github.com/limchinhan123/model-picker/blob/e1c46ebc9c4484c67ad96adfe0b7b4bb0716262e/USAGE.md#claude-code)
- **P on Codex.** Select the native **ModelPilot** item and append only `effort` for A or `compare` for B–D. Approve the packaged resource reads and exact `node "<installed ModelPilot directory>\scripts\modelpilot.mjs" read` if prompted.
- **P on Claude.** Type the complete `/modelpilot effort` for A or `/modelpilot compare` for B–D before pressing Enter. Give the same one-action helper permission. Keep the packaged guidance available and verify actual stdout, including the host, bundled origin, two cards, empty measurements and unrefreshed discovery.

Only W may use external web resources. K may read the installed Model Picker resources. P may read the installed ModelPilot resources and invoke its exact read helper. No other tool is in scope for advice. A comparator that cannot load its sources is recorded as blocked or incomplete with the reason and actual submissions.

## Collection sequence and submission allowance

The matched minimum is **32 submissions** if both native clients can fork a clean setup without inference. That is 24 advice submissions and 8 neutral setups. Use a separate untouched parent for each host/case. After its one neutral setup, create three fresh chats with only that setup transcript. On Codex Desktop use the local `/fork` command if exposed. On Claude Terminal use `claude --resume <setup-session> --fork-session` from the same project and repeat the case's launch flags. Keep session identifiers private. Before any branch advice, verify the same project, declared model, effort and permissions in each branch, and confirm all three contain only the setup and its acknowledgment. Keep the parent unchanged. This workflow is documented and still needs a native check in the approved collection. [Codex local fork](https://learn.chatgpt.com/docs/developer-commands?surface=app) · [Claude resume and fork flags](https://code.claude.com/docs/en/cli-reference)

If a fork is unavailable or fails its pre-advice check, use individual fresh sessions with the identical setup and neutral acknowledgment. The untouched parent may serve as the first arm. The full envelope is **24 advice and up to 24 setup submissions**, **48 total**. Each batch needs 16 submissions with verified forks on both hosts, 20 with forks on one, or 24 with individual setups on both. The cap includes unintended, interrupted and failed submissions. Single-turn collection would change the tested ModelPilot workflow. A setup that uses tools, gives advice or changes facts blocks that case.

| Batch | Case order | Arm order within each trio |
|---|---|---|
| 1 | Codex A, Claude A, Codex B, Claude B | W–K–P, K–P–W, P–W–K, W–K–P |
| 2 | Codex C, Claude C, Codex D, Claude D | K–P–W, P–W–K, W–K–P, K–P–W |

1. Before Batch 1, record the repository pins, project manifests, case text, allowed source snapshots, actual builds and client settings, and whether forks are available. Use a dedicated tab for Claude with `claude --model '<exact model ID>' --effort high --permission-mode manual`. On Codex choose the stated configuration in each fresh local chat. Keep configurations and sources stable across batches.
2. Finish one matched trio before moving to the next. Time each advice submission until the final answer, with a 180-second ceiling including one-action permission waits. Record the setup method, timeouts, cache mode and permission waits separately. Retain the scoped tool outcome, final source link and claim, case ID, build and settings, integrity result and submission count. Stop on an out-of-scope attempt, configuration or file drift, or uncertainty about included usage. Count the submission and preserve the result.
3. Review Batch 1 before authorizing Batch 2. If the candidate, comparator, settings, prompts, source content or scoring rules would need a material change, keep the partial results as formative and seek approval for a freshly pinned evaluation. Use the same revision for both scored batches. Save only sanitized observations, timings and counts; keep raw chats, permission screens, identifiers and billing details private.

The requested collection approval is for the named disposable projects and audit, exact-folder trust where needed, per-session model and effort selection, process-local Claude toggles, one-action resource/helper permissions and the limited public reads in W. Start with **Batch 1 only**, 16 submissions with verified forks or a cap of 24 to cover isolated setups. Confirm included usage and `$0` incremental spend. Hold Batch 2 for review under the same limits. Compare native advice only. Record current release-blocker checks separately.

## Scoring rubric

Retain the proposed weights. Task-specific reasoning scores the explanation. Suitability scores the choice that follows. An answer can understand the task and still pick an unnecessarily costly or disruptive option. The evidence score rewards accurate, traceable support and candid limits across all arms. ModelPilot's direct link with its own review date is additionally a **native acceptance** check for P.

| Criterion | Weight | 2 · Full credit | 1 · Partial credit | 0 · No credit |
|---|---:|---|---|---|
| Task-specific reasoning | 25 | Connects the next phase, risks, progress or failure evidence to the choice. | Cites a relevant fact with a generic explanation. | Ignores or misreads the decision-critical facts. |
| Recommendation suitability | 25 | Proportionate stay, trial, escalation or deferral with a reason to favor it. | Plausible with unnecessary switch friction, over-caution or a missed useful trial. | Poor fit for the task phase, stakes or verified options. |
| Evidence quality and source accuracy | 20 | Material external claims have traceable, relevant support. The answer distinguishes what is known from what is inferred or unavailable. | Source is identifiable but indirect, or an important qualification is missing. | Material claims lack support, misuse a citation or conflate guidance and measured results. |
| Eligibility and uncertainty | 15 | Uses exact confirmed pairs and qualifies materially unknown settings or task facts. | Largely scoped with an ambiguity that limits action. | Ignores the supplied scope or misses a decisive uncertainty. |
| Actionability and verification | 10 | Gives an immediate manual decision and a concrete check, stop point or rollback trigger. | Gives a usable action with a vague verification step. | Leaves the user without a practical next decision. |
| Conciseness | 5 | Readable and compact while preserving the relevant rationale and caveats. | Understandable with avoidable repetition or clutter. | The decision requires digging through irrelevant material. |

For A, a reversible confirmed effort trial and the blank/zero checks make a strong answer. An adequately grounded keep-current choice can also score well. For B, reward attention to the repeated cross-service failure and the replay checks. Either an eligible model change or a grounded stay can fit. For C, finishing the mobile and empty-state checks with the current configuration may be preferable to a late switch. For D, an evidence-gathering step or conditional recommendation should preserve uncertainty about the timestamp and picker. These are scoring anchors for the grader, outside the prompts.

**Critical override.** Flag actual or attempted task inspection, task execution, a change to files or settings, unauthorized tool access or transmission, disclosure of private data, invented performance data, materially false source claims, or an unconditional claim that an unconfirmed setting is selectable. A critical result loses against a valid completed arm regardless of the weighted score. Report blocked, incomplete and dual-critical comparisons separately. A critical ModelPilot result blocks a release recommendation until resolved.

An evaluator scores randomly relabeled answers before seeing timing or arm identity, when practical. Keep response text, source links and qualifiers intact while hiding client banners and tool logs. Verify tool scope and integrity separately and apply the critical flags before reporting. Output style or citations may reveal an arm. Compute `Σ(weight × rating / 2)` out of 100. Compare P with W and K on each matched host and case. A difference of at most 5 points is a tie, so concision alone never decides a pair. Report valid pairs, wins/ties/losses, critical or missing arms, the reasons for material wins and losses, and wall time separately by host and arm. These are exploratory observations across four cases per host. Quality retention, task completion time, token use and subscription impact need a separate task-outcome study.

## Remaining release checks

- On this candidate, verify direct links and the date associated with the cited source, November 27 for bundled guidance or November 24 for native support. Verify clean Claude Terminal invocation and full actual stdout on both primary clients. Batch 1 can cover these checks with the exact evidence. Repeat the Claude Desktop citation check before claiming the fix on that surface.
- Exercise native offline fallback, including honest disclosure about unchecked local withdrawals, and the outstanding standalone Codex CLI smoke. Test `next` and explicit cross-host/global scope separately. A–D cover ordinary advisory context, `effort`, `compare` and unknown eligibility when they pass.
- Verify the native data and installation lifecycle. Cover explicit refresh and import, failure and recovery, freshness, independent project-local updates and uninstall, and a read-only project with a separate state base. The [offline suite](../tests/modelpilot.test.mjs) covers many of the deterministic paths. Record native behavior under its own approved scope.
- Close out the outstanding permission, folder trust and billing fields, including earlier Claude Desktop confirmations and restoration of prompt suggestions. The successful workflow shows advisory behavior under the tested settings. Host enforcement remains unverified. [Native results](ModelPilot-Native-Acceptance.md#observed-results) · [Earlier Desktop closeout](ModelPilot-Native-Feasibility.md#desktop-closeout-confirmations)
