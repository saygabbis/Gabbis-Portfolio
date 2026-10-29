import { icon } from '../components/icons';
import { mascot } from '../components/mascot';
import { esc } from '../core/dom';
import { popLetters } from '../core/motion';
import type { Page } from '../core/router';
import { t } from '../i18n';

export const notFound: Page = {
  title: () => t().meta.notFound,
  render: () => {
    const n = t().notFound;
    return `
    <section class="page-head wrap nf">
      <div class="nf-mascot">${mascot()}</div>
      <h1 class="title-3d page-title nf-code" data-split>404</h1>
      <h2 data-reveal="up">${esc(n.title)}</h2>
      <p class="page-sub" data-reveal="up">${esc(n.text)}</p>
      <a class="pill pill-light" href="/" data-reveal="pop" data-magnetic>${icon('left')} ${esc(n.back)}</a>
    </section>`;
  },
  mount: (root) => popLetters(root),
};
