# Design choices

The decisions that shaped this adapter and why. Every entry here is a fork in the road we explicitly chose, not a default we stumbled into.

## The decisions

**Why this adapter exists outside generic open-scaffold.** Generic open-scaffold must stay runtime-neutral: `.osc`, `osc`, prompt/artifact generation, no autonomous spawning. open-scaffold-omx exists so OMX-specific behavior can use `.omx`, `osc-omx`, and oh-my-codex / Codex CLI conventions without contaminating the core.

**Why CLAUDE.md and AGENTS.md are hand-duplicated instead of generated.** Because a build script that breaks in six months is worse than two files that might drift in six months. Drift you notice on the next read; a broken generator rots silently. The paired-view header in each file tells you to mirror edits, and if drift happens three times in the first year, we revisit.

**Why orchestration is adapter-mediated, not embedded in the core.** The plan's `Execution strategy` section is a portable contract. This adapter translates that contract into OMX-native handoffs (`$deep-interview`, `$ralplan`, `$team`, and `$ralph`); the generic core remains portable across OMC, OMX, Cursor, plain Claude/Codex, and humans in a terminal.

**Why plans are immutable once committed.** Because edits silently rewrite history. Six weeks from now, you won't remember whether the plan said X all along or whether you quietly switched last Tuesday. The amendment protocol keeps the original plan frozen and layers new learning as numbered amendment files.

**Why mission-first gating is the first thing `verify.sh` checks.** Because everything downstream is meaningless without it. A plan with no mission is a plan for nothing.
