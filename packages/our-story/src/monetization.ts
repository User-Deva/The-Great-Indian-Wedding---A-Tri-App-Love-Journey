/**
 * Monetization System
 *
 * Freemium model with premium features across the ecosystem
 */

export enum SubscriptionTier {
  FREE = 'free',
  PREMIUM = 'premium',
  PLATINUM = 'platinum',
}

export enum Currency {
  INR = 'INR',
  USD = 'USD',
  EUR = 'EUR',
}

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  description: string;
  price: number;
  currency: Currency;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  rishtaFeatures: RishtaFeatures;
  shaadiFeatures: ShaadiFeatures;
  jannatFeatures: JannatFeatures;
}

export interface RishtaFeatures {
  maxMatches: number;
  voiceBio: boolean;
  videoReel: boolean;
  personalityQuiz: boolean;
  horoscopeMatch: boolean;
  daysBetweenDates: number; // min days between date suggestions
  dateVenueSuggestions: number;
  familyMode: boolean;
}

export interface ShaadiFeatures {
  maxVendors: number;
  guestListSize: number;
  budgetTracking: boolean;
  aiStylist: boolean;
  vendorMessaging: boolean;
  familyDashboard: boolean;
  pdfExport: boolean;
}

export interface JannatFeatures {
  destinationCount: number;
  flightSearchCount: number;
  hotelSearchCount: number;
  itineraryDays: number;
  itineraryExport: boolean;
  currencyConverter: boolean;
  expenseTracking: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  coupleId: string;
  tier: SubscriptionTier;
  startDate: Date;
  endDate: Date;
  renewalDate: Date;
  isActive: boolean;
  paymentMethod: string;
  amount: number;
  currency: Currency;
}

export interface Transaction {
  id: string;
  coupleId: string;
  type: 'subscription' | 'affiliate' | 'premium_feature' | 'refund';
  amount: number;
  currency: Currency;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  description: string;
  createdAt: Date;
  metadata: Record<string, any>;
}

// Subscription Plans
export const SUBSCRIPTION_PLANS: Record<SubscriptionTier, SubscriptionPlan> = {
  [SubscriptionTier.FREE]: {
    tier: SubscriptionTier.FREE,
    name: 'Shuruat',
    description: 'Start your journey, completely free',
    price: 0,
    currency: Currency.INR,
    billingPeriod: 'monthly',
    features: [
      'Basic profile creation',
      '5 matches per month',
      'Limited date suggestions',
      'Basic wedding planning',
      'Honeymoon destination discovery',
      'Our Story scrapbook (basic)',
    ],
    rishtaFeatures: {
      maxMatches: 5,
      voiceBio: false,
      videoReel: false,
      personalityQuiz: true,
      horoscopeMatch: false,
      daysBetweenDates: 7,
      dateVenueSuggestions: 3,
      familyMode: false,
    },
    shaadiFeatures: {
      maxVendors: 10,
      guestListSize: 50,
      budgetTracking: true,
      aiStylist: false,
      vendorMessaging: false,
      familyDashboard: false,
      pdfExport: false,
    },
    jannatFeatures: {
      destinationCount: 5,
      flightSearchCount: 5,
      hotelSearchCount: 5,
      itineraryDays: 3,
      itineraryExport: false,
      currencyConverter: false,
      expenseTracking: false,
    },
  },
  [SubscriptionTier.PREMIUM]: {
    tier: SubscriptionTier.PREMIUM,
    name: 'Pyaar',
    description: 'Unlock premium features for serious matchmaking',
    price: 499,
    currency: Currency.INR,
    billingPeriod: 'monthly',
    features: [
      'Everything in Shuruat, plus:',
      'Unlimited matches & browsing',
      'Voice bio & video reel',
      'Horoscope compatibility matching',
      'AI Wedding Stylist',
      'Full wedding planning tools',
      'Family collaboration',
      'Unlimited itinerary planning',
      'Expense tracking across all apps',
      'Advanced Our Story with photo gallery',
      'Premium notifications & priority support',
    ],
    rishtaFeatures: {
      maxMatches: 999,
      voiceBio: true,
      videoReel: true,
      personalityQuiz: true,
      horoscopeMatch: true,
      daysBetweenDates: 1,
      dateVenueSuggestions: 5,
      familyMode: true,
    },
    shaadiFeatures: {
      maxVendors: 50,
      guestListSize: 500,
      budgetTracking: true,
      aiStylist: true,
      vendorMessaging: true,
      familyDashboard: true,
      pdfExport: true,
    },
    jannatFeatures: {
      destinationCount: 12,
      flightSearchCount: 50,
      hotelSearchCount: 50,
      itineraryDays: 30,
      itineraryExport: true,
      currencyConverter: true,
      expenseTracking: true,
    },
  },
  [SubscriptionTier.PLATINUM]: {
    tier: SubscriptionTier.PLATINUM,
    name: 'Shaadi Ka Safar',
    description: 'Complete wedding journey with concierge service',
    price: 2999,
    currency: Currency.INR,
    billingPeriod: 'yearly',
    features: [
      'Everything in Pyaar, plus:',
      'Varmala wedding concierge consultation',
      'Priority vendor access & booking',
      'Direct wedding coordinator access',
      'Exclusive destination packages',
      'Honeymoon flight upgrades (4-6 flights)',
      'Hotel room upgrades (booking dependent)',
      'Premium photography recommendations',
      'Personal AI assistant for planning',
      'Exclusive honeymoon destinations',
      '24/7 Priority support',
      'Annual anniversary gift package',
    ],
    rishtaFeatures: {
      maxMatches: 999,
      voiceBio: true,
      videoReel: true,
      personalityQuiz: true,
      horoscopeMatch: true,
      daysBetweenDates: 0,
      dateVenueSuggestions: 10,
      familyMode: true,
    },
    shaadiFeatures: {
      maxVendors: 999,
      guestListSize: 999,
      budgetTracking: true,
      aiStylist: true,
      vendorMessaging: true,
      familyDashboard: true,
      pdfExport: true,
    },
    jannatFeatures: {
      destinationCount: 12,
      flightSearchCount: 999,
      hotelSearchCount: 999,
      itineraryDays: 60,
      itineraryExport: true,
      currencyConverter: true,
      expenseTracking: true,
    },
  },
};

/**
 * Get plan by tier
 */
export function getPlan(tier: SubscriptionTier): SubscriptionPlan {
  return SUBSCRIPTION_PLANS[tier];
}

/**
 * Check if feature is available in tier
 */
export function isFeatureAvailable(tier: SubscriptionTier, feature: string): boolean {
  const plan = SUBSCRIPTION_PLANS[tier];
  return plan.features.some((f) => f.toLowerCase().includes(feature.toLowerCase()));
}

/**
 * Calculate upgrade cost
 */
export function calculateUpgradeCost(
  currentTier: SubscriptionTier,
  newTier: SubscriptionTier,
  daysRemaining: number,
  totalDaysInPeriod: number
): number {
  const currentPlan = SUBSCRIPTION_PLANS[currentTier];
  const newPlan = SUBSCRIPTION_PLANS[newTier];

  if (newPlan.price <= currentPlan.price) {
    return 0; // Downgrade or same tier
  }

  const creditAmount = (currentPlan.price * daysRemaining) / totalDaysInPeriod;
  const upgradeCost = newPlan.price - creditAmount;

  return Math.max(0, upgradeCost);
}

/**
 * Affiliate commission structure
 */
export const AFFILIATE_COMMISSIONS = {
  flight_booking: 0.06, // 6% of booking amount
  hotel_booking: 0.08, // 8% of booking amount
  vendor_referral: 0.12, // 12% of vendor payment
  premium_upgrade: 0.15, // 15% of subscription value
};

/**
 * Calculate affiliate earnings
 */
export function calculateAffiliateEarnings(
  type: keyof typeof AFFILIATE_COMMISSIONS,
  amount: number
): number {
  return amount * AFFILIATE_COMMISSIONS[type];
}

/**
 * Premium features by app
 */
export const PREMIUM_FEATURES = {
  rishta: [
    'voiceBio',
    'videoReel',
    'horoscopeMatch',
    'familyMode',
    'unlimitedMatches',
  ],
  shaadi: [
    'aiStylist',
    'vendorMessaging',
    'familyDashboard',
    'pdfExport',
    'advancedBudgeting',
  ],
  jannat: [
    'itineraryExport',
    'currencyConverter',
    'expenseTracking',
    'destinationPackages',
  ],
};

/**
 * Check if user can access feature
 */
export function canAccessFeature(
  userTier: SubscriptionTier,
  featureName: string
): boolean {
  const plan = SUBSCRIPTION_PLANS[userTier];

  // Check Rishta features
  if (PREMIUM_FEATURES.rishta.includes(featureName)) {
    return userTier !== SubscriptionTier.FREE;
  }

  // Check Shaadi features
  if (PREMIUM_FEATURES.shaadi.includes(featureName)) {
    return userTier !== SubscriptionTier.FREE;
  }

  // Check Jannat features
  if (PREMIUM_FEATURES.jannat.includes(featureName)) {
    return userTier !== SubscriptionTier.FREE;
  }

  // All features available to all tiers by default
  return true;
}
