/* Rishta · MatchCard
   Direct port of apps/rishta/src/components/MatchCard.tsx,
   simplified to use the shared primitives, with the new
   photo-strip carousel at the top (per design review). */

function MatchCard({ match, onInterest, onPass }) {
  const [photoIdx, setPhotoIdx] = React.useState(0);
  const score = match.compatibilityScore;
  const scoreColor = score >= 85 ? '#4CAF50' : score >= 65 ? '#2196F3' : '#FF9800';
  const msg = score >= 85
    ? 'Your stars are aligned — this could be the one ✨'
    : score >= 65
    ? 'Strong potential. Worth a chai together.'
    : 'Some overlap. Take it slow, see how it feels.';

  // Photo strip — until real images land, a soft gradient + the
  // profile emoji as a placeholder. 4 photos per profile by convention.
  const photoCount = match.photos?.length || 4;
  const gradient = match.photoTint || 'linear-gradient(135deg, #F4A7B9, #F7E7CE)';

  return React.createElement('div', {
    style: {
      background: '#fff', border: '1px solid #e0e0e0', borderRadius: 12,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)', overflow: 'hidden',
      transition: 'transform 200ms, box-shadow 200ms',
    },
    onMouseEnter: e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'; },
    onMouseLeave: e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'; },
  },
    // ── Photo strip ─────────────────────────────────────────
    React.createElement('div', {
      onClick: () => setPhotoIdx((photoIdx + 1) % photoCount),
      style: {
        position: 'relative', height: 180, background: gradient,
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      },
    },
      React.createElement('div', { style: { fontSize: 80, lineHeight: 1, textShadow: '0 2px 8px rgba(0,0,0,0.08)' } }, match.emoji),
      // carousel dots
      React.createElement('div', {
        style: { position: 'absolute', top: 12, left: 14, display: 'flex', gap: 6 },
      }, Array.from({ length: photoCount }, (_, i) =>
        React.createElement('span', {
          key: i,
          style: { width: 7, height: 7, borderRadius: '50%', background: '#fff', opacity: i === photoIdx ? 1 : 0.5, transition: 'opacity 160ms' },
        }),
      )),
      // photo counter
      React.createElement('div', {
        style: { position: 'absolute', top: 12, right: 14, background: 'rgba(255,255,255,0.92)', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, color: '#1a1a1a' },
      }, `📷 ${photoIdx + 1} / ${photoCount}`),
      // compatibility badge — overlaps the seam
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: -22, right: 18,
          width: 54, height: 54, borderRadius: '50%',
          background: scoreColor, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 14,
          border: '3px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
        },
      }, `${score}%`),
    ),

    // ── Content ─────────────────────────────────────────────
    React.createElement('div', { style: { padding: '1.25rem 1rem 1rem' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: 4 } },
        React.createElement('div', null,
          React.createElement('h3', { style: { margin: 0, fontSize: '1.2rem', fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.15 } },
            match.name,
            match.age && React.createElement('span', { style: { fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.92rem', color: 'rgba(0,0,0,0.55)' } }, ` · ${match.age}`),
          ),
          React.createElement('div', { style: { fontSize: '0.85rem', color: 'rgba(0,0,0,0.55)', marginTop: 2 } },
            `${match.profession} · ${match.city}`),
        ),
      ),
      React.createElement('p', { style: { color: '#666', margin: '6px 0', fontSize: '0.92rem' } }, msg),
      match.gunaMilanScore !== undefined && React.createElement('p', { style: { color: '#999', fontSize: '0.82rem', margin: '4px 0' } },
        `Guna Milan: ${match.gunaMilanScore} / 36`),
      match.bio && React.createElement('p', { style: { color: '#777', fontSize: '0.85rem', margin: '6px 0', fontStyle: 'italic' } }, match.bio),
      React.createElement('div', { style: { display: 'flex', gap: '0.75rem', marginTop: '1rem' } },
        React.createElement('button', {
          onClick: onInterest,
          style: { flex: 1, padding: '0.75rem', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', fontSize: '0.92rem', fontFamily: 'var(--font-body)' },
        }, '❤️ Interested'),
        React.createElement('button', {
          onClick: onPass,
          style: { flex: 1, padding: '0.75rem', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', fontSize: '0.92rem', fontFamily: 'var(--font-body)' },
        }, '👋 Pass'),
      ),
    ),
  );
}

window.MatchCard = MatchCard;
