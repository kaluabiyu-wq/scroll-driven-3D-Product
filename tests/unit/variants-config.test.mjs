import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCT_VARIANTS } from '../../src/config/variants.ts';

test('product finishes have unique ids and valid colour values', () => {
  assert.deepEqual(PRODUCT_VARIANTS.map((item) => item.id), ['graphite', 'sand', 'ice']);
  assert.equal(new Set(PRODUCT_VARIANTS.map((item) => item.id)).size, PRODUCT_VARIANTS.length);
  for (const item of PRODUCT_VARIANTS) {
    for (const color of [item.shell, item.accent, item.foam]) assert.match(color, /^#[0-9a-f]{6}$/i);
  }
});
