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
  const wedding = useMemo(() => mockApi.getWedding(couple.id), [couple.id])
  const bookings = useMemo(() => mockApi.getVendorBookings(couple.id), [couple.id])
  const timeline = useMemo(() => mockApi.getTimeline(couple.id), [couple.id, couple.journeyStage])
  const countdown = useCountdown(wedding?.weddingDate)
  const stage = couple.journeyStage as JourneyStage

  const totalBudget = wedding?.budgetTotal ?? 0
  const spent = bookings.reduce((sum, b) => sum + (b.depositPaid ? b.depositAmount : 0), 0)
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length

  const isLocked = stage === JourneyStage.SEEKING || stage === JourneyStage.MATCHED || stage === JourneyStage.DATE_SET
  if (isLocked) {
    return (
      <EmptyState
        emoji="🍵"
        title="Shaadi Sajao unlocks after you finish dating"
        description="Head back to Rishta, lock a first date, and rate it 4+ stars. Shaadi opens at the Dating stage."
        action={<Button variant="primary" onClick={() => window.open('http://localhost:3001/', '_self')}>Open Rishta →</Button>}
      />
    )
  }

  return (
    <div>
      <Section
        title="Welcome to wedding mode"
        subtitle={`Logged in as ${user.email}. ${couple.coupleName} is officially planning.`}
      >
        <Card accent>
          {wedding ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <Badge tone="info">{wedding.packageType}</Badge>
                <h3 style={{ margin: '0.5rem 0 0.25rem' }}>{wedding.weddingVenue}</h3>
                <div style={{ fontSize: '0.95rem', color: 'rgba(0,0,0,0.7)' }}>
                  {new Date(wedding.weddingDate).toLocaleDateString('en-IN', { dateStyle: 'full' })} · {wedding.guestCount} guests
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
                <h3 style={{ margin: '0 0 0.25rem' }}>Set the date.</h3>
                <p style={{ margin: 0, color: 'rgba(0,0,0,0.6)' }}>Wedding day, venue, package, and budget — five minutes to lock it in.</p>
              </div>
              <Link to="/setup"><Button variant="primary" size="lg">Start wedding setup →</Button></Link>
            </div>
          )}
        </Card>
      </Section>

      <Section title="At a glance">
        <Grid min={200}>
          <Card>
            <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.55)' }}>Total budget</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: currentTheme.colors.primary }}>
              ₹{totalBudget.toLocaleString('en-IN')}
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.55)' }}>Deposits paid</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: currentTheme.colors.primary }}>
              ₹{spent.toLocaleString('en-IN')}
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.55)' }}>Vendors booked</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: currentTheme.colors.primary }}>{confirmedCount}</div>
          </Card>
          <Card>
            <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.55)' }}>Stage</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: currentTheme.colors.primary }}>{stage.replace('_', ' ')}</div>
          </Card>
        </Grid>
      </Section>

      <Section title="Quick jump">
        <Grid min={260}>
          <ActionCard to="/setup" emoji="🎊" title="Wedding setup" description="Date, venue, religion, package, total budget." />
          <ActionCard to="/vendors" emoji="💼" title="Vendor directory" description="Browse Varmala-vetted decorators, caterers, photographers and book with a deposit." />
          <ActionCard to="/budget" emoji="💰" title="Budget tracker" description="See category-wise allocation, deposits paid, remaining headroom." />
          <ActionCard to="/story" emoji="📖" title="Our story" description="Every milestone the journey has written so far." />
        </Grid>
      </Section>

      <Section title="Recent milestones" actions={<Link to="/story" style={{ color: currentTheme.colors.primary, textDecoration: 'none', fontWeight: 600 }}>View all →</Link>}>
        <StoryTimeline events={timeline.slice(-3)} compact />
      </Section>
    </div>
  )
}

const ActionCard: React.FC<{ to: string; emoji: string; title: string; description: string }> = ({ to, emoji, title, description }) => (
  <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
    <Card>
      <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{emoji}</div>
      <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{title}</div>
      <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(0,0,0,0.65)' }}>{description}</p>
    </Card>
  </Link>
)

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
