/* Shaadi Sajao · VendorCard
   Direct port of apps/shaadi-sajao/src/components/VendorCard.tsx.
   `varmalVerified` flips on a green 2px border — a deliberate
   trust signal that breaks the theme. */

function VendorCard({ vendor, onBook }) {
  const ratingColor = vendor.rating >= 4.7 ? '#4caf50' : vendor.rating >= 4.0 ? '#2196f3' : '#ff9800';
  return React.createElement('div', {
    style: {
      backgroundColor: '#fff', borderRadius: 12, padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: vendor.varmalVerified ? '2px solid #4caf50' : '1px solid #ddd',
    },
  },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'start' } },
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('h4', { style: { margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: 700 } },
          `${vendor.name}${vendor.varmalVerified ? '  ✓' : ''}`),
        React.createElement('p', { style: { color: '#666', margin: '0.25rem 0', fontSize: '0.9rem' } }, `📍 ${vendor.city} · ${vendor.category}`),
        vendor.description && React.createElement('p', { style: { color: '#777', margin: '0.5rem 0', fontSize: '0.85rem' } }, vendor.description),
        React.createElement('div', { style: { display: 'flex', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap' } },
          React.createElement('a', { href: '#', style: { color: '#2196f3', textDecoration: 'none', fontSize: '0.85rem' }, onClick: e => e.preventDefault() }, '📧 Email'),
          React.createElement('a', { href: '#', style: { color: '#2196f3', textDecoration: 'none', fontSize: '0.85rem' }, onClick: e => e.preventDefault() }, '📞 Call'),
          React.createElement('a', { href: '#', style: { color: '#2196f3', textDecoration: 'none', fontSize: '0.85rem' }, onClick: e => e.preventDefault() }, '🎨 Portfolio'),
        ),
      ),
      React.createElement('div', { style: { textAlign: 'right', marginLeft: '1rem' } },
        React.createElement('div', { style: { fontSize: '1.5rem', fontWeight: 'bold', color: ratingColor, marginBottom: '0.25rem' } }, `${vendor.rating}★`),
        React.createElement('p', { style: { color: '#999', margin: 0, fontSize: '0.8rem' } }, `${vendor.reviewCount} reviews`),
      ),
    ),
    React.createElement('div', {
      style: { marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    },
      React.createElement('div', null,
        React.createElement('p', { style: { margin: 0, color: '#666', fontSize: '0.85rem' } }, 'Price Range'),
        React.createElement('p', { style: { margin: '0.25rem 0 0', fontSize: '1rem', fontWeight: 'bold' } }, vendor.priceRange),
      ),
      vendor.booked
        ? React.createElement('span', { style: { padding: '0.6rem 1.2rem', background: '#e6f4ea', color: '#1b6e3a', borderRadius: 6, fontWeight: 700, fontSize: '0.9rem' } }, '✓ Booked · deposit paid')
        : React.createElement('button', {
            onClick: onBook,
            style: { padding: '0.75rem 1.5rem', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', fontFamily: 'var(--font-body)' },
          }, 'Book Now'),
    ),
  );
}

window.VendorCard = VendorCard;
