import { HoneymoonWallet, Expense } from '../types';

/**
 * Initialize a honeymoon wallet with budget breakdown
 */
export function initializeWallet(honeymoonId: string, totalBudget: number): HoneymoonWallet {
  // Default allocation percentages
  const allocation = {
    flights: 0.25,      // 25%
    accommodation: 0.35, // 35%
    food: 0.15,         // 15%
    activities: 0.15,   // 15%
    shopping: 0.05,     // 5%
    miscellaneous: 0.05, // 5%
  };

  return {
    honeymoonId,
    budgetTotal: totalBudget,
    budgetBreakdown: {
      flights: Math.round(totalBudget * allocation.flights),
      accommodation: Math.round(totalBudget * allocation.accommodation),
      food: Math.round(totalBudget * allocation.food),
      activities: Math.round(totalBudget * allocation.activities),
      shopping: Math.round(totalBudget * allocation.shopping),
      miscellaneous: Math.round(totalBudget * allocation.miscellaneous),
    },
    spent: 0,
    expenses: [],
  };
}

/**
 * Add an expense to the wallet
 */
export function addExpense(wallet: HoneymoonWallet, expense: Expense): HoneymoonWallet {
  const updatedWallet = { ...wallet };
  updatedWallet.expenses = [...wallet.expenses, expense];
  updatedWallet.spent += expense.amount;

  return updatedWallet;
}

/**
 * Calculate spending by category
 */
export function calculateSpendingByCategory(wallet: HoneymoonWallet): Record<string, number> {
  const spending: Record<string, number> = {
    flights: 0,
    accommodation: 0,
    food: 0,
    activities: 0,
    shopping: 0,
    miscellaneous: 0,
  };

  wallet.expenses.forEach((expense) => {
    spending[expense.category] = (spending[expense.category] || 0) + expense.amount;
  });

  return spending;
}

/**
 * Get budget utilization for each category
 */
export interface CategoryBudgetStatus {
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  percentageUsed: number;
  status: 'good' | 'warning' | 'critical';
}

export function getBudgetStatus(wallet: HoneymoonWallet): CategoryBudgetStatus[] {
  const spending = calculateSpendingByCategory(wallet);

  return Object.entries(wallet.budgetBreakdown).map(([category, allocated]) => {
    const spent = spending[category] || 0;
    const remaining = allocated - spent;
    const percentageUsed = Math.round((spent / allocated) * 100);

    let status: 'good' | 'warning' | 'critical' = 'good';
    if (percentageUsed > 90) {
      status = 'critical';
    } else if (percentageUsed > 75) {
      status = 'warning';
    }

    return {
      category,
      allocated,
      spent,
      remaining,
      percentageUsed,
      status,
    };
  });
}

/**
 * Get overall budget status
 */
export interface OverallBudgetStatus {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  percentageUsed: number;
  categoriesStatus: CategoryBudgetStatus[];
  alerts: string[];
}

export function getOverallBudgetStatus(wallet: HoneymoonWallet): OverallBudgetStatus {
  const categoriesStatus = getBudgetStatus(wallet);
  const alerts: string[] = [];

  // Check for critical categories
  categoriesStatus.forEach((cat) => {
    if (cat.status === 'critical') {
      alerts.push(
        `🚨 ${cat.category} exceeded budget! Used ₹${cat.spent.toLocaleString()} of ₹${cat.allocated.toLocaleString()}`
      );
    } else if (cat.status === 'warning') {
      alerts.push(
        `📌 ${cat.category} at ${cat.percentageUsed}% of budget. ₹${cat.remaining.toLocaleString()} remaining`
      );
    }
  });

  // Check overall budget
  const overallPercentage = Math.round((wallet.spent / wallet.budgetTotal) * 100);
  if (overallPercentage > 90) {
    alerts.push(
      `⚠️ Overall budget at ${overallPercentage}%! Only ₹${(wallet.budgetTotal - wallet.spent).toLocaleString()} remaining`
    );
  }

  return {
    totalBudget: wallet.budgetTotal,
    totalSpent: wallet.spent,
    remaining: wallet.budgetTotal - wallet.spent,
    percentageUsed: overallPercentage,
    categoriesStatus,
    alerts,
  };
}

/**
 * Adjust budget allocation
 */
export function adjustBudgetAllocation(
  wallet: HoneymoonWallet,
  newAllocation: Record<string, number>
): HoneymoonWallet {
  return {
    ...wallet,
    budgetBreakdown: newAllocation as any,
  };
}

/**
 * Currency conversion helper (mock rates)
 */
export const CURRENCY_RATES: Record<string, number> = {
  USD: 83, // 1 USD = 83 INR
  EUR: 90,
  GBP: 105,
  AED: 22.5,
  MVR: 5.4,
  IDR: 0.0052,
  CHF: 93,
  BTN: 1, // 1:1 with INR (official)
  ISK: 0.6,
  THB: 2.3,
};

export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string = 'INR'): number {
  if (fromCurrency === toCurrency) return amount;

  const toINR = amount * (CURRENCY_RATES[fromCurrency] || 1);
  const finalAmount = toINR / (CURRENCY_RATES[toCurrency] || 1);

  return Math.round(finalAmount);
}

/**
 * Get spending suggestions based on remaining days
 */
export function getDailyBudgetSuggestion(
  wallet: HoneymoonWallet,
  remainingDays: number
): Record<string, number> {
  const remaining = wallet.budgetTotal - wallet.spent;
  const perDay = Math.floor(remaining / remainingDays);

  return {
    perDay,
    food: Math.floor(perDay * 0.3),
    activities: Math.floor(perDay * 0.25),
    shopping: Math.floor(perDay * 0.2),
    miscellaneous: Math.floor(perDay * 0.25),
  };
}
