/* Jannat Safar · DestinationCard
   Direct port of apps/jannat-safar/src/components/DestinationCard.tsx.
   Until real photos land, an archetype-tinted tile + 🌍 emoji
   stands in for the destination image. */

const ARCHETYPE_COLOR = {
  'Beach Lovers':       '#00BCD4',
  'Mountain Romantics': '#8D6E63',
  'Culture Explorers':  '#FF6F00',
  'Adventure Seekers':  '#D32F2F',
  'Luxury Loungers':    '#D4AF37',
  'Budget Smart':       '#4CAF50',
};

function DestinationCard({ destination, onSelect, onPick, picked }) {
  const color = ARCHETYPE_COLOR[destination.archetype] || '#2196F3';
  return React.createElement('div', {
    style: {
      backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transition: 'transform 200ms, box-shadow 200ms',
      border: picked ? `2px solid ${color}` : '1px solid rgba(0,0,0,0.06)',
    },
    onMouseEnter: e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'; },
    onMouseLeave: e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; },
  },
    React.createElement('div', {
      style: { backgroundColor: color, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '3rem' },
    }, destination.glyph || '🌍'),
    React.createElement('div', { style: { padding: '1.25rem' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem', gap: '0.5rem' } },
        React.createElement('div', null,
          React.createElement('h4', { style: { margin: '0 0 0.25rem', fontSize: '1.1rem', fontFamily: 'var(--font-display)', fontWeight: 700 } }, destination.name),
          React.createElement('p', { style: { margin: 0, color: '#666', fontSize: '0.85rem' } }, destination.country),
        ),
        React.createElement('span', {
          style: { backgroundColor: color, color: '#fff', padding: '0.25rem 0.65rem', borderRadius: 999, fontSize: '0.72rem', fontWeight: 700, whiteSpace: 'nowrap' },
        }, destination.archetype),
      ),
      React.createElement('p', { style: { color: '#666', margin: '0.75rem 0', fontSize: '0.9rem', lineHeight: 1.4 } }, destination.whyPerfect),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.75rem', fontSize: '0.85rem' } },
        React.createElement('div', null,
          React.createElement('p', { style: { margin: 0, color: '#999', fontSize: '0.78rem' } }, 'Best Time'),
          React.createElement('p', { style: { margin: '0.2rem 0 0', fontWeight: 700 } }, destination.bestTime),
        ),
        React.createElement('div', null,
          React.createElement('p', { style: { margin: 0, color: '#999', fontSize: '0.78rem' } }, 'Budget'),
          React.createElement('p', { style: { margin: '0.2rem 0 0', fontWeight: 700 } },
            `₹${(destination.budget.min / 100000).toFixed(1)}L – ${(destination.budget.max / 100000).toFixed(1)}L`),
        ),
      ),
      React.createElement('div', { style: { marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' } },
        React.createElement('span', { style: { fontSize: '0.72rem', backgroundColor: '#f0f0f0', padding: '0.2rem 0.55rem', borderRadius: 6 } },
          destination.visa === 'none' ? '✓ No Visa' : destination.visa),
        React.createElement('span', { style: { fontSize: '0.72rem', backgroundColor: '#f0f0f0', padding: '0.2rem 0.55rem', borderRadius: 6 } },
          `${destination.nights} nights`),
      ),
      React.createElement('button', {
        onClick: onPick || onSelect,
        style: {
          width: '100%', marginTop: '1rem', padding: '0.75rem',
          backgroundColor: picked ? '#fff' : color,
          color: picked ? color : '#fff',
          border: picked ? `2px solid ${color}` : 'none',
          borderRadius: 6, cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem',
          fontFamily: 'var(--font-body)',
        },
      }, picked ? '✓ Picked' : 'Pick this destination'),
    ),
  );
}

window.DestinationCard = DestinationCard;
window.ARCHETYPE_COLOR = ARCHETYPE_COLOR;
