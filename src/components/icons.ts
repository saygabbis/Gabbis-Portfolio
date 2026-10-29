const paths = {
  x: '<path d="M4 4l16 16M20 4L4 20" stroke-width="2.6" stroke-linecap="round"/>',
  instagram:
    '<rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke-width="2.2"/><circle cx="12" cy="12" r="4" stroke-width="2.2"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none"/>',
  patreon: '<circle cx="14.5" cy="9.5" r="6" stroke-width="2.2"/><path d="M4 3.5v17" stroke-width="3" stroke-linecap="round"/>',
  github:
    '<path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" stroke-width="2.2" stroke-linejoin="round"/>',
  sun: '<circle cx="12" cy="12" r="4.5" stroke-width="2.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" stroke-width="2.2" stroke-linecap="round"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" stroke-width="2.2" stroke-linejoin="round"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  close: '<path d="M6 6l12 12M18 6L6 18" stroke-width="2.8" stroke-linecap="round"/>',
  left: '<path d="M15 5l-7 7 7 7" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>',
  right: '<path d="M9 5l7 7-7 7" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>',
  play: '<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="3" stroke-width="2.2"/><path d="M4 7l8 6 8-6" stroke-width="2.2" stroke-linejoin="round"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="3" stroke-width="2.2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke-width="2.2"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16" stroke-width="2.6" stroke-linecap="round"/>',
  plus: '<path d="M12 5v14M5 12h14" stroke-width="2.8" stroke-linecap="round"/>',
};

export type IconName = keyof typeof paths;

export const icon = (name: IconName, size = 22) =>
  `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">${paths[name]}</svg>`;
