import { useEffect, useState } from 'react';
import { chapters } from '../../config/chapters';
import { scrollState } from './scrollState';

/** Index of the chapter on screen, and whether the visitor has started scrolling. */
export function useActiveChapter() {
  const [state, setState] = useState({ index: 0, started: false });

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const p = scrollState.current;
      const index = Math.min(chapters.length - 1, Math.floor(p * chapters.length));
      const started = p > 0.02;
      setState((s) => (s.index === index && s.started === started ? s : { index, started }));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return state;
}
