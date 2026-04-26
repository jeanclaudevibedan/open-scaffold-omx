# Roach Pi Inspiration Boundary

`tmdgusya/roach-pi` is a useful reference point for disciplined agent runtimes, but open-scaffold-omx does not copy its code or become a Pi extension.

## What we like conceptually

- Workspace memory: agents should stop forgetting important project lessons.
- Strict engineering prompts: implementation agents should read first, scope tightly, verify, and avoid opportunistic refactors.
- Autonomous follow-through: runtime adapters should be able to continue from plan to verification without the user constantly asking "what now?".
- Reviewer fleets: independent reviewer perspectives can catch bugs, risks, dependency conflicts, and value gaps.
- Prompt/artifact observability: orchestration should leave readable files behind.

## What open-scaffold-omx adopts

- `.omx/runs/` prompt/artifact bundles.
- Strict plan/acceptance-criteria discipline.
- Execution Strategy sections that can be translated into OMX-native handoffs.
- Adapter-owned runtime conventions kept separate from generic `.osc` core.

## What open-scaffold-omx does not adopt

- Pi-specific APIs such as `pi.registerCommand`, `pi.registerTool`, `pi.on`, or `ctx.ui`.
- Pi subprocess spawning.
- Hidden workspace memory injection in the generic core.
- Runtime-specific logic in `jeanclaudevibedan/open-scaffold`.

## Where autonomy belongs

- Generic core: [open-scaffold](https://github.com/jeanclaudevibedan/open-scaffold) (`.osc`/`osc`) produces the contract and artifacts.
- OMC adapter: [open-scaffold-omc](https://github.com/jeanclaudevibedan/open-scaffold-omc) (`.omc`/`osc-omc`) handles Claude Code + OMC.
- OMX adapter: [open-scaffold-omx](https://github.com/jeanclaudevibedan/open-scaffold-omx) (`.omx`/`osc-omx`) handles Codex CLI + OMX.

Adapters decide how to execute; the generic core stays runtime-neutral.
