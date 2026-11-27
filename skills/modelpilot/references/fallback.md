# Dated offline cards

Use these bundled snapshots when Node or local read permission is unavailable. Confirm current picker access, active effort and native version separately. This path leaves local updates and withdrawals unverified. The trials are qualitative and use the same acceptance check as the current setting.

| Host and identity | Native support reviewed 2026-11-24 | Model and effort guidance reviewed 2026-11-27 |
|---|---|---|
| Codex · GPT-6.2 Sol (`gpt-6.2-sol`) | Bundled catalog lists Low, Medium, High, Extra High and Max from client 0.166.0. The picker can label Low as Light. [Pinned native catalog][codex-catalog] | Use Sol for planned implementation or a localized bug with a reproduction. Consider confirmed High from Extra High for one bounded change, or Medium when the plan and check are clear. Keep deeper effort if explanations or component interactions are unresolved. [Codex effort guide][codex-models] |
| Codex · GPT-6.2 Astra (`gpt-6.2-astra`) | Same catalog and client minimum. [Pinned native catalog][codex-catalog] | Consider eligible Astra for competing design constraints or a defect that spans services. Allow depth for diagnosis and independent checks. Reassess at the handoff to bounded implementation. [Codex model guide][codex-fit] |
| Claude Code · Claude Opus 5.5 (`claude-opus-5-5`) | Low, Medium, High, Extra High and Max from Claude Code 2.1.280. [Claude Code settings][claude-models] | Consider Opus for unresolved architecture, subtle failures and consequential review. Try confirmed Medium from High for one scoped implementation with a reliable check. Keep High for difficult verification and restore it if checks are skipped or rework increases. [Anthropic guidance][claude-guidance] |
| Claude Code · Claude Sonnet 5.5 (`claude-sonnet-5-5`) | Same effort levels from Claude Code 2.1.284. [Claude Code settings][claude-models] | Consider eligible Sonnet for routine work with reliable feedback and a cheap handoff. Try more effort if checks were skipped. Consider eligible Opus if the wrong approach persists despite complete context and verification. [Anthropic guidance][claude-guidance] |

Use the user's picker label and the documented native host. Ultra and Ultracode are outside these effort trials. Treat native support older than 90 days as stale. For a citation, pair the direct link with the review date of its column.

[codex-models]: https://learn.chatgpt.com/docs/models#pick-a-reasoning-effort
[codex-fit]: https://learn.chatgpt.com/docs/models#recommended-models
[codex-catalog]: https://github.com/openai/codex/blob/581161ab41e643d942e1e1b5f561034060bf18e3/codex-rs/models-manager/models.json
[claude-models]: https://code.claude.com/docs/en/model-config#adjust-effort-level
[claude-guidance]: https://claude.com/resources/articles/claude-model-and-effort-level-in-claude-code
