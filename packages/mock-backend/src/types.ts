import { JourneyStage } from '@great-indian-wedding/theme-engine';

export interface MockUser {
  id: string;
  email: string;
  displayName: string;
  coupleId: string;
  partnerId: string;
}

export interface MockProfile {
  userId: string;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  motherTongue: string;
  religion: string;
  profession: string;
  education: string;
  diet: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'jain';
  drinking: boolean;
  smoking: boolean;
  familyType: 'joint' | 'nuclear';
  kundaliType: string;
  gunaMilanScore: number;
  bio: string;
  emoji: string;
  completed: boolean;
}

export interface MockCouple {
  id: string;
  user1Id: string;
  user2Id: string;
  coupleName: string;
  journeyStage: JourneyStage;
  createdAt: string;
  updatedAt: string;
}

export interface MockMatch {
  id: string;
  forCoupleId: string;
  candidateName: string;
  candidateAge: number;
  candidateCity: string;
  candidateProfession: string;
  candidateBio: string;
  emoji: string;
  compatibilityScore: number;
  gunaMilanScore: number;
  status: 'pending' | 'interested' | 'passed';
}

export interface MockDateVenue {
  id: string;
  name: string;
  address: string;
  type: 'cafe' | 'heritage' | 'restaurant' | 'garden' | 'cultural';
  budgetEstimate: number;
  dressCode: string;
  conversationStarters: string[];
}

export interface MockScheduledDate {
  id: string;
  coupleId: string;
  venue: MockDateVenue;
  scheduledFor: string;
  rating?: number;
  notes?: string;
  completed: boolean;
}

export interface MockWedding {
  id: string;
  coupleId: string;
  weddingDate: string;
  weddingVenue: string;
  packageType: string;
  religion: string;
  budgetTotal: number;
  guestCount: number;
}

export interface MockVendor {
  id: string;
  name: string;
  category: string;
  city: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  basePrice: number;
  description: string;
  emoji: string;
  verified: boolean;
}

export interface MockVendorBooking {
  id: string;
  coupleId: string;
  vendor: MockVendor;
  depositAmount: number;
  depositPaid: boolean;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookedAt: string;
}

export interface MockDestination {
  id: string;
  name: string;
  country: string;
  archetype: string;
  description: string;
  whyPerfect: string;
  bestTimeToVisit: string;
  budgetMin: number;
  budgetMax: number;
  emoji: string;
  highlights: string[];
}

export interface MockHoneymoon {
  id: string;
  coupleId: string;
  destinationId: string;
  destinationName: string;
  startDate: string;
  endDate: string;
  budgetTotal: number;
  nights: number;
}

export interface MockFlight {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  durationMinutes: number;
  price: number;
  stops: number;
  class: 'economy' | 'business';
}

export interface MockHotel {
  id: string;
  name: string;
  city: string;
  rating: number;
  pricePerNight: number;
  amenities: string[];
  romanticFeatures: string[];
  emoji: string;
}

export interface MockHoneymoonBooking {
  id: string;
  coupleId: string;
  type: 'flight' | 'hotel';
  reference: string;
  description: string;
  totalCost: number;
  status: 'confirmed';
  bookedAt: string;
}

export interface MockTimelineEvent {
  id: string;
  coupleId: string;
  stage: JourneyStage;
  title: string;
  description: string;
  emoji: string;
  timestamp: string;
}

export interface MockDb {
  currentUserId: string | null;
  users: Record<string, MockUser>;
  profiles: Record<string, MockProfile>;
  couples: Record<string, MockCouple>;
  matches: Record<string, MockMatch[]>;
  scheduledDates: Record<string, MockScheduledDate | null>;
  weddings: Record<string, MockWedding | null>;
  vendorBookings: Record<string, MockVendorBooking[]>;
  honeymoons: Record<string, MockHoneymoon | null>;
  honeymoonBookings: Record<string, MockHoneymoonBooking[]>;
  timelines: Record<string, MockTimelineEvent[]>;
}
