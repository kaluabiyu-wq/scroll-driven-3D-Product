export type Chapter = {
  id: string;
  title: string;
  text: string;
  align: 'left' | 'right';
  cta?: string;
};

/**
 * One entry per full-screen section. Chapter i covers the scroll range
 * [i / n, (i + 1) / n]. Edit the copy here; no component changes needed.
 */
export const chapters: Chapter[] = [
  {
    id: 'intro',
    title: 'Halo H1',
    text: 'Wireless headphones that get out of the way of the music.',
    align: 'left',
  },
  {
    id: 'design',
    title: 'Built around the head',
    text: 'A slim steel headband and a floating yoke let the cups settle on any head shape.',
    align: 'right',
  },
  {
    id: 'sound',
    title: '40 mm drivers',
    text: 'Large dynamic drivers keep the low end full and the high end calm, even at low volume.',
    align: 'left',
  },
  {
    id: 'explode',
    title: 'Every part earns its place',
    text: 'Cushion, driver, shell and yoke. Four layers on each side, nothing decorative.',
    align: 'right',
  },
  {
    id: 'comfort',
    title: 'Soft where it touches',
    text: 'Memory-foam cushions wrapped in breathable fabric. Wear them from the first song to the last.',
    align: 'left',
  },
  {
    id: 'outro',
    title: '40 hours. One cable.',
    text: 'Forty hours of playback and a full charge in under two hours over USB-C.',
    align: 'right',
    cta: 'Join the waiting list',
  },
];
