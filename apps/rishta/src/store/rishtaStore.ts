import { create } from 'zustand';
import { RishtaState, UserProfile, Match, DateSuggestion } from '../types';

export interface RishtaStoreActions {
  setUserProfile: (profile: UserProfile) => void;
  setMatches: (matches: Match[]) => void;
  setCurrentMatch: (match: Match | null) => void;
  setDateSuggestion: (suggestion: DateSuggestion | null) => void;
  addMatch: (match: Match) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export type RishtaStore = RishtaState & RishtaStoreActions;

const initialState: RishtaState = {
  userProfile: null,
  matches: [],
  currentMatch: null,
  dateSuggestion: null,
  isLoading: false,
  error: null,
};

export const useRishtaStore = create<RishtaStore>((set) => ({
  ...initialState,

  setUserProfile: (profile: UserProfile) => {
    set({ userProfile: profile, error: null });
  },

  setMatches: (matches: Match[]) => {
    set({ matches, error: null });
  },

  setCurrentMatch: (match: Match | null) => {
    set({ currentMatch: match });
  },

  setDateSuggestion: (suggestion: DateSuggestion | null) => {
    set({ dateSuggestion: suggestion });
  },

  addMatch: (match: Match) => {
    set((state) => ({
      matches: [match, ...state.matches],
    }));
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  reset: () => {
    set(initialState);
  },
}));
