import React, { CSSProperties, ReactNode } from 'react';
import { useThemeStore } from '@great-indian-wedding/theme-engine';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  style,
  disabled,
  ...rest
}) => {
  const { currentTheme } = useThemeStore();
  const padding = size === 'sm' ? '0.45rem 0.9rem' : size === 'lg' ? '0.95rem 1.6rem' : '0.7rem 1.25rem';
  const fontSize = size === 'sm' ? '0.85rem' : size === 'lg' ? '1.05rem' : '0.95rem';
  const baseStyle: CSSProperties = {
    padding,
    fontSize,
    fontWeight: 600,
    borderRadius: 10,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease',
    opacity: disabled ? 0.55 : 1,
    width: fullWidth ? '100%' : 'auto',
    letterSpacing: 0.2,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  };
  let variantStyle: CSSProperties = {};
  if (variant === 'primary') {
    variantStyle = {
      backgroundColor: currentTheme.colors.primary,
      color: currentTheme.colors.secondary,
      boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
    };
  } else if (variant === 'secondary') {
    variantStyle = {
      backgroundColor: 'rgba(255,255,255,0.85)',
      color: currentTheme.colors.primary,
      border: `1.5px solid ${currentTheme.colors.primary}`,
    };
  } else if (variant === 'ghost') {
    variantStyle = {
      backgroundColor: 'transparent',
      color: currentTheme.colors.primary,
    };
  } else if (variant === 'danger') {
    variantStyle = {
      backgroundColor: '#c62828',
      color: 'white',
    };
  }
  return (
    <button
      {...rest}
      disabled={disabled}
      style={{ ...baseStyle, ...variantStyle, ...style }}
      onMouseEnter={(e) => {
        if (disabled) return;
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {children}
    </button>
  );
};

interface CardProps {
  children: ReactNode;
  accent?: boolean;
  padded?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, accent = false, padded = true, style, onClick }) => {
  const { currentTheme } = useThemeStore();
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 16,
        boxShadow: '0 4px 18px rgba(0,0,0,0.06)',
        border: accent ? `2px solid ${currentTheme.colors.primary}` : '1px solid rgba(0,0,0,0.06)',
        padding: padded ? '1.5rem' : 0,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 160ms ease, box-shadow 160ms ease',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

interface SectionProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, subtitle, children, actions }) => {
  const { currentTheme } = useThemeStore();
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      {(title || actions) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '1rem',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            {title && (
              <h2 style={{ margin: 0, fontSize: '1.4rem', color: currentTheme.colors.primary }}>{title}</h2>
            )}
            {subtitle && (
              <p style={{ margin: '0.25rem 0 0', color: 'rgba(0,0,0,0.55)', fontSize: '0.92rem' }}>{subtitle}</p>
            )}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
};

interface BadgeProps {
  children: ReactNode;
  tone?: 'neutral' | 'positive' | 'warning' | 'danger' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({ children, tone = 'neutral' }) => {
  const palette: Record<string, { bg: string; fg: string }> = {
    neutral: { bg: '#eef0f5', fg: '#444' },
    positive: { bg: '#e6f4ea', fg: '#1b6e3a' },
    warning: { bg: '#fff3e0', fg: '#a35400' },
    danger: { bg: '#fdecea', fg: '#a8201a' },
    info: { bg: '#e7f0fb', fg: '#1f4f87' },
  };
  const p = palette[tone];
  return (
    <span
      style={{
        backgroundColor: p.bg,
        color: p.fg,
        padding: '0.25rem 0.65rem',
        borderRadius: 999,
        fontSize: '0.78rem',
        fontWeight: 600,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
};

interface GridProps {
  children: ReactNode;
  min?: number;
  gap?: string;
}

export const Grid: React.FC<GridProps> = ({ children, min = 280, gap = '1.25rem' }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`,
      gap,
    }}
  >
    {children}
  </div>
);

interface EmptyStateProps {
  emoji?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ emoji = '✨', title, description, action }) => (
  <div
    style={{
      textAlign: 'center',
      padding: '3rem 1.5rem',
      backgroundColor: 'rgba(255,255,255,0.6)',
      borderRadius: 16,
      border: '1px dashed rgba(0,0,0,0.15)',
    }}
  >
    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{emoji}</div>
    <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem' }}>{title}</h3>
    {description && (
      <p style={{ margin: 0, color: 'rgba(0,0,0,0.55)', fontSize: '0.95rem' }}>{description}</p>
    )}
    {action && <div style={{ marginTop: '1.25rem' }}>{action}</div>}
  </div>
);
