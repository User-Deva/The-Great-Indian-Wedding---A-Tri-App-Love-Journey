import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { JourneyStage, useThemeStore } from '@great-indian-wedding/theme-engine'
import { Button, Card, Section, Grid, Badge, EmptyState, StoryTimeline } from '@great-indian-wedding/ui'
import { mockApi } from '@great-indian-wedding/mock-backend'
import type { MockUser, MockCouple } from '@great-indian-wedding/mock-backend'

interface Props {
  user: MockUser
  couple: MockCouple
  onChange: () => void
}

function useCountdown(target: string | undefined) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    if (!target) return
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [target])
  if (!target) return null
  const diff = new Date(target).getTime() - now
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, isPast: true }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    isPast: false,
  }
}

export const DashboardPage: React.FC<Props> = ({ user, couple }) => {
  const { currentTheme } = useThemeStore()
  const honeymoon = useMemo(() => mockApi.getHoneymoon(couple.id), [couple.id])
  const bookings = useMemo(() => mockApi.getHoneymoonBookings(couple.id), [couple.id])
  const timeline = useMemo(() => mockApi.getTimeline(couple.id), [couple.id, couple.journeyStage])
  const countdown = useCountdown(honeymoon?.startDate)
  const stage = couple.journeyStage as JourneyStage

  const lockedStages: JourneyStage[] = [JourneyStage.SEEKING, JourneyStage.MATCHED, JourneyStage.DATE_SET]
  if (lockedStages.includes(stage)) {
    return (
      <EmptyState
        emoji="🛬"
        title="Honeymoon planning unlocks at the Dating stage"
        description="Finish a 4+ star first date in Rishta. Then you can dream destinations."
        action={<Button variant="primary" onClick={() => window.open('http://localhost:3001/', '_self')}>Open Rishta</Button>}
      />
    )
  }

  return (
    <div>
      <Section
        title="Paradise plans"
        subtitle={`Signed in as ${user.email}. ${couple.coupleName} · ${stage.replace('_', ' ')} stage.`}
      >
        <Card accent>
          {honeymoon ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <Badge tone="info">{honeymoon.nights} nights</Badge>
                <h3 style={{ margin: '0.5rem 0 0.25rem' }}>{honeymoon.destinationName}</h3>
                <div style={{ fontSize: '0.92rem', color: 'rgba(0,0,0,0.65)' }}>
                  {new Date(honeymoon.startDate).toLocaleDateString('en-IN', { dateStyle: 'medium' })} →{' '}
                  {new Date(honeymoon.endDate).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                </div>
                <div style={{ marginTop: '0.25rem', fontSize: '0.92rem', color: 'rgba(0,0,0,0.65)' }}>
                  Budget: ₹{honeymoon.budgetTotal.toLocaleString('en-IN')}
                </div>
              </div>
              {countdown && !countdown.isPast && (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <CountBox label="days" value={countdown.days} theme={currentTheme} />
                  <CountBox label="hrs" value={countdown.hours} theme={currentTheme} />
                  <CountBox label="min" value={countdown.minutes} theme={currentTheme} />
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <h3 style={{ margin: '0 0 0.25rem' }}>No destination yet.</h3>
                <p style={{ margin: 0, color: 'rgba(0,0,0,0.6)' }}>Take the quiz or pick directly from the destinations gallery.</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to="/quiz"><Button variant="secondary">Take quiz</Button></Link>
                <Link to="/destinations"><Button variant="primary" size="lg">Browse destinations →</Button></Link>
              </div>
            </div>
          )}
        </Card>
      </Section>

      <Section title="Bookings">
        {bookings.length === 0 ? (
          <EmptyState emoji="🎟️" title="No bookings yet" description="Lock in a flight and a hotel to confirm honeymoon mode." />
        ) : (
          <Grid min={280}>
            {bookings.map((b) => (
              <Card key={b.id} accent>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Badge tone="positive">{b.type === 'flight' ? '✈️ Flight' : '🏨 Hotel'}</Badge>
                  <Badge tone="info">{b.reference}</Badge>
                </div>
                <div style={{ marginTop: '0.5rem', fontWeight: 600 }}>{b.description}</div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.92rem', color: 'rgba(0,0,0,0.65)' }}>
                  Booked {new Date(b.bookedAt).toLocaleDateString('en-IN')} · ₹{b.totalCost.toLocaleString('en-IN')}
                </div>
              </Card>
            ))}
          </Grid>
        )}
      </Section>

      <Section title="Recent milestones" actions={<Link to="/story" style={{ color: currentTheme.colors.primary, textDecoration: 'none', fontWeight: 600 }}>View all →</Link>}>
        <StoryTimeline events={timeline.slice(-3)} compact />
      </Section>
    </div>
  )
}

const CountBox: React.FC<{ label: string; value: number; theme: any }> = ({ label, value, theme }) => (
  <div
    style={{
      minWidth: 64,
      padding: '0.5rem 0.75rem',
      borderRadius: 12,
      background: theme.colors.primary,
      color: theme.colors.secondary,
      textAlign: 'center',
    }}
  >
    <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{value}</div>
    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>{label}</div>
  </div>
)
