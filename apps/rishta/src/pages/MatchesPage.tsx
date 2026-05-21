import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeStore } from '@great-indian-wedding/theme-engine'
import { Button, Card, Section, Grid, Badge, EmptyState } from '@great-indian-wedding/ui'
import { mockApi } from '@great-indian-wedding/mock-backend'
import type { MockCouple } from '@great-indian-wedding/mock-backend'
import { getCompatibilityMessage } from '../utils/kismatEngine'

interface Props {
  couple: MockCouple
  onChange: () => void
}

export const MatchesPage: React.FC<Props> = ({ couple, onChange }) => {
  const { currentTheme } = useThemeStore()
  const navigate = useNavigate()
  const [version, setVersion] = useState(0)
  const matches = useMemo(() => mockApi.getMatches(couple.id), [couple.id, version])
  const [highlight, setHighlight] = useState<string | null>(null)

  const handleInterest = (matchId: string) => {
    mockApi.respondToMatch(couple.id, matchId, 'interested')
    setHighlight(matchId)
    setVersion((v) => v + 1)
    onChange()
    setTimeout(() => {
      navigate('/dates')
    }, 1200)
  }

  const handlePass = (matchId: string) => {
    mockApi.respondToMatch(couple.id, matchId, 'passed')
    setVersion((v) => v + 1)
  }

  const pending = matches.filter((m) => m.status === 'pending')
  const decided = matches.filter((m) => m.status !== 'pending')

  return (
    <div>
      <Section
        title="Kismat-curated matches"
        subtitle="Compatibility scored on lifestyle (40%) · personality (30%) · Guna Milan (20%) · family (10%)."
      >
        {pending.length === 0 ? (
          <EmptyState
            emoji="💞"
            title="You've reviewed everyone"
            description="Sign in as another seeded user or hit Reset demo to start over."
          />
        ) : (
          <Grid min={300}>
            {pending.map((match) => {
              const tone = match.compatibilityScore >= 85 ? 'positive' : match.compatibilityScore >= 70 ? 'info' : 'warning'
              const flash = highlight === match.id
              return (
                <Card key={match.id} accent={flash}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '2.4rem' }}>{match.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{match.candidateName}</div>
                      <div style={{ fontSize: '0.82rem', color: 'rgba(0,0,0,0.55)' }}>
                        {match.candidateAge} · {match.candidateProfession} · {match.candidateCity}
                      </div>
                    </div>
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: currentTheme.colors.primary,
                        color: currentTheme.colors.secondary,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '1rem',
                      }}
                    >
                      {match.compatibilityScore}%
                    </div>
                  </div>
                  <p style={{ margin: '0.25rem 0 0.6rem', color: 'rgba(0,0,0,0.7)', fontSize: '0.92rem' }}>
                    {match.candidateBio}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <Badge tone={tone}>{getCompatibilityMessage(match.compatibilityScore)}</Badge>
                    <Badge tone="neutral">Guna Milan {match.gunaMilanScore}/36</Badge>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button variant="primary" fullWidth onClick={() => handleInterest(match.id)}>
                      ❤️ Express interest
                    </Button>
                    <Button variant="secondary" onClick={() => handlePass(match.id)}>
                      Pass
                    </Button>
                  </div>
                </Card>
              )
            })}
          </Grid>
        )}
      </Section>

      {decided.length > 0 && (
        <Section title="Earlier responses">
          <Grid min={260}>
            {decided.map((m) => (
              <Card key={m.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ fontSize: '1.6rem' }}>{m.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{m.candidateName}</div>
                    <div style={{ fontSize: '0.82rem', color: 'rgba(0,0,0,0.55)' }}>{m.compatibilityScore}% compatible</div>
                  </div>
                  <Badge tone={m.status === 'interested' ? 'positive' : 'neutral'}>
                    {m.status === 'interested' ? 'Interested' : 'Passed'}
                  </Badge>
                </div>
              </Card>
            ))}
          </Grid>
        </Section>
      )}
    </div>
  )
}
