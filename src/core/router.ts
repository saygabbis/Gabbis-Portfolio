import { gsap } from 'gsap';
import { reducedMotion } from './dom';

export interface Page {
  title: () => string;
  render: () => string;
  /** Roda depois de inserir o HTML; pode devolver uma função de limpeza. */
  mount?: (root: HTMLElement) => void | (() => void);
}

type Hooks = {
  /** Troca o conteúdo da página (chamado com a cortina fechada). */
  swap: (page: Page, path: string) => void;
};

let routes: Record<string, Page> = {};
let notFound: Page;
let hooks: Hooks;
let currentPath = '';
let busy = false;

/** Normaliza o caminho: sem barra no fim (exceto a raiz). */
const clean = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);

export const currentRoute = () => currentPath;
export const pageFor = (path: string) => routes[clean(path)] ?? notFound;

// ---- cortina de transição: três faixas coloridas descendo e subindo ----
let curtain: HTMLElement;
function buildCurtain() {
  curtain = document.createElement('div');
  curtain.className = 'curtain';
  curtain.setAttribute('aria-hidden', 'true');
  curtain.innerHTML = '<span></span><span></span><span></span><b class="curtain-star">✦</b>';
  document.body.append(curtain);
}

function curtainIn() {
  const bars = curtain.querySelectorAll('span');
  return gsap
    .timeline()
    .set(curtain, { visibility: 'visible' })
    .set(bars, { transformOrigin: '50% 0%' })
    .fromTo(bars, { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: 'expo.inOut', stagger: 0.07 })
    .fromTo('.curtain-star', { scale: 0, rotate: -180 }, { scale: 1, rotate: 0, duration: 0.45, ease: 'back.out(2)' }, '-=0.25');
}

function curtainOut() {
  const bars = curtain.querySelectorAll('span');
  return gsap
    .timeline()
    .to('.curtain-star', { scale: 0, rotate: 180, duration: 0.3, ease: 'back.in(2)' })
    .set(bars, { transformOrigin: '50% 100%' })
    .to(bars, { scaleY: 0, duration: 0.55, ease: 'expo.inOut', stagger: 0.07 }, '-=0.1')
    .set(curtain, { visibility: 'hidden' });
}

export async function navigate(to: string, { push = true, instant = false } = {}) {
  const url = new URL(to, location.origin);
  const path = clean(url.pathname);
  if (busy) return;
  if (path === currentPath) {
    if (url.hash) document.querySelector(url.hash)?.scrollIntoView({ behavior: 'smooth' });
    else scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  busy = true;
  if (push) history.pushState({}, '', url.pathname + url.search + url.hash);
  const animate = !instant && !reducedMotion() && currentPath !== '';
  if (animate) await curtainIn();
  currentPath = path;
  hooks.swap(pageFor(path), path);
  if (url.hash) document.querySelector(url.hash)?.scrollIntoView();
  else scrollTo({ top: 0, behavior: 'instant' });
  if (animate) await curtainOut();
  busy = false;
}

export function startRouter(table: Record<string, Page>, fallback: Page, h: Hooks) {
  routes = table;
  notFound = fallback;
  hooks = h;
  buildCurtain();

  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download') || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const href = a.getAttribute('href')!;
    if (!href.startsWith('/') || href.startsWith('//') || href.startsWith('/media/')) return;
    e.preventDefault();
    navigate(href);
  });
  addEventListener('popstate', () => navigate(location.pathname + location.hash, { push: false }));

  navigate(location.pathname + location.hash, { push: false, instant: true });
}

/** Re-renderiza a página atual sem cortina (troca de idioma). */
export function refresh() {
  hooks.swap(pageFor(currentPath), currentPath);
}
