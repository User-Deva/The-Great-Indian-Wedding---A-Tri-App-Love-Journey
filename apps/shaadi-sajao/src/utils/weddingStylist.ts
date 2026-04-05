/**
 * AI Wedding Stylist
 *
 * Generates color palettes, décor suggestions, and mood boards
 * based on user preferences and skin tone
 */

export enum SkinTone {
  FAIR = 'Fair',
  LIGHT = 'Light',
  MEDIUM = 'Medium',
  OLIVE = 'Olive',
  DARK = 'Dark',
  DEEP = 'Deep',
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  lightAccent: string;
  description: string;
}

export const LEHENGA_COLORS_BY_SKIN_TONE: Record<SkinTone, ColorPalette[]> = {
  [SkinTone.FAIR]: [
    {
      primary: '#E91E63', // Deep pink
      secondary: '#FFB6D9', // Light pink
      accent: '#D4AF37', // Gold
      lightAccent: '#FFF8E1', // Cream
      description: 'Classic Pink & Gold — Timeless elegance',
    },
    {
      primary: '#1A1A2E', // Deep navy
      secondary: '#FFD700', // Gold
      accent: '#E8D5B7', // Champagne
      lightAccent: '#FFFFFF', // White
      description: 'Navy & Gold — Sophisticated and regal',
    },
    {
      primary: '#6A1429', // Maroon
      secondary: '#FFB6D9', // Light pink
      accent: '#D4AF37', // Gold
      lightAccent: '#FFF8E1', // Cream
      description: 'Maroon & Pink — Bold and romantic',
    },
  ],
  [SkinTone.LIGHT]: [
    {
      primary: '#C2185B', // Deep magenta
      secondary: '#FF69B4', // Hot pink
      accent: '#FFD700', // Gold
      lightAccent: '#FFF8DC', // Cornsilk
      description: 'Magenta & Gold — Vibrant and striking',
    },
    {
      primary: '#00695C', // Teal
      secondary: '#FFD700', // Gold
      accent: '#FF7043', // Coral
      lightAccent: '#FFFFFF', // White
      description: 'Teal & Gold — Modern and exotic',
    },
    {
      primary: '#8B0000', // Dark red
      secondary: '#FFB6C1', // Light pink
      accent: '#DAA520', // Goldenrod
      lightAccent: '#FFFACD', // Lemon chiffon
      description: 'Red & Pink — Passionate and bold',
    },
  ],
  [SkinTone.MEDIUM]: [
    {
      primary: '#B71C1C', // Royal red
      secondary: '#FFB6D9', // Light pink
      accent: '#D4AF37', // Gold
      lightAccent: '#FFF8E1', // Cream
      description: 'Royal Red & Gold — Classic Indian bridal',
    },
    {
      primary: '#FF6B35', // Vibrant orange
      secondary: '#FFB6D9', // Light pink
      accent: '#FFD700', // Gold
      lightAccent: '#FFFACD', // Lemon chiffon
      description: 'Orange & Gold — Warm and celebratory',
    },
    {
      primary: '#5E35B1', // Deep purple
      secondary: '#CE93D8', // Light purple
      accent: '#FFD700', // Gold
      lightAccent: '#F3E5F5', // Lavender
      description: 'Purple & Gold — Regal and mystical',
    },
  ],
  [SkinTone.OLIVE]: [
    {
      primary: '#D4AF37', // Gold
      secondary: '#6A1429', // Maroon
      accent: '#FFFFFF', // White
      lightAccent: '#FFE4B5', // Moccasin
      description: 'Gold & Maroon — Warm and luxurious',
    },
    {
      primary: '#00897B', // Teal-green
      secondary: '#FFD700', // Gold
      accent: '#FF6B6B', // Red
      lightAccent: '#FFFFFF', // White
      description: 'Teal & Gold — Fresh and sophisticated',
    },
    {
      primary: '#BF360C', // Deep orange
      secondary: '#FFD700', // Gold
      accent: '#FFFFFF', // White
      lightAccent: '#FFE4B5', // Moccasin
      description: 'Orange & Gold — Warm and vibrant',
    },
  ],
  [SkinTone.DARK]: [
    {
      primary: '#FFD700', // Gold
      secondary: '#C2185B', // Deep magenta
      accent: '#FFFFFF', // White
      lightAccent: '#FFF8E1', // Cream
      description: 'Gold & Magenta — Striking and radiant',
    },
    {
      primary: '#FF6F00', // Deep orange
      secondary: '#FFD700', // Gold
      accent: '#FFFFFF', // White
      lightAccent: '#FFFACD', // Lemon chiffon
      description: 'Orange & Gold — Bold and luminous',
    },
    {
      primary: '#C71585', // Medium violet red
      secondary: '#FFD700', // Gold
      accent: '#FFFFFF', // White
      lightAccent: '#FFE4E1', // Misty rose
      description: 'Violet & Gold — Elegant and powerful',
    },
  ],
  [SkinTone.DEEP]: [
    {
      primary: '#FFD700', // Gold
      secondary: '#1A1A2E', // Deep navy
      accent: '#FF6F00', // Orange
      lightAccent: '#FFFFFF', // White
      description: 'Gold & Navy — Luminous and regal',
    },
    {
      primary: '#FF6F00', // Deep orange
      secondary: '#D4AF37', // Gold
      accent: '#FFFFFF', // White
      lightAccent: '#FFFACD', // Lemon chiffon
      description: 'Orange & Gold — Vibrant and majestic',
    },
    {
      primary: '#E91E63', // Pink
      secondary: '#FFD700', // Gold
      accent: '#FFFFFF', // White
      lightAccent: '#FFE4E1', // Misty rose
      description: 'Pink & Gold — Romantic and radiant',
    },
  ],
};

export interface DecorTheme {
  name: string;
  colorPalette: string[];
  flowerSuggestions: string[];
  lightingStyle: string;
  stageDesign: string;
  centerpieceSuggestions: string[];
}

export const DECOR_THEMES: Record<string, DecorTheme> = {
  royal: {
    name: 'Royal & Regal',
    colorPalette: ['#6A1429', '#D4AF37', '#FFFFFF'],
    flowerSuggestions: ['Red roses', 'Gold-painted ferns', 'White orchids', 'Burgundy carnations'],
    lightingStyle: 'Warm golden uplighting with crystal chandeliers',
    stageDesign: 'Grand canopy with draped fabrics and ornate columns',
    centerpieceSuggestions: ['Golden candelabras', 'Roses with gold leaf', 'Jeweled vessels'],
  },
  romantic: {
    name: 'Romantic & Intimate',
    colorPalette: ['#F4A7B9', '#F7E7CE', '#8FAF7E'],
    flowerSuggestions: ['Blush roses', 'Eucalyptus', 'White ranunculus', 'Baby's breath'],
    lightingStyle: 'Soft candlelight with string lights',
    stageDesign: 'Floral arch with draped voile and fairy lights',
    centerpieceSuggestions: ['Vintage candles', 'Pastel flowers', 'Lace runners'],
  },
  modern: {
    name: 'Modern & Minimalist',
    colorPalette: ['#00695C', '#FF7043', '#FFFFFF'],
    flowerSuggestions: ['White anthuriums', 'Tropical leaves', 'Proteas', 'Geometric foliage'],
    lightingStyle: 'Clean white and colored LED lights',
    stageDesign: 'Sleek backdrop with geometric patterns',
    centerpieceSuggestions: ['Modern sculptures', 'Succulent arrangements', 'Minimalist lines'],
  },
  bohemian: {
    name: 'Bohemian & Free-Spirited',
    colorPalette: ['#D4AF37', '#FF6B6B', '#F7E7CE'],
    flowerSuggestions: ['Wildflowers', 'Dried flowers', 'Pampas grass', 'Sunflowers', 'Marigolds'],
    lightingStyle: 'Warm lanterns and natural light',
    stageDesign: 'Dreamy backdrop with flowing fabrics and macramé',
    centerpieceSuggestions: ['Macramé holders', 'Dried flowers', 'Woven baskets'],
  },
  classic: {
    name: 'Classic & Timeless',
    colorPalette: ['#B71C1C', '#D4AF37', '#FFFFF0'],
    flowerSuggestions: ['Red roses', 'White lilies', 'Gold foliage', 'Carnations'],
    lightingStyle: 'Soft uplighting with crystal chandeliers',
    stageDesign: 'Traditional wedding backdrop with gold and red themes',
    centerpieceSuggestions: ['Floral arrangements', 'Tall candles', 'Elegant vases'],
  },
};

/**
 * Get color palette recommendations based on skin tone
 */
export function getColorPaletteForSkinTone(skinTone: SkinTone): ColorPalette[] {
  return LEHENGA_COLORS_BY_SKIN_TONE[skinTone];
}

/**
 * Get décor theme based on adjectives
 */
export function generateDecorTheme(adjectives: string[]): DecorTheme {
  const adjLower = adjectives.map((a) => a.toLowerCase());

  if (adjLower.includes('royal') || adjLower.includes('regal')) {
    return DECOR_THEMES['royal'];
  } else if (adjLower.includes('romantic') || adjLower.includes('intimate')) {
    return DECOR_THEMES['romantic'];
  } else if (adjLower.includes('modern') || adjLower.includes('minimalist')) {
    return DECOR_THEMES['modern'];
  } else if (adjLower.includes('bohemian') || adjLower.includes('free')) {
    return DECOR_THEMES['bohemian'];
  }

  return DECOR_THEMES['classic'];
}

/**
 * Generate lehenga color recommendation
 */
export function generateLehenguColors(skinTone: SkinTone, count: number = 3): ColorPalette[] {
  const palettes = getColorPaletteForSkinTone(skinTone);
  return palettes.slice(0, count);
}

/**
 * Generate complete styling package
 */
export function generateCompleteStyling(skinTone: SkinTone, themeAdjectives: string[]) {
  return {
    lehenguColors: generateLehenguColors(skinTone),
    decorTheme: generateDecorTheme(themeAdjectives),
  };
}

/**
 * Get sherwani color recommendations (groom)
 */
export const SHERWANI_COLORS: ColorPalette[] = [
  {
    primary: '#B71C1C',
    secondary: '#D4AF37',
    accent: '#FFFFFF',
    lightAccent: '#FFFFF0',
    description: 'Classic Red & Gold',
  },
  {
    primary: '#6A1429',
    secondary: '#D4AF37',
    accent: '#FFFFFF',
    lightAccent: '#FFFFF0',
    description: 'Deep Maroon & Gold',
  },
  {
    primary: '#1A1A2E',
    secondary: '#D4AF37',
    accent: '#FFFFFF',
    lightAccent: '#FFFFF0',
    description: 'Navy & Gold',
  },
  {
    primary: '#00695C',
    secondary: '#D4AF37',
    accent: '#FF7043',
    lightAccent: '#FFFFFF',
    description: 'Teal & Gold',
  },
  {
    primary: '#5E35B1',
    secondary: '#D4AF37',
    accent: '#FFFFFF',
    lightAccent: '#F3E5F5',
    description: 'Purple & Gold',
  },
];

export function getSheraniColors(): ColorPalette[] {
  return SHERWANI_COLORS;
}
