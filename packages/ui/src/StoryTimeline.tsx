import React from 'react';
import { useThemeStore } from '@great-indian-wedding/theme-engine';
import type { MockTimelineEvent } from '@great-indian-wedding/mock-backend';
import { EmptyState } from './primitives';

interface StoryTimelineProps {
  events: MockTimelineEvent[];
  compact?: boolean;
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({ events, compact = false }) => {
  const { currentTheme } = useThemeStore();
  const sorted = [...events].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  if (sorted.length === 0) {
    return (
      <EmptyState
        emoji="💞"
        title="Your story starts soon"
        description="Milestones from your couple's journey will appear here as you reach them."
      />
    );
  }

  return (
    <div style={{ position: 'relative', padding: compact ? '0.5rem 0' : '1rem 0' }}>
      <div
        style={{
          position: 'absolute',
          left: 22,
          top: 0,
          bottom: 0,
          width: 2,
          background: `${currentTheme.colors.primary}33`,
        }}
      />
      {sorted.map((event) => (
        <div key={event.id} style={{ position: 'relative', paddingLeft: 60, marginBottom: '1.25rem' }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 2,
              width: 46,
              height: 46,
              borderRadius: '50%',
              background: currentTheme.colors.primary,
              color: currentTheme.colors.secondary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
            }}
          >
            {event.emoji}
          </div>
          <div
            style={{
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: 12,
              padding: '0.9rem 1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
              <div style={{ fontWeight: 700, color: currentTheme.colors.primary }}>{event.title}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(0,0,0,0.5)' }}>
                {new Date(event.timestamp).toLocaleString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
            <p style={{ margin: '0.35rem 0 0', color: 'rgba(0,0,0,0.7)', fontSize: '0.92rem' }}>{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
