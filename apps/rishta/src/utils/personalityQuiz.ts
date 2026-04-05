import { KundaliType, QuizQuestion } from '../types';

export const PERSONALITY_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'How do you define success?',
    answers: [
      'Achieving career milestones and financial security',
      'Building a loving family and deep relationships',
      'Living life on my own terms and exploring new things',
      'Creating something meaningful and beautiful',
      'Experiencing adventure and excitement',
      'Maintaining stability and harmony',
    ],
    weight: KundaliType.AMBITIOUS_ARJUN,
  },
  {
    id: 2,
    question: 'What attracts you most in a partner?',
    answers: [
      'Ambition and drive',
      'Kindness and emotional intelligence',
      'Spontaneity and free spirit',
      'Creativity and depth',
      'Energy and sense of adventure',
      'Loyalty and dependability',
    ],
    weight: KundaliType.AMBITIOUS_ARJUN,
  },
  {
    id: 3,
    question: 'How do you handle conflict?',
    answers: [
      'Analyze and solve pragmatically',
      'Prioritize harmony and understanding',
      'Need space to think independently',
      'Try to understand deeper emotions',
      'Laugh it off and move forward',
      'Take time but resolve methodically',
    ],
    weight: KundaliType.AMBITIOUS_ARJUN,
  },
  {
    id: 4,
    question: 'Your ideal weekend looks like:',
    answers: [
      'Networking or professional development',
      'Time with family and loved ones',
      'Solo adventure or spontaneous trip',
      'Creative project or artistic pursuit',
      'Thrilling activity or sport',
      'Quiet time with books or routine',
    ],
    weight: KundaliType.AMBITIOUS_ARJUN,
  },
  {
    id: 5,
    question: 'What role do you play in your friend group?',
    answers: [
      'The organized achiever',
      'The supportive listener',
      'The trendsetter and free thinker',
      'The deep philosopher',
      'The adventurous one',
      'The reliable steady presence',
    ],
    weight: KundaliType.AMBITIOUS_ARJUN,
  },
  {
    id: 6,
    question: 'How important is family in your life?',
    answers: [
      'Very important, but balance with career',
      'Everything, family comes first',
      'Important but need independence',
      'Very important, want to understand them deeply',
      'Important, but want own adventures first',
      'Extremely important, core to identity',
    ],
    weight: KundaliType.NURTURING_NAINA,
  },
  {
    id: 7,
    question: 'Your biggest life goal is to:',
    answers: [
      'Build wealth and achieve status',
      'Create a loving home',
      'Live authentically on my own terms',
      'Express creativity and passion',
      'Experience everything and travel',
      'Build something stable and lasting',
    ],
    weight: KundaliType.NURTURING_NAINA,
  },
  {
    id: 8,
    question: 'When someone is struggling, you:',
    answers: [
      'Give practical advice and solutions',
      'Listen and provide emotional support',
      'Give them space to figure it out',
      'Help them understand their feelings',
      'Lift their spirits with fun activities',
      'Stand by them consistently',
    ],
    weight: KundaliType.NURTURING_NAINA,
  },
  {
    id: 9,
    question: 'What does freedom mean to you?',
    answers: [
      'Financial independence',
      'Emotional freedom and peace',
      'Living by my own rules',
      'Artistic and creative freedom',
      'Freedom to explore and travel',
      'Freedom from worry and chaos',
    ],
    weight: KundaliType.FREE_SPIRITED_FREYA,
  },
  {
    id: 10,
    question: 'Social gatherings make you feel:',
    answers: [
      'Energized and ready to lead',
      'Happy to care for others',
      'Sometimes drained, need alone time',
      'Introspective and observant',
      'Excited and alive',
      'Comfortable and grounded',
    ],
    weight: KundaliType.FREE_SPIRITED_FREYA,
  },
  {
    id: 11,
    question: 'What inspires you most?',
    answers: [
      'Success stories and achievements',
      'Acts of love and compassion',
      'Nature and authentic living',
      'Art, music, and beauty',
      'New experiences and challenges',
      'Tradition and heritage',
    ],
    weight: KundaliType.CREATIVE_KARAN,
  },
  {
    id: 12,
    question: 'How do you express yourself?',
    answers: [
      'Through work and accomplishments',
      'Through acts of care and service',
      'Through unconventional choices',
      'Through art, music, or creation',
      'Through action and adventure',
      'Through honesty and reliability',
    ],
    weight: KundaliType.CREATIVE_KARAN,
  },
  {
    id: 13,
    question: 'What would make you regret your life?',
    answers: [
      'Not achieving my potential',
      'Not loving fully and deeply',
      'Conforming too much to expectations',
      'Never creating something meaningful',
      'Playing it too safe',
      'Breaking trust with loved ones',
    ],
    weight: KundaliType.CREATIVE_KARAN,
  },
  {
    id: 14,
    question: 'Your relationship style is:',
    answers: [
      'Partnership with shared goals',
      'Deep, nurturing, and supportive',
      'Independent yet connected',
      'Passionate and emotionally intense',
      'Fun, exciting, and unpredictable',
      'Stable, committed, and faithful',
    ],
    weight: KundaliType.ADVENTUROUS_AISHA,
  },
  {
    id: 15,
    question: 'What makes life worth living?',
    answers: [
      'Achieving excellence',
      'Loving and being loved',
      'Freedom and authenticity',
      'Beauty and meaning',
      'Adventure and new experiences',
      'Peace and stability',
    ],
    weight: KundaliType.ADVENTUROUS_AISHA,
  },
  {
    id: 16,
    question: 'How do you prefer to make decisions?',
    answers: [
      'Analyze pros and cons logically',
      'Consider impact on loved ones',
      'Rely on intuition and gut feeling',
      'Listen to my heart and emotions',
      'Go with what feels exciting',
      'Carefully weigh all options',
    ],
    weight: KundaliType.ADVENTUROUS_AISHA,
  },
  {
    id: 17,
    question: 'What matters most in a relationship?',
    answers: [
      'Shared vision and goals',
      'Unconditional love and support',
      'Mutual respect for independence',
      'Emotional depth and understanding',
      'Fun and chemistry',
      'Trust and loyalty',
    ],
    weight: KundaliType.STEADFAST_SAMEER,
  },
  {
    id: 18,
    question: 'You handle pressure by:',
    answers: [
      'Working harder and pushing through',
      'Seeking support from loved ones',
      'Taking time alone to reset',
      'Processing emotions deeply',
      'Doing something active or fun',
      'Following a steady plan',
    ],
    weight: KundaliType.STEADFAST_SAMEER,
  },
  {
    id: 19,
    question: 'Your ideal life partner would:',
    answers: [
      'Share my ambitions',
      'Be my rock and support',
      'Allow me to be myself',
      'Understand my soul',
      'Keep life exciting',
      'Be loyal and committed',
    ],
    weight: KundaliType.STEADFAST_SAMEER,
  },
  {
    id: 20,
    question: 'What does love mean to you?',
    answers: [
      'A partnership working toward goals',
      'Complete acceptance and care',
      'Allowing each other to grow',
      'Deep soul connection',
      'Passionate companionship',
      'Lifelong commitment and stability',
    ],
    weight: KundaliType.STEADFAST_SAMEER,
  },
];

/**
 * Calculate Kundali type from quiz answers
 * Answers are indices (0-5) that map to the Kundali types in order
 */
export function calculateKundaliType(answers: number[]): KundaliType {
  const scores: Record<KundaliType, number> = {
    [KundaliType.AMBITIOUS_ARJUN]: 0,
    [KundaliType.NURTURING_NAINA]: 0,
    [KundaliType.FREE_SPIRITED_FREYA]: 0,
    [KundaliType.CREATIVE_KARAN]: 0,
    [KundaliType.ADVENTUROUS_AISHA]: 0,
    [KundaliType.STEADFAST_SAMEER]: 0,
  };

  // Map answer indices to Kundali types
  PERSONALITY_QUESTIONS.forEach((question, index) => {
    const answerIndex = answers[index];
    const weight = question.weight;

    // The answer index (0-5) maps to the 6 Kundali types
    // We'll add weight based on how many times each type appears in their answers
    scores[weight] += answerIndex === Object.values(KundaliType).indexOf(weight) ? 2 : 1;
  });

  // Find the type with the highest score
  let maxScore = 0;
  let resultType = KundaliType.AMBITIOUS_ARJUN;

  Object.entries(scores).forEach(([type, score]) => {
    if (score > maxScore) {
      maxScore = score;
      resultType = type as KundaliType;
    }
  });

  return resultType;
}

/**
 * Get all questions for the quiz
 */
export function getQuizQuestions(): QuizQuestion[] {
  return PERSONALITY_QUESTIONS;
}

/**
 * Get a single question
 */
export function getQuestion(questionId: number): QuizQuestion | undefined {
  return PERSONALITY_QUESTIONS.find((q) => q.id === questionId);
}
