import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { chapters } from '../config/chapters';

gsap.registerPlugin(ScrollTrigger);

/**
 * The scrolling content. Total height = one viewport per chapter.
 * Each chapter's text fades in, holds, then fades out as its section passes.
 * The last chapter keeps its text, because the page ends before it can leave.
 */
export default function Story() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.chapter').forEach((section, i) => {
        const text = section.querySelector('.chapter-text');
        const isLast = i === chapters.length - 1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        tl.fromTo(text, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 });
        if (!isLast) {
          tl.to(text, { opacity: 1, duration: 2 }).to(text, { opacity: 0, y: -40, duration: 1 });
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div id="story" ref={root}>
      {chapters.map((c, i) => (
        <section
          key={c.id}
          id={c.id}
          className={`chapter chapter--${c.align}${c.id === 'design' || c.id === 'explode' ? ' chapter--pinned' : ''}`}
          aria-labelledby={`${c.id}-title`}
          style={{ height: `${(c.end - c.start) * 700 + (i === chapters.length - 1 ? 100 : 0)}svh`, minHeight: '0' }}
        >
          <div className="chapter-text">
            {c.id === 'intro' ? (
              <h1 id={`${c.id}-title`}>{c.title}</h1>
            ) : (
              <h2 id={`${c.id}-title`}>{c.title}</h2>
            )}
            <p>{c.text}</p>
            {c.cta && (
              <a className="cta" href="#details">
                {c.cta}
              </a>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
