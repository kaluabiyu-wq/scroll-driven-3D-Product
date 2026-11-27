import { useEffect, useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Color } from 'three';
import type { Group, Mesh } from 'three';

import { useProductVariant } from '../../core/preferences/VariantContext';
import { useExplode } from './useExplode';

/** Loads a Blender export, clones its materials and applies the selected finish. */
export default function GlbHeadphones({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const { variant } = useProductVariant();
  const productScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((object) => {
      if (!('isMesh' in object) || !object.isMesh) return;
      const mesh = object as Mesh;
      mesh.material = Array.isArray(mesh.material)
        ? mesh.material.map((material) => material.clone())
        : mesh.material.clone();
    });
    return clone;
  }, [scene]);
  const root = useRef<Group>(null!);
  useExplode(root, productScene);

  useEffect(() => {
    productScene.traverse((object) => {
      if (!('isMesh' in object) || !object.isMesh) return;
      const mesh = object as Mesh;
      const name = mesh.name.toLowerCase();
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      const color = name.includes('cushion') ? variant.foam
        : name.includes('logo') ? variant.accent
        : name.includes('cup') ? variant.shell : null;
      if (!color) return;
      materials.forEach((material) => {
        if ('color' in material && material.color instanceof Color) material.color.set(color);
        if (name.includes('logo') && 'emissive' in material && material.emissive instanceof Color) material.emissive.set(color);
      });
    });
  }, [productScene, variant]);

  return (
    <group ref={root}>
      <primitive object={productScene} />
    </group>
  );
}
