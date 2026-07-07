# portfolio

Source for **boyanbudakov.com** — Boyan Budakov's personal portfolio / services website.

Work-in-progress. Start here: **[STATUS.md](STATUS.md)** — the current state, decisions, and next steps.

To resume work from any device: open this repo and say _"read STATUS.md and continue"_.

## Develop

Astro + Tailwind v4, static output (deploys to Cloudflare Pages: build `npm run build`, output `dist/`).

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the built site
```

See [PLAN.md](PLAN.md) for structure and [DESIGN.md](DESIGN.md) for the visual system.
