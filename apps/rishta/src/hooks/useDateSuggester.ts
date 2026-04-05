import { useState, useCallback } from 'react';
import { DateSuggestion, DateVenue, DateCheckin } from '../types';
import { useRishtaStore } from '../store/rishtaStore';
import { supabase } from '@great-indian-wedding/auth';
import { suggestDateVenues } from '../utils/dateVenueSuggester';
import { useThemeStore, JourneyStage } from '@great-indian-wedding/theme-engine';
import { useOurStoryStore } from '@great-indian-wedding/our-story';

export function useDateSuggester(userId: string | null) {
  const { dateSuggestion, setDateSuggestion, setError } = useRishtaStore();
  const { setJourneyStage } = useThemeStore();
  const { addMilestone } = useOurStoryStore();
  const [isLoadingVenues, setIsLoadingVenues] = useState(false);

  /**
   * Generate date venue suggestions for a match
   */
  const generateDateSuggestions = useCallback(
    async (matchId: string, coupleId: string | undefined, userCity: string, budget: number = 1000) => {
      setIsLoadingVenues(true);
      setError(null);

      try {
        // Get suggested venues from utility
        const venues = suggestDateVenues(userCity, budget, 5);

        if (venues.length === 0) {
          setError('No venues found for your location and budget');
          return;
        }

        const suggestion: DateSuggestion = {
          id: `date-${Date.now()}`,
          matchId,
          coupleId,
          venues,
          suggestedAt: new Date(),
          status: 'suggested',
        };

        setDateSuggestion(suggestion);
        return suggestion;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to generate suggestions';
        setError(message);
      } finally {
        setIsLoadingVenues(false);
      }
    },
    [setDateSuggestion, setError]
  );

  /**
   * Schedule a date at a specific venue
   */
  const scheduleDate = useCallback(
    async (
      matchId: string,
      coupleId: string,
      venue: DateVenue,
      scheduledDate: Date
    ) => {
      if (!userId) {
        setError('User not authenticated');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('dates')
          .insert([
            {
              match_id: matchId,
              couple_id: coupleId,
              venue_name: venue.name,
              venue_address: venue.address,
              venue_type: venue.type,
              google_maps_link: venue.googleMapsLink,
              budget_estimate: venue.budgetEstimate,
              dress_code: venue.dressCode,
              scheduled_date: scheduledDate.toISOString().split('T')[0],
              status: 'scheduled',
            },
          ])
          .select()
          .single();

        if (error) throw error;

        // Update journey stage to DATE_SET
        await supabase
          .from('couples')
          .update({ journey_stage: JourneyStage.DATE_SET })
          .eq('id', coupleId);

        // Update theme store
        setJourneyStage(JourneyStage.DATE_SET);

        return data;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to schedule date';
        setError(message);
        throw error;
      }
    },
    [userId, setJourneyStage, setError]
  );

  /**
   * Submit post-date check-in with rating
   */
  const submitDateCheckin = useCallback(
    async (dateId: string, coupleId: string, rating: 1 | 2 | 3 | 4 | 5, notes?: string) => {
      if (!userId) {
        setError('User not authenticated');
        return;
      }

      try {
        const { data: checkin, error } = await supabase
          .from('date_checkins')
          .insert([
            {
              date_id: dateId,
              couple_id: coupleId,
              user_id: userId,
              rating,
              notes,
            },
          ])
          .select()
          .single();

        if (error) throw error;

        // Check if both users have rated
        const { data: checkins } = await supabase
          .from('date_checkins')
          .select('*')
          .eq('date_id', dateId);

        if (checkins && checkins.length >= 2) {
          const avgRating = checkins.reduce((sum, c) => sum + c.rating, 0) / checkins.length;

          if (avgRating >= 4) {
            // Both rated ≥4 stars - MILESTONE: DATING triggered
            await supabase
              .from('couples')
              .update({ journey_stage: JourneyStage.DATING })
              .eq('id', coupleId);

            // Update theme store
            setJourneyStage(JourneyStage.DATING);

            // Record milestone in our_story
            addMilestone({
              id: `milestone-${Date.now()}`,
              coupleId,
              stage: JourneyStage.DATING,
              title: 'Our First Date',
              description: 'A magical beginning to our love story',
              metadata: {
                dateId,
                avgRating,
              },
              photos: [],
              createdAt: new Date(),
              updatedAt: new Date(),
            });

            // Trigger celebration event
            if (typeof window !== 'undefined') {
              window.dispatchEvent(
                new CustomEvent('milestoneCelebration', {
                  detail: {
                    stage: JourneyStage.DATING,
                    message: '💕 Congratulations! Your love story begins. Shaadi Sajao is ready for you!',
                  },
                })
              );
            }
          }
        }

        return checkin;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to submit check-in';
        setError(message);
        throw error;
      }
    },
    [userId, setJourneyStage, addMilestone, setError]
  );

  return {
    dateSuggestion,
    isLoadingVenues,
    generateDateSuggestions,
    scheduleDate,
    submitDateCheckin,
  };
}
