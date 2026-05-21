import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { JourneyStage, useThemeStore } from '@great-indian-wedding/theme-engine'
import { Button, Card, Section, Grid, Badge, EmptyState } from '@great-indian-wedding/ui'
import { mockApi } from '@great-indian-wedding/mock-backend'
import type { MockUser, MockCouple, MockDateVenue } from '@great-indian-wedding/mock-backend'

interface Props {
  user: MockUser
  couple: MockCouple
  onChange: () => void
}

const VENUE_EMOJIS: Record<string, string> = {
  cafe: '☕',
  garden: '🌿',
  restaurant: '🍽️',
  heritage: '🏛️',
  cultural: '🎨',
}

function defaultScheduledDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + 5)
  d.setHours(19, 0, 0, 0)
  return d.toISOString().slice(0, 16)
}

export const DatesPage: React.FC<Props> = ({ user, couple, onChange }) => {
  const { currentTheme } = useThemeStore()
  const navigate = useNavigate()
  const [version, setVersion] = useState(0)
  const profile = useMemo(() => mockApi.getProfile(user.id), [user.id])
  const scheduled = useMemo(() => mockApi.getScheduledDate(couple.id), [couple.id, version])
  const venues = useMemo(() => mockApi.listVenues(profile?.city), [profile?.city])
  const [pickedVenueId, setPickedVenueId] = useState<string | null>(null)
  const [scheduledFor, setScheduledFor] = useState<string>(defaultScheduledDate())
  const [rating, setRating] = useState(5)
  const [notes, setNotes] = useState('')

  const stage = couple.journeyStage as JourneyStage
  const isReady = stage === JourneyStage.MATCHED || stage === JourneyStage.DATE_SET || stage === JourneyStage.DATING

  if (!isReady) {
    return (
      <EmptyState
        emoji="💞"
        title="You need a mutual match first"
        description="Go to Matches and express interest in someone before planning the first date."
        action={<Button variant="primary" onClick={() => navigate('/matches')}>Browse matches →</Button>}
      />
    )
  }

  const handleSchedule = () => {
    if (!pickedVenueId) return
    mockApi.scheduleDate(couple.id, pickedVenueId, new Date(scheduledFor).toISOString())
    setVersion((v) => v + 1)
    onChange()
    setPickedVenueId(null)
  }

  const handleRate = () => {
    mockApi.rateDate(couple.id, rating, notes)
    setVersion((v) => v + 1)
    onChange()
    if (rating >= 4) {
      setTimeout(() => {
        window.open('http://localhost:3002/', '_blank')
      }, 800)
    }
  }

  return (
    <div>
      {scheduled ? (
        <Section
          title={`First date · ${scheduled.venue.name}`}
          subtitle={`📍 ${scheduled.venue.address} · 🗓 ${new Date(scheduled.scheduledFor).toLocaleString('en-IN')}`}
        >
          <Card accent>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Badge tone="info">{VENUE_EMOJIS[scheduled.venue.type] ?? '📍'} {scheduled.venue.type}</Badge>
                  <Badge tone="positive">Dress code · {scheduled.venue.dressCode}</Badge>
                  <Badge tone="neutral">Approx ₹{scheduled.venue.budgetEstimate}</Badge>
                </div>
                <h4 style={{ margin: '0.25rem 0 0.5rem' }}>Conversation starters for the night</h4>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'rgba(0,0,0,0.75)' }}>
                  {scheduled.venue.conversationStarters.map((c) => (
                    <li key={c} style={{ margin: '0.3rem 0' }}>{c}</li>
                  ))}
                </ul>
              </div>

              <div style={{ width: 320, maxWidth: '100%' }}>
                <h4 style={{ margin: '0 0 0.5rem' }}>{scheduled.completed ? 'Date complete' : 'Rate the date'}</h4>
                {scheduled.completed ? (
                  <div>
                    <Badge tone={scheduled.rating && scheduled.rating >= 4 ? 'positive' : 'warning'}>
                      You rated {scheduled.rating}/5
                    </Badge>
                    {scheduled.notes && (
                      <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'rgba(0,0,0,0.65)' }}>
                        "{scheduled.notes}"
                      </p>
                    )}
                    {scheduled.rating && scheduled.rating >= 4 ? (
                      <Button variant="primary" fullWidth onClick={() => window.open('http://localhost:3002/', '_blank')}>
                        💍 Continue in Shaadi Sajao
                      </Button>
                    ) : (
                      <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'rgba(0,0,0,0.7)' }}>
                        Below 4 stars — try a new venue below.
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', color: 'rgba(0,0,0,0.6)' }}>
                      A rating of 4+ advances you to the Dating stage.
                    </p>
                    <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.5rem' }}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          onClick={() => setRating(n)}
                          style={{
                            background: n <= rating ? currentTheme.colors.primary : 'transparent',
                            color: n <= rating ? currentTheme.colors.secondary : 'rgba(0,0,0,0.5)',
                            border: `1px solid ${currentTheme.colors.primary}`,
                            borderRadius: 8,
                            padding: '0.4rem 0.6rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {n}★
                        </button>
                      ))}
                    </div>
                    <textarea
                      placeholder="Any notes for Our Story?"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '0.55rem',
                        borderRadius: 8,
                        border: '1px solid rgba(0,0,0,0.12)',
                        marginBottom: '0.5rem',
                        fontFamily: 'inherit',
                        fontSize: '0.9rem',
                      }}
                    />
                    <Button variant="primary" fullWidth onClick={handleRate}>Save rating</Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </Section>
      ) : (
        <Section
          title="Pick a venue for your first date"
          subtitle={`Curated for ${profile?.city ?? 'your city'}. Pick one, set a time, lock it in.`}
        >
          <Grid min={300}>
            {venues.map((venue) => (
              <Card key={venue.id} accent={pickedVenueId === venue.id} onClick={() => setPickedVenueId(venue.id)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '1.8rem' }}>{VENUE_EMOJIS[venue.type] ?? '📍'}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{venue.name}</div>
                    <div style={{ fontSize: '0.82rem', color: 'rgba(0,0,0,0.55)' }}>{venue.address}</div>
                  </div>
                  {pickedVenueId === venue.id && <Badge tone="positive">Selected</Badge>}
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <Badge tone="neutral">~₹{venue.budgetEstimate}</Badge>
                  <Badge tone="info">{venue.dressCode}</Badge>
                </div>
                <details style={{ marginTop: '0.5rem' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
                    Conversation starters
                  </summary>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem', color: 'rgba(0,0,0,0.7)', fontSize: '0.88rem' }}>
                    {venue.conversationStarters.slice(0, 3).map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </details>
              </Card>
            ))}
          </Grid>

          {pickedVenueId && (
            <Card accent style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.6)' }}>
                    When?
                    <input
                      type="datetime-local"
                      value={scheduledFor}
                      onChange={(e) => setScheduledFor(e.target.value)}
                      style={{
                        display: 'block',
                        padding: '0.55rem',
                        borderRadius: 10,
                        border: '1px solid rgba(0,0,0,0.12)',
                        marginTop: 4,
                        fontFamily: 'inherit',
                      }}
                    />
                  </label>
                </div>
                <Button variant="primary" size="lg" onClick={handleSchedule}>
                  Lock the date →
                </Button>
              </div>
            </Card>
          )}
        </Section>
      )}
    </div>
  )
}
