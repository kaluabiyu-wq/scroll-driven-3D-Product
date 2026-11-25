import { useEffect } from 'react';
import { chapters } from '../config/chapters';
import { useActiveChapter } from '../core/scroll/useActiveChapter';

/** Right-edge chapter markers. They link to each chapter and show where you are. */
export default function ProgressRail() {
  const { index } = useActiveChapter();

  useEffect(() => {
    const nextHash = `#${chapters[index].id}`;
    if (window.location.hash !== nextHash) window.history.replaceState(null, '', nextHash);
  }, [index]);

  return (
    <nav className="rail" aria-label="Chapters">
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
