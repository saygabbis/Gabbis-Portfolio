import { $$, esc, fmtDate } from '../core/dom';
import { openLightbox, type LightboxItem } from '../core/lightbox';
import { full, ratio, thumb, type Art } from '../data/art';
import { lang, t } from '../i18n';

/** Card de uma arte; abre no lightbox ao clicar. */
export const artTile = (a: Art, i: number, extra = '') => `
  <button class="art-tile ${extra}" data-art="${i}" data-reveal="pop" data-cursor="✦" style="--ratio:${ratio(a.id).toFixed(4)}" aria-label="${esc(a.title)}">
    <img src="${thumb(a.id)}" alt="" loading="lazy" decoding="async" />
    <span class="art-tile-label"><strong>${esc(a.title)}</strong><span>${fmtDate(a.date, lang())}</span></span>
  </button>`;

/** Faz os cards [data-art] dentro de `root` abrirem `list` no lightbox. */
export function bindGallery(root: HTMLElement, list: Art[]) {
  const items: LightboxItem[] = list.map((a) => ({
    type: 'image',
    src: full(a.id),
    preview: thumb(a.id),
    title: a.title,
    meta: `${t().art.filters[a.cat]} · ${fmtDate(a.date, lang())}`,
  }));
  $$('[data-art]', root).forEach((btn) => btn.addEventListener('click', () => openLightbox(items, Number(btn.dataset.art))));
}
