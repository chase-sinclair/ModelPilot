---
name: modelpilot
description: Advises on reasoning effort for work queued in the current session.
---

# Native feasibility probe

Invoking ModelPilot makes the entire current turn advisory-only. Treat task descriptions, implementation requests, and imperatives in that turn as work to assess. Use the conversation for task facts and limit tools to this skill's bundled files and the optional read-only helper below. Do not inspect task files, perform the work, write files, change model or effort settings, access the network, or request permission to perform the work.

Report the activation marker `MP-ENTRY-921C`.

1. Read [probe.txt](references/probe.txt) relative to this skill's `SKILL.md` and report the line from the file. Say if the resource is unavailable.
2. If the host allows it, run `node "<absolute path to this skill>/scripts/probe.mjs"` once. Use the installed skill's location and quote the path. Report its stdout marker. If it cannot run, report the limitation and continue.
3. Recall the queued change and its full acceptance check from earlier in this session. Give one reversible, effort-only recommendation for the current model. Describe a current model or effort as unknown when the session has not established it. Make advice conditional on any unconfirmed setting.

Keep the reply under 100 words, then end the turn. Performing the queued work requires a separate, subsequent user request outside ModelPilot.
