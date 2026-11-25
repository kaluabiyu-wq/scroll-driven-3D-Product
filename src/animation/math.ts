export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Map v from [a, b] to [0, 1], clamped. */
export const remap = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));

export const easeInOut = (t: number) => t * t * (3 - 2 * t);

/** Linear sample of evenly spaced keyframes by progress 0..1. */
export function sampleKeys(keys: readonly number[], progress: number): number {
  const scaled = clamp01(progress) * (keys.length - 1);
  const i = Math.min(Math.floor(scaled), keys.length - 2);
  const f = scaled - i;
  return keys[i] + (keys[i + 1] - keys[i]) * easeInOut(f);
}
