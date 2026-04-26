import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRunArtifacts } from './artifacts.js';
import { parsePlanFile } from './scaffold.js';

export interface HandoffInput { slug: string; goal: string; promptPaths: string[]; groupCount: number }

function hasCommand(cmd: string): boolean {
  try { execFileSync('bash', ['-lc', `command -v ${cmd}`], { stdio: 'ignore' }); return true; } catch { return false; }
}

export function runtimeHandoffText(input: HandoffInput): string {
  const teamSize = Math.max(1, Math.min(6, input.groupCount || 1));
  const quotedGoal = JSON.stringify(`${input.slug}: ${input.goal || 'execute the approved scaffold plan'}\n\nRead AGENTS.md, .omx/RULES.md, MISSION.md, the plan, amendments, and generated prompts before acting. Persist runtime-only session/question/team data under .omx/state. Keep scope tied to acceptance criteria and run ./verify.sh before final handoff.`);
  return [
    'OMX handoff (.omx)',
    '',
    `Plan: ${input.slug}`,
    `Prompt artifacts: ${input.promptPaths.join(', ') || '(none)'}`,
    '',
    'Recommended Codex / OMX sequence:',
    `1. $deep-interview ${quotedGoal}`,
    `2. $ralplan ${quotedGoal}`,
    `3. $team ${teamSize}:executor ${quotedGoal}`,
    `4. $ralph ${quotedGoal}`,
    '',
    'OMX conventions:',
    '- .omx/state is runtime-owned durable state for questions, sessions, logs, memory, plans, and team lifecycle.',
    '- Prefer tmux-backed OMX on macOS/Linux for team runs.',
    '- Codex-native hooks belong in .codex/hooks.json or OMX setup; this adapter does not install hooks silently.',
    '- Do not simulate $deep-interview; run real OMX when clarification is required.',
  ].join('\n');
}

export function printRuntimeHandoff(root: string, planPath: string): void {
  if (!existsSync(planPath)) throw new Error(`Plan not found: ${planPath}`);
  const plan = parsePlanFile(planPath);
  const run = createRunArtifacts(root, plan, 'run');
  console.log(runtimeHandoffText({ slug: plan.slug, goal: plan.goal, promptPaths: run.promptPaths.map((p) => p.replace(root + '/', '')), groupCount: plan.executionStrategy?.groups.length ?? 1 }));
}

export function printRuntimeDoctor(): void {
  console.log('OMX adapter doctor');
  console.log(`  omx: ${hasCommand('omx') ? 'found' : 'missing'}`);
  console.log(`  codex: ${hasCommand('codex') ? 'found' : 'missing'}`);
  console.log(`  tmux: ${hasCommand('tmux') ? 'found' : 'missing'}`);
  console.log('  namespace: .omx');
}
