# assets/

This folder is intentionally light. **The source codebase ships no logos, no icon files, no photographic imagery, and no illustration assets.** The brand currently leans entirely on:

- **Emoji** as the icon vocabulary (`✨ ✈️ 💍 🪷 ☕ 🏛️ 💞`…) — see the *Iconography* section of the root `README.md`.
- **The H1 + emoji** as the wordmark, rendered in Cormorant Garamond on a tri-colour gradient. The reference rendering lives in `preview/brand-tagline.html`.

If you need a hard-mark logo, render the wordmark from `preview/brand-tagline.html` and export it as PNG/SVG. The wordmark uses:

```
font-family: Cormorant Garamond, serif;
font-weight: 800;
background: linear-gradient(135deg, #B71C1C 0%, #C2185B 50%, #00695C 100%);
-webkit-background-clip: text;
```

## What lives here

- `wordmark.html` — printable stand-alone version of the wordmark, ready to screenshot.
- `app-marks.html` — the three app marks (✨ Rishta · 💍 Shaadi Sajao · ✈️ Jannat Safar) on their signature backgrounds, ready to screenshot.

## What does NOT live here

- Photographic imagery — destinations, venues, vendors, profiles. The source code uses a flat coloured tile + 3rem emoji as a placeholder. When you ship real images, drop them in `assets/photos/<app>/` and reference them from the UI kit components.
- Icon SVGs — see the iconography note in the root README. If the user adopts an icon set, drop the SVGs under `assets/icons/`.
- Patterns / textures — currently none. The brand doesn't repeat motifs as backgrounds.

## Substitution note

If a deck or marketing page needs a "real" logo and you can't screenshot the wordmark, you can fall back to a single 🪷 lotus glyph in `var(--theme-primary)` at 1.5–2× the surrounding type size. Document the substitution in your output so the user knows it's scaffold.
