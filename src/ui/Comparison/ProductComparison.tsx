import { useMemo, useState } from 'react';
import { PRODUCT_VARIANTS } from '../../config/variants';
import { useProductVariant } from '../../core/preferences/VariantContext';

export default function ProductComparison() {
  const { variant: selectedVariant } = useProductVariant();
  const [comparisonId, setComparisonId] = useState(() =>
    PRODUCT_VARIANTS.find((item) => item.id !== PRODUCT_VARIANTS[0].id)?.id ?? PRODUCT_VARIANTS[0].id,
  );

  const alternatives = useMemo(
    () => PRODUCT_VARIANTS.filter((item) => item.id !== selectedVariant.id),
    [selectedVariant.id],
  );
  const comparison = alternatives.find((item) => item.id === comparisonId) ?? alternatives[0] ?? selectedVariant;

  const finishes = [
    { label: 'Shell', color: (item: typeof selectedVariant) => item.shell },
    { label: 'Accent', color: (item: typeof selectedVariant) => item.accent },
    { label: 'Cushion', color: (item: typeof selectedVariant) => item.foam },
  ];

  return (
    <section className="finish-comparison" aria-labelledby="comparison-title">
      <div className="comparison-heading">
        <p className="eyebrow">Find your finish</p>
        <h3 id="comparison-title">Compare the colours.</h3>
        <p>Compare the finish currently selected for the 3D product with another Halo H1 colourway.</p>
      </div>
      <label className="comparison-select-label" htmlFor="comparison-finish">Compare against</label>
      <select
        id="comparison-finish"
        value={comparison.id}
        onChange={(event) => setComparisonId(event.target.value)}
      >
        {alternatives.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
      </select>
      <div className="comparison-grid" aria-live="polite">
        {[selectedVariant, comparison].map((item, index) => (
          <article className="comparison-card" key={`${index}-${item.id}`}>
            <div className="comparison-card-top">
              <span>{index === 0 ? 'Selected finish' : 'Alternative finish'}</span>
              <strong>{item.name}</strong>
            </div>
            <div className="finish-swatches">
              {finishes.map((finish) => (
                <div className="finish-swatch" key={finish.label}>
                  <span className="swatch" style={{ backgroundColor: finish.color(item) }} aria-hidden="true" />
                  <span>{finish.label}</span>
                  <code>{finish.color(item).toUpperCase()}</code>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className="comparison-note">Changing the main finish selector updates the selected finish in this comparison and on the 3D model.</p>
    </section>
  );
}
