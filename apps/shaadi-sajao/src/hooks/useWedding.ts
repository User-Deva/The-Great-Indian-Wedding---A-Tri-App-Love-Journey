import { useState, useCallback } from 'react';
import { Wedding, VarmalPackageType, Religion, getRitualsForReligion } from '../types';
import { useShaadaiSajaoStore } from '../store/shaadiStore';
import { supabase } from '@great-indian-wedding/auth';
import { generateBudgetCategories } from '../utils/budgetTracker';

export function useWedding() {
  const { wedding, setWedding, setBudgetCategories, setLoading, setError } = useShaadaiSajaoStore();
  const [isUpdating, setIsUpdating] = useState(false);

  /**
   * Create a new wedding
   */
  const createWedding = useCallback(
    async (
      coupleId: string,
      weddingDate: Date,
      venue: string,
      packageType: VarmalPackageType,
      religion: Religion,
      budgetTotal: number,
      themeName: string,
      guestCount: number
    ) => {
      setIsUpdating(true);
      setError(null);

      try {
        const newWedding: Omit<Wedding, 'id' | 'createdAt' | 'updatedAt'> = {
          coupleId,
          weddingDate,
          weddingVenue: venue,
          packageType,
          religion,
          budgetTotal,
          budgetSpent: 0,
          themeName,
          guestCount,
        };

        // Insert into weddings table
        const { data, error } = await supabase
          .from('weddings')
          .insert([
            {
              couple_id: coupleId,
              wedding_date: weddingDate.toISOString().split('T')[0],
              wedding_venue: venue,
              package_type: packageType,
              religion,
              budget_total: budgetTotal,
              theme_name: themeName,
            },
          ])
          .select()
          .single();

        if (error) throw error;

        // Create wedding object
        const wedding: Wedding = {
          id: data.id,
          ...newWedding,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
        };

        setWedding(wedding);

        // Generate budget categories
        const budgetCategories = generateBudgetCategories(data.id, packageType, budgetTotal);
        setBudgetCategories(budgetCategories);

        return wedding;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to create wedding';
        setError(message);
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [setWedding, setBudgetCategories, setError]
  );

  /**
   * Fetch wedding details
   */
  const fetchWedding = useCallback(
    async (weddingId: string) => {
      setIsUpdating(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('weddings')
          .select('*')
          .eq('id', weddingId)
          .single();

        if (error) throw error;

        const wedding: Wedding = {
          id: data.id,
          coupleId: data.couple_id,
          weddingDate: new Date(data.wedding_date),
          weddingVenue: data.wedding_venue,
          packageType: data.package_type,
          religion: data.religion,
          budgetTotal: data.budget_total,
          budgetSpent: data.budget_spent || 0,
          themeName: data.theme_name,
          themeDescription: data.theme_description,
          guestCount: data.guest_count,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
        };

        setWedding(wedding);
        return wedding;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch wedding';
        setError(message);
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [setWedding, setError]
  );

  /**
   * Update wedding details
   */
  const updateWedding = useCallback(
    async (weddingId: string, updates: Partial<Wedding>) => {
      try {
        const { error } = await supabase
          .from('weddings')
          .update({
            wedding_date: updates.weddingDate?.toISOString().split('T')[0],
            wedding_venue: updates.weddingVenue,
            theme_name: updates.themeName,
            theme_description: updates.themeDescription,
            guest_count: updates.guestCount,
          })
          .eq('id', weddingId);

        if (error) throw error;

        if (wedding) {
          setWedding({ ...wedding, ...updates });
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update wedding';
        setError(message);
        throw error;
      }
    },
    [wedding, setWedding, setError]
  );

  /**
   * Get rituals for the wedding religion
   */
  const getRituals = useCallback(() => {
    if (!wedding) return [];
    return getRitualsForReligion(wedding.religion);
  }, [wedding]);

  /**
   * Calculate days until wedding
   */
  const getDaysUntilWedding = useCallback(() => {
    if (!wedding) return 0;
    const now = new Date();
    const diff = wedding.weddingDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [wedding]);

  return {
    wedding,
    isUpdating,
    createWedding,
    fetchWedding,
    updateWedding,
    getRituals,
    getDaysUntilWedding,
  };
}
