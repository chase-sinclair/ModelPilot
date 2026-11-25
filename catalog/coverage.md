# ModelPilot initial catalog and source permissions

**Phase 1 · November 24, 2026 · Personal Windows pilot.** The four public model identities below support a guidance-led skill on both hosts. The source register admits a small metadata refresh and source-linked guidance. Numerical performance comparisons require additional evidence. [Implementation plan](../docs/ModelPilot-Implementation-Plan.md)

## Initial models and effort

| Client | Public model identity | Documented or observed effort support | Guidance the skill can cite |
|---|---|---|---|
| Codex Desktop | GPT-6.2 Sol (`gpt-6.2-sol`) | Public catalog for the previously observed bundled CLI lists `low`, `medium`, `high`, `xhigh`, `max` and `ultra`. OpenAI documents Light and Extra High as picker terminology. | Sol is OpenAI's everyday coding option. Medium is a reasonable trial on well-scoped work that needs some planning. High and Extra High are options for more complex work when available. [Codex models and effort][codex-models] · [Build catalog][codex-build] |
| Codex Desktop | GPT-6.2 Astra (`gpt-6.2-astra`) | Same bundled list. Both records list `0.166.0` as the minimum client version. Scope Ultra out of conventional effort trials because it dispatches subagents. | Consider Astra for demanding, multistep work with unresolved tradeoffs. Start at the user's available setting and escalate only when deeper analysis or checking would help. [Codex models and effort][codex-models] · [Build catalog][codex-build] |
| Claude Code terminal | Claude Opus 5.5 (`claude-opus-5-5`) | Anthropic documents `low`, `medium`, `high`, `xhigh` and `max`, with a default of `medium` and a minimum client version of `2.1.280`. | Opus fits difficult work. Medium fits scoped engineering, while high is a reasonable option when verification or edge cases matter. [Claude Code model configuration][claude-models] · [Claude model selection guidance][claude-guidance] |
| Claude Code terminal | Claude Sonnet 5.5 (`claude-sonnet-5-5`) | Same documented levels and default, with a minimum client version of `2.1.284`. Scope Claude Code's `ultracode` workflow setting out of effort trials. | Consider Sonnet for routine, bounded work with a clear check, provided the exact version is available. [Claude Code model configuration][claude-models] · [Claude model selection guidance][claude-guidance] |

**Observed.** The source tag `rust-v0.171.0-alpha.13` resolves to `581161ab41e643d942e1e1b5f561034060bf18e3`. The two model entries agree on effort support with the previously inspected Codex source. This identifies bundled defaults for a client build. The desktop service and account picker determine the settings a particular user can select. The previously observed Claude Code `2.1.325` clears both documented version minimums. Claude aliases can change with provider and deployment, and organization settings can cap effort. [Codex tag][codex-tag] · [Build catalog][codex-build] · [Claude Code model configuration][claude-models] · [Observed client versions](../docs/ModelPilot-Architecture-Review.md#environment-and-host-feasibility)

**Owner report, November 24.** Personal use covers **2 of 2** Codex candidates and **1 of 2** Claude Code candidates, with four reported Codex model/effort pairs and one Claude Code pair. The report describes prior or usual use. Eligibility in a new test chat needs fresh confirmation. The source register below covers public data for the portable catalog.

| Decision to support | Codex Desktop | Claude Code terminal |
|---|---|---|
| Model fit | Keep Sol for routine coding with a clear check. Consider eligible Astra when an architecture decision spans several components and Sol has unresolved tradeoffs. | Keep Opus if it is working well. Consider Sonnet for a bounded edit only after the owner confirms the exact option. |
| Reversible effort trial | On Sol, try High for the next bounded change if starting at Extra High. Keep the same acceptance test and revert if the lower setting misses it or creates rework. Confirm Medium in the picker before suggesting it as selectable. | On Opus 5.5, try Medium from High for a scoped change if Medium is selectable. Keep the existing check and return to High if the change needs rework or verification is skipped. |
| Withhold a claim | A historical GPT-5.5 effort curve cannot establish equal quality for Sol at two levels. The GPT-6.2 release compares Sol and Astra at Max in FrontierCode 2.0. That comparison does not measure a change of effort on either model. [Stet][stet] · [OpenAI release][openai-release] | Withhold a native Windows quality or usage estimate for Opus High versus Medium. Anthropic's Terminal-Bench 3.0 article reports same-model Opus 5.5 results on 70 shared tasks, with a 128k response cap and restricted network in the Opus runs. The article does not establish a match to our Windows client and workload or a grant to export its results. [Anthropic effort study][claude-study] |

**Coverage result.** Each host has two public model cards, guidance for both and one same-model trial candidate. Codex has **0 of 2** and Claude Code has **0 of 2** model cards with a matched, reusable native Windows effort comparison admitted by this pass. This is a count of evidence admitted for these four cards. The trials are recommendations based on guidance, to be judged against the user's existing success checks. No numerical performance, price or subscription-savings rows are admitted.

## Source permissions for the personal pilot

| Source and artifact | Permitted use in the proposed personal pilot and attribution |
|---|---|
| Models.dev v1 public endpoint and its community-maintained first-party model records at `da91ad2da97bbd82a124cdd58c9e4d946ec16abc` | Use an explicit key-free GET for OpenAI and Anthropic discovery. Retain **provider block ID, model ID, display name and optional release date** with source, check time and digest. Store only the typed projection locally. Attribute Models.dev and carry its MIT notice when packaging material derived from its records. Trace identities and dates to the four pinned TOMLs. Ignore descriptions, benchmarks, pricing, capabilities, entitlement and effort fields in the first adapter. Review future fields or public redistribution on their own terms. [Endpoint][feed] · [API and record format][feed-doc] · [MIT license][feed-rights] · [Sol][feed-sol] · [Astra][feed-astra] · [Sonnet][feed-sonnet] · [Opus][feed-opus] |
| OpenAI Codex source at `581161ab41e643d942e1e1b5f561034060bf18e3` | Use slugs, model-level effort support and minimum client version as dated corroboration. Use selected facts in reviewed local data with attribution and applicable Apache-2.0 notices. The JSON also contains prompt text and other bundled fields outside this scope. Keep this a reviewed reference with no additional live adapter. [Build catalog][codex-build] · [Apache-2.0 license][codex-rights] |
| OpenAI and Anthropic product docs and original guidance | Keep original short factual notes and citations for model fit and native effort support. Review those notes independently of discovery refresh. Treat provider defaults, effective effort and personal eligibility as distinct fields. Do not copy articles, benchmark figures or tables. [Codex model guide][codex-models] · [Claude Code model configuration][claude-models] · [Claude guidance][claude-guidance] |
| Public performance studies already reviewed and the Claude Code effort article | Link-only for this seed. Earlier Stet, ResearchEnvBench and EffortMining results use other model identities. OptiFlume and provider tests need a task/harness, fallback and rights check before adding rows. There is no need to resolve these for the guidance-led catalog. Artificial Analysis data remains excluded, including indirectly sourced benchmark fields in otherwise usable feeds. [Existing evidence review](../docs/ModelPilot-Implementation-Plan.md#2-what-the-broader-effort-evidence-supports) · [Anthropic effort study][claude-study] |

**Refresh observation.** The public endpoint returned HTTP 200 and all four exact IDs in their expected provider blocks. Its 6,914,220-byte response had SHA-256 `7bcfb768c0ee9f3a780c34690f8b1dea73a5aeff7abd0ae11858082b74acdef8`, matching the earlier observation for which a conditional GET returned 304. The four source paths also returned their expected names and release dates. A successful refresh may discover model identities. Native support, account access and performance each need independent evidence. [Endpoint][feed] · [API contract][feed-doc]

## Permission request for Phase 2 native feasibility

**Phase 2 status, November 25, 2026.** The original check used five submissions against four approved. The wording-only Codex regression used three against two approved. Both Codex conflicting-input attempts failed advisory behavior. The Codex normal-flow test passed with two of two included-use submissions and all five hashes matching the baseline. The Claude Terminal repeat used three submissions against two approved, including an unintended interrupted invocation. Its four hashes matched and its two-turn verdict is inconclusive. The proposed Desktop check requires separate approval. The original scope request is preserved below. [Phase 2 results and approval checkpoint](../docs/ModelPilot-Native-Feasibility.md)

1. **Disposable installs and cleanup.** Authorize writing an original, minimal probe to the repository's `tests/native/` and installing only the named project copies below. Permit read-only version and file-hash checks, one small resource-location probe using the installed Node runtime per advisory turn if the host allows it, and removal of the two verified probe copies and their owned scratch files. Use fresh project sessions and the native manual-invocation setting on each copy. [Codex skills][codex-skills] · [Claude Code skills][claude-skills]

   | Client | Exact proposed installation directory |
   |---|---|
   | Codex Desktop on Windows | `%USERPROFILE%\Documents\ModelPilot Native Probe\Codex café\.agents\skills\modelpilot` |
   | Claude Code in a Windows terminal | `%USERPROFILE%\Documents\ModelPilot Native Probe\Claude café\.claude\skills\modelpilot` |

2. **Native inference allowance.** Authorize opening one fresh project session per client and submitting one short synthetic context turn plus one explicit effort-advice turn in each. Cap at **four submitted turns total, two per client including failures**, through the clients' ordinary subscription connections. Confirm each session has included usage and can run at **$0 incremental spend**. Normal host processing is limited to the test context. The probe itself is local and read-only. If billing mode is uncertain or the host requests credits or overage, stop before submitting. No separate retries, Codex CLI inference, refresh traffic, underlying task execution, model switching, global installs or settings changes are part of this allowance.

3. **Evidence and pass condition.** Permit retaining only sanitized per-client observations, versions, hashes, turn counts and visible permission behavior. Each host must recognize explicit invocation, recall the synthetic acceptance criterion and give advice without acting on the queued task. Verify zero implicit invocations in the setup turn and handle unavailable setting metadata or local script execution explicitly. Keep outcome evidence separate for each client. Full native acceptance and the comparative pilot are later authorizations.

[codex-models]: https://learn.chatgpt.com/docs/models#pick-a-reasoning-effort
[codex-tag]: https://github.com/openai/codex/releases/tag/rust-v0.171.0-alpha.13
[codex-build]: https://github.com/openai/codex/blob/581161ab41e643d942e1e1b5f561034060bf18e3/codex-rs/models-manager/models.json
[codex-rights]: https://github.com/openai/codex/blob/581161ab41e643d942e1e1b5f561034060bf18e3/LICENSE
[codex-skills]: https://learn.chatgpt.com/docs/build-skills
[claude-skills]: https://code.claude.com/docs/en/skills#control-who-invokes-a-skill
[claude-models]: https://code.claude.com/docs/en/model-config#adjust-effort-level
[claude-guidance]: https://claude.com/resources/articles/claude-model-and-effort-level-in-claude-code
[claude-study]: https://claude.dev/blog/spending-your-effort/#effort-curves
[stet]: https://www.stet.sh/blog/gpt-55-codex-graphql-reasoning-curve
[openai-release]: https://openai.com/index/introducing-gpt-6-2-astra-sol/
[feed]: https://models.dev/api.json
[feed-doc]: https://github.com/anomalyco/models.dev/blob/da91ad2da97bbd82a124cdd58c9e4d946ec16abc/README.md#api
[feed-rights]: https://github.com/anomalyco/models.dev/blob/da91ad2da97bbd82a124cdd58c9e4d946ec16abc/LICENSE
[feed-sol]: https://github.com/anomalyco/models.dev/blob/da91ad2da97bbd82a124cdd58c9e4d946ec16abc/models/openai/gpt-6.2-sol.toml
[feed-astra]: https://github.com/anomalyco/models.dev/blob/da91ad2da97bbd82a124cdd58c9e4d946ec16abc/models/openai/gpt-6.2-astra.toml
[feed-sonnet]: https://github.com/anomalyco/models.dev/blob/da91ad2da97bbd82a124cdd58c9e4d946ec16abc/models/anthropic/claude-sonnet-5-5.toml
[feed-opus]: https://github.com/anomalyco/models.dev/blob/da91ad2da97bbd82a124cdd58c9e4d946ec16abc/models/anthropic/claude-opus-5-5.toml
