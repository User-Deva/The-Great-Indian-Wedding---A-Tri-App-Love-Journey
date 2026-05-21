import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell, LoginScreen, useAppBootstrap } from '@great-indian-wedding/ui'
import { DashboardPage } from './pages/DashboardPage'
import { ProfilePage } from './pages/ProfilePage'
import { MatchesPage } from './pages/MatchesPage'
import { DatesPage } from './pages/DatesPage'
import { StoryPage } from './pages/StoryPage'

const NAV = [
  { to: '/', label: 'Dashboard', emoji: '🏠' },
  { to: '/profile', label: 'Profile', emoji: '👤' },
  { to: '/matches', label: 'Matches', emoji: '💕' },
  { to: '/dates', label: 'Pehli Mulaqat', emoji: '☕' },
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
        appEmoji="✨"
        appName="Rishta"
        appTagline="Where destinies meet over chai"
      />
    )
  }

  return (
    <AppShell
      appKey="rishta"
      appName="Rishta"
      appEmoji="✨"
      tagline="The Matchmaker · Where your love story begins"
      navItems={NAV}
    >
      <Routes>
        <Route path="/" element={<DashboardPage user={user} couple={couple} onChange={refresh} />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/matches" element={<MatchesPage couple={couple} onChange={refresh} />} />
        <Route path="/dates" element={<DatesPage user={user} couple={couple} onChange={refresh} />} />
        <Route path="/story" element={<StoryPage couple={couple} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}

export default App
