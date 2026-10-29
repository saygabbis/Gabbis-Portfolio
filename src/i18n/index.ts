import { en } from './en';
import { pt, type Dict } from './pt';

export type Lang = 'pt' | 'en';
/** Texto que muda com o idioma, usado nos arquivos de dados. */
export type L = Record<Lang, string>;

const dicts: Record<Lang, Dict> = { pt, en };
const listeners = new Set<() => void>();

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'pt' || saved === 'en') return saved;
  } catch {}
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

let current: Lang = initialLang();
document.documentElement.lang = current === 'pt' ? 'pt-BR' : 'en';

export const lang = () => current;
/** Dicionário do idioma atual. */
export const t = () => dicts[current];
/** Escolhe o texto do idioma atual num campo `{ pt, en }`. */
export const tr = (text: L) => text[current];

export function setLang(next: Lang) {
  if (next === current) return;
  current = next;
  document.documentElement.lang = next === 'pt' ? 'pt-BR' : 'en';
  try {
    localStorage.setItem('lang', next);
  } catch {}
  listeners.forEach((fn) => fn());
}

export const onLangChange = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
