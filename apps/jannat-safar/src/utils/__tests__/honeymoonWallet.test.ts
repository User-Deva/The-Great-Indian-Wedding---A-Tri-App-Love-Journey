import { describe, it, expect } from 'vitest';
import {
  initializeWallet,
  addExpense,
  calculateSpendingByCategory,
  getOverallBudgetStatus,
  getDailyBudgetSuggestion,
  convertCurrency,
  CURRENCY_RATES,
} from '../honeymoonWallet';

describe('Honeymoon Wallet System', () => {
  describe('initializeWallet', () => {
    it('should initialize wallet with default allocation', () => {
      const wallet = initializeWallet(100000);

      expect(wallet).toHaveProperty('accommodation');
      expect(wallet).toHaveProperty('food');
      expect(wallet).toHaveProperty('activities');
      expect(wallet).toHaveProperty('shopping');
      expect(wallet).toHaveProperty('transport');
      expect(wallet).toHaveProperty('contingency');

      const total = Object.values(wallet).reduce((sum, val) => sum + val, 0);
      expect(total).toBe(100000);
    });

    it('should allocate 25% for accommodation', () => {
      const budget = 100000;
      const wallet = initializeWallet(budget);

      expect(wallet.accommodation).toBe(budget * 0.25);
    });

    it('should allocate 35% for food', () => {
      const budget = 100000;
      const wallet = initializeWallet(budget);

      expect(wallet.food).toBe(budget * 0.35);
    });

    it('should allocate 15% for activities', () => {
      const budget = 100000;
      const wallet = initializeWallet(budget);

      expect(wallet.activities).toBe(budget * 0.15);
    });

    it('should allocate 15% for shopping', () => {
      const budget = 100000;
      const wallet = initializeWallet(budget);

      expect(wallet.shopping).toBe(budget * 0.15);
    });

    it('should allocate 5% for transport', () => {
      const budget = 100000;
      const wallet = initializeWallet(budget);

      expect(wallet.transport).toBe(budget * 0.05);
    });

    it('should allocate 5% for contingency', () => {
      const budget = 100000;
      const wallet = initializeWallet(budget);

      expect(wallet.contingency).toBe(budget * 0.05);
    });

    it('should handle different budget amounts', () => {
      const budgets = [50000, 100000, 500000, 1000000];

      budgets.forEach((budget) => {
        const wallet = initializeWallet(budget);
        const total = Object.values(wallet).reduce((sum, val) => sum + val, 0);
        expect(total).toBeCloseTo(budget, 0);
      });
    });
  });

  describe('addExpense', () => {
    it('should track expense in correct category', () => {
      const wallet = initializeWallet(100000);
      const updated = addExpense(wallet, 'accommodation', 5000);

      expect(updated.accommodation).toBe(wallet.accommodation - 5000);
    });

    it('should handle multiple expenses', () => {
      let wallet = initializeWallet(100000);

      wallet = addExpense(wallet, 'accommodation', 5000);
      wallet = addExpense(wallet, 'food', 2000);
      wallet = addExpense(wallet, 'activities', 1500);

      expect(wallet.accommodation).toBe(initializeWallet(100000).accommodation - 5000);
      expect(wallet.food).toBe(initializeWallet(100000).food - 2000);
      expect(wallet.activities).toBe(
        initializeWallet(100000).activities - 1500
      );
    });

    it('should allow overspending in a category', () => {
      const wallet = initializeWallet(100000);
      const accommodation = wallet.accommodation;

      const updated = addExpense(wallet, 'accommodation', accommodation + 10000);
      expect(updated.accommodation).toBe(-10000);
    });
  });

  describe('calculateSpendingByCategory', () => {
    it('should calculate spending breakdown', () => {
      let wallet = initializeWallet(100000);

      wallet = addExpense(wallet, 'accommodation', 15000);
      wallet = addExpense(wallet, 'food', 20000);
      wallet = addExpense(wallet, 'activities', 10000);

      const initial = initializeWallet(100000);
      const spending = calculateSpendingByCategory(
        {
          accommodation: initial.accommodation,
          food: initial.food,
          activities: initial.activities,
          shopping: initial.shopping,
          transport: initial.transport,
          contingency: initial.contingency,
        },
        wallet
      );

      expect(spending.accommodation).toBe(15000);
      expect(spending.food).toBe(20000);
      expect(spending.activities).toBe(10000);
    });

    it('should sum total spending', () => {
      let wallet = initializeWallet(100000);

      wallet = addExpense(wallet, 'accommodation', 10000);
      wallet = addExpense(wallet, 'food', 15000);
      wallet = addExpense(wallet, 'activities', 5000);

      const initial = initializeWallet(100000);
      const spending = calculateSpendingByCategory(
        {
          accommodation: initial.accommodation,
          food: initial.food,
          activities: initial.activities,
          shopping: initial.shopping,
          transport: initial.transport,
          contingency: initial.contingency,
        },
        wallet
      );

      const total =
        spending.accommodation +
        spending.food +
        spending.activities +
        spending.shopping +
        spending.transport +
        spending.contingency;

      expect(total).toBe(30000);
    });
  });

  describe('getOverallBudgetStatus', () => {
    it('should return healthy status for low spending', () => {
      const wallet = initializeWallet(100000);
      const spent = { ...initializeWallet(100000), accommodation: 19000 };

      const status = getOverallBudgetStatus(wallet, spent);

      expect(status).toHaveProperty('percentageUsed');
      expect(status.percentageUsed).toBeLessThan(20);
      expect(status).toHaveProperty('alerts');
      expect(status.alerts.length).toBe(0);
    });

    it('should return warning for 75-90% spent', () => {
      const wallet = initializeWallet(100000);
      const spent = {
        ...initializeWallet(100000),
        accommodation: 20000,
        food: 30000,
        activities: 12000,
        shopping: 13000,
      };

      const status = getOverallBudgetStatus(wallet, spent);

      expect(status.percentageUsed).toBeGreaterThan(70);
      expect(status.alerts.length).toBeGreaterThan(0);
    });

    it('should return critical for overspending', () => {
      const wallet = initializeWallet(100000);
      const spent = {
        accommodation: -10000,
        food: 50000,
        activities: 30000,
        shopping: 30000,
        transport: 10000,
        contingency: 5000,
      };

      const status = getOverallBudgetStatus(wallet, spent);

      expect(status.alerts.some((a) => a.level === 'critical')).toBe(true);
    });
  });

  describe('getDailyBudgetSuggestion', () => {
    it('should suggest daily budget based on duration', () => {
      const totalBudget = 100000;
      const daysRemaining = 10;

      const dailySuggestion = getDailyBudgetSuggestion(totalBudget, daysRemaining);

      expect(dailySuggestion).toBeGreaterThan(0);
      expect(dailySuggestion).toBeLessThanOrEqual(totalBudget / daysRemaining);
    });

    it('should handle single day remaining', () => {
      const dailySuggestion = getDailyBudgetSuggestion(100000, 1);

      expect(dailySuggestion).toBeCloseTo(100000, 0);
    });

    it('should handle zero days remaining', () => {
      const dailySuggestion = getDailyBudgetSuggestion(100000, 0);

      expect(dailySuggestion).toBe(0);
    });
  });

  describe('CURRENCY_RATES', () => {
    it('should have rate for INR', () => {
      expect(CURRENCY_RATES).toHaveProperty('INR');
      expect(CURRENCY_RATES.INR).toBe(1);
    });

    it('should have USD rate', () => {
      expect(CURRENCY_RATES).toHaveProperty('USD');
      expect(CURRENCY_RATES.USD).toBeGreaterThan(0);
    });

    it('should have EUR rate', () => {
      expect(CURRENCY_RATES).toHaveProperty('EUR');
      expect(CURRENCY_RATES.EUR).toBeGreaterThan(0);
    });

    it('should have realistic USD to INR rate', () => {
      expect(CURRENCY_RATES.USD).toBeGreaterThan(70);
      expect(CURRENCY_RATES.USD).toBeLessThan(100);
    });
  });

  describe('convertCurrency', () => {
    it('should convert INR to USD', () => {
      const result = convertCurrency(100000, 'INR', 'USD');

      expect(result).toBeCloseTo(
        100000 / CURRENCY_RATES.USD,
        1
      );
    });

    it('should convert USD to INR', () => {
      const result = convertCurrency(1000, 'USD', 'INR');

      expect(result).toBeCloseTo(1000 * CURRENCY_RATES.USD, 0);
    });

    it('should convert between EUR and USD', () => {
      const result = convertCurrency(1000, 'EUR', 'USD');

      const expectedRate = CURRENCY_RATES.EUR / CURRENCY_RATES.USD;
      expect(result).toBeCloseTo(1000 * expectedRate, 1);
    });

    it('should return same amount when converting to same currency', () => {
      const result = convertCurrency(50000, 'INR', 'INR');

      expect(result).toBe(50000);
    });

    it('should handle fractional amounts', () => {
      const result = convertCurrency(1234.56, 'INR', 'USD');

      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });
  });
});
