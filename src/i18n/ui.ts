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
    'hero.headline.1': 'Unconventional ways',
    'hero.headline.accent': '=',
    'hero.headline.2': 'unconventional results.',
    'hero.sub': 'Websites, web apps and automations — from idea to live product in days.',
    'hero.sub.w1': 'Websites',
    'hero.sub.w2': 'Web apps',
    'hero.sub.w3': 'AI automations',
    'hero.sub.tail': '— from idea to live product in days.',
    'hero.cta': 'Start a project',
    'hero.secondary': 'See the work',
    'hero.marquee.1': 'Unconventional by design',
    'hero.marquee.2': 'Built, not talked about',
    'hero.marquee.3': 'Discipline over dopamine',
    'hero.marquee.4': 'Trader’s eye, builder’s hands',
    'hero.marquee.5': 'Quiet work, loud results',
    'hero.marquee.6': 'Real products, not prototypes',
    'hero.marquee.7': 'Based in Bulgaria, building worldwide',

    // what I do
    'services.eyebrow': '01 — What I do',
    'services.title.pre': 'Three ways I can',
    'services.title.mark': 'help',
    'services.lede':
      'Scoped honestly, shipped fast — the same way I build my own products.',
    'services.websites.title': 'Websites',
    'services.websites.body':
      'Fast, distinctive marketing sites that turn visitors into leads — designed by hand around your business and what makes it worth choosing.',
    'services.websites.tag': 'Lead-generating',
    'services.websites.d1': 'Custom design — never a template',
    'services.websites.d2': 'Copy that turns visitors into leads',
    'services.websites.d3': 'Lighthouse-green, SEO-ready',
    'services.websites.time': 'live in days',
    'services.apps.title': 'Web apps',
    'services.apps.body':
      'Real SaaS you can log into, not a prototype — the kind of product I run in production myself.',
    'services.apps.d1': 'Auth, database, payments',
    'services.apps.d2': 'Dashboards & admin panels',
    'services.apps.d3': 'Built to grow past MVP',
    'services.apps.time': 'MVP in weeks',
    'services.automations.title': 'Automations',
    'services.automations.body':
      'The hours you lose to repetitive work, handed to software that runs while you don’t.',
    'services.automations.d1': 'Scrapers, pipelines, agents',
    'services.automations.d2': 'AI in the loop where it pays',
    'services.automations.d3': 'Your tools, finally talking',
    'services.automations.time': 'scoped per job',

    // homepage pointer — no projects, no clients on the homepage; two doors
    'pointer.eyebrow': '02 — Work',
    'pointer.title.pre': 'Built for clients.',
    'pointer.title.mark': 'Built',
    'pointer.title.post': 'for myself.',
    'pointer.clients.title': 'Clients',
    'pointer.clients.line': 'Real businesses, real launches.',
    'pointer.clients.cta': 'See my clients',
    'pointer.products.title': 'Products I built',
    'pointer.products.line': 'Things I designed and shipped end to end.',
    'pointer.products.cta': 'See the products',

    // hubs (shared)
    'hub.back': 'Back home',
    'hub.case': 'Read the case study',

    // /work — products I built
    'hub.work.meta.title': 'Products I built — Boyan Budakov',
    'hub.work.meta.description':
      'AutoSilas and Disciplis — two products designed, coded and shipped end to end by Boyan Budakov.',
    'hub.work.eyebrow': 'Products',
    'hub.work.title.pre': 'Products I',
    'hub.work.title.mark': 'built',
    'hub.work.lede': 'Two products I own end to end — brand, design, code and the business around them. Both live in production.',
    'hub.work.autosilas.name': 'AutoSilas',
    'hub.work.autosilas.kind': 'My automation business · Live',
    'hub.work.autosilas.result':
      'My own automation business — hand-designed websites plus an AI front desk that answers patients for local clinics, around the clock.',
    'hub.work.autosilas.problem':
      'Local clinics run on the phone: missed calls, unanswered questions and dated websites quietly cost them patients — and nobody at the practice has time to fix it.',
    'hub.work.autosilas.approach':
      'So I founded AutoSilas and built the whole thing — brand, Bulgarian-first website, a live demo clinic, and a digital front desk: an AI assistant that answers patients 24/7 and turns conversations into booking requests.',
    'hub.work.autosilas.outcome':
      'It runs in production today as a real business with its own brand — designed, coded, sold and operated by me.',
    'hub.work.autosilas.metric': 'Live · founded & run solo',
    'hub.work.autosilas.link': 'Visit AutoSilas',
    'hub.work.disciplis.name': 'Disciplis',
    'hub.work.disciplis.kind': 'Behavioural trading journal · Live',
    'hub.work.disciplis.result':
      'A behavioural journal for traders that shows where discipline breaks down — born from my own trading, live in production.',
    'hub.work.disciplis.problem':
      'Most traders lose money on behaviour, not strategy: revenge trades, oversizing, breaking their own rules. Ordinary journals log the trades and miss the pattern.',
    'hub.work.disciplis.approach':
      'I designed and built Disciplis to log every trade against the trader’s own rules, surface the behavioural patterns behind the losses, and show them plainly on a dashboard.',
    'hub.work.disciplis.outcome':
      'Live at disciplis.com — product, brand and code all mine, used on my own trades first.',
    'hub.work.disciplis.metric': 'Live · designed & built solo',
    'hub.work.disciplis.link': 'Visit Disciplis',
    'hub.work.disciplis.shot.alt': 'The Disciplis dashboard — behavioural metrics over a trader’s journal.',

    // /clients
    'hub.clients.meta.title': 'Clients — Boyan Budakov',
    'hub.clients.meta.description':
      'Real businesses I have designed, built and launched websites for — starting with Binko, a vending operator in Sofia since 2003.',
    'hub.clients.eyebrow': 'Clients',
    'hub.clients.title.pre': 'Real businesses,',
    'hub.clients.title.mark': 'real launches',
    'hub.clients.lede': 'Companies that trusted me with their web presence — from first call to live site, domain and email included.',
    'hub.clients.binko.name': 'Binko',
    'hub.clients.binko.kind': 'Vending operator · Sofia · since 2003',
    'hub.clients.binko.outcome': 'From no website to a live brand site in five weeks.',
    'hub.clients.binko.blurb':
      'A 23-year-old vending company with 150+ machines and partners like Sofia Metro and NDK — but no web presence at all. I designed, built and launched binko.bg end to end.',
    'hub.clients.binko.link': 'Visit binko.bg',

    // Binko case study
    'cs.binko.meta.title': 'Binko case study — Boyan Budakov',
    'cs.binko.meta.description':
      'How I designed, built and launched the website for Binko — a Sofia vending operator with 150+ machines — in five weeks, from first call to live domain.',
    'cs.binko.back': 'All clients',
    'cs.binko.eyebrow': 'Client case study — Vending',
    'cs.binko.title': 'Binko',
    'cs.binko.tagline': 'Coffee and snacks, one arm’s reach away.',
    'cs.binko.result':
      'A 23-year-old vending business with no website got a brand site that finally looks like the company it is — live in five weeks, enquiries landing straight in the owner’s inbox.',
    'cs.binko.meta.client': 'Client',
    'cs.binko.meta.client.v': 'Binko Ltd. — Sofia & West Bulgaria',
    'cs.binko.meta.role': 'Role',
    'cs.binko.meta.role.v': 'Design, build, launch, domain & email',
    'cs.binko.meta.stack': 'Stack',
    'cs.binko.meta.stack.v': 'Astro · Tailwind · GSAP · Cloudflare',
    'cs.binko.meta.status': 'Status',
    'cs.binko.meta.status.v': 'Live · 2026',
    'cs.binko.showcase.caption': 'binko.bg in production — video hero, real machines, real partners.',
    'cs.binko.shot.home.alt': 'The Binko homepage — a video hero of a coffee machine with the headline “Coffee and snacks, one arm’s reach away”.',
    'cs.binko.shot.partners.alt': 'The partner strip on binko.bg — logos of Sofia Metro, NDK, BNT, Sofia University and more.',
    'cs.binko.shot.partners.cap': 'Trusted by institutions and stock exchanges since 2003 — 16 partner logos in a live marquee.',
    'cs.binko.problem.eyebrow': '01 — The problem',
    'cs.binko.problem.title': 'Twenty-three years in business, zero web presence.',
    'cs.binko.problem.p1':
      'Binko has run vending machines across Sofia and West Bulgaria since 2003 — 150+ machines, 80 000+ cups a month, partners like Sofia Metro, NDK, BNT and Sofia University. None of that was visible online. New enquiries arrived only by phone, and a prospective client searching the name found nothing.',
    'cs.binko.problem.p2':
      'The brand existed in exactly one place: printed on the cup. The job was to take that cup and build a company site around it — one that a facilities manager could trust in thirty seconds and that the owner could run without me.',
    'cs.binko.approach.eyebrow': '02 — What I built',
    'cs.binko.approach.title': 'A brand from the cup up',
    'cs.binko.approach.p1':
      'I sampled the blue straight from the real Binko cup and built a playful sticker-and-comic visual system around it — bold display type, hand-drawn accents, a video hero of the machine itself. Services, machines, a swipeable 3D gallery of real locations and a live partner marquee make the scale of the business obvious without a single paragraph of boasting.',
    'cs.binko.approach.p2':
      'Under the surface it is a fast static Astro site on Cloudflare: a mobile performance pass with tiered video loading and disciplined animation frames, a contact form that delivers straight to the owner’s inbox, LocalBusiness structured data for search, and a proper .bg domain with free company email — set up so the client owns everything.',
    'cs.binko.decision.1.title': 'Brand from the cup',
    'cs.binko.decision.1.body': 'No brand book existed, so the cup became it. The blue is sampled from the print; the sticker language comes from how the machines are dressed.',
    'cs.binko.decision.2.title': 'Proof over promises',
    'cs.binko.decision.2.body': 'Real locations, real partners, real machine models. The site argues with evidence, not adjectives.',
    'cs.binko.decision.3.title': 'Owner-proof operations',
    'cs.binko.decision.3.body': 'Form to the owner’s inbox, domain and email in the client’s name, nothing that needs me to keep running.',
    'cs.binko.features.title': 'What’s inside',
    'cs.binko.feature.1': 'Video hero with mobile tiering',
    'cs.binko.feature.2': 'Swipeable 3D gallery of real locations',
    'cs.binko.feature.3': 'Live partner marquee — 16 logos',
    'cs.binko.feature.4': 'Contact form straight to the owner’s inbox',
    'cs.binko.feature.5': 'SEO + LocalBusiness structured data',
    'cs.binko.feature.6': '.bg domain and free company email',
    'cs.binko.gallery.eyebrow': 'Inside the site',
    'cs.binko.gallery.title': 'The work, live',
    'cs.binko.shot.machines.alt': 'The machines section on binko.bg — coffee and snack automats on blue sticker cards.',
    'cs.binko.shot.machines.cap': 'Machines — Zanussi Necta models on blue sticker cards.',
    'cs.binko.shot.gallery.alt': 'The locations gallery on binko.bg — a 3D swipeable carousel of photos of real machines on site.',
    'cs.binko.shot.gallery.cap': 'Locations — a 3D swipe gallery of real installations.',
    'cs.binko.shot.mobile.alt': 'The Binko site on a phone — the machines section at 390px wide.',
    'cs.binko.shot.mobile.cap': 'Mobile — where most of the client’s visitors are.',
    'cs.binko.outcome.eyebrow': '03 — The outcome',
    'cs.binko.outcome.title': 'Live, owned by the client, ready for enquiries',
    'cs.binko.outcome.p1':
      'Binko went from nothing to a live brand site between the first commit on 11 July and launch in August — design, build, content, domain and email, all in one engagement. Enquiries no longer depend on a phone call.',
    'cs.binko.outcome.metric.1': '0 → live',
    'cs.binko.outcome.metric.1.label': 'in 5 weeks',
    'cs.binko.outcome.metric.2': '16',
    'cs.binko.outcome.metric.2.label': 'partner logos, live',
    'cs.binko.outcome.metric.3': '1 form',
    'cs.binko.outcome.metric.3.label': 'straight to the owner’s inbox',
    'cs.binko.builtwith': 'Astro, Tailwind, GSAP and Cloudflare — custom design, custom code.',
    'cs.binko.visit': 'Visit binko.bg',
    'cs.binko.cta.title': 'Want something like this for your business?',
    'cs.binko.cta.body': 'From first call to live domain — tell me what you are trying to launch.',
    'cs.binko.cta.button': 'Start a project',

    // AutoSilas front-desk mockup (ProductsHub + case study)
    'mock.as.aria':
      'AutoSilas digital front desk: an AI assistant answering a patient, capturing a booking request, with live stats.',
    'mock.as.brand.tag': 'Digital front desk',
    'mock.as.live': 'Answering live',
    'mock.as.patient': 'Hi! Do you take new patients? When is the next free slot?',
    'mock.as.ai': 'Yes, we do! Tomorrow at 10:30 or 14:00 — which works for you?',
    'mock.as.booked': 'Booking request captured · tomorrow 10:30',
    'mock.as.stat.1.v': '24/7',
    'mock.as.stat.1.l': 'answers patients',
    'mock.as.stat.2.v': '0 missed',
    'mock.as.stat.2.l': 'enquiries',
    'mock.as.stat.3.v': 'Leads',
    'mock.as.stat.3.l': 'straight to the inbox',

    // case study — Disciplis (/work/disciplis)
    'cs.disciplis.meta.title': 'Disciplis case study — Boyan Budakov',
    'cs.disciplis.meta.description':
      'Disciplis is a behavioural trading journal — a psychology-first tool that shows traders where their discipline breaks down, not just their P&L. A case study on what I built.',
    'cs.disciplis.back': 'Back to all work',
    'cs.disciplis.eyebrow': 'Case study — Behavioural trading journal',
    'cs.disciplis.title': 'Disciplis',
    'cs.disciplis.tagline': 'Your strategy isn’t the problem. Your behaviour is.',
    'cs.disciplis.result':
      'A trading journal built around psychology and discipline — it shows traders where their behaviour breaks down, not just their P&L.',
    'cs.disciplis.meta.role': 'Role',
    'cs.disciplis.meta.role.v': 'Solo — idea, product, design, build',
    'cs.disciplis.meta.stack': 'Category',
    'cs.disciplis.meta.stack.v': 'Behavioural analytics for traders',
    'cs.disciplis.meta.status': 'Status',
    'cs.disciplis.meta.status.v': 'Live · in production',
    'cs.disciplis.meta.year': 'Year',
    'cs.disciplis.meta.year.v': '2026',
    'cs.disciplis.showcase.caption':
      'The Daily Discipline Cockpit — the live app with real behavioural data, not a mockup.',
    'cs.disciplis.shot.dashboard.alt':
      'Disciplis dashboard: Daily Discipline Cockpit with clean streak, psychology signal, account risk and recent playbook breaks.',
    'cs.disciplis.gallery.eyebrow': 'Inside the product',
    'cs.disciplis.gallery.title': 'Behaviour, made visible',
    'cs.disciplis.shot.journal.cap':
      'Check-ins before and after every session — mood, readiness, confidence.',
    'cs.disciplis.shot.journal.alt':
      'Disciplis journal: pre-session check-in entries with mood, trading readiness and confidence scores.',
    'cs.disciplis.shot.psych.cap':
      'The psychology engine — what rule breaks actually cost, in P&L.',
    'cs.disciplis.shot.psych.alt':
      'Disciplis psychology view: playbook break rate and the P&L cost of broken rules.',
    'cs.disciplis.problem.eyebrow': '01 — The problem',
    'cs.disciplis.problem.title': 'Traders don’t blow up on strategy. They blow up on behaviour.',
    'cs.disciplis.problem.p1':
      'Revenge trading after a loss. FOMO into a move that already left. Oversizing after a win. Breaking the rules you set for yourself an hour earlier. The damage traders do to their own accounts is almost always behavioural — but every journal on the market only tracks profit and loss.',
    'cs.disciplis.problem.p2':
      'So a trader can see that they lost, never why. The mental pattern that actually costs them money stays invisible — and it repeats.',
    'cs.disciplis.approach.eyebrow': '02 — What I built',
    'cs.disciplis.approach.title': 'A journal that tracks the trader, not just the trades',
    'cs.disciplis.approach.p1':
      'Disciplis logs every trade with real risk rules — prop-firm limits, R:R, the numbers a serious trader lives by. But the heart of it is the behavioural layer: after each session you capture mood, discipline and confidence, write a short reflection, and tag what really happened — FOMO, revenge trade, tilted, calm, broke rules, overtraded.',
    'cs.disciplis.approach.p2':
      'Then it connects the two. A behaviour-insight engine reads your history and surfaces the patterns you can’t see yourself — performance dropping after a winning streak, weekday weakness, overtrading when you’re tilted — and rolls it into a discipline score you can watch move over time. Journaling turned into feedback, not storage.',
    'cs.disciplis.features.title': 'What’s inside',
    'cs.disciplis.feature.1': 'Trade journal with prop-firm risk rules',
    'cs.disciplis.feature.2': 'Behavioural diary — mood, discipline, confidence',
    'cs.disciplis.feature.3': 'Psychology tags — FOMO, revenge, tilt, calm',
    'cs.disciplis.feature.4': 'Rules engine linked to every trade',
    'cs.disciplis.feature.5': 'Behaviour-insight & pattern detection',
    'cs.disciplis.feature.6': 'Discipline & tilt scoring over time',
    'cs.disciplis.decision.title': 'The one bet',
    'cs.disciplis.decision.body':
      'Every competitor treats psychology as a side note bolted onto P&L. Disciplis makes behaviour the centre of the product — the thing you measure, improve, and get scored on. That is the whole positioning: your strategy isn’t the problem, your behaviour is.',
    'cs.disciplis.outcome.eyebrow': '03 — The outcome',
    'cs.disciplis.outcome.title': 'Live, and aimed at the real problem',
    'cs.disciplis.outcome.p1':
      'Disciplis is in production today. It is the clearest proof of how I work: I took a sharp insight about traders — that discipline, not strategy, is what breaks them — and turned it into a full, working product people can actually use.',
    'cs.disciplis.outcome.metric.1': 'Behaviour-first',
    'cs.disciplis.outcome.metric.1.label': 'not just P&L',
    'cs.disciplis.outcome.metric.2': 'Solo',
    'cs.disciplis.outcome.metric.2.label': 'idea → live product',
    'cs.disciplis.outcome.metric.3': 'Live',
    'cs.disciplis.outcome.metric.3.label': 'in production',
    'cs.disciplis.builtwith': 'Built with Next.js, Supabase and Prisma.',
    'cs.disciplis.visit': 'Visit the live app',
    'cs.disciplis.cta.title': 'Want something like this built for you?',
    'cs.disciplis.cta.body': 'Web app, website, or automation — tell me what you are trying to ship.',
    'cs.disciplis.cta.button': 'Start a project',

    // case study — AutoSilas (/work/autosilas)
    'cs.autosilas.meta.title': 'AutoSilas case study — Boyan Budakov',
    'cs.autosilas.meta.description':
      'AutoSilas is my automation business: hand-designed websites plus an AI front desk for local clinics — founded, designed, built and run solo. The case study.',
    'cs.autosilas.back': 'Back to all work',
    'cs.autosilas.eyebrow': 'Case study — My automation business',
    'cs.autosilas.title': 'AutoSilas',
    'cs.autosilas.tagline': 'A front desk that never misses a patient.',
    'cs.autosilas.result':
      'An automation business for local clinics — hand-designed websites plus an AI front desk that answers patients, captures booking requests and keeps the practice visible.',
    'cs.autosilas.meta.role': 'Role',
    'cs.autosilas.meta.role.v': 'Founder — brand, product, build, sales',
    'cs.autosilas.meta.stack': 'Category',
    'cs.autosilas.meta.stack.v': 'Websites + AI front-office automation',
    'cs.autosilas.meta.status': 'Status',
    'cs.autosilas.meta.status.v': 'Live · in production',
    'cs.autosilas.meta.year': 'Year',
    'cs.autosilas.meta.year.v': '2026',
    'cs.autosilas.showcase.caption':
      'autosilas.com — the live site, Bulgarian-first and aimed squarely at dental clinics.',
    'cs.autosilas.shot.home.alt':
      'AutoSilas homepage in ivory, green and champagne: “A website that inspires trust — before the first call”, with a glass tooth illustration.',
    'cs.autosilas.problem.eyebrow': '01 — The problem',
    'cs.autosilas.problem.title': 'Local clinics lose patients before anyone picks up the phone.',
    'cs.autosilas.problem.p1':
      'A dental practice lives or dies on its front desk. But the phone rings while everyone is chairside, questions arrive at 9 pm, and the website — when there is one — looks a decade old. Every one of those moments is a patient quietly choosing another clinic.',
    'cs.autosilas.problem.p2':
      'The clinics know it. What they don’t have is time — or anyone whose job it is to fix it.',
    'cs.autosilas.approach.eyebrow': '02 — What I built',
    'cs.autosilas.approach.title': 'A studio in front, an automation engine behind',
    'cs.autosilas.approach.p1':
      'AutoSilas pairs a hand-designed website with a digital front desk. The site is built to inspire trust before the first call — Bulgarian-first, custom design, never a template. Behind it sits an AI assistant that answers patient questions around the clock, captures booking requests, and hands the clinic a tidy lead instead of a missed call.',
    'cs.autosilas.approach.p2':
      'The offer grows in steps: from the website itself to a full front office — review handling, patient reactivation, the repetitive work a busy practice never gets to. I built all of it: the brand, the site, the demo clinic, the assistant, and the outreach that sells it.',
    'cs.autosilas.features.title': 'What’s inside',
    'cs.autosilas.feature.1': 'Hand-designed clinic websites — never templates',
    'cs.autosilas.feature.2': 'AI assistant answering patients 24/7',
    'cs.autosilas.feature.3': 'Booking requests captured as clean leads',
    'cs.autosilas.feature.4': 'Google-review handling on autopilot',
    'cs.autosilas.feature.5': 'Patient-reactivation campaigns',
    'cs.autosilas.feature.6': 'Bulgarian-first, built for one vertical',
    'cs.autosilas.decision.title': 'The one bet',
    'cs.autosilas.decision.body':
      'Go narrow. One country, one vertical — dental clinics in Bulgaria — and a service productised like a product: fixed scope, opinionated design, automation included. Depth in a niche beats breadth everywhere.',
    'cs.autosilas.gallery.eyebrow': 'Inside the business',
    'cs.autosilas.gallery.title': 'The work, live',
    'cs.autosilas.shot.iris.cap':
      'Iris — the live demo clinic I designed and built, so prospects can click through a finished result.',
    'cs.autosilas.shot.iris.alt':
      'Iris demo dental clinic website: a calm hero with a smiling dentist welcoming a patient, headline “Attentive care for your smile”.',
    'cs.autosilas.mock.cap':
      'The digital front desk — the AI assistant that answers and books, rebuilt here from the product’s design.',
    'cs.autosilas.outcome.eyebrow': '03 — The outcome',
    'cs.autosilas.outcome.title': 'A real business, live and selling',
    'cs.autosilas.outcome.p1':
      'AutoSilas is in production today: a live brand with its own site, a demo clinic prospects can walk through, and an AI front desk already answering on real domains. It is the fullest proof of how I work — not just code, but a business built end to end: positioning, design, build, automation and sales, all by one person directing modern AI tooling.',
    'cs.autosilas.outcome.metric.1': 'Founder',
    'cs.autosilas.outcome.metric.1.label': 'brand → build → sales',
    'cs.autosilas.outcome.metric.2': '24/7',
    'cs.autosilas.outcome.metric.2.label': 'AI front desk, always on',
    'cs.autosilas.outcome.metric.3': 'Live',
    'cs.autosilas.outcome.metric.3.label': 'in production',
    'cs.autosilas.builtwith': 'Custom design system, custom code, and my own AI assistant behind it.',
    'cs.autosilas.visit': 'Visit AutoSilas',
    'cs.autosilas.cta.title': 'Want something like this built for you?',
    'cs.autosilas.cta.body': 'Website, web app, or automation — tell me what you are trying to ship.',
    'cs.autosilas.cta.button': 'Start a project',

    // about
    'about.eyebrow': '03 — About',
    'about.title': 'A builder, not a spectator',
    'about.p1':
      'I am a builder from Bulgaria with a computer-science background. I ship full products by directing modern and AI tooling — and I care about the result on screen, not the buzzwords behind it.',
    'about.p2':
      'I founded AutoSilas — my automation business, giving local clinics a website and an AI front desk that answers patients around the clock. And because I am also a trader, I built Disciplis: the behavioural trading journal I wanted for my own screen time.',
    'about.p3': 'How I work: fast iterations, honest scope, and a bias toward shipping.',
    'about.stack.title': 'Working with',
    'about.stack.also': '…and the usual: Next.js, Astro, Supabase, TypeScript.',
    'about.fact.1.k': 'Based',
    'about.fact.1.v': 'Bulgaria — building worldwide',
    'about.fact.2.k': 'Background',
    'about.fact.2.v': 'Computer science · live markets',
    'about.fact.3.k': 'Shipped',
    'about.fact.3.v': 'AutoSilas · Disciplis',
    'about.fact.4.k': 'Availability',
    'about.fact.4.v': 'Open for new projects',
    'about.photo.alt': 'Boyan Budakov — full-length portrait, standing.',
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

  // BG — full mirror of EN. Informal „ти“ tone by Boyan's choice (2026-07-09).
  bg: {
    // meta
    'site.title': 'Боян Будаков — строя реални продукти, бързо',
    'site.description':
      'Билдър, който пуска реални, работещи продукти бързо с модерни и AI инструменти. Уебсайтове, уеб приложения и автоматизации.',

    // header / nav
    'nav.work': 'Проекти',
    'nav.about': 'За мен',
    'nav.services': 'Какво правя',
    'nav.contact': 'Контакт',
    'nav.skip': 'Към съдържанието',

    // hero
    'hero.eyebrow': 'Билдър · Основател',
    'hero.location': 'България · EN / BG',
    'hero.headline.1': 'Нетрадиционни методи',
    'hero.headline.accent': '=',
    'hero.headline.2': 'нетрадиционни резултати.',
    'hero.sub': 'Уебсайтове, уеб приложения и автоматизации — от идея до жив продукт за дни.',
    'hero.sub.w1': 'Уебсайтове',
    'hero.sub.w2': 'Уеб приложения',
    'hero.sub.w3': 'AI автоматизации',
    'hero.sub.tail': '— от идея до жив продукт за дни.',
    'hero.cta': 'Започни проект',
    'hero.secondary': 'Виж проектите',
    'hero.marquee.1': 'Нетрадиционен по замисъл',
    'hero.marquee.2': 'Изградено, не изговорено',
    'hero.marquee.3': 'Дисциплина пред допамин',
    'hero.marquee.4': 'Око на трейдър, ръце на билдър',
    'hero.marquee.5': 'Тиха работа, шумни резултати',
    'hero.marquee.6': 'Истински продукти, не прототипи',
    'hero.marquee.7': 'Базиран в България, строя за света',

    // what I do
    'services.eyebrow': '01 — Какво правя',
    'services.title.pre': 'Три начина да',
    'services.title.mark': 'помогна',
    'services.lede': 'Честен обхват, бързо пускане — както строя и собствените си продукти.',
    'services.websites.title': 'Уебсайтове',
    'services.websites.body':
      'Бързи, отличаващи се сайтове, които превръщат посетителите в клиенти — проектирани на ръка около твоя бизнес и това, което го отличава.',
    'services.websites.tag': 'Носят клиенти',
    'services.websites.d1': 'Дизайн по поръчка — никога шаблон',
    'services.websites.d2': 'Текстове, които носят запитвания',
    'services.websites.d3': 'Светкавично бърз, готов за SEO',
    'services.websites.time': 'на живо за дни',
    'services.apps.title': 'Уеб приложения',
    'services.apps.body':
      'Истински SaaS, в който можеш да влезеш, не прототип — продукт от типа, който сам поддържам в продукция.',
    'services.apps.d1': 'Вход, база данни, плащания',
    'services.apps.d2': 'Табла и админ панели',
    'services.apps.d3': 'Строен да расте отвъд MVP',
    'services.apps.time': 'MVP за седмици',
    'services.automations.title': 'Автоматизации',
    'services.automations.body':
      'Часовете, които губиш в повтаряща се работа, поети от софтуер, който върви и без теб.',
    'services.automations.d1': 'Скрейпъри, пайплайни, агенти',
    'services.automations.d2': 'AI там, където си заслужава',
    'services.automations.d3': 'Инструментите ти най-после си говорят',
    'services.automations.time': 'обхват според задачата',

    // начална страница — без проекти и без клиенти; две врати
    'pointer.eyebrow': '02 — Работа',
    'pointer.title.pre': 'Строено за клиенти.',
    'pointer.title.mark': 'Строено',
    'pointer.title.post': 'за мен.',
    'pointer.clients.title': 'Клиенти',
    'pointer.clients.line': 'Истински бизнеси, истински пускания.',
    'pointer.clients.cta': 'Виж клиентите ми',
    'pointer.products.title': 'Продукти, които изградих',
    'pointer.products.line': 'Неща, които проектирах и пуснах от край до край.',
    'pointer.products.cta': 'Виж продуктите',

    // хъбове (общи)
    'hub.back': 'Обратно към началото',
    'hub.case': 'Прочети кейс стъдито',

    // /work — продукти
    'hub.work.meta.title': 'Продукти, които изградих — Боян Будаков',
    'hub.work.meta.description':
      'AutoSilas и Disciplis — два продукта, проектирани, написани и пуснати от край до край от Боян Будаков.',
    'hub.work.eyebrow': 'Продукти',
    'hub.work.title.pre': 'Продукти, които',
    'hub.work.title.mark': 'изградих',
    'hub.work.lede': 'Два продукта, които притежавам от край до край — бранд, дизайн, код и бизнесът около тях. И двата са живи в продукция.',
    'hub.work.autosilas.name': 'AutoSilas',
    'hub.work.autosilas.kind': 'Моят бизнес за автоматизации · Живо',
    'hub.work.autosilas.result':
      'Собственият ми бизнес за автоматизации — сайтове, проектирани на ръка, плюс AI приемна, която отговаря на пациентите на локални клиники денонощно.',
    'hub.work.autosilas.problem':
      'Локалните клиники живеят на телефона: пропуснати обаждания, въпроси без отговор и остарели сайтове тихо им костват пациенти — а в практиката никой няма време за това.',
    'hub.work.autosilas.approach':
      'Затова основах AutoSilas и изградих всичко — бранд, сайт на български, жива демо клиника и дигитална приемна: AI асистент, който отговаря на пациентите 24/7 и превръща разговорите в заявки за час.',
    'hub.work.autosilas.outcome':
      'Днес работи в продукция като истински бизнес със собствен бранд — проектиран, изграден, продаван и управляван от мен.',
    'hub.work.autosilas.metric': 'Живо · основан и воден соло',
    'hub.work.autosilas.link': 'Виж AutoSilas',
    'hub.work.disciplis.name': 'Disciplis',
    'hub.work.disciplis.kind': 'Поведенчески трейдинг дневник · Живо',
    'hub.work.disciplis.result':
      'Поведенчески дневник за трейдъри, който показва къде се чупи дисциплината — роден от собствения ми трейдинг, жив в продукция.',
    'hub.work.disciplis.problem':
      'Повечето трейдъри губят пари заради поведение, не заради стратегия: отмъстителни сделки, прекалени позиции, нарушени собствени правила. Обикновените дневници записват сделките и пропускат модела.',
    'hub.work.disciplis.approach':
      'Проектирах и изградих Disciplis, за да записва всяка сделка спрямо собствените правила на трейдъра, да извежда поведенческите модели зад загубите и да ги показва ясно на едно табло.',
    'hub.work.disciplis.outcome':
      'Живо на disciplis.com — продукт, бранд и код изцяло мои, тествано първо върху моите собствени сделки.',
    'hub.work.disciplis.metric': 'Живо · проектирано и изградено соло',
    'hub.work.disciplis.link': 'Виж Disciplis',
    'hub.work.disciplis.shot.alt': 'Таблото на Disciplis — поведенчески метрики върху дневника на трейдър.',

    // /clients
    'hub.clients.meta.title': 'Клиенти — Боян Будаков',
    'hub.clients.meta.description':
      'Истински бизнеси, за които съм проектирал, изградил и пуснал сайтове — като начало Binko, вендинг оператор в София от 2003 г.',
    'hub.clients.eyebrow': 'Клиенти',
    'hub.clients.title.pre': 'Истински бизнеси,',
    'hub.clients.title.mark': 'истински пускания',
    'hub.clients.lede': 'Компании, които ми повериха уеб присъствието си — от първото обаждане до жив сайт, с домейн и имейл включени.',
    'hub.clients.binko.name': 'Binko',
    'hub.clients.binko.kind': 'Вендинг оператор · София · от 2003',
    'hub.clients.binko.outcome': 'От никакъв сайт до жив брандов сайт за пет седмици.',
    'hub.clients.binko.blurb':
      'Вендинг компания с 23-годишна история, 150+ машини и партньори като Софийското метро и НДК — но без никакво уеб присъствие. Проектирах, изградих и пуснах binko.bg от край до край.',
    'hub.clients.binko.link': 'Виж binko.bg',

    // Binko кейс стъди
    'cs.binko.meta.title': 'Binko кейс стъди — Боян Будаков',
    'cs.binko.meta.description':
      'Как проектирах, изградих и пуснах сайта на Binko — софийски вендинг оператор със 150+ машини — за пет седмици, от първото обаждане до жив домейн.',
    'cs.binko.back': 'Всички клиенти',
    'cs.binko.eyebrow': 'Клиентски кейс стъди — Вендинг',
    'cs.binko.title': 'Binko',
    'cs.binko.tagline': 'Кафе и закуски на една ръка.',
    'cs.binko.result':
      'Вендинг бизнес с 23-годишна история и без сайт получи брандов сайт, който най-после изглежда като компанията зад него — жив за пет седмици, със запитвания право в пощата на собственика.',
    'cs.binko.meta.client': 'Клиент',
    'cs.binko.meta.client.v': '„Бинко“ ООД — София и Западна България',
    'cs.binko.meta.role': 'Роля',
    'cs.binko.meta.role.v': 'Дизайн, разработка, пускане, домейн и имейл',
    'cs.binko.meta.stack': 'Стек',
    'cs.binko.meta.stack.v': 'Astro · Tailwind · GSAP · Cloudflare',
    'cs.binko.meta.status': 'Статус',
    'cs.binko.meta.status.v': 'Живо · 2026',
    'cs.binko.showcase.caption': 'binko.bg в продукция — видео хедър, истински машини, истински партньори.',
    'cs.binko.shot.home.alt': 'Началната страница на Binko — видео хедър с кафе машина и заглавие „Кафе и закуски на една ръка“.',
    'cs.binko.shot.partners.alt': 'Лентата с партньори на binko.bg — логата на Софийското метро, НДК, БНТ, Софийския университет и други.',
    'cs.binko.shot.partners.cap': 'Доверяват ни се институции и борси от 2003 г. — 16 партньорски лога в жива лента.',
    'cs.binko.problem.eyebrow': '01 — Проблемът',
    'cs.binko.problem.title': 'Двадесет и три години бизнес, нула уеб присъствие.',
    'cs.binko.problem.p1':
      'Binko поддържа вендинг машини в София и Западна България от 2003 г. — 150+ машини, 80 000+ чаши на месец, партньори като Софийското метро, НДК, БНТ и Софийския университет. Нищо от това не се виждаше онлайн. Новите запитвания идваха само по телефона, а потенциален клиент, който потърси името, не намираше нищо.',
    'cs.binko.problem.p2':
      'Брандът съществуваше на точно едно място: отпечатан върху чашата. Задачата беше да вземем тази чаша и да изградим фирмен сайт около нея — такъв, на който един фасилити мениджър да се довери за трийсет секунди и който собственикът да поддържа без мен.',
    'cs.binko.approach.eyebrow': '02 — Какво изградих',
    'cs.binko.approach.title': 'Бранд, тръгнал от чашата',
    'cs.binko.approach.p1':
      'Взех синьото директно от истинската чаша на Binko и изградих около него закачлива визуална система от стикери и комикс акценти — едър дисплей шрифт, ръчно рисувани детайли, видео хедър със самата машина. Услуги, машини, 3D галерия с истински обекти за прелистване и жива лента с партньори правят мащаба на бизнеса очевиден без нито един абзац самохвалство.',
    'cs.binko.approach.p2':
      'Отдолу е бърз статичен Astro сайт на Cloudflare: мобилна оптимизация с многостепенно зареждане на видеото и дисциплинирани анимационни кадри, контактна форма, която доставя право в пощата на собственика, LocalBusiness структурирани данни за търсачките и истински .bg домейн с безплатен фирмен имейл — така че клиентът притежава всичко.',
    'cs.binko.decision.1.title': 'Бранд от чашата',
    'cs.binko.decision.1.body': 'Нямаше бранд бук, затова чашата стана такъв. Синьото е взето от печата; езикът на стикерите идва от начина, по който са облечени машините.',
    'cs.binko.decision.2.title': 'Доказателства вместо обещания',
    'cs.binko.decision.2.body': 'Истински обекти, истински партньори, истински модели машини. Сайтът убеждава с факти, не с прилагателни.',
    'cs.binko.decision.3.title': 'Работи без мен',
    'cs.binko.decision.3.body': 'Форма към пощата на собственика, домейн и имейл на името на клиента, нищо, което да има нужда от мен, за да продължи да работи.',
    'cs.binko.features.title': 'Какво има вътре',
    'cs.binko.feature.1': 'Видео хедър с мобилно степенуване',
    'cs.binko.feature.2': '3D галерия с истински обекти за прелистване',
    'cs.binko.feature.3': 'Жива лента с партньори — 16 лога',
    'cs.binko.feature.4': 'Контактна форма право в пощата на собственика',
    'cs.binko.feature.5': 'SEO + LocalBusiness структурирани данни',
    'cs.binko.feature.6': '.bg домейн и безплатен фирмен имейл',
    'cs.binko.gallery.eyebrow': 'Вътре в сайта',
    'cs.binko.gallery.title': 'Работата, на живо',
    'cs.binko.shot.machines.alt': 'Секцията с машини на binko.bg — кафе и снакс автомати върху сини стикер карти.',
    'cs.binko.shot.machines.cap': 'Машини — модели Zanussi Necta върху сини стикер карти.',
    'cs.binko.shot.gallery.alt': 'Галерията с обекти на binko.bg — 3D въртележка със снимки на истински машини на място.',
    'cs.binko.shot.gallery.cap': 'Обекти — 3D галерия с истински инсталации.',
    'cs.binko.shot.mobile.alt': 'Сайтът на Binko на телефон — секцията с машини при 390px ширина.',
    'cs.binko.shot.mobile.cap': 'Мобилно — където са повечето посетители на клиента.',
    'cs.binko.outcome.eyebrow': '03 — Резултатът',
    'cs.binko.outcome.title': 'Живо, собственост на клиента, готово за запитвания',
    'cs.binko.outcome.p1':
      'Binko мина от нищо до жив брандов сайт между първия комит на 11 юли и пускането през август — дизайн, разработка, съдържание, домейн и имейл, всичко в един ангажимент. Запитванията вече не зависят от телефонно обаждане.',
    'cs.binko.outcome.metric.1': '0 → живо',
    'cs.binko.outcome.metric.1.label': 'за 5 седмици',
    'cs.binko.outcome.metric.2': '16',
    'cs.binko.outcome.metric.2.label': 'партньорски лога, на живо',
    'cs.binko.outcome.metric.3': '1 форма',
    'cs.binko.outcome.metric.3.label': 'право в пощата на собственика',
    'cs.binko.builtwith': 'Astro, Tailwind, GSAP и Cloudflare — собствен дизайн, собствен код.',
    'cs.binko.visit': 'Виж binko.bg',
    'cs.binko.cta.title': 'Искаш нещо такова за твоя бизнес?',
    'cs.binko.cta.body': 'От първото обаждане до жив домейн — кажи ми какво искаш да пуснеш.',
    'cs.binko.cta.button': 'Започни проект',

    // AutoSilas front-desk mockup (ProductsHub + case study)
    'mock.as.aria':
      'Дигиталната приемна на AutoSilas: AI асистент отговаря на пациент, приема заявка за час, с живи показатели.',
    'mock.as.brand.tag': 'Дигитална приемна',
    'mock.as.live': 'Отговаря на живо',
    'mock.as.patient': 'Здравейте! Приемате ли нови пациенти? Кога има свободен час?',
    'mock.as.ai': 'Да, приемаме! Утре в 10:30 или 14:00 — кое ви е удобно?',
    'mock.as.booked': 'Заявка за час приета · утре 10:30',
    'mock.as.stat.1.v': '24/7',
    'mock.as.stat.1.l': 'отговаря на пациенти',
    'mock.as.stat.2.v': '0 пропуснати',
    'mock.as.stat.2.l': 'запитвания',
    'mock.as.stat.3.v': 'Запитвания',
    'mock.as.stat.3.l': 'право в пощата',

    // about
    'about.eyebrow': '03 — За мен',
    'about.title': 'Билдър, не наблюдател',
    'about.p1':
      'Аз съм билдър от България с бекграунд в компютърните науки. Пускам цели продукти, като направлявам модерни и AI инструменти — и ме интересува резултатът на екрана, не модните думи зад него.',
    'about.p2':
      'Основах AutoSilas — моят бизнес за автоматизации, който дава на локални клиники сайт и AI приемна, отговаряща на пациентите денонощно. А понеже съм и трейдър, изградих Disciplis — трейдинг дневникът, който исках за собствените си сесии.',
    'about.p3': 'Как работя: бързи итерации, честен обхват и нагласа към пускане.',
    'about.stack.title': 'Работя с',
    'about.stack.also': '…и обичайното: Next.js, Astro, Supabase, TypeScript.',
    'about.fact.1.k': 'Базиран',
    'about.fact.1.v': 'България — строя за света',
    'about.fact.2.k': 'Бекграунд',
    'about.fact.2.v': 'Компютърни науки · пазарите',
    'about.fact.3.k': 'Пуснато',
    'about.fact.3.v': 'AutoSilas · Disciplis',
    'about.fact.4.k': 'Наличност',
    'about.fact.4.v': 'Отворен за нови проекти',
    'about.photo.alt': 'Боян Будаков — портрет в цял ръст.',
    'about.autosilas': 'AutoSilas — студио за локални бизнеси',

    // contact
    'contact.eyebrow': '04 — Контакт',
    'contact.title': 'Имаш нещо за строене?',
    'contact.body': 'Кажи ми какво искаш да пуснеш. Чета всяко съобщение и отговарям лично.',
    'contact.name': 'Име',
    'contact.email': 'Имейл',
    'contact.message': 'Какво искаш да изградим?',
    'contact.send': 'Изпрати съобщение',
    'contact.or': 'или ми пиши директно',

    // footer
    'footer.statement': 'Нека изградим нещо истинско.',
    'footer.rights': 'Всички права запазени.',
    'footer.built': 'Ръчно изграден с Astro.',

    // case study — Disciplis (/bg/work/disciplis)
    'cs.disciplis.meta.title': 'Disciplis кейс стъди — Боян Будаков',
    'cs.disciplis.meta.description':
      'Disciplis е поведенчески трейдинг дневник — инструмент с фокус върху психологията, който показва на трейдърите къде се чупи дисциплината им, не само техния P&L.',
    'cs.disciplis.back': 'Обратно към проектите',
    'cs.disciplis.eyebrow': 'Кейс стъди — Поведенчески трейдинг дневник',
    'cs.disciplis.title': 'Disciplis',
    'cs.disciplis.tagline': 'Проблемът не е стратегията ти. А поведението ти.',
    'cs.disciplis.result':
      'Трейдинг дневник, изграден около психологията и дисциплината — показва на трейдърите къде се чупи поведението им, не само техния P&L.',
    'cs.disciplis.meta.role': 'Роля',
    'cs.disciplis.meta.role.v': 'Соло — идея, продукт, дизайн, разработка',
    'cs.disciplis.meta.stack': 'Категория',
    'cs.disciplis.meta.stack.v': 'Поведенческа аналитика за трейдъри',
    'cs.disciplis.meta.status': 'Статус',
    'cs.disciplis.meta.status.v': 'Живо · в продукция',
    'cs.disciplis.meta.year': 'Година',
    'cs.disciplis.meta.year.v': '2026',
    'cs.disciplis.showcase.caption':
      'Daily Discipline Cockpit — живото приложение с реални поведенчески данни, не мокъп.',
    'cs.disciplis.shot.dashboard.alt':
      'Табло на Disciplis: Daily Discipline Cockpit със серии, психологически сигнал и риск по сметките.',
    'cs.disciplis.gallery.eyebrow': 'Вътре в продукта',
    'cs.disciplis.gallery.title': 'Поведението, направено видимо',
    'cs.disciplis.shot.journal.cap':
      'Чек-ин преди и след всяка сесия — настроение, готовност, увереност.',
    'cs.disciplis.shot.journal.alt':
      'Дневник на Disciplis: чек-ин записи с настроение, готовност за търговия и увереност.',
    'cs.disciplis.shot.psych.cap':
      'Психологическият енджин — колко реално струват нарушените правила, в P&L.',
    'cs.disciplis.shot.psych.alt':
      'Психология в Disciplis: процент нарушения на правилата и тяхната P&L цена.',
    'cs.disciplis.problem.eyebrow': '01 — Проблемът',
    'cs.disciplis.problem.title': 'Трейдърите не се провалят заради стратегия. Провалят се заради поведение.',
    'cs.disciplis.problem.p1':
      'Отмъстителна сделка след загуба. FOMO към движение, което вече е отминало. По-големи позиции след печалба. Нарушаваш правилата, които сам си постави преди час. Щетите, които трейдърите нанасят на собствените си сметки, са почти винаги поведенчески — но всеки дневник на пазара следи само печалби и загуби.',
    'cs.disciplis.problem.p2':
      'Така трейдърът вижда, че е загубил, но никога защо. Менталният модел, който реално му коства пари, остава невидим — и се повтаря.',
    'cs.disciplis.approach.eyebrow': '02 — Какво изградих',
    'cs.disciplis.approach.title': 'Дневник, който следи трейдъра, не само сделките',
    'cs.disciplis.approach.p1':
      'Disciplis записва всяка сделка с истински риск правила — проп-фърм лимити, R:R, числата, по които живее сериозният трейдър. Но сърцето му е поведенческият слой: след всяка сесия отбелязваш настроение, дисциплина и увереност, пишеш кратка рефлексия и тагваш какво реално се е случило — FOMO, отмъстителна сделка, тилт, спокойствие, нарушени правила, престараване.',
    'cs.disciplis.approach.p2':
      'После свързва двете. Енджин за поведенчески инсайти чете историята ти и извежда моделите, които сам не виждаш — спад след печеливша серия, слаби дни от седмицата, престараване при тилт — и ги събира в оценка на дисциплината, която гледаш как се движи във времето. Дневникът става обратна връзка, не склад.',
    'cs.disciplis.features.title': 'Какво има вътре',
    'cs.disciplis.feature.1': 'Трейдинг дневник с проп-фърм риск правила',
    'cs.disciplis.feature.2': 'Поведенчески дневник — настроение, дисциплина, увереност',
    'cs.disciplis.feature.3': 'Психологически тагове — FOMO, отмъщение, тилт, спокойствие',
    'cs.disciplis.feature.4': 'Енджин с правила, свързан с всяка сделка',
    'cs.disciplis.feature.5': 'Поведенчески инсайти и разпознаване на модели',
    'cs.disciplis.feature.6': 'Оценка на дисциплина и тилт във времето',
    'cs.disciplis.decision.title': 'Единственият залог',
    'cs.disciplis.decision.body':
      'Всеки конкурент третира психологията като добавка към P&L. Disciplis прави поведението център на продукта — това, което измерваш, подобряваш и по което получаваш оценка. Това е цялото позициониране: проблемът не е стратегията ти, а поведението ти.',
    'cs.disciplis.outcome.eyebrow': '03 — Резултатът',
    'cs.disciplis.outcome.title': 'Живо, насочено към истинския проблем',
    'cs.disciplis.outcome.p1':
      'Disciplis е в продукция днес. Това е най-ясното доказателство как работя: взех остро наблюдение за трейдърите — че дисциплината, не стратегията, ги проваля — и го превърнах в цял, работещ продукт, който хората реално могат да ползват.',
    'cs.disciplis.outcome.metric.1': 'Поведение първо',
    'cs.disciplis.outcome.metric.1.label': 'не само P&L',
    'cs.disciplis.outcome.metric.2': 'Соло',
    'cs.disciplis.outcome.metric.2.label': 'идея → жив продукт',
    'cs.disciplis.outcome.metric.3': 'Живо',
    'cs.disciplis.outcome.metric.3.label': 'в продукция',
    'cs.disciplis.builtwith': 'Изграден с Next.js, Supabase и Prisma.',
    'cs.disciplis.visit': 'Виж живото приложение',
    'cs.disciplis.cta.title': 'Искаш нещо такова, изградено за теб?',
    'cs.disciplis.cta.body': 'Уеб приложение, сайт или автоматизация — кажи ми какво искаш да пуснеш.',
    'cs.disciplis.cta.button': 'Започни проект',

    // case study — AutoSilas (/bg/work/autosilas)
    'cs.autosilas.meta.title': 'AutoSilas кейс стъди — Боян Будаков',
    'cs.autosilas.meta.description':
      'AutoSilas е моят бизнес за автоматизации: сайтове, проектирани на ръка, плюс AI приемна за локални клиники — основан, проектиран, изграден и воден соло.',
    'cs.autosilas.back': 'Обратно към проектите',
    'cs.autosilas.eyebrow': 'Кейс стъди — Моят бизнес за автоматизации',
    'cs.autosilas.title': 'AutoSilas',
    'cs.autosilas.tagline': 'Приемна, която не изпуска пациент.',
    'cs.autosilas.result':
      'Бизнес за автоматизации за локални клиники — сайтове, проектирани на ръка, плюс AI приемна, която отговаря на пациентите, приема заявки за час и държи практиката видима.',
    'cs.autosilas.meta.role': 'Роля',
    'cs.autosilas.meta.role.v': 'Основател — бранд, продукт, разработка, продажби',
    'cs.autosilas.meta.stack': 'Категория',
    'cs.autosilas.meta.stack.v': 'Сайтове + AI автоматизация на приемната',
    'cs.autosilas.meta.status': 'Статус',
    'cs.autosilas.meta.status.v': 'Живо · в продукция',
    'cs.autosilas.meta.year': 'Година',
    'cs.autosilas.meta.year.v': '2026',
    'cs.autosilas.showcase.caption':
      'autosilas.com — живият сайт, на български и насочен право към денталните клиники.',
    'cs.autosilas.shot.home.alt':
      'Началната страница на AutoSilas в слонова кост, зелено и шампанско: „Сайт, който вдъхва доверие — преди първото обаждане“, със стъклена илюстрация на зъб.',
    'cs.autosilas.problem.eyebrow': '01 — Проблемът',
    'cs.autosilas.problem.title': 'Локалните клиники губят пациенти, преди някой да вдигне телефона.',
    'cs.autosilas.problem.p1':
      'Една дентална практика живее или умира на рецепцията си. Но телефонът звъни, докато всички са при пациент, въпросите идват в 21:00, а сайтът — когато го има — изглежда на десет години. Всеки такъв момент е пациент, който тихо избира друга клиника.',
    'cs.autosilas.problem.p2':
      'Клиниките го знаят. Това, което нямат, е време — или човек, чиято работа е да го оправи.',
    'cs.autosilas.approach.eyebrow': '02 — Какво изградих',
    'cs.autosilas.approach.title': 'Студио отпред, машина за автоматизации отзад',
    'cs.autosilas.approach.p1':
      'AutoSilas съчетава сайт, проектиран на ръка, с дигитална приемна. Сайтът е строен да вдъхва доверие преди първото обаждане — на български, дизайн по поръчка, никога шаблон. Зад него стои AI асистент, който отговаря на въпросите на пациентите денонощно, приема заявки за час и подава на клиниката чисто запитване вместо пропуснато обаждане.',
    'cs.autosilas.approach.p2':
      'Офертата расте на стъпки: от самия сайт до цяла дигитална приемна — работа с отзиви, реактивация на пациенти, повтарящата се работа, до която една заета практика никога не стига. Изградих всичко: бранда, сайта, демо клиниката, асистента и аутрича, който го продава.',
    'cs.autosilas.features.title': 'Какво има вътре',
    'cs.autosilas.feature.1': 'Сайтове за клиники, проектирани на ръка — никога шаблони',
    'cs.autosilas.feature.2': 'AI асистент, отговарящ на пациенти 24/7',
    'cs.autosilas.feature.3': 'Заявки за час, уловени като чисти запитвания',
    'cs.autosilas.feature.4': 'Работа с Google отзиви на автопилот',
    'cs.autosilas.feature.5': 'Кампании за реактивация на пациенти',
    'cs.autosilas.feature.6': 'На български, строен за една ниша',
    'cs.autosilas.decision.title': 'Единственият залог',
    'cs.autosilas.decision.body':
      'Тясно фокусиране. Една държава, една ниша — дентални клиники в България — и услуга, продуктизирана като продукт: фиксиран обхват, категоричен дизайн, автоматизация включена. Дълбочината в ниша бие широчината навсякъде.',
    'cs.autosilas.gallery.eyebrow': 'Вътре в бизнеса',
    'cs.autosilas.gallery.title': 'Работата, на живо',
    'cs.autosilas.shot.iris.cap':
      'Ирис — живата демо клиника, която проектирах и изградих, за да могат клиентите да разгледат готов резултат.',
    'cs.autosilas.shot.iris.alt':
      'Сайт на демо дентална клиника Ирис: спокоен хиро с усмихнат зъболекар, посрещащ пациент, заглавие „Внимателна грижа за вашата усмивка“.',
    'cs.autosilas.mock.cap':
      'Дигиталната приемна — AI асистентът, който отговаря и записва часове, пресъздаден тук от дизайна на продукта.',
    'cs.autosilas.outcome.eyebrow': '03 — Резултатът',
    'cs.autosilas.outcome.title': 'Истински бизнес, жив и продаващ',
    'cs.autosilas.outcome.p1':
      'AutoSilas е в продукция днес: жив бранд със собствен сайт, демо клиника, през която клиентите могат да минат, и AI приемна, която вече отговаря на реални домейни. Това е най-пълното доказателство как работя — не просто код, а бизнес, изграден от край до край: позициониране, дизайн, разработка, автоматизация и продажби, всичко от един човек, направляващ модерни AI инструменти.',
    'cs.autosilas.outcome.metric.1': 'Основател',
    'cs.autosilas.outcome.metric.1.label': 'бранд → билд → продажби',
    'cs.autosilas.outcome.metric.2': '24/7',
    'cs.autosilas.outcome.metric.2.label': 'AI приемна, винаги будна',
    'cs.autosilas.outcome.metric.3': 'Живо',
    'cs.autosilas.outcome.metric.3.label': 'в продукция',
    'cs.autosilas.builtwith': 'Собствена дизайн система, собствен код и мой AI асистент зад всичко.',
    'cs.autosilas.visit': 'Виж AutoSilas',
    'cs.autosilas.cta.title': 'Искаш нещо такова, изградено за теб?',
    'cs.autosilas.cta.body': 'Сайт, уеб приложение или автоматизация — кажи ми какво искаш да пуснеш.',
    'cs.autosilas.cta.button': 'Започни проект',
  },
} as const;
