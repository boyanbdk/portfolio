# Research notes — page structure & personal photos

_Source: deep-research run (2026-07-08). Question: should boyanbudakov.com use multiple pages vs. one long scroll, and should Boyan add personal photos?_
_Confidence key: **✓ verified** = 3-0 adversarial vote against primary source · **~ directional** = gathered but verification interrupted by session limit (not refuted)._

---

## Decisions to carry into the build

1. **Keep the single-scroll homepage** as the pitch (hero → what I do → selected work → about → contact). This is the correct pattern and NOT a weakness.
2. **Add dedicated case-study pages** — `/work/disciplis` first, then `/work/binkovending`. Highest-leverage change. Result-first format (result → problem → approach/why → outcome → live link). Linkable/shareable on their own; good SEO surface. Astro: just files under `src/pages/work/`, wired into i18n routing.
3. **No popups / modals / exit-intent / limited-time overlays.** Strongest finding in the research — they hurt credibility. Use calm inline CTAs instead.
4. **Add real photos of Boyan** — a hero portrait (already in DESIGN.md §5) + a candid in About. Reuse portrait as OG/social image.
5. (Optional, later) a fuller `/about` page if the homepage About gets cramped.

---

## Q1 — Structure: why

**Attention drops fast with scroll depth (✓):**
- ~57% of viewing time is above the fold; **74% within the first two screenfuls**; **81% within the first three.** People rarely scroll past the third. → anything that gets Boyan hired shouldn't be buried deep in one long page.
- "Illusion of completeness" (✓): users treat the first screen as the whole page and stop. One study: **75% failed to scroll past a hero banner** and missed critical info.
- Long-scroll works only if the top deliberately earns the scroll (✓).

**Case studies are the reason to go multi-page:**
- Hiring managers skim a portfolio in **under ~2 min**, then want to go deep on one thing.
- Recruiters value projects shown as **case studies with documented reasoning** (why this tech, the trade-offs) over bare links.
- (~) Multi-page also beats single-page for SEO (each page targets its own keyword/intent); a one-pager is capped at ~one topic. Ahrefs (✓): "In most instances, you'll want to launch your website with more than one page."

**Popups verdict — don't (✓):**
- Decades of usability research: users strongly dislike popups; can abandon the task entirely.
- Content-gating modals "diminish credibility and trust."
- Popups buy short-term metrics "at the price of frustrating many users."
- (~) Even good exit-intent popups average only ~5-10% lift and convert ~3-5% of viewers; effectiveness declining from habituation.

## Q2 — Photos: why

- Faces are hardwired attention magnets; typically the first thing the eye lands on.
- (~) A/B evidence links real faces to higher conversion (e.g. Medalia Art: 8.8% → 17.2%, ~95%, when paintings replaced with artist photos; personal photo beat a generic icon). Treat exact numbers as illustrative; direction is consistent.
- For hiring, portfolio advice: the About section **should** include a personal photo — humanizes, connects name to face, builds trust before someone contacts a stranger.
- **Caveat:** a photo triggers a snap judgment, so **quality matters a lot**. Authentic > polished-but-generic. Good light, direct-ish gaze, looks like Boyan (not a stock model). A blurry/afterthought photo can hurt more than none. (Résumé-photo bias research is about third-party screening, not a self-owned site — on your own site, showing your face reads as confidence.)
- **Placement:** hero portrait (≥1024px split, per DESIGN.md §5) + candid "working" shot in About. Reuse for OG/Twitter card.

---

## Sources

**Verified (3-0):**
- NN/g — Scrolling and Attention: https://www.nngroup.com/articles/scrolling-and-attention/
- NN/g — Page Fold Manifesto: https://www.nngroup.com/articles/page-fold-manifesto/
- NN/g — Popups: https://www.nngroup.com/articles/popups/
- St Andrews — Illusion of Completeness: https://digitalcommunications.wp.st-andrews.ac.uk/2020/09/21/scrolling-and-the-illusion-of-completeness/
- Ahrefs — Single-Page Websites & SEO: https://ahrefs.com/blog/single-page-website/

**Directional (verification interrupted, not refuted):**
- VWO — human photos & conversion: https://vwo.com/blog/human-landing-page-increase-conversion-rate/
- HubSpot — single vs multi-page: https://blog.hubspot.com/website/single-page-vs-multiple-page-website
- Surfer SEO — single-page SEO: https://surferseo.com/blog/single-page-seo/
- OpenDoors — how recruiters read portfolios: https://blog.opendoorscareers.com/p/how-recruiters-and-hiring-managers-actually-look-at-your-portfolio
- intechnic — how human faces affect UX; Ben-Gurion résumé-photo bias study (via contrarian source)

_Run stats: 6 angles → 26 sources → 90 claims → 25 verified (9 confirmed, 0 refuted, 16 interrupted)._
