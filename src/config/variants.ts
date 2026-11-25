export type ProductVariant = {
  id: string;
  name: string;
  shell: string;
  accent: string;
  foam: string;
};

export const PRODUCT_VARIANTS: ProductVariant[] = [
  { id: 'graphite', name: 'Graphite', shell: '#262a33', accent: '#7fe3d1', foam: '#2f333d' },
  { id: 'sand', name: 'Sand', shell: '#b7a58e', accent: '#f0d2a0', foam: '#76695c' },
  { id: 'ice', name: 'Ice', shell: '#b9c8d5', accent: '#8ed8f0', foam: '#526575' },
];
