# PLAN.md — implementation plan for boyanbudakov.com

Derived from [`DESIGN.md`](DESIGN.md) (locked visual system) and [`STATUS.md`](STATUS.md) (decisions).
This is the build blueprint: project structure → section build order → i18n → deploy. Update as we build.

---

## Stack

- **Astro 5** (static output — no SSR adapter; Cloudflare Pages serves `dist/`).
- **Tailwind v4** via `@tailwindcss/vite` (no `tailwind.config.js`; theme tokens live in `global.css` `@theme`).
- **Self-hosted fonts** via Fontsource (woff2, `font-display: swap`): Fraunces (variable), Hanken Grotesk (variable), JetBrains Mono (variable).
- **Motion:** CSS-first (`animation-timeline: view()`, hover, underline, animated grain). One JS island later: GSAP + ScrollTrigger for the Disciplis pinned reveal (deferred to case-study polish).
- **Deploy:** Cloudflare Pages, build `npm run build`, output `dist/`.

## Project structure

```
src/
  styles/
    global.css          # @import tailwindcss; @theme tokens (§2 color, §3 type); grain, base, utilities
  layouts/
    Base.astro          # <html lang>, <head> (meta/OG/fonts), grain overlay, <slot/>, skip-link
  components/
    Grain.astro         # SVG feTurbulence paper-grain overlay (§6)
    Header.astro        # logo mark + nav + language switcher (mono)
    Footer.astro        # statement footer + email + LinkedIn/GitHub + switcher
    Hero.astro          # §5 asymmetric type-first hero + portrait split
    WhatIDo.astro       # §5 uneven bento — Websites (large) · Web apps · Automations
    SelectedWork.astro  # offset Disciplis case-study card (§4)
    About.astro         # who / AutoSilas founder / how he works / stack (no %-bars)
    Contact.astro       # email + form (no "book a call")
    Section.astro       # shared section shell (eyebrow number + heading rhythm)
  i18n/
    ui.ts               # translation dictionaries { en: {...}, bg: {...} } + languages list
    utils.ts            # getLangFromUrl(), useTranslations(t)
  pages/
    index.astro         # EN home (default locale at root)
    # bg/index.astro    # added after EN ships
  content/
    work/               # (optional) case-study data as it grows
public/
  # portrait, disciplis screenshot, favicon, og image (assets added as available)
```

## i18n approach

- Astro built-in i18n: `defaultLocale: 'en'`, `locales: ['en','bg']`, `routing.prefixDefaultLocale: false` → EN at `/`, BG later at `/bg/`.
- **No hardcoded copy** — every string comes from `src/i18n/ui.ts` via `useTranslations(lang)`.
- EN dictionary complete at launch; BG keys stubbed (mirror structure) and filled after the Cyrillic font check (DESIGN.md §10).
- Language switcher in Header + Footer (mono, minimal). Hidden/inert until BG ships.

## Build order (section-by-section, anti-slop checklist per §7 after each)

1. **Scaffold** — config, tokens, fonts, Base layout + Grain. Verify `npm run build`.
2. **Header + Footer** — shell, nav, switcher.
3. **Hero** — asymmetric type-first; oversized Fraunces headline, mono meta corners, portrait split ≥1024.
4. **What I do** — uneven bento (Websites large).
5. **Selected work** — offset Disciplis card (result → problem → approach → outcome + live link + one metric). GSAP pin deferred.
6. **About** — narrative, AutoSilas founder, how-he-works, stack list (no %-bars).
7. **Contact** — email + form (Cloudflare form / mailto fallback), LinkedIn, GitHub.
8. **Anti-slop polish pass** — grid-break check, contrast (WCAG AA computational check), Lighthouse 95+, reduced-motion.

## Anti-slop checklist (run per section — DESIGN.md §7)

- [ ] No banned fonts; only Fraunces / Hanken Grotesk / JetBrains Mono.
- [ ] No pure `#000`/`#FFF`; one olive accent only.
- [ ] Depth from grain + layered creams + hairlines — no gradients/glow.
- [ ] This section's rhythm differs from the one above (contained vs full-bleed, aligned vs asymmetric).
- [ ] WCAG AA on every text/bg pair.
- [ ] Tap targets ≥44px; `prefers-reduced-motion` honored.

## Deferred / later (tracked in STATUS.md)

- Real portrait + Disciplis screenshot (placeholders until Boyan supplies).
- GSAP Disciplis pinned reveal (island).
- Binkovending case study #2.
- BG translations + Cyrillic font check.
- Domain claim + Cloudflare Pages connection.
