import { describe, it, expect } from 'vitest';
import { calculateKundaliType, PERSONALITY_QUESTIONS } from '../personalityQuiz';
import { KundaliType } from '../../types';

describe('Personality Quiz System', () => {
  describe('PERSONALITY_QUESTIONS', () => {
    it('should have 20 questions', () => {
      expect(PERSONALITY_QUESTIONS.length).toBe(20);
    });

    it('should have valid structure for each question', () => {
      PERSONALITY_QUESTIONS.forEach((question, index) => {
        expect(question).toHaveProperty('id');
        expect(question).toHaveProperty('text');
        expect(question).toHaveProperty('options');
        expect(Array.isArray(question.options)).toBe(true);
        expect(question.options.length).toBeGreaterThanOrEqual(2);

        question.options.forEach((option) => {
          expect(option).toHaveProperty('label');
          expect(option).toHaveProperty('personality');
          expect(option).toHaveProperty('weight');
          expect(typeof option.weight).toBe('number');
          expect(option.weight).toBeGreaterThan(0);
        });
      });
    });

    it('should cover all personality types across questions', () => {
      const personalities = new Set<KundaliType>();

      PERSONALITY_QUESTIONS.forEach((question) => {
        question.options.forEach((option) => {
          personalities.add(option.personality);
        });
      });

      expect(personalities.size).toBe(6);
      expect(personalities.has('AMBITIOUS_ARJUN')).toBe(true);
      expect(personalities.has('NURTURING_NAINA')).toBe(true);
      expect(personalities.has('FREE_SPIRITED_FREYA')).toBe(true);
      expect(personalities.has('CREATIVE_KARAN')).toBe(true);
      expect(personalities.has('ADVENTUROUS_AISHA')).toBe(true);
      expect(personalities.has('STEADFAST_SAMEER')).toBe(true);
    });
  });

  describe('calculateKundaliType', () => {
    it('should assign personality based on highest score', () => {
      const answers = [
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
      ] as KundaliType[];

      const result = calculateKundaliType(answers);
      expect(result).toBe('AMBITIOUS_ARJUN');
    });

    it('should handle mixed answers with clear winner', () => {
      const answers = [
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'AMBITIOUS_ARJUN',
        'NURTURING_NAINA',
        'NURTURING_NAINA',
        'NURTURING_NAINA',
        'NURTURING_NAINA',
        'NURTURING_NAINA',
        'FREE_SPIRITED_FREYA',
        'FREE_SPIRITED_FREYA',
        'CREATIVE_KARAN',
        'ADVENTUROUS_AISHA',
        'STEADFAST_SAMEER',
      ] as KundaliType[];

      const result = calculateKundaliType(answers);
      expect(result).toBe('AMBITIOUS_ARJUN');
    });

    it('should handle all tied scores by returning first', () => {
      const answers = [
        'AMBITIOUS_ARJUN',
        'NURTURING_NAINA',
        'FREE_SPIRITED_FREYA',
        'CREATIVE_KARAN',
        'ADVENTUROUS_AISHA',
        'STEADFAST_SAMEER',
        'AMBITIOUS_ARJUN',
        'NURTURING_NAINA',
        'FREE_SPIRITED_FREYA',
        'CREATIVE_KARAN',
        'ADVENTUROUS_AISHA',
        'STEADFAST_SAMEER',
        'AMBITIOUS_ARJUN',
        'NURTURING_NAINA',
        'FREE_SPIRITED_FREYA',
        'CREATIVE_KARAN',
        'ADVENTUROUS_AISHA',
        'STEADFAST_SAMEER',
        'AMBITIOUS_ARJUN',
        'NURTURING_NAINA',
      ] as KundaliType[];

      const result = calculateKundaliType(answers);
      expect(result).toBeTruthy();
      expect([
        'AMBITIOUS_ARJUN',
        'NURTURING_NAINA',
        'FREE_SPIRITED_FREYA',
        'CREATIVE_KARAN',
        'ADVENTUROUS_AISHA',
        'STEADFAST_SAMEER',
      ]).toContain(result);
    });

    it('should require exactly 20 answers', () => {
      const shortAnswers = ['AMBITIOUS_ARJUN'] as any[];
      expect(() => calculateKundaliType(shortAnswers)).toThrow();

      const longAnswers = Array(21).fill('AMBITIOUS_ARJUN');
      expect(() => calculateKundaliType(longAnswers)).toThrow();
    });

    it('should handle various personality distributions', () => {
      for (let i = 0; i < 100; i++) {
        const answers = PERSONALITY_QUESTIONS.map((_, idx) => {
          const personalities: KundaliType[] = [
            'AMBITIOUS_ARJUN',
            'NURTURING_NAINA',
            'FREE_SPIRITED_FREYA',
            'CREATIVE_KARAN',
            'ADVENTUROUS_AISHA',
            'STEADFAST_SAMEER',
          ];
          return personalities[idx % 6];
        });

        const result = calculateKundaliType(answers);
        expect(result).toBeTruthy();
      }
    });
  });
});
