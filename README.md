<div align="center">

# 🧱 open-scaffold-omx

**The OMX runtime adapter for open-scaffold.**

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)
[![Adapter](https://img.shields.io/badge/open--scaffold-OMX%20adapter-blue.svg)](https://github.com/jeanclaudevibedan/open-scaffold-omx)
[![Core](https://img.shields.io/badge/core-open--scaffold-green.svg)](https://github.com/jeanclaudevibedan/open-scaffold)

</div>

---

## What this is

`open-scaffold-omx` is the public MIT adapter repo that takes Daniel's open-scaffold methodology and makes it native to **oh-my-codex / Codex CLI**.

It keeps the same discipline as the generic core:

- mission-first project definition
- immutable plans
- stage folders as status
- mechanical amendments via `amend.sh`
- compliance checks via `verify.sh`
- prompt/artifact bundles from a small TypeScript CLI

But it uses the adapter namespace and runtime handoffs:

- Namespace: `.omx/`
- CLI: `osc-omx`
- Runtime: [oh-my-codex / Codex CLI](https://github.com/Yeachan-Heo/oh-my-codex)

Generic core stays here:

- https://github.com/jeanclaudevibedan/open-scaffold
- Namespace: `.osc/`
- CLI: `osc`
- Responsibility: runtime-neutral scaffold + prompt/artifact generation only

This adapter is where OMX-specific workflow belongs.

---

## Adapter family

| Repo | Namespace | CLI | Runtime |
|---|---:|---:|---|
| [open-scaffold](https://github.com/jeanclaudevibedan/open-scaffold) | `.osc` | `osc` | Runtime-neutral core |
| [open-scaffold-omc](https://github.com/jeanclaudevibedan/open-scaffold-omc) | `.omc` | `osc-omc` | Claude Code + OMC |
| [open-scaffold-omx](https://github.com/jeanclaudevibedan/open-scaffold-omx) | `.omx` | `osc-omx` | Codex CLI + OMX |

Rule of thumb: `.osc` is the chassis. `.omx` is the OMX engine bay.

If you want OMC / Claude Code, use [`open-scaffold-omc`](https://github.com/jeanclaudevibedan/open-scaffold-omc) instead (`.omc` / `osc-omc`).

---

## What osc-omx does

```bash
osc-omx status
osc-omx plan .omx/plans/active/001-runtime-adapter.md
osc-omx run .omx/plans/active/001-runtime-adapter.md
osc-omx handoff .omx/plans/active/001-runtime-adapter.md
osc-omx verify
osc-omx doctor
```

`osc-omx handoff` reads a scaffold plan, creates prompt artifacts under `.omx/runs/`, and prints OMX-native runtime commands.

The current handoff path covers:

- `$deep-interview`
- `$ralplan`
- `$team`
- `$ralph`

- Runtime-only OMX session/question/team state belongs under `.omx/state/` and should not be confused with scaffold plan state.
- Codex/OMX hook conventions such as `.codex/hooks.json` belong in this adapter/runtime layer, not in generic open-scaffold.
- Do not simulate real OMX workflows: use actual OMX for `$deep-interview`, `$ralplan`, `$team`, and `$ralph` when those workflows are requested.

The CLI prepares the handoff. The runtime does the actual orchestration.

---

## Quickstart

### 1. Create a project from this adapter

```bash
gh repo create <your-project> --template jeanclaudevibedan/open-scaffold-omx --clone
cd <your-project>
```

Or clone directly while experimenting:

```bash
git clone https://github.com/jeanclaudevibedan/open-scaffold-omx.git
cd open-scaffold-omx
```

### 2. Install dependencies

```bash
npm install
npm run build
npm test
```

### 3. Define the mission

This adapter ships with a real adapter mission because the repo itself is already defined. In a project created from this template, replace `MISSION.md` with your project mission.

```bash
./bootstrap.sh
./verify.sh --standard
```

### 4. Write or inspect a plan

Plans live under `.omx/plans/` and the folder is the status:

```text
.omx/plans/active/
.omx/plans/backlog/
.omx/plans/blocked/
.omx/plans/done/
```

Use the 7-section schema in:

```text
.omx/plans/handoff-template.md
```

### 5. Generate a OMX handoff

```bash
npm run osc-omx -- handoff .omx/plans/active/001-runtime-adapter.md
```

Then run the printed OMX commands in your oh-my-codex / Codex CLI session.

For fuzzy work, start with:

```text
$deep-interview "Clarify the mission, constraints, acceptance criteria, and first implementation plan."
```

For execution, use:

```text
$team 3:executor "Execute the approved scaffold plan."
$ralph "Carry the approved scaffold plan to completion and verify acceptance criteria."
```

---

## Repository layout

```text
.omx/
  RULES.md
  plans/
    WORKFLOW.md
    handoff-template.md
    README.md
    active/
    backlog/
    blocked/
    done/
  specs/
  runs/              # generated, gitignored
MISSION.md
AGENTS.md
CLAUDE.md
README.md
amend.sh
close.sh
verify.sh
bootstrap.sh
delegate.sh
src/
  cli.ts
  scaffold.ts
  artifacts.ts
  runtime.ts
tests/
```

---

## Core workflow

1. Read `MISSION.md`.
2. Read the active plan in `.omx/plans/active/`.
3. If new information changes scope, run `./amend.sh <plan-slug>` instead of editing the plan in place.
4. Generate a handoff with `osc-omx handoff <plan-path>`.
5. Execute through OMX runtime commands.
6. Verify acceptance criteria and run `./verify.sh --standard`.
7. Close completed work with `./close.sh <plan-slug>`.

Plans are immutable once committed. Amendments are the audit trail.

---

## Runtime boundary

This adapter may speak OMX. Generic open-scaffold may not.

Keep these boundaries clean:

- Generic `.osc` core: structure, parsing, artifact generation, no autonomous spawning.
- `.omx` adapter: OMX-native handoffs and runtime conventions.
- Runtime-owned state/logs: generated or gitignored unless intentionally documented.

If you find yourself adding OMX-specific hooks, commands, or state rules to `jeanclaudevibedan/open-scaffold`, stop and put them here instead.

---

## Verification

```bash
npm run build
npm test
./verify.sh --standard
npm run osc-omx -- doctor
npm run osc-omx -- handoff .omx/plans/active/001-runtime-adapter.md
```

Expected template note: generic template repos can fail strict verification when `MISSION.md` intentionally contains `mission:unset`. This adapter repo has a defined mission, so `./verify.sh --standard` should pass.

---

## License

MIT. See [LICENSE](LICENSE).
