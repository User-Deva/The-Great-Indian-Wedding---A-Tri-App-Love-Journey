import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Section, Grid, Badge } from '@great-indian-wedding/ui'
import { mockApi } from '@great-indian-wedding/mock-backend'
import type { MockCouple } from '@great-indian-wedding/mock-backend'

interface Props {
  couple: MockCouple
  onChange: () => void
}

function defaultStart(): string {
  const d = new Date()
  d.setMonth(d.getMonth() + 7)
  return d.toISOString().slice(0, 10)
}
function defaultEnd(): string {
  const d = new Date()
  d.setMonth(d.getMonth() + 7)
  d.setDate(d.getDate() + 7)
  return d.toISOString().slice(0, 10)
}

export const DestinationsPage: React.FC<Props> = ({ couple, onChange }) => {
  const navigate = useNavigate()
  const destinations = useMemo(() => mockApi.listDestinations(), [])
  const existing = useMemo(() => mockApi.getHoneymoon(couple.id), [couple.id])
  const [selectedId, setSelectedId] = useState(existing?.destinationId ?? '')
  const [start, setStart] = useState(existing?.startDate?.slice(0, 10) ?? defaultStart())
  const [end, setEnd] = useState(existing?.endDate?.slice(0, 10) ?? defaultEnd())
  const [budget, setBudget] = useState(existing?.budgetTotal ?? 400000)

  const handleConfirm = () => {
    if (!selectedId) return
    mockApi.saveHoneymoon(couple.id, selectedId, new Date(start).toISOString(), new Date(end).toISOString(), budget)
    onChange()
    navigate('/flights')
  }

  return (
    <div>
      <Section title="Where are you escaping to?" subtitle="Pick one destination. Then we'll suggest flights and hotels.">
        <Grid min={300}>
          {destinations.map((d) => (
            <Card key={d.id} accent={selectedId === d.id} onClick={() => setSelectedId(d.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '2.2rem' }}>{d.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{d.name}</div>
                  <div style={{ fontSize: '0.82rem', color: 'rgba(0,0,0,0.55)' }}>{d.country} · {d.archetype}</div>
                </div>
                {selectedId === d.id && <Badge tone="positive">Selected</Badge>}
              </div>
              <p style={{ margin: '0.4rem 0 0.5rem', fontSize: '0.92rem', color: 'rgba(0,0,0,0.7)' }}>{d.description}</p>
              <p style={{ margin: '0.4rem 0', fontSize: '0.88rem', color: 'rgba(0,0,0,0.65)', fontStyle: 'italic' }}>
                "{d.whyPerfect}"
              </p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <Badge tone="info">{d.bestTimeToVisit}</Badge>
                <Badge tone="neutral">
                  ₹{Math.round(d.budgetMin / 1000)}K – ₹{Math.round(d.budgetMax / 100000)}L
                </Badge>
              </div>
              <details style={{ marginTop: '0.5rem' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem' }}>Highlights</summary>
                <ul style={{ paddingLeft: '1.1rem', margin: '0.4rem 0 0', color: 'rgba(0,0,0,0.7)', fontSize: '0.88rem' }}>
                  {d.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </details>
            </Card>
          ))}
        </Grid>
      </Section>

      {selectedId && (
        <Section title="Trip dates and budget">
          <Card accent>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <FormField label="Start date">
                <input type="date" value={start} onChange={(e) => setStart(e.target.value)} style={inputStyle} />
              </FormField>
              <FormField label="End date">
                <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} style={inputStyle} />
              </FormField>
              <FormField label="Total budget (INR)">
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value) || 0)}
                  style={inputStyle}
                />
              </FormField>
              <Button variant="primary" size="lg" onClick={handleConfirm}>
                Confirm destination →
              </Button>
            </div>
          </Card>
        </Section>
      )}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  padding: '0.55rem 0.75rem',
  borderRadius: 10,
  border: '1px solid rgba(0,0,0,0.12)',
  fontSize: '0.92rem',
  fontFamily: 'inherit',
  minWidth: 160,
}

const FormField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(0,0,0,0.65)' }}>
    {label}
    <div style={{ marginTop: 4 }}>{children}</div>
  </label>
)
