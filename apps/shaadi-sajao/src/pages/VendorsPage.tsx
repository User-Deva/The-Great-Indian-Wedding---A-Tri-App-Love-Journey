import React, { useMemo, useState } from 'react'
import { JourneyStage, useThemeStore } from '@great-indian-wedding/theme-engine'
import { Button, Card, Section, Grid, Badge, EmptyState } from '@great-indian-wedding/ui'
import { mockApi } from '@great-indian-wedding/mock-backend'
import type { MockCouple, MockUser } from '@great-indian-wedding/mock-backend'

interface Props {
  user: MockUser
  couple: MockCouple
  onChange: () => void
}

const CATEGORIES = ['All', 'Decorator', 'Caterer', 'Photographer', 'Mehendi Artist', 'Musician/DJ', 'Makeup Artist']

export const VendorsPage: React.FC<Props> = ({ user, couple, onChange }) => {
  const { currentTheme } = useThemeStore()
  const profile = useMemo(() => mockApi.getProfile(user.id), [user.id])
  const [category, setCategory] = useState<string>('All')
  const [version, setVersion] = useState(0)
  const vendors = useMemo(() => {
    return mockApi.listVendors(undefined, category === 'All' ? undefined : category)
  }, [category, version])
  const bookings = useMemo(() => mockApi.getVendorBookings(couple.id), [couple.id, version])
  const stage = couple.journeyStage as JourneyStage

  const isLocked = stage === JourneyStage.SEEKING || stage === JourneyStage.MATCHED || stage === JourneyStage.DATE_SET
  if (isLocked) {
    return (
      <EmptyState
        emoji="🔒"
        title="Locked"
        description="Finish a date in Rishta first."
      />
    )
  }

  const handleBook = (vendorId: string, payDeposit: boolean) => {
    mockApi.bookVendor(couple.id, vendorId, payDeposit)
    setVersion((v) => v + 1)
    onChange()
  }

  const bookedIds = new Set(bookings.map((b) => b.vendor.id))

  return (
    <div>
      <Section
        title="Varmala vendor directory"
        subtitle={`Showing ${vendors.length} vendor${vendors.length === 1 ? '' : 's'}. The first one you confirm with a deposit advances you to the Wedding stage.`}
      >
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 999,
                border: category === c ? `1.5px solid ${currentTheme.colors.primary}` : '1px solid rgba(0,0,0,0.12)',
                background: category === c ? currentTheme.colors.primary : 'white',
                color: category === c ? currentTheme.colors.secondary : '#333',
                cursor: 'pointer',
                fontSize: '0.88rem',
                fontWeight: 500,
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <Grid min={320}>
          {vendors.map((vendor) => {
            const alreadyBooked = bookedIds.has(vendor.id)
            return (
              <Card key={vendor.id}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ fontSize: '2rem' }}>{vendor.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ fontWeight: 700 }}>{vendor.name}</div>
                      {vendor.verified && <Badge tone="positive">Varmala ✓</Badge>}
                    </div>
                    <div style={{ fontSize: '0.84rem', color: 'rgba(0,0,0,0.55)' }}>
                      {vendor.category} · {vendor.city} · ⭐ {vendor.rating} ({vendor.reviewCount})
                    </div>
                  </div>
                </div>
                <p style={{ margin: '0.75rem 0', fontSize: '0.92rem', color: 'rgba(0,0,0,0.7)' }}>{vendor.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(0,0,0,0.5)' }}>Price range</div>
                    <div style={{ fontWeight: 700 }}>{vendor.priceRange}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(0,0,0,0.5)' }}>20% deposit</div>
                    <div style={{ fontWeight: 700 }}>₹{Math.round(vendor.basePrice * 0.2).toLocaleString('en-IN')}</div>
                  </div>
                </div>
                {alreadyBooked ? (
                  <Badge tone="positive">Already in your bookings</Badge>
                ) : (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button variant="primary" fullWidth onClick={() => handleBook(vendor.id, true)}>
                      Confirm with deposit
                    </Button>
                    <Button variant="secondary" onClick={() => handleBook(vendor.id, false)}>
                      Hold (no deposit)
                    </Button>
                  </div>
                )}
              </Card>
            )
          })}
        </Grid>
      </Section>

      {bookings.length > 0 && (
        <Section title="Your bookings">
          <Grid min={300}>
            {bookings.map((b) => (
              <Card key={b.id} accent={b.status === 'confirmed'}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{b.vendor.emoji} {b.vendor.name}</div>
                    <div style={{ fontSize: '0.82rem', color: 'rgba(0,0,0,0.55)' }}>{b.vendor.category} · {b.vendor.city}</div>
                  </div>
                  <Badge tone={b.status === 'confirmed' ? 'positive' : 'warning'}>{b.status}</Badge>
                </div>
                <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span>Deposit: ₹{b.depositAmount.toLocaleString('en-IN')}</span>
                  <span>{b.depositPaid ? 'Paid' : 'Pending'}</span>
                </div>
              </Card>
            ))}
          </Grid>
        </Section>
      )}
    </div>
  )
}
