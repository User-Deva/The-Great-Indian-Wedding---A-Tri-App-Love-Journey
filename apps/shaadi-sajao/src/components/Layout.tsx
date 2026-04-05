import React from 'react';
import { useThemeStore } from '@great-indian-wedding/theme-engine';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, subtitle }) => {
  const { currentTheme } = useThemeStore();

  return (
    <div
      style={{
        backgroundColor: currentTheme.colors.secondary,
        color: currentTheme.colors.primary,
        minHeight: '100vh',
        transition: 'all 300ms ease-in-out',
      }}
    >
      <header
        style={{
          backgroundColor: currentTheme.colors.primary,
          color: currentTheme.colors.secondary,
          padding: '1.5rem 2rem',
          boxShadow: `0 4px 12px rgba(0,0,0,0.1)`,
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>
            💍 {title || 'Shaadi Sajao'}
          </h1>
          {subtitle && (
            <p style={{ margin: '0.5rem 0 0', opacity: 0.95, fontSize: '0.95rem' }}>
              {subtitle}
            </p>
          )}
          <p style={{ margin: '0.25rem 0 0', opacity: 0.85, fontSize: '0.85rem' }}>
            {currentTheme.name} ✨ — {currentTheme.vibe}
          </p>
        </div>
      </header>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {children}
      </main>

      <footer
        style={{
          backgroundColor: currentTheme.colors.primary,
          color: currentTheme.colors.secondary,
          padding: '2rem',
          textAlign: 'center',
          marginTop: '3rem',
          opacity: 0.85,
        }}
      >
        <p style={{ margin: '0 0 0.5rem' }}>
          &copy; 2026 Varmala — Your Wedding, Our Excellence
        </p>
        <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.8 }}>
          Trusted by 10,000+ couples across India 🪷
        </p>
      </footer>
    </div>
  );
};
