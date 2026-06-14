# Tanzia Mehnaz Portfolio — Design Direction

## Goal
A "next-level," editorial, award-style portfolio that feels premium and calm — built on **her existing brand** (The Socials Glow: sage + deep forest green, growth motif). Inspiration drawn from 2026 top UX portfolios: fewer high-quality sections, bold typography, strong personality, smooth scroll-driven motion, and metric-led storytelling.

## Inspiration takeaways (from research)
- **Robin Noguier / Karina Sirqueira:** polished interaction design, bold expressive typography, confident hero with personality.
- **2026 trend (bestfolios / casestudy.club):** minimalist layouts that prioritize the work; quality over quantity; distinct personality; storytelling that proves thinking; results-led value proposition.
- **For an SMM/growth strategist specifically:** the proof IS the numbers. Lead with metrics. Big animated counters, before→after deltas, case studies as the centerpiece.

## Visual language
- **Palette**
  - `--bg`: #DCE6CE (sage)  — primary background
  - `--bg-deep`: #143D2B (forest)  — dark sections (inverted)
  - `--ink`: #143D2B (forest green text)
  - `--cream`: #F4F1D9
  - `--paper`: #FAFAF8
  - `--gold`: #C9A24B (subtle "glow" accent — sparingly, for highlights/underlines)
  - Alternate dark and light sections for rhythm (sage → forest → sage …).
- **Type**
  - Display/headings: a strong contemporary serif or grotesk. Use **"Fraunces"** (serif, optical, characterful — matches "glow"/editorial) for big display, paired with **"Inter"** / "Manrope" for body & UI. Via Google Fonts.
  - Big, confident headlines. Generous line-height for body.
- **Motif**
  - Recreate the flowing thin-line **contour wave** SVG (from her deck corners) as a subtle decorative layer.
  - Growth **badge logo** as inline SVG.
- **Texture:** lots of whitespace, soft section transitions, rounded-but-not-bubbly corners (12–16px), thin hairline dividers.

## Motion (tasteful, performant)
- Scroll-reveal fade/slide-up on sections (IntersectionObserver).
- **Animated stat counters** that count up when scrolled into view.
- Hero: subtle parallax/float on the contour motif + a gentle entrance.
- Marquee of brand names (slow auto-scroll) in the "Brands" strip.
- Smooth in-page anchor scrolling. Respect `prefers-reduced-motion`.
- Sticky, condensing top nav.

## Page structure (single-page, anchored nav)
1. **Nav** — logo (badge + "The Socials Glow"), links: Work · About · Services · Process · Contact. CTA button.
2. **Hero** — eyebrow, big headline, sub, CTAs, stat ribbon, contour motif, portrait peeking / framed.
3. **Trusted-by marquee** — brand names scrolling.
4. **Stats band** (dark/forest) — 4 big animated counters (100X, 258K, 20M, 12+).
5. **About** — portrait + narrative + personal texture + education chips.
6. **Selected Work / Case Studies** — the hero of the page. Cards for Nasheedio, Nikah Forever, Hima, Barkat Blossom, Gut-Health, with before→after deltas and key metrics. Big, magazine-style.
7. **Services** — grid of 6 service cards.
8. **Process** — 6-step horizontal/numbered timeline.
9. **Packages** — 3 tiers, feature lists, "Customisation available", CTA (no invented prices).
10. **Testimonials** — quote cards / slider with attribution.
11. **Contact / CTA** (dark) — "Let's work together", email, phone, LinkedIn.
12. **Footer** — minimal.
- **Video:** placeholder slot reserved near hero or as its own section ("Watch the 60-sec intro") — wired but hidden/coming-soon until the video exists.

## Tech approach
- **Vite + React + TypeScript** (clean component structure, easy to extend, Netlify-friendly) OR plain HTML/CSS/JS if we want zero build. → Decision: **Vite + React + TS** for maintainability + nice DX, with vanilla CSS (CSS variables, no heavy UI lib). Framer-motion optional for motion, but prefer lightweight IntersectionObserver + CSS to keep bundle small.
- Fully responsive (mobile-first), accessible (semantic, alt text, reduced-motion, focus states), fast (optimized images).
- SEO: title, meta description, OG tags, favicon from the badge logo.
- Deploy target: Netlify via CLI (later, on user's go-ahead). Push to GitHub first.

## Acceptance bar
- Looks genuinely high-end on desktop AND mobile.
- Numbers are the star; every claim is real (from CONTENT.md), none invented.
- Smooth, not janky; no layout shift; loads fast.
- Tested locally in the preview before handing off.
