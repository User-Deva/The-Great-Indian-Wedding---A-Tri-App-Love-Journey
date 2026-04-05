import { useThemeStore } from '@great-indian-wedding/theme-engine'
import { useAuthStore } from '@great-indian-wedding/auth'
import { Layout } from './components'

function App() {
  const { currentTheme } = useThemeStore()
  const { isAuthenticated, user } = useAuthStore()

  return (
    <Layout title="✨ Rishta — The Matchmaker">
      {!isAuthenticated ? (
        <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <h2>Welcome to Rishta</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            Where destinies meet over chai.
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
            Sign In with Supabase
          </button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: currentTheme.colors.primary, color: currentTheme.colors.secondary, borderRadius: '12px' }}>
            <h2 style={{ margin: '0 0 0.5rem' }}>Welcome, {user?.email || 'Traveler'}! 💕</h2>
            <p style={{ margin: '0.5rem 0', opacity: 0.9 }}>
              Your journey in {currentTheme.name} has begun.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            {/* Profile Section */}
            <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '12px', border: `2px solid ${currentTheme.colors.primary}` }}>
              <h3 style={{ marginTop: 0 }}>👤 Profile</h3>
              <p style={{ color: '#666' }}>Build your biodata with personal info, horoscope, and personality quiz.</p>
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
                Build Your Profile
              </button>
            </div>

            {/* Matches Section */}
            <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '12px', border: `2px solid ${currentTheme.colors.primary}` }}>
              <h3 style={{ marginTop: 0 }}>💕 Matches</h3>
              <p style={{ color: '#666' }}>Discover compatible profiles using our Kismat algorithm.</p>
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
                Browse Matches
              </button>
            </div>

            {/* Dates Section */}
            <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '12px', border: `2px solid ${currentTheme.colors.primary}` }}>
              <h3 style={{ marginTop: 0 }}>☕ Pehli Mulaqat</h3>
              <p style={{ color: '#666' }}>Get curated venue suggestions for your first date.</p>
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
                Suggest Date Venues
              </button>
            </div>
          </div>

          <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#fafafa', borderRadius: '12px' }}>
            <h3>ℹ️ About the Journey</h3>
            <p>
              Rishta is powered by the <strong>Kismat Match Engine</strong>, which considers:
            </p>
            <ul style={{ color: '#666' }}>
              <li><strong>Lifestyle Compatibility (40%)</strong> — Diet, habits, family type</li>
              <li><strong>Personality Matching (30%)</strong> — Your Kundali type</li>
              <li><strong>Guna Milan Score (20%)</strong> — Vedic horoscope alignment</li>
              <li><strong>Family Values (10%)</strong> — Religion, mother tongue</li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default App
