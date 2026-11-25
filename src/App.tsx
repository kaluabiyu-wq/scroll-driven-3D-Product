import { useEffect, useState } from 'react';
import { getRenderMode } from './core/device/detect';
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

function FullExperience() {
  useSmoothScroll();

  return (
    <>
      <SceneCanvas />
      <Header />
      <ShareControls />
      <Story />
      <ProductDetails />
      <ProgressRail />
      <ScrollHint />
      <ColorSwitcher />
      <BackToTop />
      <Loader />
    </>
  );
}

export default function App() {
  const [mode, setMode] = useState(getRenderMode);

  useEffect(() => {
    const fallback = () => setMode('static');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => { if (motion.matches) fallback(); };
    window.addEventListener('halo:webgl-lost', fallback);
    motion.addEventListener('change', onMotionChange);
    return () => {
      window.removeEventListener('halo:webgl-lost', fallback);
      motion.removeEventListener('change', onMotionChange);
    };
  }, []);
  return (
    <VariantProvider>
      {mode === 'full' ? <FullExperience /> : <StaticStory />}
    </VariantProvider>
  );
}
