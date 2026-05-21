# The Great Indian Wedding — Design System

> *Where destinies meet over chai. From first match to forever after — three apps, one beautiful story.* 🪷

This is the brand and component bible for **The Great Indian Wedding**, a tri-app ecosystem that walks one couple through the entire arc of an Indian love journey — matchmaking → first date → wedding planning → honeymoon — with a **live theme engine** that re-paints all three apps the moment a milestone is reached.

The three apps are:

| App | Emoji | Role | Signature colour |
|---|---|---|---|
| **Rishta** | ✨ | The Matchmaker — *Where destinies meet over chai* | Black & gold `#0E0E0E` + `#D4AF37` |
| **Shaadi Sajao** | 💍 | The Wedding Planner — *Powered by Varmala* | Royal red `#B71C1C` |
| **Jannat Safar** | ✈️ | The Honeymoon Planner — *Where paradise begins* | Tropical teal `#00695C` |

A shared "Our Story" scrapbook stitches every milestone — first match, first date, wedding day, honeymoon destination — into a single digital love story.

---

## 📍 Index — what's in this folder

```
README.md                  ← you are here
SKILL.md                   ← agent skill manifest (works in Claude Code too)
colors_and_type.css        ← all design tokens, in one file

assets/                    ← logos, generic illustrations, full-bleed imagery placeholders
fonts/                     ← (Google Fonts loaded via CSS @import — see Type)
preview/                   ← Design System tab cards (colors, type, components, brand)
ui_kits/
  rishta/                  ← matchmaker UI kit (index.html + JSX components)
  shaadi-sajao/            ← wedding planner UI kit
  jannat-safar/            ← honeymoon planner UI kit
```

Open any `ui_kits/<app>/index.html` to see a working, click-through recreation of that app. The components inside (`Button`, `Card`, `MatchCard`, `VendorCard`, `DestinationCard`, `StoryTimeline`…) are direct, simplified ports of `packages/ui/src/primitives.tsx` from the source codebase.

---

## 🗂️ Source material

This design system was built by reading these inputs. Anyone iterating on it should re-open them.

- **Codebase** (local, mounted as `The Great Indian Wedding - A Tri-App Love Journey/`): a pnpm monorepo with three Vite + React + TypeScript apps under `apps/` and four shared packages under `packages/` — `theme-engine`, `auth`, `mock-backend`, `ui`, `our-story`. Tailwind is configured but the actual components mostly use inline `style` objects threaded with the live `useThemeStore()`.
- **GitHub repo:** [`User-Deva/The-Great-Indian-Wedding---A-Tri-App-Love-Journey`](https://github.com/User-Deva/The-Great-Indian-Wedding---A-Tri-App-Love-Journey) — open this to dig deeper into stores, types, mock data, and the milestone trigger system. The `packages/theme-engine/src/types.ts` file is the single source of truth for stage colours.

Key reading order in the source repo if you're new:
1. `CLAUDE.md` — locked tech stack and conventions
2. `packages/theme-engine/src/types.ts` — six themes, six stages
3. `packages/ui/src/primitives.tsx` — `Button`, `Card`, `Section`, `Badge`, `Grid`, `EmptyState`
4. `packages/ui/src/AppShell.tsx` + `LoginScreen.tsx` + `StoryTimeline.tsx`
5. Each app's `App.tsx` + `pages/DashboardPage.tsx`

---

## 🎭 The Six Themes (the heart of the brand)

The whole system pivots around a `journeyStage` enum that lives in Supabase and is mirrored in `useThemeStore`. **Every screen of every app reads from `currentTheme.colors.primary | secondary | accent` instead of hard-coding colours.** When the stage flips, all three apps re-render with new colours in a 300ms cross-fade, and a new milestone is written to `our_story`.

| Stage | Theme name | Vibe | Motif | Primary | Secondary | Accent |
|---|---|---|---|---|---|---|
| `SEEKING` | **Mehendi Night** | Hopeful, formal | Gold-leaf henna | `#0E0E0E` | `#FFF8E1` | `#D4AF37` |
| `MATCHED` | **Gulabi Romance** | Excitement, butterflies | Marigold garlands | `#F4A7B9` | `#F8D5CC` | `#F7E7CE` |
| `DATE_SET` | **Jasmine Evenings** | Romantic, warm | Jasmine vines | `#C2185B` | `#FF8F00` | `#FFF8E1` |
| `DATING` | **Shaadi Season** | Celebratory, grand | Paisley & diyas | `#0E0E0E` | `#D4AF37` | `#FFF8E1` |
| `WEDDING` | **Baraat Bliss** | Joyful, festive | Elephants & flowers | `#6A1429` | `#FF8F00` | `#C0C0C0` |
| `HONEYMOONING` | **Honeymoon Haze** | Dreamy, luxurious | Lotus & waves | `#0E0E0E` | `#6B2D89` | `#C39BD3` |

**Rule:** new components must accept theme tokens, never literal hexes. The only exceptions are the per-app *signature* colours on the launch hub (`/index.html`) and cross-app footer links — those stay constant so users can identify which app they're in regardless of journey stage.

---

## ✍️ Content Fundamentals

> *Two hearts, one journey. Speak like the cousin who texts you the auspicious muhurat — warm, present, a little poetic, never corporate.*

**Voice.** Warm, present, second-person. The product is *with* the couple, not above them.

- "You matched. Now pick a venue and lock the first date." (Dashboard guide)
- "Your story starts soon" (empty state title)
- "Honeymoon mode. Head to Jannat Safar to plan the escape."

**Person & pronouns.** Almost always *you*. Sometimes *us / we* when referring to the apps as a team ("our Kismat Engine"). Never *the user*, never *one*.

**Casing.** Sentence case everywhere — buttons, headers, nav. Title case is reserved for *proper nouns* and *feature names* (Pehli Mulaqat, Guna Milan, Our Story, Varmala, Kismat Engine). Stages render as `Title Case With Spaces` from `SCREAMING_SNAKE_CASE` enum values via `.replace('_', ' ')`.

**Bilingual flourishes.** Hindi/Urdu terms are used as feature names without italics or translation gloss — they're proper nouns the audience already knows:

- *Rishta* — match / arranged-marriage proposal
- *Shaadi Sajao* — "decorate the wedding"
- *Jannat Safar* — "journey to paradise"
- *Varmala* — the garland-exchange ritual; also the wedding-concierge brand inside Shaadi
- *Pehli Mulaqat* — "first meeting" (used as the Dates page nav label)
- *Kundali / Guna Milan* — astrological compatibility (used as quiz feature names)
- *Baraat* — the groom's wedding procession
- *Mehendi* — the henna ceremony / morning

Mix them with English copy freely: "Pehli Mulaqat · Plan your first date." Don't translate, don't italicize, don't apologize.

**Emoji.** Used **liberally and structurally** — they are a load-bearing part of the design language. Six places they appear:

- **Stage banners & nav:** every nav link starts with an emoji (`🏠 Dashboard`, `💕 Matches`, `☕ Pehli Mulaqat`, `📖 Our Story`).
- **App identity:** ✨ Rishta · 💍 Shaadi Sajao · ✈️ Jannat Safar — these *are* the logos for now.
- **Venue type icons:** `cafe: '☕' · heritage: '🏛️' · garden: '🌿'` in `DateVenueCard`.
- **Timeline pins:** each milestone in `StoryTimeline` carries an emoji that renders in a 46×46 circle of `theme.primary`.
- **Empty-state hero:** a single 2.5rem emoji centred above the title (`💞 Your story starts soon`, `🍵 Locked until Dating`).
- **Section greetings:** `Hi {firstName} 👋`.

When you need a "real" icon (📞, 📧, 📍, 💰, ⭐, 📅) emoji are still the move. Unicode glyphs sneak in too — see the journey-line arrows on `index.html` rendered as `→`.

**Tone examples (lift these verbatim if you need filler):**

- > "Step into a couple's journey. This is a local demo with no real accounts. Pick a seeded user to sign in as. Each 'couple' shares one journey across all three apps."
- > "Your wedding, beautifully orchestrated."
- > "From first match to forever after — three apps, one beautiful story."
- > "Where destinies meet over chai."

**Things we never say.** *Onboarding flow, KPI, leverage, sync up, ROI, dashboard* (we say it; just never as the product noun — pages are named after the *feeling*, not the *function*: "Wedding mode", "Paradise plans", "The two of you").

---

## 🎨 Visual Foundations

### Palette philosophy

The system is **maximalist by stage, minimalist by frame**. Each stage owns three colours that take over the entire UI chrome (header, footer, primary buttons, badges), but the canvas underneath is always a warm cream (`#FFF8EF` or stage-secondary tinted) and the cards are always plain white. We never gradient-spam the body — gradients live in three carefully chosen places (see below).

Pure white and pure black don't exist anywhere. The closest we get to white is **Ivory `#FFFFF0`** (`SEEKING` secondary) or **Cream `#FFF8E1`** (`DATE_SET` accent). Ink is `#1a1a1a`, never `#000`.

### Type

Out of the box the codebase uses **Inter** + the platform stack — clean, neutral, dense. We layer in two display families to carry the wedding-invite feeling without changing the underlying ergonomics:

- **Inter (400–800)** — body, buttons, badges, dashboards, all UI labels. The workhorse.
- **Cormorant Garamond (400–700, italic 400/600)** — display: H1/H2/H3, launch-hub hero, slide titles, "couple name" banners. Italic for callouts and love-notes.
- **Yatra One** — script / flourish: empty-state subtitles, the footer "🪷 Where destinies meet" tagline, "Our Story" chapter heads. Use very sparingly — never below 18px and never for paragraph text.
- **Kalam (400/700)** — devanagari-friendly fallback for `font-script` when Yatra isn't quite right (handwritten Hindi captions).

Scale lives in `colors_and_type.css` as `--fs-hero` (clamp 32 → 56) down to `--fs-micro` (12.5). No font goes below 12px in production.

> ⚠️ **Font substitution note.** The source codebase ships *no* font files — it relies on Inter via system stack only. Cormorant + Yatra + Kalam are our additions to give the brand an actual wedding-invite voice. They're loaded via Google Fonts `@import` at the top of `colors_and_type.css`. If you want to ship offline-first, please drop `.woff2` files into `fonts/` and we'll swap the import for `@font-face`.

### Spacing

4px base. The actual rhythm is `4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48`. Most components live at 24px (card padding), 16px (default gutter), and 40px (between sections). Pages have `padding: 2rem 1.5rem` and a `maxWidth: 1280` content column.

### Corners

The brand has a *consistent* round, never sharp:

- **`16px` — Cards** (the signature; `Card` in primitives.tsx)
- **`10px` — Buttons & inputs**
- **`12px` — Timeline tiles, login user pickers, inner chips**
- **`999px` — Badges, nav pills, stage indicators**
- **`8px` — Tiny chips (footer app links, badges in dense rows)**

### Backgrounds

Four distinct treatments, used deliberately:

1. **Warm flat fill** (`bg-page` / `theme.secondary`) — every authenticated page. Plain, soft cream.
2. **Theme-coloured slab** — the page header and footer are saturated primary, set against the cream body. This is what makes the theme-flip feel ceremonial.
3. **135° linear gradient, primary → accent** — only on **login screens** and the **launch hub** (`index.html`). This is the brand's "first impression" treatment. Don't use it on internal pages.
4. **Translucent glass** — `rgba(255,255,255,0.6–0.85)` for empty-state panels and stage chips sitting on top of a coloured slab.

We don't currently use repeating patterns, photographic backgrounds, or texture/grain. Imagery for venues / destinations / vendors is **a coloured rectangle with a single 3rem emoji centred** — that's the literal placeholder pattern in `DestinationCard.tsx`. When real imagery lands, it should be **warm-toned, slightly desaturated**, evoking soft daylight (mehendi morning) or candle-lit interiors (jasmine evening) — never cool/blue, never high-contrast.

### Borders

- Most cards have **no visible border**, only shadow.
- `Card accent` adds a 2px border in `theme.primary` — used on hero/CTA cards.
- Inputs and login user-pickers carry a 1px `var(--line-1)` until selected, then flip to `theme.primary`.
- Empty states use a `1px dashed rgba(0,0,0,0.15)` border around translucent white.
- Vendor cards add a green `2px solid #4caf50` when `varmalVerified` is true — a deliberate trust signal that *breaks* the theme.

### Shadows

All shadows are **single-layer, low spread, warm-grey** — no inner shadows, no neon glows. Five named tiers:

```
--shadow-card     0 4px 18px rgba(0,0,0,0.06)   default card
--shadow-card-2   0 2px 8px  rgba(0,0,0,0.04)   timeline tile, inner row
--shadow-button   0 6px 18px rgba(0,0,0,0.12)   primary CTA lift
--shadow-hover    0 12px 40px rgba(0,0,0,0.15)  launch-hub app card on hover
--shadow-header   0 4px 14px rgba(0,0,0,0.10)   sticky header
--shadow-chip     0 4px 10px rgba(0,0,0,0.12)   timeline emoji medallion
```

### Buttons

Pill-leaning `10px` rounded rectangles. Three sizes (`sm 0.45/0.9 · md 0.7/1.25 · lg 0.95/1.6`) and four variants:

- **`primary`** — `theme.primary` background, `theme.secondary` text, `--shadow-button`.
- **`secondary`** — translucent white, theme-primary 1.5px border, theme-primary text.
- **`ghost`** — transparent, theme-primary text.
- **`danger`** — `#c62828` background, white text. Used only for destructive actions like "Reset demo".

### Hover states

Universal pattern: **lift by 1px** (`translateY(-1px)`) on hover, no colour change. Cards on the launch hub lift 8px and grow their shadow to `--shadow-hover`. Transitions are always 120–200ms on `ease`.

### Press states

The codebase doesn't ship an explicit `:active` style — the lift simply collapses. When you add one, **shrink to `scale(0.98)`** rather than darkening, to keep the warmth.

### Disabled states

`opacity: 0.55` + `cursor: not-allowed`. No grayscale, no border change.

### Transparency & blur

- Translucent white (`rgba(255,255,255,0.15)` → `0.85`) is used **on coloured headers** to layer chips and nav pills on top of primary.
- The site does **not** use `backdrop-filter: blur(...)` anywhere. If you add it, keep it under 12px and only against a flat-coloured surface.

### Animation

Mostly absent and that's intentional — this is a *content* product, not a motion one. The two motion moments that exist:

- **Theme transition** — `transition: background-color 300ms ease` on the header, footer, and body when a milestone fires. Cross-fades the entire UI.
- **Confetti event** — `setJourneyStage` dispatches a `themeChanged` `CustomEvent`; the apps listen and *can* fire confetti/celebration. The hook is there; nothing visual is wired up yet.

When in doubt, use `--dur-hover (160ms) ease` for any property animation. No bounces, no springs, no parallax.

### Fixed elements

- The **app header** is sticky-feeling but not actually `position: fixed` — it scrolls with the page. Pages assume a 1280px max content column inside it.
- The **footer** is bottom of document with the cross-app launcher buttons.
- No floating action buttons, no bottom nav (despite the mobile-first claim — the actual code is a top-nav layout).
- The **launch hub** (`index.html`) has no chrome — it's a hero + grid.

### Iconography (high level — full section below)

Emoji-as-icon. See ICONOGRAPHY below.

---

## 🎯 Iconography

**Short answer: the brand's icon system is emoji.** This is unusual but deliberate — it makes the apps feel like a cousin's WhatsApp wedding-planning group rather than a Series B SaaS dashboard.

Where emoji are used:

| Usage | Examples | Source file |
|---|---|---|
| App identity | ✨ Rishta · 💍 Shaadi Sajao · ✈️ Jannat Safar | `index.html`, every `App.tsx` |
| Nav links | 🏠 🧭 💕 ☕ 📖 💼 💰 🌍 ✈️ 🏨 🎊 👤 | each `App.tsx` `NAV` const |
| Stages | 🔍 Seeking · 💕 Matched · 📍 Date Set · ☕ Dating · 💍 Wedding · ✈️ Honeymoon | `index.html` journey line |
| Venue types | cafe ☕ · heritage 🏛️ · restaurant 🍽️ · garden 🌿 · cultural 🎨 | `DateVenueCard.tsx` |
| Match actions | ❤️ Interested · 👋 Pass | `MatchCard.tsx` |
| Booking metadata | 📍 address · 💰 budget · 👕 dress code · 📅 date · 📞 phone · 📧 email · 🎨 portfolio | `DateVenueCard.tsx`, `VendorCard.tsx` |
| Empty states | 💞 ✨ 🪷 🍵 🛬 🎟️ — a single 2.5rem glyph above the title | `EmptyState` |
| Timeline pins | Per milestone, set in mock-backend events | `StoryTimeline.tsx` |

**No icon font, no SVG sprite, no Heroicons/Lucide dependency.** The few non-emoji glyph-like things in the codebase are:

- A literal `→` arrow in CTAs ("Browse Matches →")
- A literal `✓` for verification badges ("✓ No Visa", "✓ Varmala Verified")
- A literal `★` for ratings (`{vendor.rating}★`)

There are **no SVG files, no PNG icons, no logo files** in the source repo. The launch hub uses no logo — the H1 *is* the logo. We've copied a placeholder lotus / wedding-invitation flourish into `assets/` so that any production deck/slide that genuinely needs a logo mark has one to lean on, but this is **scaffold, not source-of-truth** — the brand's real logo work hasn't happened yet.

> ⚠️ **Icon substitution flag for the user.** If you want a proper icon system, the closest CDN-available match to the current vibe is **Phosphor Icons** (regular weight, 1.5px stroke, soft round joins). I've linked it from `ui_kits/*/index.html` as a fallback for any place where emoji feels too casual (e.g. wedding paperwork, vendor invoices, future settings screens). Lucide / Heroicons feel too "Linear / Stripe" — please skip them.

### Recommendation if you want to evolve the system

Keep emoji as the **primary** language. Add a minimal SVG icon set for the few places emoji read badly:
- printed invoices / PDF downloads
- avatars when the user hasn't uploaded a photo (currently `profile?.emoji ?? '🪷'`)
- the future native-app status bar

For everything user-facing inside the apps, **emoji wins** — it carries the warmth the brand needs.

---

## 🧩 Components recap

The full primitive set lives in `packages/ui/src/primitives.tsx` and is mirrored in each `ui_kits/<app>/`:

- **`Button`** — `primary | secondary | ghost | danger`, sizes `sm | md | lg`, `fullWidth`
- **`Card`** — base white surface, optional `accent` border, optional `onClick`
- **`Section`** — titled block with optional `subtitle` and `actions`
- **`Badge`** — pill chip, tones `neutral | positive | warning | danger | info`
- **`Grid`** — `repeat(auto-fit, minmax(min, 1fr))` with configurable `gap`
- **`EmptyState`** — emoji + title + description + optional action

And the recurring composite components, one per app domain:
- **`MatchCard`** (Rishta) — compatibility score circle + Interested/Pass actions
- **`DateVenueCard`** (Rishta) — venue with conversation starters drawer
- **`VendorCard`** (Shaadi Sajao) — vendor with rating + book action
- **`BudgetTracker`** (Shaadi Sajao) — category bars vs allocated
- **`WeddingCountdown`** (Shaadi Sajao) — D/H/M boxes
- **`DestinationCard`** (Jannat Safar) — image-tile + archetype badge + budget range
- **`HoneymoonCountdown`** (Jannat Safar) — same pattern as wedding
- **`StoryTimeline`** (shared) — emoji medallions on a faint vertical line

---

## 🚦 How to use this design system

1. **Drop `colors_and_type.css`** into any new HTML/React surface. Most semantics work out of the box.
2. **Bind to theme tokens, not stage hexes.** When the page should change with the journey, use `var(--theme-primary)`. When it should stay app-locked, use `var(--app-rishta | --app-shaadi | --app-jannat)`.
3. **Open `ui_kits/<app>/index.html`** for a click-through reference of the live app. Copy components from there.
4. **For slide decks / marketing pages**, lean on the *display* + *script* families and the gradient login treatment. Body interfaces should stay in Inter.
5. **Always speak the brand's voice** — see Content Fundamentals. Warm, present-tense, second-person, emoji-positive, Hindi-friendly without italics.

---

## 🙏 Caveats & open questions

- No real logo or wordmark exists. Currently the H1 + emoji *is* the logo.
- No photographic imagery exists. Destination/venue cards use a flat coloured tile with one emoji — please don't ship that to production.
- No icon system beyond emoji. We've added Phosphor as a fallback in the UI kits but did not adopt it wholesale.
- Cormorant Garamond, Yatra One, and Kalam are **our additions** for wedding flourish — they are not in the source codebase. Easy to remove if you want to stay system-font-only.

Want to dig deeper? The full source is on GitHub: **[User-Deva/The-Great-Indian-Wedding---A-Tri-App-Love-Journey](https://github.com/User-Deva/The-Great-Indian-Wedding---A-Tri-App-Love-Journey)**.

*🪷 Made with love, marigold, and a lot of chai.*
