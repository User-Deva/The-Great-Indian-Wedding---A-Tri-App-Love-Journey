import { create } from 'zustand';
import { TimelineEvent, CoupleProfile, OurStoryMemory, OurStoryGallery } from './types';

export interface OurStoryStoreState {
  coupleId: string | null;
  coupleProfile: CoupleProfile | null;
  timeline: TimelineEvent[];
  memories: OurStoryMemory[];
  gallery: OurStoryGallery | null;
  isLoading: boolean;
  error: string | null;
}

export interface OurStoryStoreActions {
  setCouple: (coupleId: string) => void;
  setCoupleProfile: (profile: CoupleProfile) => void;
  setTimeline: (events: TimelineEvent[]) => void;
  addTimelineEvent: (event: TimelineEvent) => void;
  setMemories: (memories: OurStoryMemory[]) => void;
  addMemory: (memory: OurStoryMemory) => void;
  removeMemory: (memoryId: string) => void;
  updateMemory: (memoryId: string, updates: Partial<OurStoryMemory>) => void;
  setGallery: (gallery: OurStoryGallery) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export type OurStoryStore = OurStoryStoreState & OurStoryStoreActions;

const initialState: OurStoryStoreState = {
  coupleId: null,
  coupleProfile: null,
  timeline: [],
  memories: [],
  gallery: null,
  isLoading: false,
  error: null,
};

export const useOurStoryStore = create<OurStoryStore>((set) => ({
  ...initialState,

  setCouple: (coupleId: string) => {
    set({ coupleId });
  },

  setCoupleProfile: (profile: CoupleProfile) => {
    set({ coupleProfile: profile });
  },

  setTimeline: (events: TimelineEvent[]) => {
    set({ timeline: events.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()) });
  },

  addTimelineEvent: (event: TimelineEvent) => {
    set((state) => ({
      timeline: [...state.timeline, event].sort(
        (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
      ),
    }));
  },

  setMemories: (memories: OurStoryMemory[]) => {
    set({ memories });
  },

  addMemory: (memory: OurStoryMemory) => {
    set((state) => ({
      memories: [...state.memories, memory],
    }));
  },

  removeMemory: (memoryId: string) => {
    set((state) => ({
      memories: state.memories.filter((m) => m.id !== memoryId),
    }));
  },

  updateMemory: (memoryId: string, updates: Partial<OurStoryMemory>) => {
    set((state) => ({
      memories: state.memories.map((m) =>
        m.id === memoryId ? { ...m, ...updates } : m
      ),
    }));
  },

  setGallery: (gallery: OurStoryGallery) => {
    set({ gallery });
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
