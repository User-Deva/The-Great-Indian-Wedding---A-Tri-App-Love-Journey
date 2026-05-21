# Shaadi Sajao · UI Kit 💍

> *Powered by Varmala — Your wedding concierge.*

App 2 of the ecosystem. The full-service wedding planner that absorbs the chaos of an Indian wedding into a single dashboard: vendors, budget, guest list, rituals (Mehendi → Sangeet → Pheras → Reception), and family coordination.

## Run it

Open `index.html` in any browser. Sign in as either user — Shaadi opens at the `DATING` stage with the new black-and-gold *Shaadi Season* theme.

1. **Login** — gradient hero in `--t-dating-primary`/`--t-dating-accent`.
2. **Dashboard** — wedding day countdown, at-a-glance KPI cards, quick-jump to setup / vendors / budget.
3. **Wedding setup** — the five things every wedding needs locked: date, venue, religion, package, total budget, guest count.
4. **Vendor directory** — five Varmala-vetted vendors with rating, reviews, price range. Tap **Book Now** on any one and a deposit is paid → the stage advances to `WEDDING` and the whole UI cross-fades to *Baraat Bliss* (maroon + marigold + silver).
5. **Budget tracker** — six category bars (Venue, Catering, Decor, Photography, Attire, Mehendi) showing deposits vs allocations.
6. **Our story** — milestones written as you book.

## What's in the kit

| File | Role |
|---|---|
| `App.jsx` | Top-level state + page routing + theme transitions |
| `VendorCard.jsx` | Vendor tile with ✓ Varmala-verified green border, rating colour scale, Book Now action |
| `BudgetTracker.jsx` | Stacked bar per category (theme-coloured) |
| `WeddingCountdown.jsx` | D/H/M boxes ticking down (updates per minute) |
| `../_shared/primitives.jsx` | Shared primitives |

## Theme journey demonstrated

| Action | New stage | Theme |
|---|---|---|
| Start | `DATING` | Shaadi Season (black & gold ⚫️🟡) |
| Book first vendor (deposit paid) | `WEDDING` | Baraat Bliss (maroon & marigold) |

## Faithful to source

- The `VendorCard` is a direct port of `apps/shaadi-sajao/src/components/VendorCard.tsx` — including the rating colour thresholds (4.7 / 4.0), the `varmalVerified` green border break, and the bottom-row layout.
- The dashboard layout (countdown + KPI grid + action cards + recent milestones) is lifted from `apps/shaadi-sajao/src/pages/DashboardPage.tsx`.
- The "first vendor booked → WEDDING" stage transition mirrors the milestone trigger described in `CLAUDE.md`.

## Customising

- The five vendors live in `App.jsx` `VENDORS[]`. Each carries `alloc: <category-id>` matching `BUDGET_CATS[].id` in `BudgetTracker.jsx`.
- The wedding details (venue, date, budget, guest count, package) live in `useState` in `ShaadiApp` — change the defaults there.
