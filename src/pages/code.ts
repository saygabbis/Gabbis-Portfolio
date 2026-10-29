import { icon } from '../components/icons';
import { pageHead } from '../components/page-head';
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
    ${pageHead(c.title, c.sub)}
    <section class="wrap">
      <div class="project-grid" data-stagger>
        ${each(
          projects,
          (p) => `
          <article class="project-card project-${p.color}" data-reveal="pop">
            <div class="project-top">
              <span class="project-dot" aria-hidden="true"></span>
              <span class="status status-${p.status}"><i></i>${esc(c.status[p.status])}</span>
            </div>
            <h2>${esc(p.name)}</h2>
            <p>${esc(tr(p.text))}</p>
            <ul class="tags">${each(p.stack, (s) => `<li>${esc(s)}</li>`)}</ul>
            <div class="project-links">
              ${p.repo ? `<a class="pill pill-small pill-light" href="${p.repo}" target="_blank" rel="noopener" data-magnetic>${icon('github', 18)} ${esc(c.repo)}</a>` : ''}
              ${p.live ? `<a class="pill pill-small pill-sky" href="${p.live}" target="_blank" rel="noopener" data-magnetic>${icon('external', 18)} ${esc(c.live)}</a>` : ''}
            </div>
          </article>`,
        )}
      </div>
    </section>`;
  },
  mount: (root) => popLetters(root),
};
