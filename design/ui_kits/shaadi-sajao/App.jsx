/* Shaadi Sajao · App
   Click-through: Dashboard (locked until DATING) → Setup → Vendors → Budget.
   Theme starts at DATING (black & gold) and advances to WEDDING when
   the first vendor deposit is paid. */

const SS_USERS = [
  { id: 'u-aarav', displayName: 'Aarav Mehta',  email: 'aarav@example.com',  partnerId: 'u-priya', emoji: '🪷' },
  { id: 'u-priya', displayName: 'Priya Sharma', email: 'priya@example.com',  partnerId: 'u-aarav', emoji: '🌸' },
];

const VENDORS = [
  { id: 'v-1', name: 'Mehndi by Aanchal',    city: 'Jaipur',     category: 'Bridal mehendi',  rating: 4.9, reviewCount: 312, priceRange: '₹₹₹',  description: 'Intricate floral designs, 25+ years experience. Books up four months out.', varmalVerified: true, deposit: 18000, alloc: 'mehendi' },
  { id: 'v-2', name: 'Sutradhar Events',     city: 'Jaipur',     category: 'Wedding planner', rating: 4.8, reviewCount: 86,  priceRange: '₹₹₹₹', description: 'Full-service production. Handles muhurat, mandap, music, family liaison.', varmalVerified: true, deposit: 120000, alloc: 'venue' },
  { id: 'v-3', name: 'Lassi & Lights',       city: 'Delhi',      category: 'Decor & flowers', rating: 4.6, reviewCount: 142, priceRange: '₹₹₹',  description: 'Marigold-and-jasmine maximalism. Sustainable, locally-sourced flowers.', varmalVerified: true, deposit: 55000,  alloc: 'decor' },
  { id: 'v-4', name: 'Ravi Verma Studio',    city: 'Bengaluru',  category: 'Photography',     rating: 4.7, reviewCount: 91,  priceRange: '₹₹₹',  description: 'Documentary-style. Couples that hate posing love them.', varmalVerified: true, deposit: 35000,  alloc: 'photography' },
  { id: 'v-5', name: 'Anokha Caterers',      city: 'Jaipur',     category: 'Catering',        rating: 4.5, reviewCount: 208, priceRange: '₹₹',   description: 'Rajasthani thalis + a chaat live counter that runs the entire reception.', varmalVerified: false, deposit: 84000, alloc: 'catering' },
];

const STAGES = {
  DATING:  { name: 'Shaadi Season', colors: { primary: '#0E0E0E', secondary: '#D4AF37', accent: '#FFF8E1' }, motif: 'Paisley & diyas', vibe: 'Celebratory, grand', label: 'Dating' },
  WEDDING: { name: 'Baraat Bliss', colors: { primary: '#6A1429', secondary: '#FF8F00', accent: '#C0C0C0' }, motif: 'Elephants & flowers', vibe: 'Joyful, festive', label: 'Wedding Mode' },
};

const NAV = [
  { to: 'dashboard', label: 'Dashboard',     emoji: '🏠' },
  { to: 'setup',     label: 'Wedding Setup', emoji: '🎊' },
  { to: 'vendors',   label: 'Vendors',       emoji: '💼' },
  { to: 'budget',    label: 'Budget',        emoji: '💰' },
  { to: 'story',     label: 'Our Story',     emoji: '📖' },
];

function ShaadiApp() {
  const [user, setUser] = React.useState(null);
  const [page, setPage] = React.useState('dashboard');
  const [stage, setStage] = React.useState('DATING');
  const [wedding, setWedding] = React.useState({ venue: 'Rambagh Palace, Jaipur', date: '2026-11-27', guests: 350, packageType: 'Royal Heritage', budget: 4800000 });
  const [bookings, setBookings] = React.useState({});  // {vendorId: true}
  const [story, setStory] = React.useState([
    { id: 'e-0', emoji: '☕', title: 'First date rated 5★', description: 'Café Latitude 28, Mehrauli.', timestamp: new Date(Date.now() - 6 * 86400000).toISOString() },
    { id: 'e-1', emoji: '🎊', title: 'Wedding date locked', description: 'Saturday, 27 Nov 2026 · Rambagh Palace · 350 guests.', timestamp: new Date(Date.now() - 2 * 86400000).toISOString() },
  ]);

  const theme = STAGES[stage];

  function handleBook(vendor) {
    setBookings(b => ({ ...b, [vendor.id]: true }));
    const newStory = { id: `e-${Date.now()}`, emoji: '💼', title: `Booked ${vendor.name}`, description: `${vendor.category}. Deposit ₹${vendor.deposit.toLocaleString('en-IN')} confirmed.`, timestamp: new Date().toISOString() };
    setStory(s => [...s, newStory]);
    if (stage === 'DATING') {
      setStage('WEDDING');
      setStory(s => [...s, { id: `e-${Date.now()}-w`, emoji: '👑', title: 'Welcome to wedding mode', description: 'First vendor deposit paid — the whole ecosystem just shifted to Baraat Bliss.', timestamp: new Date().toISOString() }]);
    }
  }

  if (!user) {
    return React.createElement(ThemeProvider, { value: theme },
      React.createElement(LoginScreen, {
        appEmoji: '💍', appName: 'Shaadi Sajao', appTagline: 'Your wedding, beautifully orchestrated',
        users: SS_USERS, onSignIn: u => setUser(u),
      }),
    );
  }

  // Compute spend
  const spentByCat = {};
  Object.keys(bookings).forEach(vid => {
    const v = VENDORS.find(x => x.id === vid);
    if (v) spentByCat[v.alloc] = (spentByCat[v.alloc] || 0) + v.deposit;
  });
  const totalSpent = Object.values(spentByCat).reduce((a, b) => a + b, 0);

  let body;
  if (page === 'dashboard') body = React.createElement(ShaadiDashboard, { wedding, bookings, totalSpent, story, onNav: setPage });
  else if (page === 'setup')   body = React.createElement(ShaadiSetup, { wedding });
  else if (page === 'vendors') body = React.createElement(ShaadiVendors, { vendors: VENDORS, bookings, onBook: handleBook });
  else if (page === 'budget')  body = React.createElement(ShaadiBudget, { totalBudget: wedding.budget, spent: spentByCat, totalSpent });
  else if (page === 'story')   body = React.createElement(StoryTimeline, { events: story });

  return React.createElement(ThemeProvider, { value: theme },
    React.createElement(AppShell, {
      appName: 'Shaadi Sajao', appEmoji: '💍', tagline: 'Powered by Varmala · Your wedding concierge',
      navItems: NAV, activeNav: page, onNav: setPage,
      stageLabel: theme.label, user, onSignOut: () => { setUser(null); setStage('DATING'); setPage('dashboard'); setBookings({}); },
    }, body),
  );
}

function ShaadiDashboard({ wedding, bookings, totalSpent, story, onNav }) {
  const theme = useTheme();
  const confirmedCount = Object.keys(bookings).length;
  return React.createElement('div', null,
    React.createElement(Section, {
      title: 'Welcome to wedding mode',
      subtitle: `Your wedding is officially in planning. Powered by Varmala.`,
    },
      React.createElement(Card, { accent: true },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' } },
          React.createElement('div', null,
            React.createElement(Badge, { tone: 'info' }, wedding.packageType),
            React.createElement('h3', { style: { margin: '0.5rem 0 0.25rem', fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: theme.colors.primary } }, wedding.venue),
            React.createElement('div', { style: { fontSize: '0.95rem', color: 'rgba(0,0,0,0.7)' } },
              `${new Date(wedding.date).toLocaleDateString('en-IN', { dateStyle: 'full' })} · ${wedding.guests} guests`),
          ),
          React.createElement(WeddingCountdown, { target: wedding.date }),
        ),
      ),
    ),
    React.createElement(Section, { title: 'At a glance' },
      React.createElement(Grid, { min: 200 },
        statSS('Total budget',    `₹${(wedding.budget / 100000).toFixed(1)}L`, theme),
        statSS('Deposits paid',   `₹${(totalSpent / 100000).toFixed(2)}L`, theme),
        statSS('Vendors booked',  confirmedCount, theme),
        statSS('Days to wedding', Math.max(0, Math.floor((new Date(wedding.date) - Date.now()) / 86400000)), theme),
      ),
    ),
    React.createElement(Section, { title: 'Quick jump' },
      React.createElement(Grid, { min: 240 },
        actionCard('🎊', 'Wedding setup',  'Date, venue, religion, package, total budget.', () => onNav('setup')),
        actionCard('💼', 'Vendor directory', 'Browse Varmala-vetted vendors and book with a deposit.', () => onNav('vendors')),
        actionCard('💰', 'Budget tracker', 'Category-wise allocation, deposits, remaining headroom.', () => onNav('budget')),
        actionCard('📖', 'Our story',      'Every milestone the journey has written so far.', () => onNav('story')),
      ),
    ),
    React.createElement(Section, { title: 'Recent milestones' },
      React.createElement(StoryTimeline, { events: story.slice(-3), compact: true }),
    ),
  );
}

function statSS(label, value, theme) {
  return React.createElement(Card, null,
    React.createElement('div', { style: { fontSize: '0.85rem', color: 'rgba(0,0,0,0.55)' } }, label),
    React.createElement('div', { style: { fontSize: '1.6rem', fontWeight: 700, color: theme.colors.primary, fontFamily: 'var(--font-display)' } }, value),
  );
}

function actionCard(emoji, title, description, onClick) {
  return React.createElement(Card, { onClick },
    React.createElement('div', { style: { fontSize: '1.8rem', marginBottom: '0.4rem' } }, emoji),
    React.createElement('div', { style: { fontWeight: 700, marginBottom: '0.25rem' } }, title),
    React.createElement('p', { style: { margin: 0, fontSize: '0.9rem', color: 'rgba(0,0,0,0.65)' } }, description),
  );
}

function ShaadiSetup({ wedding }) {
  const theme = useTheme();
  return React.createElement(Section, { title: 'Wedding setup', subtitle: 'The five things every wedding needs locked in first.' },
    React.createElement(Card, null,
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' } },
        ['Wedding date', new Date(wedding.date).toLocaleDateString('en-IN', { dateStyle: 'full' })],
        ['Venue', wedding.venue],
        ['Religion / rituals', 'Hindu (Marwari) + Sangeet + Reception'],
        ['Package', `${wedding.packageType} (4-day)`],
        ['Total budget', `₹${wedding.budget.toLocaleString('en-IN')}`],
        ['Guests', `${wedding.guests} (350 expected · 380 invited)`],
      ).reduce((acc, _, i, arr) => {
        if (i % 2 !== 0) return acc;
        const [label, val] = arr[i];
        acc.push(React.createElement('div', { key: i, style: { padding: '0.85rem', background: '#fafafa', borderRadius: 10 } },
          React.createElement('div', { style: { fontSize: '0.78rem', color: 'rgba(0,0,0,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 } }, label),
          React.createElement('div', { style: { fontWeight: 700, color: theme.colors.primary, fontSize: '0.98rem' } }, val),
        ));
        return acc;
      }, []),
    ),
    React.createElement('div', { style: { marginTop: '1rem', display: 'flex', gap: '0.5rem' } },
      React.createElement(Button, { variant: 'secondary' }, '✎ Edit setup'),
      React.createElement(Button, { variant: 'ghost' }, '👨‍👩‍👧 Family liaison'),
    ),
  );
}

function ShaadiVendors({ vendors, bookings, onBook }) {
  return React.createElement(Section, {
    title: 'Vendor directory',
    subtitle: 'Varmala-vetted decorators, caterers, photographers and more. Book with a single deposit — we hold the contract.',
  },
    React.createElement(Grid, { min: 380 },
      vendors.map(v => React.createElement(VendorCard, { key: v.id, vendor: { ...v, booked: !!bookings[v.id] }, onBook: () => onBook(v) })),
    ),
  );
}

function ShaadiBudget({ totalBudget, spent, totalSpent }) {
  return React.createElement(Section, { title: 'Budget tracker', subtitle: `${((totalSpent / totalBudget) * 100).toFixed(1)}% of the budget already committed.` },
    React.createElement(BudgetTracker, { totalBudget, spent }),
  );
}

window.ShaadiApp = ShaadiApp;
