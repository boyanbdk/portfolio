# STATUS — boyanbudakov.com portfolio

> **Resuming on any device (mobile/desktop):** say _"read STATUS.md and continue"_.
> This file is the source of truth for where we are. Keep it updated at the end of each working session.

_Last updated: 2026-07-07 — session likely continues on MOBILE. A new session has ONLY this file + the repo (no chat history)._

## ▶ CURRENT POSITION / DO THIS NEXT
- **Stack DECIDED: Astro + Tailwind → Cloudflare Pages.** ✅
- **Design research DONE** → saved to [`docs/design-research.md`](docs/design-research.md). It proposes 3 directions to choose between:
  1. **Editorial Founder** (warm-premium; Fraunces + Hanken Grotesk; cream/ink/olive) — ★ recommended
  2. **Swiss Engineer** (typographic; Switzer + JetBrains Mono; paper/black + 1 accent)
  3. **Refined Dark-Technical** (charcoal; Geist Sans/Mono; 1 electric accent)
- **DO THIS NEXT:** Boyan picks 1 of the 3 → then **write `DESIGN.md`** (9-section system) around it → finalize spec → build (Fable for execution, per Model strategy below).

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
2. **Design-research pass** (launched; see CURRENT POSITION) → present 3 aesthetic directions → Boyan picks one.
3. **Write `DESIGN.md`** (the 9-section system) for boyanbudakov.com.
4. **Finalize the design spec**, then hand to implementation planning.
5. **Build v1** (EN, deploy to Cloudflare Pages).
6. **Build Binkovending** (case study #2).
7. **Add BG** translations.
8. **Claim domain + connect** boyanbudakov.com to Cloudflare Pages.

## Reference (Boyan's context)
- CS student in Bulgaria; BG/EN/DE. Ships full products by directing AI tooling (Next.js/Supabase).
- Deeper goal: stable recurring income as runway to go full-time trader.
- Prior projects for case-study material: Disciplis (live SaaS), Pacevo, job-finder, trading AI systems.
