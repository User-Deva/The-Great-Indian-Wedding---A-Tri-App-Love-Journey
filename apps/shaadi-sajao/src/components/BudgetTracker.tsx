import React from 'react';
import { BudgetUtilization } from '../utils/budgetTracker';

interface BudgetTrackerProps {
  utilization: BudgetUtilization | null;
}

export const BudgetTracker: React.FC<BudgetTrackerProps> = ({ utilization }) => {
  if (!utilization) {
    return <div>No budget data available</div>;
  }

  const getProgressBarColor = (percentageUsed: number): string => {
    if (percentageUsed > 90) return '#f44336'; // Red
    if (percentageUsed > 75) return '#ff9800'; // Orange
    return '#4caf50'; // Green
  };

  return (
    <div
      style={{
        backgroundColor: '#f5f5f5',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem',
      }}
    >
      <h3 style={{ marginTop: 0 }}>💰 Budget Overview</h3>

      {/* Overall Budget */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>Total Budget</span>
          <span style={{ fontWeight: 'bold' }}>₹{utilization.totalBudget.toLocaleString()}</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            fontSize: '0.9rem',
            color: '#666',
          }}
        >
          <span>Spent: ₹{utilization.totalSpent.toLocaleString()}</span>
          <span>Remaining: ₹{utilization.remaining.toLocaleString()}</span>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            backgroundColor: '#ddd',
            borderRadius: '8px',
            height: '16px',
            overflow: 'hidden',
            marginBottom: '0.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: getProgressBarColor(utilization.percentageUsed),
              height: '100%',
              width: `${utilization.percentageUsed}%`,
              transition: 'width 300ms',
            }}
          />
        </div>

        <div
          style={{
            textAlign: 'center',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            color: getProgressBarColor(utilization.percentageUsed),
          }}
        >
          {utilization.percentageUsed}% spent
        </div>
      </div>

      {/* Category Breakdown */}
      <div>
        <h4 style={{ margin: '1rem 0 0.5rem' }}>Category Breakdown</h4>
        {Object.entries(utilization.byCategory).map(([category, data]) => (
          <div key={category} style={{ marginBottom: '1rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.25rem',
                fontSize: '0.9rem',
              }}
            >
              <span style={{ textTransform: 'capitalize' }}>{category}</span>
              <span>
                ₹{data.spent.toLocaleString()} / ₹{data.allocated.toLocaleString()}
              </span>
            </div>

            <div
              style={{
                backgroundColor: '#ddd',
                borderRadius: '4px',
                height: '8px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  backgroundColor: getProgressBarColor(data.percentageUsed),
                  height: '100%',
                  width: `${Math.min(data.percentageUsed, 100)}%`,
                }}
              />
            </div>

            <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.25rem' }}>
              {data.percentageUsed}% used
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
