/* Rishta · DateVenueCard
   Direct port of apps/rishta/src/components/DateVenueCard.tsx,
   keeping the conversation-starters drawer. */

function DateVenueCard({ venue, onSchedule }) {
  const [showStarters, setShowStarters] = React.useState(false);
  const theme = useTheme();
  const typeEmoji = {
    cafe: '☕', heritage: '🏛️', restaurant: '🍽️', garden: '🌿', cultural: '🎨',
  }[venue.type] || '📍';

  return React.createElement('div', {
    style: {
      border: '2px solid #ddd', borderRadius: 12, padding: '1.5rem',
      backgroundColor: '#f9f9f9',
    },
  },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'start' } },
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('h4', { style: { margin: '0 0 0.5rem', fontSize: '1.15rem', fontFamily: 'var(--font-body)', fontWeight: 700 } },
          `${typeEmoji} ${venue.name}`),
        React.createElement('p', { style: { color: '#666', margin: '0.25rem 0', fontSize: '0.9rem' } }, `📍 ${venue.address}`),
        React.createElement('p', { style: { color: '#666', margin: '0.25rem 0', fontSize: '0.9rem' } }, `💰 Budget: ₹${venue.budgetEstimate.toLocaleString('en-IN')}`),
        React.createElement('p', { style: { color: '#666', margin: '0.25rem 0', fontSize: '0.9rem' } }, `👕 ${venue.dressCode}`),
      ),
    ),
    React.createElement('div', { style: { marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' } },
      React.createElement('button', {
        onClick: () => setShowStarters(!showStarters),
        style: {
          backgroundColor: '#2196F3', color: '#fff', border: 'none', borderRadius: 6,
          padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'var(--font-body)',
        },
      }, showStarters ? '✓ Hide' : 'Show', ' Conversation Starters'),
      React.createElement('button', {
        onClick: () => onSchedule(venue),
        style: {
          backgroundColor: theme.colors.primary, color: theme.colors.secondary, border: 'none', borderRadius: 6,
          padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold', fontFamily: 'var(--font-body)',
        },
      }, '📅 Schedule Date'),
    ),
    showStarters && React.createElement('div', {
      style: { marginTop: '1rem', backgroundColor: '#e3f2fd', padding: '1rem', borderRadius: 8 },
    },
      React.createElement('h5', { style: { margin: '0 0 0.5rem' } }, '💬 Conversation Starters:'),
      React.createElement('ul', { style: { margin: '0.5rem 0', paddingLeft: '1.5rem' } },
        venue.conversationStarters.map((s, i) =>
          React.createElement('li', { key: i, style: { marginBottom: '0.4rem', color: '#333' } }, s)),
      ),
    ),
  );
}

window.DateVenueCard = DateVenueCard;
