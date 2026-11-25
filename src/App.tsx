import { useState } from 'react';
import { getRenderMode } from './core/device/detect';
import { useSmoothScroll } from './core/scroll/useSmoothScroll';
import SceneCanvas from './canvas/SceneCanvas';
import Story from './ui/Story';
import Header from './ui/Header';
import Loader from './ui/Loader';
import ProgressRail from './ui/ProgressRail';
import ScrollHint from './ui/ScrollHint';
import StaticStory from './fallback/StaticStory';

function FullExperience() {
  useSmoothScroll();

  return (
    <>
      <SceneCanvas />
      <Header />
      <Story />
      <ProgressRail />
      <ScrollHint />
      <Loader />
    </>
  );
}

export default function App() {
  const [mode] = useState(getRenderMode);
  return mode === 'full' ? <FullExperience /> : <StaticStory />;
}
