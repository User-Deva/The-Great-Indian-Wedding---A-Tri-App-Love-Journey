import { create } from 'zustand';
import { JannatSafariState, Honeymoon, DestinationCard, HoneymoonBooking, CityItinerary, HoneymoonWallet } from '../types';

export interface JannatSafariStoreActions {
  setHoneymoon: (honeymoon: Honeymoon) => void;
  setDestinations: (destinations: DestinationCard[]) => void;
  setBookings: (bookings: HoneymoonBooking[]) => void;
  addBooking: (booking: HoneymoonBooking) => void;
  removeBooking: (bookingId: string) => void;
  setItineraries: (itineraries: CityItinerary[]) => void;
  addItinerary: (itinerary: CityItinerary) => void;
  updateItinerary: (itineraryId: string, updates: Partial<CityItinerary>) => void;
  setWallet: (wallet: HoneymoonWallet) => void;
  updateWallet: (updates: Partial<HoneymoonWallet>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export type JannatSafariStore = JannatSafariState & JannatSafariStoreActions;

const initialState: JannatSafariState = {
  honeymoon: null,
  destinations: [],
  bookings: [],
  itineraries: [],
  wallet: null,
  isLoading: false,
  error: null,
};

export const useJannatSafariStore = create<JannatSafariStore>((set) => ({
  ...initialState,

  setHoneymoon: (honeymoon: Honeymoon) => {
    set({ honeymoon, error: null });
  },

  setDestinations: (destinations: DestinationCard[]) => {
    set({ destinations });
  },

  setBookings: (bookings: HoneymoonBooking[]) => {
    set({ bookings });
  },

  addBooking: (booking: HoneymoonBooking) => {
    set((state) => ({
      bookings: [...state.bookings, booking],
    }));
  },

  removeBooking: (bookingId: string) => {
    set((state) => ({
      bookings: state.bookings.filter((b) => b.id !== bookingId),
    }));
  },

  setItineraries: (itineraries: CityItinerary[]) => {
    set({ itineraries });
  },

  addItinerary: (itinerary: CityItinerary) => {
    set((state) => ({
      itineraries: [...state.itineraries, itinerary],
    }));
  },

  updateItinerary: (itineraryId: string, updates: Partial<CityItinerary>) => {
    set((state) => ({
      itineraries: state.itineraries.map((i) =>
        i.id === itineraryId ? { ...i, ...updates } : i
      ),
    }));
  },

  setWallet: (wallet: HoneymoonWallet) => {
    set({ wallet });
  },

  updateWallet: (updates: Partial<HoneymoonWallet>) => {
    set((state) => ({
      wallet: state.wallet ? { ...state.wallet, ...updates } : null,
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
