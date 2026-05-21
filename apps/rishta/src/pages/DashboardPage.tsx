import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { JourneyStage, useThemeStore } from '@great-indian-wedding/theme-engine'
import { Button, Card, Section, Grid, Badge, StoryTimeline } from '@great-indian-wedding/ui'
import { mockApi } from '@great-indian-wedding/mock-backend'
import type { MockCouple, MockUser } from '@great-indian-wedding/mock-backend'

interface Props {
  user: MockUser
  couple: MockCouple
  onChange: () => void
}

const STAGE_DESCRIPTIONS: Record<JourneyStage, { headline: string; nextStep: string; nextTo: string }> = {
  SEEKING: {
    headline: 'You are early in the journey. The next step is finding someone who feels right.',
    nextStep: 'Browse Matches',
    nextTo: '/matches',
  },
  MATCHED: {
    headline: 'You matched. Now pick a venue and lock the first date.',
    nextStep: 'Plan First Date',
    nextTo: '/dates',
  },
  DATE_SET: {
    headline: 'First date is on the calendar. Come back and rate it after.',
    nextStep: 'Rate Your Date',
    nextTo: '/dates',
  },
  DATING: {
    headline: 'Dating phase: the spark is real. Time to start dreaming about the wedding in Shaadi Sajao.',
    nextStep: 'Open Shaadi Sajao',
    nextTo: '/story',
  },
  WEDDING: {
    headline: 'The wedding train has left the station. Most of the work happens in Shaadi Sajao now.',
    nextStep: 'View Our Story',
    nextTo: '/story',
  },
  HONEYMOONING: {
    headline: 'Honeymoon mode. Head to Jannat Safar to plan the escape.',
    nextStep: 'View Our Story',
    nextTo: '/story',
  },
}

export const DashboardPage: React.FC<Props> = ({ user, couple, onChange }) => {
  const { currentTheme } = useThemeStore()
  const stage = couple.journeyStage as JourneyStage
  const guide = STAGE_DESCRIPTIONS[stage]
  const profile = useMemo(() => mockApi.getProfile(user.id), [user.id])
  const partnerProfile = useMemo(() => mockApi.getProfile(user.partnerId), [user.partnerId])
  const timeline = useMemo(() => mockApi.getTimeline(couple.id), [couple.id, couple.journeyStage])
  const matches = useMemo(() => mockApi.getMatches(couple.id), [couple.id])
  const interestedCount = matches.filter((m) => m.status === 'interested').length

  return (
    <div>
      <Section
        title={`Hi ${profile?.firstName ?? user.email} 👋`}
        subtitle={`You're signed in as part of ${couple.coupleName}. The whole tri-app journey adapts to where you are.`}
      >
        <Card accent>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 560 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Badge tone="info">Current stage · {stage.replace('_', ' ')}</Badge>
                <Badge tone="positive">Theme · {currentTheme.name}</Badge>
              </div>
              <h3 style={{ margin: '0.25rem 0 0.5rem', fontSize: '1.3rem' }}>{guide.headline}</h3>
              <p style={{ margin: 0, color: 'rgba(0,0,0,0.6)', fontSize: '0.95rem' }}>
                {currentTheme.vibe}. Motif: {currentTheme.motif.toLowerCase()}.
              </p>
            </div>
            <Link to={guide.nextTo} style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg">{guide.nextStep} →</Button>
            </Link>
          </div>
        </Card>
      </Section>

      <Section title="The two of you">
        <Grid min={260}>
          <Card>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ fontSize: '2rem' }}>{profile?.emoji ?? '🪷'}</div>
              <div>
                <div style={{ fontWeight: 700 }}>{profile?.firstName} {profile?.lastName}</div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.55)' }}>
                  {profile?.profession} · {profile?.city}
                </div>
              </div>
            </div>
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'rgba(0,0,0,0.7)' }}>{profile?.bio}</p>
          </Card>
          <Card>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ fontSize: '2rem' }}>{partnerProfile?.emoji ?? '💞'}</div>
              <div>
                <div style={{ fontWeight: 700 }}>{partnerProfile?.firstName} {partnerProfile?.lastName}</div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.55)' }}>
                  {partnerProfile?.profession} · {partnerProfile?.city}
                </div>
              </div>
            </div>
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'rgba(0,0,0,0.7)' }}>{partnerProfile?.bio}</p>
          </Card>
        </Grid>
      </Section>

      <Section title="Quick stats">
        <Grid min={200}>
          <Card>
            <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.55)' }}>Matches viewed</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: currentTheme.colors.primary }}>{matches.length}</div>
          </Card>
          <Card>
            <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.55)' }}>Mutual interest</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: currentTheme.colors.primary }}>{interestedCount}</div>
          </Card>
          <Card>
            <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.55)' }}>Story milestones</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: currentTheme.colors.primary }}>{timeline.length}</div>
          </Card>
          <Card>
            <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.55)' }}>Kundali type</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: currentTheme.colors.primary }}>{profile?.kundaliType?.replace('_', ' ')}</div>
          </Card>
        </Grid>
      </Section>

      <Section title="Recent milestones" actions={<Link to="/story" style={{ color: currentTheme.colors.primary, textDecoration: 'none', fontWeight: 600 }}>View all →</Link>}>
        <StoryTimeline events={timeline.slice(-3)} compact />
      </Section>
    </div>
  )
}
