# LLM Quickstart — open-scaffold-omx

You are an LLM helping a human bootstrap a new project from the [open-scaffold-omx](https://github.com/jeanclaudevibedan/open-scaffold-omx) template. Walk the human through the steps below interactively — confirm each step with them before proceeding to the next.

## Capability check

Before anything else, determine whether you can execute shell commands in this session.

- **If yes** (coding agent: Claude Code, Cursor, Codex CLI, Aider, etc.) — run the commands yourself and report output.
- **If no** (chat LLM: ChatGPT, Claude.ai, Gemini web, etc.) — print each command in a fenced block and wait for the user to paste results back before continuing.

State which mode you're in before step 1.

## Step 1 — Clone the template

**Before running any clone command, ask the user what they want to name their project.** The name becomes the folder name, and renaming it after the clone is awkward — you'd have to `cd ..`, rename, `cd` back, and re-run anything that already executed. Do not proceed until you have a name. If the user has no preference, suggest `my-project` as a placeholder and confirm before using it.

Then run (replacing `<name>` with the project name you just collected — not the literal string `open-scaffold-omx`):

```bash
gh repo create <name> --template jeanclaudevibedan/open-scaffold-omx --clone
cd <name>
```

Fallback if `gh` is unavailable:

```bash
git clone https://github.com/jeanclaudevibedan/open-scaffold-omx <name>
cd <name>
```

## Step 2 — Initialize the scaffolding

Run `./bootstrap.sh`. The script ensures the lazy directories exist (`.omx/state/`, `.omx/research/`, and stage subfolders `active/`, `backlog/`, `done/`, `blocked/` under `.omx/plans/`) and stamps today's date into MISSION.md's changelog.

**What happens to MISSION.md depends on how bootstrap was invoked:**

- **Interactive (human running this quickstart themselves in a real terminal, or a chat-LLM telling them to):** bootstrap.sh asks three questions — *What is this project?*, *What should it achieve?*, *What should this project NOT do?* — with an example under each. The user can press Enter to skip any question. After the prompts, MISSION.md contains their answers or TODO placeholders, and the `<!-- mission:unset -->` marker is removed.

- **Non-interactive (coding agent invoking the script via a non-TTY shell — typical for Claude Code, Cursor, Codex CLI, Aider):** bootstrap.sh's interactive prompts are skipped by design. The gate is `[ -t 0 ]` at [bootstrap.sh:17](bootstrap.sh#L17), which is false when an agent runs the script. MISSION.md will still contain the `<!-- mission:unset -->` marker. **This is expected — don't try to work around it.** The downstream session in Step 4 elicits the mission conversationally. It has more context than a bash `read -r` loop and can ask follow-ups, give examples, and iterate — it's a genuinely better interviewer than bootstrap.sh can be.

Whichever path fired, confirm bootstrap.sh exited 0 before proceeding.

## Step 3 — Verify the floor

Run `./verify.sh --quick` and report the exit code to the user.

- **If Step 2's interactive path fired:** `verify.sh --quick` should fail on "no plan file" only (mission is defined, the first plan doesn't exist yet). Expected — the next session writes the first plan.
- **If Step 2's non-interactive path fired:** `verify.sh --quick` will fail on "mission undefined" (progressive disclosure — the plan check is gated behind the mission check, so it won't even run yet). Expected — Step 4 elicits the mission.

Either way, report the failing check and proceed to Step 4. A passing `--quick` here would be surprising — if it happens, stop and investigate.

## Step 4 — Hand off

Ask the user two questions:

1. Which runtime are you using?
   - **OMX adapter** (this repo: `open-scaffold-omx`, `.omx` / `osc-omx`)
   - **Plain agent** (no OMX runtime)
   - **Fully manual** (no agent)
2. Is your first task clear in your head, or still fuzzy?

Print the matching handoff verbatim, then stop. Each handoff assumes the downstream session may inherit a `mission:unset` MISSION.md and tells it to elicit the mission if needed.

| Runtime | Task state | Handoff |
|---|---|---|
| OMX adapter | Clear | `Run $ralplan with: "If my MISSION.md is still unset, elicit it from me first. Stamp MISSION.md with my answers. Then write a plan in .omx/plans/active/ for <task> using .omx/plans/handoff-template.md."` |
| OMX adapter | Fuzzy | `Run $deep-interview. Tell it your MISSION.md is unset AND your first task is fuzzy — it should cover both and write the plan in .omx/plans/active/. Keep runtime-only question/session data under .omx/state/.` |
| Plain agent | Clear | `Tell your agent: "My MISSION.md is unset. Ask me what this project is, outcomes, and non-goals. Update MISSION.md, then write a plan in .omx/plans/active/ for <task> using .omx/plans/handoff-template.md."` |
| Plain agent | Fuzzy | `Tell your agent: "My MISSION.md is unset AND my first task is fuzzy. Interview me until both are clear, then update MISSION.md and write the plan in .omx/plans/active/."` |
| Manual | Either | `Open MISSION.md and fill in the TODO sections. Then copy .omx/plans/handoff-template.md to .omx/plans/active/my-first-task.md and fill in its 7 sections.` |

## Stop condition

Do **not** write the first plan yourself. Do **not** stamp MISSION.md yourself, even if it is still marked `mission:unset`. Both are the next session's job. Your scope ends at: a cloned repo in the user's chosen directory, bootstrap's changelog stamp applied, `verify.sh --quick` honestly reported, and the printed handoff. Then stop.
