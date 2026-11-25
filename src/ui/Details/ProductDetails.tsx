const specs = [
  { value: '40 mm', label: 'Dynamic drivers' },
  { value: '40 hrs', label: 'Battery life (up to)' },
  { value: 'USB-C', label: 'Charging port' },
  { value: '< 2 hrs', label: 'Full charge (approx.)' },
];

const questions = [
  { q: 'How long does the battery last?', a: 'The Halo H1 is designed for up to 40 hours of playback. Actual battery life varies with volume and usage.' },
  { q: 'How do I charge the headphones?', a: 'Connect the headphones to a compatible USB-C power source. A full charge is estimated at under two hours.' },
  { q: 'Can I choose a different finish?', a: 'Yes. Choose Graphite, Sand or Ice in the finish selector near the end of the story.' },
  { q: 'Are these specifications final?', a: 'Halo H1 is a fictional concept product for this interactive showcase. Specifications are illustrative, not a retail offer.' },
];

export default function ProductDetails() {
  return (
    <section className="product-details" id="details" aria-labelledby="details-title">
      <div className="details-inner">
        <p className="eyebrow">The essentials</p>
        <h2 id="details-title">Thoughtful by design.</h2>
        <div className="spec-grid">
          {specs.map((spec) => (
            <article className="spec-card" key={spec.label}>
              <strong>{spec.value}</strong>
              <span>{spec.label}</span>
            </article>
          ))}
        </div>
        <div className="faq" aria-labelledby="faq-title">
          <h3 id="faq-title">Frequently asked questions</h3>
          {questions.map((item) => (
            <details className="faq-item" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
        <p className="concept-note">Halo H1 is a fictional product concept created for this 3D storytelling demo.</p>
      </div>
    </section>
  );
}
