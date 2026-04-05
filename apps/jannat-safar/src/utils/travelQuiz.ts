import { TravelerQuizQuestion, TravelerArchetype } from '../types';

export const TRAVELER_QUIZ_QUESTIONS: TravelerQuizQuestion[] = [
  {
    id: 1,
    question: 'What's your ideal honeymoon vibe?',
    answers: [
      'Relaxing on pristine beaches',
      'Breathing in mountain air',
      'Exploring museums and heritage sites',
      'Going on exciting adventures',
      'Luxury spas and fine dining',
      'Local experiences on a budget',
    ],
    weight: TravelerArchetype.BEACH_LOVERS,
  },
  {
    id: 2,
    question: 'How do you prefer to spend your days?',
    answers: [
      'Swimming, snorkeling, beach activities',
      'Hiking, nature walks, scenic views',
      'Visiting historic sites and galleries',
      'Extreme sports and adrenaline',
      'Spa, wellness, and relaxation',
      'Talking to locals and trying street food',
    ],
    weight: TravelerArchetype.BEACH_LOVERS,
  },
  {
    id: 3,
    question: 'What type of accommodation appeals to you most?',
    answers: [
      'Beachfront resort or overwater bungalow',
      'Mountain lodge or scenic cabin',
      'Heritage palace or historic hotel',
      'Adventure camp or eco-lodge',
      'Luxury 5-star resort with spa',
      'Affordable guesthouse or local homestay',
    ],
    weight: TravelerArchetype.BEACH_LOVERS,
  },
  {
    id: 4,
    question: 'How important is comfort on your honeymoon?',
    answers: [
      'Important but don\'t mind simple stays',
      'Moderate - need some comfort',
      'Important for cultural sites',
      'Less important - adventure is key',
      'Extremely important - want luxury',
      'Happy with budget-friendly options',
    ],
    weight: TravelerArchetype.LUXURY_LOUNGERS,
  },
  {
    id: 5,
    question: 'What weather do you prefer?',
    answers: [
      'Hot and sunny',
      'Cool and crisp',
      'Mild and pleasant',
      'Varied - don\'t mind extremes',
      'Comfortable for relaxation',
      'Any weather works',
    ],
    weight: TravelerArchetype.MOUNTAIN_ROMANTICS,
  },
  {
    id: 6,
    question: 'What attracts you most to a destination?',
    answers: [
      'Beautiful beaches and ocean views',
      'Stunning mountain scenery',
      'Art, history, and culture',
      'Unique experiences and challenges',
      'World-class amenities and services',
      'Authentic local experiences',
    ],
    weight: TravelerArchetype.CULTURE_EXPLORERS,
  },
  {
    id: 7,
    question: 'How do you feel about trying new things?',
    answers: [
      'Love water sports and beach activities',
      'Enjoy mountain activities',
      'Interested in learning local history',
      'Very adventurous - want thrills',
      'Prefer tried and tested experiences',
      'Excited about meeting locals',
    ],
    weight: TravelerArchetype.ADVENTURE_SEEKERS,
  },
  {
    id: 8,
    question: 'What's your ideal budget range for honeymoon?',
    answers: [
      '₹5L - ₹10L (Tropical paradise)',
      '₹5L - ₹15L (Mountain escape)',
      '₹8L - ₹20L (Cultural immersion)',
      '₹8L - ₹20L (Adventure destination)',
      '₹10L+ (Luxury experience)',
      '₹3L - ₹8L (Budget-friendly)',
    ],
    weight: TravelerArchetype.BEACH_LOVERS,
  },
];

/**
 * Calculate traveler archetype from quiz answers
 */
export function calculateTravelerArchetype(answers: number[]): TravelerArchetype {
  const scores: Record<TravelerArchetype, number> = {
    [TravelerArchetype.BEACH_LOVERS]: 0,
    [TravelerArchetype.MOUNTAIN_ROMANTICS]: 0,
    [TravelerArchetype.CULTURE_EXPLORERS]: 0,
    [TravelerArchetype.ADVENTURE_SEEKERS]: 0,
    [TravelerArchetype.LUXURY_LOUNGERS]: 0,
    [TravelerArchetype.BUDGET_SMART]: 0,
  };

  // Score based on answer selections
  TRAVELER_QUIZ_QUESTIONS.forEach((question, index) => {
    const answerIndex = answers[index];
    const weight = question.weight;

    // Give points for matching answer
    if (answerIndex === Object.values(TravelerArchetype).indexOf(weight)) {
      scores[weight] += 3;
    }

    // Give partial points based on position
    scores[weight] += (6 - Math.abs(answerIndex - Object.values(TravelerArchetype).indexOf(weight)));
  });

  // Find the archetype with highest score
  let maxScore = 0;
  let resultArchetype = TravelerArchetype.BEACH_LOVERS;

  Object.entries(scores).forEach(([archetype, score]) => {
    if (score > maxScore) {
      maxScore = score;
      resultArchetype = archetype as TravelerArchetype;
    }
  });

  return resultArchetype;
}

/**
 * Get all quiz questions
 */
export function getQuizQuestions(): TravelerQuizQuestion[] {
  return TRAVELER_QUIZ_QUESTIONS;
}
