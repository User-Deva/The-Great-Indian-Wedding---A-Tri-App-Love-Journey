import { useThemeStore } from '@great-indian-wedding/theme-engine'
import { useAuthStore } from '@great-indian-wedding/auth'
import { Layout, HoneymoonCountdown, DestinationCard } from './components'
import { getRandomDestinations } from './utils/destinations'
import { TRAVELER_DESCRIPTIONS, TravelerArchetype } from './types'

function App() {
  const { currentTheme } = useThemeStore()
  const { isAuthenticated, user } = useAuthStore()
  const randomDestinations = getRandomDestinations(3)

  return (
    <Layout
      title="Jannat Safar — Honeymoon Planner"
      subtitle="Where your paradise begins"
    >
      {!isAuthenticated ? (
        <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <h2>Welcome to Jannat Safar</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            Your forever begins with the perfect escape
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
            <h2 style={{ margin: '0 0 0.5rem' }}>Welcome, {user?.email || 'Lovebirds'}! 💕</h2>
            <p style={{ margin: '0.5rem 0', opacity: 0.95 }}>
              Let's plan the honeymoon of your dreams in {currentTheme.name}.
            </p>
          </div>

          {/* Honeymoon Countdown */}
          <HoneymoonCountdown honeymoon={null} />

          {/* Main Features Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            {/* Travel Personality Quiz */}
            <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '12px', border: `2px solid ${currentTheme.colors.primary}` }}>
              <h3 style={{ marginTop: 0 }}>🧭 Travel Personality</h3>
              <p style={{ color: '#666' }}>
                Discover your traveler archetype with our 8-question quiz and find destinations that match your vibe.
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
                Take the Quiz
              </button>
            </div>

            {/* Destination Explorer */}
            <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '12px', border: `2px solid ${currentTheme.colors.primary}` }}>
              <h3 style={{ marginTop: 0 }}>🌍 Destinations</h3>
              <p style={{ color: '#666' }}>
                Explore 12+ curated honeymoon destinations from tropical beaches to mountain escapes.
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
                Browse Destinations
              </button>
            </div>

            {/* Flight Booking */}
            <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '12px', border: `2px solid ${currentTheme.colors.primary}` }}>
              <h3 style={{ marginTop: 0 }}>✈️ Flight Booking</h3>
              <p style={{ color: '#666' }}>
                Search and book flights with our integrated travel aggregator. Compare prices and find best deals.
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
                Search Flights
              </button>
            </div>

            {/* Hotel Booking */}
            <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '12px', border: `2px solid ${currentTheme.colors.primary}` }}>
              <h3 style={{ marginTop: 0 }}>🏨 Hotels</h3>
              <p style={{ color: '#666' }}>
                Explore romantic resorts and hotels curated for honeymooners with spa & couple packages.
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
                Book Hotels
              </button>
            </div>

            {/* Itinerary Planner */}
            <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '12px', border: `2px solid ${currentTheme.colors.primary}` }}>
              <h3 style={{ marginTop: 0 }}>📅 Itinerary</h3>
              <p style={{ color: '#666' }}>
                Create day-by-day itineraries with attractions, restaurants, and activities for each city.
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
                Plan Itinerary
              </button>
            </div>

            {/* Honeymoon Wallet */}
            <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '12px', border: `2px solid ${currentTheme.colors.primary}` }}>
              <h3 style={{ marginTop: 0 }}>💰 Wallet</h3>
              <p style={{ color: '#666' }}>
                Track expenses, manage budget allocation, and get daily spending suggestions for each category.
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
                Manage Wallet
              </button>
            </div>
          </div>

          {/* Featured Destinations Carousel */}
          <div style={{ marginTop: '3rem' }}>
            <h3>✨ Featured Destinations</h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Get inspired by these hand-picked honeymoon destinations
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
              }}
            >
              {randomDestinations.map((dest) => (
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  onSelect={() => {
                    console.log('Selected:', dest.name);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Traveler Archetypes */}
          <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#fafafa', borderRadius: '12px' }}>
            <h3>🧭 Traveler Archetypes</h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Discover which traveler type you are and find destinations that match your personality
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
              }}
            >
              {Object.entries(TRAVELER_DESCRIPTIONS).map(([type, desc]) => (
                <div
                  key={type}
                  style={{
                    backgroundColor: '#ffffff',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: `2px solid ${currentTheme.colors.primary}`,
                  }}
                >
                  <h4 style={{ margin: '0 0 0.5rem' }}>{type}</h4>
                  <p style={{ color: '#666', margin: 0, fontSize: '0.85rem' }}>
                    {desc}
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
