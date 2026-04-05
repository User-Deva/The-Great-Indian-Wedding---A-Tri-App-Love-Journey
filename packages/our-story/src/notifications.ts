/**
 * Notification System
 *
 * Cross-app notifications triggered by milestones and events
 */

import { JourneyStage } from '@great-indian-wedding/theme-engine';

export enum NotificationType {
  MILESTONE = 'milestone',
  MATCHING = 'matching',
  WEDDING_UPDATE = 'wedding_update',
  HONEYMOON_UPDATE = 'honeymoon_update',
  FAMILY_ACTIVITY = 'family_activity',
  VENDOR_UPDATE = 'vendor_update',
  GUEST_RSVP = 'guest_rsvp',
  CELEBRATION = 'celebration',
}

export enum NotificationChannel {
  PUSH = 'push',
  EMAIL = 'email',
  IN_APP = 'in_app',
  SMS = 'sms',
}

export interface Notification {
  id: string;
  coupleId: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  channels: NotificationChannel[];
  icon?: string;
  emoji?: string;
  actionUrl?: string;
  metadata: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export interface NotificationPreference {
  coupleId: string;
  userId: string;
  channels: Partial<Record<NotificationChannel, boolean>>;
  frequency: 'instant' | 'daily_digest' | 'weekly_digest';
  quietHours?: {
    enabled: boolean;
    startTime: string; // HH:MM
    endTime: string;
  };
}

// Milestone notifications
export const MILESTONE_NOTIFICATIONS: Record<JourneyStage, { title: string; message: string; emoji: string }> = {
  [JourneyStage.SEEKING]: {
    title: 'Your journey begins',
    message: 'Welcome to Rishta! Start building your profile and finding your match.',
    emoji: '🔍',
  },
  [JourneyStage.MATCHED]: {
    title: '💕 You\'ve got a match!',
    message: 'Someone special likes you. Check out their profile and express your interest.',
    emoji: '💕',
  },
  [JourneyStage.DATE_SET]: {
    title: '📍 First date location confirmed',
    message: 'Your first meeting place is set! Prepare for your Pehli Mulaqat.',
    emoji: '📍',
  },
  [JourneyStage.DATING]: {
    title: '☕ Your love story begins',
    message: 'Congratulations! Your first date went amazing. Time to plan your wedding!',
    emoji: '☕',
  },
  [JourneyStage.WEDDING]: {
    title: '💍 Your wedding day!',
    message: 'The big day has arrived! Celebrate with Shaadi Sajao planning complete.',
    emoji: '💍',
  },
  [JourneyStage.HONEYMOONING]: {
    title: '✈️ Honeymoon adventure',
    message: 'Your forever begins! Bon Voyage to your dream destination.',
    emoji: '✈️',
  },
};

/**
 * Generate notification for milestone
 */
export function generateMilestoneNotification(
  coupleId: string,
  userId: string,
  stage: JourneyStage,
  metadata: Record<string, any> = {}
): Notification {
  const milestone = MILESTONE_NOTIFICATIONS[stage];

  return {
    id: `notif-${Date.now()}`,
    coupleId,
    userId,
    type: NotificationType.MILESTONE,
    title: milestone.title,
    message: milestone.message,
    emoji: milestone.emoji,
    channels: [NotificationChannel.PUSH, NotificationChannel.IN_APP],
    metadata: {
      stage,
      ...metadata,
    },
    isRead: false,
    createdAt: new Date(),
  };
}

/**
 * Generate matching notification
 */
export function generateMatchingNotification(
  coupleId: string,
  userId: string,
  matchName: string,
  compatibilityScore: number
): Notification {
  return {
    id: `notif-${Date.now()}`,
    coupleId,
    userId,
    type: NotificationType.MATCHING,
    title: `💕 New Match: ${matchName}`,
    message: `${matchName} is ${compatibilityScore}% compatible with you. Check the profile!`,
    emoji: '💕',
    channels: [NotificationChannel.PUSH, NotificationChannel.IN_APP],
    actionUrl: '/rishta/matches',
    metadata: {
      matchName,
      compatibilityScore,
    },
    isRead: false,
    createdAt: new Date(),
  };
}

/**
 * Generate wedding update notification
 */
export function generateWeddingUpdateNotification(
  coupleId: string,
  userId: string,
  updateType: 'vendor_booked' | 'guest_confirmed' | 'budget_alert',
  details: string
): Notification {
  const titles: Record<string, string> = {
    vendor_booked: '🎉 Vendor Booked!',
    guest_confirmed: '✓ Guest Confirmed RSVP',
    budget_alert: '⚠️ Budget Alert',
  };

  return {
    id: `notif-${Date.now()}`,
    coupleId,
    userId,
    type: NotificationType.WEDDING_UPDATE,
    title: titles[updateType],
    message: details,
    channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
    actionUrl: '/shaadi-sajao/dashboard',
    metadata: {
      updateType,
    },
    isRead: false,
    createdAt: new Date(),
  };
}

/**
 * Generate honeymoon update notification
 */
export function generateHoneymoonUpdateNotification(
  coupleId: string,
  userId: string,
  updateType: 'flight_booked' | 'hotel_booked' | 'itinerary_ready',
  details: string
): Notification {
  const titles: Record<string, string> = {
    flight_booked: '✈️ Flight Booked!',
    hotel_booked: '🏨 Hotel Booked!',
    itinerary_ready: '📅 Itinerary Ready',
  };

  return {
    id: `notif-${Date.now()}`,
    coupleId,
    userId,
    type: NotificationType.HONEYMOON_UPDATE,
    title: titles[updateType],
    message: details,
    channels: [NotificationChannel.PUSH, NotificationChannel.IN_APP],
    actionUrl: '/jannat-safar/bookings',
    metadata: {
      updateType,
    },
    isRead: false,
    createdAt: new Date(),
  };
}

/**
 * Generate family activity notification
 */
export function generateFamilyActivityNotification(
  coupleId: string,
  userId: string,
  activityType: string,
  performedBy: string,
  details: string
): Notification {
  return {
    id: `notif-${Date.now()}`,
    coupleId,
    userId,
    type: NotificationType.FAMILY_ACTIVITY,
    title: `📢 Family Update from ${performedBy}`,
    message: details,
    emoji: '👨‍👩‍👧',
    channels: [NotificationChannel.IN_APP],
    metadata: {
      activityType,
      performedBy,
    },
    isRead: false,
    createdAt: new Date(),
  };
}

/**
 * Generate celebration notification
 */
export function generateCelebrationNotification(
  coupleId: string,
  userId: string,
  celebration: string
): Notification {
  const celebrations: Record<string, { title: string; emoji: string; message: string }> = {
    anniversary: {
      title: '🎂 Happy Anniversary!',
      emoji: '🎂',
      message: 'Celebrate your special day together!',
    },
    engagement: {
      title: '💎 Congratulations on Your Engagement!',
      emoji: '💎',
      message: "You're officially engaged! Share the joy with family.",
    },
    anniversary_1month: {
      title: '📅 1 Month of Marriage!',
      emoji: '📅',
      message: 'Celebrate your first month together!',
    },
    anniversary_6months: {
      title: '📅 6 Months Anniversary!',
      emoji: '📅',
      message: 'Half a year of love and memories!',
    },
  };

  const celebData = celebrations[celebration] || celebrations['anniversary'];

  return {
    id: `notif-${Date.now()}`,
    coupleId,
    userId,
    type: NotificationType.CELEBRATION,
    title: celebData.title,
    message: celebData.message,
    emoji: celebData.emoji,
    channels: [NotificationChannel.PUSH, NotificationChannel.EMAIL, NotificationChannel.IN_APP],
    metadata: {
      celebration,
    },
    isRead: false,
    createdAt: new Date(),
  };
}

/**
 * Format notification for display
 */
export function formatNotificationForEmail(notification: Notification): {
  subject: string;
  body: string;
  cta: { text: string; url: string } | null;
} {
  const emojis = notification.emoji ? `${notification.emoji} ` : '';

  return {
    subject: `${emojis}${notification.title}`,
    body: notification.message,
    cta: notification.actionUrl
      ? {
          text: 'View Details',
          url: notification.actionUrl,
        }
      : null,
  };
}
