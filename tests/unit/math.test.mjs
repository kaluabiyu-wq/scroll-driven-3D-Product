import test from 'node:test';
import assert from 'node:assert/strict';
import { clamp01, remap, easeInOut, sampleKeys } from '../../src/animation/math.ts';

test('clamp01 bounds values to the unit interval', () => {
  assert.equal(clamp01(-1), 0);
  assert.equal(clamp01(0.4), 0.4);
  assert.equal(clamp01(2), 1);
});

test('remap clamps and maps a source interval', () => {
  assert.equal(remap(5, 0, 10), 0.5);
  assert.equal(remap(-1, 0, 10), 0);
  assert.equal(remap(11, 0, 10), 1);
});

test('smoothstep easing preserves endpoints and midpoint', () => {
  assert.equal(easeInOut(0), 0);
  assert.equal(easeInOut(0.5), 0.5);
  assert.equal(easeInOut(1), 1);
});

test('keyframe sampling interpolates endpoints and middle', () => {
  assert.equal(sampleKeys([0, 10, 20], 0), 0);
  assert.equal(sampleKeys([0, 10, 20], 0.5), 10);
  assert.equal(sampleKeys([0, 10, 20], 1), 20);
});


test('chapter timeline matches the seven roadmap intervals', async () => {
  const { chapters } = await import('../../src/config/chapters.ts');
  assert.deepEqual(chapters.map(({ start, end }) => [start, end]), [
    [0, 0.1], [0.1, 0.28], [0.28, 0.48], [0.48, 0.68],
    [0.68, 0.82], [0.82, 0.92], [0.92, 1],
  ]);
});
