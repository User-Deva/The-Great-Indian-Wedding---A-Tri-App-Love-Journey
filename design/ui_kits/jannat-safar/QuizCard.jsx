/* Jannat Safar · QuizCard
   The travel-personality quiz that funnels users into a TravelerArchetype.
   Three multi-choice questions, then we recommend the best archetype. */

const QUIZ_Q = [
  { id: 'q1', prompt: 'A free Saturday morning is best spent…',
    options: [
      { id: 'a', label: 'Reading on a beach with my feet in the sand', archetype: 'Beach Lovers' },
      { id: 'b', label: 'A long walk through a forest or hill town',   archetype: 'Mountain Romantics' },
      { id: 'c', label: 'Wandering a heritage neighbourhood with a guide', archetype: 'Culture Explorers' },
      { id: 'd', label: 'Trying a new water sport or hike',            archetype: 'Adventure Seekers' },
    ] },
  { id: 'q2', prompt: 'The dream evening looks like…',
    options: [
      { id: 'a', label: 'Sunset cocktails on an overwater deck',        archetype: 'Luxury Loungers' },
      { id: 'b', label: 'A bonfire under stars',                        archetype: 'Adventure Seekers' },
      { id: 'c', label: 'A 7-course tasting at a heritage hotel',       archetype: 'Luxury Loungers' },
      { id: 'd', label: 'A jazz bar in a 200-year-old courtyard',       archetype: 'Culture Explorers' },
    ] },
  { id: 'q3', prompt: 'For our honeymoon budget we want…',
    options: [
      { id: 'a', label: 'Money no object — go big',                      archetype: 'Luxury Loungers' },
      { id: 'b', label: 'Maximize beauty per rupee',                     archetype: 'Budget Smart' },
      { id: 'c', label: 'Splurge on stays, save on flights',             archetype: 'Mountain Romantics' },
      { id: 'd', label: 'Splurge on experiences, save on stays',         archetype: 'Adventure Seekers' },
    ] },
];

function QuizCard({ onComplete }) {
  const theme = useTheme();
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  const q = QUIZ_Q[step];

  function choose(option) {
    const next = [...answers, option.archetype];
    setAnswers(next);
    if (step === QUIZ_Q.length - 1) {
      // tally
      const counts = {};
      next.forEach(a => counts[a] = (counts[a] || 0) + 1);
      const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      onComplete(top);
    } else {
      setStep(step + 1);
    }
  }

  return React.createElement(Card, null,
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' } },
      React.createElement(Badge, { tone: 'info' }, `Question ${step + 1} of ${QUIZ_Q.length}`),
      React.createElement('span', { style: { fontSize: '0.85rem', color: 'rgba(0,0,0,0.5)' } }, 'Travel Personality Quiz'),
    ),
    React.createElement('h3', { style: { margin: '0.25rem 0 1rem', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.4rem', color: theme.colors.primary } }, q.prompt),
    React.createElement('div', { style: { display: 'grid', gap: '0.6rem' } },
      q.options.map(opt => React.createElement('button', {
        key: opt.id,
        onClick: () => choose(opt),
        style: {
          textAlign: 'left', padding: '0.85rem 1rem', borderRadius: 10,
          background: '#fff', border: `1px solid rgba(0,0,0,0.08)`,
          fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'var(--font-body)',
          transition: 'all 120ms ease',
        },
        onMouseEnter: e => { e.currentTarget.style.borderColor = theme.colors.primary; e.currentTarget.style.background = theme.colors.accent; },
        onMouseLeave: e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; e.currentTarget.style.background = '#fff'; },
      }, opt.label)),
    ),
  );
}

window.QuizCard = QuizCard;
window.QUIZ_Q = QUIZ_Q;
