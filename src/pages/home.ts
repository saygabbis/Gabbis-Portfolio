import { gsap } from 'gsap';
import { bindGallery } from '../components/gallery';
import { icon } from '../components/icons';
import { marquee } from '../components/marquee';
import { sticker, type StickerName } from '../components/stickers';
import { $, $$, each, esc, isTouch, reducedMotion } from '../core/dom';
import { popLetters } from '../core/motion';
import type { Page } from '../core/router';
import { art, thumb } from '../data/art';
import { posterSrc, videos } from '../data/motion';
import { projects } from '../data/projects';
import { lang, t } from '../i18n';

const featured = art.filter((a) => a.featured);

// figurinhas em volta do avatar: [forma, cor, posição, tamanho, profundidade do parallax]
const heroStickers: [StickerName, string, string, number, number][] = [
  ['star', 'crimson', 'top:2%;left:6%', 74, 0.9],
  ['heart', 'orchid', 'top:8%;right:4%', 64, 1.4],
  ['sparkle', 'sky', 'bottom:22%;left:-4%', 58, 1.8],
  ['play', 'sky', 'bottom:4%;right:10%', 70, 1.1],
  ['code', 'orchid', 'top:44%;right:-6%', 66, 2],
  ['pencil', 'crimson', 'bottom:0%;left:20%', 60, 1.5],
  ['flower', 'crimson', 'top:-4%;left:46%', 50, 2.3],
];

const door = (path: string, color: string, title: string, text: string, count: string, preview: string) => `
  <a class="door door-${color}" href="${path}" data-reveal="up" data-tilt="7" data-cursor="→">
    <div class="door-preview">${preview}</div>
    <div class="door-body">
      <h3>${esc(title)}</h3>
      <p>${esc(text)}</p>
      <span class="door-foot"><span class="chip">${count}</span><span class="door-arrow">${icon('arrow')}</span></span>
    </div>
  </a>`;

export const home: Page = {
  title: () => t().meta.home,
  render: () => {
    const h = t().home;
    const artCount = art.length;
    return `
    <section class="hero">
      <div class="hero-blobs" aria-hidden="true">
        ${sticker('blob', 'hb hb-1')}${sticker('blob', 'hb hb-2')}${sticker('blob', 'hb hb-3')}
      </div>
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <p class="hero-hello hand">${esc(h.hello)}</p>
          <h1 class="hero-name" data-split>Gabbis</h1>
          <p class="hero-roles">
            <span class="role-box"><span class="role-word">${esc(h.roles[0])}</span></span>
            <span class="role-suffix">${esc(h.rolesSuffix)}</span>
          </p>
          <p class="hero-intro">${esc(h.intro)}</p>
          <div class="hero-ctas">
            <a class="btn btn-crimson" href="/art" data-magnetic>${esc(h.ctaArt)} ${icon('arrow')}</a>
            <a class="btn btn-paper" href="/commissions" data-magnetic>${esc(h.ctaShop)}</a>
          </div>
        </div>
        <div class="hero-art">
          <div class="hero-ring" aria-hidden="true"></div>
          <div class="hero-frame" data-depth="0.4">
            <img src="/media/art/full/pfp.webp" alt="Gabbis" width="420" height="420" />
          </div>
          <span class="hero-bubble hand" data-depth="0.7">${lang() === 'en' ? 'hi!!' : 'oiê!!'}</span>
          ${each(
            heroStickers,
            ([shape, color, pos, size, depth]) =>
              `<span class="hero-sticker" data-depth="${depth}" style="${pos};width:${size}px;color:var(--${color})">${sticker(shape)}</span>`,
          )}
        </div>
      </div>
    </section>

    ${marquee(h.marquee, 'marquee-crimson')}

    <section class="section wrap">
      <div class="section-head" data-reveal="up">
        <h2 class="section-title">${esc(h.whatTitle)}</h2>
        <p class="hand section-note">${esc(h.whatSub)}</p>
      </div>
      <div class="doors" data-stagger>
        ${door(
          '/art',
          'crimson',
          h.cards.art.title,
          h.cards.art.text,
          `${artCount} ${h.pieces}`,
          `<div class="fan">${each(featured.slice(0, 3), (a) => `<img src="${thumb(a.id)}" alt="" loading="lazy" />`)}</div>`,
        )}
        ${door(
          '/motion',
          'sky',
          h.cards.motion.title,
          h.cards.motion.text,
          `${videos.length} ${h.projects}`,
          `<div class="fan fan-video">${each(videos.slice(0, 3), (v) => `<img src="${posterSrc(v.id)}" alt="" loading="lazy" />`)}<span class="fan-play">${icon('play', 30)}</span></div>`,
        )}
        ${door(
          '/code',
          'orchid',
          h.cards.code.title,
          h.cards.code.text,
          `${projects.length} ${h.projects}`,
          `<div class="mini-window"><div class="mini-bar"><i></i><i></i><i></i></div><pre><code><b>const</b> gabbis = {
  draws: <s>true</s>,
  codes: <s>true</s>,
  sleeps: <u>maybe</u>,
};</code></pre></div>`,
        )}
      </div>
    </section>

    <section class="section featured">
      <div class="wrap">
        <div class="section-head" data-reveal="up">
          <h2 class="section-title">${esc(h.featuredTitle)}</h2>
          <p class="hand section-note">${esc(h.featuredSub)}</p>
        </div>
        <div class="polaroids" data-stagger>
          ${each(
            featured,
            (a, i) => `
            <button class="polaroid" data-art="${i}" data-reveal="pop" data-cursor="✦" style="--rot:${[-4, 3, -2, 5, -5, 2, -3, 4][i % 8]}deg" aria-label="${esc(a.title)}">
              <span class="tape" aria-hidden="true"></span>
              <img src="${thumb(a.id)}" alt="" loading="lazy" decoding="async" />
              <span class="polaroid-cap hand">${esc(a.title)}</span>
            </button>`,
          )}
        </div>
        <div class="center" data-reveal="up"><a class="btn btn-paper" href="/art" data-magnetic>${esc(h.seeAll)} ${icon('arrow')}</a></div>
      </div>
    </section>

    <section class="section wrap">
      <div class="cta-band" data-reveal="pop">
        ${sticker('star', 'cb cb-1')}${sticker('sparkle', 'cb cb-2')}${sticker('heart', 'cb cb-3')}
        <span class="status-pill"><i></i>${esc(t().shop.status)}</span>
        <h2>${esc(h.shopTitle)}</h2>
        <p>${esc(h.shopText)}</p>
        <a class="btn btn-paper" href="/commissions" data-magnetic>${esc(h.shopCta)} ${icon('arrow')}</a>
      </div>
    </section>`;
  },
  mount: (root) => {
    bindGallery(root, featured);
    popLetters(root, 0.15);
    if (reducedMotion()) return;

    // entrada do hero
    const intro = gsap.timeline({ defaults: { ease: 'back.out(1.8)' } });
    intro
      .from('.hero-hello', { y: 20, opacity: 0, rotate: -8, duration: 0.6 }, 0)
      .from('.hero-roles, .hero-intro, .hero-ctas > *', { y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'expo.out' }, 0.45)
      .from('.hero-frame', { scale: 0.3, rotate: -20, opacity: 0, duration: 1 }, 0.1)
      .from('.hero-ring', { scale: 0.5, opacity: 0, duration: 1, ease: 'expo.out' }, 0.2)
      .from('.hero-sticker', { scale: 0, rotate: () => gsap.utils.random(-90, 90), duration: 0.7, stagger: 0.06 }, 0.5)
      .from('.hero-bubble', { scale: 0, rotate: 20, duration: 0.5 }, 1);

    // palavra que troca sozinha
    const words = t().home.roles;
    const word = $('.role-word', root)!;
    let w = 0;
    const swap = gsap.timeline({ repeat: -1, delay: 1.6 });
    words.forEach(() => {
      swap
        .to(word, { yPercent: -110, rotate: -6, opacity: 0, duration: 0.35, ease: 'back.in(2)' }, '+=1.6')
        .call(() => {
          w = (w + 1) % words.length;
          word.textContent = words[w];
        })
        .fromTo(word, { yPercent: 110, rotate: 6, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, duration: 0.55, ease: 'back.out(2.5)' });
    });

    // figurinhas seguem o mouse com profundidades diferentes
    const layers = $$('[data-depth]', root).map((el) => ({
      d: Number(el.dataset.depth),
      x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3' }),
      y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3' }),
    }));
    const move = (e: PointerEvent) => {
      const px = e.clientX / innerWidth - 0.5;
      const py = e.clientY / innerHeight - 0.5;
      layers.forEach((l) => {
        l.x(px * 40 * l.d);
        l.y(py * 40 * l.d);
      });
    };
    if (!isTouch()) addEventListener('pointermove', move);

    // bolhas do fundo descem mais devagar que a página
    const blobs = $$('.hb', root);
    const onScroll = () => blobs.forEach((b, i) => gsap.set(b, { y: scrollY * (0.15 + i * 0.12) }));
    addEventListener('scroll', onScroll, { passive: true });

    return () => {
      intro.kill();
      swap.kill();
      removeEventListener('pointermove', move);
      removeEventListener('scroll', onScroll);
    };
  },
};
