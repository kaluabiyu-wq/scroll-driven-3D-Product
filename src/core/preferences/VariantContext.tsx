import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { PRODUCT_VARIANTS } from '../../config/variants';
import type { ProductVariant } from '../../config/variants';

type VariantContextValue = {
  variant: ProductVariant;
  setVariant: (id: string) => void;
};

const VariantContext = createContext<VariantContextValue | null>(null);

export function VariantProvider({ children }: { children: ReactNode }) {
  const [variantId, setVariantId] = useState(() => {
    if (typeof window === 'undefined') return PRODUCT_VARIANTS[0].id;
    try {
      const saved = window.localStorage.getItem('halo-product-finish');
      return PRODUCT_VARIANTS.some((item) => item.id === saved) ? saved! : PRODUCT_VARIANTS[0].id;
    } catch {
      return PRODUCT_VARIANTS[0].id;
    }
  });
  useEffect(() => {
    try { window.localStorage.setItem('halo-product-finish', variantId); } catch { /* Storage may be disabled. */ }
  }, [variantId]);
  const variant = PRODUCT_VARIANTS.find((item) => item.id === variantId) ?? PRODUCT_VARIANTS[0];
  const value = useMemo(() => ({ variant, setVariant: setVariantId }), [variant]);
  return <VariantContext.Provider value={value}>{children}</VariantContext.Provider>;
}

export function useProductVariant() {
  const value = useContext(VariantContext);
  if (!value) throw new Error('useProductVariant must be used inside VariantProvider');
  return value;
}
