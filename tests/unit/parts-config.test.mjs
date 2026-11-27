import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PARTS } from '../../src/config/parts.ts';

const requiredNames = [
  'headband', 'yoke_l', 'yoke_r', 'cushion_l', 'cushion_r',
  'driver_l', 'driver_r', 'cup_l', 'cup_r', 'logo_l', 'logo_r',
];

test('exploded-view configuration covers every named product part exactly once', () => {
  const names = PARTS.map((part) => part.name);
  assert.deepEqual([...names].sort(), [...requiredNames].sort());
  assert.equal(new Set(names).size, names.length);
});

test('every exploded part has a finite direction, distance and stagger delay', () => {
  for (const part of PARTS) {
    assert.equal(part.dir.length, 3);
    assert.ok(part.dir.every(Number.isFinite), `${part.name} direction is finite`);
    assert.ok(Number.isFinite(part.distance) && part.distance > 0);
    assert.ok(Number.isFinite(part.delay) && part.delay >= 0 && part.delay < 1);
  }
});

test('every exploded part has a matching animated callout', async () => {
  const source = await readFile(new URL('../../src/canvas/callouts/CalloutLayer.tsx', import.meta.url), 'utf8');
  for (const name of requiredNames) assert.match(source, new RegExp(`name: \\'${name}\\'`));
  assert.match(source, /cylinderGeometry/);
});
