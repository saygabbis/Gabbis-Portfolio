import { defineConfig } from 'vite';

// SPA: em dev o Vite já devolve o index.html pra qualquer rota.
// Em produção o nginx precisa de `try_files $uri $uri/ /index.html;`.
export default defineConfig({
  server: { port: 5173 },
  build: { target: 'es2022', assetsInlineLimit: 0 },
});
