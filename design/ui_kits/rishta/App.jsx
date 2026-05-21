/* Rishta · App
   Click-through prototype: Login → Dashboard → Matches → Dates.
   Theme advances through SEEKING → MATCHED → DATE_SET as the user
   interacts (interest expressed → date scheduled). */

const RISHTA_USERS = [
  { id: 'u-aarav', displayName: 'Aarav Mehta',  email: 'aarav@example.com',  partnerId: 'u-priya', emoji: '🪷' },
  { id: 'u-priya', displayName: 'Priya Sharma', email: 'priya@example.com',  partnerId: 'u-aarav', emoji: '🌸' },
];

const PROFILES = {
  'u-aarav': { firstName: 'Aarav', lastName: 'Mehta',  emoji: '🪷', profession: 'Product designer', city: 'Bengaluru', bio: 'Filter coffee, fountain pens, and the kind of road trip that ends in a small dhaba. Looking for someone who laughs easily.', kundaliType: 'manglik_partial' },
  'u-priya': { firstName: 'Priya', lastName: 'Sharma', emoji: '🌸', profession: 'Chartered accountant', city: 'Delhi', bio: 'Half-marathoner, terrible singer, devoted to my dadi\'s rajma. Believe in slow love and good chai.', kundaliType: 'non_manglik' },
};

const MATCHES = [
  { id: 'm-1', name: 'Priya Sharma',  age: 28, emoji: '🌸', profession: 'Chartered accountant', city: 'Delhi',     compatibilityScore: 92, gunaMilanScore: 28, photoTint: 'linear-gradient(135deg, #F4A7B9, #F7E7CE)', bio: '"Looking for someone who laughs at my dad jokes and still calls me brilliant."' },
  { id: 'm-2', name: 'Diya Iyer',     age: 30, emoji: '✨', profession: 'Pediatric resident',    city: 'Mumbai',    compatibilityScore: 74, gunaMilanScore: 22, photoTint: 'linear-gradient(135deg, #8FAF7E, #D4AF37)', bio: '"Filter coffee and book stores in Bandra. No small talk, only big ideas."' },
  { id: 'm-3', name: 'Naina Kapoor',  age: 27, emoji: '🌺', profession: 'Architect',             city: 'Bengaluru', compatibilityScore: 58, gunaMilanScore: 16, photoTint: 'linear-gradient(135deg, #C2185B, #FFF8E1)', bio: '"Looking for travel-buddy energy. We must love airports more than home."' },
];

const VENUES = [
  { id: 'v-1', name: 'Café Latitude 28',  type: 'cafe',      address: 'Mehrauli, New Delhi', budgetEstimate: 2000, dressCode: 'Smart casual',
    conversationStarters: ['What was the last book that surprised you?', 'If you could keep one Indian street food in your life forever, which?', 'Where do you go when you need to think?'] },
  { id: 'v-2', name: 'Humayun\'s Tomb',   type: 'heritage',  address: 'Nizamuddin, New Delhi', budgetEstimate: 1500, dressCode: 'Comfortable walking',
    conversationStarters: ['What\'s the oldest place you\'ve loved?', 'Tell me about a story your dadi told you as a kid.', 'Mughal gardens or modern parks?'] },
  { id: 'v-3', name: 'Sunder Nursery',    type: 'garden',    address: 'Nizamuddin East, New Delhi', budgetEstimate: 800, dressCode: 'Cotton + comfortable',
    conversationStarters: ['What\'s your favourite season in this city?', 'If you had an afternoon and no plans, what would you do?', 'What\'s growing in your kitchen / balcony right now?'] },
];

const STAGE_DETAILS = {
  SEEKING:  { name: 'Mehendi Night',   colors: { primary: '#0E0E0E', secondary: '#FFF8E1', accent: '#D4AF37' }, motif: 'Gold-leaf henna', vibe: 'Hopeful, formal', label: 'Seeking' },
  MATCHED:  { name: 'Gulabi Romance',  colors: { primary: '#F4A7B9', secondary: '#F8D5CC', accent: '#F7E7CE' }, motif: 'Marigold garlands', vibe: 'Excitement, butterflies', label: 'Matched' },
  DATE_SET: { name: 'Jasmine Evenings',colors: { primary: '#C2185B', secondary: '#FF8F00', accent: '#FFF8E1' }, motif: 'Jasmine vines',     vibe: 'Romantic, warm', label: 'Date Planned' },
};

const NAV = [
  { to: 'dashboard', label: 'Dashboard',     emoji: '🏠' },
  { to: 'profile',   label: 'Profile',       emoji: '👤' },
  { to: 'matches',   label: 'Matches',       emoji: '💕' },
  { to: 'dates',     label: 'Pehli Mulaqat', emoji: '☕' },
  { to: 'story',     label: 'Our Story',     emoji: '📖' },
];

function RishtaApp() {
  const [user, setUser] = React.useState(null);
  const [page, setPage] = React.useState('dashboard');
  const [stage, setStage] = React.useState('SEEKING');
  const [matches, setMatches] = React.useState(MATCHES);
  const [interestedIds, setInterestedIds] = React.useState([]);
  const [scheduledVenue, setScheduledVenue] = React.useState(null);
  const [story, setStory] = React.useState([]);

  const theme = STAGE_DETAILS[stage];
  const profile = user ? PROFILES[user.id] : null;
  const partner = user ? PROFILES[user.partnerId] : null;

  function logMilestone(emoji, title, description) {
    setStory(s => [...s, { id: `e-${s.length}`, emoji, title, description, timestamp: new Date().toISOString() }]);
  }

  function handleInterest(matchId) {
    const m = matches.find(x => x.id === matchId);
    setInterestedIds(ids => [...ids, matchId]);
    if (matchId === 'm-1' && stage === 'SEEKING') {
      setStage('MATCHED');
      logMilestone('💞', `Matched with ${m.name}`, 'Both of you said yes. The journey begins.');
    }
  }
  function handlePass(matchId) {
    setMatches(arr => arr.filter(m => m.id !== matchId));
  }
  function handleSchedule(venue) {
    setScheduledVenue(venue);
    setStage('DATE_SET');
    logMilestone('☕', 'Pehli Mulaqat planned', `${venue.name}, ${venue.address}. Don't forget the conversation starters.`);
  }

  if (!user) {
    return React.createElement(ThemeProvider, { value: theme },
      React.createElement(LoginScreen, {
        appEmoji: '✨', appName: 'Rishta', appTagline: 'Where destinies meet over chai',
        users: RISHTA_USERS, onSignIn: u => setUser(u),
      }),
    );
  }

  let body;
  if (page === 'dashboard') body = React.createElement(RishtaDashboard, { profile, partner, stage, matches: interestedIds, story, onNav: setPage });
  else if (page === 'profile') body = React.createElement(RishtaProfile, { profile });
  else if (page === 'matches') body = React.createElement(RishtaMatches, { matches, interestedIds, onInterest: handleInterest, onPass: handlePass, stage });
  else if (page === 'dates') body = React.createElement(RishtaDates, { stage, scheduledVenue, venues: VENUES, onSchedule: handleSchedule });
  else if (page === 'story') body = React.createElement(StoryTimeline, { events: story });

  return React.createElement(ThemeProvider, { value: theme },
    React.createElement(AppShell, {
      appName: 'Rishta', appEmoji: '✨', tagline: 'The Matchmaker · Where your love story begins',
      navItems: NAV, activeNav: page, onNav: setPage,
      stageLabel: theme.label, user, onSignOut: () => { setUser(null); setStage('SEEKING'); setPage('dashboard'); setInterestedIds([]); setScheduledVenue(null); setStory([]); },
    }, body),
  );
}

// ── Pages ─────────────────────────────────────────────────
function RishtaDashboard({ profile, partner, stage, matches, story, onNav }) {
  const theme = useTheme();
  const guide = {
    SEEKING:  { headline: 'You are early in the journey. Next: find someone who finally feels right.', cta: 'Browse Matches', to: 'matches' },
    MATCHED:  { headline: 'You matched. Now pick a venue and lock the first date.', cta: 'Plan First Date', to: 'dates' },
    DATE_SET: { headline: 'First date is on the calendar. Come back and rate it after.', cta: 'View Our Story', to: 'story' },
  }[stage];
  return React.createElement('div', null,
    React.createElement(Section, {
      title: `Hi ${profile.firstName} 👋`,
      subtitle: "You're signed in as part of a couple. The whole tri-app journey adapts to where you are.",
    },
      React.createElement(Card, { accent: true },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' } },
          React.createElement('div', { style: { maxWidth: 560 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' } },
              React.createElement(Badge, { tone: 'info' }, `Current stage · ${stage.replace('_', ' ')}`),
              React.createElement(Badge, { tone: 'positive' }, `Theme · ${theme.name}`),
            ),
            React.createElement('h3', { style: { margin: '0.25rem 0 0.5rem', fontSize: '1.3rem', fontFamily: 'var(--font-display)', fontWeight: 600 } }, guide.headline),
            React.createElement('p', { style: { margin: 0, color: 'rgba(0,0,0,0.6)', fontSize: '0.95rem' } }, `${theme.vibe}. Motif: ${theme.motif.toLowerCase()}.`),
          ),
          React.createElement(Button, { variant: 'primary', size: 'lg', onClick: () => onNav(guide.to) }, `${guide.cta} →`),
        ),
      ),
    ),
    React.createElement(Section, { title: 'The two of you' },
      React.createElement(Grid, { min: 280 },
        React.createElement(ProfileCard, { profile }),
        React.createElement(ProfileCard, { profile: partner }),
      ),
    ),
    React.createElement(Section, { title: 'Quick stats' },
      React.createElement(Grid, { min: 200 },
        statCard('Matches viewed',   3, theme),
        statCard('Mutual interest', matches.length, theme),
        statCard('Story milestones', story.length, theme),
        statCard('Kundali type',     profile.kundaliType.replace('_', ' '), theme, true),
      ),
    ),
  );
}

function statCard(label, value, theme, small) {
  return React.createElement(Card, null,
    React.createElement('div', { style: { fontSize: '0.85rem', color: 'rgba(0,0,0,0.55)' } }, label),
    React.createElement('div', { style: { fontSize: small ? '1.15rem' : '1.8rem', fontWeight: 700, color: theme.colors.primary, fontFamily: small ? 'var(--font-body)' : 'var(--font-display)' } }, value),
  );
}

function RishtaProfile({ profile }) {
  return React.createElement(Section, { title: 'Your profile', subtitle: 'How you show up in others\' matches.' },
    React.createElement(Card, null,
      React.createElement(ProfileCard, { profile }),
      React.createElement('div', { style: { marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' } },
        React.createElement(Button, { variant: 'secondary' }, '✎ Edit bio'),
        React.createElement(Button, { variant: 'ghost' }, '🎙️ Record voice intro'),
      ),
    ),
  );
}

function RishtaMatches({ matches, interestedIds, onInterest, onPass, stage }) {
  return React.createElement(Section, {
    title: 'Your matches',
    subtitle: stage === 'SEEKING' ? 'Three new rishtas this week. Tap ❤️ on the one that lights you up.' : 'You\'ve expressed interest. Keep browsing or head to Pehli Mulaqat to plan.',
  },
    matches.length === 0
      ? React.createElement(EmptyState, { emoji: '🪷', title: 'No more rishtas right now', description: 'New matches are computed every Friday morning.' })
      : React.createElement(Grid, { min: 320 },
          matches.map(m => React.createElement(MatchCard, {
            key: m.id, match: m,
            onInterest: () => onInterest(m.id),
            onPass: () => onPass(m.id),
          })),
        ),
  );
}

function RishtaDates({ stage, scheduledVenue, venues, onSchedule }) {
  if (stage === 'SEEKING') {
    return React.createElement(EmptyState, {
      emoji: '☕', title: 'Pehli Mulaqat is locked until you match',
      description: 'Express interest on Matches, get a mutual yes, and the venues unlock.',
    });
  }
  if (scheduledVenue) {
    return React.createElement(Section, { title: 'Your first date is set 🎉' },
      React.createElement(Card, { accent: true },
        React.createElement('h3', { style: { margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.5rem' } }, scheduledVenue.name),
        React.createElement('p', { style: { margin: '0.5rem 0', color: 'rgba(0,0,0,0.65)' } }, `📍 ${scheduledVenue.address} · 👕 ${scheduledVenue.dressCode}`),
        React.createElement('p', { style: { fontStyle: 'italic', color: 'rgba(0,0,0,0.6)' } }, '✨ Have a good time. We\'ll be here when you get back.'),
      ),
    );
  }
  return React.createElement(Section, {
    title: 'Pehli Mulaqat',
    subtitle: 'Three Varmala-curated venues for your first meeting. Pick one — vibes matter.',
  },
    React.createElement(Grid, { min: 320 },
      venues.map(v => React.createElement(DateVenueCard, { key: v.id, venue: v, onSchedule })),
    ),
  );
}

window.RishtaApp = RishtaApp;
