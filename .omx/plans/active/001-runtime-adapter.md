# Runtime adapter implementation

## Status

active

## Context

The generic open-scaffold repo now owns runtime-neutral methodology under `.osc/`. This adapter repo owns the `OMX / Codex` translation layer and must keep its own namespace under `.omx/`.

## Goal

Create a working `OMX / Codex` adapter that can inspect scaffold plans, generate runtime-native handoff commands, and keep orchestration concerns out of generic open-scaffold.

## Constraints

- Keep `.omx/plans` as the folder-as-status state machine.
- Preserve immutable plans and amendment protocol.
- Do not vendor the upstream runtime.
- Keep generated runtime state/artifacts explicit and reviewable.

## Files to touch

- MISSION.md
- README.md
- AGENTS.md
- CLAUDE.md
- .omx/RULES.md
- .omx/plans/active/001-runtime-adapter.md
- docs/ADAPTER_RUNTIME.md
- src/cli.ts
- src/runtime.ts
- tests/runtime.test.ts

## Acceptance criteria

- `npm run build` passes.
- `npm test` passes.
- `./verify.sh --standard` passes.
- CLI status reports namespace `.omx`.
- CLI handoff output mentions $deep-interview, $ralplan, $team, $ralph, .omx/state, Codex/OMX hooks.
- Runtime-specific guidance is in this adapter repo, not generic open-scaffold.

## Verification steps

1. Run `npm install` if dependencies are missing.
2. Run `npm run build`.
3. Run `npm test`.
4. Run `./verify.sh --standard`.
5. Run `npm run osc` only if package scripts are updated; otherwise run the built bin directly.

## Open questions

- Should future versions execute runtime commands directly or remain handoff-first by default?

## Execution strategy

### Parallel groups

- **Group A — Scaffold namespace** (independent): Update docs, scripts, and tests from `.osc` to `.omx`.
- **Group B — Runtime handoff** (independent): Add runtime-native command generation and doctor checks.
- **Group C — Verification** (depends on previous): Run build, tests, and scaffold compliance.

### Dependencies

- Group C depends on Groups A and B.

### Delegation notes

- Keep implementation small and auditable; this is an adapter foundation, not a runtime fork.
