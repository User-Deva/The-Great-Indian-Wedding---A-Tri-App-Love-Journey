import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Section, Grid, Badge, EmptyState } from '@great-indian-wedding/ui'
import { mockApi } from '@great-indian-wedding/mock-backend'
import type { MockCouple } from '@great-indian-wedding/mock-backend'

interface Props {
  couple: MockCouple
  onChange: () => void
}

export const HotelsPage: React.FC<Props> = ({ couple, onChange }) => {
  const navigate = useNavigate()
  const honeymoon = useMemo(() => mockApi.getHoneymoon(couple.id), [couple.id])
  const hotels = useMemo(() => (honeymoon ? mockApi.listHotels(honeymoon.destinationId) : []), [honeymoon])
  const [version, setVersion] = useState(0)
  const bookings = useMemo(() => mockApi.getHoneymoonBookings(couple.id), [couple.id, version])
  const bookedHotelIds = new Set(
    bookings.filter((b) => b.type === 'hotel').map((b) => b.reference.split('-')[0].toLowerCase())
  )

  if (!honeymoon) {
    return (
      <EmptyState
        emoji="🏨"
        title="Pick a destination first"
        description="Hotels are filtered by your chosen destination."
        action={<Button variant="primary" onClick={() => navigate('/destinations')}>Browse destinations</Button>}
      />
    )
  }

  const handleBook = (hotelId: string) => {
    mockApi.bookHoneymoonHotel(couple.id, hotelId, honeymoon.nights)
    setVersion((v) => v + 1)
    onChange()
  }

  return (
    <div>
      <Section
        title={`Hotels in ${honeymoon.destinationName}`}
        subtitle={`Prices shown are per night. We assume ${honeymoon.nights} nights from your itinerary.`}
      >
        <Grid min={320}>
          {hotels.map((hotel) => {
            const alreadyBooked = bookedHotelIds.has(hotel.id.toLowerCase())
            return (
              <Card key={hotel.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '2rem' }}>{hotel.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{hotel.name}</div>
                    <div style={{ fontSize: '0.82rem', color: 'rgba(0,0,0,0.55)' }}>{hotel.city} · ⭐ {hotel.rating}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  {hotel.amenities.slice(0, 3).map((a) => (
                    <Badge key={a} tone="neutral">{a}</Badge>
                  ))}
                </div>
                <div style={{ fontSize: '0.92rem', color: 'rgba(0,0,0,0.7)', marginBottom: '0.5rem' }}>
                  💞 {hotel.romanticFeatures.join(' · ')}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(0,0,0,0.5)' }}>Per night</div>
                    <div style={{ fontWeight: 700 }}>₹{hotel.pricePerNight.toLocaleString('en-IN')}</div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(0,0,0,0.5)' }}>
                      Total ₹{(hotel.pricePerNight * honeymoon.nights).toLocaleString('en-IN')} for {honeymoon.nights} nights
                    </div>
                  </div>
                  {alreadyBooked ? (
                    <Badge tone="positive">Booked</Badge>
                  ) : (
                    <Button variant="primary" onClick={() => handleBook(hotel.id)}>
                      Book hotel →
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </Grid>
      </Section>

      {bookings.filter((b) => b.type === 'hotel').length > 0 && (
        <Section title="Your hotel bookings">
          <Grid min={300}>
            {bookings.filter((b) => b.type === 'hotel').map((b) => (
              <Card key={b.id} accent>
                <Badge tone="positive">Confirmed · {b.reference}</Badge>
                <div style={{ fontWeight: 600, marginTop: '0.5rem' }}>{b.description}</div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.6)' }}>
                  ₹{b.totalCost.toLocaleString('en-IN')} total
                </div>
              </Card>
            ))}
          </Grid>
        </Section>
      )}
    </div>
  )
}
