import { reducedMotion } from './dom';

export type Theme = 'light' | 'dark';

export const theme = () => (document.documentElement.dataset.theme as Theme) || 'light';

function apply(next: Theme) {
  document.documentElement.dataset.theme = next;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#1b1420' : '#f7efe4');
  try {
    localStorage.setItem('theme', next);
  } catch {}
}

/** Troca o tema com um círculo crescendo a partir do botão (quando o navegador suporta). */
export function toggleTheme(origin?: { x: number; y: number }) {
  const next: Theme = theme() === 'dark' ? 'light' : 'dark';
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
  if (!doc.startViewTransition || reducedMotion() || !origin) {
    apply(next);
    return;
  }
  const r = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y));
  const vt = doc.startViewTransition(() => apply(next));
  vt.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${r}px at ${origin.x}px ${origin.y}px)`] },
      { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
    );
  });
}
