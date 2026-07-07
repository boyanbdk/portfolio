# Design Research — boyanbudakov.com (2026-07-07)

Decision-ready brief for an Astro + Tailwind portfolio built to land work, look elite, and avoid the "AI-slop" look. All fonts free + self-hostable; static-first, minimal-JS.

---

## The 3 directions to choose between (pick ONE)

### Option 1 — "Editorial Founder" (warm-premium) ★ recommended
- **Fonts:** Fraunces (headings) + Hanken Grotesk (body); Fraunces italic for quotes.
- **Color:** cream base `#F5F1E8` (never pure white), warm ink `#1A1714`, one muted accent (olive `#6B6B47` or ink-blue); paper-grain overlay.
- **Layout signature:** asymmetric type-first hero + real portrait in a split; editorial grid; uneven bento; offset case-study card, generous whitespace.
- **Motion:** CSS scroll-reveal + animated grain; one GSAP-pinned Disciplis reveal.
- **Why:** most human, most premium, lowest AI-look risk; differentiates hardest from other dev portfolios.

### Option 2 — "Swiss Engineer" (typographic)
- **Fonts:** Switzer (everything) + JetBrains Mono for labels/metadata/section numbers.
- **Color:** paper-white base, near-black type, one saturated accent (cobalt or signal red) for links/CTA only.
- **Layout signature:** oversized type hero, exposed grid rules, mono metadata, strict rhythm broken deliberately once per view.
- **Motion:** pure-CSS entrances + underline reveals; optional single scrub island.
- **Why:** cool, precise, "senior taste," fastest to build, near-zero slop risk. Colder than Option 1.

### Option 3 — "Refined Dark-Technical" (founder-who-ships)
- **Fonts:** Geist Sans (headings + body) + Geist Mono (accents); or Bricolage Grotesque headings for more character.
- **Color:** deep charcoal `#0E0F11` (not pure black), off-white text ~90%, one accent (electric lime / cyan / amber) used sparingly, hairline low-opacity borders, subtle grain (no glow-gradient).
- **Layout signature:** asymmetric hero, hairline-bordered bento, mono metadata, one deliberate accent moment.
- **Motion:** CSS scroll-driven reveals; one GSAP pin for Disciplis.
- **Why:** strongest "AI-tooling builder" signal, matches the niche. Highest execution risk (dark+gradient is slop territory) — must lean on grain + typographic discipline, not glow.

---

## Reference detail

### Typography options (free, self-hostable via Fontsource; woff2 only, subset, `font-display: swap`)
| Direction | Heading | Body | Mono / accent |
|---|---|---|---|
| Editorial-Minimal | Fraunces | Hanken Grotesk | Fraunces italic |
| Swiss/Typographic | Switzer (Fontshare) | Switzer (light) | Space Mono / JetBrains Mono |
| Dark-Technical | Geist Sans | Geist Sans | Geist Mono / JetBrains Mono |
| Refined-Brutalist | Bricolage Grotesque | Hanken Grotesk | Space Mono |

Strongest overall pairing: **Fraunces + Hanken Grotesk.** A sans + mono contrast (mono for labels/timestamps/section numbers) is the most reliable "made by an engineer, not a template" signal.

### Color rules (avoid the AI look)
- One dominant color + sharp accents — NOT a balanced spread.
- Never pure `#000`/`#FFF`. Pick ONE accent, be disciplined.
- Verify every text/bg pair at WCAG AA (4.5:1 body, 3:1 large).
- Depth from grain + layered neutrals + shadow — never a soft purple/blue gradient.

### Layout & sections
- **Hero:** avoid centered headline + subhead + two buttons (the slop default). Use type-first asymmetric, split 60/40, or editorial grid.
- **"What I do" (Websites / Web apps / Automations):** bento grid with *uneven* cell weights (one large + smaller cells), not three equal boxes.
- **Selected work (Disciplis):** offset/asymmetric card; show the decision + trade-off + live-SaaS proof (screenshot + live link + one metric).
- **Break-the-grid mandate:** no two consecutive sections share the same rhythm (alternate full-bleed/contained, light/dark, aligned/asymmetric).

### Motion (CSS-first, one JS island max)
- Pure CSS (no JS): scroll-driven reveals via `animation-timeline: view()`, hover states, underline reveals, subtle animated grain, sticky-scale headers. ~90% of the motion at zero bundle cost.
- One island only: GSAP + ScrollTrigger (scoped + lazy) for a pinned Disciplis reveal. Respect `prefers-reduced-motion`. Never load an animation lib globally.

### Components (21st.dev / shadcn — port markup to `.astro`)
- Hero Bento Grid block (shadcn.io) for "What I do."
- Bento Grid (21st.dev designali-in / Launch UI / Shadcn Studio).
- Testimonials — 21st.dev collection (minimal single-quote or marquee, not a card wall).
- Footer — 21st.dev Motion Footer / Animated Footer (statement footer = cheap premium signal).
- Case-study section — build CUSTOM (shadcn card + GSAP pin). This is the differentiator; don't template it.

### Hero imagery — verdict
- **Do NOT use a generic AI-generated hero image** — it undercuts a "not AI-generated" site.
- Priority: (1) type-as-hero / no image; (2) a real portrait photo of Boyan; (3) abstract texture (SVG `feTurbulence` grain, grainy gradient) behind type; (4) a real Disciplis product render. If ever generating: high-grain analog/film look, single dominant color + sharp accent — never smooth gradients or glossy 3D blobs.

### Anti-slop guardrails to enforce in build
- No banned fonts (Inter, Roboto, Arial, Helvetica, Space Grotesk, Lato, Open Sans, Source Sans Pro).
- Never pure `#000`/`#FFF`; one accent only; WCAG AA on every pair.
- No two consecutive sections with identical rhythm.
- Depth from grain + layered neutrals + shadow — never a soft purple/blue gradient.

### Sources
Typewolf (portfolio sites, Google Fonts), The Crit & Precode (font pairings), prg.sh (why AI builds the same purple gradient), Awwwards (Aristide Swiss portfolio), Wix (brutalist), Lexington (hero sections 2026), CreateToday (Astro portfolios), Motion.dev (GSAP vs Motion), CSS-Tricks (grainy gradients), 21st.dev, shadcn.io, Envato (portfolio trends 2026).
