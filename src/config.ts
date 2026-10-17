// Site-wide constants that are not copy (copy lives in i18n/ui.ts).
// TODO(boyan): confirm the social handles below before launch.

export const site = {
  email: 'b.budakov7@gmail.com',
  // GitHub owner of this repo — assumed correct; confirm before launch.
  github: 'https://github.com/boyanbdk',
  linkedin: 'https://www.linkedin.com/in/boyan-budakov-614708356/',
  // TODO(boyan): drop the real PDFs into public/cv/ under these names.
  cv: { en: '/cv/boyan-budakov-cv-en.pdf', bg: '/cv/boyan-budakov-cv-bg.pdf' },
  // External brand — one-directional link (personal → business).
  autosilas: 'https://autosilas.com',
  // Live case study — owned domain (Vercel).
  disciplis: 'https://disciplis.com',
  // Client site — switch to https://binko.bg once the domain is active.
  binko: 'https://binko.pages.dev',
} as const;

// Root-relative anchors so the nav also works from subpages (e.g. /work/disciplis).
export const nav = [
  { key: 'nav.services', href: '/#what-i-do' },
  { key: 'nav.work', href: '/#work' },
  { key: 'nav.about', href: '/#about' },
  { key: 'nav.contact', href: '/#contact' },
] as const;
