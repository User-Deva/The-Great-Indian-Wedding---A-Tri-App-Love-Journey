import { DateVenue } from '../types';

// Curated venue database by city
const VENUES_BY_CITY: Record<string, Record<string, DateVenue[]>> = {
  Delhi: {
    cafe: [
      {
        id: 'delhi-cafe-1',
        name: 'Copper Chimney Café',
        address: 'Connaught Place, New Delhi',
        type: 'cafe',
        googleMapsLink:
          'https://maps.google.com/?q=Copper+Chimney+Cafe+Delhi',
        budgetEstimate: 800,
        dressCode: 'Casual',
        conversationStarters: [
          'What was your first big dream growing up?',
          'Tell me about a place you want to visit.',
          'What hobby has changed your life?',
          'Who inspires you the most?',
          'What would your perfect Sunday look like?',
        ],
      },
      {
        id: 'delhi-cafe-2',
        name: 'Indian Accent Café',
        address: 'Lodhi Road, New Delhi',
        type: 'cafe',
        googleMapsLink:
          'https://maps.google.com/?q=Indian+Accent+Cafe+Lodhi',
        budgetEstimate: 1200,
        dressCode: 'Smart Casual',
        conversationStarters: [
          'What cuisines fascinate you?',
          'How do you unwind after a long day?',
          'Tell me about a memorable meal?',
          'What flavors remind you of childhood?',
          'Have you traveled for food?',
        ],
      },
    ],
    heritage: [
      {
        id: 'delhi-heritage-1',
        name: 'Lodhi Garden Walk',
        address: 'Lodhi Road, New Delhi',
        type: 'heritage',
        googleMapsLink:
          'https://maps.google.com/?q=Lodhi+Garden+New+Delhi',
        budgetEstimate: 0,
        dressCode: 'Casual/Comfortable',
        conversationStarters: [
          'What historical period interests you most?',
          'Do you like exploring old cities?',
          'Tell me about your heritage.',
          'What traditions do you cherish?',
          'Have you visited monuments that moved you?',
        ],
      },
      {
        id: 'delhi-heritage-2',
        name: 'Red Fort Tour',
        address: 'Chandni Chowk, Delhi',
        type: 'heritage',
        googleMapsLink:
          'https://maps.google.com/?q=Red+Fort+Delhi',
        budgetEstimate: 200,
        dressCode: 'Casual',
        conversationStarters: [
          'What story from history do you love?',
          'Do you enjoy guided tours or exploring alone?',
          'What era would you travel back to?',
          'How connected are you to Indian history?',
          'What hidden gems have you discovered?',
        ],
      },
    ],
    restaurant: [
      {
        id: 'delhi-rest-1',
        name: 'Bukhara at ITC Maurya',
        address: 'ITC Maurya, New Delhi',
        type: 'restaurant',
        googleMapsLink:
          'https://maps.google.com/?q=Bukhara+ITC+Maurya+Delhi',
        budgetEstimate: 2500,
        dressCode: 'Smart Casual/Formal',
        conversationStarters: [
          'What is your signature dish?',
          'Do you cook at home?',
          'Tell me about your favorite meal experience.',
          'What food brings back memories?',
          'Would you like to cook together someday?',
        ],
      },
      {
        id: 'delhi-rest-2',
        name: 'Rooftop Delhi Restaurant',
        address: 'Khan Market, Delhi',
        type: 'restaurant',
        googleMapsLink:
          'https://maps.google.com/?q=Rooftop+Delhi+Khan+Market',
        budgetEstimate: 1800,
        dressCode: 'Smart Casual',
        conversationStarters: [
          'What view makes you feel peaceful?',
          'Do you prefer sunset or stargazing?',
          'Tell me about the most romantic moment you've had.',
          'What makes a perfect evening for you?',
          'Do you believe in destiny or coincidence?',
        ],
      },
    ],
    garden: [
      {
        id: 'delhi-garden-1',
        name: 'Lodi Garden Picnic',
        address: 'Lodhi Road, New Delhi',
        type: 'garden',
        googleMapsLink:
          'https://maps.google.com/?q=Lodi+Garden+Picnic+Delhi',
        budgetEstimate: 500,
        dressCode: 'Casual',
        conversationStarters: [
          'What season is your favorite?',
          'Do you enjoy nature walks?',
          'Tell me about your childhood outdoors.',
          'What flowers do you love?',
          'Would you like to garden together?',
        ],
      },
      {
        id: 'delhi-garden-2',
        name: 'Rose Garden Botanical Walk',
        address: 'Talkatora Garden, Delhi',
        type: 'garden',
        googleMapsLink:
          'https://maps.google.com/?q=Talkatora+Rose+Garden+Delhi',
        budgetEstimate: 300,
        dressCode: 'Casual',
        conversationStarters: [
          'Which flower reminds you of someone special?',
          'Do you believe in flower language?',
          'Tell me about nature that inspires you.',
          'Have you seen a sunset from a garden?',
          'What plants would you grow in your home?',
        ],
      },
    ],
    cultural: [
      {
        id: 'delhi-cultural-1',
        name: 'National Museum Evening Tour',
        address: 'Janpath, New Delhi',
        type: 'cultural',
        googleMapsLink:
          'https://maps.google.com/?q=National+Museum+Delhi',
        budgetEstimate: 400,
        dressCode: 'Casual',
        conversationStarters: [
          'What art moves you emotionally?',
          'Tell me about a museum you loved.',
          'What era of art fascinates you?',
          'Do you have artistic talents?',
          'What cultural experience changed your perspective?',
        ],
      },
      {
        id: 'delhi-cultural-2',
        name: 'Classical Music Evening at Kamani Auditorium',
        address: 'Copernicus Lane, Delhi',
        type: 'cultural',
        googleMapsLink:
          'https://maps.google.com/?q=Kamani+Auditorium+Delhi',
        budgetEstimate: 800,
        dressCode: 'Semi-Formal',
        conversationStarters: [
          'What music speaks to your soul?',
          'Tell me about your first concert.',
          'Do you play any instrument?',
          'What song reminds you of an important moment?',
          'How does music make you feel?',
        ],
      },
    ],
  },
  Mumbai: {
    cafe: [
      {
        id: 'mumbai-cafe-1',
        name: 'Irani Chai House',
        address: 'Fort, Mumbai',
        type: 'cafe',
        googleMapsLink:
          'https://maps.google.com/?q=Irani+Chai+House+Mumbai',
        budgetEstimate: 400,
        dressCode: 'Casual',
        conversationStarters: [
          'What is your favorite chai memory?',
          'Do you like simple pleasures?',
          'Tell me about a cozy moment.',
          'What small things make you happy?',
          'Have you visited a traditional chai shop?',
        ],
      },
    ],
    heritage: [
      {
        id: 'mumbai-heritage-1',
        name: 'Gateway of India Walk',
        address: 'Gateway of India, Mumbai',
        type: 'heritage',
        googleMapsLink:
          'https://maps.google.com/?q=Gateway+of+India+Mumbai',
        budgetEstimate: 0,
        dressCode: 'Casual',
        conversationStarters: [
          'What landmark means the most to you?',
          'Tell me about a place with a story.',
          'How connected are you to Mumbai?',
          'What heritage interests you?',
          'Have you walked the seaface at sunset?',
        ],
      },
    ],
    restaurant: [
      {
        id: 'mumbai-rest-1',
        name: 'Mahesh Lunch Home',
        address: 'Colaba, Mumbai',
        type: 'restaurant',
        googleMapsLink:
          'https://maps.google.com/?q=Mahesh+Lunch+Home+Mumbai',
        budgetEstimate: 2000,
        dressCode: 'Smart Casual',
        conversationStarters: [
          'What seafood dishes do you love?',
          'Tell me about your favorite meal.',
          'Do you have a signature dish order?',
          'What cuisine excites you?',
          'Would you teach me your favorite recipe?',
        ],
      },
    ],
  },
};

/**
 * Suggest date venues based on user's city and budget
 */
export function suggestDateVenues(city: string, budget: number = 1000, count: number = 5): DateVenue[] {
  const cityVenues = VENUES_BY_CITY[city] || VENUES_BY_CITY['Delhi'];

  let allVenues: DateVenue[] = [];
  Object.values(cityVenues).forEach((typeVenues) => {
    allVenues = allVenues.concat(typeVenues);
  });

  // Filter by budget
  let filtered = allVenues.filter((v) => v.budgetEstimate <= budget * 1.5);

  // If too many suggestions, diversify by type
  if (filtered.length >= count) {
    const byType: Record<string, DateVenue[]> = {};
    filtered.forEach((venue) => {
      if (!byType[venue.type]) {
        byType[venue.type] = [];
      }
      byType[venue.type].push(venue);
    });

    const selected: DateVenue[] = [];
    const typesArray = Object.keys(byType);

    // Round-robin selection to diversify venue types
    let typeIndex = 0;
    while (selected.length < count && typesArray.length > 0) {
      const type = typesArray[typeIndex % typesArray.length];
      const typeVenues = byType[type];
      if (typeVenues.length > 0) {
        selected.push(typeVenues.shift()!);
      }
      typeIndex++;
    }

    return selected;
  }

  return filtered.slice(0, count);
}

/**
 * Get conversation starters for a venue
 */
export function getConversationStarters(venue: DateVenue): string[] {
  return venue.conversationStarters;
}

/**
 * Get a random conversation starter
 */
export function getRandomStarter(venue: DateVenue): string {
  const starters = venue.conversationStarters;
  return starters[Math.floor(Math.random() * starters.length)];
}
