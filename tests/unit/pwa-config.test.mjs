import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const manifest = JSON.parse(await readFile(new URL('../../public/manifest.webmanifest', import.meta.url), 'utf8'));
const worker = await readFile(new URL('../../public/sw.js', import.meta.url), 'utf8');

test('PWA manifest has a standalone app identity and root scope', () => {
  assert.equal(manifest.name, 'Halo H1 — 3D Product Story');
  assert.equal(manifest.start_url, '/');
  assert.equal(manifest.scope, '/');
  assert.equal(manifest.display, 'standalone');
  assert.ok(manifest.icons.length > 0);
});

test('service worker versions and cleans up its own cache namespace', () => {
  assert.match(worker, /halo-story-shell-v1/);
  assert.match(worker, /caches\.delete\(key\)/);
  assert.match(worker, /request\.mode === 'navigate'/);
});
