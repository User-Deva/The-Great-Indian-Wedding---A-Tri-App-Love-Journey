/* Shaadi Sajao · WeddingCountdown
   D/H/M boxes ticking down to the wedding date. */

function WeddingCountdown({ target }) {
  const theme = useTheme();
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    if (!target) return;
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, [target]);
  if (!target) return null;
  const diff = new Date(target).getTime() - now;
  if (diff <= 0) return React.createElement('div', { style: { color: theme.colors.primary, fontWeight: 700 } }, 'It\'s today! 🎉');
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  const Box = ({ value, label }) => React.createElement('div', {
    style: {
      minWidth: 84, padding: '0.85rem 0.95rem', borderRadius: 12,
      background: theme.colors.primary, color: theme.colors.secondary, textAlign: 'center',
    },
  },
    React.createElement('div', { style: { fontSize: '2rem', fontWeight: 700, lineHeight: 1, fontFamily: 'var(--font-display)' } }, value),
    React.createElement('div', { style: { fontSize: '0.78rem', opacity: 0.9, marginTop: 4 } }, label),
  );
  return React.createElement('div', { style: { display: 'flex', gap: '0.75rem' } },
    React.createElement(Box, { value: days, label: 'days' }),
    React.createElement(Box, { value: hours, label: 'hrs' }),
    React.createElement(Box, { value: mins, label: 'min' }),
  );
}

window.WeddingCountdown = WeddingCountdown;
