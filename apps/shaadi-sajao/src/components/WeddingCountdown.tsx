import React, { useMemo } from 'react';
import { Wedding } from '../types';

interface WeddingCountdownProps {
  wedding: Wedding | null;
}

export const WeddingCountdown: React.FC<WeddingCountdownProps> = ({ wedding }) => {
  const timeRemaining = useMemo(() => {
    if (!wedding) return null;

    const now = new Date();
    const weddingDate = new Date(wedding.weddingDate);
    const diffMs = weddingDate.getTime() - now.getTime();

    if (diffMs < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isPast: false };
  }, [wedding]);

  if (!wedding || !timeRemaining) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: '#fff9c4',
        border: '2px solid #fbc02d',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem',
        textAlign: 'center',
      }}
    >
      <h2 style={{ margin: '0 0 1rem', fontSize: '1.5rem' }}>
        ⏰ Your Big Day is Coming!
      </h2>

      {timeRemaining.isPast ? (
        <div>
          <p style={{ fontSize: '1.2rem', margin: 0, color: '#c62828' }}>
            🎉 Your wedding has already happened!
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '1rem',
              borderRadius: '8px',
              border: '2px solid #fbc02d',
            }}
          >
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f57f17' }}>
              {timeRemaining.days}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>Days</div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '1rem',
              borderRadius: '8px',
              border: '2px solid #fbc02d',
            }}
          >
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f57f17' }}>
              {timeRemaining.hours}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>Hours</div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '1rem',
              borderRadius: '8px',
              border: '2px solid #fbc02d',
            }}
          >
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f57f17' }}>
              {timeRemaining.minutes}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>Minutes</div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '1rem',
              borderRadius: '8px',
              border: '2px solid #fbc02d',
            }}
          >
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f57f17' }}>
              {timeRemaining.seconds}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>Seconds</div>
          </div>
        </div>
      )}

      <p style={{ margin: '1rem 0 0', color: '#666', fontSize: '0.9rem' }}>
        📍 {wedding.weddingVenue} | 🎂 {wedding.weddingDate.toLocaleDateString()}
      </p>
    </div>
  );
};
