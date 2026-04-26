# Runtime Adapter Boundary

This repository is [`jeanclaudevibedan/open-scaffold-omx`](https://github.com/jeanclaudevibedan/open-scaffold-omx), the OMX adapter for open-scaffold.

## Adapter family

| Repo | Namespace | CLI | Runtime |
|---|---:|---:|---|
| [open-scaffold](https://github.com/jeanclaudevibedan/open-scaffold) | `.osc` | `osc` | Runtime-neutral core |
| [open-scaffold-omc](https://github.com/jeanclaudevibedan/open-scaffold-omc) | `.omc` | `osc-omc` | Claude Code + OMC |
| [open-scaffold-omx](https://github.com/jeanclaudevibedan/open-scaffold-omx) | `.omx` | `osc-omx` | Codex CLI + OMX |

## This adapter

Namespace: `.omx/`
CLI: `osc-omx`
Runtime: [oh-my-codex / Codex CLI](https://github.com/Yeachan-Heo/oh-my-codex)

Responsibilities:
- Keep scaffold methodology native to `.omx/plans/`.
- Generate OMX-native handoffs for `$deep-interview`, `$ralplan`, `$team`, and `$ralph`.
- Preserve mission-first planning, immutable plans, amendments, and `verify.sh` checks.
- Keep runtime-specific hook/state/orchestration logic out of generic open-scaffold.

## Boundary rule

Generic open-scaffold owns `.osc` and prompt/artifact generation. This adapter owns `.omx` and OMX-native runtime handoffs. Do not push OMX-specific conventions back into the generic core.
