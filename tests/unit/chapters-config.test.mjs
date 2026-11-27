import test from 'node:test';
import assert from 'node:assert/strict';
import { chapters } from '../../src/config/chapters.ts';

test('story has seven ordered chapters spanning the full scroll range', () => {
  assert.equal(chapters.length, 7);
  assert.equal(chapters[0].start, 0);
  assert.equal(chapters.at(-1).end, 1);
  for (let i = 0; i < chapters.length; i += 1) {
    assert.ok(chapters[i].start < chapters[i].end, `${chapters[i].id} has a valid range`);
    if (i > 0) assert.equal(chapters[i - 1].end, chapters[i].start);
  }
});

test('chapter ids are unique and safe to use as anchors', () => {
  const ids = chapters.map((chapter) => chapter.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z][a-z0-9-]*$/);
});

test('chapter section heights map exactly to the 700vh scroll timeline', () => {
  const totalViewportHeights = chapters.reduce(
    (total, chapter) => total + (chapter.end - chapter.start) * 700,
    0,
  );
  assert.equal(totalViewportHeights, 700);
});
