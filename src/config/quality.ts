export type Quality = {
  dpr: [number, number];
  shadows: boolean;
};

/** Pick render quality once, from the device. Mobile gets a lighter scene. */
export function getQuality(): Quality {
  const coarse =
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);

  return coarse ? { dpr: [1, 1.5], shadows: false } : { dpr: [1, 2], shadows: true };
}

/** Set VITE_USE_GLB=true to load /models/product.glb instead of the procedural model. */
export const USE_GLB = import.meta.env.VITE_USE_GLB === 'true';
export const GLB_URL = '/models/product.glb';
