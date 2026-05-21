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
    fontFamily: 'var(--font-body)',
    borderRadius: 'var(--radius-button)',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'transform var(--dur-press) var(--ease), box-shadow var(--dur-press) var(--ease), opacity var(--dur-press) var(--ease)',
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
      boxShadow: 'var(--shadow-button)',
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
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        border: accent ? `2px solid ${currentTheme.colors.primary}` : '1px solid var(--line-1)',
        padding: padded ? '1.5rem' : 0,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform var(--dur-hover) var(--ease), box-shadow var(--dur-hover) var(--ease)',
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
              <h2 style={{ margin: 0, fontSize: 'var(--fs-h3)', color: currentTheme.colors.primary, fontFamily: 'var(--font-display)', fontWeight: 600 }}>{title}</h2>
            )}
            {subtitle && (
              <p style={{ margin: '0.25rem 0 0', color: 'var(--ink-3)', fontSize: 'var(--fs-body)' }}>{subtitle}</p>
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
    neutral: { bg: 'var(--tone-neutral-bg)', fg: 'var(--tone-neutral-fg)' },
    positive: { bg: 'var(--tone-positive-bg)', fg: 'var(--tone-positive-fg)' },
    warning: { bg: 'var(--tone-warning-bg)', fg: 'var(--tone-warning-fg)' },
    danger: { bg: 'var(--tone-danger-bg)', fg: 'var(--tone-danger-fg)' },
    info: { bg: 'var(--tone-info-bg)', fg: 'var(--tone-info-fg)' },
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
      borderRadius: 'var(--radius-card)',
      border: '1px dashed var(--line-3)',
    }}
  >
    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{emoji}</div>
    <h3 style={{ margin: '0 0 0.5rem', fontSize: 'var(--fs-h4)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>{title}</h3>
    {description && (
      <p style={{ margin: 0, color: 'var(--ink-3)', fontSize: 'var(--fs-body)' }}>{description}</p>
    )}
    {action && <div style={{ marginTop: '1.25rem' }}>{action}</div>}
  </div>
);
