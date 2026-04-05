export enum JourneyStage {
  SEEKING = 'SEEKING',
  MATCHED = 'MATCHED',
  DATE_SET = 'DATE_SET',
  DATING = 'DATING',
  WEDDING = 'WEDDING',
  HONEYMOONING = 'HONEYMOONING',
}

export interface ThemeTokens {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  motif: string;
  vibe: string;
}

export const THEME_MAP: Record<JourneyStage, ThemeTokens> = {
  [JourneyStage.SEEKING]: {
    name: 'Mehendi Morning',
    colors: {
      primary: '#8FAF7E',      // Sage green
      secondary: '#FFFFF0',    // Ivory
      accent: '#D4AF37',       // Gold
    },
    motif: 'Henna patterns',
    vibe: 'Hopeful, fresh',
  },
  [JourneyStage.MATCHED]: {
    name: 'Gulabi Romance',
    colors: {
      primary: '#F4A7B9',      // Rose pink
      secondary: '#F8D5CC',    // Blush
      accent: '#F7E7CE',       // Champagne
    },
    motif: 'Marigold garlands',
    vibe: 'Excitement, butterflies',
  },
  [JourneyStage.DATE_SET]: {
    name: 'Jasmine Evenings',
    colors: {
      primary: '#C2185B',      // Deep magenta
      secondary: '#FF8F00',    // Saffron
      accent: '#FFF8E1',       // Cream
    },
    motif: 'Jasmine vines',
    vibe: 'Romantic, warm',
  },
  [JourneyStage.DATING]: {
    name: 'Shaadi Season',
    colors: {
      primary: '#B71C1C',      // Royal red
      secondary: '#D4AF37',    // Gold
      accent: '#FFFFF0',       // Ivory
    },
    motif: 'Paisley & diyas',
    vibe: 'Celebratory, grand',
  },
  [JourneyStage.WEDDING]: {
    name: 'Baraat Bliss',
    colors: {
      primary: '#6A1429',      // Deep maroon
      secondary: '#FF8F00',    // Marigold
      accent: '#C0C0C0',       // Silver
    },
    motif: 'Elephants & flowers',
    vibe: 'Joyful, festive',
  },
  [JourneyStage.HONEYMOONING]: {
    name: 'Honeymoon Haze',
    colors: {
      primary: '#00695C',      // Teal
      secondary: '#FF7043',    // Coral
      accent: '#FFD54F',       // Golden sand
    },
    motif: 'Lotus & waves',
    vibe: 'Dreamy, luxurious',
  },
};

export interface Milestone {
  id: string;
  coupleId: string;
  stage: JourneyStage;
  timestamp: Date;
  details: Record<string, any>;
}
