import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell, LoginScreen, useAppBootstrap } from '@great-indian-wedding/ui'
import { DashboardPage } from './pages/DashboardPage'
import { QuizPage } from './pages/QuizPage'
import { DestinationsPage } from './pages/DestinationsPage'
import { FlightsPage } from './pages/FlightsPage'
import { HotelsPage } from './pages/HotelsPage'
import { StoryPage } from './pages/StoryPage'

const NAV = [
  { to: '/', label: 'Dashboard', emoji: '🏠' },
  { to: '/quiz', label: 'Travel Personality', emoji: '🧭' },
  { to: '/destinations', label: 'Destinations', emoji: '🌍' },
  { to: '/flights', label: 'Flights', emoji: '✈️' },
  { to: '/hotels', label: 'Hotels', emoji: '🏨' },
  { to: '/story', label: 'Our Story', emoji: '📖' },
]

function App() {
  const { isReady, user, couple, refresh } = useAppBootstrap()

  if (!isReady) {
    return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading...</div>
  }

  if (!user || !couple) {
    return (
      <LoginScreen
        appEmoji="✈️"
        appName="Jannat Safar"
        appTagline="Where your paradise begins"
      />
    )
  }

  return (
    <AppShell
      appKey="jannat"
      appName="Jannat Safar"
      appEmoji="✈️"
      tagline="Honeymoon planner · The escape, perfected"
      navItems={NAV}
    >
      <Routes>
        <Route path="/" element={<DashboardPage user={user} couple={couple} onChange={refresh} />} />
        <Route path="/quiz" element={<QuizPage couple={couple} onChange={refresh} />} />
        <Route path="/destinations" element={<DestinationsPage couple={couple} onChange={refresh} />} />
        <Route path="/flights" element={<FlightsPage couple={couple} onChange={refresh} />} />
        <Route path="/hotels" element={<HotelsPage couple={couple} onChange={refresh} />} />
        <Route path="/story" element={<StoryPage couple={couple} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}

export default App
