import type { L } from '../i18n';

export interface Tier {
  image: string;
  name: L;
  /** Preço base em reais e em dólar; a página mostra o do idioma atual. */
  brl: number;
  usd: number;
  perUnit?: boolean;
  includes: L[];
}

export const WAITLIST_URL = 'https://forms.gle/8YTev5UWsdMP9KNV8';

export const tiers: Tier[] = [
  {
    image: 'class1',
    name: { pt: 'Emote Doodle', en: 'Emote Doodle' },
    brl: 30,
    usd: 10,
    perUnit: true,
    includes: [
      { pt: 'Doodle simples', en: 'Simple doodle art' },
      { pt: 'Sem fundo', en: 'No background' },
      { pt: 'Poses simples (emojis vivos)', en: 'Simple poses (live emojis)' },
      { pt: 'Pintura básica', en: 'Basic painting' },
    ],
  },
  {
    image: 'class2',
    name: { pt: 'Ilustração simples', en: 'Simple illustration' },
    brl: 150,
    usd: 80,
    includes: [
      { pt: 'Ilustração de página inteira', en: 'Full-page illustration' },
      { pt: 'Um personagem', en: 'One character' },
      { pt: 'Fundo simples', en: 'Simple background' },
      { pt: 'Pintura com sombra e luz', en: 'Painting with shadows and lighting' },
    ],
  },
  {
    image: 'class3',
    name: { pt: 'Ilustração detalhada', en: 'Detailed illustration' },
    brl: 250,
    usd: 150,
    includes: [
      { pt: 'Ilustração de página inteira', en: 'Full-page illustration' },
      { pt: 'Um personagem', en: 'One character' },
      { pt: 'Fundo detalhado', en: 'Detailed background' },
      { pt: 'Vários elementos na cena', en: 'Multiple elements in scene' },
      { pt: 'Pintura detalhada com atmosfera', en: 'Detailed painting with atmosphere' },
    ],
  },
  {
    image: 'class4',
    name: { pt: 'Ilustração completa', en: 'Complete illustration' },
    brl: 400,
    usd: 250,
    includes: [
      { pt: 'Ilustração de página inteira', en: 'Full-page illustration' },
      { pt: 'Vários personagens', en: 'Multiple characters' },
      { pt: 'Fundo detalhado', en: 'Detailed background' },
      { pt: 'Arte altamente detalhada', en: 'Highly detailed artwork' },
      { pt: 'Pintura muito detalhada com atmosfera', en: 'Highly detailed painting with atmosphere' },
    ],
  },
];
