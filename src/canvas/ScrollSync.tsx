import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import { scrollState } from '../core/scroll/scrollState';

/** Eases scrollState.current toward the real scroll. Runs before everything else each frame. */
export default function ScrollSync() {
  useFrame((_, delta) => {
    scrollState.current = MathUtils.damp(scrollState.current, scrollState.target, 5, delta);
  }, -1);
  return null;
}
