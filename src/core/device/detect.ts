export function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** 'full' = 3D scroll story, 'static' = plain page for no WebGL or reduced motion. */
export function getRenderMode(): 'full' | 'static' {
  return hasWebGL() && !prefersReducedMotion() ? 'full' : 'static';
}
