// Our Story Core Types
export type {
  StoryMilestone,
  OurStory,
  TimelineEvent,
  CoupleProfile,
  OurStoryMemory,
  OurStoryGallery,
  ExportOptions,
  ExportedStory,
} from './types';

export {
  MILESTONE_EMOJIS,
  MILESTONE_TITLES,
} from './types';

// Our Story Store
export { useOurStoryStore } from './store';
export type { OurStoryStore, OurStoryStoreState, OurStoryStoreActions } from './store';

// Parivar Mode (Family Dashboard)
export type {
  FamilyMember,
  FamilyDashboardAccess,
  FamilyActivity,
} from './parivarMode';

export {
  FamilyRole,
  AccessLevel,
  ROLE_PERMISSIONS,
  RISHTA_ROLE_CAPABILITIES,
  SHAADI_ROLE_CAPABILITIES,
  JANNAT_ROLE_CAPABILITIES,
  getAccessLevel,
  canPerformAction,
  getCapabilities,
  generateInvitationLink,
  getRelationshipLabel,
} from './parivarMode';

// Notifications
export type { Notification, NotificationPreference } from './notifications';

export {
  NotificationType,
  NotificationChannel,
  MILESTONE_NOTIFICATIONS,
  generateMilestoneNotification,
  generateMatchingNotification,
  generateWeddingUpdateNotification,
  generateHoneymoonUpdateNotification,
  generateFamilyActivityNotification,
  generateCelebrationNotification,
  formatNotificationForEmail,
} from './notifications';

// Celebrations
export type { CelebrationConfig } from './celebrations';

export {
  CELEBRATION_CONFIGS,
  triggerCelebration,
  getCelebrationMessage,
  shouldAutoTrigger,
} from './celebrations';

// Monetization
export type {
  Subscription,
  Transaction,
  SubscriptionPlan,
  RishtaFeatures,
  ShaadiFeatures,
  JannatFeatures,
} from './monetization';

export {
  SubscriptionTier,
  Currency,
  SUBSCRIPTION_PLANS,
  AFFILIATE_COMMISSIONS,
  PREMIUM_FEATURES,
  getPlan,
  isFeatureAvailable,
  calculateUpgradeCost,
  calculateAffiliateEarnings,
  canAccessFeature,
} from './monetization';

// Internationalization
export type { TranslationStrings, LanguageResources } from './i18n';

export {
  Language,
  LANGUAGE_NAMES,
  EN_TRANSLATIONS,
  HI_TRANSLATIONS,
  LANGUAGE_RESOURCES,
  getTranslation,
  translate,
  getPreferredLanguage,
  formatDate,
  formatCurrency,
  getSupportedLanguages,
} from './i18n';

// Mobile Optimization
export type { DeviceInfo, PerformanceMetrics } from './mobileOptimization';

export {
  DeviceType,
  BREAKPOINTS,
  TOUCH_INTERACTIONS,
  IMAGE_OPTIMIZATION,
  CACHE_STRATEGY,
  APP_SHELL,
  detectDevice,
  getSpacing,
  getFontSizes,
  detectSwipe,
  getStorageQuota,
  requestPersistentStorage,
  MOBILE_KEYBOARD,
  getSafeAreaPadding,
  getPerformanceMetrics,
  getBatteryStatus,
} from './mobileOptimization';
