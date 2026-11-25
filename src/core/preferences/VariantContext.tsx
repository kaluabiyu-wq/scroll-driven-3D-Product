import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { PRODUCT_VARIANTS } from '../../config/variants';
import type { ProductVariant } from '../../config/variants';

type VariantContextValue = {
  variant: ProductVariant;
  setVariant: (id: string) => void;
};

const VariantContext = createContext<VariantContextValue | null>(null);

export function VariantProvider({ children }: { children: ReactNode }) {
  const [variantId, setVariantId] = useState(PRODUCT_VARIANTS[0].id);
  const variant = PRODUCT_VARIANTS.find((item) => item.id === variantId) ?? PRODUCT_VARIANTS[0];
  const value = useMemo(() => ({ variant, setVariant: setVariantId }), [variant]);
  return <VariantContext.Provider value={value}>{children}</VariantContext.Provider>;
}

export function useProductVariant() {
  const value = useContext(VariantContext);
  if (!value) throw new Error('useProductVariant must be used inside VariantProvider');
  return value;
}
