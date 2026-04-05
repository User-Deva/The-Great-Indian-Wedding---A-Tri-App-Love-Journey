# CLAUDE.md — Development Guidelines

This file documents conventions, decisions, and guidelines for building "The Great Indian Wedding" ecosystem.

---

## Core Principles

1. **Mobile-First**: Design assumes Android smartphone as primary device
2. **Cultural Authenticity**: Respect Indian traditions and motifs
3. **Theme-First**: Every milestone triggers visual transformation across all three apps
4. **Type Safety**: Full TypeScript with strict mode enabled
5. **Performance**: Transitions ≤300ms, lazy-load images, optimize bundle size

---

## Tech Stack (Locked)

- **Frontend**: React 18 + Tailwind CSS + TypeScript
- **Build**: Vite
- **State Management**: Zustand (no Redux or Context API at scale)
- **Backend**: Node.js + Express (TBD)
- **Database**: Supabase (PostgreSQL)
- **Real-time**: Supabase Realtime + WebSocket rooms keyed by `coupleId`
- **Auth**: Supabase Auth (single SSO)
- **Hosting**: Vercel (frontend) + Render/Railway (backend, if needed)

---

## Folder Structure Standards

```
app-name/
  src/
    components/      → UI components (atomic: atoms, molecules, organisms)
    features/        → Feature-specific logic (hooks, utils, stores)
    pages/          → Page components (Route-level)
    hooks/          → Custom React hooks (useTheme, useAuth, etc.)
    types/          → TypeScript types and interfaces
    styles/         → Global styles (index.css only; use Tailwind for component styles)
    utils/          → Helper functions, constants
    main.tsx        → Entry point
    App.tsx         → Root component
  index.html        → HTML entry
  vite.config.ts    → Vite configuration
  tsconfig.json     → TypeScript configuration
```

---

## Naming Conventions

- **Components**: PascalCase (`UserProfile.tsx`, `MatchCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useTheme`, `useAuth`, `useDateSuggester`)
- **Types/Interfaces**: PascalCase (`AuthUser`, `Milestone`)
- **Enums**: PascalCase (`JourneyStage.SEEKING`, not `SEEKING`)
- **Stores**: `use[Name]Store` (`useThemeStore`, `useAuthStore`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_PROFILE_PHOTOS`)
- **Database tables**: snake_case (`user_profiles`, `vendor_bookings`)

---

## Zustand Store Pattern

Every store follows this pattern:

```typescript
// types.ts
export interface FooStore {
  // State
  data: DataType | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setData: (data: DataType) => void;
  reset: () => void;
}

// store.ts
export const useFooStore = create<FooStore>((set) => ({
  data: null,
  isLoading: false,
  error: null,

  setData: (data) => set({ data }),
  reset: () => set({ data: null, isLoading: false, error: null }),
}));

// index.ts
export type { FooStore };
export { useFooStore };
```

---

## Theme System

**Store Location**: `packages/theme-engine/src/store.ts`

The `useThemeStore` holds:
- `journeyStage`: Current stage (SEEKING, MATCHED, DATE_SET, DATING, WEDDING, HONEYMOONING)
- `currentTheme`: Theme tokens (colors, motif, vibe)

**Every stage change** triggers:
1. Update `journeyStage` in Supabase
2. Dispatch `themeChanged` custom event
3. All three apps listen and re-render (300ms transition)
4. Write milestone to `our_story` table

**Usage**:
```tsx
const { journeyStage, currentTheme } = useThemeStore();

<div style={{ backgroundColor: currentTheme.colors.primary }}>
  {currentTheme.name}
</div>
```

---

## Database & Types

### Couples Table
- `id`, `user1_id`, `user2_id`, `couple_name`, `journey_stage`, timestamps

### Journey Stage Enum (Server & Client)
```javascript
const JourneyStage = {
  SEEKING: 'SEEKING',        // Initial state
  MATCHED: 'MATCHED',        // Both expressed interest
  DATE_SET: 'DATE_SET',      // Date venue confirmed
  DATING: 'DATING',          // Date completed with ≥4 star rating
  WEDDING: 'WEDDING',        // First vendor booked + deposit confirmed
  HONEYMOONING: 'HONEYMOONING', // Flight or hotel booked
};
```

### Key Tables
- `couples` — Core couple identity
- `user_profiles` — Individual profiles (name, age, profession, horoscope)
- `matches` — Match interactions (compatibility scoring)
- `dates` — Suggested/completed dates (venues, check-ins)
- `weddings` — Wedding planning (date, venue, package, budget)
- `vendors` — Varmala vendor directory
- `vendor_bookings` — Confirmed bookings
- `honeymoons` — Honeymoon destination + budget
- `our_story` — Milestone scrapbook (auto-filled on stage changes)

---

## Shared Packages

All three apps depend on these packages:

### `@great-indian-wedding/theme-engine`
- `useThemeStore` hook
- `JourneyStage` enum
- `THEME_MAP` constant (6 themes)
- Theme tokens (colors, motif, vibe)

### `@great-indian-wedding/auth`
- `useAuthStore` hook
- `supabase` client
- Auth types

### `@great-indian-wedding/ui`
- Reusable components (Button, Card, Input, Modal, etc.)
- Tailwind theme config
- Icon library

### `@great-indian-wedding/our-story`
- `useOurStoryStore` hook
- `StoryMilestone` type
- Scrapbook service functions

---

## Component Best Practices

1. **Always use functional components** with hooks
2. **Destructure props** for clarity
3. **Use Tailwind classes** for styling (no CSS-in-JS)
4. **Separate business logic into hooks** (useFetch, useValidation)
5. **Keep components small** — max ~200 lines
6. **Use TypeScript generics** for reusable components

```tsx
// Good ✅
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => (
  <button
    className={`px-4 py-2 rounded ${variant === 'primary' ? 'bg-blue-500' : 'bg-gray-300'}`}
    onClick={onClick}
  >
    {label}
  </button>
);

// Bad ❌
export const Button = (props) => (
  <button style={{ background: props.bg }} onClick={props.click}>
    {props.text}
  </button>
);
```

---

## Milestone Trigger System

When a user completes a major action:

1. **Check conditions** in the app (e.g., "both users rated date ≥4 stars")
2. **Call Supabase update**: Update `couples.journey_stage` to next stage
3. **Listen for change**: `useThemeStore` or WebSocket event
4. **Write milestone**: Insert row into `our_story` table with metadata
5. **Broadcast event**: Emit custom event for animations/notifications
6. **Sync all apps**: All three apps re-render with new theme

---

## Code Quality

- **No console.log in production** — Use a logger
- **No hardcoded strings** — Use constants or environment variables
- **No nested ternaries** — Use if/else or early returns
- **No magic numbers** — Use named constants
- **TypeScript strict mode enabled** — All files must compile without warnings

---

## Git Commit Convention

- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code refactoring
- `docs:` Documentation
- `test:` Tests
- `style:` Formatting (no functional change)
- `chore:` Dependencies, build config

Example: `feat: add profile builder for Rishta app`

---

## Performance Targets

- **Page load**: < 2s on 4G
- **Time to interactive**: < 3s
- **Lighthouse score**: 90+
- **Bundle size**: < 500KB (gzipped, per app)
- **Theme transition**: 300ms max

---

## i18n (Internationalization)

Support 10 languages from launch:
- Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi, Odia

Use `next-intl` or `i18next` library (TBD in Phase 6).

---

## Testing Strategy

- **Unit tests**: Jest + React Testing Library
- **E2E tests**: Playwright or Cypress (Phase 7)
- **Visual tests**: Percy or Chromatic (Phase 7)
- **Test coverage target**: 80%+

---

## Deployment Checklist (Phase 7)

- [ ] All tests passing
- [ ] Type checking passes (`pnpm type-check`)
- [ ] No console errors
- [ ] Bundle size optimized
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] RLS policies reviewed
- [ ] Performance targets met
- [ ] Accessibility audit passed (WCAG 2.1 AA)

---

## Useful Links

- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand Guide](https://github.com/pmndrs/zustand)
- [Vite Guide](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

*Last updated: 2026-04-04*
