import type { L } from '../i18n';

export interface Project {
  name: string;
  emoji: string;
  /** Cor do card (variável CSS do tema). */
  color: 'crimson' | 'sky' | 'orchid';
  status: 'live' | 'wip' | 'active';
  text: L;
  stack: string[];
  repo?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    name: 'TetOS',
    emoji: '🥖',
    color: 'crimson',
    status: 'active',
    text: {
      pt: 'A Teto: minha assistente no WhatsApp, com memória de longo prazo, visão, lembretes, busca na web e uma personalidade bem dela.',
      en: 'Teto: my WhatsApp assistant, with long-term memory, vision, reminders, web search and a personality all her own.',
    },
    stack: ['Node.js', 'Express', 'Baileys', 'IA'],
    repo: 'https://github.com/saygabbis/TetOS',
  },
  {
    name: 'DailyWays',
    emoji: '🗂️',
    color: 'sky',
    status: 'live',
    text: {
      pt: 'App de produtividade visual: quadros kanban, tarefas recorrentes, "Meu Dia", whiteboard infinito e colaboração em tempo real.',
      en: 'Visual productivity app: kanban boards, recurring tasks, "My Day", an infinite whiteboard and real-time collaboration.',
    },
    stack: ['React', 'Vite', 'Supabase', 'Socket.io'],
    repo: 'https://github.com/saygabbis/DailyWays',
    live: 'https://dailyways.saygabbis.cloud',
  },
  {
    name: 'EVEREST',
    emoji: '🏔️',
    color: 'orchid',
    status: 'wip',
    text: {
      pt: 'Rede e ecossistema de plugins de Minecraft focados no Brasil: minigames, PvP 1.8, survival e sistemas modulares.',
      en: 'A Brazil-focused Minecraft network and plugin ecosystem: minigames, 1.8 PvP, survival and modular systems.',
    },
    stack: ['Java', 'Spigot', 'Velocity'],
    repo: 'https://github.com/saygabbis/Everest',
  },
  {
    name: 'StepByStep',
    emoji: '👣',
    color: 'crimson',
    status: 'wip',
    text: {
      pt: 'Mod de qualidade de vida pra Minecraft, feito pra rodar em vários loaders (Fabric, NeoForge e Forge) e várias versões.',
      en: 'A Minecraft quality-of-life mod built to run on multiple loaders (Fabric, NeoForge and Forge) and versions.',
    },
    stack: ['Java', 'Fabric', 'NeoForge', 'Forge'],
    repo: 'https://github.com/saygabbis/StepByStep',
  },
];
