/**
 * Scroll timeline. Everything is expressed as scroll progress from 0 to 1.
 * Keep these numbers in step with the chapters in chapters.ts.
 */

/** Parts separate between `in[0]` and `in[1]`, and come back between `out[0]` and `out[1]`. */
export const EXPLODE = {
  in: [0.48, 0.68] as const,
  out: [0.68, 0.82] as const,
};

/** Model Y rotation (radians), evenly spaced over the whole scroll. */
export const ROTATION_KEYS: number[] = [
  0.35,
  1.0,
  1.9,
  2.4,
  3.0,
  4.4,
  Math.PI * 2 + 0.35,
];

/** Field of view, evenly spaced over the whole scroll. */
export const FOV_KEYS: number[] = [38, 36, 30, 40, 34, 36, 38];
