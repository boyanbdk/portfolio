// Site-wide constants that are not copy (copy lives in i18n/ui.ts).
// TODO(boyan): confirm the social handles below before launch.

export const site = {
  email: 'b.budakov7@gmail.com',
  // GitHub owner of this repo — assumed correct; confirm before launch.
  github: 'https://github.com/boyanbdk',
  // TODO(boyan): replace with the real LinkedIn profile URL.
  linkedin: 'https://www.linkedin.com/',
  // External brand — one-directional link (personal → business).
  autosilas: 'https://autosilas.com',
  // Live case study — owned domain (Vercel).
  disciplis: 'https://disciplis.com',
} as const;

// Root-relative anchors so the nav also works from subpages (e.g. /work/disciplis).
export const nav = [
  { key: 'nav.services', href: '/#what-i-do' },
  { key: 'nav.work', href: '/#work' },
  { key: 'nav.about', href: '/#about' },
  { key: 'nav.contact', href: '/#contact' },
] as const;
