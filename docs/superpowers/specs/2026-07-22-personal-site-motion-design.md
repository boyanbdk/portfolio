# Personal Site Motion Pass — Contiant Components

**Date:** 2026-07-22
**Status:** Approved by Boyan (brainstorming session with visual mockups)
**Source:** Contiant.com teardown (`research/2026-07-22-contiant-teardown.md`) +
component arsenal (`~/.claude/skills/website-motion/references/contiant-components.md`)

## Goal

Add five Contiant-derived motion components to boyanbudakov.com, integrated
into the existing motion island and obeying the website-motion playbook
(pre-paint guard, reduced-motion teardown, mobile/desktop tiering,
replay-reveals-with-fast-hides).

Decisions made interactively: keep the bento layout (scrollytelling rebuild
rejected); scribble #2 is the circle on "proves" (About/Contact placements
rejected); all four optional components accepted.

## Components

### 1. Marker scribbles (exactly two on the page, both `once: true`)

Hand-drawn olive (`var(--color-accent)`) SVG accents that draw themselves on
first scroll into view. Marker accents FIRE ONCE — an explicit exception to
the replay-reveals rule (un-drawing a marker stroke on every pass reads
wrong). Under `prefers-reduced-motion` they render pre-drawn.

- **Scribble #1 — underline.** [WhatIDo.astro](../../../src/components/WhatIDo.astro)
  services heading: double-stroke wobbly underline under the word **"help"**
  (EN) / **"помогна"** (BG). Draw: 0.9s `cubic-bezier(0.87, 0, 0.13, 1)`,
  second stroke delayed ~0.12s. Trigger: `top bottom-=25%`.
- **Scribble #2 — circle.** SelectedWork heading: ellipse (~1.2 laps,
  open start/end) around **"proves"** (EN) / **"доказва"** (BG). Draw: 1.1s,
  same ease, same trigger.

Implementation: JS injects the SVG into the marked span, measures
`path.getTotalLength()`, writes `--length` custom property; CSS holds
`stroke-dasharray/offset: var(--length)`; a class flip starts the CSS
keyframe. SVG absolutely positioned (`top: 80%` for underline; negative
inset for circle), behind text, `pointer-events: none`, stretches with the
word so EN/BG lengths both work.

Marked-word wrapping: the affected title strings are split in
[ui.ts](../../../src/i18n/ui.ts) into pre/mark/post keys
(`services.title.pre` + `services.title.mark`; `work.title.pre` +
`work.title.mark` + `work.title.post`) for BOTH locales, and the components
render `{pre} <span data-scribble="…">{mark}</span> {post}` — no `set:html`,
no English-only word matching.

### 2. Bento scroll choreography (WhatIDo section)

The three service cards leave the generic `.reveal` batch and get a
dedicated sequence:

- Cards rise (`y: 18 → 0`, `autoAlpha`) in strict 01 → 02 → 03 order,
  stagger ~0.14s, regardless of grid position.
- Each card's border flashes olive as it lands (~55% through its rise),
  then settles back to `var(--color-line)` — the "handoff". The lead card's
  permanent olive top border stays.
- Each sketch's **solid accent strokes** (`.svc__accent-stroke`) draw in
  per-card (dashoffset technique or DrawSVG). The **CSS-dashed strokes**
  (`.svc__dash`) keep their current fade-in and hover marching-ants —
  playbook rule: dashed strokes never go through draw animation.
- Replay rule applies: scrolling back up re-hides (fast, ~0.28s
  `power1.out`); scrolling down replays. Only the heading scribble is once.

### 3. Traveling pulse (Automations card sketch)

The 03 card's flow sketch (two sources → agent circle → output box) gets a
live olive pulse:

- The existing static `.svc__pulse` dot becomes the traveler.
- MotionPathPlugin runs it along the existing dashed connector paths:
  source-1 → agent, then source-2 → agent (alternating), then agent →
  output; brief `repeatDelay` between laps; `repeat: -1`.
- Plays only while the card is on screen (ScrollTrigger `onEnter: play`,
  `onLeave: pause`). Desktop-only (`pointer: fine` && ≥1024px). Killed by
  the reduced-motion teardown.
- MotionPathPlugin ships in the `gsap` package — registered alongside the
  existing plugins, no new dependency.

### 4. Hero sub-line rotating words

Current sub: "Websites, web apps and automations — from idea to live
product in days."

- New structure: `[SLOT] — from idea to live product in days.` with the
  slot cycling **Websites / Web apps / AI automations** (BG equivalents in
  `bg` locale).
- i18n change in [ui.ts](../../../src/i18n/ui.ts): split `hero.sub` into
  `hero.sub.words` (3 entries) + `hero.sub.tail`, both locales.
- Slot is an inline-block sized to its widest word at boot (no layout
  shift); words stacked absolute inside `overflow: hidden`.
- Timing (Contiant-decoded): move 0.8s `power4.out`, fade 1.0s (slower than
  the move — that overlap is the feel), hold ~2.4s per word. First cycle
  starts only after the hero entrance completes.
- Pauses when the tab is hidden or the hero is scrolled off screen.
- Reduced motion / JS failure: first word shown statically; screen readers
  get an sr-only static full sentence, the rotator is `aria-hidden`.

### 5. Nav-link draw-in underline (header)

- Each header nav link gets an inline SVG: one slightly **curved** path
  (never straight), olive, `stroke-width` ~1.5, round cap, positioned under
  the label.
- `pathLength="100"` + `stroke-dasharray: 100; stroke-dashoffset: 100`;
  `:hover`/`:focus-visible` transitions dashoffset to 0 over 0.7s
  `cubic-bezier(0.87, 0, 0.13, 1)`; reverses on leave. No JS, no measuring,
  works for both languages' label widths.
- Under reduced motion the transition is dropped (instant underline).

## Architecture

- All JS lives in the existing motion island (`src/scripts/motion.ts`):
  four new init functions (`initScribbles`, `initServiceChoreography`,
  `initAutomationPulse`, `initHeroSubRotator`), called from the existing
  boot path so they inherit the pre-paint guard, reduced-motion no-op boot,
  live teardown, and tiering.
- Markup hooks added in the Astro components (`data-scribble="underline"`,
  `data-scribble="circle"`, `data-rotate-words`, sketch path classes as
  needed). Nav underline is pure Astro markup + scoped CSS in Header.
- No new npm packages.

## Error handling

- JS failure: pre-paint guard self-heals in 3s; scribbles simply never
  inject (headings read normally); rotator shows first word (server-rendered
  text); nav underline is CSS-only and unaffected.
- Reduced-motion mid-session flip: existing teardown kills the pulse loop
  and rotator timer; scribbles get `clearProps`/pre-drawn state.

## Testing

- `npm run build` clean.
- Browser pass (dev server) over EN and BG homepages: choreography order,
  scribble draw + word wrapping on both languages, rotator hold/no
  layout-shift, pulse pathing, nav hover.
- Reduced-motion spot-check (emulate in devtools): nothing animates,
  nothing hidden.
- Mobile viewport: choreography still runs (cheap transforms), pulse and
  nav-underline absent, rotator still cycles.

## Out of scope

- AutoSilas site and Iris demo (separate passes; accents will be champagne
  and need contrast verification per the spotlight-card lesson).
- Any scrollytelling/pinned section (explicitly rejected).
- Additional scribbles beyond the two above (taste cap).
