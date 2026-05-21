# Rishta · UI Kit ✨

> *The Matchmaker — Where destinies meet over chai.*

App 1 of The Great Indian Wedding ecosystem. The culturally-intelligent matchmaker that quizzes you on personality, scores compatibility via a *Kismat Engine* + *Guna Milan* (astrological compatibility), and suggests three curated first-date venues in your city when both people express interest.

## Run it

Open `index.html` in any browser — no build step. The whole kit is a single-page click-through:

1. **Login** — gradient hero, seeded user picker.
2. **Dashboard** — stage-aware "next step" CTA, you-and-your-partner profile pair, quick stats.
3. **Matches** — three rishtas with compatibility circles. Tap **Interested** on the 92% match → the journey advances to `MATCHED` and the entire UI cross-fades to Gulabi Romance (pink/blush).
4. **Pehli Mulaqat** — three Varmala-curated venues. Tap **Schedule Date** → advances to `DATE_SET` and re-paints to Jasmine Evenings (magenta/saffron).
5. **Our Story** — milestones written to the timeline as you progress.

## What's in the kit

| File | Role |
|---|---|
| `App.jsx` | Top-level state machine + page routing |
| `ProfileCard.jsx` | The "two of you" card pair |
| `MatchCard.jsx` | Compatibility circle + ❤️/👋 actions, hover-lift |
| `DateVenueCard.jsx` | Venue tile with the conversation-starters drawer |
| `../_shared/primitives.jsx` | `Button`, `Card`, `Section`, `Badge`, `Grid`, `EmptyState`, `AppShell`, `LoginScreen`, `StoryTimeline` |

## Theme journey demonstrated

| Action | New stage | Theme |
|---|---|---|
| Start | `SEEKING` | Mehendi Morning (sage 🟢) |
| Tap Interested on a match | `MATCHED` | Gulabi Romance (rose 🩷) |
| Schedule a date | `DATE_SET` | Jasmine Evenings (magenta 🌺) |

The header, footer, nav-pill background, primary CTAs, and the "two of you" card border all change in a 300ms cross-fade.

## Faithful to source

Components mirror `apps/rishta/src/components/*.tsx` from the source repo. Copy lifted from the actual pages (dashboard guide headlines, "Hi {name} 👋" greeting, "Pehli Mulaqat" nav label, conversation-starter drawer). The `Kismat Engine` compatibility message thresholds (85 / 65) and colours (green / blue / orange) come straight from `kismatEngine.ts`.
