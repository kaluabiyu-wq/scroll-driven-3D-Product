import { useEffect } from 'react';
import { chapters } from '../config/chapters';
import { useActiveChapter } from '../core/scroll/useActiveChapter';

/** Right-edge chapter markers. They link to each chapter and show where you are. */
export default function ProgressRail() {
  const { index } = useActiveChapter();

  useEffect(() => {
    const nextHash = `#${chapters[index].id}`;
    if (window.location.hash !== nextHash) {
      // Preserve query parameters and any router-owned history state while syncing the chapter hash.
      const url = new URL(window.location.href);
      url.hash = nextHash;
      window.history.replaceState(window.history.state, '', url);
    }
  }, [index]);

  return (
    <nav className="rail" aria-label="Story chapters">
      <ul>
        {chapters.map((c, i) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              className={i === index ? 'is-active' : undefined}
              aria-current={i === index ? 'true' : undefined}
              aria-label={c.title}
              title={c.title}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
