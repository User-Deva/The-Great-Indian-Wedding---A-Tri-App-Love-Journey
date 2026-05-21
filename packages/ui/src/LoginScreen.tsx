import React, { useState } from 'react';
import { useThemeStore } from '@great-indian-wedding/theme-engine';
import { useAuthStore } from '@great-indian-wedding/auth';
import { mockApi } from '@great-indian-wedding/mock-backend';
import { Button, Card } from './primitives';

interface LoginScreenProps {
  appEmoji: string;
  appName: string;
  appTagline: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ appEmoji, appName, appTagline }) => {
  const { currentTheme } = useThemeStore();
  const { setUser } = useAuthStore();
  const users = mockApi.listAvailableUsers();
  const [selected, setSelected] = useState<string>(users[0]?.id || '');

  const handleSignIn = () => {
    if (!selected) return;
    const user = mockApi.signIn(selected);
    if (!user) return;
    setUser({
      id: user.id,
      email: user.email,
      coupleId: user.coupleId,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    window.location.reload();
  };

  const couplePairs = Object.values(
    users.reduce<Record<string, { coupleId: string; users: typeof users }>>((acc, u) => {
      if (!acc[u.coupleId]) acc[u.coupleId] = { coupleId: u.coupleId, users: [] };
      acc[u.coupleId].users.push(u);
      return acc;
    }, {})
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${currentTheme.colors.primary} 0%, ${currentTheme.colors.accent} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif',
      }}
    >
      <div style={{ width: '100%', maxWidth: 720 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem', color: currentTheme.colors.secondary }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{appEmoji}</div>
          <h1 style={{ fontSize: '2.2rem', margin: '0 0 0.5rem', letterSpacing: 0.3 }}>{appName}</h1>
          <p style={{ margin: 0, opacity: 0.92, fontSize: '1.05rem' }}>{appTagline}</p>
        </div>

        <Card>
          <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Step into a couple's journey</h2>
          <p style={{ margin: '0 0 1.5rem', color: 'rgba(0,0,0,0.6)', fontSize: '0.95rem' }}>
            This is a local demo with no real accounts. Pick a seeded user to sign in as.
            Each "couple" shares one journey across all three apps.
          </p>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {couplePairs.map((pair) => (
              <div
                key={pair.coupleId}
                style={{
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 12,
                  padding: '1rem',
                  background: '#fafafa',
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '0.75rem', color: currentTheme.colors.primary }}>
                  Couple · {pair.users.map((u) => u.displayName).join(' & ')}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                  {pair.users.map((u) => (
                    <label
                      key={u.id}
                      style={{
                        display: 'flex',
                        gap: '0.6rem',
                        alignItems: 'center',
                        padding: '0.75rem',
                        borderRadius: 10,
                        background: selected === u.id ? currentTheme.colors.primary : '#fff',
                        color: selected === u.id ? currentTheme.colors.secondary : '#1a1a1a',
                        cursor: 'pointer',
                        border: selected === u.id ? `1px solid ${currentTheme.colors.primary}` : '1px solid rgba(0,0,0,0.08)',
                        transition: 'background 120ms, color 120ms',
                      }}
                    >
                      <input
                        type="radio"
                        name="user"
                        value={u.id}
                        checked={selected === u.id}
                        onChange={() => setSelected(u.id)}
                        style={{ accentColor: currentTheme.colors.primary }}
                      />
                      <div>
                        <div style={{ fontWeight: 600 }}>{u.displayName}</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.75 }}>{u.email}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <Button variant="primary" size="lg" onClick={handleSignIn} disabled={!selected}>
              Sign in as {users.find((u) => u.id === selected)?.displayName || '...'}
            </Button>
          </div>
        </Card>

        <p style={{ textAlign: 'center', color: currentTheme.colors.secondary, marginTop: '1.25rem', opacity: 0.85, fontSize: '0.85rem' }}>
          Data lives in this browser's localStorage. Sign out + "Reset demo" wipes everything back to seed.
        </p>
      </div>
    </div>
  );
};
