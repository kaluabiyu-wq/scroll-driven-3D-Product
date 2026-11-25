/**
 * Shared scroll values, read every frame by the 3D scene.
 * A plain object (not React state) so nothing re-renders at 60 fps.
 *
 * target   raw scroll progress 0..1 written by ScrollTrigger
 * current  eased value the scene actually uses
 */
export const scrollState = { target: 0, current: 0 };
