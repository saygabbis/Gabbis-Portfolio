import { gsap } from 'gsap';
import { artTile, bindGallery } from '../components/gallery';
import { icon } from '../components/icons';
import { mascot } from '../components/mascot';
import { sticker } from '../components/page-head';
import { $$, each, esc, isTouch, reducedMotion } from '../core/dom';
import { popLetters } from '../core/motion';
import type { Page } from '../core/router';
import { art, full, thumb } from '../data/art';
import { posterSrc, videos } from '../data/motion';
import { projects } from '../data/projects';
import { EMAIL } from '../data/socials';
import { t, tr } from '../i18n';

const HERO = '2'; // Celeste - The Summit
// favoritas primeiro, depois as mais recentes, até 12
const homeArt = [...art.filter((a) => a.featured), ...art.filter((a) => !a.featured && a.cat === 'personal')].slice(0, 12);

export const home: Page = {
  title: () => t().meta.home,
  render: () => {
    const h = t().home;
    return `
    <section class="hero">
      <div class="hero-art">
        <img src="${full(HERO)}" alt="Celeste - The Summit" fetchpriority="high" data-depth="-0.15" />
      </div>
      <div class="hero-content wrap">
        <div class="hero-text">
          <p class="hero-kicker">${esc(h.kicker)}</p>
          <p class="hero-hello">${esc(h.hello)}</p>
          <h1 class="title-3d hero-name" data-split>Gabbis</h1>
          <p class="hero-intro">${esc(h.intro)}</p>
          <div class="hero-ctas">
            <a class="pill pill-light" href="/art" data-magnetic>${esc(h.ctaArt)} ${icon('arrow', 18)}</a>
            <a class="pill pill-ghost" href="/motion" data-magnetic>${icon('play', 16)} ${esc(h.ctaMotion)}</a>
          </div>
        </div>
      </div>
      <div class="hero-stickers" aria-hidden="true">
        ${sticker(thumb('caruzo'), 'hs hs-caruzo', 1.2)}
        ${sticker(thumb('macacaruzo2'), 'hs hs-vine', 0.8)}
        <span class="hs hs-mascot" data-depth="0.5">${mascot()}</span>
      </div>
    </section>

    <section class="section wrap">
      <h2 class="title-3d section-title" data-reveal="up">${esc(h.artTitle)}</h2>
      <div class="masonry home-masonry" data-stagger>${each(homeArt, (a, i) => artTile(a, i))}</div>
      <div class="center" data-reveal="up"><a class="pill pill-light" href="/art" data-magnetic>${esc(h.seeAll)} ${icon('arrow', 18)}</a></div>
    </section>

    <section class="night">
      <a class="slant-band" href="/motion" data-reveal="up" aria-label="${esc(h.motionTitle)}">
        <div class="slant-inner">
          ${each(videos, (v) => `<img src="${posterSrc(v.id)}" alt="" loading="lazy" />`)}
        </div>
        <span class="slant-label title-3d">${esc(h.motionTitle)}</span>
      </a>
      <div class="wrap motion-row">
        <p data-reveal="up">${esc(h.motionText)}</p>
        <a class="pill pill-crimson" href="/motion" data-magnetic data-reveal="up">${icon('play', 16)} ${esc(h.motionCta)}</a>
      </div>

      <div class="wrap section">
        <h2 class="title-3d section-title" data-reveal="up">${esc(h.codeTitle)}</h2>
        <p class="section-sub" data-reveal="up">${esc(h.codeText)}</p>
        <div class="mini-projects" data-stagger>
          ${each(
            projects,
            (p) => `
            <a class="mini-project mp-${p.color}" href="${p.repo ?? p.live ?? '/code'}" target="_blank" rel="noopener" data-reveal="pop">
              <strong>${esc(p.name)}</strong>
              <span>${esc(tr(p.text))}</span>
              <span class="mini-stack">${esc(p.stack.join(' · '))}</span>
            </a>`,
          )}
        </div>
        <div class="center" data-reveal="up"><a class="pill pill-light" href="/code" data-magnetic>${esc(h.codeCta)} ${icon('arrow', 18)}</a></div>
      </div>

      <div class="wrap section hello-row">
        <div class="hello-mascot" data-reveal="pop">${mascot()}</div>
        <div class="hello-text">
          <h2 class="title-3d section-title" data-reveal="up">${esc(h.aboutTitle)}</h2>
          <p data-reveal="up">${esc(h.aboutText)}</p>
          <a class="pill pill-sky" href="mailto:${EMAIL}" data-magnetic data-reveal="up">${icon('mail', 18)} ${EMAIL}</a>
        </div>
      </div>
    </section>`;
  },
  mount: (root) => {
    bindGallery(root, homeArt);
    popLetters(root, 0.3);
    if (reducedMotion()) return;

    const intro = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } });
    intro
      .from('.hero-art img', { scale: 1.12, duration: 1.6, ease: 'power3.out' }, 0)
      .from('.hero-kicker, .hero-hello', { y: 20, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.2)
      .from('.hero-intro, .hero-ctas > *', { y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'expo.out' }, 0.7)
      .from('.hs', { y: 140, rotate: () => gsap.utils.random(-30, 30), opacity: 0, duration: 0.9, stagger: 0.12 }, 0.5);

    // figurinhas e a arte do topo seguem o mouse em profundidades diferentes
    const layers = $$('[data-depth]', root).map((el) => ({
      d: Number(el.dataset.depth),
      x: gsap.quickTo(el, 'x', { duration: 1, ease: 'power3' }),
      y: gsap.quickTo(el, 'y', { duration: 1, ease: 'power3' }),
    }));
    const move = (e: PointerEvent) => {
      const px = e.clientX / innerWidth - 0.5;
      const py = e.clientY / innerHeight - 0.5;
      layers.forEach((l) => {
        l.x(px * 40 * l.d);
        l.y(py * 30 * l.d);
      });
    };
    if (!isTouch()) addEventListener('pointermove', move);

    return () => {
      intro.kill();
      removeEventListener('pointermove', move);
    };
  },
};
