import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';

import { renderFooter } from './components/footer';
import { markActive, mountHeader, renderHeader } from './components/header';
import { $ } from './core/dom';
import { clickSparkles, enhance } from './core/motion';
import { currentRoute, refresh, startRouter, type Page } from './core/router';
import { onLangChange, t } from './i18n';
import { aboutPage } from './pages/about';
import { artPage } from './pages/art';
import { codePage } from './pages/code';
import { home } from './pages/home';
import { motionPage } from './pages/motion';
import { notFound } from './pages/not-found';
import { shopPage } from './pages/shop';

const app = $('#app')!;
app.innerHTML = `<div id="header-slot"></div><main id="main" tabindex="-1"></main><div id="footer-slot"></div>`;
const headerSlot = $('#header-slot')!;
const main = $('#main')!;
const footerSlot = $('#footer-slot')!;

let cleanup: Array<() => void> = [];

function drawHeader() {
  headerSlot.innerHTML = renderHeader();
  mountHeader(headerSlot);
  markActive(currentRoute());
  $('.skip')!.textContent = t().nav.skip;
}

function swap(page: Page, path: string) {
  cleanup.forEach((fn) => fn());
  cleanup = [];
  main.innerHTML = page.render();
  document.title = page.title();
  markActive(path);
  cleanup.push(enhance(main));
  const off = page.mount?.(main);
  if (off) cleanup.push(off);
  // o rodapé também tem animações de entrada; reinicia junto com a página
  footerSlot.innerHTML = renderFooter();
  cleanup.push(enhance(footerSlot));
}

drawHeader();
startRouter(
  {
    '/': home,
    '/art': artPage,
    '/motion': motionPage,
    '/code': codePage,
    '/commissions': shopPage,
    '/about': aboutPage,
  },
  notFound,
  { swap },
);

onLangChange(() => {
  drawHeader();
  refresh();
});

clickSparkles();
