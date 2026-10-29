import { gsap } from 'gsap';
import { icon } from '../components/icons';
import { sticker } from '../components/stickers';
import { $, $$, each, esc, reducedMotion } from '../core/dom';
import { openLightbox } from '../core/lightbox';
import { popLetters } from '../core/motion';
import type { Page } from '../core/router';
import { full, thumb } from '../data/art';
import { tiers, WAITLIST_URL } from '../data/shop';
import { lang, t, tr } from '../i18n';

const price = (brl: number, usd: number) => (lang() === 'pt' ? `R$ ${brl}` : `$${usd}`);

export const shopPage: Page = {
  title: () => t().meta.shop,
  render: () => {
    const s = t().shop;
    return `
    <section class="page-head wrap">
      <span class="status-pill" data-reveal="pop"><i></i>${esc(s.status)}</span>
      <h1 class="page-title" data-split>${esc(s.title)}</h1>
      <p class="page-sub" data-reveal="up">${esc(s.sub)}</p>
    </section>

    <section class="wrap">
      <div class="tier-grid" data-stagger>
        ${each(
          tiers,
          (tier, i) => `
          <article class="tier tier-${['crimson', 'sky', 'orchid', 'crimson'][i]}" data-reveal="pop" data-tilt="5">
            <button class="tier-img" data-tier="${i}" data-cursor="✦" aria-label="${esc(tr(tier.name))}">
              <img src="${thumb(tier.image)}" alt="" loading="lazy" />
            </button>
            <h2>${esc(tr(tier.name))}</h2>
            <p class="tier-price"><small>${esc(s.basePrice)}</small> ${price(tier.brl, tier.usd)}${tier.perUnit ? ` <small>${esc(s.perUnit)}</small>` : ''}</p>
            <ul class="checks">${each(tier.includes, (inc) => `<li>${esc(tr(inc))}</li>`)}</ul>
          </article>`,
        )}
      </div>
      <p class="disclaimer" data-reveal="up">${esc(s.disclaimer)}</p>
    </section>

    <section class="section wrap">
      <h2 class="section-title" data-reveal="up">${esc(s.processTitle)}</h2>
      <ol class="steps" data-stagger>
        ${each(s.process, (p, i) => `<li class="step" data-reveal="up"><span class="step-n">${i + 1}</span><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p></li>`)}
      </ol>
      <div class="pay-card" data-reveal="up">
        ${sticker('heart', 'pay-sticker')}
        <h3>${esc(s.paymentTitle)}</h3>
        <ul class="checks">${each(s.payment, (p) => `<li>${esc(p)}</li>`)}</ul>
      </div>
    </section>

    <section class="section wrap two-col">
      <div>
        <h2 class="section-title" data-reveal="up">${esc(s.faqTitle)}</h2>
        <div class="accordion" data-stagger>
          ${each(s.faq, (f) => `<details data-reveal="up"><summary>${esc(f.q)}<span class="acc-icon">${icon('plus', 18)}</span></summary><div class="acc-body"><p>${esc(f.a)}</p></div></details>`)}
        </div>
      </div>
      <div id="terms">
        <h2 class="section-title" data-reveal="up">${esc(s.termsTitle)}</h2>
        <p class="terms-intro" data-reveal="up">${esc(s.termsIntro)}</p>
        <div class="accordion" data-stagger>
          ${each(s.terms, (term) => `<details data-reveal="up"><summary>${esc(term.t)}<span class="acc-icon">${icon('plus', 18)}</span></summary><div class="acc-body"><p>${esc(term.d)}</p></div></details>`)}
        </div>
        <label class="agree" data-reveal="up"><input type="checkbox" id="agree" /> <span>${esc(s.agree)}</span></label>
        <a class="btn btn-crimson btn-big waitlist" href="${WAITLIST_URL}" target="_blank" rel="noopener" aria-disabled="true" data-magnetic>${esc(s.waitlist)} ${icon('external')}</a>
      </div>
    </section>`;
  },
  mount: (root) => {
    popLetters(root);

    $$('[data-tier]', root).forEach((btn) =>
      btn.addEventListener('click', () => {
        const items = tiers.map((tier) => ({
          type: 'image' as const,
          src: full(tier.image),
          preview: thumb(tier.image),
          title: tr(tier.name),
          meta: price(tier.brl, tier.usd),
        }));
        openLightbox(items, Number(btn.dataset.tier));
      }),
    );

    // acordeão abrindo com animação de altura
    $$<HTMLDetailsElement>('details', root).forEach((d) => {
      const summary = d.querySelector('summary')!;
      const body = d.querySelector<HTMLElement>('.acc-body')!;
      summary.addEventListener('click', (e) => {
        if (reducedMotion()) return;
        e.preventDefault();
        if (d.open) {
          gsap.to(body, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => void (d.open = false) });
          d.classList.remove('is-open');
        } else {
          d.open = true;
          d.classList.add('is-open');
          gsap.fromTo(body, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.45, ease: 'back.out(1.4)' });
        }
      });
    });

    // o botão da lista de espera só libera depois de aceitar os termos
    const agree = $<HTMLInputElement>('#agree', root)!;
    const btn = $<HTMLAnchorElement>('.waitlist', root)!;
    const sync = () => btn.setAttribute('aria-disabled', String(!agree.checked));
    agree.addEventListener('change', () => {
      sync();
      if (agree.checked && !reducedMotion()) gsap.fromTo(btn, { scale: 0.9, rotate: -3 }, { scale: 1, rotate: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
    btn.addEventListener('click', (e) => {
      if (agree.checked) return;
      e.preventDefault();
      if (!reducedMotion()) gsap.fromTo('.agree', { x: -10 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.25)' });
      agree.focus();
    });
  },
};
