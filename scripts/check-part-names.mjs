import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const file = resolve(process.argv[2] ?? 'public/models/product.glb');
const required = ['headband', 'cup_l', 'cup_r', 'cushion_l', 'cushion_r', 'driver_l', 'driver_r', 'yoke_l', 'yoke_r', 'logo_l', 'logo_r'];

try {
  const bytes = await readFile(file);
  if (bytes.toString('ascii', 0, 4) !== 'glTF') throw new Error('Not a binary glTF (.glb) file');
  const jsonLength = bytes.readUInt32LE(12);
  const jsonType = bytes.readUInt32LE(16);
  if (jsonType !== 0x4e4f534a) throw new Error('The first GLB chunk is not JSON');
  const document = JSON.parse(bytes.toString('utf8', 20, 20 + jsonLength));
  const names = new Set((document.nodes ?? []).map((node) => node.name).filter(Boolean));
  const missing = required.filter((name) => !names.has(name));
  if (missing.length) {
    console.error(`Missing required mesh/node names: ${missing.join(', ')}`);
    process.exitCode = 1;
  } else {
    console.log(`Validated ${required.length} required product part names in ${file}`);
  }
} catch (error) {
  console.error(`Unable to validate model: ${error.message}`);
  process.exitCode = 1;
}
