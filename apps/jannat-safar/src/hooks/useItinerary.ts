import { useState, useCallback } from 'react';
import { CityItinerary, Attraction, Restaurant, Activity } from '../types';
import { useJannatSafariStore } from '../store/honeymoonStore';

export function useItinerary() {
  const { itineraries, addItinerary, updateItinerary, setError } = useJannatSafariStore();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Create a daily itinerary
   */
  const createDayItinerary = useCallback(
    (
      honeymoonId: string,
      city: string,
      dayNumber: number,
      attractions: Attraction[] = [],
      restaurants: Restaurant[] = [],
      activities: Activity[] = [],
      nightlife: string[] = []
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const itinerary: CityItinerary = {
          id: `itinerary-${Date.now()}`,
          honeymoonId,
          city,
          dayNumber,
          attractions,
          restaurants,
          activities,
          nightlife,
        };

        addItinerary(itinerary);
        return itinerary;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to create itinerary';
        setError(message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [addItinerary, setError]
  );

  /**
   * Add attraction to itinerary
   */
  const addAttraction = useCallback(
    (itineraryId: string, attraction: Attraction) => {
      const itinerary = itineraries.find((i) => i.id === itineraryId);
      if (!itinerary) {
        setError('Itinerary not found');
        return;
      }

      updateItinerary(itineraryId, {
        attractions: [...itinerary.attractions, attraction],
      });
    },
    [itineraries, updateItinerary, setError]
  );

  /**
   * Add restaurant to itinerary
   */
  const addRestaurant = useCallback(
    (itineraryId: string, restaurant: Restaurant) => {
      const itinerary = itineraries.find((i) => i.id === itineraryId);
      if (!itinerary) {
        setError('Itinerary not found');
        return;
      }

      updateItinerary(itineraryId, {
        restaurants: [...itinerary.restaurants, restaurant],
      });
    },
    [itineraries, updateItinerary, setError]
  );

  /**
   * Add activity to itinerary
   */
  const addActivity = useCallback(
    (itineraryId: string, activity: Activity) => {
      const itinerary = itineraries.find((i) => i.id === itineraryId);
      if (!itinerary) {
        setError('Itinerary not found');
        return;
      }

      updateItinerary(itineraryId, {
        activities: [...itinerary.activities, activity],
      });
    },
    [itineraries, updateItinerary, setError]
  );

  /**
   * Remove attraction from itinerary
   */
  const removeAttraction = useCallback(
    (itineraryId: string, attractionId: string) => {
      const itinerary = itineraries.find((i) => i.id === itineraryId);
      if (!itinerary) {
        setError('Itinerary not found');
        return;
      }

      updateItinerary(itineraryId, {
        attractions: itinerary.attractions.filter((a) => a.id !== attractionId),
      });
    },
    [itineraries, updateItinerary, setError]
  );

  /**
   * Generate itinerary PDF (mock)
   */
  const generateItineraryPDF = useCallback((honeymoonId: string): string => {
    const honeymoonItineraries = itineraries.filter((i) => i.honeymoonId === honeymoonId);

    let pdfContent = 'Our Honeymoon Itinerary\n\n';

    honeymoonItineraries.forEach((itinerary) => {
      pdfContent += `Day ${itinerary.dayNumber} - ${itinerary.city}\n`;
      pdfContent += '====================\n\n';

      if (itinerary.attractions.length > 0) {
        pdfContent += 'Attractions:\n';
        itinerary.attractions.forEach((a) => {
          pdfContent += `- ${a.name} (${a.visitDuration} min, Rating: ${a.romanticRating}/5)\n`;
        });
        pdfContent += '\n';
      }

      if (itinerary.restaurants.length > 0) {
        pdfContent += 'Restaurants:\n';
        itinerary.restaurants.forEach((r) => {
          pdfContent += `- ${r.name} (${r.cuisine}, ₹${r.averagePrice})\n`;
        });
        pdfContent += '\n';
      }

      if (itinerary.activities.length > 0) {
        pdfContent += 'Activities:\n';
        itinerary.activities.forEach((act) => {
          pdfContent += `- ${act.name} (${act.duration} min, ₹${act.price})\n`;
        });
        pdfContent += '\n';
      }

      if (itinerary.nightlife.length > 0) {
        pdfContent += 'Nightlife:\n';
        itinerary.nightlife.forEach((nl) => {
          pdfContent += `- ${nl}\n`;
        });
        pdfContent += '\n';
      }

      pdfContent += '\n';
    });

    // In production, use a library like pdfkit or jspdf
    // For now, return as text that could be converted
    return pdfContent;
  }, [itineraries]);

  /**
   * Get itineraries for a city
   */
  const getItinerariesForCity = useCallback(
    (honeymoonId: string, city: string): CityItinerary[] => {
      return itineraries.filter(
        (i) => i.honeymoonId === honeymoonId && i.city.toLowerCase() === city.toLowerCase()
      );
    },
    [itineraries]
  );

  /**
   * Calculate total duration for a day
   */
  const getDayDuration = useCallback(
    (itineraryId: string): number => {
      const itinerary = itineraries.find((i) => i.id === itineraryId);
      if (!itinerary) return 0;

      let totalMinutes = 0;

      itinerary.attractions.forEach((a) => {
        totalMinutes += a.visitDuration;
      });

      itinerary.activities.forEach((act) => {
        totalMinutes += act.duration;
      });

      return Math.floor(totalMinutes / 60); // return hours
    },
    [itineraries]
  );

  /**
   * Calculate total cost for a day
   */
  const getDayCost = useCallback(
    (itineraryId: string): number => {
      const itinerary = itineraries.find((i) => i.id === itineraryId);
      if (!itinerary) return 0;

      let totalCost = 0;

      itinerary.attractions.forEach((a) => {
        totalCost += a.entryFee;
      });

      itinerary.restaurants.forEach((r) => {
        totalCost += r.averagePrice;
      });

      itinerary.activities.forEach((act) => {
        totalCost += act.price;
      });

      return totalCost;
    },
    [itineraries]
  );

  return {
    itineraries,
    isLoading,
    createDayItinerary,
    addAttraction,
    addRestaurant,
    addActivity,
    removeAttraction,
    generateItineraryPDF,
    getItinerariesForCity,
    getDayDuration,
    getDayCost,
  };
}
