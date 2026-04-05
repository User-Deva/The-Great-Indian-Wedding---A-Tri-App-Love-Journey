import { describe, it, expect } from 'vitest';
import {
  calculateCompatibilityScore,
  KUNDALI_COMPATIBILITY,
} from '../kismatEngine';

describe('Kismat Engine - Compatibility Scoring', () => {
  describe('calculateCompatibilityScore', () => {
    it('should calculate perfect compatibility for matching profiles', () => {
      const profile1 = {
        personality: 'AMBITIOUS_ARJUN',
        lifestyle: {
          smokingHabits: 'never',
          drinkingHabits: 'occasional',
          foodPreference: 'vegetarian',
          sleepSchedule: 'early-bird',
        },
        horoscope: {
          sign: 'Aries',
          moon: 'Leo',
          ascendant: 'Sagittarius',
        },
        family: {
          caste: 'open',
          religion: 'Hindu',
          familyStructure: 'joint',
        },
      };

      const profile2 = {
        personality: 'NURTURING_NAINA',
        lifestyle: {
          smokingHabits: 'never',
          drinkingHabits: 'occasional',
          foodPreference: 'vegetarian',
          sleepSchedule: 'early-bird',
        },
        horoscope: {
          sign: 'Leo',
          moon: 'Aries',
          ascendant: 'Sagittarius',
        },
        family: {
          caste: 'open',
          religion: 'Hindu',
          familyStructure: 'joint',
        },
      };

      const score = calculateCompatibilityScore(profile1, profile2);
      expect(score).toBeGreaterThanOrEqual(70);
      expect(score).toBeLessThanOrEqual(100);
    });

    it('should return lower score for incompatible lifestyles', () => {
      const smokerProfile = {
        personality: 'AMBITIOUS_ARJUN',
        lifestyle: {
          smokingHabits: 'heavy',
          drinkingHabits: 'daily',
          foodPreference: 'non-vegetarian',
          sleepSchedule: 'night-owl',
        },
        horoscope: {
          sign: 'Aries',
          moon: 'Leo',
          ascendant: 'Sagittarius',
        },
        family: {
          caste: 'open',
          religion: 'Hindu',
          familyStructure: 'nuclear',
        },
      };

      const nonSmokerProfile = {
        personality: 'NURTURING_NAINA',
        lifestyle: {
          smokingHabits: 'never',
          drinkingHabits: 'never',
          foodPreference: 'vegetarian',
          sleepSchedule: 'early-bird',
        },
        horoscope: {
          sign: 'Leo',
          moon: 'Aries',
          ascendant: 'Sagittarius',
        },
        family: {
          caste: 'open',
          religion: 'Hindu',
          familyStructure: 'joint',
        },
      };

      const score = calculateCompatibilityScore(smokerProfile, nonSmokerProfile);
      expect(score).toBeLessThan(50);
    });

    it('should consider personality-based Kundali compatibility', () => {
      const arjunProfile = {
        personality: 'AMBITIOUS_ARJUN',
        lifestyle: {
          smokingHabits: 'never',
          drinkingHabits: 'never',
          foodPreference: 'vegetarian',
          sleepSchedule: 'early-bird',
        },
        horoscope: {
          sign: 'Aries',
          moon: 'Leo',
          ascendant: 'Sagittarius',
        },
        family: {
          caste: 'open',
          religion: 'Hindu',
          familyStructure: 'joint',
        },
      };

      const profiles = [
        'NURTURING_NAINA',
        'FREE_SPIRITED_FREYA',
        'CREATIVE_KARAN',
        'ADVENTUROUS_AISHA',
        'STEADFAST_SAMEER',
      ];

      const scores = profiles.map((personality) => {
        const profileToTest = { ...arjunProfile, personality: personality as any };
        return calculateCompatibilityScore(arjunProfile, profileToTest);
      });

      // Scores should be positive and vary based on personality compatibility
      scores.forEach((score) => {
        expect(score).toBeGreaterThan(0);
        expect(score).toBeLessThanOrEqual(100);
      });
    });

    it('should penalize major family value mismatches', () => {
      const strictFamilyProfile = {
        personality: 'AMBITIOUS_ARJUN',
        lifestyle: {
          smokingHabits: 'never',
          drinkingHabits: 'never',
          foodPreference: 'vegetarian',
          sleepSchedule: 'early-bird',
        },
        horoscope: {
          sign: 'Aries',
          moon: 'Leo',
          ascendant: 'Sagittarius',
        },
        family: {
          caste: 'brahmin',
          religion: 'Hindu',
          familyStructure: 'joint',
        },
      };

      const liberalProfile = {
        personality: 'FREE_SPIRITED_FREYA',
        lifestyle: {
          smokingHabits: 'never',
          drinkingHabits: 'occasional',
          foodPreference: 'non-vegetarian',
          sleepSchedule: 'night-owl',
        },
        horoscope: {
          sign: 'Aquarius',
          moon: 'Pisces',
          ascendant: 'Libra',
        },
        family: {
          caste: 'open',
          religion: 'Atheist',
          familyStructure: 'nuclear',
        },
      };

      const score = calculateCompatibilityScore(strictFamilyProfile, liberalProfile);
      expect(score).toBeLessThan(50);
    });

    it('should handle symmetric scoring', () => {
      const profile1 = {
        personality: 'AMBITIOUS_ARJUN',
        lifestyle: {
          smokingHabits: 'never',
          drinkingHabits: 'occasional',
          foodPreference: 'vegetarian',
          sleepSchedule: 'early-bird',
        },
        horoscope: {
          sign: 'Aries',
          moon: 'Leo',
          ascendant: 'Sagittarius',
        },
        family: {
          caste: 'open',
          religion: 'Hindu',
          familyStructure: 'joint',
        },
      };

      const profile2 = {
        personality: 'NURTURING_NAINA',
        lifestyle: {
          smokingHabits: 'never',
          drinkingHabits: 'occasional',
          foodPreference: 'vegetarian',
          sleepSchedule: 'early-bird',
        },
        horoscope: {
          sign: 'Leo',
          moon: 'Aries',
          ascendant: 'Sagittarius',
        },
        family: {
          caste: 'open',
          religion: 'Hindu',
          familyStructure: 'joint',
        },
      };

      const score1 = calculateCompatibilityScore(profile1, profile2);
      const score2 = calculateCompatibilityScore(profile2, profile1);

      expect(score1).toBe(score2);
    });
  });

  describe('KUNDALI_COMPATIBILITY matrix', () => {
    it('should have 6x6 personality matrix', () => {
      expect(Object.keys(KUNDALI_COMPATIBILITY).length).toBe(6);
      Object.values(KUNDALI_COMPATIBILITY).forEach((row) => {
        expect(Object.keys(row).length).toBe(6);
      });
    });

    it('should have diagonal values >= 80 (same personality)', () => {
      const personalities = Object.keys(KUNDALI_COMPATIBILITY);
      personalities.forEach((personality) => {
        const score = KUNDALI_COMPATIBILITY[personality as any][personality as any];
        expect(score).toBeGreaterThanOrEqual(80);
      });
    });

    it('should have symmetric compatibility scores', () => {
      const personalities = Object.keys(KUNDALI_COMPATIBILITY);
      personalities.forEach((p1) => {
        personalities.forEach((p2) => {
          const score1 = KUNDALI_COMPATIBILITY[p1 as any][p2 as any];
          const score2 = KUNDALI_COMPATIBILITY[p2 as any][p1 as any];
          expect(score1).toBe(score2);
        });
      });
    });
  });
});
