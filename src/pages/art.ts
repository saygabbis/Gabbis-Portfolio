import { gsap } from 'gsap';
import { artTile, bindGallery } from '../components/gallery';
import { $, $$, each, esc, reducedMotion } from '../core/dom';
import { popLetters, reveal } from '../core/motion';
import type { Page } from '../core/router';
import { art, categories, type ArtCategory } from '../data/art';
import { t } from '../i18n';

type Filter = ArtCategory | 'all';

const listFor = (f: Filter) => (f === 'all' ? art : art.filter((a) => a.cat === f));
const currentFilter = (): Filter => {
  const q = new URLSearchParams(location.search).get('cat') as Filter | null;
  return q && (q === 'all' || categories.includes(q)) ? q : 'all';
};

function gridHtml(f: Filter) {
  const a = t().art;
  const note = f !== 'all' && f in a.projectNotes ? a.projectNotes[f as keyof typeof a.projectNotes] : '';
  const list = listFor(f);
  return `
    ${note ? `<p class="project-note" data-reveal="up"><b>✦</b> ${esc(note)}</p>` : ''}
    <p class="count hand">${a.count(list.length)}</p>
    <div class="masonry" data-stagger>${each(list, (item, i) => artTile(item, i))}</div>`;
}

export const artPage: Page = {
  title: () => t().meta.art,
  render: () => {
    const a = t().art;
    const f = currentFilter();
    return `
    <section class="page-head wrap">
      <h1 class="page-title" data-split>${esc(a.title)}</h1>
      <p class="page-sub" data-reveal="up">${esc(a.sub)}</p>
    </section>
    <section class="wrap">
      <div class="filters" role="tablist" data-reveal="up">
        <span class="filter-blob" aria-hidden="true"></span>
        ${each(['all', ...categories] as Filter[], (c) => `<button class="filter" role="tab" data-filter="${c}" aria-selected="${c === f}">${esc(a.filters[c])}</button>`)}
      </div>
      <div class="art-grid">${gridHtml(f)}</div>
    </section>`;
  },
  mount: (root) => {
    popLetters(root);
    const grid = $('.art-grid', root)!;
    const blob = $('.filter-blob', root)!;
    let filter = currentFilter();
    let stopReveal = () => {};

    const moveBlob = (instant = false) => {
      const btn = $(`[data-filter="${filter}"]`, root)!;
      const vars = { x: btn.offsetLeft, y: btn.offsetTop, width: btn.offsetWidth, height: btn.offsetHeight };
      if (instant || reducedMotion()) gsap.set(blob, vars);
      else gsap.to(blob, { ...vars, duration: 0.55, ease: 'back.out(1.7)' });
    };
    // a primeira grade já foi animada pelo enhance() da página; só as trocas de filtro precisam de reveal próprio
    const bind = (withReveal = true) => {
      bindGallery(grid, listFor(filter));
      if (!withReveal) return;
      stopReveal();
      stopReveal = reveal(grid);
    };

    requestAnimationFrame(() => moveBlob(true));
    bind(false);
    const onResize = () => moveBlob(true);
    addEventListener('resize', onResize);

    $$('[data-filter]', root).forEach((btn) =>
      btn.addEventListener('click', () => {
        const next = btn.dataset.filter as Filter;
        if (next === filter) return;
        filter = next;
        $$('[data-filter]', root).forEach((b) => b.setAttribute('aria-selected', String(b === btn)));
        moveBlob();
        history.replaceState({}, '', next === 'all' ? '/art' : `/art?cat=${next}`);
        const swap = () => {
          grid.innerHTML = gridHtml(filter);
          bind();
        };
        if (reducedMotion()) return swap();
        gsap.to($$('.art-tile', grid), {
          scale: 0.7,
          opacity: 0,
          rotate: () => gsap.utils.random(-8, 8),
          duration: 0.25,
          stagger: 0.01,
          ease: 'power2.in',
          onComplete: swap,
        });
      }),
    );

    return () => {
      stopReveal();
      removeEventListener('resize', onResize);
    };
  },
};
