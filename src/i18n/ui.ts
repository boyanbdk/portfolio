// Translation dictionaries. EN complete at launch; BG mirrors the same keys
// and is filled after the Cyrillic font check (DESIGN.md §10). No component
// hardcodes copy — every string is looked up through useTranslations().

export const languages = {
  en: 'EN',
  bg: 'BG',
} as const;

export const defaultLang = 'en';

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    // meta
    'site.title': 'Boyan Budakov — builder who ships real products, fast',
    'site.description':
      'A generalist builder who ships real, working products fast with modern and AI tooling. Websites, web apps, and automations. Available for hire.',

    // header / nav
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.services': 'What I do',
    'nav.contact': 'Contact',
    'nav.skip': 'Skip to content',

    // hero
    'hero.eyebrow': 'Builder · Founder',
    'hero.location': 'Bulgaria · EN / BG',
    'hero.headline.1': 'I ship real,',
    'hero.headline.accent': 'working',
    'hero.headline.2': 'products — fast.',
    'hero.sub':
      'A generalist builder directing modern and AI tooling to turn an idea into a live product in days, not quarters. Websites, web apps, and automations.',
    'hero.cta': 'Start a project',
    'hero.secondary': 'See the work',
    'hero.available': 'Available for work',

    // what I do
    'services.eyebrow': '01 — What I do',
    'services.title': 'Three ways I can help',
    'services.websites.title': 'Websites',
    'services.websites.body':
      'Fast, distinctive marketing sites that turn visitors into leads. Design-led, hand-built, Lighthouse-green — never a template.',
    'services.websites.tag': 'Lead-generating',
    'services.apps.title': 'Web apps',
    'services.apps.body':
      'Full-stack products — auth, data, dashboards, payments. Real SaaS you can log into, not a prototype.',
    'services.automations.title': 'Automations',
    'services.automations.body':
      'AI workflows and integrations that remove the repetitive work: pipelines, scrapers, agents, glue between your tools.',

    // selected work
    'work.eyebrow': '02 — Selected work',
    'work.title': 'One that proves the point',
    'work.disciplis.name': 'Disciplis',
    'work.disciplis.kind': 'Live SaaS',
    'work.disciplis.result': 'A full discipline-tracking SaaS — live, in production.',
    'work.disciplis.problem':
      'Problem: staying consistent needs structure most habit apps do not give — real accountability, not another checkbox.',
    'work.disciplis.approach':
      'Approach: built end-to-end on Next.js + Supabase — auth, persistent data, and a focused UI. Shipped solo by directing AI tooling.',
    'work.disciplis.outcome': 'Outcome: a working product anyone can sign up for today.',
    'work.disciplis.metric': 'Built solo · shipped',
    'work.disciplis.link': 'Visit Disciplis',
    'work.more': 'More case studies land as they ship.',

    // about
    'about.eyebrow': '03 — About',
    'about.title': 'A builder, not a spectator',
    'about.p1':
      'I am a computer-science student in Bulgaria who ships full products by directing modern and AI tooling. I care about the result on screen, not the buzzwords behind it.',
    'about.p2':
      'I founded AutoSilas, a studio that gets local businesses a real web and Google presence. On the side I build SaaS like Disciplis and trading systems — proof I can take something from zero to live.',
    'about.p3': 'How I work: proof over claims, fast iterations, and a bias toward shipping.',
    'about.stack.title': 'Working with',
    'about.autosilas': 'AutoSilas — local-business studio',

    // contact
    'contact.eyebrow': '04 — Contact',
    'contact.title': 'Have something to build?',
    'contact.body':
      'Tell me what you are trying to ship. I read every message and reply personally.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'What do you want to build?',
    'contact.send': 'Send message',
    'contact.or': 'or email me directly',

    // footer
    'footer.statement': 'Let’s build something real.',
    'footer.rights': 'All rights reserved.',
    'footer.built': 'Hand-built with Astro.',
  },

  // BG — stubbed to mirror EN structure; filled after Cyrillic font check (§10).
  bg: {},
} as const;
