import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Quaternion, Vector3 } from 'three';
import type { Group, Mesh } from 'three';
import { PARTS } from '../../config/parts';
import { EXPLODE } from '../../config/timeline';
import { remap } from '../../animation/math';
import { explodeAmount, partAmount } from '../../animation/explode';
import { scrollState } from '../../core/scroll/scrollState';

const CALLOUTS = [
  { name: 'headband', label: 'Steel headband', base: [0, 0.55, 0.12] as [number, number, number] },
  { name: 'yoke_l', label: 'Left floating yoke', base: [-1.15, 0.48, 0.16] as [number, number, number] },
  { name: 'yoke_r', label: 'Right floating yoke', base: [1.15, 0.48, 0.16] as [number, number, number] },
  { name: 'cup_l', label: 'Left acoustic shell', base: [-1.05, 0.08, 0.28] as [number, number, number] },
  { name: 'cup_r', label: 'Right acoustic shell', base: [1.05, 0.08, 0.28] as [number, number, number] },
  { name: 'cushion_l', label: 'Left memory-foam cushion', base: [-0.8, -0.1, 0.35] as [number, number, number] },
  { name: 'cushion_r', label: 'Right memory-foam cushion', base: [0.8, -0.1, 0.35] as [number, number, number] },
  { name: 'driver_l', label: 'Left 40 mm driver', base: [-1, 0.05, 0.45] as [number, number, number] },
  { name: 'driver_r', label: 'Right 40 mm driver', base: [1, 0.05, 0.45] as [number, number, number] },
  { name: 'logo_l', label: 'Left logo plate', base: [-1.21, 0.05, 0.5] as [number, number, number] },
  { name: 'logo_r', label: 'Right logo plate', base: [1.21, 0.05, 0.5] as [number, number, number] },
];

const Y_AXIS = new Vector3(0, 1, 0);
const direction = new Vector3();
const quaternion = new Quaternion();

/** HTML labels and connector lines follow their exploded parts in the product group. */
export default function CalloutLayer() {
  const root = useRef<Group | null>(null);
  const labels = useRef<(Group | null)[]>([]);
  const connectors = useRef<(Mesh | null)[]>([]);
  const anchors = useRef<(Mesh | null)[]>([]);
  useFrame(() => {
    const progress = scrollState.current;
    const open = remap(progress, EXPLODE.in[0], EXPLODE.in[1]);
    const close = remap(progress, EXPLODE.out[0], EXPLODE.out[1]);
    if (root.current) root.current.visible = open > 0.12 && close < 0.9;
    const amount = explodeAmount(progress);
    CALLOUTS.forEach((item, index) => {
      const group = labels.current[index];
      const cfg = PARTS.find((part) => part.name === item.name);
      if (!group || !cfg) return;
      const weight = partAmount(amount, cfg.delay);
      const offsetX = cfg.dir[0] * cfg.distance * weight;
      const offsetY = cfg.dir[1] * cfg.distance * weight;
      const offsetZ = cfg.dir[2] * cfg.distance * weight;
      group.position.set(item.base[0] + offsetX, item.base[1] + offsetY, item.base[2] + offsetZ);

      // Keep a fine leader line attached to the original part anchor.
      const connector = connectors.current[index];
      const anchor = anchors.current[index];
      direction.set(-offsetX, -offsetY, -offsetZ);
      if (connector && anchor) {
        const length = direction.length();
        connector.visible = length > 0.035;
        anchor.visible = length > 0.035;
        connector.position.set(-offsetX / 2, -offsetY / 2, -offsetZ / 2);
        connector.scale.set(1, Math.max(length, 0.001), 1);
        if (length > 0.001) {
          quaternion.setFromUnitVectors(Y_AXIS, direction.normalize());
          connector.quaternion.copy(quaternion);
        }
        anchor.position.set(-offsetX, -offsetY, -offsetZ);
      }
    });
  });

  return (
    <group ref={root}>
      {CALLOUTS.map((item, index) => (
        <group key={item.name} ref={(node) => { labels.current[index] = node; }} position={item.base}>
          <Html distanceFactor={8} center style={{ pointerEvents: 'none' }}>
            <span className="part-callout">{item.label}</span>
          </Html>
          <mesh ref={(node) => { connectors.current[index] = node; }} visible={false}>
            <cylinderGeometry args={[0.006, 0.006, 1, 5]} />
            <meshBasicMaterial color="#7fe3d1" transparent opacity={0.72} depthWrite={false} />
          </mesh>
          <mesh ref={(node) => { anchors.current[index] = node; }} visible={false}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color="#7fe3d1" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
