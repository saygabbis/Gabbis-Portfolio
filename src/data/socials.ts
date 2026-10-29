import type { IconName } from '../components/icons';

export interface Social {
  label: string;
  handle: string;
  url: string;
  icon: IconName;
  group: 'art' | 'code' | 'support';
  /** Chave de t().about.handleNote, pra marcar perfis alternativos. */
  note?: 'saypokkie';
}

export const EMAIL = 'saypokkiecontact@gmail.com';

export const socials: Social[] = [
  { label: 'Twitter / X', handle: '@saypokkie', url: 'https://twitter.com/saypokkie', icon: 'x', group: 'art', note: 'saypokkie' },
  { label: 'Instagram', handle: '@saypokkie', url: 'https://www.instagram.com/saypokkie/', icon: 'instagram', group: 'art', note: 'saypokkie' },
  { label: 'Patreon', handle: 'saypokkie', url: 'https://www.patreon.com/saypokkie', icon: 'patreon', group: 'art', note: 'saypokkie' },
  { label: 'GitHub', handle: 'saygabbis', url: 'https://github.com/saygabbis', icon: 'github', group: 'code' },
  { label: 'LivePix', handle: 'saypokkie', url: 'https://livepix.gg/saypokkie', icon: 'heart', group: 'support' },
];
