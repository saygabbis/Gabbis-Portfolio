import type { L } from '../i18n';

export interface Video {
  /** Nome do arquivo em public/media/motion (sem extensão); o poster é o .webp de mesmo nome. */
  id: string;
  title: string;
  kind: L;
  text: L;
  tools: string[];
}

// Pra adicionar um vídeo: coloque o original em media-src/motion, rode `npm run media` e adicione aqui.
export const videos: Video[] = [
  {
    id: 'celeste',
    title: 'Celeste',
    kind: { pt: 'Capa animada', en: 'Animated cover' },
    text: { pt: 'Madeline e Badeline abraçando o coração, ganhando vida em loop.', en: 'Madeline and Badeline hugging the heart, brought to life on loop.' },
    tools: ['After Effects'],
  },
  {
    id: 'stardew',
    title: 'Stardew Valley',
    kind: { pt: 'Capa animada', en: 'Animated cover' },
    text: { pt: 'A casinha da fazenda debaixo da lua cheia, com estrelas piscando.', en: 'The little farmhouse under a full moon, with twinkling stars.' },
    tools: ['After Effects'],
  },
  {
    id: 'undertale',
    title: 'Undertale',
    kind: { pt: 'Capa animada', en: 'Animated cover' },
    text: { pt: 'A queda nas flores douradas, com o coração brilhando.', en: 'The fall into the golden flowers, with a glowing heart.' },
    tools: ['After Effects'],
  },
];

export const videoSrc = (id: string) => `/media/motion/${id}.mp4`;
export const posterSrc = (id: string) => `/media/motion/${id}.webp`;
