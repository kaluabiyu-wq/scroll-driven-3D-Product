import { EXPLODE } from '../config/timeline';
import { easeInOut, remap } from './math';

/** 0 = assembled, 1 = fully exploded, for a given scroll progress. */
export function explodeAmount(progress: number): number {
  const open = easeInOut(remap(progress, EXPLODE.in[0], EXPLODE.in[1]));
  const close = easeInOut(remap(progress, EXPLODE.out[0], EXPLODE.out[1]));
  return open * (1 - close);
}

/** Per-part amount: a part with a delay starts later but ends together with the rest. */
export function partAmount(amount: number, delay: number): number {
  return easeInOut(remap(amount, delay, 1));
}
