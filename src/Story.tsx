import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  { title: 'Halo H1', text: 'Sound that stays out of the way.' },
  { title: 'Design', text: 'Shaped around the head, not around a template.' },
  { title: 'Sound', text: 'Large drivers tuned for clear lows and quiet highs.' },
  { title: 'Comfort', text: 'Soft cushions you can wear all day.' },
  { title: 'Ready', text: 'Choose your colour and take it anywhere.' },
];

export default function Story() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.chapter').forEach((section) => {
        const text = section.querySelector('.chapter-text');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
        tl.fromTo(text, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 })
          .to(text, { opacity: 0, y: -40, duration: 1 }, '+=2');
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div id="story" ref={root}>
      {chapters.map((c) => (
        <section className="chapter" key={c.title}>
          <div className="chapter-text">
            <h2>{c.title}</h2>
            <p>{c.text}</p>
          </div>
        </section>
      ))}
    </div>
  );
}