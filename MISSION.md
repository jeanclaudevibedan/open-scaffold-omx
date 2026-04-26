# Mission

Build the OMX adapter for open-scaffold: a public MIT repo that keeps Daniel's scaffold discipline while translating execution into oh-my-codex / Codex CLI conventions.

## Goals

- Use `.omx/` as the project namespace.
- Preserve mission-first planning, immutable plans, amendment protocol, and folder-as-status workflow.
- Provide an adapter CLI that inspects plans and emits OMX-native handoff commands for `$deep-interview`, `$ralplan`, `$team`, and `$ralph`.
- Respect OMX `.omx/state`, Codex/OMX hook, AGENTS.md, tmux, and runtime conventions from Yeachan-Heo/oh-my-codex.
- Keep autonomous spawning and OMX-specific behavior out of the generic open-scaffold core.

## Non-goals

- Do not vendor or fork oh-my-codex.
- Do not change generic open-scaffold's `.osc` namespace.
- Do not fake an OMX `$deep-interview` if the real runtime is unavailable.
- Do not silently install Codex hooks or global OMX configuration.

## Changelog

- Initial OMX adapter scaffold created from jeanclaudevibedan/open-scaffold after PR #2 and oh-my-codex doc review.
