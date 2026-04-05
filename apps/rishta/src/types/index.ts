export enum KundaliType {
  AMBITIOUS_ARJUN = 'AMBITIOUS_ARJUN',
  NURTURING_NAINA = 'NURTURING_NAINA',
  FREE_SPIRITED_FREYA = 'FREE_SPIRITED_FREYA',
  CREATIVE_KARAN = 'CREATIVE_KARAN',
  ADVENTUROUS_AISHA = 'ADVENTUROUS_AISHA',
  STEADFAST_SAMEER = 'STEADFAST_SAMEER',
}

export const KUNDALI_DESCRIPTIONS: Record<KundaliType, string> = {
  [KundaliType.AMBITIOUS_ARJUN]: 'Goal-oriented, driven, career-focused',
  [KundaliType.NURTURING_NAINA]: 'Caring, family-first, emotionally intelligent',
  [KundaliType.FREE_SPIRITED_FREYA]: 'Independent, adventurous, unconventional',
  [KundaliType.CREATIVE_KARAN]: 'Artistic, imaginative, passionate about craft',
  [KundaliType.ADVENTUROUS_AISHA]: 'Thrill-seeker, loves new experiences',
  [KundaliType.STEADFAST_SAMEER]: 'Reliable, traditional, values stability',
};

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  motherTongue: string;
  religion: string;
  caste?: string;
  gotra?: string; // for Hindu matching
}

export interface LifestyleInfo {
  profession: string;
  education: string;
  incomeRange: string; // e.g., '5L-10L', '10L+', etc.
  diet: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'jain';
  drinking: boolean;
  smoking: boolean;
  familyType: 'joint' | 'nuclear';
  siblings: number;
}

export interface HoroscopeInfo {
  birthDate: Date;
  birthTime?: string; // HH:MM format
  birthPlace: string;
  rashi?: string;
  nakshatra?: string;
  gunaMilanScore?: number; // out of 36
}

export interface UserProfile {
  id: string;
  userId: string;
  personalInfo: PersonalInfo;
  lifestyleInfo: LifestyleInfo;
  horoscopeInfo: HoroscopeInfo;
  kundaliType: KundaliType;
  bio: string;
  profilePhotoUrl?: string;
  voiceBioUrl?: string; // 60-second introduction
  videoReelUrl?: string; // 30-second reel
  createdAt: Date;
  updatedAt: Date;
}

export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  coupleId?: string;
  compatibilityScore: number; // 0-100
  gunaMilanScore?: number; // 0-36
  user1Interest: boolean;
  user2Interest: boolean;
  mutualInterest: boolean;
  status: 'pending' | 'matched' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface DateVenue {
  id: string;
  name: string;
  address: string;
  type: 'cafe' | 'heritage' | 'restaurant' | 'garden' | 'cultural';
  googleMapsLink: string;
  budgetEstimate: number; // in INR
  dressCode: string;
  conversationStarters: string[]; // 5 questions
}

export interface DateSuggestion {
  id: string;
  matchId: string;
  coupleId?: string;
  venues: DateVenue[];
  suggestedAt: Date;
  scheduledDate?: Date;
  status: 'suggested' | 'scheduled' | 'completed';
}

export interface DateCheckin {
  id: string;
  dateId: string;
  userId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  createdAt: Date;
}

export interface RishtaState {
  userProfile: UserProfile | null;
  matches: Match[];
  currentMatch: Match | null;
  dateSuggestion: DateSuggestion | null;
  isLoading: boolean;
  error: string | null;
}

// Personality Quiz Questions (20 total)
export interface QuizQuestion {
  id: number;
  question: string;
  answers: string[];
  weight: KundaliType;
}
