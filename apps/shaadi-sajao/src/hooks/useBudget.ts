import { useState, useCallback, useMemo } from 'react';
import { BudgetCategory } from '../types';
import { useShaadaiSajaoStore } from '../store/shaadiStore';
import { supabase } from '@great-indian-wedding/auth';
import {
  calculateBudgetUtilization,
  getBudgetAlerts,
  getCostSavingSuggestions,
  estimateRemainingVendorBudget,
} from '../utils/budgetTracker';

export function useBudget(weddingId: string | null) {
  const { budgetCategories, setBudgetCategories, updateBudgetCategory, setError } = useShaadaiSajaoStore();
  const [isUpdating, setIsUpdating] = useState(false);

  /**
   * Fetch budget categories for wedding
   */
  const fetchBudgetCategories = useCallback(async () => {
    if (!weddingId) return;

    setIsUpdating(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('expense_tracking')
        .select('*')
        .eq('wedding_id', weddingId);

      if (error) throw error;

      // Mock implementation - would populate from real data
      // setBudgetCategories(data || []);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch budget';
      setError(message);
    } finally {
      setIsUpdating(false);
    }
  }, [weddingId, setBudgetCategories, setError]);

  /**
   * Record an expense
   */
  const recordExpense = useCallback(
    async (
      categoryId: string,
      amount: number,
      description?: string
    ) => {
      try {
        const category = budgetCategories.find((c) => c.id === categoryId);
        if (!category) throw new Error('Category not found');

        const newSpent = category.budgetSpent + amount;

        // Update in database
        await supabase
          .from('expenses')
          .insert([
            {
              wedding_id: weddingId,
              category: category.category,
              description,
              amount,
              currency: 'INR',
              date: new Date().toISOString().split('T')[0],
            },
          ]);

        // Update local state
        updateBudgetCategory(categoryId, {
          budgetSpent: newSpent,
        });

        return newSpent;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to record expense';
        setError(message);
        throw error;
      }
    },
    [weddingId, budgetCategories, updateBudgetCategory, setError]
  );

  /**
   * Update budget allocation for a category
   */
  const updateBudgetAllocation = useCallback(
    async (categoryId: string, newAllocation: number) => {
      try {
        updateBudgetCategory(categoryId, {
          budgetAllocated: newAllocation,
        });

        // Persist to database (would implement real update)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update allocation';
        setError(message);
        throw error;
      }
    },
    [updateBudgetCategory, setError]
  );

  /**
   * Calculate budget utilization
   */
  const budgetUtilization = useMemo(() => {
    if (budgetCategories.length === 0) return null;

    const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.budgetAllocated, 0);
    return calculateBudgetUtilization(totalBudget, budgetCategories);
  }, [budgetCategories]);

  /**
   * Get budget alerts
   */
  const budgetAlerts = useMemo(() => {
    if (!budgetUtilization) return [];
    return getBudgetAlerts(budgetUtilization);
  }, [budgetUtilization]);

  /**
   * Get cost-saving suggestions
   */
  const costSavingSuggestions = useMemo(() => {
    if (!budgetUtilization) return [];
    return getCostSavingSuggestions(budgetUtilization);
  }, [budgetUtilization]);

  /**
   * Estimate budget for remaining vendors
   */
  const estimateRemainingBudget = useCallback(
    (unbookedVendorCount: number) => {
      if (!budgetUtilization) return {};
      return estimateRemainingVendorBudget(budgetCategories, unbookedVendorCount);
    },
    [budgetCategories, budgetUtilization]
  );

  /**
   * Get category breakdown as percentages
   */
  const getCategoryPercentages = useMemo(() => {
    if (!budgetUtilization) return {};

    const percentages: Record<string, number> = {};
    budgetCategories.forEach((cat) => {
      percentages[cat.category] = Math.round(
        (cat.budgetAllocated / (budgetUtilization.totalBudget || 1)) * 100
      );
    });

    return percentages;
  }, [budgetCategories, budgetUtilization]);

  return {
    budgetCategories,
    budgetUtilization,
    budgetAlerts,
    costSavingSuggestions,
    isUpdating,
    fetchBudgetCategories,
    recordExpense,
    updateBudgetAllocation,
    estimateRemainingBudget,
    getCategoryPercentages,
  };
}
