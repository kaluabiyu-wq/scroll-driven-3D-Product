import { useRef } from 'react';
import type { Group } from 'three';
import { useExplode } from './useExplode';
import { useProductVariant } from '../../core/preferences/VariantContext';
import { useQualitySettings } from '../../core/preferences/QualityContext';

/**
 * Built-in stand-in for the Blender model, with the same part names.
 * Left parts sit on -X, right parts on +X. Cup and driver axes point along X.
 */
const SIDES = [
  { s: 'l', x: -1 },
  { s: 'r', x: 1 },
] as const;

const SIDE_ROT: [number, number, number] = [0, 0, Math.PI / 2]; // cylinder axis -> X
const TORUS_ROT: [number, number, number] = [0, Math.PI / 2, 0]; // torus axis -> X

const COLORS = {
  metal: '#c4c9d4',
  driver: '#4a5160',
};

export default function ProceduralHeadphones() {
  const root = useRef<Group | null>(null);
  const { variant } = useProductVariant();
  const { quality } = useQualitySettings();
  const detail = quality.tier === 'low' ? 24 : quality.tier === 'medium' ? 40 : 64;
  useExplode(root, 'procedural');

  return (
    <group ref={root}>
      <mesh name="headband" position={[0, 0.3, 0]}>
        <torusGeometry args={[1.15, 0.07, quality.tier === 'low' ? 10 : 20, detail + 16, Math.PI]} />
        <meshStandardMaterial color={COLORS.metal} metalness={1} roughness={0.28} />
      </mesh>

      {SIDES.map(({ s, x }) => (
        <group key={s}>
          <mesh name={`yoke_${s}`} position={[x * 1.15, 0.38, 0]}>
            <boxGeometry args={[0.12, 0.42, 0.16]} />
            <meshStandardMaterial color={COLORS.metal} metalness={1} roughness={0.3} />
          </mesh>

          <mesh name={`cup_${s}`} position={[x * 1.05, 0, 0]} rotation={SIDE_ROT}>
            <cylinderGeometry args={[0.56, 0.52, 0.3, detail]} />
            <meshStandardMaterial color={variant.shell} metalness={0.35} roughness={0.38} />
          </mesh>

          <mesh name={`cushion_${s}`} position={[x * 0.8, 0, 0]} rotation={TORUS_ROT}>
            <torusGeometry args={[0.42, 0.13, quality.tier === 'low' ? 12 : 24, detail]} />
            <meshStandardMaterial color={variant.foam} roughness={0.92} />
          </mesh>

          <mesh name={`driver_${s}`} position={[x * 1.0, 0, 0]} rotation={SIDE_ROT}>
            <cylinderGeometry args={[0.32, 0.32, 0.08, detail]} />
            <meshStandardMaterial color={COLORS.driver} metalness={0.6} roughness={0.3} />
          </mesh>

          <mesh name={`logo_${s}`} position={[x * 1.21, 0, 0]} rotation={SIDE_ROT}>
            <cylinderGeometry args={[0.16, 0.16, 0.02, Math.max(16, Math.round(detail * 0.6))]} />
            <meshStandardMaterial
              color={variant.accent}
              emissive={variant.accent}
              emissiveIntensity={0.35}
              roughness={0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
