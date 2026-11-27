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
npm run test:e2e   # optional browser tests (see below)
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
| Colours and type                         | `src/index.css` (`:root` tokens)
| Product finishes                        | `src/config/variants.ts` and `src/canvas/product/ProceduralHeadphones.tsx`  |

Each chapter declares its exact `start` and `end` progress values in `src/config/chapters.ts`.
The page allocates 700 viewport-heights to the scrollable story. The final chapter fills
the remaining viewport at the end, so all seven ranges match the roadmap's 0.00–1.00 timeline.

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

## Offline and installable experience

The production build registers a small service worker and web app manifest. It caches the app shell and same-origin built assets as they are used, so a previously visited story can reopen offline. A small status notice announces when the browser loses its connection. Bump the cache version in `public/sw.js` when changing the offline shell.

The 3D render loop pauses while the browser tab is hidden or the story section is outside the viewport. ScrollTrigger refreshes after viewport and orientation changes, without doing layout work in the animation frame loop. Device tiers still cap pixel ratio and disable contact shadows on low-tier devices.

## Model asset pipeline

- Keep the editable `.blend` source outside `public/` (for example in `source/`).
- Export a desktop GLB to `public/models/product.glb` and a separate reduced-triangle mobile GLB when available.
- Validate required node names with `npm run check:parts -- public/models/product.glb`.
- Install the optional optimizer once with `npm i -D @gltf-transform/cli`, then run `node scripts/optimize-model.mjs input.glb output.glb`.
- Keep model files under the budgets in `docs/performance-budget.md`; do not commit assets without a clear licence.

## Browser tests

Install the optional Playwright runner and Chromium with `npm i -D @playwright/test` and `npx playwright install chromium`, then run `npm run test:e2e`. The suite covers story navigation, the skip link, reduced motion, no-WebGL fallback and a mobile viewport.

## Notes

- Fonts load from Google Fonts with a system fallback; the story remains readable if the font request is unavailable.
- Lighting uses built-in Lightformers, so no HDR file is downloaded.
- A real desktop GLB, separately authored mobile GLB, physical-device profiling, Lighthouse scores and cross-browser QA are still release tasks. The built-in procedural model is used by default.
- Halo H1 is a fictional concept. The specs and CTA are illustrative; no payment, waitlist or analytics backend is connected.

## Product experience additions

The story includes a specification summary, keyboard-accessible FAQ, persistent finish preference, native share/copy-link control and a contextual Back to top action. These work in both the WebGL experience and static fallback. Exploded-view labels now include animated connector lines and fixed part-anchor dots. The loading indicator exposes its real asset progress as an accessible progressbar. Halo H1 is a fictional showcase product; no checkout or mailing-list service is connected.

## Continuous integration and release QA

GitHub Actions runs `npm ci`, the unit suite and the production build for pushes and pull requests. Use `docs/qa-release-checklist.md` for the additional real-browser, accessibility, device-performance and deployment checks that cannot be proven by unit tests alone.
