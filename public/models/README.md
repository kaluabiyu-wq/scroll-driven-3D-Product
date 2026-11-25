# Models

Put your Blender export here as `product.glb`, then set `VITE_USE_GLB=true`
in a `.env` file. The mesh names must match `src/config/parts.ts`
(cup_l, cup_r, cushion_l, cushion_r, driver_l, driver_r, headband,
yoke_l, yoke_r, logo_l, logo_r).

Until then the app draws a built-in procedural headphones model with the same
part names, so the whole scroll story and exploded view work without any file.
