import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { ROTATION_KEYS } from '../../config/timeline';
import { GLB_MOBILE_URL, GLB_URL, USE_GLB } from '../../config/quality';
import { useQualitySettings } from '../../core/preferences/QualityContext';
import { sampleKeys } from '../../animation/math';
import { scrollState } from '../../core/scroll/scrollState';
import ProceduralHeadphones from './ProceduralHeadphones';
import GlbHeadphones from './GlbHeadphones';
import CalloutLayer from '../callouts/CalloutLayer';

/** Turns the whole product with the scroll and adds a slow idle float. */
export default function Headphones() {
  const group = useRef<Group>(null!);
  const { quality } = useQualitySettings();
  const mobileModelAvailable = Boolean(GLB_MOBILE_URL);
  const selectedGlb = quality.tier === 'low' && mobileModelAvailable ? GLB_MOBILE_URL : GLB_URL;
  const shouldUseGlb = USE_GLB && (quality.tier !== 'low' || mobileModelAvailable);

  useFrame(({ clock }) => {
    group.current.rotation.y = sampleKeys(ROTATION_KEYS, scrollState.current);
    group.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.04;
  });

  return (
    <group ref={group}>
      {shouldUseGlb ? <GlbHeadphones url={selectedGlb} /> : <ProceduralHeadphones />}
      <CalloutLayer />
    </group>
  );
}
