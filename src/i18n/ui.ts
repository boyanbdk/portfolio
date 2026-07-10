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
    'services.title': 'Three ways I can help',
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

    // selected work
    'work.eyebrow': '02 — Selected work',
    'work.title': 'One that proves the point',
    'work.disciplis.name': 'Disciplis',
    'work.disciplis.kind': 'Behavioural journal · Live',
    'work.disciplis.result':
      'A behavioural trading journal that shows traders where their discipline breaks down — not just their P&L.',
    'work.disciplis.problem':
      'Traders lose to behaviour, not strategy — revenge trades, FOMO, tilt, broken rules — yet every journal only tracks profit and loss.',
    'work.disciplis.approach':
      'So I built the psychology layer: log mood, discipline and confidence each session, tag what actually happened, and let an insight engine surface the patterns.',
    'work.disciplis.outcome':
      'The result is a live product that scores discipline over time — journaling turned into real feedback.',
    'work.disciplis.metric': 'Live · in production',
    'work.disciplis.link': 'Visit Disciplis',
    'work.disciplis.case': 'Read the case study',
    'work.more': 'More case studies land as they ship.',

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

    // about
    'about.eyebrow': '03 — About',
    'about.title': 'A builder, not a spectator',
    'about.p1':
      'I am a builder from Bulgaria with a computer-science background. I ship full products by directing modern and AI tooling — and I care about the result on screen, not the buzzwords behind it.',
    'about.p2':
      'I am also a trader. That is where Disciplis comes from — I built the trading journal I wanted for my own screen time. I build tools for problems I personally live with. I also founded AutoSilas, a studio that gets local businesses a real web and Google presence.',
    'about.p3': 'How I work: fast iterations, honest scope, and a bias toward shipping.',
    'about.stack.title': 'Working with',
    'about.stack.also': '…and the usual: Next.js, Astro, Supabase, TypeScript.',
    'about.fact.1.k': 'Based',
    'about.fact.1.v': 'Bulgaria — building worldwide',
    'about.fact.2.k': 'Background',
    'about.fact.2.v': 'Computer science · live markets',
    'about.fact.3.k': 'Shipped',
    'about.fact.3.v': 'Disciplis · AutoSilas',
    'about.fact.4.k': 'Availability',
    'about.fact.4.v': 'Open for new projects',
    'about.photo.alt': 'Boyan’s workspace at dusk — two monitors, charts and code.',
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
    'services.title': 'Три начина да помогна',
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

    // selected work
    'work.eyebrow': '02 — Избрани проекти',
    'work.title': 'Един, който доказва тезата',
    'work.disciplis.name': 'Disciplis',
    'work.disciplis.kind': 'Поведенчески дневник · Живо',
    'work.disciplis.result':
      'Поведенчески трейдинг дневник, който показва на трейдърите къде се чупи дисциплината им — не само техния P&L.',
    'work.disciplis.problem':
      'Трейдърите губят заради поведение, не заради стратегия — отмъстителни сделки, FOMO, тилт, нарушени правила — а всеки дневник следи само печалби и загуби.',
    'work.disciplis.approach':
      'Затова изградих психологическия слой: записваш настроение, дисциплина и увереност за всяка сесия, тагваш какво реално се е случило, а инсайт енджин извежда моделите.',
    'work.disciplis.outcome':
      'Резултатът е жив продукт, който измерва дисциплината във времето — дневникът се превръща в реална обратна връзка.',
    'work.disciplis.metric': 'Живо · в продукция',
    'work.disciplis.link': 'Виж Disciplis',
    'work.disciplis.case': 'Прочети кейс стъдито',
    'work.more': 'Още кейс стъдита идват с всеки нов продукт.',

    // about
    'about.eyebrow': '03 — За мен',
    'about.title': 'Билдър, не наблюдател',
    'about.p1':
      'Аз съм билдър от България с бекграунд в компютърните науки. Пускам цели продукти, като направлявам модерни и AI инструменти — и ме интересува резултатът на екрана, не модните думи зад него.',
    'about.p2':
      'Освен това съм трейдър. Оттам идва Disciplis — изградих трейдинг дневника, който исках за собствените си сесии. Строя инструменти за проблеми, които лично живея. Основах и AutoSilas — студио, което дава на локалните бизнеси истинско уеб и Google присъствие.',
    'about.p3': 'Как работя: бързи итерации, честен обхват и нагласа към пускане.',
    'about.stack.title': 'Работя с',
    'about.stack.also': '…и обичайното: Next.js, Astro, Supabase, TypeScript.',
    'about.fact.1.k': 'Базиран',
    'about.fact.1.v': 'България — строя за света',
    'about.fact.2.k': 'Бекграунд',
    'about.fact.2.v': 'Компютърни науки · пазарите',
    'about.fact.3.k': 'Пуснато',
    'about.fact.3.v': 'Disciplis · AutoSilas',
    'about.fact.4.k': 'Наличност',
    'about.fact.4.v': 'Отворен за нови проекти',
    'about.photo.alt': 'Работното място на Боян по здрач — два монитора, графики и код.',
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
  },
} as const;
