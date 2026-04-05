import React, { useState } from 'react';
import { DateVenue } from '../types';

interface DateVenueCardProps {
  venue: DateVenue;
  onSchedule: (venue: DateVenue) => void;
}

export const DateVenueCard: React.FC<DateVenueCardProps> = ({ venue, onSchedule }) => {
  const [showStarters, setShowStarters] = useState(false);

  const typeEmojis: Record<string, string> = {
    cafe: '☕',
    heritage: '🏛️',
    restaurant: '🍽️',
    garden: '🌿',
    cultural: '🎨',
  };

  return (
    <div
      style={{
        border: '2px solid #ddd',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        backgroundColor: '#f9f9f9',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem' }}>
            {typeEmojis[venue.type] || '📍'} {venue.name}
          </h4>
          <p style={{ color: '#666', margin: '0.25rem 0', fontSize: '0.9rem' }}>
            📍 {venue.address}
          </p>
          <p style={{ color: '#666', margin: '0.25rem 0', fontSize: '0.9rem' }}>
            💰 Budget: ₹{venue.budgetEstimate}
          </p>
          <p style={{ color: '#666', margin: '0.25rem 0', fontSize: '0.9rem' }}>
            👕 {venue.dressCode}
          </p>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={() => setShowStarters(!showStarters)}
          style={{
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            marginRight: '0.5rem',
            fontSize: '0.9rem',
          }}
        >
          {showStarters ? '✓ Hide' : 'Show'} Conversation Starters
        </button>

        <button
          onClick={() => onSchedule(venue)}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 'bold',
          }}
        >
          📅 Schedule Date
        </button>
      </div>

      {showStarters && (
        <div style={{ marginTop: '1rem', backgroundColor: '#e3f2fd', padding: '1rem', borderRadius: '8px' }}>
          <h5 style={{ margin: '0 0 0.5rem' }}>💬 Conversation Starters:</h5>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
            {venue.conversationStarters.map((starter, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem', color: '#333' }}>
                {starter}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
