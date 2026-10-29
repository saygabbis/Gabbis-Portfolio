import { each, esc } from '../core/dom';

/** Faixa inclinada com palavras rolando sem parar. */
export const marquee = (words: string[], cls = '') => {
  const row = each(words, (w) => `<span>${esc(w)}</span><b aria-hidden="true">✦</b>`);
  return `
  <div class="marquee ${cls}" aria-label="${esc(words.join(', '))}">
    <div class="marquee-track" aria-hidden="true">${row}${row}</div>
  </div>`;
};
