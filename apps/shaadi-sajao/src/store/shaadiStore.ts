import { create } from 'zustand';
import { ShaadaiSajaoState, Wedding, Vendor, VendorBooking, GuestListEntry, BudgetCategory } from '../types';

export interface ShaadaiSajaoStoreActions {
  setWedding: (wedding: Wedding) => void;
  setVendors: (vendors: Vendor[]) => void;
  setVendorBookings: (bookings: VendorBooking[]) => void;
  addVendorBooking: (booking: VendorBooking) => void;
  removeVendorBooking: (bookingId: string) => void;
  setGuestList: (guests: GuestListEntry[]) => void;
  addGuest: (guest: GuestListEntry) => void;
  updateGuest: (guestId: string, guest: Partial<GuestListEntry>) => void;
  removeGuest: (guestId: string) => void;
  setBudgetCategories: (categories: BudgetCategory[]) => void;
  updateBudgetCategory: (categoryId: string, updates: Partial<BudgetCategory>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export type ShaadaiSajaoStore = ShaadaiSajaoState & ShaadaiSajaoStoreActions;

const initialState: ShaadaiSajaoState = {
  wedding: null,
  vendors: [],
  vendorBookings: [],
  guestList: [],
  budgetCategories: [],
  isLoading: false,
  error: null,
};

export const useShaadaiSajaoStore = create<ShaadaiSajaoStore>((set) => ({
  ...initialState,

  setWedding: (wedding: Wedding) => {
    set({ wedding, error: null });
  },

  setVendors: (vendors: Vendor[]) => {
    set({ vendors });
  },

  setVendorBookings: (bookings: VendorBooking[]) => {
    set({ vendorBookings: bookings });
  },

  addVendorBooking: (booking: VendorBooking) => {
    set((state) => ({
      vendorBookings: [...state.vendorBookings, booking],
    }));
  },

  removeVendorBooking: (bookingId: string) => {
    set((state) => ({
      vendorBookings: state.vendorBookings.filter((b) => b.id !== bookingId),
    }));
  },

  setGuestList: (guests: GuestListEntry[]) => {
    set({ guestList: guests });
  },

  addGuest: (guest: GuestListEntry) => {
    set((state) => ({
      guestList: [...state.guestList, guest],
    }));
  },

  updateGuest: (guestId: string, updates: Partial<GuestListEntry>) => {
    set((state) => ({
      guestList: state.guestList.map((g) =>
        g.id === guestId ? { ...g, ...updates } : g
      ),
    }));
  },

  removeGuest: (guestId: string) => {
    set((state) => ({
      guestList: state.guestList.filter((g) => g.id !== guestId),
    }));
  },

  setBudgetCategories: (categories: BudgetCategory[]) => {
    set({ budgetCategories: categories });
  },

  updateBudgetCategory: (categoryId: string, updates: Partial<BudgetCategory>) => {
    set((state) => ({
      budgetCategories: state.budgetCategories.map((c) =>
        c.id === categoryId ? { ...c, ...updates } : c
      ),
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
