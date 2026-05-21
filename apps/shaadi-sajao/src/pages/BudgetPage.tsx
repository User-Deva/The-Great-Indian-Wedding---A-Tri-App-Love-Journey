import React, { useMemo } from 'react'
import { useThemeStore } from '@great-indian-wedding/theme-engine'
import { Card, Section, Grid, Badge, EmptyState, Button } from '@great-indian-wedding/ui'
import { mockApi } from '@great-indian-wedding/mock-backend'
import type { MockCouple } from '@great-indian-wedding/mock-backend'

interface Props {
  couple: MockCouple
}

const CATEGORY_ALLOCATION: Record<string, number> = {
  Decorator: 0.25,
  Caterer: 0.35,
  Photographer: 0.12,
  'Mehendi Artist': 0.05,
  'Musician/DJ': 0.08,
  'Makeup Artist': 0.05,
  Outfits: 0.1,
}

export const BudgetPage: React.FC<Props> = ({ couple }) => {
  const { currentTheme } = useThemeStore()
  const wedding = useMemo(() => mockApi.getWedding(couple.id), [couple.id])
  const bookings = useMemo(() => mockApi.getVendorBookings(couple.id), [couple.id])

  if (!wedding) {
    return (
      <EmptyState
        emoji="🧾"
        title="Set the wedding first"
        description="The budget tracker needs a total budget to allocate."
        action={<Button variant="primary" onClick={() => window.location.assign('/setup')}>Go to setup</Button>}
      />
    )
  }

  const total = wedding.budgetTotal
  const totalDepositsPaid = bookings.reduce((s, b) => s + (b.depositPaid ? b.depositAmount : 0), 0)
  const totalCommitted = bookings.reduce((s, b) => s + b.totalAmount, 0)

  const rows = Object.entries(CATEGORY_ALLOCATION).map(([cat, pct]) => {
    const allocated = Math.round(total * pct)
    const committed = bookings.filter((b) => b.vendor.category === cat).reduce((s, b) => s + b.totalAmount, 0)
    const pctUsed = allocated > 0 ? Math.min(100, Math.round((committed / allocated) * 100)) : 0
    return { cat, allocated, committed, pctUsed }
  })

  return (
    <div>
      <Section title="Budget overview" subtitle="Allocations come from the package. Bookings update commitments live.">
        <Grid min={220}>
          <Card>
            <div style={{ fontSize: '0.82rem', color: 'rgba(0,0,0,0.55)' }}>Total budget</div>
            <div style={{ fontSize: '1.7rem', fontWeight: 700, color: currentTheme.colors.primary }}>
              ₹{total.toLocaleString('en-IN')}
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: '0.82rem', color: 'rgba(0,0,0,0.55)' }}>Committed (full vendor totals)</div>
            <div style={{ fontSize: '1.7rem', fontWeight: 700, color: currentTheme.colors.primary }}>
              ₹{totalCommitted.toLocaleString('en-IN')}
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: '0.82rem', color: 'rgba(0,0,0,0.55)' }}>Deposits paid</div>
            <div style={{ fontSize: '1.7rem', fontWeight: 700, color: currentTheme.colors.primary }}>
              ₹{totalDepositsPaid.toLocaleString('en-IN')}
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: '0.82rem', color: 'rgba(0,0,0,0.55)' }}>Remaining headroom</div>
            <div style={{ fontSize: '1.7rem', fontWeight: 700, color: currentTheme.colors.primary }}>
              ₹{Math.max(0, total - totalCommitted).toLocaleString('en-IN')}
            </div>
          </Card>
        </Grid>
      </Section>

      <Section title="Category breakdown">
        <Card>
          {rows.map((row) => (
            <div key={row.cat} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600 }}>{row.cat}</span>
                  <Badge tone={row.pctUsed > 95 ? 'danger' : row.pctUsed > 75 ? 'warning' : 'positive'}>
                    {row.pctUsed}% used
                  </Badge>
                </div>
                <div style={{ color: 'rgba(0,0,0,0.65)' }}>
                  ₹{row.committed.toLocaleString('en-IN')} / ₹{row.allocated.toLocaleString('en-IN')}
                </div>
              </div>
              <div style={{ height: 10, background: 'rgba(0,0,0,0.08)', borderRadius: 6, marginTop: 6, overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${row.pctUsed}%`,
                    height: '100%',
                    background:
                      row.pctUsed > 95 ? '#c62828' : row.pctUsed > 75 ? '#ed6c02' : currentTheme.colors.primary,
                    transition: 'width 300ms',
                  }}
                />
              </div>
            </div>
          ))}
        </Card>
      </Section>
    </div>
  )
}
