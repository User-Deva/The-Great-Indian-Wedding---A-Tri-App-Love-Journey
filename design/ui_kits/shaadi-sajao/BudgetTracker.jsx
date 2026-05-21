/* Shaadi Sajao · BudgetTracker
   Category bars vs allocated budget. */

const BUDGET_CATS = [
  { id: 'venue',       label: '🏛️ Venue',         alloc: 1500000 },
  { id: 'catering',    label: '🍽️ Catering',       alloc: 1200000 },
  { id: 'decor',       label: '💐 Decor & flowers',alloc: 600000  },
  { id: 'photography', label: '📸 Photography',    alloc: 350000  },
  { id: 'attire',      label: '👰 Bridal attire',  alloc: 500000  },
  { id: 'mehendi',     label: '🤲 Mehendi & beauty', alloc: 180000 },
];

function BudgetTracker({ totalBudget, spent }) {
  const theme = useTheme();
  return React.createElement(Card, null,
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' } },
      React.createElement('h3', { style: { margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: theme.colors.primary } }, 'Budget tracker'),
      React.createElement('div', { style: { color: 'rgba(0,0,0,0.55)', fontSize: '0.9rem' } },
        `₹${spent.toLocaleString('en-IN')} of ₹${totalBudget.toLocaleString('en-IN')}`),
    ),
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.85rem' } },
      BUDGET_CATS.map(cat => {
        const used = spent[cat.id] || 0;
        const pct = Math.min(100, (used / cat.alloc) * 100);
        return React.createElement('div', { key: cat.id },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: 4 } },
            React.createElement('span', { style: { fontWeight: 600 } }, cat.label),
            React.createElement('span', { style: { color: 'rgba(0,0,0,0.55)' } },
              `₹${used.toLocaleString('en-IN')} / ₹${cat.alloc.toLocaleString('en-IN')}`),
          ),
          React.createElement('div', { style: { height: 8, background: 'rgba(0,0,0,0.06)', borderRadius: 999, overflow: 'hidden' } },
            React.createElement('div', { style: { width: `${pct}%`, height: '100%', background: theme.colors.primary, borderRadius: 999, transition: 'width 300ms ease' } }),
          ),
        );
      }),
    ),
  );
}

window.BudgetTracker = BudgetTracker;
window.BUDGET_CATS = BUDGET_CATS;
