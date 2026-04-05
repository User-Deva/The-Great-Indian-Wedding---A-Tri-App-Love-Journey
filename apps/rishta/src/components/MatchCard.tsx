import React from 'react';
import { Match } from '../types';
import { getCompatibilityMessage } from '../utils/kismatEngine';

interface MatchCardProps {
  match: Match;
  onInterest: () => void;
  onReject: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onInterest, onReject }) => {
  const compatibilityColor =
    match.compatibilityScore >= 85
      ? '#4CAF50'
      : match.compatibilityScore >= 65
      ? '#2196F3'
      : '#FF9800';

  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 200ms',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>Match with {match.user2Id}</h3>
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: compatibilityColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          {match.compatibilityScore}%
        </div>
      </div>

      <p style={{ color: '#666', margin: '0.5rem 0' }}>
        {getCompatibilityMessage(match.compatibilityScore)}
      </p>

      {match.gunaMilanScore !== undefined && (
        <p style={{ color: '#999', fontSize: '0.9rem', margin: '0.5rem 0' }}>
          Guna Milan: {match.gunaMilanScore}/36
        </p>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <button
          onClick={onInterest}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          ❤️ Interested
        </button>
        <button
          onClick={onReject}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          👋 Pass
        </button>
      </div>
    </div>
  );
};
