import React from 'react';
import { Vendor } from '../types';

interface VendorCardProps {
  vendor: Vendor;
  onBook: () => void;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor, onBook }) => {
  const getRatingColor = (rating: number): string => {
    if (rating >= 4.7) return '#4caf50';
    if (rating >= 4.0) return '#2196f3';
    return '#ff9800';
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: vendor.varmalVerified ? '2px solid #4caf50' : '1px solid #ddd',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>
            {vendor.name}
            {vendor.varmalVerified && '  ✓'}
          </h4>

          <p style={{ color: '#666', margin: '0.25rem 0', fontSize: '0.9rem' }}>
            📍 {vendor.city} | {vendor.category}
          </p>

          {vendor.description && (
            <p style={{ color: '#777', margin: '0.5rem 0', fontSize: '0.85rem' }}>
              {vendor.description}
            </p>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            {vendor.contactEmail && (
              <a
                href={`mailto:${vendor.contactEmail}`}
                style={{
                  color: '#2196f3',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                }}
              >
                📧 Email
              </a>
            )}
            {vendor.contactPhone && (
              <a
                href={`tel:${vendor.contactPhone}`}
                style={{
                  color: '#2196f3',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                }}
              >
                📞 Call
              </a>
            )}
            {vendor.portfolioUrl && (
              <a
                href={vendor.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#2196f3',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                }}
              >
                🎨 Portfolio
              </a>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'right', marginLeft: '1rem' }}>
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: getRatingColor(vendor.rating),
              marginBottom: '0.25rem',
            }}
          >
            {vendor.rating}★
          </div>
          <p style={{ color: '#999', margin: '0', fontSize: '0.8rem' }}>
            {vendor.reviewCount} reviews
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <p style={{ margin: '0', color: '#666', fontSize: '0.85rem' }}>Price Range</p>
          <p style={{ margin: '0.25rem 0 0', fontSize: '1rem', fontWeight: 'bold' }}>
            {vendor.priceRange}
          </p>
        </div>

        <button
          onClick={onBook}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.9rem',
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};
