export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)];

const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
/** Escapa texto pra entrar em HTML. */
export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ESC[c]);

/** Junta listas de strings de template. */
export const each = <T>(items: readonly T[], fn: (item: T, i: number) => string) => items.map(fn).join('');

/** Formata AAAA-MM-DD no jeito do idioma. */
export const fmtDate = (iso: string, lang: 'pt' | 'en') =>
  new Date(`${iso}T12:00:00`).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' });

export const isTouch = () => matchMedia('(hover: none), (pointer: coarse)').matches;
export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
