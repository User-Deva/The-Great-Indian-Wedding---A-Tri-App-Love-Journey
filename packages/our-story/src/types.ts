import { JourneyStage } from '@great-indian-wedding/theme-engine';

export interface TimelineEvent {
  id: string;
  coupleId: string;
  stage: JourneyStage;
  timestamp: Date;
  title: string;
  description: string;
  emoji: string;
  thumbnail?: string;
  location?: string;
  metadata: Record<string, any>;
}

export interface CoupleProfile {
  id: string;
  coupleId: string;
  coupleNames: {
    person1: string;
    person2: string;
  };
  profilePhoto?: string;
  profilePhotos: string[];
  bio?: string;
  startDate: Date; // When they first matched
  married: boolean;
  marriageDate?: Date;
  honeymoonDestination?: string;
}

export interface OurStoryMemory {
  id: string;
  coupleId: string;
  title: string;
  description: string;
  photos: string[];
  date: Date;
  location?: string;
  stage: JourneyStage;
  tags: string[];
  isPublic: boolean;
  createdAt: Date;
}

export interface OurStoryGallery {
  coupleId: string;
  events: TimelineEvent[];
  memories: OurStoryMemory[];
  totalPhotos: number;
  lastUpdated: Date;
}

// Timeline milestones
export const MILESTONE_EMOJIS: Record<JourneyStage, string> = {
  SEEKING: '🔍',
  MATCHED: '💕',
  DATE_SET: '📍',
  DATING: '☕',
  WEDDING: '💍',
  HONEYMOONING: '✈️',
};

export const MILESTONE_TITLES: Record<JourneyStage, string> = {
  SEEKING: 'Beginning the Search',
  MATCHED: 'A Match Made in Kismat',
  DATE_SET: 'First Date Venue Chosen',
  DATING: 'Our First Date',
  WEDDING: 'The Big Day',
  HONEYMOONING: 'Honeymoon Adventures',
};

export interface ExportOptions {
  format: 'pdf' | 'digital_book' | 'video';
  quality: 'standard' | 'high' | 'print';
  includeTimeline: boolean;
  includePhotos: boolean;
  includeMemories: boolean;
}

export interface ExportedStory {
  title: string;
  content: string;
  fileUrl?: string;
  fileSize?: number;
  createdAt: Date;
  expiresAt?: Date;
}
