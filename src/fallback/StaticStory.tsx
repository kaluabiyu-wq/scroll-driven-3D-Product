import { chapters } from '../config/chapters';
import ColorSwitcher from '../ui/ColorSwitcher/ColorSwitcher';
import ProductDetails from '../ui/Details/ProductDetails';
import ShareControls from '../ui/ShareControls';
import BackToTop from '../ui/BackToTop';

/**
 * Shown when WebGL is unavailable or the visitor prefers reduced motion.
 * Same copy as the 3D story, no canvas and no scroll-linked motion.
 */
export default function StaticStory() {
  return (
    <main className="static-story">
      <ColorSwitcher always />
      <ShareControls />
      <BackToTop />
      <div className="static-orb" aria-hidden="true" />
      {chapters.map((c) => (
        <section key={c.id} id={c.id} className="static-chapter">
          {c.id === 'intro' ? <h1>{c.title}</h1> : <h2>{c.title}</h2>}
          <p>{c.text}</p>
          {c.cta && (
            <a className="cta" href="#details">
              {c.cta}
            </a>
          )}
        </section>
      ))}
      <ProductDetails />
    </main>
  );
}
