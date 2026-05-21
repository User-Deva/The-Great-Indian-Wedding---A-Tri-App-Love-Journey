import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore, JourneyStage } from '@great-indian-wedding/theme-engine';
import { useAuthStore } from '@great-indian-wedding/auth';
import { mockApi } from '@great-indian-wedding/mock-backend';
import { Badge } from './primitives';

const APP_LINKS: { name: string; emoji: string; url: string; key: 'rishta' | 'shaadi' | 'jannat' }[] = [
  { name: 'Rishta', emoji: '✨', url: 'http://localhost:3001/', key: 'rishta' },
  { name: 'Shaadi Sajao', emoji: '💍', url: 'http://localhost:3002/', key: 'shaadi' },
  { name: 'Jannat Safar', emoji: '✈️', url: 'http://localhost:3003/', key: 'jannat' },
];

const STAGE_LABELS: Record<JourneyStage, string> = {
  SEEKING: 'Seeking',
  MATCHED: 'Matched',
  DATE_SET: 'Date Planned',
  DATING: 'Dating',
  WEDDING: 'Wedding Mode',
  HONEYMOONING: 'Honeymooning',
};

interface NavItem {
  to: string;
  label: string;
  emoji?: string;
}

interface AppShellProps {
  appKey: 'rishta' | 'shaadi' | 'jannat';
  appName: string;
  appEmoji: string;
  tagline?: string;
  navItems: NavItem[];
  children: ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  appKey,
  appName,
  appEmoji,
  tagline,
  navItems,
  children,
}) => {
  const { currentTheme, journeyStage } = useThemeStore();
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const handleSignOut = () => {
    mockApi.signOut();
    logout();
    window.location.reload();
  };

  const handleReset = () => {
    if (!confirm('Reset all demo data? This clears matches, bookings, the journey, and signs you out.')) return;
    mockApi.reset();
    logout();
    window.location.reload();
  };

  return (
    <div
      style={{
        backgroundColor: currentTheme.colors.secondary,
        color: '#1a1a1a',
        minHeight: '100vh',
        transition: 'background-color 300ms ease',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif',
      }}
    >
      <header
        style={{
          backgroundColor: currentTheme.colors.primary,
          color: currentTheme.colors.secondary,
          padding: '1.1rem 1.5rem 1.25rem',
          boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
          transition: 'background-color 300ms ease',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: 0.2 }}>
                {appEmoji} {appName}
              </div>
              {tagline && (
                <div style={{ marginTop: 2, opacity: 0.92, fontSize: '0.9rem' }}>{tagline}</div>
              )}
              <div style={{ marginTop: 6, opacity: 0.85, fontSize: '0.82rem' }}>
                {currentTheme.name} · {currentTheme.motif} · {currentTheme.vibe}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Badge tone="info">Stage · {STAGE_LABELS[journeyStage]}</Badge>
              {user && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', opacity: 0.95 }}>
                    👤 {user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      color: currentTheme.colors.secondary,
                      border: '1px solid rgba(255,255,255,0.35)',
                      borderRadius: 8,
                      padding: '0.35rem 0.7rem',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                    }}
                  >
                    Sign out
                  </button>
                  <button
                    onClick={handleReset}
                    style={{
                      background: 'transparent',
                      color: currentTheme.colors.secondary,
                      border: '1px solid rgba(255,255,255,0.35)',
                      borderRadius: 8,
                      padding: '0.35rem 0.7rem',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                    }}
                    title="Reset all demo data"
                  >
                    Reset demo
                  </button>
                </div>
              )}
            </div>
          </div>

          {navItems.length > 0 && (
            <nav style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {navItems.map((item) => {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    style={{
                      padding: '0.45rem 0.95rem',
                      borderRadius: 999,
                      textDecoration: 'none',
                      color: currentTheme.colors.secondary,
                      background: active ? 'rgba(255,255,255,0.22)' : 'transparent',
                      border: active ? '1px solid rgba(255,255,255,0.45)' : '1px solid rgba(255,255,255,0.18)',
                      fontSize: '0.88rem',
                      fontWeight: 500,
                    }}
                  >
                    {item.emoji ? `${item.emoji} ` : ''}{item.label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </header>

      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.5rem' }}>
        {children}
      </main>

      <footer
        style={{
          backgroundColor: currentTheme.colors.primary,
          color: currentTheme.colors.secondary,
          padding: '1.5rem',
          marginTop: '3rem',
          transition: 'background-color 300ms ease',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>
            © 2026 The Great Indian Wedding · Mock demo. Each app is a separate origin — refresh other tabs after milestones to sync the theme.
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {APP_LINKS.map((app) => (
              <a
                key={app.key}
                href={app.url}
                target={app.key === appKey ? '_self' : '_blank'}
                rel="noreferrer"
                style={{
                  color: currentTheme.colors.secondary,
                  padding: '0.4rem 0.75rem',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  border: app.key === appKey ? '1px solid rgba(255,255,255,0.55)' : '1px solid rgba(255,255,255,0.2)',
                  background: app.key === appKey ? 'rgba(255,255,255,0.2)' : 'transparent',
                }}
              >
                {app.emoji} {app.name}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};
