export enum VarmalPackageType {
  ROKA = 'Roka',
  SANGEET = 'Sangeet',
  SAAT_PHERE = 'Saat Phere',
  MAHARAJA = 'Maharaja',
}

export const PACKAGE_DETAILS: Record<VarmalPackageType, { minPrice: number; maxPrice: number; days: number }> = {
  [VarmalPackageType.ROKA]: { minPrice: 25000, maxPrice: 75000, days: 1 },
  [VarmalPackageType.SANGEET]: { minPrice: 100000, maxPrice: 300000, days: 2 },
  [VarmalPackageType.SAAT_PHERE]: { minPrice: 300000, maxPrice: 1000000, days: 5 },
  [VarmalPackageType.MAHARAJA]: { minPrice: 1000000, maxPrice: 10000000, days: 7 },
};

export enum Religion {
  HINDU = 'Hindu',
  MUSLIM = 'Muslim',
  SIKH = 'Sikh',
  CHRISTIAN = 'Christian',
  JAIN = 'Jain',
  BUDDHIST = 'Buddhist',
}

export enum VendorCategory {
  DECORATOR = 'Decorator',
  CATERER = 'Caterer',
  PHOTOGRAPHER = 'Photographer',
  MEHENDI = 'Mehendi Artist',
  PRIEST = 'Priest/Officiant',
  MUSICIAN = 'Musician/DJ',
  MAKEUP = 'Makeup Artist',
  CHOREOGRAPHER = 'Choreographer',
}

export interface Wedding {
  id: string;
  coupleId: string;
  weddingDate: Date;
  weddingVenue: string;
  packageType: VarmalPackageType;
  religion: Religion;
  budgetTotal: number;
  budgetSpent: number;
  themeName: string;
  themeDescription?: string;
  guestCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GuestListEntry {
  id: string;
  weddingId: string;
  name: string;
  email?: string;
  phone?: string;
  dietaryPreference: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'jain';
  rsvpStatus: 'pending' | 'accepted' | 'declined';
  plusOneCount: number; // Number of additional guests
  seatingPreference?: string;
}

export interface WeddingRitual {
  id: string;
  weddingId: string;
  name: string; // Mehendi, Sangeet, Haldi, etc.
  date: Date;
  time?: string;
  location?: string;
  vendorIds: string[];
  budget: number;
  notes?: string;
  completed: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  city: string;
  rating: number; // 0-5
  reviewCount: number;
  contactEmail?: string;
  contactPhone?: string;
  portfolioUrl?: string;
  priceRange: string; // e.g., "₹50K - ₹200K"
  availabilityStart?: Date;
  availabilityEnd?: Date;
  varmalVerified: boolean;
  description?: string;
  imageUrl?: string;
}

export interface VendorBooking {
  id: string;
  weddingId: string;
  vendorId: string;
  vendor?: Vendor;
  bookingDate: Date;
  depositAmount: number;
  depositPaid: boolean;
  totalAmount?: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

export interface BudgetCategory {
  id: string;
  weddingId: string;
  category: 'decoration' | 'catering' | 'photography' | 'outfits' | 'transportation' | 'invitations' | 'other';
  budgetAllocated: number;
  budgetSpent: number;
  description?: string;
}

export interface Ritual {
  id: string;
  religion: Religion;
  name: string; // Mehendi, Sangeet, Haldi, Baraat, Pheras, Reception, etc.
  description: string;
  dayOffset: number; // Days before/after wedding date
  duration: number; // Hours
  typicalVendors: VendorCategory[];
}

export const HINDU_RITUALS: Ritual[] = [
  {
    id: 'hindu-mehendi',
    religion: Religion.HINDU,
    name: 'Mehendi',
    description: 'Henna application ceremony, typically 2 days before wedding',
    dayOffset: -2,
    duration: 6,
    typicalVendors: [VendorCategory.MEHENDI, VendorCategory.CATERER, VendorCategory.MUSICIAN],
  },
  {
    id: 'hindu-sangeet',
    religion: Religion.HINDU,
    name: 'Sangeet',
    description: 'Music and dance celebration',
    dayOffset: -1,
    duration: 4,
    typicalVendors: [VendorCategory.MUSICIAN, VendorCategory.CATERER, VendorCategory.CHOREOGRAPHER],
  },
  {
    id: 'hindu-haldi',
    religion: Religion.HINDU,
    name: 'Haldi',
    description: 'Turmeric paste ceremony, morning of wedding',
    dayOffset: 0,
    duration: 2,
    typicalVendors: [VendorCategory.MAKEUP, VendorCategory.PHOTOGRAPHER],
  },
  {
    id: 'hindu-baraat',
    religion: Religion.HINDU,
    name: 'Baraat',
    description: 'Groom procession to wedding venue',
    dayOffset: 0,
    duration: 2,
    typicalVendors: [VendorCategory.MUSICIAN, VendorCategory.PHOTOGRAPHER],
  },
  {
    id: 'hindu-pheras',
    religion: Religion.HINDU,
    name: 'Saat Phere',
    description: 'Seven ceremonial rounds around the fire',
    dayOffset: 0,
    duration: 1,
    typicalVendors: [VendorCategory.PRIEST, VendorCategory.PHOTOGRAPHER],
  },
  {
    id: 'hindu-reception',
    religion: Religion.HINDU,
    name: 'Reception',
    description: 'Post-wedding celebration with guests',
    dayOffset: 0,
    duration: 4,
    typicalVendors: [VendorCategory.CATERER, VendorCategory.MUSICIAN, VendorCategory.PHOTOGRAPHER],
  },
];

export const MUSLIM_RITUALS: Ritual[] = [
  {
    id: 'muslim-mehndi',
    religion: Religion.MUSLIM,
    name: 'Mehndi',
    description: 'Henna application and celebration',
    dayOffset: -1,
    duration: 4,
    typicalVendors: [VendorCategory.MEHENDI, VendorCategory.CATERER, VendorCategory.MUSICIAN],
  },
  {
    id: 'muslim-baraat',
    religion: Religion.MUSLIM,
    name: 'Baraat',
    description: 'Groom procession',
    dayOffset: 0,
    duration: 2,
    typicalVendors: [VendorCategory.MUSICIAN, VendorCategory.PHOTOGRAPHER],
  },
  {
    id: 'muslim-nikah',
    religion: Religion.MUSLIM,
    name: 'Nikah',
    description: 'Islamic marriage contract ceremony',
    dayOffset: 0,
    duration: 1,
    typicalVendors: [VendorCategory.PRIEST, VendorCategory.PHOTOGRAPHER],
  },
  {
    id: 'muslim-walima',
    religion: Religion.MUSLIM,
    name: 'Walima',
    description: 'Post-wedding feast and celebration',
    dayOffset: 0,
    duration: 4,
    typicalVendors: [VendorCategory.CATERER, VendorCategory.MUSICIAN, VendorCategory.PHOTOGRAPHER],
  },
];

export const SIKH_RITUALS: Ritual[] = [
  {
    id: 'sikh-mehendi',
    religion: Religion.SIKH,
    name: 'Mehendi',
    description: 'Henna ceremony',
    dayOffset: -1,
    duration: 4,
    typicalVendors: [VendorCategory.MEHENDI, VendorCategory.CATERER],
  },
  {
    id: 'sikh-baraat',
    religion: Religion.SIKH,
    name: 'Baraat',
    description: 'Groom procession',
    dayOffset: 0,
    duration: 2,
    typicalVendors: [VendorCategory.MUSICIAN, VendorCategory.PHOTOGRAPHER],
  },
  {
    id: 'sikh-anand-karaj',
    religion: Religion.SIKH,
    name: 'Anand Karaj',
    description: 'Sikh marriage ceremony in Gurudwara',
    dayOffset: 0,
    duration: 1,
    typicalVendors: [VendorCategory.PRIEST, VendorCategory.PHOTOGRAPHER],
  },
  {
    id: 'sikh-langar',
    religion: Religion.SIKH,
    name: 'Langar',
    description: 'Community feast',
    dayOffset: 0,
    duration: 3,
    typicalVendors: [VendorCategory.CATERER, VendorCategory.PHOTOGRAPHER],
  },
];

export const CHRISTIAN_RITUALS: Ritual[] = [
  {
    id: 'christian-rehearsal',
    religion: Religion.CHRISTIAN,
    name: 'Rehearsal Dinner',
    description: 'Pre-wedding gathering',
    dayOffset: -1,
    duration: 3,
    typicalVendors: [VendorCategory.CATERER],
  },
  {
    id: 'christian-ceremony',
    religion: Religion.CHRISTIAN,
    name: 'Wedding Ceremony',
    description: 'Church ceremony',
    dayOffset: 0,
    duration: 1,
    typicalVendors: [VendorCategory.PRIEST, VendorCategory.PHOTOGRAPHER, VendorCategory.MUSICIAN],
  },
  {
    id: 'christian-reception',
    religion: Religion.CHRISTIAN,
    name: 'Reception',
    description: 'Post-ceremony celebration',
    dayOffset: 0,
    duration: 4,
    typicalVendors: [VendorCategory.CATERER, VendorCategory.MUSICIAN, VendorCategory.PHOTOGRAPHER],
  },
];

export function getRitualsForReligion(religion: Religion): Ritual[] {
  switch (religion) {
    case Religion.HINDU:
      return HINDU_RITUALS;
    case Religion.MUSLIM:
      return MUSLIM_RITUALS;
    case Religion.SIKH:
      return SIKH_RITUALS;
    case Religion.CHRISTIAN:
      return CHRISTIAN_RITUALS;
    default:
      return [];
  }
}

export interface ShaadaiSajaoState {
  wedding: Wedding | null;
  vendors: Vendor[];
  vendorBookings: VendorBooking[];
  guestList: GuestListEntry[];
  budgetCategories: BudgetCategory[];
  isLoading: boolean;
  error: string | null;
}
