import React from 'react';
import { TimelineEvent, MILESTONE_EMOJIS } from '@great-indian-wedding/our-story';

interface TimelineComponentProps {
  events: TimelineEvent[];
  isCompact?: boolean;
  themeColors?: {
    primary: string;
    secondary: string;
  };
}

export const TimelineComponent: React.FC<TimelineComponentProps> = ({
  events,
  isCompact = false,
  themeColors = { primary: '#000', secondary: '#fff' },
}) => {
  const sortedEvents = [...events].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  return (
    <div style={{ position: 'relative', padding: isCompact ? '1rem' : '2rem' }}>
      <h3 style={{ marginTop: 0, textAlign: 'center', marginBottom: '2rem' }}>
        ✨ Our Love Story
      </h3>

      {/* Timeline container */}
      <div style={{ position: 'relative' }}>
        {/* Vertical line */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 0,
            bottom: 0,
            width: '3px',
            backgroundColor: themeColors.primary,
            opacity: 0.3,
          }}
        />

        {/* Timeline events */}
        {sortedEvents.map((event, index) => (
          <div
            key={event.id}
            style={{
              marginBottom: '2rem',
              display: 'flex',
              flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
              alignItems: 'flex-start',
              gap: '2rem',
            }}
          >
            {/* Content side */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  backgroundColor: '#f9f9f9',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: `2px solid ${themeColors.primary}`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '0.5rem',
                  }}
                >
                  <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem' }}>
                    {event.title}
                  </h4>
                  <span style={{ fontSize: '1.5rem' }}>{event.emoji}</span>
                </div>

                <p style={{ color: '#666', margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
                  {event.description}
                </p>

                {event.location && (
                  <p style={{ color: '#999', margin: '0.5rem 0 0', fontSize: '0.85rem' }}>
                    📍 {event.location}
                  </p>
                )}

                <p style={{ color: '#bbb', margin: '0.75rem 0 0', fontSize: '0.8rem' }}>
                  {event.timestamp.toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* Center dot */}
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: themeColors.primary,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: themeColors.secondary,
                fontWeight: 'bold',
                fontSize: '1.2rem',
                flexShrink: 0,
                zIndex: 1,
                border: `3px solid ${themeColors.secondary}`,
              }}
            >
              {event.emoji}
            </div>

            {/* Invisible spacer for alignment */}
            <div style={{ flex: 1 }} />
          </div>
        ))}
      </div>

      {sortedEvents.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
          <p>Your love story timeline will appear here as you reach milestones.</p>
          <p style={{ fontSize: '3rem', margin: '1rem 0 0' }}>💕</p>
        </div>
      )}
    </div>
  );
};
