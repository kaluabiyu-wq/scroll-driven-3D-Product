import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import type { Group } from 'three';
import { GLB_URL } from '../../config/quality';
import { useExplode } from './useExplode';

/** Your Blender export. Mesh names must match src/config/parts.ts. */
export default function GlbHeadphones() {
  const { scene } = useGLTF(GLB_URL);
  const root = useRef<Group>(null);
  useExplode(root, scene);

  return (
    <group ref={root}>
      <primitive object={scene} />
    </group>
  );
}
