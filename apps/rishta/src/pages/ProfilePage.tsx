import React, { useState } from 'react'
import { useThemeStore } from '@great-indian-wedding/theme-engine'
import { Button, Card, Section, Grid, Badge } from '@great-indian-wedding/ui'
import { mockApi } from '@great-indian-wedding/mock-backend'
import type { MockUser, MockProfile } from '@great-indian-wedding/mock-backend'
import { KUNDALI_DESCRIPTIONS, KundaliType } from '../types'

interface Props {
  user: MockUser
}

export const ProfilePage: React.FC<Props> = ({ user }) => {
  const { currentTheme } = useThemeStore()
  const initial = mockApi.getProfile(user.id)!
  const [profile, setProfile] = useState<MockProfile>(initial)
  const [saved, setSaved] = useState(false)

  const change = <K extends keyof MockProfile>(key: K, value: MockProfile[K]) => {
    setProfile((p) => ({ ...p, [key]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    mockApi.updateProfile(user.id, profile)
    setSaved(true)
    setTimeout(() => setSaved(false), 2400)
  }

  const kundaliKey = profile.kundaliType as KundaliType
  const kundaliDesc = KUNDALI_DESCRIPTIONS[kundaliKey] ?? 'Personality profile'

  return (
    <div>
      <Section
        title="Your biodata"
        subtitle="Edit your profile. It powers the Kismat Match Engine across the journey."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {saved && <Badge tone="positive">Saved</Badge>}
            <Button variant="primary" onClick={handleSave}>Save profile</Button>
          </div>
        }
      >
        <Grid min={300}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '2.2rem' }}>{profile.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{profile.firstName} {profile.lastName}</div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.55)' }}>{profile.profession} · {profile.city}</div>
              </div>
            </div>
            <Field label="First name" value={profile.firstName} onChange={(v) => change('firstName', v)} />
            <Field label="Last name" value={profile.lastName} onChange={(v) => change('lastName', v)} />
            <Field label="Age" value={String(profile.age)} onChange={(v) => change('age', Number(v) || 0)} type="number" />
            <Field label="City" value={profile.city} onChange={(v) => change('city', v)} />
          </Card>

          <Card>
            <h4 style={{ margin: '0 0 0.75rem', color: currentTheme.colors.primary }}>Lifestyle</h4>
            <Field label="Profession" value={profile.profession} onChange={(v) => change('profession', v)} />
            <Field label="Education" value={profile.education} onChange={(v) => change('education', v)} />
            <SelectField
              label="Diet"
              value={profile.diet}
              onChange={(v) => change('diet', v as MockProfile['diet'])}
              options={['vegetarian', 'non-vegetarian', 'vegan', 'jain']}
            />
            <SelectField
              label="Family type"
              value={profile.familyType}
              onChange={(v) => change('familyType', v as MockProfile['familyType'])}
              options={['nuclear', 'joint']}
            />
            <CheckboxField label="Drinks socially" checked={profile.drinking} onChange={(v) => change('drinking', v)} />
            <CheckboxField label="Smokes" checked={profile.smoking} onChange={(v) => change('smoking', v)} />
          </Card>

          <Card>
            <h4 style={{ margin: '0 0 0.75rem', color: currentTheme.colors.primary }}>Culture</h4>
            <Field label="Religion" value={profile.religion} onChange={(v) => change('religion', v)} />
            <Field label="Mother tongue" value={profile.motherTongue} onChange={(v) => change('motherTongue', v)} />
            <SelectField
              label="Kundali type"
              value={profile.kundaliType}
              onChange={(v) => change('kundaliType', v)}
              options={Object.keys(KUNDALI_DESCRIPTIONS)}
            />
            <p style={{ margin: '0.4rem 0 0.75rem', fontSize: '0.85rem', color: 'rgba(0,0,0,0.55)' }}>
              {kundaliDesc}
            </p>
            <Field
              label="Guna Milan score (0–36)"
              value={String(profile.gunaMilanScore)}
              onChange={(v) => change('gunaMilanScore', Math.max(0, Math.min(36, Number(v) || 0)))}
              type="number"
            />
          </Card>

          <Card>
            <h4 style={{ margin: '0 0 0.75rem', color: currentTheme.colors.primary }}>Bio</h4>
            <textarea
              value={profile.bio}
              onChange={(e) => change('bio', e.target.value)}
              rows={6}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 10,
                border: '1px solid rgba(0,0,0,0.12)',
                fontSize: '0.95rem',
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
            <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'rgba(0,0,0,0.5)' }}>
              Your bio shows up to potential matches and on your wedding microsite later.
            </p>
          </Card>
        </Grid>
      </Section>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.55rem 0.75rem',
  marginTop: 4,
  marginBottom: '0.6rem',
  borderRadius: 10,
  border: '1px solid rgba(0,0,0,0.12)',
  fontSize: '0.92rem',
  fontFamily: 'inherit',
}

const Field: React.FC<{ label: string; value: string; onChange: (v: string) => void; type?: string }> = ({ label, value, onChange, type = 'text' }) => (
  <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(0,0,0,0.65)' }}>
    {label}
    <input value={value} type={type} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
  </label>
)

const SelectField: React.FC<{ label: string; value: string; onChange: (v: string) => void; options: string[] }> = ({ label, value, onChange, options }) => (
  <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(0,0,0,0.65)' }}>
    {label}
    <select value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle}>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </label>
)

const CheckboxField: React.FC<{ label: string; checked: boolean; onChange: (v: boolean) => void }> = ({ label, checked, onChange }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', margin: '0.35rem 0 0.6rem' }}>
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    {label}
  </label>
)
