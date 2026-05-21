# Jannat Safar · UI Kit ✈️

> *Honeymoon planner — Where paradise begins.*

App 3 of the ecosystem. Quizzes the couple on their travel personality, recommends destinations from a curated set, and books flights + hotels with itinerary planning.

## Run it

Open `index.html` in any browser. Sign in — Jannat opens at the `WEDDING` stage (Baraat Bliss, maroon + marigold).

1. **Dashboard** — paradise-plans hero card, empty bookings list, "Take the quiz or pick directly" CTA.
2. **Travel Personality quiz** — three questions, each scored against a `TravelerArchetype`. The most-picked archetype wins and filters the destinations gallery.
3. **Destinations** — 9 destinations across 6 archetypes (Beach Lovers · Mountain Romantics · Culture Explorers · Adventure Seekers · Luxury Loungers · Budget Smart), each rendered with the archetype-tinted image tile. Tap **Pick this destination** → stage flips to `HONEYMOONING` and the entire UI cross-fades to *Honeymoon Haze* (the new black-and-purple palette).
4. **Flights & Hotels** — once a destination is picked, two booking cards unlock. Tap **Confirm** on each to write milestones.
5. **Our Story** — milestones appear as you go.

## What's in the kit

| File | Role |
|---|---|
| `App.jsx` | Top-level state machine + 9 seeded destinations + archetype filtering |
| `DestinationCard.jsx` | Archetype-tinted image tile + budget + visa + "Pick" toggle |
| `QuizCard.jsx` | Multi-step quiz; tallies answers and returns the dominant archetype |
| `../_shared/primitives.jsx` | Shared primitives |

## Theme journey demonstrated

| Action | New stage | Theme |
|---|---|---|
| Start | `WEDDING` | Baraat Bliss (maroon + marigold + silver) |
| Pick a destination | `HONEYMOONING` | Honeymoon Haze (black + purple + lavender) |

## Faithful to source

- The `DestinationCard` is a port of `apps/jannat-safar/src/components/DestinationCard.tsx`. Archetype → colour mapping matches the source `ARCHETYPE_COLOR` palette.
- Destinations are reduced from the `HONEYMOON_DESTINATIONS[]` constant in `apps/jannat-safar/src/utils/destinations.ts` — same archetypes, same currencies, same `bestTime` strings.
- The empty-state copy ("Pick a destination first" with the 🛬 emoji) is lifted from the source `DashboardPage.tsx`.

## Customising

- Add more destinations to `DESTS[]` in `App.jsx`. They need `id`, `name`, `country`, `glyph` (emoji that stands in for a photo), `archetype` (must match an `ARCHETYPE_COLOR` key), `whyPerfect`, `bestTime`, `budget: { min, max }`, `visa`, `nights`.
- The quiz lives in `QUIZ_Q` in `QuizCard.jsx`. Three questions with four options each. Add more by extending the array.
