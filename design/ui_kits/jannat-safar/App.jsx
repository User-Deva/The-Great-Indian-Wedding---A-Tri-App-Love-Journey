/* Jannat Safar · App
   Click-through: Login → Dashboard → Travel Quiz → Destinations → Bookings.
   Stage starts at WEDDING (Baraat Bliss) and flips to HONEYMOONING
   (black & purple, per design review) when a destination is picked. */

const JS_USERS = [
  { id: 'u-aarav', displayName: 'Aarav Mehta',  email: 'aarav@example.com',  partnerId: 'u-priya' },
  { id: 'u-priya', displayName: 'Priya Sharma', email: 'priya@example.com',  partnerId: 'u-aarav' },
];

const DESTS = [
  { id: 'maldives',     name: 'Maldives',          country: 'Maldives',     glyph: '🏝️', archetype: 'Beach Lovers',       whyPerfect: 'Crystal-clear waters and exclusive island resorts.', bestTime: 'Nov – Mar', budget: { min: 300000, max: 1000000 }, visa: 'none',         nights: 7 },
  { id: 'bali',         name: 'Bali',              country: 'Indonesia',    glyph: '🌺', archetype: 'Beach Lovers',       whyPerfect: 'Affordable tropical paradise with incredible food and spiritual experiences.', bestTime: 'Apr – Oct', budget: { min: 100000, max: 400000 }, visa: 'visa_on_arrival', nights: 8 },
  { id: 'kashmir',      name: 'Kashmir',           country: 'India',        glyph: '⛰️', archetype: 'Mountain Romantics', whyPerfect: 'Houseboats on Dal Lake and Mughal gardens.', bestTime: 'Apr – Sep', budget: { min: 80000, max: 300000 }, visa: 'none', nights: 6 },
  { id: 'switzerland',  name: 'Switzerland',       country: 'Switzerland',  glyph: '🏔️', archetype: 'Mountain Romantics', whyPerfect: 'The Alps, train rides, fairy-tale villages.',         bestTime: 'Jun – Sep', budget: { min: 500000, max: 1500000 }, visa: 'Schengen',  nights: 10 },
  { id: 'rajasthan',    name: 'Rajasthan',         country: 'India',        glyph: '🐪', archetype: 'Culture Explorers',  whyPerfect: 'Mughal history, golden deserts, palace hotels.',     bestTime: 'Oct – Mar', budget: { min: 60000, max: 300000 }, visa: 'none',      nights: 7 },
  { id: 'iceland',      name: 'Iceland',           country: 'Iceland',      glyph: '🌋', archetype: 'Adventure Seekers',  whyPerfect: 'Land of fire and ice. Glaciers, waterfalls, midnight sun.', bestTime: 'Jun – Aug', budget: { min: 400000, max: 1200000 }, visa: 'Schengen', nights: 8 },
  { id: 'dubai',        name: 'Dubai',             country: 'UAE',          glyph: '🏙️', archetype: 'Luxury Loungers',    whyPerfect: 'Luxury resorts, designer shopping, desert.',         bestTime: 'Oct – Apr', budget: { min: 300000, max: 1000000 }, visa: 'e_visa',  nights: 6 },
  { id: 'paris',        name: 'Paris',             country: 'France',       glyph: '🗼', archetype: 'Luxury Loungers',    whyPerfect: 'The City of Light. Romance, art, fashion, dining.',  bestTime: 'Apr – Jun', budget: { min: 400000, max: 1500000 }, visa: 'Schengen', nights: 7 },
  { id: 'andaman',      name: 'Andaman',           country: 'India',        glyph: '🐠', archetype: 'Budget Smart',       whyPerfect: 'India\'s own island paradise. No visa needed.',     bestTime: 'Oct – May', budget: { min: 80000, max: 300000 }, visa: 'none',     nights: 7 },
];

const STAGES = {
  WEDDING:      { name: 'Baraat Bliss',   colors: { primary: '#6A1429', secondary: '#FF8F00', accent: '#C0C0C0' }, motif: 'Elephants & flowers', vibe: 'Joyful, festive', label: 'Wedding Mode' },
  HONEYMOONING: { name: 'Honeymoon Haze', colors: { primary: '#0E0E0E', secondary: '#6B2D89', accent: '#C39BD3' }, motif: 'Lotus & waves',       vibe: 'Dreamy, luxurious', label: 'Honeymooning' },
};

const NAV = [
  { to: 'dashboard',     label: 'Dashboard',           emoji: '🏠' },
  { to: 'quiz',          label: 'Travel Personality',  emoji: '🧭' },
  { to: 'destinations',  label: 'Destinations',        emoji: '🌍' },
  { to: 'bookings',      label: 'Flights & Hotels',    emoji: '✈️' },
  { to: 'story',         label: 'Our Story',           emoji: '📖' },
];

function JannatApp() {
  const [user, setUser] = React.useState(null);
  const [page, setPage] = React.useState('dashboard');
  const [stage, setStage] = React.useState('WEDDING');
  const [archetype, setArchetype] = React.useState(null);
  const [picked, setPicked] = React.useState(null);
  const [bookings, setBookings] = React.useState({ flight: false, hotel: false });
  const [story, setStory] = React.useState([]);

  const theme = STAGES[stage];

  function handlePick(dest) {
    setPicked(dest);
    setStage('HONEYMOONING');
    setStory(s => [...s, { id: `e-${Date.now()}`, emoji: '✈️', title: `Destination: ${dest.name}`, description: `${dest.archetype}. ${dest.nights} nights. Budget ₹${(dest.budget.min/100000).toFixed(1)}L – ${(dest.budget.max/100000).toFixed(1)}L.`, timestamp: new Date().toISOString() }]);
  }
  function book(type) {
    setBookings(b => ({ ...b, [type]: true }));
    setStory(s => [...s, { id: `e-${Date.now()}-${type}`, emoji: type === 'flight' ? '✈️' : '🏨', title: `${type === 'flight' ? 'Flight' : 'Hotel'} booked`, description: `Reference J${Math.floor(Math.random() * 90000 + 10000)}.`, timestamp: new Date().toISOString() }]);
  }

  if (!user) {
    return React.createElement(ThemeProvider, { value: theme },
      React.createElement(LoginScreen, {
        appEmoji: '✈️', appName: 'Jannat Safar', appTagline: 'Where your paradise begins',
        users: JS_USERS, onSignIn: u => setUser(u),
      }),
    );
  }

  const recommended = archetype
    ? DESTS.filter(d => d.archetype === archetype)
    : DESTS;

  let body;
  if (page === 'dashboard') body = React.createElement(JannatDashboard, { picked, archetype, bookings, story, onNav: setPage });
  else if (page === 'quiz') body = React.createElement(JannatQuiz, { onComplete: a => { setArchetype(a); setPage('destinations'); } });
  else if (page === 'destinations') body = React.createElement(JannatDestinations, { destinations: recommended, archetype, picked, onPick: handlePick });
  else if (page === 'bookings') body = React.createElement(JannatBookings, { picked, bookings, onBook: book });
  else if (page === 'story') body = React.createElement(StoryTimeline, { events: story });

  return React.createElement(ThemeProvider, { value: theme },
    React.createElement(AppShell, {
      appName: 'Jannat Safar', appEmoji: '✈️', tagline: 'Honeymoon planner · The escape, perfected',
      navItems: NAV, activeNav: page, onNav: setPage,
      stageLabel: theme.label, user, onSignOut: () => { setUser(null); setStage('WEDDING'); setPage('dashboard'); setArchetype(null); setPicked(null); setBookings({}); setStory([]); },
    }, body),
  );
}

function JannatDashboard({ picked, archetype, bookings, story, onNav }) {
  const theme = useTheme();
  return React.createElement('div', null,
    React.createElement(Section, {
      title: 'Paradise plans',
      subtitle: picked ? `Your honeymoon is taking shape — ${picked.name} awaits.` : "Let's find your kind of paradise.",
    },
      React.createElement(Card, { accent: true },
        picked
          ? React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' } },
              React.createElement('div', null,
                React.createElement(Badge, { tone: 'info' }, `${picked.nights} nights`),
                React.createElement('h3', { style: { margin: '0.5rem 0 0.25rem', fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: theme.colors.primary } }, picked.name),
                React.createElement('div', { style: { fontSize: '0.92rem', color: 'rgba(0,0,0,0.65)' } }, `${picked.archetype} · ${picked.country}`),
                React.createElement('div', { style: { marginTop: '0.25rem', fontSize: '0.92rem', color: 'rgba(0,0,0,0.65)' } },
                  `Budget: ₹${picked.budget.min.toLocaleString('en-IN')} – ₹${picked.budget.max.toLocaleString('en-IN')}`),
              ),
              React.createElement(Button, { variant: 'primary', size: 'lg', onClick: () => onNav('bookings') }, 'Book flights & hotels →'),
            )
          : React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' } },
              React.createElement('div', null,
                React.createElement('h3', { style: { margin: '0 0 0.25rem', fontFamily: 'var(--font-display)', fontSize: '1.4rem' } }, 'No destination yet.'),
                React.createElement('p', { style: { margin: 0, color: 'rgba(0,0,0,0.6)' } }, 'Take the quiz or pick directly from the destinations gallery.'),
              ),
              React.createElement('div', { style: { display: 'flex', gap: '0.5rem' } },
                React.createElement(Button, { variant: 'secondary', onClick: () => onNav('quiz') }, 'Take quiz'),
                React.createElement(Button, { variant: 'primary', size: 'lg', onClick: () => onNav('destinations') }, 'Browse destinations →'),
              ),
            ),
      ),
    ),
    React.createElement(Section, { title: 'Bookings' },
      Object.values(bookings).every(v => !v)
        ? React.createElement(EmptyState, { emoji: '🎟️', title: 'No bookings yet', description: 'Lock in a flight and a hotel to confirm honeymoon mode.' })
        : React.createElement(Grid, { min: 280 },
            bookings.flight && bookingTile('✈️ Flight', 'Mumbai → Maldives · JS24891', theme),
            bookings.hotel  && bookingTile('🏨 Hotel',  'Cocoon, Maafushi · JS33102',  theme),
          ),
    ),
    story.length > 0 && React.createElement(Section, { title: 'Recent milestones' },
      React.createElement(StoryTimeline, { events: story.slice(-3), compact: true }),
    ),
  );
}

function bookingTile(title, desc, theme) {
  return React.createElement(Card, { accent: true },
    React.createElement(Badge, { tone: 'positive' }, '✓ Confirmed'),
    React.createElement('div', { style: { marginTop: '0.5rem', fontWeight: 700 } }, title),
    React.createElement('div', { style: { marginTop: '0.5rem', fontSize: '0.92rem', color: 'rgba(0,0,0,0.65)' } }, desc),
  );
}

function JannatQuiz({ onComplete }) {
  return React.createElement(Section, { title: 'Travel personality', subtitle: 'Three questions. We\'ll figure out your archetype and recommend matching destinations.' },
    React.createElement(QuizCard, { onComplete }),
  );
}

function JannatDestinations({ destinations, archetype, picked, onPick }) {
  return React.createElement(Section, {
    title: archetype ? `Destinations for ${archetype}` : 'All destinations',
    subtitle: archetype ? 'Filtered to your travel personality. Pick one to lock it in.' : 'Browse twelve hand-picked honeymoon destinations.',
  },
    React.createElement(Grid, { min: 320 },
      destinations.map(d => React.createElement(DestinationCard, {
        key: d.id, destination: d,
        picked: picked?.id === d.id,
        onPick: () => onPick(d),
      })),
    ),
  );
}

function JannatBookings({ picked, bookings, onBook }) {
  const theme = useTheme();
  if (!picked) {
    return React.createElement(EmptyState, {
      emoji: '🛬', title: 'Pick a destination first',
      description: 'Pick a destination from the gallery, then flights and hotels unlock here.',
    });
  }
  return React.createElement(Section, { title: 'Flights & hotels', subtitle: `For ${picked.name} · ${picked.nights} nights.` },
    React.createElement(Grid, { min: 320 },
      React.createElement(Card, { accent: true },
        React.createElement('div', { style: { fontSize: '2rem', marginBottom: 6 } }, '✈️'),
        React.createElement('h3', { style: { margin: '0 0 0.25rem', fontFamily: 'var(--font-display)', color: theme.colors.primary } }, 'Round-trip flight'),
        React.createElement('p', { style: { margin: '0 0 0.75rem', color: 'rgba(0,0,0,0.65)', fontSize: '0.92rem' } }, `Mumbai → ${picked.name}, premium economy. Indigo non-stop on the way out.`),
        React.createElement('div', { style: { fontWeight: 700, color: theme.colors.primary, marginBottom: '0.5rem' } }, '₹1,84,000 for two'),
        bookings.flight
          ? React.createElement(Badge, { tone: 'positive' }, '✓ Booked')
          : React.createElement(Button, { variant: 'primary', onClick: () => onBook('flight') }, 'Confirm flight'),
      ),
      React.createElement(Card, { accent: true },
        React.createElement('div', { style: { fontSize: '2rem', marginBottom: 6 } }, '🏨'),
        React.createElement('h3', { style: { margin: '0 0 0.25rem', fontFamily: 'var(--font-display)', color: theme.colors.primary } }, 'Hotel'),
        React.createElement('p', { style: { margin: '0 0 0.75rem', color: 'rgba(0,0,0,0.65)', fontSize: '0.92rem' } }, `Overwater villa, ${picked.nights} nights, breakfast included. Beach-front, private deck.`),
        React.createElement('div', { style: { fontWeight: 700, color: theme.colors.primary, marginBottom: '0.5rem' } }, `₹${(picked.budget.min * 0.6 / 1000).toFixed(0)},000 / night`),
        bookings.hotel
          ? React.createElement(Badge, { tone: 'positive' }, '✓ Booked')
          : React.createElement(Button, { variant: 'primary', onClick: () => onBook('hotel') }, 'Confirm hotel'),
      ),
    ),
  );
}

window.JannatApp = JannatApp;
