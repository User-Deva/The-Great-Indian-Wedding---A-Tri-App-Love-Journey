/* Rishta · ProfileCard
   The "Two of you" card pair from the Dashboard. */

function ProfileCard({ profile }) {
  return React.createElement(Card, null,
    React.createElement('div', { style: { display: 'flex', gap: '0.75rem', alignItems: 'center' } },
      React.createElement('div', { style: { fontSize: '2rem' } }, profile.emoji),
      React.createElement('div', null,
        React.createElement('div', { style: { fontWeight: 700, fontSize: '1.05rem' } }, `${profile.firstName} ${profile.lastName}`),
        React.createElement('div', { style: { fontSize: '0.85rem', color: 'rgba(0,0,0,0.55)' } }, `${profile.profession} · ${profile.city}`),
      ),
    ),
    React.createElement('p', { style: { marginTop: '0.75rem', fontSize: '0.92rem', color: 'rgba(0,0,0,0.7)', lineHeight: 1.5 } }, profile.bio),
    profile.kundaliType && React.createElement('div', { style: { marginTop: '0.5rem' } },
      React.createElement(Badge, { tone: 'info' }, `Kundali · ${profile.kundaliType.replace('_', ' ')}`)),
  );
}

window.ProfileCard = ProfileCard;
