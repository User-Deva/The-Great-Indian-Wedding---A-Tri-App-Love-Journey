/* ─────────────────────────────────────────────────────────────
   Shared primitives — direct port of packages/ui/src/primitives.tsx
   from the source codebase, simplified for the UI kits.

   These read from a theme context (set up in index.html) instead
   of zustand. The shape of `theme` is identical: {name, colors:
   {primary, secondary, accent}, motif, vibe}.

   Export to window so each UI kit's other JSX files can use them.
   ───────────────────────────────────────────────────────────── */

const ThemeContext = React.createContext(null);

function ThemeProvider({ value, children }) {
  return React.createElement(ThemeContext.Provider, { value }, children);
}

function useTheme() {
  return React.useContext(ThemeContext);
}

// ── Button ────────────────────────────────────────────────
function Button({ variant = 'primary', size = 'md', fullWidth = false, children, style, disabled, onClick, ...rest }) {
  const theme = useTheme();
  const padding = size === 'sm' ? '0.45rem 0.9rem' : size === 'lg' ? '0.95rem 1.6rem' : '0.7rem 1.25rem';
  const fontSize = size === 'sm' ? '0.85rem' : size === 'lg' ? '1.05rem' : '0.95rem';
  const base = {
    padding, fontSize, fontWeight: 600, borderRadius: 10, border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease',
    opacity: disabled ? 0.55 : 1,
    width: fullWidth ? '100%' : 'auto',
    letterSpacing: 0.2,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    fontFamily: 'var(--font-body)',
  };
  let v = {};
  if (variant === 'primary')   v = { backgroundColor: theme.colors.primary, color: theme.colors.secondary, boxShadow: '0 6px 18px rgba(0,0,0,0.12)' };
  else if (variant === 'secondary') v = { backgroundColor: 'rgba(255,255,255,0.85)', color: theme.colors.primary, border: `1.5px solid ${theme.colors.primary}` };
  else if (variant === 'ghost')     v = { backgroundColor: 'transparent', color: theme.colors.primary };
  else if (variant === 'danger')    v = { backgroundColor: '#c62828', color: '#fff' };
  return React.createElement('button', {
    ...rest, disabled, onClick,
    style: { ...base, ...v, ...style },
    onMouseEnter: e => { if (!disabled) e.currentTarget.style.transform = 'translateY(-1px)'; },
    onMouseLeave: e => { e.currentTarget.style.transform = 'translateY(0)'; },
  }, children);
}

// ── Card ──────────────────────────────────────────────────
function Card({ children, accent = false, padded = true, style, onClick }) {
  const theme = useTheme();
  return React.createElement('div', {
    onClick,
    style: {
      backgroundColor: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 18px rgba(0,0,0,0.06)',
      border: accent ? `2px solid ${theme.colors.primary}` : '1px solid rgba(0,0,0,0.06)',
      padding: padded ? '1.5rem' : 0,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'transform 160ms ease, box-shadow 160ms ease',
      ...style,
    },
  }, children);
}

// ── Section ───────────────────────────────────────────────
function Section({ title, subtitle, actions, children }) {
  const theme = useTheme();
  return React.createElement('section', { style: { marginBottom: '2.5rem' } },
    (title || actions) && React.createElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem', gap: '1rem', flexWrap: 'wrap' },
    },
      React.createElement('div', null,
        title && React.createElement('h2', { style: { margin: 0, fontSize: '1.4rem', color: theme.colors.primary, fontFamily: 'var(--font-display)', fontWeight: 600 } }, title),
        subtitle && React.createElement('p', { style: { margin: '0.25rem 0 0', color: 'rgba(0,0,0,0.55)', fontSize: '0.92rem' } }, subtitle),
      ),
      actions && React.createElement('div', null, actions),
    ),
    children
  );
}

// ── Badge ─────────────────────────────────────────────────
function Badge({ children, tone = 'neutral' }) {
  const palette = {
    neutral:  { bg: '#eef0f5', fg: '#444' },
    positive: { bg: '#e6f4ea', fg: '#1b6e3a' },
    warning:  { bg: '#fff3e0', fg: '#a35400' },
    danger:   { bg: '#fdecea', fg: '#a8201a' },
    info:     { bg: '#e7f0fb', fg: '#1f4f87' },
  }[tone];
  return React.createElement('span', {
    style: {
      backgroundColor: palette.bg, color: palette.fg,
      padding: '0.25rem 0.65rem', borderRadius: 999,
      fontSize: '0.78rem', fontWeight: 600, whiteSpace: 'nowrap',
      display: 'inline-block',
    },
  }, children);
}

// ── Grid ──────────────────────────────────────────────────
function Grid({ children, min = 280, gap = '1.25rem' }) {
  return React.createElement('div', {
    style: { display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`, gap },
  }, children);
}

// ── EmptyState ────────────────────────────────────────────
function EmptyState({ emoji = '✨', title, description, action }) {
  return React.createElement('div', {
    style: { textAlign: 'center', padding: '3rem 1.5rem', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 16, border: '1px dashed rgba(0,0,0,0.15)' },
  },
    React.createElement('div', { style: { fontSize: '2.5rem', marginBottom: '0.75rem' } }, emoji),
    React.createElement('h3', { style: { margin: '0 0 0.5rem', fontSize: '1.15rem', fontFamily: 'var(--font-display)', fontWeight: 600 } }, title),
    description && React.createElement('p', { style: { margin: 0, color: 'rgba(0,0,0,0.55)', fontSize: '0.95rem' } }, description),
    action && React.createElement('div', { style: { marginTop: '1.25rem' } }, action),
  );
}

// ── AppShell ──────────────────────────────────────────────
function AppShell({ appName, appEmoji, tagline, navItems, activeNav, onNav, stageLabel, user, onSignOut, children }) {
  const theme = useTheme();
  return React.createElement('div', {
    style: {
      backgroundColor: theme.colors.secondary, color: '#1a1a1a',
      minHeight: '100vh', transition: 'background-color 300ms ease',
      fontFamily: 'var(--font-body)',
    },
  },
    React.createElement('header', {
      style: {
        backgroundColor: theme.colors.primary, color: theme.colors.secondary,
        padding: '1.1rem 1.5rem 1.25rem', boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
        transition: 'background-color 300ms ease',
      },
    },
      React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: '1.6rem', fontWeight: 700, letterSpacing: 0.2, fontFamily: 'var(--font-display)' } }, `${appEmoji} ${appName}`),
            tagline && React.createElement('div', { style: { marginTop: 2, opacity: 0.92, fontSize: '0.9rem' } }, tagline),
            React.createElement('div', { style: { marginTop: 6, opacity: 0.85, fontSize: '0.82rem' } }, `${theme.name} · ${theme.motif} · ${theme.vibe}`),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' } },
            React.createElement(Badge, { tone: 'info' }, `Stage · ${stageLabel}`),
            user && React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '0.5rem' } },
              React.createElement('span', { style: { fontSize: '0.85rem', opacity: 0.95 } }, `👤 ${user.email}`),
              React.createElement('button', {
                onClick: onSignOut,
                style: {
                  background: 'rgba(255,255,255,0.15)', color: theme.colors.secondary,
                  border: '1px solid rgba(255,255,255,0.35)', borderRadius: 8,
                  padding: '0.35rem 0.7rem', cursor: 'pointer', fontSize: '0.8rem',
                },
              }, 'Sign out'),
            ),
          ),
        ),
        navItems && React.createElement('nav', { style: { marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' } },
          navItems.map(item => {
            const active = activeNav === item.to;
            return React.createElement('button', {
              key: item.to, onClick: () => onNav(item.to),
              style: {
                padding: '0.45rem 0.95rem', borderRadius: 999, textDecoration: 'none',
                color: theme.colors.secondary,
                background: active ? 'rgba(255,255,255,0.22)' : 'transparent',
                border: active ? '1px solid rgba(255,255,255,0.45)' : '1px solid rgba(255,255,255,0.18)',
                fontSize: '0.88rem', fontWeight: 500, fontFamily: 'var(--font-body)', cursor: 'pointer',
              },
            }, item.emoji ? `${item.emoji} ${item.label}` : item.label);
          }),
        ),
      ),
    ),
    React.createElement('main', { style: { maxWidth: 1280, margin: '0 auto', padding: '2rem 1.5rem' } }, children),
  );
}

// ── LoginScreen ──────────────────────────────────────────
function LoginScreen({ appEmoji, appName, appTagline, users, onSignIn }) {
  const theme = useTheme();
  const [selected, setSelected] = React.useState(users[0]?.id);
  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
      fontFamily: 'var(--font-body)',
    },
  },
    React.createElement('div', { style: { width: '100%', maxWidth: 720 } },
      React.createElement('div', { style: { textAlign: 'center', marginBottom: '2rem', color: theme.colors.secondary } },
        React.createElement('div', { style: { fontSize: '3.5rem', marginBottom: '0.5rem' } }, appEmoji),
        React.createElement('h1', { style: { fontSize: '2.2rem', margin: '0 0 0.5rem', letterSpacing: 0.3, fontFamily: 'var(--font-display)', fontWeight: 700 } }, appName),
        React.createElement('p', { style: { margin: 0, opacity: 0.92, fontSize: '1.05rem', fontFamily: 'var(--font-display)', fontStyle: 'italic' } }, appTagline),
      ),
      React.createElement(Card, null,
        React.createElement('h2', { style: { margin: '0 0 0.5rem', fontSize: '1.25rem', color: theme.colors.primary, fontFamily: 'var(--font-display)' } }, "Step into a couple's journey"),
        React.createElement('p', { style: { margin: '0 0 1.5rem', color: 'rgba(0,0,0,0.6)', fontSize: '0.95rem' } },
          "This is a local demo with no real accounts. Pick a seeded user to sign in as. Each \"couple\" shares one journey across all three apps."),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' } },
          users.map(u => React.createElement('label', {
            key: u.id,
            style: {
              display: 'flex', gap: '0.6rem', alignItems: 'center', padding: '0.75rem', borderRadius: 10,
              background: selected === u.id ? theme.colors.primary : '#fff',
              color: selected === u.id ? theme.colors.secondary : '#1a1a1a',
              cursor: 'pointer',
              border: selected === u.id ? `1px solid ${theme.colors.primary}` : '1px solid rgba(0,0,0,0.08)',
              transition: 'background 120ms, color 120ms',
            },
          },
            React.createElement('input', { type: 'radio', name: 'user', checked: selected === u.id, onChange: () => setSelected(u.id), style: { accentColor: theme.colors.primary } }),
            React.createElement('div', null,
              React.createElement('div', { style: { fontWeight: 600 } }, u.displayName),
              React.createElement('div', { style: { fontSize: '0.8rem', opacity: 0.75 } }, u.email),
            ),
          )),
        ),
        React.createElement('div', { style: { marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' } },
          React.createElement(Button, { variant: 'primary', size: 'lg', onClick: () => onSignIn(users.find(u => u.id === selected)), disabled: !selected },
            `Sign in as ${users.find(u => u.id === selected)?.displayName || '...'}`),
        ),
      ),
    ),
  );
}

// ── StoryTimeline ────────────────────────────────────────
function StoryTimeline({ events, compact = false }) {
  const theme = useTheme();
  const sorted = [...events].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  if (sorted.length === 0) {
    return React.createElement(EmptyState, {
      emoji: '💞', title: 'Your story starts soon',
      description: "Milestones from your couple's journey will appear here as you reach them.",
    });
  }
  return React.createElement('div', { style: { position: 'relative', padding: compact ? '0.5rem 0' : '1rem 0' } },
    React.createElement('div', { style: { position: 'absolute', left: 22, top: 0, bottom: 0, width: 2, background: `${theme.colors.primary}33` } }),
    sorted.map(ev => React.createElement('div', { key: ev.id, style: { position: 'relative', paddingLeft: 60, marginBottom: '1.25rem' } },
      React.createElement('div', {
        style: {
          position: 'absolute', left: 0, top: 2, width: 46, height: 46, borderRadius: '50%',
          background: theme.colors.primary, color: theme.colors.secondary,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
        },
      }, ev.emoji),
      React.createElement('div', {
        style: { background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, padding: '0.9rem 1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' } },
          React.createElement('div', { style: { fontWeight: 700, color: theme.colors.primary } }, ev.title),
          React.createElement('div', { style: { fontSize: '0.78rem', color: 'rgba(0,0,0,0.5)' } },
            new Date(ev.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })),
        ),
        React.createElement('p', { style: { margin: '0.35rem 0 0', color: 'rgba(0,0,0,0.7)', fontSize: '0.92rem' } }, ev.description),
      ),
    )),
  );
}

// Expose globally so other component files can use them.
Object.assign(window, { ThemeProvider, useTheme, Button, Card, Section, Badge, Grid, EmptyState, AppShell, LoginScreen, StoryTimeline });
