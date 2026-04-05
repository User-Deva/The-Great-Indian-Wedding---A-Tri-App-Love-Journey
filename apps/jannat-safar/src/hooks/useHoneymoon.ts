import { useState, useCallback } from 'react';
import { Honeymoon, TravelerArchetype } from '../types';
import { useJannatSafariStore } from '../store/honeymoonStore';
import { supabase } from '@great-indian-wedding/auth';
import { useThemeStore, JourneyStage } from '@great-indian-wedding/theme-engine';
import { useOurStoryStore } from '@great-indian-wedding/our-story';
import { initializeWallet } from '../utils/honeymoonWallet';

export function useHoneymoon() {
  const { honeymoon, setHoneymoon, setWallet, setLoading, setError } = useJannatSafariStore();
  const { setJourneyStage } = useThemeStore();
  const { addMilestone } = useOurStoryStore();
  const [isUpdating, setIsUpdating] = useState(false);

  /**
   * Create a new honeymoon plan
   */
  const createHoneymoon = useCallback(
    async (
      coupleId: string,
      destination: string,
      archetype: TravelerArchetype,
      startDate: Date,
      endDate: Date,
      budgetTotal: number
    ) => {
      setIsUpdating(true);
      setError(null);

      try {
        const nights = Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        const newHoneymoon: Omit<Honeymoon, 'id' | 'createdAt' | 'updatedAt'> = {
          coupleId,
          destination,
          travelerArchetype: archetype,
          startDate,
          endDate,
          budgetTotal,
          nights,
          status: 'planning',
        };

        // Insert into honeymoons table
        const { data, error } = await supabase
          .from('honeymoons')
          .insert([
            {
              couple_id: coupleId,
              destination,
              destination_type: archetype.toLowerCase().replace(' ', '_'),
              start_date: startDate.toISOString().split('T')[0],
              end_date: endDate.toISOString().split('T')[0],
              budget_total: budgetTotal,
            },
          ])
          .select()
          .single();

        if (error) throw error;

        const honeymoon: Honeymoon = {
          id: data.id,
          ...newHoneymoon,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
        };

        setHoneymoon(honeymoon);

        // Initialize wallet
        const wallet = initializeWallet(data.id, budgetTotal);
        setWallet(wallet);

        return honeymoon;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to create honeymoon plan';
        setError(message);
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [setHoneymoon, setWallet, setError]
  );

  /**
   * Fetch honeymoon details
   */
  const fetchHoneymoon = useCallback(
    async (honeymoonId: string) => {
      setIsUpdating(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('honeymoons')
          .select('*')
          .eq('id', honeymoonId)
          .single();

        if (error) throw error;

        const honeymoon: Honeymoon = {
          id: data.id,
          coupleId: data.couple_id,
          destination: data.destination,
          travelerArchetype: data.destination_type as any,
          startDate: new Date(data.start_date),
          endDate: new Date(data.end_date),
          budgetTotal: data.budget_total,
          nights: Math.ceil(
            (new Date(data.end_date).getTime() - new Date(data.start_date).getTime()) /
            (1000 * 60 * 60 * 24)
          ),
          status: data.status || 'planning',
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
        };

        setHoneymoon(honeymoon);

        // Initialize wallet if not exists
        const wallet = initializeWallet(honeymoonId, data.budget_total);
        setWallet(wallet);

        return honeymoon;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch honeymoon';
        setError(message);
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [setHoneymoon, setWallet, setError]
  );

  /**
   * Trigger HONEYMOONING milestone when first booking is made
   */
  const triggerHoneymoonMilestone = useCallback(
    async (coupleId: string, honeymoonId: string) => {
      try {
        // Update journey stage to HONEYMOONING
        await supabase
          .from('couples')
          .update({ journey_stage: JourneyStage.HONEYMOONING })
          .eq('id', coupleId);

        // Update theme store
        setJourneyStage(JourneyStage.HONEYMOONING);

        // Record milestone
        addMilestone({
          id: `milestone-${Date.now()}`,
          coupleId,
          stage: JourneyStage.HONEYMOONING,
          title: 'Honeymoon Destination Booked',
          description: 'The adventure of a lifetime awaits',
          metadata: {
            honeymoonId,
            destination: honeymoon?.destination,
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
                stage: JourneyStage.HONEYMOONING,
                message: '✈️ Your honeymoon awaits! Bon Voyage! 🌸',
              },
            })
          );
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to trigger milestone';
        setError(message);
      }
    },
    [honeymoon?.destination, setJourneyStage, addMilestone, setError]
  );

  /**
   * Calculate days until honeymoon
   */
  const getDaysUntilHoneymoon = useCallback(() => {
    if (!honeymoon) return 0;
    const now = new Date();
    const diff = honeymoon.startDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [honeymoon]);

  return {
    honeymoon,
    isUpdating,
    createHoneymoon,
    fetchHoneymoon,
    triggerHoneymoonMilestone,
    getDaysUntilHoneymoon,
  };
}
