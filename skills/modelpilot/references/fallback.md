# Dated offline cards

Reviewed **2026-11-24** for the personal Windows pilot. Use these cards when Node or local read permission is unavailable. Current picker access, active effort, local updates and native versions still need confirmation. No matched native Windows effort measurements are included. The trial suggestions are qualitative and depend on keeping the same acceptance check.

| Host and identity | Native support in the reviewed source | Model fit and a reversible trial |
|---|---|---|
| Codex · GPT-6.2 Sol (`gpt-6.2-sol`) | Bundled catalog lists Low, Medium, High, Extra High and Max from client 0.166.0. The picker can label Low as Light. | Everyday coding and scoped changes. Try High from Extra High on a bounded task when High is selectable. Consider Medium for work with a clear plan and validation. [Codex models][codex-models] · [Pinned native catalog][codex-catalog] |
| Codex · GPT-6.2 Astra (`gpt-6.2-astra`) | Same catalog and client minimum. | Consider an eligible Astra configuration for difficult multistep work with unresolved tradeoffs. Escalate only when more analysis or verification would help. [Codex models][codex-models] · [Pinned native catalog][codex-catalog] |
| Claude Code · Claude Opus 5.5 (`claude-opus-5-5`) | Low, Medium, High, Extra High and Max from Claude Code 2.1.280. | Difficult or ambiguous work. Try Medium from High for one scoped task with an existing check when Medium is selectable. Keep High when edge cases or deeper verification matter. [Claude Code model settings][claude-models] · [Anthropic guidance][claude-guidance] |
| Claude Code · Claude Sonnet 5.5 (`claude-sonnet-5-5`) | Same effort levels from Claude Code 2.1.284. | Consider Sonnet for routine, bounded work with a reliable check if that exact version is available. Start with a confirmed level suited to the task. [Claude Code model settings][claude-models] · [Anthropic guidance][claude-guidance] |

Use the user's picker label and the documented native host. Ultra and Ultracode are outside these effort trials. If the cards are more than 90 days old, treat their native support as stale and use current confirmations or give conditional advice.

[codex-models]: https://learn.chatgpt.com/docs/models#pick-a-reasoning-effort
[codex-catalog]: https://github.com/openai/codex/blob/581161ab41e643d942e1e1b5f561034060bf18e3/codex-rs/models-manager/models.json
[claude-models]: https://code.claude.com/docs/en/model-config#adjust-effort-level
[claude-guidance]: https://claude.com/resources/articles/claude-model-and-effort-level-in-claude-code
