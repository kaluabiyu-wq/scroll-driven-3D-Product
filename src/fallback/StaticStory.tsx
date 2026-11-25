import { chapters } from '../config/chapters';

/**
 * Shown when WebGL is unavailable or the visitor prefers reduced motion.
 * Same copy as the 3D story, no canvas and no scroll-linked motion.
 */
export default function StaticStory() {
  return (
    <main className="static-story">
      <div className="static-orb" aria-hidden="true" />
      {chapters.map((c) => (
        <section key={c.id} id={c.id} className="static-chapter">
          {c.id === 'intro' ? <h1>{c.title}</h1> : <h2>{c.title}</h2>}
          <p>{c.text}</p>
          {c.cta && (
            <a className="cta" href="#intro">
              {c.cta}
            </a>
          )}
        </section>
      ))}
    </main>
  );
}
