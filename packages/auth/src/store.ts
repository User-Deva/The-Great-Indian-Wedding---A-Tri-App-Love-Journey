import { create } from 'zustand';
import { AuthUser, AuthState } from './types';

export interface AuthStore extends AuthState {
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,

  setUser: (user: AuthUser | null) => {
    set({
      user,
      isAuthenticated: user !== null,
      error: null,
    });
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },

  reset: () => {
    set({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,
    });
  },
}));
