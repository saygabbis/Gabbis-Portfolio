import { gsap } from 'gsap';
import { icon } from '../components/icons';
import { t } from '../i18n';
import { esc, reducedMotion } from './dom';

export interface LightboxItem {
  type: 'image' | 'video';
  src: string;
  /** Imagem pequena mostrada enquanto a grande carrega (ou poster do vídeo). */
  preview: string;
  title: string;
  meta: string;
}

let el: HTMLElement | null = null;
let items: LightboxItem[] = [];
let index = 0;
let lastFocus: HTMLElement | null = null;

function build() {
  el = document.createElement('div');
  el.className = 'lightbox';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.hidden = true;
  document.body.append(el);

  el.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target === el || target.closest('[data-lb="close"]')) close();
    else if (target.closest('[data-lb="prev"]')) go(-1);
    else if (target.closest('[data-lb="next"]')) go(1);
  });

  // deslizar pro lado no celular
  let startX = 0;
  el.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX), { passive: true });
  el.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  });

  addEventListener('keydown', (e) => {
    if (!el || el.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  });
}

function frame() {
  const L = t().lightbox;
  const it = items[index];
  const media =
    it.type === 'video'
      ? `<video class="lb-media" src="${it.src}" poster="${it.preview}" controls autoplay loop playsinline></video>`
      : `<img class="lb-media" src="${it.preview}" data-full="${it.src}" alt="${esc(it.title)}" />`;
  const many = items.length > 1;
  el!.innerHTML = `
    <button class="lb-btn lb-close" data-lb="close" aria-label="${L.close}">${icon('close')}</button>
    ${many ? `<button class="lb-btn lb-prev" data-lb="prev" aria-label="${L.prev}">${icon('left')}</button>` : ''}
    ${many ? `<button class="lb-btn lb-next" data-lb="next" aria-label="${L.next}">${icon('right')}</button>` : ''}
    <figure class="lb-card">
      <div class="lb-stage">${media}</div>
      <figcaption class="lb-caption">
        <strong>${esc(it.title)}</strong>
        <span>${esc(it.meta)}${many ? ` · ${index + 1} ${L.of} ${items.length}` : ''}</span>
      </figcaption>
    </figure>`;
  el!.setAttribute('aria-label', it.title);

  // troca a prévia pela imagem grande quando ela terminar de carregar
  const img = el!.querySelector<HTMLImageElement>('img[data-full]');
  if (img) {
    const big = new Image();
    big.src = img.dataset.full!;
    big.decode().then(() => (img.src = big.src)).catch(() => {});
  }
}

function go(step: number) {
  if (items.length < 2) return;
  index = (index + step + items.length) % items.length;
  const card = el!.querySelector('.lb-card');
  if (reducedMotion() || !card) return frame();
  gsap.to(card, {
    x: -step * 60,
    opacity: 0,
    rotate: -step * 3,
    duration: 0.18,
    ease: 'power2.in',
    onComplete: () => {
      frame();
      gsap.fromTo('.lb-card', { x: step * 60, opacity: 0, rotate: step * 3 }, { x: 0, opacity: 1, rotate: 0, duration: 0.5, ease: 'back.out(1.6)' });
    },
  });
}

export function openLightbox(list: LightboxItem[], start: number) {
  if (!el) build();
  items = list;
  index = start;
  lastFocus = document.activeElement as HTMLElement;
  frame();
  el!.hidden = false;
  document.documentElement.classList.add('no-scroll');
  el!.querySelector<HTMLElement>('.lb-close')?.focus();
  if (!reducedMotion()) {
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    gsap.fromTo('.lb-card', { scale: 0.8, rotate: -4, y: 40 }, { scale: 1, rotate: 0, y: 0, duration: 0.6, ease: 'back.out(1.8)' });
  }
}

function close() {
  if (!el) return;
  const done = () => {
    el!.hidden = true;
    el!.innerHTML = '';
    document.documentElement.classList.remove('no-scroll');
    lastFocus?.focus();
  };
  if (reducedMotion()) return done();
  gsap.to('.lb-card', { scale: 0.85, rotate: 4, opacity: 0, duration: 0.22, ease: 'power2.in' });
  gsap.to(el, { opacity: 0, duration: 0.25, onComplete: done });
}
