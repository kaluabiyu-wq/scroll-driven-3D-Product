export type Chapter = {
  id: string;
  title: string;
  text: string;
  align: 'left' | 'right';
  start: number;
  end: number;
  cta?: string;
};

/**
 * One entry per story section. start/end are fractions of the total scroll
 * distance and match the seven chapter ranges in the product-story roadmap.
 */
export const chapters: Chapter[] = [
  {
    id: 'intro',
    start: 0.00,
    end: 0.10,
    title: 'Halo H1',
    text: 'Wireless headphones that get out of the way of the music.',
    align: 'left',
  },
  {
    id: 'design',
    start: 0.10,
    end: 0.28,
    title: 'Built around the head',
    text: 'A slim steel headband and a floating yoke let the cups settle on any head shape.',
    align: 'right',
  },
  {
    id: 'sound',
    start: 0.28,
    end: 0.48,
    title: '40 mm drivers',
    text: 'Large dynamic drivers keep the low end full and the high end calm, even at low volume.',
    align: 'left',
  },
  {
    id: 'explode',
    start: 0.48,
    end: 0.68,
    title: 'Every part earns its place',
    text: 'Cushion, driver, shell and yoke. Four layers on each side, nothing decorative.',
    align: 'right',
  },
  {
    id: 'comfort',
    start: 0.68,
    end: 0.82,
    title: 'Soft where it touches',
    text: 'Memory-foam cushions wrapped in breathable fabric. Wear them from the first song to the last.',
    align: 'left',
  },
  {
    id: 'features',
    start: 0.82,
    end: 0.92,
    title: 'Made for the long way home',
    text: 'Up to 40 hours of playback, USB-C charging and simple controls keep the essentials close.',
    align: 'left',
  },
  {
    id: 'buy',
    start: 0.92,
    end: 1.00,
    title: 'Your sound. Your finish.',
    text: 'Forty hours of playback and a full charge in under two hours over USB-C.',
    align: 'right',
    cta: 'Join the waiting list',
  },
];
