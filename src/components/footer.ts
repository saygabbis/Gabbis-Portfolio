import { each, esc } from '../core/dom';
import { EMAIL, socials } from '../data/socials';
import { t } from '../i18n';
import { icon } from './icons';
import { sticker } from './stickers';

export function renderFooter() {
  const f = t().footer;
  return `
  <footer class="site-footer">
    <div class="footer-card wrap" data-reveal="up">
      ${sticker('star', 'fs fs-1')}${sticker('heart', 'fs fs-2')}${sticker('sparkle', 'fs fs-3')}
      <h2 class="footer-title">${esc(f.title)}</h2>
      <p class="footer-text">${esc(f.text)}</p>
      <a class="btn btn-crimson footer-mail" href="mailto:${EMAIL}" data-magnetic>${icon('mail')} ${EMAIL}</a>
      <ul class="footer-socials">
        ${each(socials, (s) => `<li><a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label} ${s.handle}" title="${s.label} · ${s.handle}" data-magnetic>${icon(s.icon)}</a></li>`)}
      </ul>
    </div>
    <p class="footer-made hand">© ${new Date().getFullYear()} SayGabbis · ${esc(f.made)}</p>
  </footer>`;
}
