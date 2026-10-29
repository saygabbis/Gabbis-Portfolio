import { icon } from '../components/icons';
import { $$, each, esc, isTouch } from '../core/dom';
import { openLightbox, type LightboxItem } from '../core/lightbox';
import { popLetters } from '../core/motion';
import type { Page } from '../core/router';
import { posterSrc, videos, videoSrc } from '../data/motion';
import { t, tr } from '../i18n';

export const motionPage: Page = {
  title: () => t().meta.motion,
  render: () => {
    const m = t().motion;
    return `
    <section class="page-head wrap">
      <h1 class="page-title" data-split>${esc(m.title)}</h1>
      <p class="page-sub" data-reveal="up">${esc(m.sub)}</p>
    </section>
    <section class="wrap">
      <div class="video-grid" data-stagger>
        ${each(
          videos,
          (v, i) => `
          <article class="video-card" data-reveal="pop" data-tilt="6">
            <button class="video-thumb" data-video="${i}" data-cursor="▶" aria-label="${esc(m.play)}: ${esc(v.title)}">
              <video src="${videoSrc(v.id)}" poster="${posterSrc(v.id)}" muted loop playsinline preload="none"></video>
              <span class="video-play">${icon('play', 34)}</span>
            </button>
            <div class="video-body">
              <span class="chip chip-sky">${esc(tr(v.kind))}</span>
              <h2>${esc(v.title)}</h2>
              <p>${esc(tr(v.text))}</p>
              <ul class="tags">${each(v.tools, (tool) => `<li>${esc(tool)}</li>`)}</ul>
            </div>
          </article>`,
        )}
      </div>
      <p class="soon hand" data-reveal="up">${esc(m.soon)}</p>
    </section>`;
  },
  mount: (root) => {
    popLetters(root);
    const items: LightboxItem[] = videos.map((v) => ({
      type: 'video',
      src: videoSrc(v.id),
      preview: posterSrc(v.id),
      title: v.title,
      meta: `${tr(v.kind)} · ${v.tools.join(', ')}`,
    }));
    $$<HTMLButtonElement>('[data-video]', root).forEach((btn) => {
      const video = btn.querySelector('video')!;
      btn.addEventListener('click', () => {
        video.pause();
        openLightbox(items, Number(btn.dataset.video));
      });
      if (isTouch()) return;
      // prévia toca ao passar o mouse
      btn.addEventListener('pointerenter', () => {
        video.preload = 'auto';
        video.play().catch(() => {});
      });
      btn.addEventListener('pointerleave', () => video.pause());
    });
  },
};
