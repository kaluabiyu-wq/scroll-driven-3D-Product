import { CatmullRomCurve3, Vector3 } from 'three';

/**
 * Camera keyframes, evenly spaced over the scroll (7 keys, 6 chapters).
 * `pos` is where the camera is, `look` is the point it aims at.
 */
const KEYS = [
  { pos: [0.0, 0.3, 6.2], look: [0.0, 0.0, 0.0] }, // intro
  { pos: [3.4, 1.0, 4.6], look: [0.0, 0.2, 0.0] }, // design
  { pos: [-1.2, 0.2, 3.0], look: [-1.0, 0.0, 0.0] }, // sound: close on the left cup
  { pos: [0.0, 1.8, 8.4], look: [0.0, 0.0, 0.0] }, // explode: pull back
  { pos: [1.6, -0.1, 3.6], look: [1.0, 0.0, 0.0] }, // comfort: close on the right side
  { pos: [-2.6, 0.9, 5.2], look: [0.0, 0.1, 0.0] }, // outro approach
  { pos: [0.0, 0.3, 6.0], look: [0.0, 0.0, 0.0] }, // outro: hero pose
] as const;

export const cameraPositionCurve = new CatmullRomCurve3(
  KEYS.map((k) => new Vector3(...k.pos)),
  false,
  'catmullrom',
  0.5,
);

export const cameraLookCurve = new CatmullRomCurve3(
  KEYS.map((k) => new Vector3(...k.look)),
  false,
  'catmullrom',
  0.5,
);
