---
name: great-indian-wedding-design
description: Use this skill to generate well-branded interfaces and assets for The Great Indian Wedding — a tri-app love journey (Rishta matchmaker, Shaadi Sajao wedding planner, Jannat Safar honeymoon planner) sharing one live theme engine across six emotional stages. Contains essential design guidelines, the six-stage color system, type stack, fonts, assets, and UI kit components for prototyping or production work.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files — especially:

- `colors_and_type.css` — every design token (six theme palettes, neutrals, semantic tones, font families, scale, spacing, radii, shadows, motion). Drop this onto any new HTML page to inherit the brand.
- `ui_kits/rishta/`, `ui_kits/shaadi-sajao/`, `ui_kits/jannat-safar/` — click-through HTML recreations plus JSX components. Copy these for any new interface work.
- `preview/` — design system reference cards (palettes, type specimens, components, brand).
- `assets/` — logos, illustration placeholders, generic imagery.

If creating visual artifacts (slides, mocks, throwaway prototypes, marketing pages), copy assets out and create static HTML files for the user to view. Bind to `var(--theme-primary | --theme-secondary | --theme-accent)` when the page should change with the journey stage; bind to `var(--app-rishta | --app-shaadi | --app-jannat)` when it must stay app-locked.

If working on production code, copy assets and read the rules in `README.md` — particularly *Content Fundamentals* (warm, second-person, Hindi terms without italics, emoji-as-icons) and *Visual Foundations* — to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (which of the three apps? which journey stage? a deck, a marketing page, a new screen?), and act as an expert designer who outputs HTML artifacts *or* production code, depending on the need.

**Key things to never forget:**

1. The system has **six stage themes**, not one. Every UI surface adapts.
2. **Emoji are the icon system.** Do not silently swap them for SVG icons unless explicitly asked.
3. **Sentence case** everywhere; **Title Case** only for proper nouns (Pehli Mulaqat, Varmala, Kismat Engine, Our Story).
4. Hindi/Urdu terms are **never italicized or translated** — they are first-class brand vocabulary.
5. Pure white and pure black don't exist. Ink is `#1a1a1a`, surfaces are warm cream.
6. Round, not sharp: `16px` cards · `10px` buttons · `999px` pills.
