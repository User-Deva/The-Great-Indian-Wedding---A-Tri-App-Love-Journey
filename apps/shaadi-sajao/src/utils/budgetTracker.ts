import { BudgetCategory, VarmalPackageType, PACKAGE_DETAILS } from '../types';

/**
 * Budget allocation recommendations by package type
 */
export const BUDGET_ALLOCATION: Record<
  VarmalPackageType,
  Record<string, number>
> = {
  [VarmalPackageType.ROKA]: {
    decoration: 0.3,
    catering: 0.4,
    photography: 0.15,
    outfits: 0.1,
    other: 0.05,
  },
  [VarmalPackageType.SANGEET]: {
    decoration: 0.25,
    catering: 0.35,
    photography: 0.15,
    outfits: 0.15,
    transportation: 0.05,
    other: 0.05,
  },
  [VarmalPackageType.SAAT_PHERE]: {
    decoration: 0.25,
    catering: 0.35,
    photography: 0.12,
    outfits: 0.15,
    transportation: 0.08,
    invitations: 0.03,
    other: 0.02,
  },
  [VarmalPackageType.MAHARAJA]: {
    decoration: 0.2,
    catering: 0.3,
    photography: 0.15,
    outfits: 0.15,
    transportation: 0.12,
    invitations: 0.05,
    other: 0.03,
  },
};

/**
 * Generate budget categories based on package and total budget
 */
export function generateBudgetCategories(
  weddingId: string,
  packageType: VarmalPackageType,
  totalBudget: number
): BudgetCategory[] {
  const allocation = BUDGET_ALLOCATION[packageType];

  return Object.entries(allocation).map(([category, percentage]) => ({
    id: `budget-${category}-${Date.now()}`,
    weddingId,
    category: category as any,
    budgetAllocated: Math.round(totalBudget * percentage),
    budgetSpent: 0,
    description: `${(percentage * 100).toFixed(0)}% allocated`,
  }));
}

/**
 * Calculate budget utilization
 */
export interface BudgetUtilization {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  percentageUsed: number;
  byCategory: Record<string, { allocated: number; spent: number; percentageUsed: number }>;
}

export function calculateBudgetUtilization(
  totalBudget: number,
  categories: BudgetCategory[]
): BudgetUtilization {
  const totalSpent = categories.reduce((sum, cat) => sum + cat.budgetSpent, 0);
  const byCategory: Record<string, any> = {};

  categories.forEach((cat) => {
    byCategory[cat.category] = {
      allocated: cat.budgetAllocated,
      spent: cat.budgetSpent,
      percentageUsed: Math.round((cat.budgetSpent / cat.budgetAllocated) * 100),
    };
  });

  return {
    totalBudget,
    totalSpent,
    remaining: totalBudget - totalSpent,
    percentageUsed: Math.round((totalSpent / totalBudget) * 100),
    byCategory,
  };
}

/**
 * Get budget alerts
 */
export interface BudgetAlert {
  severity: 'warning' | 'critical';
  message: string;
}

export function getBudgetAlerts(utilization: BudgetUtilization): BudgetAlert[] {
  const alerts: BudgetAlert[] = [];

  if (utilization.percentageUsed > 90) {
    alerts.push({
      severity: 'critical',
      message: `⚠️ You've used ${utilization.percentageUsed}% of your budget. Only ₹${utilization.remaining} remaining.`,
    });
  } else if (utilization.percentageUsed > 75) {
    alerts.push({
      severity: 'warning',
      message: `📊 Budget utilization at ${utilization.percentageUsed}%. ₹${utilization.remaining} remaining.`,
    });
  }

  // Check individual categories
  Object.entries(utilization.byCategory).forEach(([category, data]) => {
    if (data.percentageUsed > 95) {
      alerts.push({
        severity: 'critical',
        message: `🚨 ${category} category exceeded budget! ${data.percentageUsed}% used.`,
      });
    } else if (data.percentageUsed > 85) {
      alerts.push({
        severity: 'warning',
        message: `📌 ${category} category at ${data.percentageUsed}% of allocated budget.`,
      });
    }
  });

  return alerts;
}

/**
 * Suggest cost-saving measures
 */
export function getCostSavingSuggestions(utilization: BudgetUtilization): string[] {
  const suggestions: string[] = [];

  if (utilization.byCategory['decoration'].percentageUsed > 80) {
    suggestions.push(
      '💡 Consider simplifying décor or using more greenery instead of floral arrangements'
    );
  }

  if (utilization.byCategory['catering'].percentageUsed > 80) {
    suggestions.push(
      '💡 Negotiate per-plate pricing or reduce guest count slightly'
    );
  }

  if (utilization.byCategory['photography'].percentageUsed > 80) {
    suggestions.push(
      '💡 Use videographer for both video and photos, or limit hours'
    );
  }

  if (utilization.byCategory['outfits'].percentageUsed > 80) {
    suggestions.push(
      '💡 Consider renting outfits or choosing simpler designs'
    );
  }

  return suggestions;
}

/**
 * Estimate remaining budget needed for remaining vendors
 */
export function estimateRemainingVendorBudget(
  categories: BudgetCategory[],
  unbookedVendorCount: number
): Record<string, number> {
  const estimate: Record<string, number> = {};

  categories.forEach((cat) => {
    const remaining = cat.budgetAllocated - cat.budgetSpent;
    if (unbookedVendorCount > 0 && remaining > 0) {
      estimate[cat.category] = Math.round(remaining / unbookedVendorCount);
    }
  });

  return estimate;
}
