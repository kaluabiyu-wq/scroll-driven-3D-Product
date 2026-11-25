/**
 * Exploded-view layout. `name` must match a mesh name in the model
 * (the built-in procedural model uses the same names as the Blender export).
 *
 * dir       direction of travel (normalised in code). Left parts use -X, right parts +X.
 * distance  how far the part travels when fully exploded, in model units.
 * delay     0 to 0.9: how late the part starts moving. Larger = later.
 */
export type PartConfig = {
  name: string;
  dir: [number, number, number];
  distance: number;
  delay: number;
};

export const PARTS: PartConfig[] = [
  { name: 'headband', dir: [0, 1, 0], distance: 0.9, delay: 0.0 },

  { name: 'yoke_l', dir: [-0.4, 1, 0], distance: 0.9, delay: 0.1 },
  { name: 'yoke_r', dir: [0.4, 1, 0], distance: 0.9, delay: 0.1 },

  // cushions travel inward, towards where the head would be
  { name: 'cushion_l', dir: [1, 0, 0], distance: 0.55, delay: 0.0 },
  { name: 'cushion_r', dir: [-1, 0, 0], distance: 0.55, delay: 0.0 },

  { name: 'driver_l', dir: [-1, 0, 0], distance: 0.55, delay: 0.2 },
  { name: 'driver_r', dir: [1, 0, 0], distance: 0.55, delay: 0.2 },

  { name: 'cup_l', dir: [-1, 0, 0], distance: 1.5, delay: 0.3 },
  { name: 'cup_r', dir: [1, 0, 0], distance: 1.5, delay: 0.3 },

  { name: 'logo_l', dir: [-1, 0, 0], distance: 2.3, delay: 0.45 },
  { name: 'logo_r', dir: [1, 0, 0], distance: 2.3, delay: 0.45 },
];
