export type QualityTier = 'low' | 'medium' | 'high';
export type QualityPreference = 'auto' | QualityTier;
export type Quality = {
  tier: QualityTier;
  dpr: [number, number];
  shadows: boolean;
  antialias: boolean;
};

/** Conservative device tiers keep mobile GPU and memory use bounded. */
export function getQuality(preference: QualityPreference = 'auto'): Quality {
  const coarse = typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
  const memory = typeof navigator !== 'undefined' ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory : undefined;
  const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : undefined;
  const detectedTier: QualityTier = coarse || (memory !== undefined && memory <= 4) || (cores !== undefined && cores <= 4)
    ? 'low'
    : memory !== undefined && memory <= 8 ? 'medium' : 'high';
  const tier = preference === 'auto' ? detectedTier : preference;
  if (tier === 'low') {
    return { tier: 'low', dpr: [1, 1.25], shadows: false, antialias: false };
  }
  if (tier === 'medium') {
    return { tier: 'medium', dpr: [1, 1.5], shadows: false, antialias: true };
  }
  return { tier: 'high', dpr: [1, 2], shadows: true, antialias: true };
}

/** Set VITE_USE_GLB=true to load /models/product.glb instead of the procedural model. */
export const USE_GLB = import.meta.env.VITE_USE_GLB === 'true';
export const GLB_URL = '/models/product.glb';
