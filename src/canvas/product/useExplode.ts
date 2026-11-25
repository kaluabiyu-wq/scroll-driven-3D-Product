import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import type { Object3D } from 'three';
import { PARTS } from '../../config/parts';
import type { PartConfig } from '../../config/parts';
import { explodeAmount, partAmount } from '../../animation/explode';
import { scrollState } from '../../core/scroll/scrollState';

type Item = { obj: Object3D; origin: Vector3; dir: Vector3; cfg: PartConfig };

/**
 * Moves every configured part along its direction as the page scrolls.
 * Parts are found by name inside `root`; missing names are reported in dev.
 *
 * Note: directions are applied in each part's parent space, so parts should be
 * top-level objects with no extra rotation or scale (see the Blender guide).
 */
export function useExplode(root: RefObject<Object3D | null>, ready: unknown) {
  const items = useRef<Item[]>([]);

  useEffect(() => {
    const group = root.current;
    if (!group) return;

    const found: Item[] = [];
    const missing: string[] = [];

    for (const cfg of PARTS) {
      const obj = group.getObjectByName(cfg.name);
      if (!obj) {
        missing.push(cfg.name);
        continue;
      }
      found.push({
        obj,
        origin: obj.position.clone(),
        dir: new Vector3(...cfg.dir).normalize(),
        cfg,
      });
    }

    if (import.meta.env.DEV && missing.length > 0) {
      console.warn(`[explode] parts not found in model: ${missing.join(', ')}`);
    }

    items.current = found;
    return () => {
      for (const it of found) it.obj.position.copy(it.origin);
    };
  }, [root, ready]);

  useFrame(() => {
    const amount = explodeAmount(scrollState.current);
    for (const it of items.current) {
      const a = partAmount(amount, it.cfg.delay);
      it.obj.position.copy(it.origin).addScaledVector(it.dir, it.cfg.distance * a);
    }
  });
}
