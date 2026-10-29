// Figurinhas em SVG com o contorno grosso do traço da Gabbis.
// Cada uma usa `currentColor` como preenchimento e a cor --line como contorno.
const shapes = {
  star: '<path d="M50 6l12.6 27.4 29.9 3.3-22.3 20.2 6.2 29.5L50 71.3 23.6 86.4l6.2-29.5L7.5 36.7l29.9-3.3z"/>',
  heart: '<path d="M50 88S10 63 10 35a20 20 0 0 1 40-6 20 20 0 0 1 40 6c0 28-40 53-40 53z"/>',
  sparkle: '<path d="M50 4c4 28 18 42 46 46-28 4-42 18-46 46-4-28-18-42-46-46 28-4 42-18 46-46z"/>',
  flower:
    '<path d="M50 30a14 14 0 1 1 18 13 14 14 0 1 1-6 21 14 14 0 1 1-24 0 14 14 0 1 1-6-21 14 14 0 1 1 18-13z"/><circle cx="50" cy="50" r="10" fill="var(--paper)"/>',
  blob: '<path d="M78 22c14 13 16 38 4 55S43 96 26 86 2 52 10 33 32 6 48 6s16 3 30 16z"/>',
  play: '<rect x="8" y="16" width="84" height="68" rx="18"/><path d="M42 36v28l24-14z" fill="var(--paper)"/>',
  code: '<rect x="6" y="18" width="88" height="64" rx="16"/><path d="M38 38L26 50l12 12M62 38l12 12-12 12" fill="none" stroke="var(--paper)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>',
  pencil:
    '<path d="M70 8l22 22-52 52-28 6 6-28z"/><path d="M60 18l22 22" fill="none"/><path d="M18 68l14 14" fill="none"/>',
};

export type StickerName = keyof typeof shapes;

export const sticker = (name: StickerName, cls = '', style = '') =>
  `<svg class="sticker ${cls}" style="${style}" viewBox="0 0 100 100" aria-hidden="true"><g stroke="var(--line)" stroke-width="5" stroke-linejoin="round" fill="currentColor">${shapes[name]}</g></svg>`;
