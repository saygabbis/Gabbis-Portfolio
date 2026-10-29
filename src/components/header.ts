import { gsap } from 'gsap';
import { $, $$, each, reducedMotion } from '../core/dom';
import { magnetic } from '../core/motion';
import { toggleTheme } from '../core/theme';
import { socials } from '../data/socials';
import { lang, setLang, t } from '../i18n';
import { icon } from './icons';

export const NAV = [
  { path: '/', key: 'home' },
  { path: '/art', key: 'art' },
  { path: '/motion', key: 'motion' },
  { path: '/code', key: 'code' },
  { path: '/commissions', key: 'shop' },
  { path: '/about', key: 'about' },
] as const;

export function renderHeader() {
  const n = t().nav;
  return `
  <header class="site-header">
    <div class="header-bar wrap">
      <a class="logo" href="/" aria-label="Gabbis, ${n.home}">gabbis</a>
      <nav class="nav" aria-label="Principal">
        <ul>
          ${each(NAV, (r) => `<li><a href="${r.path}" data-nav="${r.path}">${n[r.key]}</a></li>`)}
        </ul>
      </nav>
      <ul class="header-socials">
        ${each(socials.slice(0, 4), (s) => `<li><a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}" title="${s.label} · ${s.handle}">${icon(s.icon, 18)}</a></li>`)}
      </ul>
      <div class="header-actions">
        <button class="mini-btn" data-action="lang" aria-label="${n.lang}">${lang() === 'pt' ? 'EN' : 'PT'}</button>
        <button class="mini-btn theme-btn" data-action="theme" aria-label="${n.theme}">
          <span class="theme-sun">${icon('sun', 18)}</span><span class="theme-moon">${icon('moon', 18)}</span>
        </button>
        <button class="mini-btn menu-btn" data-action="menu" aria-label="${n.menu}" aria-expanded="false" aria-controls="mobile-menu">${icon('menu', 20)}</button>
      </div>
    </div>
    <div class="mobile-menu" id="mobile-menu" hidden>
      <ul>
        ${each(NAV, (r) => `<li><a href="${r.path}" data-nav="${r.path}">${n[r.key]}</a></li>`)}
      </ul>
      <ul class="mobile-socials">
        ${each(socials, (s) => `<li><a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}">${icon(s.icon)}</a></li>`)}
      </ul>
    </div>
  </header>`;
}

function setMenu(open: boolean) {
  const menu = $('#mobile-menu')!;
  const btn = $('.menu-btn')!;
  btn.setAttribute('aria-expanded', String(open));
  btn.innerHTML = icon(open ? 'close' : 'menu', 20);
  document.documentElement.classList.toggle('menu-open', open);
  if (open) {
    menu.hidden = false;
    if (!reducedMotion()) {
      gsap.fromTo(menu, { clipPath: 'circle(0% at 100% 0%)' }, { clipPath: 'circle(150% at 100% 0%)', duration: 0.6, ease: 'power3.out' });
      gsap.fromTo($$('li', menu), { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, duration: 0.5, ease: 'back.out(2)', delay: 0.1 });
    }
  } else if (!menu.hidden) {
    if (reducedMotion()) menu.hidden = true;
    else gsap.to(menu, { clipPath: 'circle(0% at 100% 0%)', duration: 0.4, ease: 'power2.in', onComplete: () => void (menu.hidden = true) });
  }
}

/** Marca o link da página atual. */
export function markActive(path: string) {
  $$('[data-nav]').forEach((a) => {
    const on = a.dataset.nav === path;
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  document.documentElement.classList.toggle('on-home', path === '/');
}

let bound = false;
let stopMagnetic = () => {};

/** Liga o cabeçalho. Pode ser chamada de novo depois de re-renderizar (troca de idioma). */
export function mountHeader(root: HTMLElement) {
  stopMagnetic();
  stopMagnetic = magnetic(root);
  const onScroll = () => $('.site-header', root)?.classList.toggle('is-scrolled', scrollY > 40);
  onScroll();
  if (bound) return;
  bound = true;

  root.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-action]');
    if (btn?.dataset.action === 'theme') {
      const r = btn.getBoundingClientRect();
      toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    }
    if (btn?.dataset.action === 'lang') setLang(lang() === 'pt' ? 'en' : 'pt');
    if (btn?.dataset.action === 'menu') setMenu(btn.getAttribute('aria-expanded') !== 'true');
    if ((e.target as HTMLElement).closest('#mobile-menu a[data-nav]')) setMenu(false);
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.documentElement.classList.contains('menu-open')) setMenu(false);
  });
  // o cabeçalho é transparente em cima da arte e ganha cor depois que rola
  addEventListener('scroll', onScroll, { passive: true });
}
