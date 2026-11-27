# ModelPilot personal V1 native acceptance

**November 27, 2026.** The owner used eight submissions on `f7bd99935521dbda98f1d46896b0327f80fd6d95` with zero retries. That includes six primary submissions, one of which was interrupted in the denial case, and two Claude Desktop compatibility submissions. Helper-backed native acceptance is complete. [Pinned acceptance procedure](https://github.com/chase-sinclair/ModelPilot/blob/f7bd99935521dbda98f1d46896b0327f80fd6d95/docs/ModelPilot-V1-Release-Candidate.md)

## Primary results

| Case | Result | Owner-reported evidence |
|---|---|---|
| Codex Desktop `next` | Pass | The native `next` case passed with the packaged helper. |
| Claude Code Terminal `compare` | Pass | The native helper-backed `compare` case passed. |
| Claude Code Terminal `global` | Core behavior passed with response findings | Cross-host retrieval and eligibility handling were correct. The owner reported minor wording and control-source citation findings. The exact wording and citation details were absent from the supplied summary. |
| Claude Code Terminal `compare` with helper denied | Host-blocked / incomplete | The owner reopened the original neutral parent, which had no prior helper output, and denied the exact packaged Node `read` command. Claude displayed “Interrupted · What should Claude do instead?” The turn ended before a fallback read or recommendation. The owner observed no retry or alternate tool activity. |

## Claude Desktop compatibility

**Pass on Claude Desktop for Windows 6.28899.6, local Code.** The owner reported that the neutral setup returned `Queued` and the native `/modelpilot effort` call executed the exact installed Node helper with `read`. Complete actual stdout showed schema version 1, host `claude`, discovery `not-refreshed`, bundled Opus 5.5 and Sonnet 5.5 guidance, fresh native and qualitative records, and an empty bundled measurement set.

The answer kept Opus 5.5 High pending confirmation that Medium was available and could be applied only for the session. It used Desktop Effort terminology, gave the two existing checks and reasons to restore High, and qualified Medium as an untested trial. The owner verified the visible direct URL and the review date of November 27, 2026. [Cited Anthropic guidance](https://claude.com/resources/articles/claude-model-and-effort-level-in-claude-code)

The owner reported that the final screen showed Opus 5.5 High and Manual permissions, with no visible unauthorized activity. The owner confirmed one-time approval of the exact helper. Response time remains unconfirmed.

## Independent final integrity audit

The audit script and baseline matched their original SHA-256 digests. The baseline named the full candidate commit and all 54 file hashes and directory inventories matched after the Desktop case.

| Fixture | File hashes | Directories | Result |
|---|---:|---:|---|
| Codex Desktop | 18 | 8 | Pass |
| Claude Code Terminal | 19 | 9 | Pass |
| Claude Desktop | 17 | 7 | Pass |

## Fallback limitation

The original gate required observable fallback advice after helper denial. The host ended the turn before the skill could reach its fallback instructions, leaving the case host-blocked and incomplete. The accepted helper-backed gate excludes automatic recovery after denial. The dated bundled cards can support reduced advice when the host continues the turn and permits the resource read. Such advice must identify unchecked local updates and withdrawals and respect any withdrawal already known. Native behavior on a continuing turn remains unverified.

A future explicit helper-free mode is feasible in principle. The user would select it before the helper is requested. It could give advice from the bundled cards and user-confirmed eligibility, with clear limits on freshness and local state. It would still depend on native skill and reference access. Test that mode separately if the use case warrants it.

## Accepted release scope

The owner accepted helper-backed advice on local Windows Codex Desktop and Claude Code Terminal as the primary personal V1 scope and Claude Desktop Code as an additional tested compatibility surface. Use the owner-run packaged helper for refresh and reviewed imports. Native refresh shortcut compatibility remains unverified. Standalone Codex CLI compatibility and Batch 2 are deferred. The evidence covers observed advisory behavior. Host-enforced advisory boundaries, matched downstream performance and subscription savings remain unestablished. Publication and real-project installation await final owner approval. [Release status](ModelPilot-V1-Release-Candidate.md) · [Project-local installation](../README.md#project-local-installation)

## Operational closeout

These statuses come from the owner's final V1 closeout. The fixture audit covers project contents only.

| Item | Status |
|---|---|
| Claude Desktop helper permission | One-time approval, owner confirmed |
| Included subscription usage across all V1 submissions | Unconfirmed |
| Paid fallback unavailable | Unconfirmed |
| Actual incremental spending | Unconfirmed |
| Absence of persistent tool permission rules across all acceptance sessions | Unconfirmed |
| Exact-folder trust across all acceptance sessions | Unconfirmed |
| Desktop prompt-suggestion restoration | Unconfirmed |
