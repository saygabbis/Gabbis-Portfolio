import { esc } from '../core/dom';

/** Título grande "3D" das páginas, com subtítulo e um selo opcional por cima. */
export const pageHead = (title: string, sub = '', badge = '') => `
  <section class="page-head wrap">
    ${badge}
    <h1 class="title-3d page-title" data-split>${esc(title)}</h1>
    ${sub ? `<p class="page-sub" data-reveal="up">${esc(sub)}</p>` : ''}
  </section>`;

/** Recorte de arte com borda branca de figurinha. */
export const sticker = (src: string, cls = '', depth = 0) =>
  `<img class="sticker ${cls}" src="${src}" alt="" aria-hidden="true"${depth ? ` data-depth="${depth}"` : ''} />`;
