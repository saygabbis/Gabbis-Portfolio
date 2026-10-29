import sizes from './media-sizes.json';

export type ArtCategory = 'personal' | 'herotime' | 'ben10' | 'commissions' | 'caruzo' | 'missao' | 'ui';

export interface Art {
  /** Caminho do arquivo dentro de media-src/img, sem extensão. */
  id: string;
  title: string;
  /** AAAA-MM-DD */
  date: string;
  cat: ArtCategory;
  /** Aparece nos favoritos da página inicial. */
  featured?: boolean;
}

/** Ordem das categorias nos filtros. */
export const categories: ArtCategory[] = ['personal', 'herotime', 'ben10', 'commissions', 'caruzo', 'missao', 'ui'];

// Pra adicionar uma arte: coloque o original em media-src/img, rode `npm run media` e adicione uma linha aqui.
export const art: Art[] = [
  { id: '001', title: 'Ustike Sunrise', date: '2024-12-21', cat: 'personal', featured: true },
  { id: '01', title: 'Ustike', date: '2024-09-05', cat: 'personal', featured: true },
  { id: '15', title: 'Pokkie and Capybara', date: '2024-01-31', cat: 'personal' },
  { id: '14', title: 'Blondie pushing Blindy off', date: '2024-01-27', cat: 'personal' },
  { id: '13', title: 'Kobeni and the Oven', date: '2024-01-17', cat: 'personal', featured: true },
  { id: '12', title: 'Misty & Ash cooking a Zubat', date: '2024-01-08', cat: 'personal' },
  { id: '11', title: 'Gawr Gura Fishing', date: '2024-01-04', cat: 'personal', featured: true },
  { id: '10', title: 'Maddy & Baddy', date: '2023-12-31', cat: 'personal', featured: true },
  { id: '8', title: 'Sukuna and Satoru fans Tears', date: '2023-12-29', cat: 'personal' },
  { id: '9', title: 'Pokkie in the Christmas', date: '2023-12-25', cat: 'personal' },
  { id: '7.0', title: 'Christmas Anya 1', date: '2023-12-24', cat: 'personal' },
  { id: '7', title: 'Christmas Anya 2', date: '2023-12-24', cat: 'personal' },
  { id: '6', title: "Bocchi The Rocckin'", date: '2023-12-18', cat: 'personal', featured: true },
  { id: '5', title: 'Mihoyo - Ayanami Picture', date: '2023-11-06', cat: 'personal' },
  { id: '4', title: 'Meowscarada steals Camera', date: '2023-09-28', cat: 'personal' },
  { id: '2', title: 'Celeste - The Summit', date: '2023-09-24', cat: 'personal', featured: true },
  { id: '16', title: 'Hakuji Akaza Hugs Koyuki', date: '2023-09-15', cat: 'personal' },
  { id: '3', title: 'Kibutsuji', date: '2023-09-11', cat: 'personal' },
  { id: '1', title: 'DotZack', date: '2023-03-23', cat: 'personal' },
  { id: 'omniverse', title: 'Omniversal', date: '2021-04-30', cat: 'personal' },

  { id: 'herotime/lobisben', title: 'Blitzwolfer', date: '2024-05-27', cat: 'herotime' },
  { id: 'herotime/cipo', title: 'Wildvine', date: '2024-05-27', cat: 'herotime' },
  { id: 'herotime/benio', title: 'Ben Tennyson', date: '2024-05-23', cat: 'herotime', featured: true },
  { id: 'herotime/clone', title: 'Ditto', date: '2024-05-21', cat: 'herotime' },
  { id: 'herotime/bala', title: 'Cannonbolt', date: '2024-05-20', cat: 'herotime' },
  { id: 'herotime/iguana', title: 'Arctiguana', date: '2024-05-19', cat: 'herotime' },
  { id: 'herotime/chocante', title: 'Buzzshock', date: '2024-05-19', cat: 'herotime' },
  { id: 'herotime/chama', title: 'Heatblast', date: '2024-05-13', cat: 'herotime' },

  { id: 'herotime/magia', title: 'Masters of Magic', date: '2022-07-10', cat: 'ben10' },
  { id: 'herotime/classico', title: 'Ben and Ten', date: '2022-01-08', cat: 'ben10' },
  { id: 'herotime/wildvine23', title: 'Ben 23 - Wildvine', date: '2022-01-03', cat: 'ben10' },
  { id: 'herotime/clone23', title: 'Ben 23 - Ditto', date: '2021-12-30', cat: 'ben10' },
  { id: 'herotime/ben23', title: 'Ben 23 - Wallpaper', date: '2021-12-29', cat: 'ben10' },
  { id: 'herotime/lobisbao', title: 'Blitzwolfer at Night', date: '2021-10-08', cat: 'ben10' },

  { id: 'commspay3', title: 'Paylin Commission 3', date: '2024-08-03', cat: 'commissions' },
  { id: 'commspay3v2', title: 'Paylin Commission 3.2', date: '2024-08-03', cat: 'commissions' },
  { id: 'commspay4', title: 'Paylin Commission 4', date: '2024-08-03', cat: 'commissions' },
  { id: 'commspay1', title: 'Paylin Commission 1', date: '2024-07-24', cat: 'commissions' },
  { id: 'commspay2', title: 'Paylin Commission 2', date: '2024-07-24', cat: 'commissions' },
  { id: 'commspay2v2', title: 'Paylin Commission 2.2', date: '2024-07-24', cat: 'commissions' },
  { id: 'cthumb1', title: 'Paylin Thumbnail', date: '2024-07-04', cat: 'commissions' },
  { id: 'comms/comms3', title: "Ghaell's Family", date: '2023-12-21', cat: 'commissions' },
  { id: 'comms/comms1', title: 'Ghaell the Duck', date: '2023-12-18', cat: 'commissions' },
  { id: 'comms/comms2', title: 'Ghaell the Duck with hat', date: '2023-12-18', cat: 'commissions' },

  { id: 'macacaruzo1', title: 'Golden Caruzo of the 7 mistakes', date: '2024-04-13', cat: 'caruzo' },
  { id: 'macacaruzo2', title: 'Caruzo on the vine', date: '2024-04-13', cat: 'caruzo' },

  { id: 'missao', title: 'Missão Verde - Board Box', date: '2024-05-13', cat: 'missao' },
  { id: 'simbolos', title: 'Missão Verde - Symbols', date: '2024-04-17', cat: 'missao' },

  { id: 'centro1', title: 'Memory Center - Main Screen', date: '2023-08-27', cat: 'ui' },
  { id: 'centro3', title: 'Memory Center - Main Screen Dark', date: '2023-08-27', cat: 'ui' },
  { id: 'centro2', title: 'Memory Center - Files', date: '2023-08-29', cat: 'ui' },
];

const sizeMap = sizes as Record<string, { w: number; h: number }>;

export const thumb = (id: string) => `/media/art/thumb/${id}.webp`;
export const full = (id: string) => `/media/art/full/${id}.webp`;
/** Proporção largura/altura, pra reservar o espaço antes da imagem carregar. */
export const ratio = (id: string) => {
  const s = sizeMap[id];
  return s ? s.w / s.h : 1;
};
