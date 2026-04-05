import { UserProfile, KundaliType } from '../types';

/**
 * Kismat Match Engine
 *
 * Calculates compatibility between two users based on:
 * 1. Lifestyle compatibility (40%)
 * 2. Personality type compatibility (30%)
 * 3. Guna Milan score (20%)
 * 4. Family alignment (10%)
 */

// Kundali type compatibility matrix (0-100)
const KUNDALI_COMPATIBILITY: Record<KundaliType, Record<KundaliType, number>> = {
  [KundaliType.AMBITIOUS_ARJUN]: {
    [KundaliType.AMBITIOUS_ARJUN]: 85,
    [KundaliType.NURTURING_NAINA]: 80,
    [KundaliType.FREE_SPIRITED_FREYA]: 70,
    [KundaliType.CREATIVE_KARAN]: 75,
    [KundaliType.ADVENTUROUS_AISHA]: 78,
    [KundaliType.STEADFAST_SAMEER]: 82,
  },
  [KundaliType.NURTURING_NAINA]: {
    [KundaliType.AMBITIOUS_ARJUN]: 80,
    [KundaliType.NURTURING_NAINA]: 88,
    [KundaliType.FREE_SPIRITED_FREYA]: 72,
    [KundaliType.CREATIVE_KARAN]: 79,
    [KundaliType.ADVENTUROUS_AISHA]: 75,
    [KundaliType.STEADFAST_SAMEER]: 85,
  },
  [KundaliType.FREE_SPIRITED_FREYA]: {
    [KundaliType.AMBITIOUS_ARJUN]: 70,
    [KundaliType.NURTURING_NAINA]: 72,
    [KundaliType.FREE_SPIRITED_FREYA]: 80,
    [KundaliType.CREATIVE_KARAN]: 85,
    [KundaliType.ADVENTUROUS_AISHA]: 88,
    [KundaliType.STEADFAST_SAMEER]: 65,
  },
  [KundaliType.CREATIVE_KARAN]: {
    [KundaliType.AMBITIOUS_ARJUN]: 75,
    [KundaliType.NURTURING_NAINA]: 79,
    [KundaliType.FREE_SPIRITED_FREYA]: 85,
    [KundaliType.CREATIVE_KARAN]: 86,
    [KundaliType.ADVENTUROUS_AISHA]: 80,
    [KundaliType.STEADFAST_SAMEER]: 72,
  },
  [KundaliType.ADVENTUROUS_AISHA]: {
    [KundaliType.AMBITIOUS_ARJUN]: 78,
    [KundaliType.NURTURING_NAINA]: 75,
    [KundaliType.FREE_SPIRITED_FREYA]: 88,
    [KundaliType.CREATIVE_KARAN]: 80,
    [KundaliType.ADVENTUROUS_AISHA]: 84,
    [KundaliType.STEADFAST_SAMEER]: 68,
  },
  [KundaliType.STEADFAST_SAMEER]: {
    [KundaliType.AMBITIOUS_ARJUN]: 82,
    [KundaliType.NURTURING_NAINA]: 85,
    [KundaliType.FREE_SPIRITED_FREYA]: 65,
    [KundaliType.CREATIVE_KARAN]: 72,
    [KundaliType.ADVENTUROUS_AISHA]: 68,
    [KundaliType.STEADFAST_SAMEER]: 87,
  },
};

/**
 * Calculate lifestyle compatibility (40% weight)
 * Considers: diet, family type, smoking/drinking, education level
 */
function calculateLifestyleCompatibility(profile1: UserProfile, profile2: UserProfile): number {
  let score = 0;
  let maxScore = 0;

  // Diet compatibility (10 points)
  maxScore += 10;
  if (profile1.lifestyleInfo.diet === profile2.lifestyleInfo.diet) {
    score += 10;
  } else if (
    (profile1.lifestyleInfo.diet === 'vegetarian' && profile2.lifestyleInfo.diet === 'vegan') ||
    (profile1.lifestyleInfo.diet === 'vegan' && profile2.lifestyleInfo.diet === 'vegetarian')
  ) {
    score += 8;
  } else {
    score += 4; // Different diets but compatible
  }

  // Family type compatibility (10 points)
  maxScore += 10;
  if (profile1.lifestyleInfo.familyType === profile2.lifestyleInfo.familyType) {
    score += 10;
  } else {
    score += 5; // Some compromise possible
  }

  // Drinking/Smoking alignment (10 points)
  maxScore += 10;
  const drink1 = profile1.lifestyleInfo.drinking;
  const drink2 = profile2.lifestyleInfo.drinking;
  const smoke1 = profile1.lifestyleInfo.smoking;
  const smoke2 = profile2.lifestyleInfo.smoking;

  if (drink1 === drink2 && smoke1 === smoke2) {
    score += 10;
  } else if (
    (drink1 === drink2 && smoke1 !== smoke2) ||
    (drink1 !== drink2 && smoke1 === smoke2)
  ) {
    score += 6;
  } else {
    score += 2;
  }

  // Education alignment (5 points)
  maxScore += 5;
  const edu1 = profile1.lifestyleInfo.education.toLowerCase();
  const edu2 = profile2.lifestyleInfo.education.toLowerCase();
  if (edu1 === edu2) {
    score += 5;
  } else {
    score += 2;
  }

  return Math.round((score / maxScore) * 100);
}

/**
 * Calculate personality type compatibility (30% weight)
 */
function calculatePersonalityCompatibility(profile1: UserProfile, profile2: UserProfile): number {
  const kundali1 = profile1.kundaliType;
  const kundali2 = profile2.kundaliType;

  return KUNDALI_COMPATIBILITY[kundali1][kundali2];
}

/**
 * Calculate Guna Milan compatibility (20% weight)
 * Based on Vedic horoscope matching
 */
function calculateGunaCompatibility(profile1: UserProfile, profile2: UserProfile): number {
  const guna1 = profile1.horoscopeInfo.gunaMilanScore || 0;
  const guna2 = profile2.horoscopeInfo.gunaMilanScore || 0;

  if (guna1 === 0 || guna2 === 0) {
    // If horoscope data missing, default to neutral score
    return 50;
  }

  // Average of both Guna Milan scores, normalized to 0-100
  const average = (guna1 + guna2) / 2;
  return Math.round((average / 36) * 100); // Scale to 0-100
}

/**
 * Calculate family alignment (10% weight)
 */
function calculateFamilyAlignment(profile1: UserProfile, profile2: UserProfile): number {
  let score = 0;

  // Religion/caste alignment
  if (profile1.personalInfo.religion === profile2.personalInfo.religion) {
    score += 50;
  } else {
    score += 20; // Cross-religion matches possible but lower score
  }

  // Mother tongue alignment
  if (profile1.personalInfo.motherTongue === profile2.personalInfo.motherTongue) {
    score += 50;
  } else {
    score += 25; // Language difference is manageable
  }

  return Math.round(score / 2);
}

/**
 * Main compatibility scoring function
 * Returns overall compatibility score (0-100)
 */
export function calculateCompatibilityScore(
  profile1: UserProfile,
  profile2: UserProfile
): number {
  const lifestyleScore = calculateLifestyleCompatibility(profile1, profile2);
  const personalityScore = calculatePersonalityCompatibility(profile1, profile2);
  const gunaScore = calculateGunaCompatibility(profile1, profile2);
  const familyScore = calculateFamilyAlignment(profile1, profile2);

  // Weighted average (40% + 30% + 20% + 10%)
  const overallScore =
    lifestyleScore * 0.4 +
    personalityScore * 0.3 +
    gunaScore * 0.2 +
    familyScore * 0.1;

  return Math.round(overallScore);
}

/**
 * Get compatibility breakdown (for detailed reporting)
 */
export function getCompatibilityBreakdown(
  profile1: UserProfile,
  profile2: UserProfile
) {
  return {
    lifestyle: calculateLifestyleCompatibility(profile1, profile2),
    personality: calculatePersonalityCompatibility(profile1, profile2),
    guna: calculateGunaCompatibility(profile1, profile2),
    family: calculateFamilyAlignment(profile1, profile2),
    overall: calculateCompatibilityScore(profile1, profile2),
  };
}

/**
 * Get compatibility interpretation
 */
export function getCompatibilityMessage(score: number): string {
  if (score >= 85) return '✨ Excellent match! Kismat is shining brightly.';
  if (score >= 75) return '💕 Great match! Strong potential together.';
  if (score >= 65) return '🌸 Good match! Worth exploring.';
  if (score >= 55) return '☕ Compatible! Interesting connection.';
  if (score >= 40) return '🤔 Some alignment, but challenges ahead.';
  return '❌ Different paths. Maybe just friends?';
}
