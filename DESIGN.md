# DESIGN.md — boyanbudakov.com

Single source of truth for all visual implementation. Direction: **"Editorial Founder"** (locked 2026-07-07). Every build decision references these tokens — never introduce new colors or fonts.

---

## 1. Visual theme
Warm-premium / "quiet luxury" editorial. A print-magazine feel: expressive serif headlines, generous whitespace, paper grain, considered rhythm. Reads **human, handmade, founder-grade** — the deliberate opposite of timid AI output. Personality: confident, warm, precise.

## 2. Color palette
| Token | Hex | Use |
|---|---|---|
| `--canvas` | `#F5F1E8` | page background (warm cream — never pure white) |
| `--canvas-alt` | `#EFE9DC` | cards, alternating section bands |
| `--ink` | `#1A1714` | primary text, primary button bg (warm near-black — never `#000`) |
| `--ink-soft` | `#5A544C` | secondary text |
| `--ink-mute` | `#8A8175` | captions, meta |
| `--accent` | `#6B6B47` | THE one accent — links, eyebrow labels, highlights |
| `--on-accent` | `#F5F1E8` | text on ink/accent fills |
| `--line` | `#E0D8C6` | hairline borders |

Rules: **one accent only** (olive). Depth from grain + layered creams + hairlines, never gradients. Verify every text/bg pair at **WCAG AA** (4.5:1 body, 3:1 large) — ink-on-canvas and on-accent-on-ink both pass; re-check any new pairing computationally.

## 3. Typography
- **Display / headings:** Fraunces (variable, optical sizing on), weight 600; italic 500 for accent words + pull-quotes.
- **Body / UI:** Hanken Grotesk, 400 / 500.
- **Meta / labels:** JetBrains Mono, 400, UPPERCASE, letter-spacing `.1em`, color `--accent` (eyebrows, section numbers, timestamps).
- Self-host via Fontsource (woff2 only, subset, `font-display: swap`). Stacks: Fraunces→Georgia,serif · Hanken Grotesk→system-ui,sans-serif · JetBrains Mono→ui-monospace,monospace.
- **Fluid scale (`clamp`):** hero `clamp(2.4rem,6vw,4.25rem)` / h2 `clamp(1.75rem,3.5vw,2.75rem)` / h3 `1.25–1.5rem` / body `1.0625rem` (17px) `line-height:1.6` / meta `0.75rem`.

## 4. Component stylings
- **Primary button:** `--ink` bg, `--on-accent` text, pill radius `24px`, padding `11px 20px`, `→` suffix; hover = subtle opacity/lift.
- **Text link:** `--accent`, animated underline reveal on hover.
- **Eyebrow label:** JetBrains Mono, uppercase, `--accent`, letter-spaced.
- **Bento cell / card:** `--canvas-alt` bg, `1px solid --line`, radius `12px`, padding `14–20px`; Fraunces sub-heading + Hanken caption.
- **Case-study card (Disciplis):** large, offset/asymmetric — real product screenshot + live link + ONE metric + the decision/trade-off story. Custom-built, not templated.
- No skills percentage/progress bars. No "book a call" — contact = email + form.

## 5. Layout principles
- Content max-width ~`1140px`, generous side margins; section padding `clamp(4rem,10vw,8rem)`.
- **Hero:** asymmetric, type-first — oversized Fraunces headline pushed left, mono meta in top corners, real portrait in a split on ≥1024px.
- **"What I do":** bento with **uneven** weights (Websites = large cell; Web apps + Automations smaller) — never three equal boxes.
- **Break-the-grid mandate:** no two consecutive sections share the same rhythm — alternate contained vs full-bleed cream band, left-aligned vs asymmetric.

## 6. Depth / elevation
- **Paper grain overlay** (SVG `feTurbulence`, ~6–10% opacity) = primary depth tool, over `--canvas`.
- Layered creams (`--canvas` vs `--canvas-alt`) separate sections.
- Shadows: minimal, warm-tinted, low — only where a card genuinely lifts. Prefer hairlines + grain over shadow. Never glossy/gradient depth.

## 7. Do's / Don'ts
**Do:** Fraunces for expressive headlines · mono for meta · one olive accent · grain + whitespace · real portrait + real Disciplis screenshot · WCAG AA · alternate section rhythm.
**Don't:** pure `#000`/`#FFF` · banned fonts (Inter, Roboto, Arial, Helvetica, Space Grotesk, Lato, Open Sans, Source Sans Pro) · three equal boxes · purple/blue gradients · glow/neon · two identical consecutive sections · skill %-bars · "book a call."

## 8. Responsive behavior
- Breakpoints: `640 / 768 / 1024 / 1280`. Mobile-first; fluid type via `clamp`.
- Hero: stacks on mobile (headline → portrait → sub → CTA); 60/40 split ≥1024.
- Bento: 1 col mobile → asymmetric multi-col ≥768.
- Tap targets ≥44px. Honor `prefers-reduced-motion`.

## 9. Agent prompt guide (for the build model — Fable)
- Always use §2 tokens and §3 fonts; never invent colors/fonts.
- Build **section-by-section**; run the §7 anti-slop checklist on each before moving on.
- Static-first, minimal JS. **Only one JS island:** GSAP + ScrollTrigger (scoped + lazy) for the Disciplis pinned reveal. Everything else CSS (`animation-timeline: view()` scroll reveals, hover, underline, animated grain).
- Copy in EN first, wrapped in i18n keys (no hardcoded strings).
- Astro + Tailwind; deploy Cloudflare Pages. Target Lighthouse 95+.

## 10. Multilingual (EN / BG)
- Astro i18n with locale routes; small mono language switcher in header + footer. EN primary → BG added after EN ships.
- ⚠️ **Cyrillic check (do before BG):** confirm Fraunces + Hanken Grotesk ship Cyrillic glyphs. If Fraunces lacks Cyrillic, choose a Cyrillic-capable display serif for BG headings (e.g. Playfair Display) and keep a Cyrillic-capable body sans — locale-swap the font stack so the BG version stays on-brand.
