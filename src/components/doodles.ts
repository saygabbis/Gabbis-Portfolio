// Rabiscos de caneta em SVG. Com [data-draw], eles "se desenham" quando entram na tela (ver core/motion.ts).
const paths = {
  // sublinhado de marcador, com volta no fim
  underline: { vb: '0 0 300 30', d: 'M4 18c40-6 92-11 150-10 52 1 98 4 140 0-38 2-90 9-150 12' },
  // círculo torto que não fecha direito
  circle: { vb: '0 0 220 100', d: 'M120 8C62 4 12 22 10 52c-2 30 50 44 104 42 56-2 98-18 98-44 0-24-42-40-96-42-26 0-50 4-68 12' },
  // seta curva
  arrow: { vb: '0 0 120 90', d: 'M8 12c30 4 60 18 76 44 6 10 9 18 10 26M78 66l16 18 12-24' },
  arrowLeft: { vb: '0 0 120 90', d: 'M112 12c-30 4-60 18-76 44-6 10-9 18-10 26M42 66 26 84 14 60' },
  // estrelinha rabiscada
  star: { vb: '0 0 60 60', d: 'M30 4l7 18 19 1-15 12 6 19-17-11-17 11 6-19L4 23l19-1z' },
  // espiral
  spiral: { vb: '0 0 80 80', d: 'M40 40c4-2 6 4 2 7-6 4-13-2-11-9 3-10 17-11 23-3 8 10 1 25-12 27-16 3-28-11-25-27 3-20 25-30 42-20' },
  // risquinhos de "brilho"
  shine: { vb: '0 0 60 40', d: 'M8 30 18 16M26 26l4-20M40 30l12-12' },
};

export type DoodleName = keyof typeof paths;

/** `color` é uma cor CSS (ex.: var(--crimson)). `draw` liga a animação de desenhar. */
export const doodle = (name: DoodleName, cls = '', color = 'currentColor', draw = true) => {
  const p = paths[name];
  // sublinhado e círculo esticam pra caber no texto; o resto mantém a proporção
  const stretch = name === 'underline' || name === 'circle' ? ' preserveAspectRatio="none"' : '';
  return `<svg class="doodle doodle-${name} ${cls}" viewBox="${p.vb}"${stretch} aria-hidden="true" fill="none"${draw ? ' data-draw' : ''}><path d="${p.d}" stroke="${color}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" pathLength="1"/></svg>`;
};

/** Símbolos desenhados pela Gabbis pro jogo Missão Verde, usados como marcadores. */
export const symbol = (n: 1 | 2 | 3 | 4 | 5, cls = '') => `<img class="sym ${cls}" src="/media/doodles/sym-${n}.webp" alt="" aria-hidden="true" width="40" height="40" />`;
