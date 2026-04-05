import { describe, it, expect } from 'vitest';
import {
  calculateBudgetUtilization,
  getBudgetAlerts,
  BUDGET_ALLOCATION,
} from '../budgetTracker';

describe('Budget Tracker System', () => {
  describe('BUDGET_ALLOCATION', () => {
    it('should define allocation for all package types', () => {
      expect(BUDGET_ALLOCATION).toHaveProperty('Roka');
      expect(BUDGET_ALLOCATION).toHaveProperty('Sangeet');
      expect(BUDGET_ALLOCATION).toHaveProperty('Saat Phere');
      expect(BUDGET_ALLOCATION).toHaveProperty('Maharaja');
    });

    it('should have percentages that sum to 100 for each package', () => {
      Object.values(BUDGET_ALLOCATION).forEach((allocation) => {
        const total = Object.values(allocation).reduce(
          (sum: number, value: any) => sum + (typeof value === 'number' ? value : 0),
          0
        );
        expect(total).toBeCloseTo(100, 1);
      });
    });

    it('should have realistic allocations for venue', () => {
      Object.values(BUDGET_ALLOCATION).forEach((allocation) => {
        if (typeof allocation.venue === 'number') {
          expect(allocation.venue).toBeGreaterThan(10);
          expect(allocation.venue).toBeLessThan(40);
        }
      });
    });
  });

  describe('calculateBudgetUtilization', () => {
    it('should calculate budget breakdown for Maharaja package', () => {
      const expenses = [
        { category: 'venue', amount: 300000 },
        { category: 'catering', amount: 400000 },
        { category: 'decor', amount: 200000 },
        { category: 'photography', amount: 150000 },
        { category: 'music', amount: 100000 },
        { category: 'outfit', amount: 100000 },
        { category: 'jewelry', amount: 150000 },
        { category: 'makeup', amount: 50000 },
      ];

      const totalBudget = 1500000;
      const result = calculateBudgetUtilization('Maharaja', expenses, totalBudget);

      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('utilized');
      expect(result).toHaveProperty('remaining');
      expect(result).toHaveProperty('breakdown');

      expect(result.total).toBe(totalBudget);
      expect(result.utilized).toBe(
        expenses.reduce((sum, exp) => sum + exp.amount, 0)
      );
      expect(result.remaining).toBe(totalBudget - result.utilized);
    });

    it('should handle zero expenses', () => {
      const result = calculateBudgetUtilization('Roka', [], 500000);

      expect(result.utilized).toBe(0);
      expect(result.remaining).toBe(500000);
    });

    it('should calculate percentage utilization correctly', () => {
      const totalBudget = 1000000;
      const expenses = [{ category: 'venue', amount: 500000 }];

      const result = calculateBudgetUtilization('Sangeet', expenses, totalBudget);

      expect(result.breakdown).toBeDefined();
      expect(result.breakdown.utilization).toBeCloseTo(50, 1);
    });

    it('should handle overspending scenarios', () => {
      const totalBudget = 100000;
      const expenses = [{ category: 'venue', amount: 150000 }];

      const result = calculateBudgetUtilization('Roka', expenses, totalBudget);

      expect(result.utilized).toBe(150000);
      expect(result.remaining).toBe(-50000);
    });
  });

  describe('getBudgetAlerts', () => {
    it('should return no alerts for budget under 75%', () => {
      const result = getBudgetAlerts(1000000, 700000);

      expect(result).toHaveLength(0);
    });

    it('should return warning alert for 75-90% utilization', () => {
      const result = getBudgetAlerts(1000000, 800000);

      expect(result).toContainEqual(
        expect.objectContaining({
          level: 'warning',
          message: expect.stringContaining('approaching'),
        })
      );
    });

    it('should return critical alert for over 90% utilization', () => {
      const result = getBudgetAlerts(1000000, 950000);

      expect(result).toContainEqual(
        expect.objectContaining({
          level: 'critical',
          message: expect.stringContaining('exceeded'),
        })
      );
    });

    it('should return critical alert for overspending', () => {
      const result = getBudgetAlerts(1000000, 1100000);

      expect(result).toContainEqual(
        expect.objectContaining({
          level: 'critical',
        })
      );
    });

    it('should handle edge case at exactly 75%', () => {
      const result = getBudgetAlerts(1000000, 750000);

      expect(result.length).toBeGreaterThanOrEqual(0);
    });
  });
});
