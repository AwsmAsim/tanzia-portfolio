# The Socials Glow — Tanzia Mehnaz Portfolio

A premium, editorial portfolio site for **Tanzia Mehnaz**, Creative Director & Organic Growth Strategist.

Built on her existing brand identity ("The Socials Glow": sage + deep-forest-green, growth-badge logo). Single-page, metric-led, fully responsive, accessible, and fast.

## Stack
- **Vite + React + TypeScript**
- Vanilla CSS (CSS variables, no UI framework)
- Lightweight motion via `IntersectionObserver` + CSS transitions (respects `prefers-reduced-motion`)
- Fonts: Fraunces (display) + Inter (UI), via Google Fonts

## Develop
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Content
All copy lives in [`src/data/content.ts`](src/data/content.ts) — single source of truth, sourced from her deck + LinkedIn. See [`CONTENT.md`](CONTENT.md) and [`DESIGN.md`](DESIGN.md) for the curation and design rationale. No prices or metrics are invented.

## Deploy (Netlify)
Configured via [`netlify.toml`](netlify.toml).
```bash
# from project root, once linked:
netlify deploy --build --prod
```

## To add later
- Intro video — a placeholder slot is reserved near the hero; drop the file in and wire it up when ready.
