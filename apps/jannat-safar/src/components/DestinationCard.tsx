import React from 'react';
import { DestinationCard as DestinationCardType } from '../types';

interface DestinationCardProps {
  destination: DestinationCardType;
  onSelect: () => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onSelect }) => {
  const getArchetypeColor = (archetype: string): string => {
    const colors: Record<string, string> = {
      'Beach Lovers': '#00BCD4',
      'Mountain Romantics': '#8D6E63',
      'Culture Explorers': '#FF6F00',
      'Adventure Seekers': '#D32F2F',
      'Luxury Loungers': '#FFD700',
      'Budget Smart': '#4CAF50',
    };
    return colors[archetype] || '#2196F3';
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'transform 200ms, box-shadow 200ms',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
    >
      {/* Image placeholder */}
      <div
        style={{
          backgroundColor: getArchetypeColor(destination.archetype),
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '3rem',
        }}
      >
        🌍
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem' }}>
              {destination.name}
            </h4>
            <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>
              {destination.country}
            </p>
          </div>
          <span
            style={{
              backgroundColor: getArchetypeColor(destination.archetype),
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
            }}
          >
            {destination.archetype}
          </span>
        </div>

        <p style={{ color: '#666', margin: '0.75rem 0', fontSize: '0.9rem' }}>
          {destination.whyPerfect}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem', fontSize: '0.85rem' }}>
          <div>
            <p style={{ margin: 0, color: '#999' }}>Best Time</p>
            <p style={{ margin: '0.25rem 0 0', fontWeight: 'bold' }}>{destination.bestTimeToVisit}</p>
          </div>
          <div>
            <p style={{ margin: 0, color: '#999' }}>Budget</p>
            <p style={{ margin: '0.25rem 0 0', fontWeight: 'bold' }}>
              ₹{(destination.estimatedBudget.min / 100000).toFixed(1)}L - {(destination.estimatedBudget.max / 100000).toFixed(1)}L
            </p>
          </div>
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', backgroundColor: '#f0f0f0', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
            {destination.visaRequirement === 'none' ? '✓ No Visa' : `${destination.visaRequirement}`}
          </span>
          <span style={{ fontSize: '0.75rem', backgroundColor: '#f0f0f0', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
            {destination.nights || Math.ceil((destination.estimatedBudget.min / 150000) * 5)} days
          </span>
        </div>

        <button
          onClick={onSelect}
          style={{
            width: '100%',
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: getArchetypeColor(destination.archetype),
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.9rem',
          }}
        >
          Explore More
        </button>
      </div>
    </div>
  );
};
