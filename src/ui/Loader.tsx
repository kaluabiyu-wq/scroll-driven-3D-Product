import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

const MIN_VISIBLE_MS = 900;

/**
 * Full-screen loader driven by real asset progress. With the built-in model
 * there is nothing to download, so it just shows briefly to avoid a flash.
 */
export default function Loader() {
  const { active, progress } = useProgress();
  const [shownAt] = useState(() => performance.now());
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (active) return;
    const wait = Math.max(300, MIN_VISIBLE_MS - (performance.now() - shownAt));
    const id = window.setTimeout(() => setDone(true), wait);
    return () => window.clearTimeout(id);
  }, [active, shownAt]);

  if (gone) return null;

  return (
    <div
      className={`loader${done ? ' loader--done' : ''}`}
      role="status"
      aria-live="polite"
      onTransitionEnd={() => done && setGone(true)}
    >
      <div className="loader-bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${done ? 1 : Math.max(0.06, progress / 100)})` }} />
      </div>
      <p>{done ? 'Ready' : 'Loading the studio'}</p>
    </div>
  );
}
