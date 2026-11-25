# Halo H1: scroll-driven 3D product story

React + Vite + TypeScript + three + @react-three/fiber + drei + GSAP ScrollTrigger + Lenis.

A fictional pair of headphones turns, changes camera angle and explodes into its parts
as you scroll, while text chapters fade in and out in step with the scene.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

No model file is needed: the app draws a built-in procedural headphones model that uses the
same part names as the Blender export, so the exploded view works straight away.

## Use your own Blender model

1. Export a GLB from Blender (see `docs/blender-guide.md`) to `public/models/product.glb`.
2. Copy `.env.example` to `.env` and set `VITE_USE_GLB=true`.
3. Restart `npm run dev`. The console warns about any part name from `src/config/parts.ts`
   that the model does not contain.

## Where to change things

| I want to change...                      | Edit                              |
|------------------------------------------|-----------------------------------|
| Text, number of chapters, left/right     | `src/config/chapters.ts`          |
| Camera path (position and look-at)       | `src/config/camera-path.ts`       |
| Model turn, field of view, explode timing| `src/config/timeline.ts`          |
| Which parts explode, how far, how late   | `src/config/parts.ts`             |
| Mobile quality, GLB switch               | `src/config/quality.ts`           |
| Colours and type                         | `src/index.css` (`:root` tokens)  |

If you add or remove chapters, update the camera keys and timeline numbers so they stay
evenly spaced over 0 to 1 (chapter i covers i/n to (i+1)/n of the scroll).

## How scroll drives the scene

```
Lenis smooth scroll -> ScrollTrigger (#story, progress 0..1)
   -> scrollState.target            (src/core/scroll)
   -> ScrollSync eases -> scrollState.current   (every frame, before other frame hooks)
   -> CameraRig, Headphones rotation, useExplode all read scrollState.current
```

`scrollState` is a plain object, not React state, so nothing re-renders at 60 fps.
GSAP animates only the text; `useFrame` animates only the 3D scene.

## Fallbacks

- No WebGL, or `prefers-reduced-motion: reduce`: a static page with the same copy (`src/fallback`).
- Touch or narrow screens: lower pixel ratio, no contact shadow, camera pulls back in portrait.

## Project structure

```
src/
  config/       chapters, camera-path, timeline, parts, quality
  core/         scroll (state, Lenis + ScrollTrigger, active chapter), device detection
  animation/    pure maths: remap, easing, keyframe sampling, explode amounts
  canvas/       SceneCanvas, CameraRig, ScrollSync, product/ (model, explode hook)
  ui/           Story, Header, Loader, ProgressRail, ScrollHint
  fallback/     StaticStory
docs/           Blender guide
source/         keep your .blend file here (not served)
```

## Notes

- Fonts load from Google Fonts with a system fallback. Self-host them for production if you prefer.
- Lighting uses built-in Lightformers, so no HDR file is downloaded.
- Next steps from the roadmap: compress the GLB (gltf-transform), part callout labels,
  colour variants, unit tests for `src/animation`, Playwright end-to-end tests.
