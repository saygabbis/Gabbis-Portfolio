import { each, esc } from '../core/dom';
import { EMAIL, socials } from '../data/socials';
import { t } from '../i18n';
import { icon } from './icons';

export function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="wrap footer-bar">
      <div>
        <p class="footer-name">Gabbis · SayGabbis ${new Date().getFullYear()}</p>
        <a class="footer-mail" href="mailto:${EMAIL}">${EMAIL}</a>
      </div>
      <p class="footer-made">${esc(t().footer.made)}</p>
      <ul class="footer-socials">
        ${each(socials, (s) => `<li><a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label} ${s.handle}" title="${s.label} · ${s.handle}">${icon(s.icon, 20)}</a></li>`)}
      </ul>
    </div>
  </footer>`;
}
