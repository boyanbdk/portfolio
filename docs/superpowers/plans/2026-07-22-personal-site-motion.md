# Personal Site Motion Pass (Contiant Components) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add five Contiant-derived motion components (2 marker scribbles, bento choreography, traveling pulse, hero rotating words, nav draw-in underline) to boyanbudakov.com per the approved spec `docs/superpowers/specs/2026-07-22-personal-site-motion-design.md`.

**Architecture:** All JS goes in the existing single motion island `src/scripts/motion.ts` (GSAP + ScrollTrigger, pre-paint guard, reduced-motion teardown, desktop tiering). Markup hooks go in the Astro components. Nav underline is pure CSS in `Header.astro`. i18n strings split in `src/i18n/ui.ts` for both locales.

**Tech Stack:** Astro, GSAP 3 (ScrollTrigger, SplitText, DrawSVGPlugin already registered; ADD MotionPathPlugin — ships inside the `gsap` npm package, NO new dependency), TypeScript, scoped Astro CSS + `src/styles/global.css`.

## Global Constraints

- No new npm packages. MotionPathPlugin imports from `gsap/MotionPathPlugin`.
- Scribble accents are `once: true` — they do NOT replay (explicit exception to the site's replay-reveals rule). Everything else follows `REVEAL_MODE = 'replay'` with fast hides (`HIDE` const, 0.28s).
- All animation colors use `var(--color-accent)` (olive `#a3a375`) — never Contiant purple.
- Both locales (EN at `/`, BG at `/bg/`) must render correctly — no English-only word matching.
- Reduced motion: every new effect is either pre-drawn/static or killed by `neutralizeMotion()`; new elements must be added to its `clearProps` list.
- Desktop tier (`desktop` const: fine pointer && ≥1024px): traveling pulse only. Choreography, scribbles, rotator run everywhere. Nav underline is desktop-hover CSS (mobile nav is hidden anyway).
- There is no JS test runner in this repo. Each task's test cycle is: `npm run build` must pass + a specific browser verification via the dev server (`npm run dev`, port 4321). Verification steps state exactly what to look for.
- The repo auto-deploys from `main` on push — commit locally, do NOT push during this plan.

---

### Task 1: i18n splits + markup hooks (scribble spans, hero sub slot)

**Files:**
- Modify: `src/i18n/ui.ts` (EN strings ~lines 34, 47, 75; BG strings ~lines 309, 322, 349)
- Modify: `src/components/WhatIDo.astro:13`
- Modify: `src/components/SelectedWork.astro:17`
- Modify: `src/components/Hero.astro:50`
- Modify: `src/styles/global.css` (add `.sr-only` utility — currently absent)

**Interfaces:**
- Produces: i18n keys `services.title.pre`, `services.title.mark`, `work.title.pre`, `work.title.mark`, `work.title.post`, `hero.sub.w1`, `hero.sub.w2`, `hero.sub.w3`, `hero.sub.tail` (existing `hero.sub` KEPT for the sr-only sentence). DOM hooks: `[data-scribble="underline"]`, `[data-scribble="circle"]`, `[data-rotate-words]`, `.hero__sub-word`, `.hero__sub-slot`.
- Consumes: nothing (first task).

- [ ] **Step 1: Split the EN strings in `src/i18n/ui.ts`**

Replace line 47 `'services.title': 'Three ways I can help',` with:

```ts
    'services.title.pre': 'Three ways I can',
    'services.title.mark': 'help',
```

Replace line 75 `'work.title': 'One that proves the point',` with:

```ts
    'work.title.pre': 'One that',
    'work.title.mark': 'proves',
    'work.title.post': 'the point',
```

After line 34 (`'hero.sub': …` — KEEP this line), add:

```ts
    'hero.sub.w1': 'Websites',
    'hero.sub.w2': 'Web apps',
    'hero.sub.w3': 'AI automations',
    'hero.sub.tail': '— from idea to live product in days.',
```

- [ ] **Step 2: Split the BG strings in `src/i18n/ui.ts`**

Replace `'services.title': 'Три начина да помогна',` (~line 322) with:

```ts
    'services.title.pre': 'Три начина да',
    'services.title.mark': 'помогна',
```

Replace `'work.title': 'Един, който доказва тезата',` (~line 349) with:

```ts
    'work.title.pre': 'Един, който',
    'work.title.mark': 'доказва',
    'work.title.post': 'тезата',
```

After the BG `'hero.sub': …` line (~309 — KEEP it), add:

```ts
    'hero.sub.w1': 'Уебсайтове',
    'hero.sub.w2': 'Уеб приложения',
    'hero.sub.w3': 'AI автоматизации',
    'hero.sub.tail': '— от идея до жив продукт за дни.',
```

- [ ] **Step 3: Update the three components**

`src/components/WhatIDo.astro` line 13, replace:

```astro
<h2 id="services-heading">{t('services.title')}</h2>
```

with:

```astro
<h2 id="services-heading">
  {t('services.title.pre')}
  <span data-scribble="underline">{t('services.title.mark')}</span>
</h2>
```

`src/components/SelectedWork.astro` line 17, replace:

```astro
<h2 id="work-heading">{t('work.title')}</h2>
```

with:

```astro
<h2 id="work-heading">
  {t('work.title.pre')}
  <span data-scribble="circle">{t('work.title.mark')}</span>
  {t('work.title.post')}
</h2>
```

`src/components/Hero.astro` line 50, replace:

```astro
<p class="hero__sub" data-hero-rise>{t('hero.sub')}</p>
```

with:

```astro
<p class="hero__sub" data-hero-rise>
  <span class="sr-only">{t('hero.sub')}</span>
  <span aria-hidden="true" class="hero__sub-visual">
    <span class="hero__sub-slot" data-rotate-words>
      <span class="hero__sub-word">{t('hero.sub.w1')}</span>
      <span class="hero__sub-word">{t('hero.sub.w2')}</span>
      <span class="hero__sub-word">{t('hero.sub.w3')}</span>
    </span>
    {' '}{t('hero.sub.tail')}
  </span>
</p>
```

- [ ] **Step 4: Add `.sr-only` utility + slot base CSS to `src/styles/global.css`**

Append at the end of the file:

```css
/* screen-reader-only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

/* hero rotating-words slot: words stack; JS sizes the box and cycles.
   Without JS only the first word is visible — a valid static sentence. */
.hero__sub-slot {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  color: var(--color-accent);
}
.hero__sub-word {
  display: inline-block;
  white-space: nowrap;
}
.hero__sub-word:not(:first-child) {
  position: absolute;
  left: 0;
  top: 0;
  visibility: hidden;
}
```

- [ ] **Step 5: Build + verify both locales**

Run: `npm run build`
Expected: exits 0, no missing-i18n-key errors.
Then `npm run dev` and check `http://localhost:4321/` and `http://localhost:4321/bg/`: services heading reads "Three ways I can help" / "Три начина да помогна" (span invisible to the eye), work heading intact, hero sub shows "Websites — from idea to live product in days." / BG equivalent (first word only, no cycling yet).

- [ ] **Step 6: Commit**

```bash
git add src/i18n/ui.ts src/components/WhatIDo.astro src/components/SelectedWork.astro src/components/Hero.astro src/styles/global.css
git commit -m "Motion pass groundwork: split i18n strings, scribble/rotator markup hooks"
```

---

### Task 2: Nav-link draw-in underline (pure CSS)

**Files:**
- Modify: `src/components/Header.astro` (nav markup lines 18–26, styles lines 90–96)

**Interfaces:**
- Consumes: nothing.
- Produces: nothing used by later tasks (self-contained CSS effect).

- [ ] **Step 1: Add the SVG to each nav link**

In `src/components/Header.astro`, replace the nav block (lines 18–26):

```astro
    <nav class="header__nav" aria-label="Primary">
      {
        nav.map((item) => (
          <a href={localizePath(lang, item.href)} class="link header__link">
            {t(item.key)}
            <svg class="header__link-ink" viewBox="0 0 64 4" preserveAspectRatio="none" aria-hidden="true">
              <path d="M1 3C21.7 2.7 42.4 1.8 63 1" pathLength="100" />
            </svg>
          </a>
        ))
      }
    </nav>
```

The path is slightly curved on purpose (hand-drawn feel) — never straighten it. `pathLength="100"` normalizes the dash math so one path works for every label width in both languages; `preserveAspectRatio="none"` lets it stretch.

- [ ] **Step 2: Add the styles**

In the same file's `<style>`, replace the `.header__link` rules (lines 90–96):

```css
  .header__link {
    position: relative;
    display: inline-block;
    font-size: 0.95rem;
    color: var(--color-ink-soft);
  }
  .header__link:hover,
  .header__link:focus-visible {
    color: var(--color-accent);
  }
  .header__link-ink {
    position: absolute;
    left: 0;
    bottom: -0.28em;
    width: 100%;
    height: 4px;
    pointer-events: none;
    overflow: visible;
  }
  .header__link-ink path {
    fill: none;
    stroke: var(--color-accent);
    stroke-width: 1.5;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    transition: stroke-dashoffset 0.7s cubic-bezier(0.87, 0, 0.13, 1);
  }
  .header__link:hover .header__link-ink path,
  .header__link:focus-visible .header__link-ink path {
    stroke-dashoffset: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .header__link-ink path {
      transition: none;
    }
  }
```

`vector-effect: non-scaling-stroke` keeps the stroke 1.5px even though the SVG stretches per label.

- [ ] **Step 3: Verify**

Run: `npm run build` → exits 0. In the dev server (≥768px viewport): hovering each of the 4 nav links draws an olive curved stroke left→right in 0.7s; it un-draws on leave; Tab focus draws it too. Check on `/bg/` — longer BG labels still get a full-width stroke.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.astro
git commit -m "Header: hand-drawn draw-in underline on nav links (pure CSS)"
```

---

### Task 3: Marker scribbles (underline + circle, draw-on-scroll, once)

**Files:**
- Modify: `src/scripts/motion.ts` (new `initScribbles()`; splitting exclusion at lines 80–88; boot at line 344; `neutralizeMotion` at line 312)
- Modify: `src/styles/global.css` (scribble CSS)

**Interfaces:**
- Consumes: `[data-scribble="underline"]` and `[data-scribble="circle"]` spans from Task 1.
- Produces: `initScribbles(): void` in `motion.ts`; CSS classes `.scribble-svg`, `.is-drawn`; CSS var `--length` per path.

- [ ] **Step 1: Exclude scribble headings from SplitText**

Split-line masks clip anything drawn outside the text box (Contiant hit this and hacked `overflow: visible !important` onto its line wrappers — with our replay mode that hack breaks re-hides, so exclusion is the clean fix). These two headings use the container `.reveal` rise instead, which their `<header>` parents already have.

In `src/scripts/motion.ts`, replace `isSplitTarget` (lines 80–82):

```ts
function isSplitTarget(el: Element) {
  return (
    el.matches(SPLIT_SELECTOR) &&
    !el.closest('[data-hero]') &&
    !el.querySelector('[data-scribble]')
  );
}
```

and replace the headings collection in `splitHeadings()` (lines 85–88):

```ts
  const headings = gsap.utils
    .toArray<HTMLElement>(SPLIT_SELECTOR)
    .filter((h) => isSplitTarget(h));
```

- [ ] **Step 2: Add scribble CSS to `src/styles/global.css`**

Append:

```css
/* marker scribbles — injected by motion.ts, drawn once on scroll */
[data-scribble] {
  position: relative;
  display: inline-block;
}
.scribble-svg {
  position: absolute;
  pointer-events: none;
  overflow: visible;
  z-index: -1;
}
.scribble-svg--underline {
  top: 78%;
  left: 50%;
  transform: translateX(-50%);
  width: 104%;
  height: auto;
}
.scribble-svg--circle {
  top: -26%;
  left: -10%;
  width: 120%;
  height: 148%;
}
.scribble-svg path {
  fill: none;
  stroke: var(--color-accent);
  stroke-linecap: round;
  stroke-dasharray: var(--length);
  stroke-dashoffset: var(--length);
}
.is-drawn .scribble-svg path {
  animation: scribble-draw 0.9s cubic-bezier(0.87, 0, 0.13, 1) forwards;
}
.is-drawn .scribble-svg--underline path:nth-child(2) {
  animation-delay: 0.12s; /* second marker pass lags the first */
}
.is-drawn .scribble-svg--circle path {
  animation-duration: 1.1s; /* longer path, longer draw */
}
@keyframes scribble-draw {
  to {
    stroke-dashoffset: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .scribble-svg path {
    stroke-dashoffset: 0;
    animation: none;
  }
}
```

- [ ] **Step 3: Add `initScribbles()` to `src/scripts/motion.ts`**

Insert after `sectionMoments()` (after line 270):

```ts
/* ── marker scribbles (Contiant port, 2026-07-22) ─────────────────── */

const SCRIBBLE_UNDERLINE = `
<svg class="scribble-svg scribble-svg--underline" viewBox="0 0 448 26" aria-hidden="true">
  <path d="M73.4 22.9C166.6 20.3 259.9 18.2 352.9 14.8c3.4-.1 15.2-.3 21.7-1" stroke-width="4"/>
  <path d="M2 20.2C62.5 15 123.5 13.4 184.1 11.1 262.3 8.2 340.5 5.2 418.8 4.3c8.5-.1 34-.7 25.5-1.2" stroke-width="4"/>
</svg>`;

const SCRIBBLE_CIRCLE = `
<svg class="scribble-svg scribble-svg--circle" viewBox="0 0 311 96" aria-hidden="true">
  <path d="M192 8.5c35.5-1.3 75.3 2.5 99.4 13.2 23 10.1 24.6 27.1-2.1 41.7-25.8 14-66.4 20.4-99.3 24.6-34.6 4.4-70 6.9-103.4 5.8-29-.9-62.6-3.9-78.3-15.6-10.8-8.1-7.3-19.3 3.9-29.3C41.3 22.8 106.1 5.4 158.6 2.3c35.8-2.2 67.8 3.1 90.9 13.9" stroke-width="3"/>
</svg>`;

/** Hand-drawn accents that draw themselves once (marker accents never replay). */
function initScribbles() {
  document.querySelectorAll<HTMLElement>('[data-scribble]').forEach((word) => {
    const kind = word.dataset.scribble;
    word.insertAdjacentHTML(
      'beforeend',
      kind === 'circle' ? SCRIBBLE_CIRCLE : SCRIBBLE_UNDERLINE
    );
    word.querySelectorAll<SVGPathElement>('.scribble-svg path').forEach((p) => {
      p.style.setProperty('--length', String(p.getTotalLength()));
    });
    ScrollTrigger.create({
      trigger: word,
      start: 'top bottom-=25%',
      once: true, // accents fire once — intentional exception to replay
      onEnter: () => word.classList.add('is-drawn'),
    });
  });
}
```

- [ ] **Step 4: Boot + teardown wiring**

In the boot block (after `splitHeadings();` at line 348) add:

```ts
  initScribbles();
```

In `neutralizeMotion()` add `'.scribble-svg path'` to the `gsap.set([...], { clearProps: 'all' })` selector array (the reduced-motion CSS then shows them fully drawn), and after that `gsap.set` call add:

```ts
  document.querySelectorAll('[data-scribble]').forEach((w) => w.classList.add('is-drawn'));
```

(with the CSS media query the paths render pre-drawn, no animation).

- [ ] **Step 5: Verify**

`npm run build` → 0. Dev server: scroll to "Three ways I can help" — the olive double-stroke underline draws under "help" (~0.9s, second stroke lagging); scroll to "One that proves the point" — circle sketches around "proves" (~1.1s). Scroll up and back down — they do NOT redraw (stay drawn). Both headings still rise with their header containers (no SplitText mask on these two — inspect: no `.split-line` inside them). Repeat on `/bg/` for "помогна" and "доказва" — SVGs stretch to the longer words. DevTools → emulate `prefers-reduced-motion: reduce` → reload: scribbles visible, fully drawn, static.

- [ ] **Step 6: Commit**

```bash
git add src/scripts/motion.ts src/styles/global.css
git commit -m "Marker scribbles: draw-on underline (services) + circle (work), once-only"
```

---

### Task 4: Bento scroll choreography (01→02→03 handoff)

**Files:**
- Modify: `src/components/WhatIDo.astro` (cards at lines 20, 56, 84)
- Modify: `src/scripts/motion.ts` (new `initServiceChoreography()`; boot; `neutralizeMotion`)

**Interfaces:**
- Consumes: `.svc` cards (Task 1 markup unchanged here).
- Produces: `initServiceChoreography(): void`; cards get `data-svc-seq` attr; outline used for the flash (never `border-color` — the cards' CSS hover owns that transition).

- [ ] **Step 1: Take the three cards out of the generic reveal batch**

In `src/components/WhatIDo.astro`, remove ` reveal` from the three `<article>` class lists (lines 20, 56, 84) and add sequence markers:

```astro
<article class="card svc svc--lead" data-svc-seq="1">
```
```astro
<article class="card svc" data-svc-seq="2">
```
```astro
<article class="card svc" data-svc-seq="3">
```

(The `services__head` header keeps its `reveal` class.)

- [ ] **Step 2: Add `initServiceChoreography()` to `src/scripts/motion.ts`**

Insert after `initScribbles()`:

```ts
/* ── bento choreography: strict 01→02→03 with olive handoff ───────── */

function initServiceChoreography() {
  const cards = gsap.utils
    .toArray<HTMLElement>('[data-svc-seq]')
    .sort((a, b) => Number(a.dataset.svcSeq) - Number(b.dataset.svcSeq));
  if (!cards.length) return;

  const section = document.querySelector<HTMLElement>('#what-i-do');
  gsap.set(cards, { autoAlpha: 0, y: 18 });

  const enter = () => {
    const tl = gsap.timeline();
    cards.forEach((card, i) => {
      tl.to(
        card,
        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', overwrite: true },
        i * 0.14
      );
      // olive flash as the card lands — outline, NOT border-color (the CSS
      // hover transition owns border-color and would fight the tween)
      tl.fromTo(
        card,
        { outlineColor: 'rgba(163, 163, 117, 0.9)', outlineWidth: 1, outlineOffset: -1, outlineStyle: 'solid' },
        {
          outlineColor: 'rgba(163, 163, 117, 0)',
          duration: 0.9,
          ease: 'power2.out',
          onComplete: () => gsap.set(card, { clearProps: 'outline,outlineColor,outlineWidth,outlineOffset,outlineStyle' }),
        },
        i * 0.14 + 0.38 // flash begins ~55% through the rise
      );
    });
  };

  ScrollTrigger.create({
    trigger: section ?? cards[0],
    start: 'top 80%',
    once: !replay,
    onEnter: enter,
    onLeaveBack: replay ? () => gsap.to(cards, { autoAlpha: 0, y: 18, ...HIDE }) : undefined,
  });
}
```

- [ ] **Step 3: Boot + teardown wiring**

In the boot block, after `initScribbles();` add:

```ts
  initServiceChoreography();
```

In `neutralizeMotion()` add `'[data-svc-seq]'` to the `clearProps` selector array.

- [ ] **Step 4: Verify**

`npm run build` → 0. Dev server: scroll to the services section — the lead Websites card rises first, then Apps, then Automations (strict order despite the grid placing 02/03 in a right column), each getting a brief olive outline flash as it lands; the lead card's permanent olive top border unaffected. Scroll up past the section → cards hide fast (0.28s); scroll down → sequence replays (flash included). Sketches still draw stroke-by-stroke on desktop (existing `sectionMoments` untouched). Narrow the window below 1024px → cards still choreograph (no sketch drawing — that's desktop-tier, unchanged).

- [ ] **Step 5: Commit**

```bash
git add src/components/WhatIDo.astro src/scripts/motion.ts
git commit -m "Services bento: sequential 01→02→03 choreography with olive handoff"
```

---

### Task 5: Traveling pulse on the Automations sketch

**Files:**
- Modify: `src/components/WhatIDo.astro` (Automations SVG, lines 89–104)
- Modify: `src/scripts/motion.ts` (MotionPathPlugin import/register lines 11–16; new `initAutomationPulse()`; desktop boot lines 350–354; `neutralizeMotion`)

**Interfaces:**
- Consumes: Automations card SVG paths (get classes `.svc__flow-1/2/3` this task); `.svc__pulse` circle from the existing markup (`WhatIDo.astro:97`).
- Produces: `initAutomationPulse(): void`; module-level `pulseTl: gsap.core.Timeline | undefined` (killed in `neutralizeMotion`).

- [ ] **Step 1: Class the connector paths**

In `src/components/WhatIDo.astro` (lines 98–100), the three dashed paths get identifying classes:

```astro
            <path class="svc__dash svc__flow-1" d="M62 41c26 0 32 22 40 27" stroke-dasharray="4 5" />
            <path class="svc__dash svc__flow-2" d="M62 109c26 0 32-22 40-27" stroke-dasharray="4 5" />
            <path class="svc__dash svc__flow-3" d="M135 75h32" stroke-dasharray="4 5" />
```

- [ ] **Step 2: Register MotionPathPlugin**

In `src/scripts/motion.ts` lines 11–16, add the import and registration:

```ts
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
```
```ts
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin);
```

- [ ] **Step 3: Add `initAutomationPulse()`**

Insert after `initServiceChoreography()`. Module-level state next to `let lenis` (line 23): `let pulseTl: gsap.core.Timeline | undefined;`

```ts
/* ── automations card: olive pulse travels the flow diagram ────────── */

function initAutomationPulse() {
  const svg = document.querySelector<SVGSVGElement>('[data-svc-seq="3"] .svc__motif');
  const dot = svg?.querySelector<SVGCircleElement>('.svc__pulse');
  if (!svg || !dot) return;
  const flows = ['.svc__flow-1', '.svc__flow-2', '.svc__flow-3'].map((s) =>
    svg.querySelector<SVGPathElement>(s)
  );
  if (flows.some((f) => !f)) return;

  // the dot leaves its resting spot (agent core) and runs each connector;
  // sources feed IN (start 1 → end 0), output runs OUT (0 → 1)
  const leg = (path: SVGPathElement, from: number, to: number) =>
    gsap
      .timeline()
      .set(dot, { opacity: 0 })
      .to(dot, {
        opacity: 1,
        duration: 0.15,
        motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: from, end: from },
      })
      .to(dot, {
        duration: 1.1,
        ease: 'power2.inOut',
        motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: from, end: to },
      })
      .to(dot, { opacity: 0, duration: 0.15 });

  pulseTl = gsap.timeline({ repeat: -1, repeatDelay: 0.6, paused: true });
  pulseTl
    .add(leg(flows[0]!, 1, 0))          // source 1 → agent (inward)
    .add(leg(flows[1]!, 1, 0), '<75%')  // source 2 chases it, overlapping
    .add(leg(flows[2]!, 0, 1), '>-0.1') // agent → output
    .set(dot, { clearProps: 'all' });   // rest state between laps

  ScrollTrigger.create({
    trigger: svg,
    start: 'top 90%',
    end: 'bottom top',
    onEnter: () => pulseTl?.play(),
    onLeave: () => pulseTl?.pause(),
    onEnterBack: () => pulseTl?.play(),
    onLeaveBack: () => pulseTl?.pause(),
  });
}
```

- [ ] **Step 4: Boot + teardown wiring**

In the desktop-only boot block (lines 350–354), after `sectionMoments();` add:

```ts
    initAutomationPulse();
```

In `neutralizeMotion()`, before the `gsap.set` call add:

```ts
  pulseTl?.kill();
  pulseTl = undefined;
```

and add `'.svc__pulse'` to the `clearProps` selector array.

- [ ] **Step 5: Verify**

`npm run build` → 0. Dev server ≥1024px: in the Automations card, after the sketch draws, the olive dot repeatedly runs source-1 → agent, then source-2 → agent, then agent → output, with a 0.6s beat between laps. Scroll the card off screen → (devtools: `gsap.globalTimeline` still running but pulse paused — or just observe on return it resumes cleanly). Below 1024px: dot is the original static dot. Reduced-motion emulation: no pulse, dot static.

- [ ] **Step 6: Commit**

```bash
git add src/components/WhatIDo.astro src/scripts/motion.ts
git commit -m "Automations card: traveling pulse along the flow sketch (MotionPath, desktop)"
```

---

### Task 6: Hero sub-line rotating words

**Files:**
- Modify: `src/scripts/motion.ts` (new `initHeroSubRotator()`; boot; `neutralizeMotion`)

**Interfaces:**
- Consumes: `[data-rotate-words]` slot + `.hero__sub-word` children (Task 1); hero entrance timing (`heroIntro` timeline ends ≈1.8s).
- Produces: `initHeroSubRotator(): void`; module-level `rotatorCall: gsap.core.Tween | undefined` (delayedCall handle, killed on teardown).

- [ ] **Step 1: Add `initHeroSubRotator()`**

Module-level state next to `pulseTl`: `let rotatorCall: gsap.core.Tween | undefined;`

Insert the function after `initAutomationPulse()`:

```ts
/* ── hero sub rotating words (Contiant timing: move 0.8s, fade slower) ── */

function initHeroSubRotator() {
  const slot = document.querySelector<HTMLElement>('[data-rotate-words]');
  if (!slot) return;
  const words = gsap.utils.toArray<HTMLElement>('.hero__sub-word', slot);
  if (words.length < 2) return;

  // fix the slot to its widest word so the sentence never reflows
  const width = Math.max(...words.map((w) => w.offsetWidth));
  slot.style.width = `${Math.ceil(width)}px`;
  gsap.set(words.slice(1), { visibility: 'visible', autoAlpha: 0, yPercent: 100 });

  const HOLD = 2.4;
  let i = 0;
  let heroVisible = true;

  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) {
    ScrollTrigger.create({
      trigger: hero,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => {
        heroVisible = self.isActive;
      },
    });
  }

  const swap = () => {
    if (motionDisabled) return;
    // don't churn offscreen or in a hidden tab — just try again later
    if (!heroVisible || document.hidden) {
      rotatorCall = gsap.delayedCall(HOLD, swap);
      return;
    }
    const cur = words[i]!;
    i = (i + 1) % words.length;
    const next = words[i]!;
    gsap
      .timeline()
      .to(cur, { yPercent: -100, duration: 0.8, ease: 'power4.out' }, 0)
      .to(cur, { autoAlpha: 0, duration: 1.0, ease: 'power1.inOut' }, 0)
      .fromTo(
        next,
        { yPercent: 100, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: 'power4.out' },
        0.05
      );
    rotatorCall = gsap.delayedCall(HOLD + 0.8, swap);
  };

  // first swap waits for the hero entrance to finish + one readable hold
  rotatorCall = gsap.delayedCall(1.8 + HOLD, swap);
}
```

- [ ] **Step 2: Boot + teardown wiring**

In the boot block (runs for all tiers), after `initServiceChoreography();` add:

```ts
  initHeroSubRotator();
```

In `neutralizeMotion()`, next to the `pulseTl` kill add:

```ts
  rotatorCall?.kill();
  rotatorCall = undefined;
```

and add `'.hero__sub-word'` and `'[data-rotate-words]'` to the `clearProps` array, then after the `gsap.set` call add:

```ts
  const slotEl = document.querySelector<HTMLElement>('[data-rotate-words]');
  if (slotEl) slotEl.style.removeProperty('width');
```

(clearProps restores the CSS default where words 2–3 are `visibility: hidden` — the static state shows word 1 only.)

- [ ] **Step 3: Verify**

`npm run build` → 0. Dev server: after the hero entrance settles (~1.8s) plus a beat, "Websites" slides up and out while "Web apps" rises in (soft cross-fade — the fade trails the move); cycles every ~3.2s through all three, looping. The sentence tail never shifts horizontally (slot is fixed-width). Switch to another tab for 10s, come back — no burst of queued swaps. Scroll to the footer — rotation idles (check via devtools: word doesn't change while hero offscreen). `/bg/`: cycles Уебсайтове / Уеб приложения / AI автоматизации. Reduced-motion emulation: static first word. VoiceOver/inspector: the `p` contains the full original sentence in the sr-only span; the visual span is `aria-hidden`.

- [ ] **Step 4: Commit**

```bash
git add src/scripts/motion.ts
git commit -m "Hero: rotating sub-line words with Contiant soft-swap timing"
```

---

### Task 7: Full verification pass

**Files:** none (verification only).

**Interfaces:** consumes everything above.

- [ ] **Step 1: Clean build**

Run: `npm run build`
Expected: exit 0, no warnings about missing i18n keys or TS errors.

- [ ] **Step 2: Full EN pass (desktop ≥1024px)**

Dev server, `http://localhost:4321/`, top to bottom:
1. Hero entrance unchanged (video settle, line masks, rises, strip) → rotator starts after it.
2. Nav hover: all 4 links draw/undraw.
3. Services: heading rises with header, underline draws once under "help"; cards 01→02→03 with flash; sketches draw; Automations pulse runs; ghost numerals still drift.
4. Work: circle draws once around "proves"; case screenshot parallax unchanged.
5. Scroll to top, back down: cards/reveals replay fast-hide-then-replay; scribbles do NOT redraw.

- [ ] **Step 3: BG pass**

`http://localhost:4321/bg/` — same checklist; verify "помогна" underline and "доказва" circle hug the words, rotator words fit the fixed slot (Уеб приложения is the widest — slot must fit it).

- [ ] **Step 4: Mobile pass (~390px)**

Choreography and scribbles run; no pulse, no sketch self-draw (existing tier), nav links hidden (mobile header), rotator cycles, no horizontal overflow anywhere (check `document.documentElement.scrollWidth === innerWidth`).

- [ ] **Step 5: Reduced-motion pass**

DevTools emulate `prefers-reduced-motion: reduce`, reload: everything visible immediately, scribbles pre-drawn, no cycling, no pulse. Then (non-emulated) flip the OS setting mid-session to test `neutralizeMotion()`: page settles to static without stuck-hidden elements.

- [ ] **Step 6: Commit any fixes found**

```bash
git add -A && git commit -m "Motion pass: verification fixes"
```

(Skip if nothing changed.)

---

## Self-Review (completed)

- **Spec coverage:** scribbles → T3 (placement/words per spec §1, i18n split per spec's marked-word rule → T1); choreography → T4 (border→outline flash documented — spec said "border flashes olive", outline is the implementation of that visual to avoid the CSS hover transition conflict); pulse → T5; rotator → T6 (i18n → T1, sr-only → T1); nav underline → T2; architecture/no-new-deps → T5 registers MotionPathPlugin from `gsap`; error handling → guard/self-heal untouched, every init null-checks its DOM; testing section → T7 mirrors spec's testing list.
- **Placeholder scan:** none — every step has literal code/commands.
- **Type consistency:** `initScribbles` / `initServiceChoreography` / `initAutomationPulse` / `initHeroSubRotator` names used identically in boot wiring; `pulseTl` / `rotatorCall` declared module-level in their defining tasks and referenced with the same names in `neutralizeMotion`.
