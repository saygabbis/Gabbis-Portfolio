import { gsap } from 'gsap';
import { $, $$, each, reducedMotion } from '../core/dom';
import { magnetic } from '../core/motion';
import { toggleTheme } from '../core/theme';
import { lang, setLang, t } from '../i18n';
import { symbol } from './doodles';
import { icon } from './icons';

export const NAV = [
  { path: '/', key: 'home' },
  { path: '/art', key: 'art' },
  { path: '/motion', key: 'motion' },
  { path: '/code', key: 'code' },
  { path: '/commissions', key: 'shop' },
  { path: '/about', key: 'about' },
] as const;

// cor de cada aba do caderno
const TAB_COLORS = ['crimson', 'sky', 'orchid', 'crimson', 'sky'];

export function renderHeader() {
  const n = t().nav;
  return `
  <header class="site-header">
    <div class="header-bar wrap">
      <a class="logo" href="/" aria-label="Gabbis, ${n.home}">
        <img class="logo-avatar" src="/media/art/thumb/pfp.webp" alt="" width="46" height="46" />
        <span class="logo-word">gabbis</span>
      </a>
      <nav class="tabs" aria-label="Principal">
        <ul>
          ${each(NAV.slice(1), (r, i) => `<li><a class="tab tab-${TAB_COLORS[i]}" href="${r.path}" data-nav="${r.path}">${n[r.key]}</a></li>`)}
        </ul>
      </nav>
      <div class="header-actions">
        <button class="chip-btn lang-btn" data-action="lang" aria-label="${n.lang}" data-magnetic>${lang() === 'pt' ? 'EN' : 'PT'}</button>
        <button class="chip-btn theme-btn" data-action="theme" aria-label="${n.theme}" data-magnetic>
          <span class="theme-sun">${icon('sun')}</span><span class="theme-moon">${icon('moon')}</span>
        </button>
        <button class="chip-btn menu-btn" data-action="menu" aria-label="${n.menu}" aria-expanded="false" aria-controls="mobile-menu">${icon('menu')}</button>
      </div>
    </div>
    <div class="mobile-menu" id="mobile-menu" hidden>
      <ol>
        ${each(NAV, (r, i) => `<li><a href="${r.path}" data-nav="${r.path}">${symbol(((i % 5) + 1) as 1 | 2 | 3 | 4 | 5)}<span>${n[r.key]}</span></a></li>`)}
      </ol>
    </div>
  </header>`;
}

function setMenu(open: boolean) {
  const menu = $('#mobile-menu')!;
  const btn = $('.menu-btn')!;
  btn.setAttribute('aria-expanded', String(open));
  btn.innerHTML = icon(open ? 'close' : 'menu');
  document.documentElement.classList.toggle('menu-open', open);
  if (open) {
    menu.hidden = false;
    if (!reducedMotion()) {
      gsap.fromTo(menu, { yPercent: -100, rotate: -4 }, { yPercent: 0, rotate: 0, duration: 0.6, ease: 'power3.out' });
      gsap.fromTo($$('li', menu), { x: -30, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.05, duration: 0.45, ease: 'power2.out', delay: 0.15 });
    }
  } else if (!menu.hidden) {
    if (reducedMotion()) menu.hidden = true;
    else gsap.to(menu, { yPercent: -100, rotate: 3, duration: 0.4, ease: 'power2.in', onComplete: () => void (menu.hidden = true) });
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
}

let bound = false;
let stopMagnetic = () => {};

/** Liga o cabeçalho. Pode ser chamada de novo depois de re-renderizar (troca de idioma). */
export function mountHeader(root: HTMLElement) {
  stopMagnetic();
  stopMagnetic = magnetic(root);
  const onScroll = () => $('.site-header', root)?.classList.toggle('is-scrolled', scrollY > 24);
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
    if ((e.target as HTMLElement).closest('#mobile-menu a')) setMenu(false);
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.documentElement.classList.contains('menu-open')) setMenu(false);
  });
  // cabeçalho ganha fundo de papel depois que rola um pouco
  addEventListener('scroll', onScroll, { passive: true });
}
