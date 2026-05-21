import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell, LoginScreen, useAppBootstrap } from '@great-indian-wedding/ui'
import { DashboardPage } from './pages/DashboardPage'
import { SetupPage } from './pages/SetupPage'
import { VendorsPage } from './pages/VendorsPage'
import { BudgetPage } from './pages/BudgetPage'
import { StoryPage } from './pages/StoryPage'

const NAV = [
  { to: '/', label: 'Dashboard', emoji: '🏠' },
  { to: '/setup', label: 'Wedding Setup', emoji: '🎊' },
  { to: '/vendors', label: 'Vendors', emoji: '💼' },
  { to: '/budget', label: 'Budget', emoji: '💰' },
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
        appEmoji="💍"
        appName="Shaadi Sajao"
        appTagline="Your wedding, beautifully orchestrated"
      />
    )
  }

  return (
    <AppShell
      appKey="shaadi"
      appName="Shaadi Sajao"
      appEmoji="💍"
      tagline="Powered by Varmala · Your wedding concierge"
      navItems={NAV}
    >
      <Routes>
        <Route path="/" element={<DashboardPage user={user} couple={couple} onChange={refresh} />} />
        <Route path="/setup" element={<SetupPage user={user} couple={couple} onChange={refresh} />} />
        <Route path="/vendors" element={<VendorsPage user={user} couple={couple} onChange={refresh} />} />
        <Route path="/budget" element={<BudgetPage couple={couple} />} />
        <Route path="/story" element={<StoryPage couple={couple} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}

export default App
