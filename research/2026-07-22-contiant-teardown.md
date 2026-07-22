# Site Teardown: Contiant

**URL:** https://www.contiant.com
**Built by:** Stan Vision (stan.bg — they self-host SplitText at `https://stan.bg/js/SplitText.min.js`)
**Platform:** Webflow (custom-code embeds carry all the interesting animation)
**Date analyzed:** 2026-07-22

## Tech Stack (Confirmed from Source)

| Technology | Evidence | Purpose |
|---|---|---|
| Webflow + IX2 | `webflow.schunk.*.js`, `data-w-id` attrs, IX2 JSON in bundle | Page structure, scroll reveals, hero word loop, button hovers |
| jQuery 3.5.1 | CDN script tag | Webflow dependency + menu/modal toggles |
| GSAP 3.11.3 | cdnjs script tag | All custom animation |
| ScrollTrigger 3.11.3 | cdnjs script tag | Once-only triggers for SVG draw-ons |
| MotionPathPlugin 3.11.4 | cdnjs script tag | Pulses traveling along SVG connector paths |
| SplitText | hosted at stan.bg | Loaded but unused on homepage (other pages) |
| reCAPTCHA, GA4 | script tags | third-party, ignore |

No Lenis / smooth scroll. No custom cursor. No preloader overlay — instead `body.o-hidden` locks scroll for 2.5s while the staged hero entrance plays.

## Design System

### Colors (`:root` custom properties, confirmed)
| Name | Value |
|---|---|
| --primary (purple, all draw-on strokes) | #8247ff |
| --primary-dark | #3f27ac |
| --primary-light | #dfd1f4 |
| --success (hero teal bg) | #a9cecc |
| --success-dark | #23596d |
| --success-light | #dff3f6 |
| --secondary (blush) | #dfc9c0 |
| --deep | #1f2933 |
| --black | #0d0d0c |
| greys | #7b8794 / #616e7c / #52606d / #9aa5b1 / #cbd2d9 / #e4e7eb / #f5f7fa |

### Typography
| Role | Font | Notes |
|---|---|---|
| Everything | Mori (custom @font-face), fallback sans-serif | Headings weight 400, `letter-spacing: -2px` on `.h--huge` (4.6em, line-height 1) |

### Responsive approach (the "wizardry technique")
`body { font-size: 1vw }` and every component sized in `em` — the whole site scales fluidly. Clamped: fixed 16.43px above 1920px, fixed 8.48px below 991px. Containers max 1870px. One number scales the entire layout.

## Effects Breakdown

| Effect | Implementation | Complexity | Cloneable? |
|---|---|---|---|
| Hero rotating words | Webflow IX2 loop over 5 stacked absolute headings in an overflow-hidden box; in from below, out through top | Low | Yes — cleaner in GSAP |
| Hand-drawn underline draw-on | JS injects a 2-stroke scribble SVG, measures `getTotalLength()`, CSS var + keyframe animates dashoffset | Low | Yes |
| Hand-drawn circle around word | Same technique, single ellipse sketch path | Low | Yes |
| "Three lines" accent pop | Injected SVG, 3 short strokes, GSAP `Back.easeOut` scale pop with stagger | Low | Yes |
| Nav link draw-in underline | Inline SVG wavy path, `stroke-dashoffset` transitioned on `:hover` — pure CSS | Low | Yes |
| Pulses traveling along connector paths | Masked SVG circles driven along paths with MotionPathPlugin; timeline chained with `"<80%"` overlaps, `repeat(-1)` | Med | Yes |
| Hero mouse parallax | mousemove writes `--translate-x/y` on `<body>`; CSS moves each card by `calc(var(--translate-y) / 2.5)` (some layers negative divisors → counter-drift) | Low | Yes |
| Pop-in entrances | `scale 0→1, autoAlpha`, `Back.easeOut.config(1.1)`, stagger 0.12–0.24, willChange set/cleared | Low | Yes |
| Double-text 3D button hover | Two text copies; hover flips hidden copy in from above with `rotateX(50deg) skew(20deg)` under `perspective: 1500px`; double-arrow slide swap (-140% → 0) | Low | Yes |
| Seamless marquee | GSAP `horizontalLoop` helper (the official one, minified inline), duration 180 | Low | Yes |
| Scroll reveals | Webflow IX2 (opacity + translate3d 20–60%) | Low | Better in our GSAP system |
| Spinning badge | CSS `@keyframes` 360° rotate, 12s linear infinite | Trivial | Yes |

## Implementation Details

### 1. Hero rotating words (IX2 data decoded from the bundle)

Markup: 5 sibling headings inside `.home-hero__ab-headings { position: relative; overflow: hidden }`. First is static-positioned (sets box height); the other four are `.ab { position: absolute }`, opacity 0.

Loop mechanics (exact IX2 values):
- Word swap: outgoing word moves `y: -100% → -200%` and fades out; incoming word moves up into the slot and fades in.
- Move: 800ms `outQuart`. Fade: 1000ms `ease` (fade is *slower* than the move — the overlap is what makes it feel soft).
- First word holds 4200ms, then each subsequent word holds ~1000ms + travel (~3.2s cycle per word). Loops forever, cycling back to word 1 (reset step uses duration 0 to re-stack everything below the mask).

The whole entrance is choreographed: nav drops in at 2100ms, headline block rises `y:20%→0` + fades at 2100ms, paragraph at 2200ms (`y:60%→0`), CTA at 2300ms (`y:30%→0`) — all 1000ms `outQuart`. Scroll is locked (`body.o-hidden`) for the first 2500ms.

### 2. Hand-drawn underline / circle / three-lines (the signature move)

The site's personality comes from purple (#8247ff) "marker scribbles" that draw themselves on scroll. All three variants share one pipeline:

1. JS **injects** the SVG into any `.js-text-underline` / `.js-text-circle` / `.js-three-lines` element (template string, `insertAdjacentHTML`).
2. For stroke draw-ons: measure `path.getTotalLength()`, write it to a CSS var `--length`; CSS sets `stroke-dasharray/offset: var(--length)`.
3. `ScrollTrigger.create({ start: "top bottom-=25%", once: true, onEnter })` flips a CSS var `--animation: title-underline`; the CSS keyframe animates `stroke-dashoffset → 0` over **0.9s `cubic-bezier(0.87, 0, 0.13, 1)`**.

Key details that sell it:
- The underline is **two overlapping strokes** with slightly different lengths and wobbly hand-drawn paths, `stroke-linecap: round`, width 3–4 — reads as a real marker double-pass.
- The circle is a single ellipse path that **overshoots ~1.2 laps** (start point ≠ end point), like a real circled word.
- SVG absolutely positioned `top: 80%; left: 50%; translateX(-50%)`, `width: 85%` of the word, `z-index: -1`, `pointer-events: none`.
- Three-lines variant doesn't draw — it **pops** (`Back.easeOut` scale, stagger 0.15), which is faster and punchier for a small accent.

### 3. Nav-link hover underline (pure CSS, zero JS)

```html
<a class="link-underline">Product
  <svg width="64" height="4" viewBox="0 0 64 4" fill="none">
    <path stroke-dashoffset="62.03" stroke-dasharray="62.03"
          d="M1 3C21.7 2.72 42.4 1.76 63 1" stroke="#8247FF" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
</a>
```
```css
.link-underline path { transition: stroke-dashoffset 0.7s cubic-bezier(0.87, 0, 0.13, 1); }
.link-underline:hover path { stroke-dashoffset: 0; }
```
Dasharray/offset are hard-coded to the measured path length. The path is a *slightly curved* line, not straight — that's what keeps the hand-drawn feel.

### 4. Pulses along connector paths (hero + "payments power grid")

An SVG diagram of nodes connected by curved paths. A glowing circle travels along each path:
- Each traveling circle sits inside a `<mask>` so it's only visible over the path region.
- GSAP `MotionPathPlugin`: `{ path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true, start, end }`, 1.28–1.5s `Power2.easeInOut`.
- Enter/exit polish: before the path run, the circle slides in by animating its `cx` attr from `-width-4 → -width/2 → 0` overlapped `"<25%"` — the pulse appears to grow out of the node instead of popping in.
- Multiple paths are chained on one master timeline with `"<80%"` / `"<60%"` position params → cascading, slightly-overlapping pulses. `master.repeat(-1)`.
- Direction is reversed per path by swapping `start: 1, end: 0`.

### 5. Hero mouse parallax via CSS custom properties

```js
hero.addEventListener("mousemove", (e) => {
  const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
  document.body.style.setProperty("--translate-x", -(y * 30) + "px");
  document.body.style.setProperty("--translate-y", -(x * 30) + "px");
});
// mouseleave → reset both to 0
```
```css
.js-hero-img { transition: transform 0.2s linear; }  /* the "lerp" */
[data-target="svg-card--1"] img { transform: translate(calc(var(--translate-x)/2.5), calc(var(--translate-y)/2.5)); }
[data-target="svg-card--1-1"] img { transform: translate(calc(var(--translate-x)/-2.2), calc(var(--translate-y)/-2.2)); }
```
JS writes two numbers; CSS decides per-layer depth. Negative divisors make back layers counter-drift → instant depth. The 0.2s linear transition stands in for lerp smoothing.

### 6. Double-text 3D flip button

`.m-b-text` holds two copies of the label: `.m-b-text-static` (visible) and `.m-b-text-up` (absolute, hidden above at `y:-120%, rotateX(50deg), skew(20deg), scale(0.8)`). Wrapper has `perspective: 1500px`. On hover (IX2): static copy rolls down/out the same way, hidden copy flips in to `y:0, rotateX(0), skew(0)`. Arrow: two arrows in an `overflow:hidden` box — visible one slides out right, absolute one slides in from `x:-140%, scale(0.8)`.

## Assets Needed to Recreate

1. **Hand-drawn SVG paths** — draw in Figma/Illustrator with a pencil tool wobble, 2–4px round-cap strokes. Or trace: the exact `d` attributes are in the skill reference (see below).
2. **Node/connector SVG diagram** — any curved paths work; pulses are plain `<circle>`s.
3. **Mori font** — commercial; substitute any grotesk.

## Build Plan

Not cloning this site — extracting components. All ported patterns live in
`~/.claude/skills/website-motion/references/contiant-components.md` with
drop-in GSAP implementations matched to our stack (no Webflow, no jQuery).

## Notes

- Everything impressive here is GSAP + tiny SVGs + CSS vars — no WebGL, no canvas, no scroll-jacking. Total custom JS ≈ 17KB unminified.
- The staged entrance locking scroll for 2.5s conflicts with our "no preloader, content fast" rule — we keep our staging instead.
- Their scroll reveals are `once`-style Webflow IX2; ours replay with fast hides — keep ours.
