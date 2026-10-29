import { icon } from '../components/icons';
import { each, esc } from '../core/dom';
import { popLetters } from '../core/motion';
import type { Page } from '../core/router';
import { projects } from '../data/projects';
import { t, tr } from '../i18n';

export const codePage: Page = {
  title: () => t().meta.code,
  render: () => {
    const c = t().code;
    return `
    <section class="page-head wrap">
      <h1 class="page-title" data-split>${esc(c.title)}</h1>
      <p class="page-sub" data-reveal="up">${esc(c.sub)}</p>
    </section>
    <section class="wrap">
      <div class="project-grid" data-stagger>
        ${each(
          projects,
          (p) => `
          <article class="project-card project-${p.color}" data-reveal="pop" data-tilt="6">
            <div class="project-top">
              <span class="project-emoji" aria-hidden="true">${p.emoji}</span>
              <span class="status status-${p.status}"><i></i>${esc(c.status[p.status])}</span>
            </div>
            <h2>${esc(p.name)}</h2>
            <p>${esc(tr(p.text))}</p>
            <ul class="tags">${each(p.stack, (s) => `<li>${esc(s)}</li>`)}</ul>
            <div class="project-links">
              ${p.repo ? `<a class="btn btn-small btn-paper" href="${p.repo}" target="_blank" rel="noopener" data-magnetic>${icon('github', 18)} ${esc(c.repo)}</a>` : ''}
              ${p.live ? `<a class="btn btn-small btn-crimson" href="${p.live}" target="_blank" rel="noopener" data-magnetic>${icon('external', 18)} ${esc(c.live)}</a>` : ''}
            </div>
          </article>`,
        )}
      </div>
    </section>`;
  },
  mount: (root) => popLetters(root),
};
