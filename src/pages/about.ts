import { gsap } from 'gsap';
import { mascot } from '../components/mascot';
import { pageHead } from '../components/page-head';
import { icon } from '../components/icons';
import { $, each, esc, reducedMotion } from '../core/dom';
import { openLightbox } from '../core/lightbox';
import { popLetters } from '../core/motion';
import type { Page } from '../core/router';
import { full, thumb } from '../data/art';
import { EMAIL, socials, type Social } from '../data/socials';
import { t } from '../i18n';

const groupOrder: Social['group'][] = ['art', 'code', 'support'];

export const aboutPage: Page = {
  title: () => t().meta.about,
  render: () => {
    const a = t().about;
    return `
    ${pageHead(a.title)}
    <section class="wrap about-grid">
      <div class="about-mascot" data-reveal="pop">${mascot()}</div>
      <div class="about-text">
        <h2 class="about-hello" data-reveal="up">${esc(a.hello)}</h2>
        ${each(a.bio, (p) => `<p data-reveal="up">${esc(p)}</p>`)}
        <p class="old-name" data-reveal="up"><b>✦</b> ${esc(a.oldName)}</p>
      </div>
    </section>

    <section class="section wrap">
      <h2 class="section-title" data-reveal="up">${esc(a.findTitle)}</h2>
      <div class="find-grid" data-stagger>
        ${each(groupOrder, (g) => {
          const list = socials.filter((s) => s.group === g);
          // perfis alternativos: o aviso aparece uma vez no grupo, não em cada rede
          const note = list.every((s) => s.note && s.note === list[0].note) ? list[0].note : undefined;
          return `
          <div class="find-group find-${g}" data-reveal="pop">
            <h3>${esc(a.groups[g])}</h3>
            ${note ? `<p class="find-note hand">${esc(a.handleNote[note])} ✦</p>` : ''}
            <ul>
              ${each(
                list,
                (s) => `
                <li><a href="${s.url}" target="_blank" rel="noopener" class="find-link" data-magnetic>
                  <span class="find-icon">${icon(s.icon)}</span>
                  <span><strong>${esc(s.label)}</strong><small>${esc(s.handle)}${s.note && !note ? ` · ${esc(a.handleNote[s.note])}` : ''}</small></span>
                </a></li>`,
              )}
            </ul>
          </div>`;
        })}
        <div class="find-group find-contact" data-reveal="pop">
          <h3>${esc(a.groups.contact)}</h3>
          <a class="find-link" href="mailto:${EMAIL}"><span class="find-icon">${icon('mail')}</span><span><strong>E-mail</strong><small>${EMAIL}</small></span></a>
          <button class="pill pill-small pill-light copy-mail" data-magnetic>${icon('copy', 18)} <span>${esc(a.emailCopy)}</span></button>
        </div>
      </div>
    </section>

    <section class="section wrap">
      <button class="old-art" data-reveal="up" data-cursor="✦">
        <img src="${thumb('collage')}" alt="" loading="lazy" />
        <span class="hand">${esc(a.oldArt)}</span>
      </button>
    </section>`;
  },
  mount: (root) => {
    popLetters(root);
    const copy = $<HTMLButtonElement>('.copy-mail', root)!;
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(EMAIL);
        copy.querySelector('span')!.textContent = t().about.copied;
        if (!reducedMotion()) gsap.fromTo(copy, { scale: 0.85 }, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.35)' });
        setTimeout(() => (copy.querySelector('span')!.textContent = t().about.emailCopy), 1800);
      } catch {}
    });
    $('.old-art', root)!.addEventListener('click', () =>
      openLightbox([{ type: 'image', src: full('collage'), preview: thumb('collage'), title: t().about.oldArt, meta: 'Pokkie' }], 0),
    );
  },
};
