# Gabbis-Portfolio

Portfolio da Gabbis (SayGabbis): artes, motion & edição, projetos de código e comissões.
Site em PT/EN, com modo claro/escuro e bastante animação. No ar em [saygabbis.cloud](https://saygabbis.cloud).

**Stack:** Vite + TypeScript puro (sem framework), GSAP pras animações, `sharp` + `ffmpeg` pra otimizar as mídias.

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/ (checa os tipos antes)
npm run preview  # serve o dist/ localmente
```

## Organização

```
src/
  main.ts            monta o site e as rotas
  core/              roteador + cortina de transição, animações, tema, lightbox
  components/        cabeçalho, rodapé, faixa rolando, ícones, figurinhas, galeria
  pages/             uma por página (home, art, motion, code, shop, about, 404)
  data/              conteúdo: artes, vídeos, projetos, preços, redes sociais
  i18n/              textos em português (pt.ts) e inglês (en.ts)
  styles/            tokens (cores/fontes), base, layout, componentes, páginas
public/media/        artes e vídeos já otimizados (gerados pelo script)
scripts/             optimize-media.mjs
media-src/           originais pesados (fora do git)
```

## Adicionando conteúdo

- **Arte nova:** coloque o original em `media-src/img/`, rode `npm run media` e adicione uma linha em `src/data/art.ts` (o `id` é o caminho do arquivo sem extensão). `featured: true` coloca ela nos favoritos da página inicial.
- **Vídeo novo:** coloque em `media-src/motion/` (mp4, mov ou gif), rode `npm run media` e adicione em `src/data/motion.ts`.
- **Projeto de código:** edite `src/data/projects.ts`.
- **Preços e textos:** `src/data/shop.ts` e `src/i18n/`.
- **Cores:** `src/styles/tokens.css` (tem a paleta do modo claro e do escuro).

## Deploy (VPS)

O nginx serve `/var/www/saygabbis`. Como é uma SPA, o bloco `location /` precisa de:

```nginx
try_files $uri $uri/ /index.html;
```

Depois é só `npm run build` e copiar o conteúdo de `dist/` pra `/var/www/saygabbis`.
