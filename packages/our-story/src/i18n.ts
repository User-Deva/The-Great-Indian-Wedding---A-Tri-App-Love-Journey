/**
 * Internationalization System
 *
 * Support for 10 Indian languages + English
 */

export enum Language {
  EN = 'en',
  HI = 'hi', // Hindi
  TA = 'ta', // Tamil
  TE = 'te', // Telugu
  KN = 'kn', // Kannada
  ML = 'ml', // Malayalam
  BN = 'bn', // Bengali
  MR = 'mr', // Marathi
  GU = 'gu', // Gujarati
  PA = 'pa', // Punjabi
  OR = 'or', // Odia
}

export const LANGUAGE_NAMES: Record<Language, { english: string; native: string }> = {
  [Language.EN]: { english: 'English', native: 'English' },
  [Language.HI]: { english: 'Hindi', native: 'हिंदी' },
  [Language.TA]: { english: 'Tamil', native: 'தமிழ்' },
  [Language.TE]: { english: 'Telugu', native: 'తెలుగు' },
  [Language.KN]: { english: 'Kannada', native: 'ಕನ್ನಡ' },
  [Language.ML]: { english: 'Malayalam', native: 'മലയാളം' },
  [Language.BN]: { english: 'Bengali', native: 'বাংলা' },
  [Language.MR]: { english: 'Marathi', native: 'मराठी' },
  [Language.GU]: { english: 'Gujarati', native: 'ગુજરાતી' },
  [Language.PA]: { english: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  [Language.OR]: { english: 'Odia', native: 'ଓଡ଼ିଆ' },
};

export interface TranslationStrings {
  [key: string]: string | TranslationStrings;
}

export interface LanguageResources {
  language: Language;
  translations: TranslationStrings;
}

// English translations (base)
export const EN_TRANSLATIONS: TranslationStrings = {
  app: {
    name: 'The Great Indian Wedding',
    tagline: 'Your Complete Love Journey',
  },
  rishta: {
    title: 'Rishta — The Matchmaker',
    subtitle: 'Where destinies meet over chai',
    browseMatches: 'Browse Matches',
    expressInterest: 'Express Interest',
    viewProfile: 'View Profile',
    compatibilityScore: 'Compatibility Score',
  },
  shaadi: {
    title: 'Shaadi Sajao — Wedding Planner',
    subtitle: 'Because every love story deserves a grand chapter',
    budgetTracker: 'Budget Tracker',
    vendorHub: 'Vendor Hub',
    weddingStyler: 'Wedding Stylist',
    guestList: 'Guest List',
  },
  jannat: {
    title: 'Jannat Safar — Honeymoon Planner',
    subtitle: 'Your forever begins with the perfect escape',
    destinations: 'Destinations',
    bookFlight: 'Book Flight',
    bookHotel: 'Book Hotel',
    itinerary: 'Itinerary',
  },
  common: {
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    submit: 'Submit',
    next: 'Next',
    previous: 'Previous',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    viewMore: 'View More',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    logout: 'Logout',
  },
  messages: {
    welcomeBack: 'Welcome back!',
    matchFound: 'You have a new match!',
    dateScheduled: 'Your first date is scheduled',
    weddingPlanned: 'Your wedding planning is complete',
    honeymoonBooked: 'Your honeymoon is booked',
  },
};

// Hindi translations
export const HI_TRANSLATIONS: TranslationStrings = {
  app: {
    name: 'द ग्रेट इंडियन वेडिंग',
    tagline: 'आपकी पूर्ण प्रेम यात्रा',
  },
  rishta: {
    title: 'रिश्ता — द मैचमेकर',
    subtitle: 'जहां भाग्य चाय के ऊपर मिलते हैं',
    browseMatches: 'मैच देखें',
    expressInterest: 'रुचि व्यक्त करें',
    viewProfile: 'प्रोफाइल देखें',
    compatibilityScore: 'संगतता स्कोर',
  },
  shaadi: {
    title: 'शादी साजो — वेडिंग प्लानर',
    subtitle: 'क्योंकि हर प्रेम कहानी एक भव्य अध्याय की हकदार है',
    budgetTracker: 'बजट ट्रैकर',
    vendorHub: 'विक्रेता हब',
    weddingStyler: 'वेडिंग स्टाइलिस्ट',
    guestList: 'अतिथि सूची',
  },
  jannat: {
    title: 'जन्नत सफर — हनीमून प्लानर',
    subtitle: 'आपका सदा एक सही पलायन के साथ शुरू होता है',
    destinations: 'गंतव्य',
    bookFlight: 'उड़ान बुक करें',
    bookHotel: 'होटल बुक करें',
    itinerary: 'यात्रा कार्यक्रम',
  },
  common: {
    save: 'सहेजें',
    edit: 'संपादित करें',
    delete: 'हटाएँ',
    cancel: 'रद्द करें',
    submit: 'जमा करें',
    next: 'अगला',
    previous: 'पिछला',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफल',
    viewMore: 'और देखें',
    signIn: 'साइन इन करें',
    signUp: 'साइन अप करें',
    logout: 'लॉग आउट',
  },
  messages: {
    welcomeBack: 'वापस स्वागत है!',
    matchFound: 'आपको एक नया मैच मिला!',
    dateScheduled: 'आपकी पहली तारीख निर्धारित है',
    weddingPlanned: 'आपकी शादी की योजना पूरी हो गई',
    honeymoonBooked: 'आपका हनीमून बुक हो गया',
  },
};

// Placeholder translations for other languages (would be expanded in production)
export const LANGUAGE_RESOURCES: Record<Language, LanguageResources> = {
  [Language.EN]: { language: Language.EN, translations: EN_TRANSLATIONS },
  [Language.HI]: { language: Language.HI, translations: HI_TRANSLATIONS },
  [Language.TA]: { language: Language.TA, translations: EN_TRANSLATIONS }, // Fallback to English
  [Language.TE]: { language: Language.TE, translations: EN_TRANSLATIONS },
  [Language.KN]: { language: Language.KN, translations: EN_TRANSLATIONS },
  [Language.ML]: { language: Language.ML, translations: EN_TRANSLATIONS },
  [Language.BN]: { language: Language.BN, translations: EN_TRANSLATIONS },
  [Language.MR]: { language: Language.MR, translations: EN_TRANSLATIONS },
  [Language.GU]: { language: Language.GU, translations: EN_TRANSLATIONS },
  [Language.PA]: { language: Language.PA, translations: EN_TRANSLATIONS },
  [Language.OR]: { language: Language.OR, translations: EN_TRANSLATIONS },
};

/**
 * Get translation for a key
 */
export function getTranslation(language: Language, key: string, defaultValue: string = key): string {
  const resources = LANGUAGE_RESOURCES[language];
  const keys = key.split('.');
  let value: any = resources.translations;

  for (const k of keys) {
    if (typeof value === 'object' && value !== null && k in value) {
      value = value[k];
    } else {
      return defaultValue;
    }
  }

  return typeof value === 'string' ? value : defaultValue;
}

/**
 * Translate object with replacements
 */
export function translate(
  language: Language,
  key: string,
  replacements: Record<string, string> = {}
): string {
  let text = getTranslation(language, key, key);

  // Replace placeholders like {{name}} with values
  Object.entries(replacements).forEach(([placeholder, value]) => {
    text = text.replace(`{{${placeholder}}}`, value);
  });

  return text;
}

/**
 * Get user's preferred language from browser
 */
export function getPreferredLanguage(): Language {
  if (typeof navigator === 'undefined') return Language.EN;

  const browserLang = navigator.language.split('-')[0];
  const lang = Object.values(Language).find((l) => l === browserLang);
  return lang || Language.EN;
}

/**
 * Format date in locale
 */
export function formatDate(date: Date, language: Language): string {
  const localeMap: Record<Language, string> = {
    [Language.EN]: 'en-IN',
    [Language.HI]: 'hi-IN',
    [Language.TA]: 'ta-IN',
    [Language.TE]: 'te-IN',
    [Language.KN]: 'kn-IN',
    [Language.ML]: 'ml-IN',
    [Language.BN]: 'bn-IN',
    [Language.MR]: 'mr-IN',
    [Language.GU]: 'gu-IN',
    [Language.PA]: 'pa-IN',
    [Language.OR]: 'or-IN',
  };

  const locale = localeMap[language];
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Format currency in locale
 */
export function formatCurrency(amount: number, currency: string, language: Language): string {
  const localeMap: Record<Language, string> = {
    [Language.EN]: 'en-IN',
    [Language.HI]: 'hi-IN',
    [Language.TA]: 'ta-IN',
    [Language.TE]: 'te-IN',
    [Language.KN]: 'kn-IN',
    [Language.ML]: 'ml-IN',
    [Language.BN]: 'bn-IN',
    [Language.MR]: 'mr-IN',
    [Language.GU]: 'gu-IN',
    [Language.PA]: 'pa-IN',
    [Language.OR]: 'or-IN',
  };

  const locale = localeMap[language];
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

/**
 * Get all supported languages
 */
export function getSupportedLanguages(): Array<{ code: Language; name: string; native: string }> {
  return Object.entries(LANGUAGE_NAMES).map(([code, names]) => ({
    code: code as Language,
    name: names.english,
    native: names.native,
  }));
}
