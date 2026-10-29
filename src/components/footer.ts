import { each, esc } from '../core/dom';
import { EMAIL, socials } from '../data/socials';
import { t } from '../i18n';
import { doodle } from './doodles';
import { icon } from './icons';

export function renderFooter() {
  const f = t().footer;
  return `
  <footer class="site-footer">
    <div class="wrap footer-page">
      <img class="footer-caruzo" src="/media/art/thumb/macacaruzo2.webp" alt="" aria-hidden="true" loading="lazy" />
      <h2 class="footer-title" data-reveal="up">
        <span class="circled">${esc(f.title)}${doodle('circle', 'footer-circle', 'var(--crimson)')}</span>
      </h2>
      <p class="footer-text" data-reveal="up">${esc(f.text)}</p>
      <a class="btn btn-crimson footer-mail" href="mailto:${EMAIL}" data-magnetic data-reveal="up">${icon('mail')} ${EMAIL}</a>
      <ul class="footer-socials" data-stagger>
        ${each(socials, (s) => `<li data-reveal="pop"><a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label} ${s.handle}" title="${s.label} · ${s.handle}" data-magnetic>${icon(s.icon)}</a></li>`)}
      </ul>
      <p class="footer-made hand">© ${new Date().getFullYear()} SayGabbis · ${esc(f.made)}</p>
    </div>
  </footer>`;
}
