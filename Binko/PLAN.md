# Binko Vending — Website Plan

## Business reality
binkovending.com today: one headline — "Вендинг Кафе-машини, монтаж и поддръжка" — no contact info, no nav, spam links injected (site likely compromised). We rebuild from zero as the flagship instance of the vending-site template.

**Business:** Bulgarian vending operator. Coffee vending machines, snack/beverage machines, монтаж (installation) и поддръжка (maintenance). B2B: offices, gyms, hospitals, factories place a machine for free / under contract.

**Language:** Bulgarian (single locale for v1; EN later).

## Design direction — the hybrid nobody in vending does
Structure from vending B2B research + look from specialty coffee brands:

| Source | What we take |
|---|---|
| **Onyx Coffee Lab** | Cream/ink palette, letterpress-style display type with wide tracking, repeatable "full-bleed image + big headline + short paragraph + CTA" section module, alternating L/R content blocks |
| **Crafty** | Real-environment photography direction, benefit cards framed around customer pains (loss of time, unhappy staff, machines that break), named-testimonial credibility, before/after logic |
| **Cometeer** | ONE bold accent color over a neutral base, generous whitespace, card-based product grid, lifestyle hero of product-in-use |

### Tokens
- **Base:** cream `#FAF6ED` / warm paper `#F3EDE0`; ink `#1A1613` (near-black, warm)
- **Accent:** single bold **amber-orange `#E8500A`** (espresso-crema orange) — buttons, checkmarks, highlights, nothing else colored
- **Type:** `Unbounded` (display, Cyrillic ✓, wide tracking, uppercase for section labels) + `Inter` (body, Cyrillic ✓)
- **Radius:** 16–24px cards, pill buttons. Spacing: airy, 96–160px section padding.
- **Motion:** subtle fade/rise on scroll, no gimmicks.

## Site structure (single page + skeleton for growth)
Astro + Tailwind v4, static, self-contained project in `Binko/`.

1. **Nav** — sticky, cream/blur, logo wordmark "BINKO", links: Услуги, Машини, Как работи, Въпроси; CTA "Заявете машина"
2. **Hero** — full-bleed, emotional headline (sell delight not hardware): "Кафето, за което офисът ви ще ви благодари." + sub about безплатен монтаж и пълна поддръжка; dual CTA
3. **Trust bar** — scale metrics (машини на обект, чаши/месец, години опит, време за реакция)
4. **Services** — 3 cards: Кафе автомати / Снакс и напитки / Монтаж и поддръжка (pain-framed, Crafty-style)
5. **How it works** — 4 steps: Оглед → Монтаж → Зареждане → Поддръжка (Farmer's Fridge pattern)
6. **Machines** — filterable-feel product grid (кафе / снакс / комбинирани), Onyx-style cards on paper background
7. **Why Binko** — checklist with accent checkmarks (Grind pattern): безплатен монтаж, 24/7 сервиз, безкасово плащане, свежи продукти
8. **Testimonial / case** — one named quote block
9. **FAQ** — accordion, 5–6 въпроса
10. **Contact / CTA** — qualification-light form (име, фирма, град, тип обект, телефон) + tel/email
11. **Footer** — minimal, ink background

Placeholder images via local SVG/gradient placeholders (real photos come from client later); no external asset dependencies.

## Build & delegation
- **Claude (me):** project scaffold, design tokens/global CSS, Base layout, Nav, Hero, Footer, assembly, QA in browser preview
- **Codex — task A:** Services cards + How-it-works + Why-Binko checklist sections
- **Codex — task B:** Machines grid + FAQ accordion + Contact form section
- **Final:** integrate, visual QA (preview screenshots, mobile 375px), fix, done.

## Out of scope v1
CMS, EN locale, real photography, ROI calculator (v2 candidates).
