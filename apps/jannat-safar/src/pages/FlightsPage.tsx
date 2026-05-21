import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Section, Grid, Badge, EmptyState } from '@great-indian-wedding/ui'
import { mockApi } from '@great-indian-wedding/mock-backend'
import type { MockCouple } from '@great-indian-wedding/mock-backend'

interface Props {
  couple: MockCouple
  onChange: () => void
}

export const FlightsPage: React.FC<Props> = ({ couple, onChange }) => {
  const navigate = useNavigate()
  const honeymoon = useMemo(() => mockApi.getHoneymoon(couple.id), [couple.id])
  const flights = useMemo(() => (honeymoon ? mockApi.listFlights(honeymoon.destinationId) : []), [honeymoon])
  const [version, setVersion] = useState(0)
  const bookings = useMemo(() => mockApi.getHoneymoonBookings(couple.id), [couple.id, version])
  const bookedRefs = new Set(bookings.filter((b) => b.type === 'flight').map((b) => b.reference.split('-')[0]))

  if (!honeymoon) {
    return (
      <EmptyState
        emoji="🌍"
        title="Pick a destination first"
        description="The flight catalogue is keyed by destination."
        action={<Button variant="primary" onClick={() => navigate('/destinations')}>Browse destinations</Button>}
      />
    )
  }

  const handleBook = (flightId: string) => {
    mockApi.bookHoneymoonFlight(couple.id, flightId)
    setVersion((v) => v + 1)
    onChange()
  }

  return (
    <div>
      <Section
        title={`Flights to ${honeymoon.destinationName}`}
        subtitle="Booking your first flight or hotel auto-advances you to the Honeymooning stage."
      >
        <Grid min={320}>
          {flights.map((flight) => {
            const alreadyBooked = bookedRefs.has(flight.flightNumber)
            return (
              <Card key={flight.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{flight.airline}</div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.55)' }}>{flight.flightNumber}</div>
                  </div>
                  <Badge tone={flight.class === 'business' ? 'positive' : 'neutral'}>{flight.class}</Badge>
                </div>
                <div style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                  {flight.from} → {flight.to}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(0,0,0,0.6)', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <Badge tone="info">Departs {flight.departureTime}</Badge>
                  <Badge tone="info">{Math.floor(flight.durationMinutes / 60)}h {flight.durationMinutes % 60}m</Badge>
                  <Badge tone={flight.stops === 0 ? 'positive' : 'warning'}>
                    {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop`}
                  </Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(0,0,0,0.5)' }}>Per person</div>
                    <div style={{ fontWeight: 700 }}>₹{flight.price.toLocaleString('en-IN')}</div>
                  </div>
                  {alreadyBooked ? (
                    <Badge tone="positive">Booked</Badge>
                  ) : (
                    <Button variant="primary" onClick={() => handleBook(flight.id)}>
                      Book for both →
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </Grid>
      </Section>

      {bookings.filter((b) => b.type === 'flight').length > 0 && (
        <Section title="Your flight bookings">
          <Grid min={300}>
            {bookings.filter((b) => b.type === 'flight').map((b) => (
              <Card key={b.id} accent>
                <Badge tone="positive">Confirmed · {b.reference}</Badge>
                <div style={{ fontWeight: 600, marginTop: '0.5rem' }}>{b.description}</div>
                <div style={{ marginTop: '0.25rem', fontSize: '0.85rem', color: 'rgba(0,0,0,0.6)' }}>
                  ₹{b.totalCost.toLocaleString('en-IN')} total
                </div>
              </Card>
            ))}
          </Grid>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Button variant="primary" size="lg" onClick={() => navigate('/hotels')}>
              Pick a hotel →
            </Button>
          </div>
        </Section>
      )}
    </div>
  )
}
