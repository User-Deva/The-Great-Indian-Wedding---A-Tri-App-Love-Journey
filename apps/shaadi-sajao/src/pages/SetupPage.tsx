import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { JourneyStage } from '@great-indian-wedding/theme-engine'
import { Button, Card, Section, Grid, Badge, EmptyState } from '@great-indian-wedding/ui'
import { mockApi } from '@great-indian-wedding/mock-backend'
import type { MockCouple, MockUser } from '@great-indian-wedding/mock-backend'

interface Props {
  user: MockUser
  couple: MockCouple
  onChange: () => void
}

const PACKAGES = [
  { key: 'Roka', desc: 'Engagement ceremony', budget: 500000, days: 1 },
  { key: 'Sangeet', desc: '2-day function', budget: 1500000, days: 2 },
  { key: 'Saat Phere', desc: '5-day traditional wedding', budget: 4000000, days: 5 },
  { key: 'Maharaja', desc: 'Destination, all out', budget: 10000000, days: 7 },
]

const RELIGIONS = ['Hindu', 'Muslim', 'Sikh', 'Christian', 'Jain', 'Buddhist', 'Inter-faith']

function defaultWeddingDate(): string {
  const d = new Date()
  d.setMonth(d.getMonth() + 6)
  d.setHours(18, 0, 0, 0)
  return d.toISOString().slice(0, 10)
}

export const SetupPage: React.FC<Props> = ({ user, couple, onChange }) => {
  const navigate = useNavigate()
  const existing = useMemo(() => mockApi.getWedding(couple.id), [couple.id])
  const profile = useMemo(() => mockApi.getProfile(user.id), [user.id])
  const stage = couple.journeyStage as JourneyStage

  const [packageType, setPackageType] = useState(existing?.packageType ?? 'Saat Phere')
  const [weddingDate, setWeddingDate] = useState(existing?.weddingDate ? existing.weddingDate.slice(0, 10) : defaultWeddingDate())
  const [weddingVenue, setWeddingVenue] = useState(existing?.weddingVenue ?? `${profile?.city ?? 'Delhi'} · ITC Maurya Lawns`)
  const [religion, setReligion] = useState(existing?.religion ?? (profile?.religion ?? 'Hindu'))
  const [guestCount, setGuestCount] = useState(existing?.guestCount ?? 250)
  const [budgetTotal, setBudgetTotal] = useState(existing?.budgetTotal ?? PACKAGES[2].budget)
  const [saved, setSaved] = useState(false)

  const isLocked = stage === JourneyStage.SEEKING || stage === JourneyStage.MATCHED || stage === JourneyStage.DATE_SET
  if (isLocked) {
    return (
      <EmptyState
        emoji="🔒"
        title="Locked until Dating"
        description="Finish a 4+ star first date in Rishta to unlock wedding planning."
        action={<Button variant="primary" onClick={() => window.open('http://localhost:3001/', '_self')}>Open Rishta</Button>}
      />
    )
  }

  const handleSave = () => {
    mockApi.saveWedding(couple.id, {
      weddingDate: new Date(weddingDate).toISOString(),
      weddingVenue,
      packageType,
      religion,
      budgetTotal,
      guestCount,
    })
    setSaved(true)
    onChange()
    setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div>
      <Section title="Pick a package" subtitle="Sets the baseline for guest count, ritual days, and budget.">
        <Grid min={220}>
          {PACKAGES.map((p) => (
            <Card key={p.key} accent={packageType === p.key} onClick={() => { setPackageType(p.key); setBudgetTotal(p.budget) }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700 }}>{p.key}</div>
                {packageType === p.key && <Badge tone="positive">Selected</Badge>}
              </div>
              <p style={{ margin: '0.25rem 0 0.5rem', color: 'rgba(0,0,0,0.6)', fontSize: '0.9rem' }}>{p.desc}</p>
              <div style={{ fontWeight: 600, color: '#444' }}>₹{p.budget.toLocaleString('en-IN')}</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.55)' }}>{p.days} day{p.days > 1 ? 's' : ''} of ceremonies</div>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section
        title="Wedding details"
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {saved && <Badge tone="positive">Saved</Badge>}
            <Button variant="primary" onClick={handleSave}>Save wedding</Button>
          </div>
        }
      >
        <Grid min={300}>
          <Card>
            <FormField label="Wedding date">
              <input type="date" value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)} style={inputStyle} />
            </FormField>
            <FormField label="Venue">
              <input value={weddingVenue} onChange={(e) => setWeddingVenue(e.target.value)} style={inputStyle} />
            </FormField>
            <FormField label="Religion / tradition">
              <select value={religion} onChange={(e) => setReligion(e.target.value)} style={inputStyle}>
                {RELIGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </FormField>
            <FormField label="Guest count">
              <input type="number" value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value) || 0)} style={inputStyle} />
            </FormField>
            <FormField label="Total budget (INR)">
              <input type="number" value={budgetTotal} onChange={(e) => setBudgetTotal(Number(e.target.value) || 0)} style={inputStyle} />
            </FormField>
          </Card>

          <Card>
            <h4 style={{ marginTop: 0 }}>Suggested allocation</h4>
            <Allocation label="Decor & venue" pct={0.25} budget={budgetTotal} />
            <Allocation label="Catering" pct={0.35} budget={budgetTotal} />
            <Allocation label="Photo & video" pct={0.12} budget={budgetTotal} />
            <Allocation label="Outfits" pct={0.15} budget={budgetTotal} />
            <Allocation label="Transport" pct={0.08} budget={budgetTotal} />
            <Allocation label="Invitations & misc" pct={0.05} budget={budgetTotal} />
            <p style={{ margin: '0.75rem 0 0', fontSize: '0.85rem', color: 'rgba(0,0,0,0.55)' }}>
              Percentages adapt by package. Edit anytime in Budget.
            </p>
            <Button variant="secondary" size="sm" style={{ marginTop: '0.5rem' }} onClick={() => navigate('/vendors')}>
              Browse vendors →
            </Button>
          </Card>
        </Grid>
      </Section>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.55rem 0.75rem',
  borderRadius: 10,
  border: '1px solid rgba(0,0,0,0.12)',
  fontSize: '0.95rem',
  fontFamily: 'inherit',
}

const FormField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(0,0,0,0.65)', marginBottom: '0.75rem' }}>
    {label}
    <div style={{ marginTop: 4 }}>{children}</div>
  </label>
)

const Allocation: React.FC<{ label: string; pct: number; budget: number }> = ({ label, pct, budget }) => (
  <div style={{ marginBottom: '0.6rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
      <span>{label}</span>
      <span style={{ fontWeight: 600 }}>₹{Math.round(budget * pct).toLocaleString('en-IN')}</span>
    </div>
    <div style={{ height: 8, background: 'rgba(0,0,0,0.08)', borderRadius: 6, marginTop: 4 }}>
      <div style={{ width: `${pct * 100}%`, height: '100%', background: '#a13a4f', borderRadius: 6 }} />
    </div>
  </div>
)
