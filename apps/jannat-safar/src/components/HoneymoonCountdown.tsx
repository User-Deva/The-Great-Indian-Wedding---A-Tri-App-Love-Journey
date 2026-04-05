import React, { useMemo } from 'react';
import { Honeymoon } from '../types';

interface HoneymoonCountdownProps {
  honeymoon: Honeymoon | null;
}

export const HoneymoonCountdown: React.FC<HoneymoonCountdownProps> = ({ honeymoon }) => {
  const timeRemaining = useMemo(() => {
    if (!honeymoon) return null;

    const now = new Date();
    const startDate = new Date(honeymoon.startDate);
    const diffMs = startDate.getTime() - now.getTime();

    if (diffMs < 0) {
      return { days: 0, hours: 0, minutes: 0, isPast: true };
    }

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes, isPast: false };
  }, [honeymoon]);

  if (!honeymoon || !timeRemaining) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: '#E0F7FA',
        border: '2px solid #00BCD4',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem',
        textAlign: 'center',
      }}
    >
      <h2 style={{ margin: '0 0 1rem', fontSize: '1.5rem' }}>
        ✈️ Your Paradise Awaits!
      </h2>

      {timeRemaining.isPast ? (
        <div>
          <p style={{ fontSize: '1.2rem', margin: 0, color: '#00695C' }}>
            🎉 Your honeymoon adventure is happening now!
          </p>
        </div>
      ) : (
        <div>
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
                border: '2px solid #00BCD4',
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00695C' }}>
                {timeRemaining.days}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Days</div>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '1rem',
                borderRadius: '8px',
                border: '2px solid #00BCD4',
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00695C' }}>
                {timeRemaining.hours}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Hours</div>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '1rem',
                borderRadius: '8px',
                border: '2px solid #00BCD4',
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00695C' }}>
                {timeRemaining.minutes}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Minutes</div>
            </div>
          </div>

          <p style={{ margin: '1rem 0 0', color: '#666', fontSize: '0.9rem' }}>
            📍 {honeymoon.destination} | {honeymoon.nights} nights |
            ₹{honeymoon.budgetTotal.toLocaleString('en-IN')}
          </p>
        </div>
      )}
    </div>
  );
};
