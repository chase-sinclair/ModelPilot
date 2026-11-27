# ModelPilot Batch 1 evaluation

November 27, 2026. All four trios completed with 12 advice responses, eight neutral setup submissions and zero inference retries. Codex used separate setups. Claude used verified forks from a separate neutral parent for each case. The owner supplied native observations, sanitized answer evidence and operational confirmations. The source checks and final fixture audit were rerun independently. The [frozen protocol](https://github.com/chase-sinclair/ModelPilot/blob/9d2c28f8f8eeb80d0debf3b44158ffe1b1f66053/docs/ModelPilot-Comparative-Evaluation.md) used [ModelPilot `86dd470`](https://github.com/chase-sinclair/ModelPilot/commit/86dd4705716f6dd1becc58f676948ef0bd06d598) and [Model Picker `e1c46eb`](https://github.com/limchinhan123/model-picker/tree/e1c46ebc9c4484c67ad96adfe0b7b4bb0716262e).

## Paired outcomes

| Case | ModelPilot versus web advice | ModelPilot versus Model Picker |
|---|---|---|
| Codex A | Critical-override win | Critical-override win |
| Claude A | Clean loss, 90.0 to 97.5 | Critical-override win |
| Codex B | Critical-override win | Critical-override win |
| Claude B | Clean win, 87.5 to 77.5 | Unresolved tool scope |

The clean recommendation-quality tally is **one win, zero ties and one loss**. Both clean pairs came from Claude Terminal. The scores use the original rubric and neutral IDs. The reviewing assistant had already seen the arm assignments, so these are unblinded ratings. The evaluator packet omits arm assignments, timing and tools, and keeps the verbatim answers and links. The owner holds the packet and key locally. [Frozen scoring rubric](ModelPilot-Comparative-Evaluation.md#scoring-rubric)

The five critical-override wins reflect comparator tool deviations. ModelPilot had four observed scope passes. Web advice had two observed passes and two critical deviations. Model Picker had three critical deviations and one unverified scope outcome. Codex A and B established no clean quality pair.

## Codex A · Ordinary web advice

- Advice elapsed time was 19 seconds. Two submissions were used.
- The expanded activity showed a lookup for the approved official model guide URL, an automatic OpenAI Docs skill read and a search for “Recommended models.” Official guidance was returned. The owner reported no permission prompts or visible task execution.
- The advice completed with a critical tool-scope deviation. The extra skill read was outside the authorized web-only scope. All four post-advice fixture audits passed.

## Codex A · Model Picker

- Advice elapsed time was 31 seconds. Two additional submissions were used.
- The expanded activity showed the native Model Picker skill read and the installed `profile.yaml`, `task-matrix.md` and `platforms/codex.md` reads. It also showed `Get-ChildItem -Force -Name -LiteralPath .`, which returned `.agents`, an additional OpenAI Docs skill read and multiple external web searches.
- The recommendation retained GPT-6.2 Sol and proposed a move from Extra High to High. The owner reported task-specific verification and escalation criteria and use of the confirmed options despite the older mappings.
- The advice completed with a critical tool-scope deviation. The directory enumeration, unrelated skill read and web activity exceeded the authorized bundled reads. The subsequent read-only audit verified the saved manifest and checker hashes and all four fixture inventories and file SHA-256 hashes.

## Codex A · ModelPilot

- Advice elapsed time was 11 seconds. Two additional submissions were used. The setup returned `Queued.` and the owner confirmed the correct native `effort` invocation.
- The installed `modelpilot.mjs` ran with `read`. The owner saw no permission prompt and captured the complete native JSON stdout. It showed schema version 1, host `codex`, discovery `not-refreshed`, both bundled Sol and Astra cards, fresh native and guidance records, and empty bundled measurements. Both guidance cards were reviewed on November 27, 2026.
- The final advice linked directly to the reviewed effort guidance and gave its review date. The owner observed no out-of-scope activity and all four post-advice fixture audits passed. This is a clean Codex Desktop `effort` result on the frozen candidate.

- The answer recommended Sol High as a reversible trial, named both test suites and retained the blank, whitespace, zero and decimal checks. It advised restoring Extra High on a failure or repeated rework. The original wording is in the private answer packet. [Direct reviewed source in the response](https://learn.chatgpt.com/docs/models#pick-a-reasoning-effort)

## Codex A · Comparative outcome

All three arms recommended GPT-6.2 Sol at High. ModelPilot recorded two critical-override wins. Codex A contributes zero clean recommendation-quality pairs because both baseline arms exceeded their tool scopes. [Frozen scoring rubric](https://github.com/chase-sinclair/ModelPilot/blob/9d2c28f8f8eeb80d0debf3b44158ffe1b1f66053/docs/ModelPilot-Comparative-Evaluation.md#scoring-rubric)

## Claude Code Terminal A · Readiness

Before Claude A opened, the read-only audit independently verified the original manifest and checker hashes and all four project inventories and 84 file hashes. The frozen order is Model Picker, ModelPilot, then ordinary web advice.

## Claude Code Terminal A · Model Picker

- Advice elapsed time was 30 seconds. Claude A added one neutral setup and one Model Picker advice submission. An initial fork opened in the wrong directory and was exited before inference. The corrected fork passed the pre-advice checks for the neutral transcript, model, effort, permissions and project directory.
- The recommendation classified the task as T1, kept Opus 5.5 and proposed Medium from High. It cited local Model Picker resources and gave verification and escalation criteria.
- Reported expanded activity included reads of Model Picker `SKILL.md`, `platforms/claude-code.md`, `task-matrix.md`, `profile.yaml` and `USAGE.md`, plus a file enumeration covering both installed packages. The exact enumeration command was uncaptured. There is no evidence of ModelPilot file-content reads. The owner observed no external web retrieval or underlying task execution.
- The arm completed with a critical tool-scope deviation on the reported enumeration. The scope of that operation included the ModelPilot installation, outside the approved Model Picker resource reads. Owner and follow-up read-only audits both passed for all four fixtures. [Frozen tool scope](https://github.com/chase-sinclair/ModelPilot/blob/9d2c28f8f8eeb80d0debf3b44158ffe1b1f66053/docs/ModelPilot-Comparative-Evaluation.md#advice-prompts)

## Claude Code Terminal A · ModelPilot

- Advice elapsed time was 15 seconds. The owner submitted `/modelpilot effort` from a verified fork and approved the exact packaged Node `read` helper once. Full actual stdout showed the Claude host, both refined bundled cards, fresh records, unrefreshed discovery and no measurements.
- The answer kept Opus 5.5 and proposed a High-to-Medium trial with all parser acceptance checks and rollback conditions. It identified the guidance as qualitative and disclosed the absence of matched measurements.
- The answer gave the correct November 27 guidance review date. The direct source URL appeared in helper stdout and was omitted from the final answer. The native final-answer citation requirement remains unmet for this invocation. The owner observed no out-of-scope activity and all four post-advice audits passed.

## Claude Code Terminal A · Ordinary web advice

- Advice elapsed time was 43 seconds. One advice submission was used from a verified fork. The reported Fetch wrapper displayed two tool uses, 37.4k tokens and 24 seconds. Those are tool-display observations.
- Both nested calls were native `WebFetch` calls to the two permitted Anthropic URLs and returned HTTP 200. Visible retrieval instructions used generic model and effort questions. The owner observed no shell networking, extra skill reads or task execution. All four post-advice audits passed.
- The observed Fetch grouping is within the frozen web scope on this record. The identified operations are the two approved built-in fetches. Any separately evidenced tool or delegation would be judged under the same scope rule. [Frozen tool scope](https://github.com/chase-sinclair/ModelPilot/blob/9d2c28f8f8eeb80d0debf3b44158ffe1b1f66053/docs/ModelPilot-Comparative-Evaluation.md#advice-prompts)
- The configuration page was reported as 134,659 characters and the relevant material reached the answer through a model-extracted summary. The final answer disclosed the summary. Comparing the verbatim answer to the frozen texts confirmed the substantive wording about clear-scope Medium, verification-oriented High, default effort and restoring effort after skipped checks. The configuration excerpts have minor capitalization or closing punctuation differences.
- The answer kept Opus 5.5 and suggested Medium. It included task requirements, verification and escalation criteria, both direct links and a distinction between session-only and persistent changes. The independent GETs matched both frozen source digests. The sources support Medium as the default and a qualitative fit for scoped engineering on Opus 5.5. They support raising effort when verification is skipped and checking task context when work stalls. The parser acceptance checks come from the scenario. [Frozen model configuration section](https://code.claude.com/docs/en/model-config#adjust-effort-level) · [Frozen effort guidance article](https://claude.com/resources/articles/claude-model-and-effort-level-in-claude-code)
- The configuration snapshot says that a typed `/effort medium` or `Enter` in the picker saves the per-model choice in interactive Claude Code. Pressing `s` in the slider or picker applies it only to that session on supported versions. ModelPilot did not explain this when offering `/effort medium` or the picker. Review session-only trials alongside the Claude final-answer citation gap after frozen collection. [Effort setting scope](https://code.claude.com/docs/en/model-config#adjust-effort-level)

## Claude Code Terminal A · Comparative outcome

All three arms recommended Opus 5.5 Medium. ModelPilot records a critical-override win against Model Picker and a clean loss to web advice. Web advice linked the sources supporting its recommendation and explained the session-only control. ModelPilot gave a shorter answer with explicit tests and rollback, and lost evidence credit for its unlinked source attribution.

## Codex Desktop B · Readiness

The pre-case audit reverified the original manifest, checker and all four project inventories and 84 file hashes. The collection order was ModelPilot `compare`, ordinary web advice, then Model Picker.

## Codex Desktop B · ModelPilot

- Advice elapsed time was 16 seconds. Two submitted turns included a passing neutral setup and the native `$modelpilot compare` invocation. The exact installed `read` helper ran successfully. The owner verified full native JSON stdout with both refined model cards, fresh guidance, unrefreshed discovery and empty measurements.
- The answer recommended Astra High for diagnosis and verification. It retained Sol Extra High as a conditional alternative and suggested Sol High once the remaining work was bounded. The final answer included a direct reviewed link and the November 27 guidance review date.
- The owner observed no out-of-scope tool activity and all four post-advice audits passed. This is a clean Codex Desktop `compare` result on the frozen candidate.

## Codex Desktop B · Ordinary web advice

- Advice elapsed time was 27 seconds. Two additional submissions were used. The answer recommended Astra High for diagnosis and verification, with Sol Extra High and Sol High as conditional alternatives. It included direct official source links.
- Visible native web searches used an approved URL and generic search terms and returned official model guidance. The automatic OpenAI Docs skill read exceeded the web-only scope, as in Codex A. The owner reported no visible evidence that the local user-directory path was transmitted externally.
- The arm completed with a critical tool-scope deviation. All four owner post-advice audits passed. A follow-up read-only audit independently reverified the manifest, checker and all four fixture inventories and file hashes. [Frozen tool scope](https://github.com/chase-sinclair/ModelPilot/blob/9d2c28f8f8eeb80d0debf3b44158ffe1b1f66053/docs/ModelPilot-Comparative-Evaluation.md#advice-prompts)

## Codex Desktop B · Model Picker

- Advice elapsed time was 37 seconds. Two additional submissions were used. The answer recommended Astra High for diagnosis and verification. It offered Sol Extra High as a fallback and Sol High once the cause was established and remaining verification was bounded.
- Reported expanded activity showed reads of the Model Picker skill, `codex.md`, `profile.yaml` and `task-matrix.md`. It also showed a separate OpenAI Docs skill read and multiple unauthorized external searches on GPT-6.2 selection, effort and benchmarks. The advice completed with a critical tool-scope deviation.
- All four owner post-advice audits passed. A follow-up read-only audit reverified the saved manifest and checker hashes and all four fixture inventories and 84 file hashes. [Frozen tool scope](https://github.com/chase-sinclair/ModelPilot/blob/9d2c28f8f8eeb80d0debf3b44158ffe1b1f66053/docs/ModelPilot-Comparative-Evaluation.md#advice-prompts)

## Codex Desktop B · Comparative outcome

All three arms recommended Astra High with similar conditional alternatives. ModelPilot records two critical-override wins. Codex B contributes zero clean recommendation-quality pairs. [Frozen scoring rubric](https://github.com/chase-sinclair/ModelPilot/blob/9d2c28f8f8eeb80d0debf3b44158ffe1b1f66053/docs/ModelPilot-Comparative-Evaluation.md#scoring-rubric)

## Claude Code Terminal B · Ordinary web advice

- Advice elapsed time was 54 seconds. The native Fetch wrapper showed two `WebFetch` calls to the approved pages. Its display reported 39.9k tokens and 45 seconds. The owner observed no out-of-scope activity and all four post-advice audits passed.
- The answer recommended Opus 5.5 High, compared the three confirmed configurations, offered Opus Medium after diagnosis, explained session-only versus persistent controls and provided both direct provider URLs. It disclosed that the effort section came from a model-extracted summary.
- The reconfirmed frozen texts support the technical guidance about High, scoped Medium and setting persistence. The article supports treating a difficult reproduced fault as a reason to consider a stronger model. The answer's per-token pricing claim affects its budget fallback and lacks support in the permitted passages. Its quoted token-limit phrase is also absent from the reviewed sections. The sources support the technical recommendation qualitatively. The evidence rating reflects the unsupported material cost and token claims. Neither establishes an observed critical violation. [Model configuration](https://code.claude.com/docs/en/model-config#adjust-effort-level) · [Model and effort guidance](https://claude.com/resources/articles/claude-model-and-effort-level-in-claude-code)

## Claude Code Terminal B · Model Picker

- Advice elapsed time was 20 seconds. The answer classified the case as T3, recommended Opus 5.5 High, compared all three confirmed configurations and cited local resources.
- The transcript reported two pattern searches and five reads. Observed reads were within the installed Model Picker package. The initial search patterns and scope could not be recovered. The owner observed no external retrieval or underlying task execution. All four post-advice audits passed. Tool-scope compliance remains unverified, so the pairing is unresolved.

## Claude Code Terminal B · ModelPilot

- Advice elapsed time was 8 seconds. The native `/modelpilot compare` invocation used the exact installed Node `read` helper. Full actual stdout showed schema version 1, host `claude`, both bundled refined model cards, fresh native and guidance records, unrefreshed discovery and an empty measurement set. The owner observed no unauthorized tool activity and all four post-advice audits passed.
- The answer recommended Opus 5.5 High for cross-service diagnosis and replay verification, preserved Sonnet High as a conditional option, and reserved Opus Medium for a narrower phase with a reliable check. Its claim that either lower setting would be enough for a localized fix goes beyond the available evidence. A trial with the existing replay check would preserve uncertainty. It linked qualitative guidance with the November 27 review date. The owner verified the hyperlink destination against the bundled guidance source. This invocation passed the direct final-answer link check. [Owner-verified final-answer source](https://claude.com/resources/articles/claude-model-and-effort-level-in-claude-code)
- The answer's two minimum-version numbers are supported by the pinned native cards and the frozen model configuration. The correct mapping is Opus 5.5 at Claude Code 2.1.280 or later and Sonnet 5.5 at 2.1.284 or later. Their native records were reviewed November 24. The answer grouped the numbers without a model-by-model mapping or a separate native citation. The November 27 article link supports qualitative guidance. [Native minimum versions](https://code.claude.com/docs/en/model-config#model-aliases)

## Clean rubric ratings

| Case and arm | Reasoning | Suitability | Evidence | Eligibility | Actionability | Concision | Weighted total |
|---|---:|---:|---:|---:|---:|---:|---:|
| Claude A ModelPilot | 2 | 2 | 1 | 2 | 2 | 2 | 90.0 |
| Claude A web advice | 2 | 2 | 2 | 2 | 2 | 1 | 97.5 |
| Claude B ModelPilot | 2 | 2 | 1 | 2 | 2 | 1 | 87.5 |
| Claude B web advice | 2 | 2 | 0 | 2 | 2 | 1 | 77.5 |

All three Claude B arms recommended Opus 5.5 High. ModelPilot's clean win reflects evidence quality under the frozen rubric. Its native source attribution and repeated alternatives still reduced the score. Both clean comparisons used the same primary choice within each trio. The margins of 7.5 and 10 points are sensitive to one level in the 20-point evidence criterion. A fresh evaluator can use the neutral-ID packet without the arm key or these ratings.

## Reported advice times

| Case | Shared primary recommendation | ModelPilot | Web advice | Model Picker |
|---|---|---:|---:|---:|
| Codex A | Sol High | 11 s | 19 s | 31 s |
| Claude A | Opus 5.5 Medium | 15 s | 43 s | 30 s |
| Codex B | Astra High | 16 s | 27 s | 37 s |
| Claude B | Opus 5.5 High | 8 s | 54 s | 20 s |
| Mean | | 12.5 s | 35.75 s | 29.5 s |

ModelPilot finished first in each observed trio. Its observed mean was 65.0% lower than the web mean and 57.6% lower than the Model Picker mean. Each cell is one owner-timed run. Comparator times include deviations and tool overhead. The results establish descriptive advice-turn times for these cases only. Generalized latency, downstream task quality, token savings and subscription savings require different evidence.

## Integrity and operations

The final read-only audit matched the original manifest and checker SHA-256 hashes, all four hidden-inclusive inventories and all 84 file hashes. Each Codex fixture had 22 files and 11 directories. Each Claude fixture had 20 files and nine directories. Both primary hosts demonstrated native `effort` and `compare` with complete helper stdout and observed advisory-only behavior. Final direct citations passed twice on Codex and once on Claude. Host enforcement remains unverified.

| Operational item | Evidence |
|---|---|
| Included usage and incremental spending | Owner confirmed included subscription usage only and $0 incremental spend. |
| Paid fallback unavailable | Owner confirmation pending. |
| Persistent tool permissions | Owner confirmed none granted during testing. The Claude A ModelPilot helper received a one-action approval. |
| Folder trust | Owner confirmed trust was limited to the designated evaluation folders where required. |
| Client versions | Staging verified Claude Code CLI 2.1.332 and the Codex Windows package version 26.1120.6357.0. Those are local build checks. |
| Earlier native-test closeout | Desktop permissions, trust, prompt-suggestion restoration and billing confirmations remain pending in the earlier records. |

Earlier closeout records remain applicable to those runs. [Functional native acceptance](ModelPilot-Native-Acceptance.md#observed-results) · [Desktop feasibility closeout](ModelPilot-Native-Feasibility.md#desktop-closeout-confirmations)

## Shortest path to personal V1

Defer Batch 2 until after focused refinement. Cases C and D can add evidence about productive checkpoints and unconfirmed picker options. They are unnecessary for identifying the changes exposed here. The first batch gives two clean, split comparisons and repeated comparator tool-scope problems. Use its findings to improve the skill and reserve broader comparison for a separately approved evaluation with a clearly scoped baseline.

1. Make reversible trials explicit on each host. On Claude Terminal, distinguish the session-only picker action from a persistent typed effort level. Keep lower-effort suggestions conditional on the next phase and the verification result.
2. Require the direct, dated qualitative link in Claude replies and attribute any minimum-client claim to its separate native source and date. Keep compare answers focused on the recommendation, alternatives and verification triggers.
3. Under separate approval, run offline checks and a targeted native retest on the revised candidate. Cover Claude Terminal final links, concise `compare`, session-only instructions, unconfirmed eligibility and advisory integrity. Check Claude Desktop citations before claiming the revision on that surface. Verify denied-helper fallback and its withdrawal disclosure.
4. Close the remaining documented release checks for any behavior and surfaces claimed in personal V1. These include `next`, explicit cross-host scope, the standalone Codex CLI smoke, and explicit refresh/import, failure recovery, freshness, separate writable state, project-local update and uninstall. The existing offline suite covers many deterministic checks. Keep the remaining owner confirmations open until verified. [Frozen release checks](ModelPilot-Comparative-Evaluation.md#remaining-release-checks)
