import { PRODUCT_VARIANTS } from '../../config/variants';
import { chapters } from '../../config/chapters';
import { useActiveChapter } from '../../core/scroll/useActiveChapter';
import { useProductVariant } from '../../core/preferences/VariantContext';

export default function ColorSwitcher({ always = false }: { always?: boolean }) {
  const { variant, setVariant } = useProductVariant();
  const { index } = useActiveChapter();
  if (!always && index !== chapters.length - 1) return null;
  return (
    <fieldset className="color-switcher" aria-label="Choose headphone colour">
      <legend>Choose your finish</legend>
      <div className="color-options">
        {PRODUCT_VARIANTS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`color-option${variant.id === item.id ? ' is-selected' : ''}`}
            onClick={() => setVariant(item.id)}
            aria-pressed={variant.id === item.id}
            aria-label={`${item.name} finish`}
            title={item.name}
          >
            <span style={{ background: item.shell }} />
            <small>{item.name}</small>
          </button>
        ))}
      </div>
    </fieldset>
  );
}
