import { describe, expect, it } from 'vitest';
import { runtimeHandoffText } from '../src/runtime.js';

describe('OMX runtime handoff', () => {
  it('names the runtime and namespace', () => {
    const text = runtimeHandoffText({ slug: '001-demo', goal: 'Demo goal', promptPaths: ['.omx/runs/demo/prompts/single-session.md'], groupCount: 1 });
    expect(text).toContain('OMX');
    expect(text).toContain('.omx');
  });
});
