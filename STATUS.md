# STATUS — boyanbudakov.com portfolio

> **Resuming on any device (mobile/desktop):** say _"read STATUS.md and continue"_.
> This file is the source of truth for where we are. Keep it updated at the end of each working session.

_Last updated: 2026-07-09 — EN v1 + Disciplis case study + full BG. A new session has ONLY this file + the repo (no chat history)._

## ▶ CURRENT POSITION / DO THIS NEXT
- **Stack DECIDED: Astro + Tailwind → Cloudflare Pages.** ✅
- **Design direction LOCKED: Option 1 — "Editorial Founder"** (warm-premium; Fraunces + Hanken Grotesk; cream `#F5F1E8` / ink `#1A1714` / olive `#6B6B47`). Confirmed 2026-07-07.
- **Design system written → [`DESIGN.md`](DESIGN.md)** — the 9-section source of truth. Full research in [`docs/design-research.md`](docs/design-research.md).
- **Implementation plan written → [`PLAN.md`](PLAN.md).** ✅
- **✅ EN v1 BUILT & verified** (Astro 7 + Tailwind v4, static). All 5 sections live: Hero · What I do (uneven bento) · Selected work (Disciplis) · About · Contact. Self-hosted fonts, grain overlay, i18n scaffolding (no hardcoded copy), WCAG AA verified computationally (every pair ≥4.5:1), 0 console errors, `npm run build` clean, 0 npm vulnerabilities.
- **✅ Disciplis case study built** (`/work/disciplis` + `/bg/work/disciplis`) — behavioural-trading-journal positioning ("Your strategy isn't the problem. Your behaviour is."), faithful dark-teal product mockup (`DisciplisMockup.astro`), result-first structure. Backed by research → [`docs/research-structure-and-photos.md`](docs/research-structure-and-photos.md) (multi-page case studies ✓, no popups ✓, real photos build trust ✓).
- **✅ Positioning pass (2026-07-09):** no tech stacks in hero; "Proof over claims" instead of "Available for work"; About says CS *background* (never "student") + trader identity (why Disciplis exists). Disciplis = finished hobby project, NOT "currently building". Open question: AI agency under personal name vs AutoSilas — deferred, keep copy neutral.
- **✅ FULL BG LIVE** — `/bg/` + `/bg/work/disciplis`, working EN/BG switcher (preserves page), hreflang tags, informal „ти" tone. **Cyrillic font swap** (Fraunces/Hanken lack basic Cyrillic): BG uses Playfair Display (display) + Golos Text (body) via `html[lang=bg]` override in `global.css`.
- **Dev-server note:** Astro 7 needs Node ≥22; system Node is 20. Pinned Node 22 lives in `.tooling/` (gitignored) with a space-free symlink `~/.local/bin/node22` used by `.claude/launch.json` (the launcher breaks on the space in "job searcher").
- **DO THIS NEXT (pick up here):**
  1. **Supply real assets** (biggest visual upgrade): drop `hero-portrait.jpg` into `src/assets/` (auto-renders in hero — AI image now, photoshoot later; prompts already written); a real Disciplis screenshot → swap the mock frame in `SelectedWork.astro`.
  2. **Confirm social handles** in [`src/config.ts`](src/config.ts) — GitHub assumed `github.com/boyanbdk`; **LinkedIn is a placeholder (TODO).**
  3. **Wire the contact form** — currently progressive-enhancement mailto (works today, no backend). For real submissions add Cloudflare Pages Forms or Formspree action.
  4. **Native-speaker read of the BG copy** (translated this session; Boyan should sanity-check tone/terms).
  5. **Deploy to Cloudflare Pages** (build `npm run build`, output `dist/`) + claim/connect domain.
  6. **Build Binkovending** (case study #2). GSAP pinned reveal = optional polish.
- ⚠️ **Cyrillic finding (CONFIRMED for BG phase):** the build emits **no Cyrillic woff2 subset for Fraunces OR Hanken Grotesk** — both lack Cyrillic. JetBrains Mono *does* have it. So before BG, locale-swap **both** the display serif (e.g. Playfair Display — has Cyrillic) **and** the body sans (e.g. a Cyrillic-capable grotesque) for the `bg` locale. See `DESIGN.md` §10.

---

## What we're building
A personal portfolio / services website at **boyanbudakov.com**.

**Primary job of the site (A):** get Boyan hired — land work (client projects and/or a stable job). The whole site drives toward "this person can build what I need → contact them."
**Secondary (B):** credible "builder / founder" personal brand.
**Later (C):** grow products. Not now.

Positioning: a generalist builder who ships **real, working products fast** with modern/AI tooling. Proof over claims. Stays open to any hire.

## Decisions locked
- **Service menu:** Websites (hero offer, leads) · Web apps · Automations. Generalist on this site.
- **Separate brand:** AutoSilas = the *niched* business (local businesses → web + Google presence; targeting dentists). Lives at autosilas.com, its own brand. boyanbudakov.com links to it as a case study; one-directional (personal → business).
- **Case studies (2 slots at launch):**
  - **Disciplis** — live SaaS (disciplis.vercel.app). The one real, strong piece → ships in v1.
  - **Binkovending** — local-business site rebuild. Fills slot 2 **once built** (immediate next build after the site scaffold).
  - **AutoSilas** — on hold; slots in when ready.
  - _(Pacevo dropped as a case study. foxnomad dropped entirely.)_
- **Languages:** Bilingual **EN + BG**. Build EN first (primary hiring audience) with i18n scaffolding, then add BG.
- **Hosting:** **Cloudflare Pages** (free, no commercial restriction, unlimited bandwidth). NOT Vercel free (its Hobby tier bars commercial/services sites; Pro is $20/mo — rejected as too costly).
- **Domain:** boyanbudakov.com — free for year 1 via Hostinger (renews ~$19.99/yr on 2027-07-08). Claim it on Hostinger; connect to Cloudflare Pages later (point nameservers to Cloudflare = smoothest).

## Stack — DECIDED: Astro (confirmed 2026-07-07)
- **Astro + Tailwind**, deployed to Cloudflare Pages.
- Rationale: content-first (portfolio is mostly static) → zero JS by default, Lighthouse ~100, best SEO; matches the Astro-based "elite websites" framework; zero-adapter deploy on Cloudflare. Animations: CSS by default + JS "islands" (GSAP/Framer Motion) only where needed — no animation limitation. Next.js stays for real apps (Disciplis); the portfolio shell doesn't need it.

## Model strategy (Opus vs Fable 5)
- **Opus** = judgment / taste / architecture: DESIGN.md + visual direction, implementation plan, design review (anti-AI-slop critique), positioning + hero/about copy, tricky debugging, final QA.
- **Fable 5** = spec-driven execution / volume: building Astro components from the locked DESIGN.md, project scaffolding / config / i18n plumbing, first-draft body copy, EN→BG translation, case-study content entry.
- Rule of thumb: wrong-call-cascades or needs-taste → Opus; clearly-specified with a checkable output → Fable. Calibrate as we go.
- Mechanics: `/model` toggle per phase — plan & design in Opus (now) → build sprints in Fable → design review & debug back in Opus.

## Design approach — "elite / anti-AI-slop"
Following the "7 Levels of Building ELITE Websites with Claude Code" framework (video: youtube.com/watch?v=1PXFAFMgdns). Core rules to bake in:
- **AI Slop Test:** if it looks AI-made, redesign.
- **Distinctive typography** — banned generic fonts: Inter, Roboto, Arial, Helvetica, Space Grotesk, Lato, Open Sans, Source Sans Pro.
- **Break the grid** — no two consecutive sections share the same layout.
- **Visual depth** — texture, gradient, overlap, shadow; never flat.
- **WCAG AA** contrast, verified computationally.
- **Performance:** Lighthouse 95+, static-first, minimal JS.
- **`DESIGN.md`** (9 sections: Visual Theme · Color · Typography · Component Stylings · Layout · Depth/Elevation · Do's/Don'ts · Responsive · Agent Prompt Guide) = single source of truth, written BEFORE building. (+ a Multilingual section for EN/BG.)
- Inspiration inputs to use: study top personal/founder portfolios; pull polished components from 21st.dev; AI-generated hero image (Boyan runs the image tool; Claude writes the prompts).

## Proposed site structure (one lean page + case-study detail views)
1. Hero — headline, subline, CTA, LinkedIn/GitHub links
2. What I do — Websites (first) · Web apps · Automations
3. Selected work — case-study cards (Disciplis now; +Binkovending later)
4. About — who he is, founder of AutoSilas, how he works, stack (NO skill %-bars)
5. Contact — email + form (no "book a call"), LinkedIn, GitHub

Case-study format (per verified research): lead with the RESULT, then problem → approach (the *why* / architecture) → outcome, with a live link.

## NEXT STEPS (in order)
1. ~~Confirm stack~~ — ✅ DONE: Astro.
2. ~~Design-research pass → 3 directions → pick one~~ — ✅ DONE: "Editorial Founder".
3. ~~Write `DESIGN.md`~~ — ✅ DONE.
4. ~~Implementation plan + build v1 (EN)~~ — ✅ DONE: [`PLAN.md`](PLAN.md) + all 5 sections built & verified.
5. **Supply real portrait + Disciplis screenshot; confirm social handles** (see CURRENT POSITION).
6. **Deploy v1** to Cloudflare Pages + claim/connect domain.
7. **Build Binkovending** (case study #2).
8. **Add BG** translations (do the §10 Cyrillic font-swap first — confirmed needed).

## Reference (Boyan's context)
- CS student in Bulgaria; BG/EN/DE. Ships full products by directing AI tooling (Next.js/Supabase).
- Deeper goal: stable recurring income as runway to go full-time trader.
- Prior projects for case-study material: Disciplis (live SaaS), Pacevo, job-finder, trading AI systems.
