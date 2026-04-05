import React from 'react';
import { useThemeStore } from '@great-indian-wedding/theme-engine';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
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
          padding: '1rem 2rem',
          boxShadow: `0 4px 12px rgba(0,0,0,0.1)`,
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {title && (
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
              {title}
            </h1>
          )}
          <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>
            {currentTheme.name} 🌸
          </p>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {children}
      </main>

      <footer
        style={{
          backgroundColor: currentTheme.colors.primary,
          color: currentTheme.colors.secondary,
          padding: '2rem',
          textAlign: 'center',
          marginTop: '3rem',
          opacity: 0.8,
        }}
      >
        <p>&copy; 2026 The Great Indian Wedding. Where destinies meet. 🪷</p>
      </footer>
    </div>
  );
};
