import { gsap } from 'gsap';
import { doodle, symbol } from '../components/doodles';
import { bindGallery } from '../components/gallery';
import { icon } from '../components/icons';
import { marquee } from '../components/marquee';
import { mascot } from '../components/mascot';
import { $, $$, each, esc, isTouch, reducedMotion } from '../core/dom';
import { popLetters } from '../core/motion';
import type { Page } from '../core/router';
import { art, full, thumb } from '../data/art';
import { posterSrc, videos, videoSrc } from '../data/motion';
import { projects } from '../data/projects';
import { COMMISSIONS_OPEN } from '../data/shop';
import { t } from '../i18n';

const HERO = art.find((a) => a.id === '001')!;
const featured = art.filter((a) => a.featured);

// posição de cada impressão no mural (grade de 12 colunas): [coluna, largura, inclinação, velocidade do parallax]
const MURAL: [number, number, number, number][] = [
  [1, 5, -2, 0.04],
  [6, 4, 1.5, -0.06],
  [10, 3, -1, 0.08],
  [2, 3, 2, -0.04],
  [5, 4, -1.5, 0.06],
  [9, 4, 1, -0.03],
  [1, 4, 1.2, 0.05],
  [6, 5, -0.8, -0.05],
];

export const home: Page = {
  title: () => t().meta.home,
  render: () => {
    const h = t().home;
    const n = t().nav;
    const rows = [
      { path: '/art', label: n.art, meta: `${art.length} ${h.pieces}`, img: thumb('6') },
      { path: '/motion', label: n.motion, meta: `${videos.length} ${h.videos}`, img: posterSrc('celeste') },
      { path: '/code', label: n.code, meta: `${projects.length} ${h.projects}`, img: thumb('centro1') },
      { path: '/commissions', label: n.shop, meta: COMMISSIONS_OPEN ? h.open : h.closed, img: thumb('class3') },
      { path: '/about', label: n.about, meta: h.me, img: thumb('fanart') },
    ];
    return `
    <section class="hero wrap">
      <div class="hero-copy">
        <p class="hero-hello hand">${esc(h.hello)}</p>
        <h1 class="hero-name"><span data-split>Gabbis</span>${doodle('underline', 'hero-underline', 'var(--crimson)')}</h1>
        <p class="hero-tag">${esc(h.tagline)}</p>
        <p class="hero-intro">${esc(h.intro)}</p>
        <div class="hero-ctas">
          <a class="btn btn-crimson" href="/art" data-magnetic>${esc(h.ctaArt)} ${icon('arrow')}</a>
          <a class="btn btn-paper" href="/commissions" data-magnetic>${esc(h.ctaShop)}</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-note hand" aria-hidden="true">${esc(h.madeBy)}${doodle('arrow', 'hero-arrow')}</div>
        <figure class="hero-print print" style="--r:1.5deg">
          <span class="tape tape-sky tape-tl" aria-hidden="true"></span>
          <span class="tape tape-crimson tape-tr" aria-hidden="true"></span>
          <div class="hero-img"><img src="${full(HERO.id)}" alt="${esc(HERO.title)}" fetchpriority="high" /></div>
          <figcaption class="hand">${esc(HERO.title)}, 2024</figcaption>
        </figure>
        <div class="hero-mascot">${mascot()}</div>
      </div>
    </section>

    ${marquee(h.marquee, 'tape-band')}

    <section class="section wrap index">
      <div class="section-head" data-reveal="up">
        <h2 class="section-title">${esc(h.indexTitle)}</h2>
        <span class="hand section-note">${esc(h.indexNote)}</span>
      </div>
      <ol class="index-list" data-stagger>
        ${each(
          rows,
          (r, i) => `
          <li data-reveal="up">
            <a class="index-row" href="${r.path}" data-preview="${r.img}">
              ${symbol(((i % 5) + 1) as 1 | 2 | 3 | 4 | 5, 'index-sym')}
              <span class="index-num">0${i + 1}</span>
              <span class="index-label">${esc(r.label)}</span>
              <span class="index-dots" aria-hidden="true"></span>
              <span class="index-meta hand">${esc(r.meta)}</span>
              <span class="index-arrow">${icon('arrow')}</span>
            </a>
          </li>`,
        )}
      </ol>
      <div class="index-peek print" aria-hidden="true"><img alt="" /></div>
    </section>

    <section class="section wrap mural-sec">
      <div class="section-head" data-reveal="up">
        <h2 class="section-title">${esc(h.muralTitle)}</h2>
        <span class="hand section-note">${esc(h.muralNote)} ${doodle('arrowLeft', 'note-arrow', 'currentColor')}</span>
      </div>
      <div class="mural">
        ${each(featured, (a, i) => {
          const [col, span, r, speed] = MURAL[i % MURAL.length];
          return `
          <div class="mural-slot" style="grid-column:${col} / span ${span}">
            <button class="print mural-print" data-art="${i}" data-reveal="pop" data-speed="${speed}" style="--r:${r}deg" aria-label="${esc(a.title)}">
              <span class="tape ${['tape-sky', 'tape-crimson', 'tape-orchid'][i % 3]}" aria-hidden="true"></span>
              <img src="${thumb(a.id)}" alt="" loading="lazy" decoding="async" />
              <span class="art-cap hand">${esc(a.title)}</span>
            </button>
          </div>`;
        })}
      </div>
      <div class="center" data-reveal="up"><a class="btn btn-paper" href="/art" data-magnetic>${esc(h.seeAll)} ${icon('arrow')}</a></div>
    </section>

    <section class="section wrap moves">
      <div class="moves-text" data-reveal="left">
        <h2 class="section-title">${esc(h.motionTitle)}${doodle('shine', 'moves-shine', 'var(--orchid)')}</h2>
        <p>${esc(h.motionText)}</p>
        <a class="btn btn-crimson" href="/motion" data-magnetic>${esc(h.motionCta)} ${icon('play')}</a>
      </div>
      <div class="moves-video print" data-reveal="right" style="--r:2deg">
        <span class="tape tape-orchid" aria-hidden="true"></span>
        <video src="${videoSrc('celeste')}" poster="${posterSrc('celeste')}" muted loop playsinline autoplay preload="metadata"></video>
      </div>
    </section>`;
  },
  mount: (root) => {
    bindGallery(root, featured);
    popLetters(root, 0.35);

    // índice: a arte de cada seção aparece seguindo o mouse
    const peek = $('.index-peek', root)!;
    const peekImg = peek.querySelector('img')!;
    const offs: (() => void)[] = [];
    if (!isTouch() && !reducedMotion()) {
      const px = gsap.quickTo(peek, 'x', { duration: 0.5, ease: 'power3' });
      const py = gsap.quickTo(peek, 'y', { duration: 0.5, ease: 'power3' });
      const list = $('.index-list', root)!;
      const move = (e: PointerEvent) => {
        const r = (root.querySelector('.index') as HTMLElement).getBoundingClientRect();
        px(e.clientX - r.left + 24);
        py(e.clientY - r.top - 90);
      };
      $$('.index-row', root).forEach((row) =>
        row.addEventListener('pointerenter', () => {
          peekImg.src = row.dataset.preview!;
          gsap.to(peek, { opacity: 1, scale: 1, rotate: gsap.utils.random(-6, 6), duration: 0.35, ease: 'back.out(2)' });
        }),
      );
      list.addEventListener('pointermove', move);
      list.addEventListener('pointerleave', () => gsap.to(peek, { opacity: 0, scale: 0.7, duration: 0.25 }));
    }

    if (reducedMotion()) return;

    // entrada: o texto sobe, a impressão cai na página e a Gabbi pula na frente
    const intro = gsap.timeline({ defaults: { ease: 'back.out(1.6)' } });
    intro
      .from('.hero-copy > *', { y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'expo.out' }, 0)
      .from('.hero-print', { y: 60, rotate: 8, opacity: 0, duration: 0.9 }, 0.15)
      .from('.hero-print .tape', { scaleX: 0, opacity: 0, duration: 0.4, stagger: 0.1 }, 0.7)
      .from('.hero-mascot', { y: 140, rotate: -15, opacity: 0, duration: 0.9 }, 0.6)
      .from('.hero-note', { scale: 0, rotate: -20, duration: 0.5 }, 1.1);

    // a ilustração se move um pouco dentro da moldura seguindo o mouse
    const img = $('.hero-img img', root)!;
    const ix = gsap.quickTo(img, 'xPercent', { duration: 1.2, ease: 'power3' });
    const iy = gsap.quickTo(img, 'yPercent', { duration: 1.2, ease: 'power3' });
    const heroMove = (e: PointerEvent) => {
      ix((e.clientX / innerWidth - 0.5) * -3);
      iy((e.clientY / innerHeight - 0.5) * -3);
    };
    if (!isTouch()) addEventListener('pointermove', heroMove);
    offs.push(() => removeEventListener('pointermove', heroMove));

    return () => {
      intro.kill();
      offs.forEach((f) => f());
    };
  },
};
