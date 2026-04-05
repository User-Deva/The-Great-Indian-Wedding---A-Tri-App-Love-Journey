import { useThemeStore } from '@great-indian-wedding/theme-engine'
import { useAuthStore } from '@great-indian-wedding/auth'
import { Layout, WeddingCountdown } from './components'

function App() {
  const { currentTheme } = useThemeStore()
  const { isAuthenticated, user } = useAuthStore()

  return (
    <Layout
      title="Shaadi Sajao — Wedding Planner"
      subtitle="Powered by Varmala — Your Personal Wedding Concierge"
    >
      {!isAuthenticated ? (
        <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <h2>Welcome to Varmala</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            Your complete wedding planning partner
          </p>
          <button
            style={{
              padding: '1rem 2rem',
              fontSize: '1rem',
              backgroundColor: currentTheme.colors.primary,
              color: currentTheme.colors.secondary,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Sign In to Start Planning
          </button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: currentTheme.colors.primary, color: currentTheme.colors.secondary, borderRadius: '12px' }}>
            <h2 style={{ margin: '0 0 0.5rem' }}>Welcome, {user?.email || 'Couple'}! 💍</h2>
            <p style={{ margin: '0.5rem 0', opacity: 0.95 }}>
              Let's create the wedding of your dreams in {currentTheme.name}.
            </p>
          </div>

          {/* Wedding Countdown */}
          <WeddingCountdown wedding={null} />

          {/* Main Features Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            {/* Wedding Dashboard */}
            <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '12px', border: `2px solid ${currentTheme.colors.primary}` }}>
              <h3 style={{ marginTop: 0 }}>📊 Wedding Dashboard</h3>
              <p style={{ color: '#666' }}>
                Countdown timer, budget tracker, guest list, and ritual checklist in one place.
              </p>
              <button
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: currentTheme.colors.primary,
                  color: currentTheme.colors.secondary,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginTop: '1rem',
                }}
              >
                View Dashboard
              </button>
            </div>

            {/* Varmala Vendors */}
            <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '12px', border: `2px solid ${currentTheme.colors.primary}` }}>
              <h3 style={{ marginTop: 0 }}>💼 Varmala Vendors</h3>
              <p style={{ color: '#666' }}>
                Decorators, caterers, photographers, mehendi artists, and more — all pre-vetted.
              </p>
              <button
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: currentTheme.colors.primary,
                  color: currentTheme.colors.secondary,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginTop: '1rem',
                }}
              >
                Browse Vendors
              </button>
            </div>

            {/* Wedding Stylist */}
            <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '12px', border: `2px solid ${currentTheme.colors.primary}` }}>
              <h3 style={{ marginTop: 0 }}>🎨 Wedding Stylist</h3>
              <p style={{ color: '#666' }}>
                AI-powered color palettes, mood boards, and décor recommendations tailored to you.
              </p>
              <button
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: currentTheme.colors.primary,
                  color: currentTheme.colors.secondary,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginTop: '1rem',
                }}
              >
                Style Your Wedding
              </button>
            </div>

            {/* Family Coordination */}
            <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '12px', border: `2px solid ${currentTheme.colors.primary}` }}>
              <h3 style={{ marginTop: 0 }}>👨‍👩‍👧‍👦 Family Coordination</h3>
              <p style={{ color: '#666' }}>
                Invite family members, assign roles, and collaborate on planning in real-time.
              </p>
              <button
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: currentTheme.colors.primary,
                  color: currentTheme.colors.secondary,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginTop: '1rem',
                }}
              >
                Invite Family
              </button>
            </div>

            {/* Budget Manager */}
            <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '12px', border: `2px solid ${currentTheme.colors.primary}` }}>
              <h3 style={{ marginTop: 0 }}>💰 Budget Manager</h3>
              <p style={{ color: '#666' }}>
                Track expenses, allocate budgets, and get cost-saving recommendations.
              </p>
              <button
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: currentTheme.colors.primary,
                  color: currentTheme.colors.secondary,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginTop: '1rem',
                }}
              >
                Manage Budget
              </button>
            </div>

            {/* Ritual Planner */}
            <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '12px', border: `2px solid ${currentTheme.colors.primary}` }}>
              <h3 style={{ marginTop: 0 }}>🎊 Ritual Planner</h3>
              <p style={{ color: '#666' }}>
                Mehendi, Sangeet, Haldi, Baraat, Pheras — plan all rituals with our custom checklists.
              </p>
              <button
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: currentTheme.colors.primary,
                  color: currentTheme.colors.secondary,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginTop: '1rem',
                }}
              >
                Plan Rituals
              </button>
            </div>
          </div>

          {/* Varmala Packages */}
          <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#fafafa', borderRadius: '12px' }}>
            <h3>🎁 Varmala Packages</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
              {[
                { name: 'Roka', price: '₹25K - ₹75K', desc: 'Engagement ceremony' },
                { name: 'Sangeet', price: '₹1L - ₹3L', desc: '2-day functions' },
                { name: 'Saat Phere', price: '₹3L - ₹10L', desc: '5-day wedding' },
                { name: 'Maharaja', price: '₹10L+', desc: 'Destination wedding' },
              ].map((pkg) => (
                <div
                  key={pkg.name}
                  style={{
                    backgroundColor: '#ffffff',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: `2px solid ${currentTheme.colors.primary}`,
                  }}
                >
                  <h4 style={{ margin: '0 0 0.5rem' }}>{pkg.name}</h4>
                  <p style={{ color: '#666', margin: '0.25rem 0', fontSize: '0.9rem' }}>
                    {pkg.desc}
                  </p>
                  <p style={{ margin: '0.75rem 0 0', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    {pkg.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default App
