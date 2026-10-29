import { gsap } from 'gsap';
import { $$, isTouch, reducedMotion } from './dom';

type Cleanup = () => void;

/**
 * Elementos com [data-reveal] entram na tela quando aparecem no scroll.
 * Valores: "up" (padrão), "pop", "left", "right". [data-stagger] num pai anima os filhos em sequência.
 */
export function reveal(root: ParentNode): Cleanup {
  const els = $$('[data-reveal]', root);
  if (reducedMotion()) {
    els.forEach((el) => el.classList.add('is-in'));
    return () => {};
  }
  const from: Record<string, gsap.TweenVars> = {
    up: { y: 60, opacity: 0, rotate: 0 },
    pop: { scale: 0.6, opacity: 0, rotate: -6 },
    left: { x: -80, opacity: 0 },
    right: { x: 80, opacity: 0 },
  };
  els.forEach((el) => gsap.set(el, from[el.dataset.reveal || 'up'] ?? from.up));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        const parent = el.parentElement;
        // irmãos que entram juntos ganham um atrasinho em cascata
        const siblings = parent?.hasAttribute('data-stagger') ? [...parent.children] : [];
        const delay = Math.max(0, siblings.indexOf(el)) * 0.07;
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.9,
          delay: Math.min(delay, 0.5),
          ease: el.dataset.reveal === 'pop' ? 'back.out(2.2)' : 'expo.out',
          onComplete: () => el.classList.add('is-in'),
        });
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/** [data-tilt]: inclina o card em 3D seguindo o ponteiro. */
export function tilt(root: ParentNode): Cleanup {
  if (isTouch() || reducedMotion()) return () => {};
  const offs: Cleanup[] = [];
  $$('[data-tilt]', root).forEach((el) => {
    const max = Number(el.dataset.tilt) || 8;
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3' });
    gsap.set(el, { transformPerspective: 900 });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rx(-py * max);
      ry(px * max);
      el.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
      el.style.setProperty('--my', `${(py + 0.5) * 100}%`);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    offs.push(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    });
  });
  return () => offs.forEach((f) => f());
}

/** [data-magnetic]: o botão é "puxado" levemente na direção do ponteiro. */
export function magnetic(root: ParentNode): Cleanup {
  if (isTouch() || reducedMotion()) return () => {};
  const offs: Cleanup[] = [];
  $$('[data-magnetic]', root).forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.3);
      y((e.clientY - (r.top + r.height / 2)) * 0.4);
    };
    const leave = () => {
      x(0);
      y(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    offs.push(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    });
  });
  return () => offs.forEach((f) => f());
}

/** Quebra o texto de [data-split] em letras (pra animar uma por uma). */
export function split(root: ParentNode) {
  $$('[data-split]', root).forEach((el) => {
    if (el.dataset.splitDone) return;
    const text = el.textContent ?? '';
    el.setAttribute('aria-label', text);
    el.innerHTML = [...text]
      .map((ch, i) => (ch === ' ' ? '<span class="ch sp" aria-hidden="true"> </span>' : `<span class="ch" aria-hidden="true" style="--i:${i}">${ch}</span>`))
      .join('');
    el.dataset.splitDone = '1';
  });
}

/** Letras de [data-split] pulam pra dentro. */
export function popLetters(root: ParentNode, delay = 0) {
  const chars = $$('[data-split] .ch', root);
  if (!chars.length || reducedMotion()) return;
  gsap.from(chars, {
    yPercent: 120,
    rotate: () => gsap.utils.random(-25, 25),
    scale: 0.4,
    opacity: 0,
    duration: 0.9,
    ease: 'back.out(2.4)',
    stagger: 0.035,
    delay,
  });
}

/** Cursor personalizado: uma bolinha que segue o mouse e cresce em cima de links. */
export function cursor(): Cleanup {
  if (isTouch() || reducedMotion()) return () => {};
  const dot = document.createElement('div');
  dot.className = 'cursor';
  dot.innerHTML = '<span class="cursor-label"></span>';
  document.body.append(dot);
  document.documentElement.classList.add('has-cursor');
  const label = dot.querySelector<HTMLElement>('.cursor-label')!;

  gsap.set(dot, { xPercent: -50, yPercent: -50, x: innerWidth / 2, y: innerHeight / 2 });
  const xTo = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3' });
  const yTo = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3' });

  const move = (e: PointerEvent) => {
    xTo(e.clientX);
    yTo(e.clientY);
    const target = (e.target as HTMLElement).closest<HTMLElement>('a, button, [data-cursor], input, textarea, summary');
    const text = target?.dataset.cursor ?? '';
    dot.classList.toggle('is-hover', !!target);
    dot.classList.toggle('has-label', !!text);
    if (label.textContent !== text) label.textContent = text;
  };
  const down = () => dot.classList.add('is-down');
  const up = () => dot.classList.remove('is-down');
  const hide = () => dot.classList.add('is-hidden');
  const show = () => dot.classList.remove('is-hidden');
  addEventListener('pointermove', move);
  addEventListener('pointerdown', down);
  addEventListener('pointerup', up);
  document.addEventListener('pointerleave', hide);
  document.addEventListener('pointerenter', show);
  return () => {
    removeEventListener('pointermove', move);
    removeEventListener('pointerdown', down);
    removeEventListener('pointerup', up);
    dot.remove();
  };
}

/** Estrelinhas estourando onde clicar. */
export function clickSparkles(): Cleanup {
  if (reducedMotion()) return () => {};
  const colors = ['var(--crimson)', 'var(--sky)', 'var(--orchid)'];
  const burst = (e: PointerEvent) => {
    if (e.button !== 0) return;
    for (let i = 0; i < 7; i++) {
      const s = document.createElement('span');
      s.className = 'spark';
      s.style.left = `${e.clientX}px`;
      s.style.top = `${e.clientY}px`;
      s.style.color = colors[i % colors.length];
      document.body.append(s);
      const angle = (Math.PI * 2 * i) / 7 + Math.random() * 0.5;
      const dist = 28 + Math.random() * 30;
      gsap.fromTo(
        s,
        { x: 0, y: 0, scale: 0.4, rotate: 0, opacity: 1 },
        {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          scale: 1,
          rotate: gsap.utils.random(-180, 180),
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          onComplete: () => s.remove(),
        },
      );
    }
  };
  addEventListener('pointerdown', burst);
  return () => removeEventListener('pointerdown', burst);
}

/** Liga todas as interações de uma página recém-renderizada. */
export function enhance(root: ParentNode): Cleanup {
  split(root);
  const offs = [reveal(root), tilt(root), magnetic(root)];
  return () => offs.forEach((f) => f());
}
