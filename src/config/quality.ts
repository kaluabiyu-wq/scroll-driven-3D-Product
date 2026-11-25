export type QualityTier = 'low' | 'medium' | 'high';
export type Quality = {
  tier: QualityTier;
  dpr: [number, number];
  shadows: boolean;
  antialias: boolean;
};

/** Conservative device tiers keep mobile GPU and memory use bounded. */
export function getQuality(): Quality {
  const coarse = typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
  const memory = typeof navigator !== 'undefined' ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory : undefined;
  const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : undefined;
  if (coarse || (memory !== undefined && memory <= 4) || (cores !== undefined && cores <= 4)) {
    return { tier: 'low', dpr: [1, 1.25], shadows: false, antialias: false };
  }
  if (memory !== undefined && memory <= 8) {
    return { tier: 'medium', dpr: [1, 1.5], shadows: false, antialias: true };
  }
  return { tier: 'high', dpr: [1, 2], shadows: true, antialias: true };
}

/** Set VITE_USE_GLB=true to load /models/product.glb instead of the procedural model. */
export const USE_GLB = import.meta.env.VITE_USE_GLB === 'true';
export const GLB_URL = '/models/product.glb';
