import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollState } from './scrollState';

gsap.registerPlugin(ScrollTrigger);

/** Lenis smooth scrolling + ScrollTrigger writing page progress into scrollState. */
export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const trigger = ScrollTrigger.create({
      trigger: '#story',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollState.target = self.progress;
      },
    });

    // pages that load already scrolled (refresh) start in the right place
    scrollState.target = trigger.progress;
    scrollState.current = trigger.progress;

    // Mobile browser chrome and orientation changes alter the viewport height.
    // Refresh ScrollTrigger once after the resize settles, never from the frame loop.
    let refreshFrame = 0;
    const refreshAfterResize = () => {
      window.cancelAnimationFrame(refreshFrame);
      refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    window.addEventListener('resize', refreshAfterResize, { passive: true });
    window.addEventListener('orientationchange', refreshAfterResize, { passive: true });

    return () => {
      window.removeEventListener('resize', refreshAfterResize);
      window.removeEventListener('orientationchange', refreshAfterResize);
      window.cancelAnimationFrame(refreshFrame);
      trigger.kill();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [enabled]);
}
