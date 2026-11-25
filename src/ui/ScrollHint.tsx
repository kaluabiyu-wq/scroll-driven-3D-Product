import { useActiveChapter } from '../core/scroll/useActiveChapter';

/** Tells first-time visitors to scroll. Disappears once they do. */
export default function ScrollHint() {
  const { started } = useActiveChapter();
  return (
    <div className={`scroll-hint${started ? ' scroll-hint--hidden' : ''}`} aria-hidden="true">
      <span>Scroll to explore</span>
      <i />
    </div>
  );
}
