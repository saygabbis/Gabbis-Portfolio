import { $$, esc, fmtDate } from '../core/dom';
import { openLightbox, type LightboxItem } from '../core/lightbox';
import { full, ratio, thumb, type Art } from '../data/art';
import { lang, t } from '../i18n';

// inclinações e fitas variadas pra galeria não parecer uma grade de template
const TILTS = [-1.6, 1.1, -0.6, 1.8, -1.2, 0.5, 1.4, -1.9];
const TAPES = ['tape-sky', 'tape-crimson', 'tape-orchid', '', 'tape-sky tape-corner', 'tape-orchid', '', 'tape-crimson tape-corner'];

/** Impressão de uma arte colada no caderno; abre no lightbox ao clicar. */
export const artTile = (a: Art, i: number) => `
  <button class="art-tile print" data-art="${i}" data-reveal="pop" style="--r:${TILTS[i % TILTS.length]}deg;--ratio:${ratio(a.id).toFixed(4)}" aria-label="${esc(a.title)}">
    ${TAPES[i % TAPES.length] ? `<span class="tape ${TAPES[i % TAPES.length]}" aria-hidden="true"></span>` : ''}
    <span class="art-img"><img src="${thumb(a.id)}" alt="" loading="lazy" decoding="async" /></span>
    <span class="art-cap hand">${esc(a.title)}</span>
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
