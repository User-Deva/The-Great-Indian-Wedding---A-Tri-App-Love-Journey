import { create } from 'zustand';
import { JourneyStage, THEME_MAP, ThemeTokens } from './types';

export interface ThemeStore {
  // State
  coupleId: string | null;
  journeyStage: JourneyStage;
  currentTheme: ThemeTokens;
  isLoading: boolean;
  error: string | null;

  // Actions
  setCouple: (coupleId: string) => void;
  setJourneyStage: (stage: JourneyStage) => void;
  getCurrentTheme: () => ThemeTokens;
  reset: () => void;
}

const defaultStage = JourneyStage.SEEKING;

export const useThemeStore = create<ThemeStore>((set, get) => ({
  // Initial state
  coupleId: null,
  journeyStage: defaultStage,
  currentTheme: THEME_MAP[defaultStage],
  isLoading: false,
  error: null,

  // Actions
  setCouple: (coupleId: string) => {
    set({ coupleId });
  },

  setJourneyStage: (stage: JourneyStage) => {
    set({
      journeyStage: stage,
      currentTheme: THEME_MAP[stage],
    });

    // Trigger confetti or celebration animation on stage change
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('themeChanged', {
          detail: { stage, theme: THEME_MAP[stage] },
        })
      );
    }
  },

  getCurrentTheme: () => {
    const { journeyStage } = get();
    return THEME_MAP[journeyStage];
  },

  reset: () => {
    set({
      coupleId: null,
      journeyStage: defaultStage,
      currentTheme: THEME_MAP[defaultStage],
      error: null,
    });
  },
}));
