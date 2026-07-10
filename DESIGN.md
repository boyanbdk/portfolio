# DESIGN.md — boyanbudakov.com

Single source of truth for all visual implementation. Direction: **"Editorial Founder — Dark"** (v2.1, 2026-07-10 — synced to shipped site; cream v1 locked 2026-07-07, went dark 2026-07-09 after the video-hero landed and Boyan chose the dark scheme). Every build decision references these tokens — never introduce new colors or fonts.

---

## 1. Visual theme
Warm-premium / "quiet luxury" editorial, on a **warm ink canvas**. Still a print-magazine feel — expressive serif headlines, generous whitespace, grain, considered rhythm — but printed on dark paper: dusk photography, cream type, one olive accent. Reads **human, handmade, founder-grade** — never glassy dark-tech. Personality: confident, warm, precise.

## 2. Color palette (Dark Editorial v2)
| Token | Hex | Use |
|---|---|---|
| `--canvas` | `#16120E` | page background (warm ink — never pure `#000`) |
| `--canvas-alt` | `#201A15` | cards, elevated bands (Contact, case CTA) |
| `--ink` | `#F5F1E8` | primary text = cream, primary button bg (never pure `#FFF`) |
| `--ink-soft` | `#C6BDAE` | secondary text |
| `--ink-mute` | `#94897A` | captions, meta |
| `--accent` | `#A3A375` | THE one accent (olive, lifted for AA on dark) — links, eyebrows |
| `--on-accent` | `#16120E` | dark text on cream/accent fills (buttons) |
| `--line` | `#352D24` | warm dark hairlines |
| `--shade` | `#14110E` | fixed dark for scrims/overlays over imagery |

Semantics kept from v1: `canvas` = background, `ink` = foreground. Rules: **one accent only** (olive). Depth from grain (screen-blend on dark), dusk imagery, layered ink tones + hairlines — never glow, never glassmorphism. Verify every text/bg pair at **WCAG AA** (4.5:1 body, 3:1 large): cream-on-canvas ≈ 15:1 ✓, soft ≈ 9:1 ✓, accent-on-canvas ≈ 5:1 ✓, on-accent-on-accent ≈ 5:1 ✓.

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
- **Hero:** full-bleed dusk **video** behind a `--shade` scrim, type-first — oversized Fraunces headline over the footage, masked line-reveal intro, infinite mono manifesto marquee strip along the bottom edge. The real portrait lives in **About** (`src/assets/about-portrait.*`, falls back to `desk-still.jpg`).
- **"What I do":** numbered editorial cells (`01/02/03` ghost numerals, line-art motifs, timeframe tags) on an **uneven** grid — Websites = lead cell spanning two rows at `1.35fr`; Web apps + Automations stack beside it. Never three equal boxes.
- **Break-the-grid mandate:** no two consecutive sections share the same rhythm — alternate contained vs full-bleed cream band, left-aligned vs asymmetric.

## 6. Depth / elevation
- **Paper grain overlay** (SVG `feTurbulence`, ~5–10% opacity; shipped at 5%) = primary depth tool, over `--canvas`.
- Layered creams (`--canvas` vs `--canvas-alt`) separate sections.
- Shadows: minimal, warm-tinted, low — only where a card genuinely lifts. Prefer hairlines + grain over shadow. Never glossy/gradient depth.

## 7. Do's / Don'ts
**Do:** Fraunces for expressive headlines · mono for meta · one olive accent · grain + whitespace · real portrait + real Disciplis screenshot · WCAG AA · alternate section rhythm.
**Don't:** pure `#000`/`#FFF` on the paper surface (exception: text/UI sitting **over hero video footage** may use `#fff` and `color-mix(… #fff)` for legibility against the scrim) · banned fonts (Inter, Roboto, Arial, Helvetica, Space Grotesk, Lato, Open Sans, Source Sans Pro) · three equal boxes · purple/blue gradients · glow/neon · two identical consecutive sections · skill %-bars · "book a call."

## 8. Responsive behavior
- Breakpoints: `640 / 768 / 1024 / 1280`. Mobile-first; fluid type via `clamp`.
- Hero: full-bleed video at every width; content stacks (eyebrow → headline → sub → CTA) over the scrim, marquee strip pinned to the bottom.
- Services grid: 1 col mobile → asymmetric 2-col (`1.35fr 1fr`, lead cell spans 2 rows) ≥768.
- Tap targets ≥44px. Honor `prefers-reduced-motion`.

## 9. Agent prompt guide (for the build model — Fable)
- Always use §2 tokens and §3 fonts; never invent colors/fonts.
- Build **section-by-section**; run the §7 anti-slop checklist on each before moving on.
- Static-first, minimal JS. **Only one JS island:** `src/scripts/motion.ts` — GSAP hero-intro timeline (masked line reveal + video settle + marquee rise) plus **Lenis** smooth scroll on fine-pointer desktop ≥1024 only. A pre-paint `<head>` guard (`html.motion-pending`) + 3s timeout guarantee content never stays hidden; everything no-ops under `prefers-reduced-motion`. Stage 2 (ScrollTrigger Disciplis pinned reveal) hooks into the exposed Lenis instance when built. Everything else CSS (scroll reveals, hover, underline, animated grain).
- Copy in EN first, wrapped in i18n keys (no hardcoded strings).
- Astro + Tailwind; deploy Cloudflare Pages. Target Lighthouse 95+.

## 10. Multilingual (EN / BG)
- Astro i18n with locale routes; small mono language switcher in header + footer. EN primary → BG added after EN ships.
- ✅ **Cyrillic (resolved):** Fraunces + Hanken Grotesk lack the basic Cyrillic block, so `html[lang="bg"]` swaps the stacks — display: **Playfair Display Variable**, body: **Golos Text Variable** (both self-hosted via Fontsource). JetBrains Mono covers Cyrillic natively; no swap needed.
