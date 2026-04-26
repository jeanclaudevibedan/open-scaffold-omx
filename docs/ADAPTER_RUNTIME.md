# OMX adapter runtime notes

This repository is the OMX/Codex adapter for open-scaffold.

Namespace: `.omx`
Runtime: oh-my-codex / Codex CLI
Docs consulted: Yeachan-Heo/oh-my-codex README, skills, hooks, and state contracts.

Primary commands/conventions:
- `$deep-interview "..."` clarifies requirements and persists interview state.
- `$ralplan "..."` critiques and approves an implementation plan.
- `$team 3:executor "..."` coordinates parallel Codex workers, normally via tmux on macOS/Linux.
- `$ralph "..."` runs a persistent completion loop for approved work.
- `.omx/state/` is runtime-owned durable state for sessions, questions, plans, logs, memory, and team lifecycle.
- `AGENTS.md` is Codex project guidance; Codex/OMX hooks may overlay runtime/team state using marker-bounded sections.
- `.codex/hooks.json` is the Codex-native hook surface; this adapter documents hook boundaries but does not install hooks silently.

Boundary:
- `.omx/plans` remains the source of truth for scaffold status and scope.
- `.omx/state` is runtime-owned and may be gitignored.
- The adapter emits OMX-native handoff prompts; it does not fake a real `$deep-interview` when OMX is unavailable.
