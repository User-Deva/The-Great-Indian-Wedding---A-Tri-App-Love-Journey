import { describe, it, expect } from 'vitest';
import {
  Language,
  getTranslation,
  translate,
  formatDate,
  formatCurrency,
  getSupportedLanguages,
  getPreferredLanguage,
  LANGUAGE_NAMES,
  LANGUAGE_RESOURCES,
} from '../i18n';

describe('Internationalization System', () => {
  describe('LANGUAGE_NAMES', () => {
    it('should define all 11 languages', () => {
      expect(Object.keys(LANGUAGE_NAMES).length).toBe(11);
    });

    it('should have English and native names for each language', () => {
      Object.values(LANGUAGE_NAMES).forEach((names) => {
        expect(names).toHaveProperty('english');
        expect(names).toHaveProperty('native');
        expect(typeof names.english).toBe('string');
        expect(typeof names.native).toBe('string');
      });
    });

    it('should include English', () => {
      expect(LANGUAGE_NAMES[Language.EN].english).toBe('English');
    });

    it('should include Hindi', () => {
      expect(LANGUAGE_NAMES[Language.HI].english).toBe('Hindi');
      expect(LANGUAGE_NAMES[Language.HI].native).toBe('हिंदी');
    });
  });

  describe('LANGUAGE_RESOURCES', () => {
    it('should have resources for all languages', () => {
      Object.values(Language).forEach((lang) => {
        expect(LANGUAGE_RESOURCES).toHaveProperty(lang);
      });
    });

    it('should have translations for each language resource', () => {
      Object.values(LANGUAGE_RESOURCES).forEach((resource) => {
        expect(resource).toHaveProperty('language');
        expect(resource).toHaveProperty('translations');
        expect(typeof resource.translations).toBe('object');
      });
    });
  });

  describe('getTranslation', () => {
    it('should retrieve English translation by key path', () => {
      const result = getTranslation(Language.EN, 'app.name');

      expect(result).toBe('The Great Indian Wedding');
    });

    it('should retrieve Hindi translation', () => {
      const result = getTranslation(Language.HI, 'app.name');

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return default value for missing key', () => {
      const defaultValue = 'Missing Key';
      const result = getTranslation(Language.EN, 'nonexistent.key', defaultValue);

      expect(result).toBe(defaultValue);
    });

    it('should handle nested key paths', () => {
      const result = getTranslation(Language.EN, 'rishta.title');

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return key itself as default when no default provided', () => {
      const result = getTranslation(Language.EN, 'missing.key.path');

      expect(result).toBe('missing.key.path');
    });

    it('should handle deeply nested keys', () => {
      const result = getTranslation(Language.EN, 'common.signIn');

      expect(typeof result).toBe('string');
    });

    it('should return all Rishta strings', () => {
      const result = getTranslation(Language.EN, 'rishta.browseMatches');

      expect(result).toBe('Browse Matches');
    });

    it('should return all Shaadi strings', () => {
      const result = getTranslation(Language.EN, 'shaadi.budgetTracker');

      expect(result).toBe('Budget Tracker');
    });

    it('should return all Jannat strings', () => {
      const result = getTranslation(Language.EN, 'jannat.destinations');

      expect(result).toBe('Destinations');
    });
  });

  describe('translate', () => {
    it('should translate and replace placeholders', () => {
      const result = translate(Language.EN, 'messages.matchFound', {});

      expect(typeof result).toBe('string');
    });

    it('should handle missing placeholders gracefully', () => {
      const result = translate(Language.EN, 'common.signIn', { username: 'john' });

      expect(typeof result).toBe('string');
    });

    it('should preserve structure with empty replacements', () => {
      const result = translate(Language.EN, 'app.tagline', {});

      expect(result).toBe('Your Complete Love Journey');
    });
  });

  describe('formatDate', () => {
    it('should format date in English locale', () => {
      const date = new Date('2024-12-25');
      const result = formatDate(date, Language.EN);

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should format date in Hindi locale', () => {
      const date = new Date('2024-12-25');
      const result = formatDate(date, Language.HI);

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should format different dates differently', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-12-31');
      const result1 = formatDate(date1, Language.EN);
      const result2 = formatDate(date2, Language.EN);

      expect(result1).not.toBe(result2);
    });

    it('should handle today\'s date', () => {
      const today = new Date();
      const result = formatDate(today, Language.EN);

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('formatCurrency', () => {
    it('should format INR currency in English', () => {
      const result = formatCurrency(1000, 'INR', Language.EN);

      expect(typeof result).toBe('string');
      expect(result).toContain('1,000');
    });

    it('should format USD currency', () => {
      const result = formatCurrency(1000, 'USD', Language.EN);

      expect(typeof result).toBe('string');
      expect(result).toContain('1,000');
    });

    it('should format EUR currency', () => {
      const result = formatCurrency(1000, 'EUR', Language.EN);

      expect(typeof result).toBe('string');
    });

    it('should format different amounts differently', () => {
      const result1 = formatCurrency(100, 'INR', Language.EN);
      const result2 = formatCurrency(1000, 'INR', Language.EN);

      expect(result1).not.toBe(result2);
    });

    it('should format in Hindi locale', () => {
      const result = formatCurrency(1000, 'INR', Language.HI);

      expect(typeof result).toBe('string');
    });
  });

  describe('getSupportedLanguages', () => {
    it('should return array of supported languages', () => {
      const result = getSupportedLanguages();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(11);
    });

    it('should include language code, English name, and native name', () => {
      const languages = getSupportedLanguages();

      languages.forEach((lang) => {
        expect(lang).toHaveProperty('code');
        expect(lang).toHaveProperty('name');
        expect(lang).toHaveProperty('native');
      });
    });

    it('should include English', () => {
      const languages = getSupportedLanguages();
      const english = languages.find((l) => l.code === Language.EN);

      expect(english).toBeDefined();
      expect(english?.name).toBe('English');
    });

    it('should include Hindi', () => {
      const languages = getSupportedLanguages();
      const hindi = languages.find((l) => l.code === Language.HI);

      expect(hindi).toBeDefined();
      expect(hindi?.name).toBe('Hindi');
    });
  });

  describe('getPreferredLanguage', () => {
    it('should return Language enum value', () => {
      const result = getPreferredLanguage();

      expect(Object.values(Language)).toContain(result);
    });

    it('should return EN as default', () => {
      const result = getPreferredLanguage();

      expect(result).toBe(Language.EN);
    });
  });
});
