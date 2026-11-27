import { useEffect, useState } from 'react';
import { hasWebGL } from './core/device/detect';
import { useSmoothScroll } from './core/scroll/useSmoothScroll';
import SceneCanvas from './canvas/SceneCanvas';
import Story from './ui/Story';
import Header from './ui/Header';
import Loader from './ui/Loader';
import ProgressRail from './ui/ProgressRail';
import ScrollHint from './ui/ScrollHint';
import StaticStory from './fallback/StaticStory';
import { VariantProvider } from './core/preferences/VariantContext';
import ColorSwitcher from './ui/ColorSwitcher/ColorSwitcher';
import ProductDetails from './ui/Details/ProductDetails';
import ShareControls from './ui/ShareControls';
import BackToTop from './ui/BackToTop';
import NetworkStatus from './ui/NetworkStatus';
import KeyboardNavigation from './ui/KeyboardNavigation/KeyboardNavigation';

function FullExperience() {
  useSmoothScroll();

  return (
    <>
      <main id="main-content">
        <SceneCanvas />
        <Header />
        <ShareControls />
        <Story />
        <ProductDetails />
        <ProgressRail />
        <ScrollHint />
        <ColorSwitcher />
        <BackToTop />
        <NetworkStatus />
        <KeyboardNavigation />
        <Loader />
      </main>
    </>
  );
}

export default function App() {
  const [webglUnavailable, setWebglUnavailable] = useState(() => !hasWebGL());
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => setReducedMotion(motion.matches);
    const onWebglLost = () => setWebglUnavailable(true);
    window.addEventListener('halo:webgl-lost', onWebglLost);
    motion.addEventListener('change', onMotionChange);
    return () => {
      window.removeEventListener('halo:webgl-lost', onWebglLost);
      motion.removeEventListener('change', onMotionChange);
    };
  }, []);

  const mode = webglUnavailable || reducedMotion ? 'static' : 'full';
  return (
    <VariantProvider>
      {mode === 'full' ? <FullExperience /> : <div id="main-content"><StaticStory /></div>}
    </VariantProvider>
  );
}

