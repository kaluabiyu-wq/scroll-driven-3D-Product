#!/usr/bin/env node
/**
 * Optimize a Blender-exported GLB with gltf-transform's Meshopt pipeline.
 * Usage: node scripts/optimize-model.mjs input.glb output.glb
 * Install the optional CLI once with: npm i -D @gltf-transform/cli
 */
import { access, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { spawn } from 'node:child_process';

const [inputArg, outputArg] = process.argv.slice(2);
if (!inputArg || !outputArg || extname(inputArg).toLowerCase() !== '.glb' || extname(outputArg).toLowerCase() !== '.glb') {
  console.error('Usage: node scripts/optimize-model.mjs input.glb output.glb');
  process.exit(2);
}
const input = resolve(inputArg);
const output = resolve(outputArg);
try {
  await access(input);
  const before = (await stat(input)).size;
  const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const result = await new Promise((resolvePromise) => {
    const child = spawn(command, ['--no-install', 'gltf-transform', 'optimize', input, output, '--compress', 'meshopt'], { stdio: 'inherit' });
    child.on('error', (error) => resolvePromise({ code: 1, error }));
    child.on('close', (code) => resolvePromise({ code: code ?? 1 }));
  });
  if (result.code !== 0) throw new Error('gltf-transform CLI is unavailable or optimization failed. Install @gltf-transform/cli as a dev dependency.');
  const after = (await stat(output)).size;
  console.log(`Optimized ${input} -> ${output}`);
  console.log(`Size: ${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB (${(100 - after / before * 100).toFixed(1)}% change)`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
