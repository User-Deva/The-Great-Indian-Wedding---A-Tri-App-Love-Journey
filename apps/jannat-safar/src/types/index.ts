export enum TravelerArchetype {
  BEACH_LOVERS = 'Beach Lovers',
  MOUNTAIN_ROMANTICS = 'Mountain Romantics',
  CULTURE_EXPLORERS = 'Culture Explorers',
  ADVENTURE_SEEKERS = 'Adventure Seekers',
  LUXURY_LOUNGERS = 'Luxury Loungers',
  BUDGET_SMART = 'Budget Smart',
}

export const TRAVELER_DESCRIPTIONS: Record<TravelerArchetype, string> = {
  [TravelerArchetype.BEACH_LOVERS]: 'Sun, sand, sea, and endless relaxation',
  [TravelerArchetype.MOUNTAIN_ROMANTICS]: 'Mountain views, cool climate, nature walks',
  [TravelerArchetype.CULTURE_EXPLORERS]: 'History, art, museums, local traditions',
  [TravelerArchetype.ADVENTURE_SEEKERS]: 'Adrenaline, hiking, sports, thrills',
  [TravelerArchetype.LUXURY_LOUNGERS]: 'High-end resorts, spas, fine dining',
  [TravelerArchetype.BUDGET_SMART]: 'Value for money, local experiences',
};

export interface DestinationCard {
  id: string;
  name: string;
  country: string;
  archetype: TravelerArchetype;
  description: string;
  whyPerfect: string;
  bestTimeToVisit: string;
  weatherAdvisory: string;
  estimatedBudget: {
    min: number; // in INR
    max: number;
  };
  currency: string;
  visaRequirement: 'none' | 'visa_on_arrival' | 'e_visa' | 'advance_visa';
  visaDetails: string;
  culturalTips: string[];
  packingEssentials: string[];
  imageUrl?: string;
  highlights: string[]; // Top attractions
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: Date;
  arrivalTime: Date;
  duration: number; // minutes
  price: number; // in INR
  seatsAvailable: number;
  class: 'economy' | 'premium_economy' | 'business';
  stops: number;
}

export interface HotelRoom {
  id: string;
  hotelId: string;
  hotelName: string;
  city: string;
  roomType: 'standard' | 'deluxe' | 'suite' | 'villa';
  pricePerNight: number; // in INR
  maxOccupancy: number;
  amenities: string[];
  romanticFeatures: string[]; // couple spa, private pool, etc.
  rating: number;
  imageUrl?: string;
  availability: {
    checkIn: Date;
    checkOut: Date;
  };
}

export interface HoneymoonBooking {
  id: string;
  honeymoonId: string;
  bookingType: 'flight' | 'hotel' | 'activity';
  provider: string;
  referenceNumber: string;
  bookingDate: Date;
  totalCost: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  details: Record<string, any>;
  createdAt: Date;
}

export interface CityItinerary {
  id: string;
  honeymoonId: string;
  city: string;
  dayNumber: number; // 1-based
  attractions: Attraction[];
  restaurants: Restaurant[];
  activities: Activity[];
  nightlife: string[];
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  category: 'museum' | 'monument' | 'nature' | 'cultural' | 'shopping' | 'hidden_gem';
  visitDuration: number; // minutes
  timeToVisit: 'morning' | 'afternoon' | 'evening' | 'anytime';
  entryFee: number;
  operatingHours: string;
  mapLink: string;
  tips: string[];
  romanticRating: number; // 1-5
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  vibe: 'casual' | 'fine_dining' | 'rooftop' | 'beachfront' | 'traditional';
  averagePrice: number; // per couple in INR
  specialties: string[];
  reservationLink?: string;
  romanticRating: number; // 1-5
  bestFor: string; // e.g., "Anniversary dinner", "Lunch date"
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  category: 'adventure' | 'wellness' | 'cultural' | 'culinary' | 'leisure';
  duration: number; // minutes
  price: number; // per couple in INR
  bestFor: string; // e.g., "Couples who love adventure"
  difficulty: 'easy' | 'moderate' | 'challenging';
  bookingLink?: string;
}

export interface HoneymoonWallet {
  honeymoonId: string;
  budgetTotal: number;
  budgetBreakdown: {
    flights: number;
    accommodation: number;
    food: number;
    activities: number;
    shopping: number;
    miscellaneous: number;
  };
  spent: number;
  expenses: Expense[];
}

export interface Expense {
  id: string;
  category: 'flights' | 'accommodation' | 'food' | 'activities' | 'shopping' | 'miscellaneous';
  description: string;
  amount: number;
  currency: string;
  date: Date;
  receiptUrl?: string;
}

export interface Honeymoon {
  id: string;
  coupleId: string;
  destination: string;
  destinationCard?: DestinationCard;
  travelerArchetype: TravelerArchetype;
  startDate: Date;
  endDate: Date;
  budgetTotal: number;
  nights: number;
  status: 'planning' | 'booked' | 'in_progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface JannatSafariState {
  honeymoon: Honeymoon | null;
  destinations: DestinationCard[];
  bookings: HoneymoonBooking[];
  itineraries: CityItinerary[];
  wallet: HoneymoonWallet | null;
  isLoading: boolean;
  error: string | null;
}

// Quiz questions for traveler archetype
export interface TravelerQuizQuestion {
  id: number;
  question: string;
  answers: string[];
  weight: TravelerArchetype;
}
