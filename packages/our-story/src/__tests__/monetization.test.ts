import { describe, it, expect } from 'vitest';
import {
  SubscriptionTier,
  Currency,
  SUBSCRIPTION_PLANS,
  getPlan,
  isFeatureAvailable,
  calculateUpgradeCost,
  calculateAffiliateEarnings,
  canAccessFeature,
  AFFILIATE_COMMISSIONS,
} from '../monetization';

describe('Monetization System', () => {
  describe('SUBSCRIPTION_PLANS', () => {
    it('should have 3 subscription tiers', () => {
      expect(Object.keys(SUBSCRIPTION_PLANS).length).toBe(3);
      expect(SUBSCRIPTION_PLANS).toHaveProperty(SubscriptionTier.FREE);
      expect(SUBSCRIPTION_PLANS).toHaveProperty(SubscriptionTier.PREMIUM);
      expect(SUBSCRIPTION_PLANS).toHaveProperty(SubscriptionTier.PLATINUM);
    });

    it('should have proper structure for each plan', () => {
      Object.values(SUBSCRIPTION_PLANS).forEach((plan) => {
        expect(plan).toHaveProperty('tier');
        expect(plan).toHaveProperty('name');
        expect(plan).toHaveProperty('description');
        expect(plan).toHaveProperty('price');
        expect(plan).toHaveProperty('currency');
        expect(plan).toHaveProperty('billingPeriod');
        expect(plan).toHaveProperty('features');
        expect(plan).toHaveProperty('rishtaFeatures');
        expect(plan).toHaveProperty('shaadiFeatures');
        expect(plan).toHaveProperty('jannatFeatures');
      });
    });

    it('should have price hierarchy (FREE < PREMIUM < PLATINUM)', () => {
      const freePlan = SUBSCRIPTION_PLANS[SubscriptionTier.FREE];
      const premiumPlan = SUBSCRIPTION_PLANS[SubscriptionTier.PREMIUM];
      const platinumPlan = SUBSCRIPTION_PLANS[SubscriptionTier.PLATINUM];

      expect(freePlan.price).toBe(0);
      expect(premiumPlan.price).toBeGreaterThan(freePlan.price);
      expect(platinumPlan.price).toBeGreaterThan(premiumPlan.price);
    });

    it('should have increasing feature availability', () => {
      const freePlan = SUBSCRIPTION_PLANS[SubscriptionTier.FREE];
      const premiumPlan = SUBSCRIPTION_PLANS[SubscriptionTier.PREMIUM];
      const platinumPlan = SUBSCRIPTION_PLANS[SubscriptionTier.PLATINUM];

      expect(freePlan.rishtaFeatures.maxMatches).toBeLessThanOrEqual(
        premiumPlan.rishtaFeatures.maxMatches
      );
      expect(premiumPlan.rishtaFeatures.maxMatches).toBeLessThanOrEqual(
        platinumPlan.rishtaFeatures.maxMatches
      );
    });

    it('FREE tier should have basic features', () => {
      const plan = SUBSCRIPTION_PLANS[SubscriptionTier.FREE];

      expect(plan.price).toBe(0);
      expect(plan.rishtaFeatures.maxMatches).toBe(5);
      expect(plan.rishtaFeatures.voiceBio).toBe(false);
      expect(plan.rishtaFeatures.videoReel).toBe(false);
    });

    it('PREMIUM tier should unlock key features', () => {
      const plan = SUBSCRIPTION_PLANS[SubscriptionTier.PREMIUM];

      expect(plan.price).toBe(499);
      expect(plan.rishtaFeatures.maxMatches).toBe(999);
      expect(plan.rishtaFeatures.voiceBio).toBe(true);
      expect(plan.rishtaFeatures.videoReel).toBe(true);
      expect(plan.shaadiFeatures.aiStylist).toBe(true);
    });

    it('PLATINUM tier should have all premium features', () => {
      const plan = SUBSCRIPTION_PLANS[SubscriptionTier.PLATINUM];

      expect(plan.price).toBe(2999);
      expect(plan.rishtaFeatures.maxMatches).toBe(999);
      expect(plan.rishtaFeatures.horoscopeMatch).toBe(true);
      expect(plan.shaadiFeatures.familyDashboard).toBe(true);
      expect(plan.jannatFeatures.expenseTracking).toBe(true);
    });
  });

  describe('getPlan', () => {
    it('should return correct plan for each tier', () => {
      const freePlan = getPlan(SubscriptionTier.FREE);
      const premiumPlan = getPlan(SubscriptionTier.PREMIUM);
      const platinumPlan = getPlan(SubscriptionTier.PLATINUM);

      expect(freePlan.tier).toBe(SubscriptionTier.FREE);
      expect(premiumPlan.tier).toBe(SubscriptionTier.PREMIUM);
      expect(platinumPlan.tier).toBe(SubscriptionTier.PLATINUM);
    });

    it('should return same object as SUBSCRIPTION_PLANS', () => {
      const plan = getPlan(SubscriptionTier.FREE);

      expect(plan).toBe(SUBSCRIPTION_PLANS[SubscriptionTier.FREE]);
    });
  });

  describe('isFeatureAvailable', () => {
    it('should confirm FREE tier has basic features', () => {
      const result = isFeatureAvailable(SubscriptionTier.FREE, 'Basic profile');

      expect(result).toBe(true);
    });

    it('should confirm PREMIUM has unlimited matches', () => {
      const result = isFeatureAvailable(SubscriptionTier.PREMIUM, 'Unlimited');

      expect(result).toBe(true);
    });

    it('should case-insensitive feature matching', () => {
      const result1 = isFeatureAvailable(SubscriptionTier.PREMIUM, 'voice bio');
      const result2 = isFeatureAvailable(SubscriptionTier.PREMIUM, 'VOICE BIO');

      expect(result1).toBe(result2);
    });
  });

  describe('calculateUpgradeCost', () => {
    it('should return 0 for downgrade', () => {
      const cost = calculateUpgradeCost(
        SubscriptionTier.PREMIUM,
        SubscriptionTier.FREE,
        30,
        30
      );

      expect(cost).toBe(0);
    });

    it('should return 0 for same tier upgrade', () => {
      const cost = calculateUpgradeCost(
        SubscriptionTier.PREMIUM,
        SubscriptionTier.PREMIUM,
        30,
        30
      );

      expect(cost).toBe(0);
    });

    it('should prorate upgrade cost for remaining days', () => {
      const daysRemaining = 15;
      const totalDays = 30;

      const cost = calculateUpgradeCost(
        SubscriptionTier.FREE,
        SubscriptionTier.PREMIUM,
        daysRemaining,
        totalDays
      );

      expect(cost).toBeGreaterThan(0);
      expect(cost).toBeLessThan(499);
    });

    it('should calculate correct prorated amount', () => {
      const daysRemaining = 15;
      const totalDays = 30;
      const freePlan = getPlan(SubscriptionTier.FREE);
      const premiumPlan = getPlan(SubscriptionTier.PREMIUM);

      const cost = calculateUpgradeCost(
        SubscriptionTier.FREE,
        SubscriptionTier.PREMIUM,
        daysRemaining,
        totalDays
      );

      const creditAmount = (freePlan.price * daysRemaining) / totalDays;
      const expectedCost = premiumPlan.price - creditAmount;

      expect(cost).toBeCloseTo(expectedCost, 1);
    });

    it('should handle zero days remaining', () => {
      const cost = calculateUpgradeCost(
        SubscriptionTier.FREE,
        SubscriptionTier.PREMIUM,
        0,
        30
      );

      expect(cost).toBeCloseTo(499, 0);
    });

    it('should handle full period remaining', () => {
      const cost = calculateUpgradeCost(
        SubscriptionTier.FREE,
        SubscriptionTier.PREMIUM,
        30,
        30
      );

      expect(cost).toBeCloseTo(499, 0);
    });
  });

  describe('AFFILIATE_COMMISSIONS', () => {
    it('should define commission rates for all types', () => {
      expect(AFFILIATE_COMMISSIONS).toHaveProperty('flight_booking');
      expect(AFFILIATE_COMMISSIONS).toHaveProperty('hotel_booking');
      expect(AFFILIATE_COMMISSIONS).toHaveProperty('vendor_referral');
      expect(AFFILIATE_COMMISSIONS).toHaveProperty('premium_upgrade');
    });

    it('should have realistic commission percentages', () => {
      Object.values(AFFILIATE_COMMISSIONS).forEach((rate) => {
        expect(rate).toBeGreaterThan(0);
        expect(rate).toBeLessThan(1);
      });
    });

    it('should have flight booking commission at 6%', () => {
      expect(AFFILIATE_COMMISSIONS.flight_booking).toBe(0.06);
    });

    it('should have hotel booking commission at 8%', () => {
      expect(AFFILIATE_COMMISSIONS.hotel_booking).toBe(0.08);
    });

    it('should have vendor referral commission at 12%', () => {
      expect(AFFILIATE_COMMISSIONS.vendor_referral).toBe(0.12);
    });

    it('should have premium upgrade commission at 15%', () => {
      expect(AFFILIATE_COMMISSIONS.premium_upgrade).toBe(0.15);
    });
  });

  describe('calculateAffiliateEarnings', () => {
    it('should calculate flight booking earnings', () => {
      const earning = calculateAffiliateEarnings('flight_booking', 100000);

      expect(earning).toBe(6000);
    });

    it('should calculate hotel booking earnings', () => {
      const earning = calculateAffiliateEarnings('hotel_booking', 100000);

      expect(earning).toBe(8000);
    });

    it('should calculate vendor referral earnings', () => {
      const earning = calculateAffiliateEarnings('vendor_referral', 100000);

      expect(earning).toBe(12000);
    });

    it('should calculate premium upgrade earnings', () => {
      const earning = calculateAffiliateEarnings('premium_upgrade', 499);

      expect(earning).toBeCloseTo(74.85, 1);
    });

    it('should handle zero amount', () => {
      const earning = calculateAffiliateEarnings('flight_booking', 0);

      expect(earning).toBe(0);
    });

    it('should handle fractional amounts', () => {
      const earning = calculateAffiliateEarnings('flight_booking', 1234.56);

      expect(earning).toBeCloseTo(74.07, 1);
    });
  });

  describe('canAccessFeature', () => {
    it('should allow all features for PREMIUM users', () => {
      expect(canAccessFeature(SubscriptionTier.PREMIUM, 'voiceBio')).toBe(true);
      expect(canAccessFeature(SubscriptionTier.PREMIUM, 'aiStylist')).toBe(true);
      expect(canAccessFeature(SubscriptionTier.PREMIUM, 'itineraryExport')).toBe(true);
    });

    it('should deny premium features for FREE users', () => {
      expect(canAccessFeature(SubscriptionTier.FREE, 'voiceBio')).toBe(false);
      expect(canAccessFeature(SubscriptionTier.FREE, 'aiStylist')).toBe(false);
    });

    it('should allow all features for PLATINUM users', () => {
      expect(canAccessFeature(SubscriptionTier.PLATINUM, 'voiceBio')).toBe(true);
      expect(canAccessFeature(SubscriptionTier.PLATINUM, 'aiStylist')).toBe(true);
      expect(canAccessFeature(SubscriptionTier.PLATINUM, 'expenseTracking')).toBe(true);
    });

    it('should allow unlisted features for all tiers', () => {
      expect(canAccessFeature(SubscriptionTier.FREE, 'basicProfile')).toBe(true);
      expect(canAccessFeature(SubscriptionTier.FREE, 'browseMatches')).toBe(true);
    });
  });
});
