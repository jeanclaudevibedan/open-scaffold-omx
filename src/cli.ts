#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createRunArtifacts } from './artifacts.js';
import { printRuntimeDoctor, printRuntimeHandoff } from './runtime.js';
import { inspectScaffold, parsePlanFile, planToJson } from './scaffold.js';

function printHelp(): void {
  console.log(`osc-omx — open-scaffold OMX adapter CLI

Usage:
  osc-omx status [--json]
  osc-omx plan <plan-path>
  osc-omx delegate <plan-path>
  osc-omx run <plan-path>
  osc-omx review <plan-path>
  osc-omx ultrareview <plan-path>
  osc-omx handoff <plan-path>
  osc-omx verify
  osc-omx doctor

This adapter keeps the scaffold contract in .omx/ and emits OMX-native handoff commands.`);
}

function requireArg(args: string[], name: string): string {
  const value = args[0];
  if (!value) {
    console.error(`Missing required argument: ${name}`);
    process.exit(2);
  }
  return value;
}

function status(json: boolean): void {
  const state = inspectScaffold(process.cwd());
  if (json) {
    console.log(JSON.stringify(state, null, 2));
    return;
  }
  console.log('open-scaffold OMX status');
  console.log(`Namespace: ${state.namespace}`);
  console.log(`Mission: ${state.mission.defined ? 'defined' : `not defined (${state.mission.reason})`}`);
  for (const stage of ['active', 'backlog', 'blocked', 'done'] as const) {
    const plans = state.plans[stage];
    console.log(`${stage}: ${plans.length}`);
    for (const plan of plans) console.log(`  - ${plan.slug}`);
  }
}

function createArtifacts(args: string[], mode: 'delegate' | 'run' | 'review' | 'ultrareview'): void {
  const planPath = resolve(requireArg(args, 'plan-path'));
  if (!existsSync(planPath)) {
    console.error(`Plan not found: ${planPath}`);
    process.exit(1);
  }
  const plan = parsePlanFile(planPath);
  const run = createRunArtifacts(process.cwd(), plan, mode);
  console.log(`Created ${mode} artifacts:`);
  console.log(`  Run: ${run.runDir}`);
  console.log(`  Manifest: ${run.manifestPath}`);
  for (const prompt of run.promptPaths) console.log(`  Prompt: ${prompt}`);
}

function main(): void {
  const [command, ...args] = process.argv.slice(2);
  switch (command) {
    case undefined:
    case '-h':
    case '--help':
    case 'help':
      printHelp();
      return;
    case 'status':
      status(args.includes('--json'));
      return;
    case 'plan': {
      const planPath = resolve(requireArg(args, 'plan-path'));
      console.log(JSON.stringify(planToJson(parsePlanFile(planPath)), null, 2));
      return;
    }
    case 'delegate':
    case 'run':
    case 'review':
    case 'ultrareview':
      createArtifacts(args, command);
      return;
    case 'handoff': {
      const planPath = resolve(requireArg(args, 'plan-path'));
      printRuntimeHandoff(process.cwd(), planPath);
      return;
    }
    case 'verify': {
      const state = inspectScaffold(process.cwd());
      if (!state.mission.defined) {
        console.error(`FAIL mission: ${state.mission.reason}`);
        process.exit(1);
      }
      const count = Object.values(state.plans).flat().length;
      if (count === 0) {
        console.error('FAIL plans: no plan files found under .omx/plans/');
        process.exit(1);
      }
      console.log(`PASS mission defined and ${count} plan file(s) found`);
      return;
    }
    case 'doctor':
      status(false);
      printRuntimeDoctor();
      return;
    default:
      console.error(`Unknown command: ${command}`);
      printHelp();
      process.exit(2);
  }
}

main();
