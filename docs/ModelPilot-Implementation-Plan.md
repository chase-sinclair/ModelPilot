# ModelPilot implementation plan

**November 25, 2026 · Personal Windows pilot · Codex regression staged.** The owner accepted the [Phase 1 evidence register](../catalog/coverage.md) and the [Phase 2 manual findings](ModelPilot-Native-Feasibility.md). The revised Codex probe is staged for the approved two-turn manual regression. Milestone 2 awaits approval.

Start with one canonical skill, structured source-linked intelligence, recommendation instructions and lightweight data utilities. Test native interaction early. Add targeted decision logic only if observed behavior warrants it. Deliver explicit key-free metadata refresh for personal V1.

The [product brief](../ModelPilot-Skill-V1-Codex-Handoff.md) and [architecture review](ModelPilot-Architecture-Review.md) document the rationale. Section 2 preserves the research findings. Sections 3–6 reflect the approved scope refinement.

## 1. Product and release contract

| Decision | Consequence for the build |
|---|---|
| B1 · Advisory usefulness earns investment | Start with an exploratory comparison with ordinary web-enabled advice and the pinned Model Picker on each host. Prioritize useful actions, grounded uncertainty, manageable overhead and zero critical errors. An engine ablation is conditional. A later downstream study would be needed for savings or task outcomes. |
| B2 · Two primary clients, one secondary check | Full validation on Codex Desktop for Windows and native Claude Code in a Windows terminal. A separate Codex CLI smoke result has its own label. Codex is the sole developer. Neither host is a dependency of the other. Other OSes, WSL, IDE and cloud surfaces have no acceptance claim. |
| N1 · Data can change without a skill reinstall | Trusted local import is the first increment. V1 also needs an explicit key-free refresh of permitted metadata plus automatic **local** age checks during advice. Reviewed evidence can be imported independently. New identities start with unknown performance. No hosted service, background poll or network research during ordinary ModelPilot advice. |
| N2 · Four initial inference turns | The original manual run submitted five turns against four approved, including one accidental interrupted Claude invocation, with no incremental spend observed. The owner separately approved up to two manual Codex regression turns using included capacity at $0 incremental spend. Preparation used zero of those turns. Other native inference requires a separate allowance. |
| Scope and authority | Advise when invoked. Default to the current host and task. Honor next, effort only, explicit compare and explicit/configured cross-host intent. Suitability and risk precede efficiency. Staying, a reversible effort trial, conditional advice, or abstention can each be the best response. The developer makes any change. |
| Deferred | Antigravity, UI, hooks, telemetry, auto-switching, quota inspection, user accounts, automatic context transfer, multi-agent orchestration, broad leaderboards and hosted infrastructure. Artificial Analysis data, API and MCP are excluded absent appropriate written rights and a new scope decision. [Data platform terms][aa] |

**Starting environment, observed in Run 1.** Windows build 10.0.26200.0, Codex Desktop x64 26.1117.4957.0, bundled Codex CLI 0.171.0-alpha.13, native Claude Code 2.1.325, Node v24.14.0 and PowerShell 7.6.9. These are baseline versions to record again at each test. The repository contained the handoff and review at the start of Run 2. There are no implementation files or verified native compatibility results to inherit. No minimum client version is certified.

## 2. What the broader effort evidence supports

Run 1 found **zero matched same-model effort sweeps among 52 target-host entries** in two pinned Terminal-Bench submission repositories. That finding holds within those submissions. All four additional sources contain genuine effort comparisons. They answer different questions, and even a well-controlled historical comparison can have no decision value for the owner's current picker. Source observations below are from November 24, 2026. No benchmark was re-executed. [Run 1 audit](ModelPilot-Architecture-Review.md#what-the-public-data-actually-covers)

| Source and measured configuration | What changes the interpretation | Proposed permission and use decision |
|---|---|---|
| **Stet**, May 7, 2026. GPT-5.5 in Codex 0.128.0, low/medium/high/xhigh on the same 26 historical changes in one Go GraphQL repository. Test passes by level were 21, 21, 25 and 24. | One run per task/level. GPT-5.4 graded patches blind to the label, without human calibration on this set. Review and semantic-equivalence outcomes behave differently from tests. The model label does not resolve a dated backend revision. Relevant to similar repository repairs, with poor coverage of design or open-ended architecture. | Public article and a dedicated evidence table. No clear structured-redistribution grant established for the study. Link and describe the method in original words. Keep rows out of the shipped catalog pending a documented basis for that use. [Study][stet] · [Evidence table][stet-table] |
| **OptiFlume**, October 2026 runs. Forty configurations on the same 20 Terminal-Bench 2.0 tasks, normally one run per cell. A second Haiku 4.5 set accounts for the total of 820. Most are Claude models in Claude Code. Five sets used Cursor. | 63 paired effort comparisons, small sample and deadline-sensitive outcomes. A lower level failing to lose significantly does not demonstrate equivalent quality. In 25 runs some calls fell back to Opus 4.8. Attempted-task cost uses list prices. The public study does not pin every client build or model revision. Mixed Haiku results, fallback-contaminated rows and Cursor data cannot establish a clean native Claude/Codex pair. Codex was never tested. | The publisher expressly invites use/citation with attribution and says there is no separate downloadable dataset. The exact scope for automated collection and redistribution of a normalized table remains unresolved. Cite the study, retain its caveats, and seek a clearer grant before importing structured numbers. [Study and citation policy][opti] · [Leaderboard][opti-board] · [Terms][opti-terms] |
| **ResearchEnvBench**, IJCAI 2026, §4.4/Table 3. GPT-5.3-Codex, same Codex agent interface at low/medium/xhigh. Clean Ubuntu 22.04 containers and two RTX 4090s. Stage denominators differ, e.g. 29 applicable CPU cases and 32 distributed cases. | Xhigh improved runtime readiness while medium had the fewest reported capability/path/version errors in aggregate. There is no measured high row. Relevant to research-environment synthesis. The released Dockerfile installs the CLI without pinning its version. Actual run binary, production model snapshot and replication count per condition need stronger evidence for exact client matching. | The proceedings reserve rights and require permission for certain republication. The CC BY 4.0 arXiv v2 has a **different Table 3**, about resource use across agents. The MIT repository license covers its applicable artifacts. Neither establishes redistribution of the final ablation table. Cite §4.4 as historical context. A released result file containing that same ablation with verifiable provenance and rights could change this decision. [Proceedings][reb] · [Reuse policy][ij-rights] · [Preprint v2][preprint] · [Repository][reb-repo] · [Dockerfile][reb-docker] |
| **EffortMining**, pinned revision 09090cf. Pilot on claude-opus-4-8, Claude Code 2.1.201. Twelve isolated tasks × five levels × three repetitions, 180 runs. Its July follow-up covers document-grounded research, coding and composites. | The pilot reports 64.7% fewer **output tokens** for calibrated dispatch versus xhigh inheritance on its workload. Its composite test failed the project's own dominance criterion and the refit retained a no-win verdict. Categories can saturate on easy fixtures. Headless per-subtask tests and multi-part dispatch differ from advising an interactive developer mid-session. | Strongest candidate for an inspectable historical evidence card. MIT at the pinned revision. Verify scope for the specific result artifacts, include the notice where required and preserve both outcomes. No hooks, task classifier, transcripts or executable benchmark harness need to be imported. [Pilot][em1] · [Composite results][em2] · [Campaign history][em-story] · [License][em-license] |
| **OpenAI release studies.** The gpt-oss-120b and 20b model card tabulates low/medium/high on SWE-bench Verified using a fixed 477-task subset, plus Codeforces with and without tools. The GPT-5.1-Codex-Max release discusses a matched-medium comparison between two models and separately gives headline results at different maximum settings. | The first source is a real effort curve in a research harness. It establishes neither eligibility in the current app nor performance for GPT-6.2. The second illustrates why a cross-model row with effort in its label need not be a same-model curve. A recommendation to use medium is provider guidance. | Cite methodology and guidance. Admit only clearly labelled, use-cleared source rows that meet the actual target configuration and metric. No numeric estimates from chart pixels and no inferred values for intervening effort levels. [gpt-oss evaluation][oai-oss] · [Codex-Max release][oai-max] |
| **Anthropic release studies.** The Opus 5 release plots cost and performance across effort on CursorBench 3.2 and other workloads. The Opus 5.5 release includes newer effort curves and distinct Terminal-Bench and CursorBench conditions. Sonnet 4.6's system card §2.4 reports high/max on OpenRCA, three-run averages in the benchmark author's harness. | Useful for separating axes, comparing adjacent settings and identifying task-specific risks. Preserve the benchmark revision, scorer, harness, accounting and first-party status. CursorBench is an adjacent harness for our two clients. A release page may mix in third-party results with separate rights. | Link to the exact section/figure. A license for model weights or a public press page supplies no blanket clearance for a normalized benchmark feed. Exclude AA-sourced rows even where a provider republishes them. [Opus 5 curves][an-opus5] · [Opus 5.5 methodology][an-opus55] · [Sonnet 4.6 card][an-sonnet] |

**Engineering implication.** Historical effort evidence exists on both hosts. The open question is the intersection of **current eligible model, compatible workload and harness, useful outcome metric, and permitted use**. A published positive result for one outcome and a neutral or negative result for another should both survive curation. For instance, a terminal task with a short deadline and a semantic code-review task can justify different reversible trials. Neither supplies an all-purpose effort ranking.

### Discovery metadata and native host evidence

- **Models.dev metadata.** A public GET returned HTTP 200 with 42 OpenAI and 18 Anthropic API entries. A conditional GET returned HTTP 304. Phase 1 traced the initial identities to source records in the MIT-licensed repository and selected a small discovery allowlist. The adapter uses that scope with proper attribution. [Endpoint][md-feed] · [Pinned API contract][md] · [License][md-license] · [Validation and field allowlist](../catalog/coverage.md#source-permissions-for-the-personal-pilot)
- **Codex host metadata.** Phase 1 resolved the previously observed bundled CLI build to its public source commit. The bundled JSON corroborates model identities and supported effort levels. The desktop service and picker determine live availability. Keep this source as a reviewed reference. [Pinned catalog][cx-catalog] · [License][cx-license] · [Codex models][cx-models]
- **Claude Code and runtime support.** Use the documented host model/effort controls and a dated owner-confirmed picker subset for pilot availability. Both providers' authenticated model-list APIs address API clients. A Codex App Server client can query its own connection, but a portable skill has no established bridge into the invoking desktop connection. Do not start another session to fill this gap. No anonymous Claude Code entitlement feed was established. Refresh supports both API families on equal terms. Neither side gets automatic verification of the user's access. [Claude settings][cl-model] · [Claude models API][cl-api] · [Codex App Server][cx-server] · [OpenAI models API][oai-api]
- **Other intelligence.** Consider pinned Terminal-Bench submission files for exact measured model comparisons and EffortMining result revisions for curated historical cases. Check result authorship, notices, run method and underlying third-party terms per artifact. Source updates create review candidates. The initial implementation needs only one network adapter. A reviewed evidence file can still arrive through trusted local import. A second live feed, distributor account or hosted manifest is unnecessary for V1. [Terminal-Bench records][tb] · [EffortMining reports][em1]

## 3. Architecture and interfaces to implement

**One canonical body, two independent packages.** Keep the skill instructions, references and data utilities together in `skills/modelpilot/`. Use the Claude Code manual-invocation flag and the Codex manual-invocation sidecar in the respective packages. Explicitly invoke `/modelpilot` or `$modelpilot` with ordinary qualifiers. Each package works from its own project or personal installation with self-contained resources and local data. A small Node 24 standard-library utility can validate, import and refresh data. A maintained bundled reference supplies dated guidance if Node or script permission is unavailable. [Agent Skills specification][spec] · [Codex skills][cx-skills] · [Claude Code skills][cl-skills]

| Area | Minimum contract |
|---|---|
| Recommendation | The host reads the current conversation and compact source-linked cards. Check host, user-confirmed eligibility and effort support, then use task requirements and switch friction to choose stay, recommend, reversible trial, conditional advice or abstain. Effort-only holds the model fixed. Report the material limit and the owner's manual next action. |
| Intelligence | Keep metadata, reviewed host controls and effort guidance, measurements if admitted, and the private local profile distinct. Use a versioned schema with per-source provenance and observation or review dates. A measurement needs identity, configuration, task and harness, result unit and denominator, and use rights. Source age and local check time are separate. |
| Updates | Trusted local import supports independently reviewed evidence and host guidance. Explicit network refresh updates permitted discovery fields. New IDs start with unknown native eligibility and performance. Ordinary advice uses local data and local freshness checks. Use the selected field allowlist in the [source register](../catalog/coverage.md#source-permissions-for-the-personal-pilot). |
| Privacy | Keep task text and private profile data out of updater inputs, network requests, diagnostics and exported data. Never derive eligibility from a remote listing or the host model's guess. Read known resources with bounded inputs. Treat imported content as data. |

**Storage.** Use simple versioned local snapshots with last-known-good copies and separate paths per host. Validate updates before replacing a live file on the same volume. Failed or interrupted writes preserve a usable permitted snapshot or fall back to the bundled seed with its date. Apply current source restrictions to fallback data. Add serialization or extra storage machinery only if tests reveal a concrete integrity issue. Store profiles outside transferable snapshots.

**Evidence.** Compatible, use-cleared measurements can support comparisons within their stated scope. Provider guidance can support capability choice or a reversible trial with an existing success check. Unknown access, stale host support, unmatched versions or incompatible metrics call for a qualification or abstention. Same-named efforts are model-specific. A numeric API price is distinct from subscription impact.

## 4. Milestones and approvals

| Milestone | Engineering tasks from the original plan | Exit evidence |
|---|---|---|
| 1. Evidence validation and native feasibility | 1 · Minimum evidence and source permissions. 2 · Disposable native probe. | A viable initial catalog and separate Windows observations for both clients. |
| 2. Functional skill and explicit refresh | 3 · Canonical instructions and local data. 5 · Explicit refresh. 4 · Narrow decision logic only if failures justify it. | Two standalone packages, validated updates, fallback and an instructions-led baseline. |
| 3. Native validation, comparative evaluation and refinement | 6 · Required native behaviors and separate CLI smoke. 7 · Small comparative pilot. | Observed compatibility, paired advisory results, and a record of fixes or gaps. |
| 4. Release packaging and portfolio documentation | 8 · Personal packages and reproducible documentation. | Supported client builds, install/update/remove instructions, notices and appropriately scoped claims. |

Approve the next milestone as a unit where practical. Later scoped installation, native inference, spending and external publication each need authorization. Track material findings and approvals in the milestone deliverables.

### Milestone 1 — Evidence validation and native feasibility

**Phase 1 — Evidence coverage and source permissions.** The [initial catalog and source permissions](../catalog/coverage.md) documents two candidate identities per host, the owner-reported coverage counts, one bounded effort trial per host, and the limits on measurements and automated refresh. Both hosts have actionable guidance and an abstention boundary. Broader research is optional when a real decision requires it.

**Phase 2 — Minimal native feasibility.** Both primary clients discovered the project skill and recalled the queued acceptance conditions. Codex Desktop edited the queued file during its advisory turn. Claude Code preserved its files, with interrupted Node execution and an additional invocation outside the prescribed sequence. The [per-client record](ModelPilot-Native-Feasibility.md) documents the verified file change, turn count and staged wording-only Codex regression.

### Milestone 2 — Functional skill and explicit refresh

1. Build the instructions-led skill and two native packages. Add a small versioned catalog, dated fallback, and trusted import for updated evidence and reviewed native settings. Use the host's existing context to produce an action with grounded limits. Keep the initial candidate set small.
2. Implement one explicit Models.dev refresh against the fixed public HTTPS endpoint. Bound response size and time, reject redirects and malformed or unexpected projections, and send only the necessary request metadata and optional validator. Accept only the approved fields. Mark new identities as discoverable, quarantine conflicting identities and leave host support and evidence untouched. A 304 can advance the fetch check time. It cannot advance the age of evidence. Validate the staged file before activation and exercise last-known-good recovery. Use local age checks on advice. Refresh and evidence import both work without reinstalling.
3. Retain automated tests for schema and version handling, trust and withdrawal, invalid/stale data, mismatched effort and evidence, path/command handling, unrelated file preservation, no egress on advice, profile and request payload privacy, and interrupted or denied updates. Exercise stale data, absent runtime and fresh baseline for both package layouts. Test a failed refresh followed by a successful retry and verify a newly discovered model gets no inferred recommendation. Any public integration GET during this milestone needs to be in its authorized network scope.
4. Exercise the host instructions with the verified cards before writing decision code. If failures recur on independent cases after a focused prompt or data correction, encode the smallest check that prevents the demonstrated failure. Candidates include rejecting an unsupported effort pair or suppressing an incompatible evidence reference. Fix any critical violation before further native collection. Keep neutral data validation regardless of the decision approach.

### Milestone 3 — Native validation, comparative evaluation and refinement

**Native release checks.** Record client/version, candidate package, actual permissions and pass/fail/blocked/untested for each required behavior. Obtain approval for a short case-to-turn sheet and any comparator setup or network use. Synthetic scenarios and local fixture tests can share cases where that preserves coverage.

| Check | Required evidence |
|---|---|
| Independent native use | Clean project copy and explicit invocation in Codex Desktop for Windows and native Claude Code terminal for Windows. Check no passive trigger, same-chat context, next/effort-only, explicit compare and cross-host scope, unknown/unsupported settings and no task execution or model switch. |
| Data, failure and lifecycle | Check fresh/stale/unknown evidence and new models, explicit refresh/import success or visible denial, Node missing/denied, paths with spaces and Unicode, read-only project with separate writable state, fallback and project-scope update/uninstall. Verify the copy works independently of the other host and original checkout. Test unrelated file preservation and last-known-good recovery. |
| Codex CLI | Separate scoped smoke check with its own build and observations. Desktop evidence comes from the desktop client. |

**Initial comparative evaluation.** Use **four representative scenarios per platform**, each run with ordinary web-enabled host advice, [the pinned Model Picker][picker] and ModelPilot. Budget **24 advisory invocations before setup or retries**, subject to separate approval of included-use turns, network scope and zero incremental spending. Cover a bounded effort trial, a harder model-fit decision, a keep-current case, and a case with inadequate evidence or eligibility. Freeze prompts, date, available settings, host and comparator versions and rubric. Use matched context in fresh sessions and blind the answers where practical. Use the real comparator and report blocked arms.

Review groundedness, practicality, uncertainty, omissions, unnecessary abstentions and completion time. Record paired wins, losses and ties per host with counts and failed attempts. Require **zero critical errors** including invented measurements, false certainty about eligibility, unauthorized transmission or execution, secret leakage or unintended changes. Use results to decide whether advice adds enough value for personal use and fix recurring problems. With four cases per host, report the outcome as exploratory. Run a separate same-evidence engine ablation only if decision logic was actually added and a separate allowance is approved.

### Milestone 4 — Release packaging and portfolio documentation

Prepare two independent local release packages and short install, refresh/import, rollback and uninstall instructions. Run the full local tests and verify that the released contents match the native-tested behavior. Keep a small record of tested builds, compatibility limits, source notices, representative decisions and comparative results. Clearly label synthetic examples and observed results. A persistent user-level install or external publication needs its own approval.

## 5. Personal V1 acceptance

- Both primary Windows clients pass their required native behaviors with the shipped version. The Codex CLI smoke has its own result.
- Explicit advisory use from current context stays within scope, grounds its recommendations and respects uncertainty. Critical correctness, privacy and safety tests pass.
- Both independent installations support explicit permitted metadata refresh, trusted evidence updates, local freshness and last-known-good fallback. The user's local profile stays separate.
- The exploratory comparison reports all outcomes with zero critical errors and gives the owner enough evidence to decide on usefulness. Recurring problems are fixed and any materially affected native checks are repeated under an approved allowance. The documentation supports only the measured claims.

### Optional expanded study

For stronger evidence, keep a 36-case corpus with 24 development cases and 12 sealed held-out cases. Run the three main arms with every held-out case on both platforms for **72 advisory invocations before setup or retries**. Add **24** only if an engine exists and a separately approved same-evidence ablation would resolve an architecture choice. Freeze client settings, content/evidence versions, host tool access, compatibility rules, budgets and a rubric before collection. Balance order, blind reviewers, and use an independent answer key that accepts multiple supported actions.

Report paired wins/losses/ties per comparator and platform, actionable coverage, treatment of unanswerable cases, citation entailment, critical errors, failed attempts, answer length and latency. Predeclare meaningful differences if drawing a stronger conclusion. The original thresholds for this larger study were three net wins per host against each main comparator, viable actions in at least three of four designated actionable cases, qualification of all unanswerables, zero critical errors, normal responses within 120 words and median added wait at most 30 seconds. If testing an engine, compare the same candidates and evidence before its decision filters. Retain the simpler variant when it is comparably useful and grounded. Trace any material gain to the specific check that created it. Mixed results call for inspecting failures or using a fresh holdout.

A downstream study would need its own approval and budget. A possible design is four original tasks, two configurations and three repetitions for one host (**24 task executions**). Match snapshot, tools, success criteria and deadlines, randomize order, and blind the review. Measure accepted outcomes, retries, time and usage, including advice overhead. Savings and quality-retention claims depend on such outcomes.

## 6. Current decision and handoff

Assess the [owner-run Codex regression](ModelPilot-Native-Feasibility.md#manual-codex-desktop-regression). A Codex pass opens a separately authorized clean Claude terminal repeat. Claude Code Desktop remains a proposed optional Windows surface for its own [independent check](ModelPilot-Native-Feasibility.md#claude-code-desktop-compatibility). Request Milestone 2 approval after resolving the primary advisory-only checks.

Keep the approved discovery refresh scope for the functional prototype. After the functional skill is built, revisit how to keep substantive performance and effort evidence current. That review is outside Phase 2 and does not gate native feasibility.
[aa]: https://artificialanalysiscdn.com/legal/ProDataPlatformTerms.pdf
[stet]: https://www.stet.sh/blog/gpt-55-codex-graphql-reasoning-curve
[stet-table]: https://www.stet.sh/benchmarks/gpt-55-codex-graphql-reasoning-curve
[opti]: https://optiflume.ai/learn/model-benchmark-study
[opti-board]: https://optiflume.ai/benchmarks
[opti-terms]: https://optiflume.ai/terms
[reb]: https://ijcai.org/proceedings/2026/48
[ij-rights]: https://ijcai.org/copyright_and_access/
[preprint]: https://arxiv.org/html/2603.06739v2
[reb-repo]: https://github.com/No-518/ResearchEnvBench/tree/7db4ca7d0bd52c50bff3e4116f05c8d2d84a1954
[reb-docker]: https://github.com/No-518/ResearchEnvBench/blob/7db4ca7d0bd52c50bff3e4116f05c8d2d84a1954/dockerfiles/ultimate.Dockerfile
[em1]: https://github.com/nagisanzenin/effortmining/blob/09090cf7cbca3f6cbf35fe54f018f675bdb49c65/bench/RESULTS.md
[em2]: https://github.com/nagisanzenin/effortmining/blob/09090cf7cbca3f6cbf35fe54f018f675bdb49c65/bench/RESULTS-v2.md
[em-story]: https://github.com/nagisanzenin/effortmining/blob/09090cf7cbca3f6cbf35fe54f018f675bdb49c65/docs/BENCHMARK-STORY.md
[em-license]: https://github.com/nagisanzenin/effortmining/blob/09090cf7cbca3f6cbf35fe54f018f675bdb49c65/LICENSE
[oai-oss]: https://deploymentsafety.openai.com/gpt-oss/evaluation
[oai-max]: https://openai.com/index/gpt-5-1-codex-max/
[an-opus5]: https://www.anthropic.com/news/claude-opus-5
[an-opus55]: https://www.anthropic.com/claude-opus-5-5
[an-sonnet]: https://www-cdn.anthropic.com/78073f739564e986ff3e28522761a7a0b4484f84.pdf
[md-feed]: https://models.dev/api.json
[md]: https://github.com/anomalyco/models.dev/blob/da91ad2da97bbd82a124cdd58c9e4d946ec16abc/README.md
[md-license]: https://github.com/anomalyco/models.dev/blob/da91ad2da97bbd82a124cdd58c9e4d946ec16abc/LICENSE
[cx-catalog]: https://github.com/openai/codex/blob/581161ab41e643d942e1e1b5f561034060bf18e3/codex-rs/models-manager/models.json
[cx-license]: https://github.com/openai/codex/blob/581161ab41e643d942e1e1b5f561034060bf18e3/LICENSE
[cx-models]: https://learn.chatgpt.com/docs/models
[cx-skills]: https://learn.chatgpt.com/docs/build-skills
[cx-server]: https://learn.chatgpt.com/docs/app-server
[spec]: https://agentskills.io/specification
[cl-model]: https://code.claude.com/docs/en/model-config
[cl-skills]: https://code.claude.com/docs/en/skills
[cl-api]: https://platform.claude.com/docs/en/api/models/list
[oai-api]: https://developers.openai.com/api/reference/resources/models/methods/list
[tb]: https://github.com/harbor-framework/terminal-bench/tree/ad4c7aae7b6f1fd80e514dc85768e46d02661bef/leaderboard/submissions
[picker]: https://github.com/limchinhan123/model-picker/tree/e1c46ebc9c4484c67ad96adfe0b7b4bb0716262e


