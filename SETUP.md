# 🪷 Setup Guide — The Great Indian Wedding

## Prerequisites

- **Node.js** 18+ 
- **pnpm** 8+ (install via `npm install -g pnpm`)
- **Supabase Account** (create at https://supabase.com)
- **Git**

---

## Phase 1: Bootstrap & Foundation Setup

### Step 1: Clone the Repository

```bash
cd /Users/devangchiniya/Documents/GitHub/The\ Great\ Indian\ Wedding\ -\ A\ Tri-App\ Love\ Journey
git clone . my-wedding-app
cd my-wedding-app
```

### Step 2: Install Dependencies

```bash
pnpm install
```

This installs dependencies for all workspaces (apps and packages).

### Step 3: Configure Supabase

1. Go to [Supabase](https://supabase.com) and create a new project
2. Copy your **Project URL** and **Anon Key** from Settings → API Keys
3. Create a `.env.local` file in the root:

```bash
cp .env.example .env.local
```

4. Update `.env.local` with your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Set Up Supabase Schema

1. Go to your Supabase project dashboard
2. Open **SQL Editor**
3. Create a new query and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Execute the query

This creates all the necessary tables, indices, and RLS policies.

### Step 5: Run the Development Servers

```bash
pnpm dev
```

This starts all three apps in parallel:
- **Rishta** (Matchmaker): http://localhost:3001
- **Shaadi Sajao** (Wedding Planner): http://localhost:3002
- **Jannat Safar** (Honeymoon Planner): http://localhost:3003

---

## Project Structure

```
/great-indian-wedding
  /apps
    /rishta              → Matchmaker app (port 3001)
    /shaadi-sajao        → Wedding planner app (port 3002)
    /jannat-safar        → Honeymoon planner app (port 3003)
  /packages
    /theme-engine        → Dynamic theme transformation logic
    /auth                → Shared Supabase auth
    /ui                  → Shared UI components (coming soon)
    /our-story           → Shared milestone scrapbook
  /supabase
    /migrations          → Database schema files
```

---

## Key Features of Phase 1

✅ **Monorepo Structure** — All three apps and shared packages in one repo  
✅ **Shared Authentication** — Single SSO via Supabase Auth  
✅ **Theme Engine** — 6-stage journey with dynamic theme transformation  
✅ **Database Schema** — Complete Supabase schema with RLS policies  
✅ **Type Safety** — Full TypeScript support across all packages  

---

## Available Scripts

### Root Commands

```bash
pnpm dev              # Start all apps in dev mode
pnpm build            # Build all apps and packages
pnpm type-check       # Type-check all code
pnpm lint             # Lint all code
```

### Individual App Commands

```bash
cd apps/rishta
pnpm dev              # Start Rishta dev server
pnpm build            # Build Rishta for production
pnpm preview          # Preview production build locally
```

---

## Next Steps (Phase 2)

Once Phase 1 is running:

1. **Build Rishta Features**:
   - Profile builder
   - Kismat match engine
   - Date suggester
   - Post-date check-in system

2. **Integrate Theme Switching**:
   - Listen to milestone events
   - Trigger theme transformations across all apps
   - Add confetti/celebration animations

---

## Troubleshooting

### `pnpm install` fails

Make sure you have pnpm 8+ installed:

```bash
pnpm --version
npm install -g pnpm@latest
```

### `VITE_SUPABASE_URL` not defined

Ensure your `.env.local` file exists and has the correct Supabase credentials.

### Apps don't start

Check that ports 3001, 3002, 3003 are not in use:

```bash
lsof -i :3001
lsof -i :3002
lsof -i :3003
```

---

## Architecture Overview

**Theme Engine**: Zustand store syncs `journeyStage` across all apps via WebSocket  
**Auth Layer**: Supabase Auth provides SSO; user context shared via Zustand  
**Database**: PostgreSQL (Supabase) with RLS policies for security  
**Real-time**: Supabase Realtime (WebSockets) for live theme updates  

---

*Phase 1 is complete when all three apps load and the theme engine is accessible. Ready to move to Phase 2!*
