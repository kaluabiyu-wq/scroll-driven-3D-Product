import { useEffect, useState } from 'react';
import { chapters } from '../../config/chapters';
import { useActiveChapter } from '../../core/scroll/useActiveChapter';

/** Optional keyboard shortcuts for moving between story chapters. */
export default function KeyboardNavigation() {
  const { index } = useActiveChapter();
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;

      const target = event.target;
      if (target instanceof HTMLElement && (
        target.isContentEditable ||
        target.closest('input, textarea, select, button, [role="textbox"]')
      )) return;

      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = Math.min(chapters.length - 1, Math.max(0, index + direction));
      if (nextIndex === index) return;

      event.preventDefault();
      document.getElementById(chapters[nextIndex].id)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
      setAnnouncement(`Chapter ${nextIndex + 1} of ${chapters.length}: ${chapters[nextIndex].title}`);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [index]);

  return (
    <>
      <p className="sr-only">Keyboard shortcut: Alt plus Left Arrow for the previous chapter; Alt plus Right Arrow for the next chapter.</p>
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
    </>
  );
}
