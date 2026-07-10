/**
 * The site's single JS motion island (DESIGN.md §9).
 * - Hero entrance runs once per pageload.
 * - Scroll reveals via ScrollTrigger (cross-browser, replaces the old
 *   Chrome-only animation-timeline CSS).
 * - Lenis smooth scroll on fine-pointer desktop only.
 * - Everything no-ops under prefers-reduced-motion; an inline <head> guard
 *   plus a 3s timeout guarantee content is never stuck hidden if this
 *   module fails to load.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

const html = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const desktop = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 1024;

let motionDisabled = false;
let lenis: { destroy(): void } | undefined;

/** Hand visibility control from the pre-paint CSS guard to GSAP inline styles. */
function releaseGuard() {
  html.classList.remove('motion-pending');
}

/* ── hero entrance ─────────────────────────────────────────────────── */

function heroIntro() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) {
    releaseGuard();
    return;
  }

  const lines = hero.querySelectorAll('[data-hero-line]');
  const rises = hero.querySelectorAll('[data-hero-rise]');
  const video = hero.querySelector('[data-hero-video]');
  const strip = hero.querySelector('[data-hero-strip]');

  // Drop the CSS guard first so GSAP doesn't parse its translateY into a
  // stray pixel offset, then mirror the same state as inline styles — all
  // synchronous, so no un-hidden frame can paint in between.
  releaseGuard();
  gsap.set(lines, { yPercent: 110, y: 0 });
  gsap.set(rises, { autoAlpha: 0, y: 24 });
  if (video) gsap.set(video, { autoAlpha: 0, scale: 1.14 });
  if (strip) gsap.set(strip, { yPercent: 100, y: 0 });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  if (video) {
    // settle onto the CSS resting scale (1.06 overscan crop)
    tl.to(video, { autoAlpha: 1, scale: 1.06, duration: 1.6, ease: 'power2.out' }, 0);
  }
  tl.to(lines, { yPercent: 0, duration: 1.0, ease: 'power4.out', stagger: 0.14 }, 0.3);
  tl.to(rises, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 }, 0.7);
  if (strip) {
    tl.to(strip, { yPercent: 0, duration: 0.8 }, 1.0);
  }
}

/* ── scroll reveals ────────────────────────────────────────────────── */

/**
 * 'once'   — reveal plays the first time an element enters, then it stays.
 * 'replay' — scrolling back up re-hides elements (fast), so the reveal plays
 *            again on the way down. Boyan's pick (2026-07-10): replay.
 */
const REVEAL_MODE: 'once' | 'replay' = 'replay';
const replay = REVEAL_MODE === 'replay';
/** hides must be much quicker than reveals or scrolling up feels laggy */
const HIDE = { duration: 0.28, ease: 'power1.out', overwrite: true } as const;

/** Big editorial headings that get the masked line-by-line rise. */
const SPLIT_SELECTOR = 'main h1, main h2, .work__title-row h3';

function isSplitTarget(el: Element) {
  return el.matches(SPLIT_SELECTOR) && !el.closest('[data-hero]');
}

function splitHeadings() {
  const headings = gsap.utils
    .toArray<HTMLElement>(SPLIT_SELECTOR)
    .filter((h) => !h.closest('[data-hero]'));

  headings.forEach((h) => {
    let st: ScrollTrigger | undefined;
    SplitText.create(h, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true, // re-split on font load / resize
      onSplit(self) {
        st?.kill(); // resplit recreates the lines — retire the old trigger
        gsap.set(self.lines, { yPercent: 115 });
        st = ScrollTrigger.create({
          trigger: h,
          start: 'top 88%',
          once: !replay,
          onEnter: () =>
            gsap.to(self.lines, {
              yPercent: 0,
              duration: 0.9,
              ease: 'power4.out',
              stagger: 0.1,
              overwrite: true,
            }),
          onLeaveBack: replay
            ? () => gsap.to(self.lines, { yPercent: 115, ...HIDE })
            : undefined,
        });
      },
    });
  });
}

function scrollReveals() {
  const reveals = gsap.utils
    .toArray<HTMLElement>('.reveal')
    .filter((el) => !el.closest('[data-hero]'));

  // Containers that hold a split heading reveal their *other* children, so
  // the masked lines aren't double-animated by a moving parent.
  const plain: HTMLElement[] = [];
  for (const el of reveals) {
    const heading = Array.from(el.querySelectorAll('h1, h2, h3')).find(isSplitTarget);
    if (!heading) {
      plain.push(el);
      continue;
    }
    const others = Array.from(el.children).filter((c) => !c.contains(heading)) as HTMLElement[];
    if (others.length) {
      gsap.set(others, { autoAlpha: 0, y: 24 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: !replay,
        onEnter: () =>
          gsap.to(others, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            overwrite: true,
          }),
        onLeaveBack: replay ? () => gsap.to(others, { autoAlpha: 0, y: 24, ...HIDE }) : undefined,
      });
    }
  }

  gsap.set(plain, { autoAlpha: 0, y: 32 });
  ScrollTrigger.batch(plain, {
    start: 'top 88%',
    once: !replay,
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        overwrite: true,
      }),
    onLeaveBack: replay ? (batch) => gsap.to(batch, { autoAlpha: 0, y: 32, ...HIDE }) : undefined,
  });

  // media settles from a slight zoom
  gsap.utils.toArray<HTMLElement>('.reveal-scale').forEach((el) => {
    gsap.set(el, { scale: 1.06 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: !replay,
      onEnter: () => gsap.to(el, { scale: 1, duration: 1.4, ease: 'power2.out', overwrite: true }),
      onLeaveBack: replay ? () => gsap.to(el, { scale: 1.06, ...HIDE }) : undefined,
    });
  });

  // ghost folio numerals drift as the cards pass through the viewport
  if (desktop) {
    gsap.utils.toArray<HTMLElement>('.svc__ghost').forEach((el) => {
      gsap.to(el, {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }
}

/* ── desktop section moments ───────────────────────────────────────── */

function sectionMoments() {
  // 1. The blueprint sketches draw themselves stroke by stroke.
  gsap.utils.toArray<SVGSVGElement>('.svc__motif').forEach((svg) => {
    // .svc__dash keeps its CSS stroke-dasharray (and the hover march), so it
    // is faded in rather than DrawSVG'd — DrawSVG would overwrite the dashes.
    const strokes = svg.querySelectorAll(
      'rect[stroke], line, circle[stroke], .svc__accent-stroke, polyline'
    );
    const fades = svg.querySelectorAll('rect[fill], .svc__accent-fill, .svc__dash');
    gsap.set(strokes, { drawSVG: '0%' });
    gsap.set(fades, { autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: svg,
      // fire only once the card has finished arriving, so the drawing is
      // actually watchable instead of hidden behind the card's own fade-in
      start: 'top 72%',
      once: !replay,
      onEnter: () => {
        gsap.to(strokes, {
          drawSVG: '100%',
          duration: 1.4,
          ease: 'power2.inOut',
          stagger: 0.06,
          overwrite: true,
        });
        gsap.to(fades, {
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.06,
          delay: 0.9,
          overwrite: true,
        });
      },
      onLeaveBack: replay
        ? () => {
            gsap.to(strokes, { drawSVG: '0%', ...HIDE });
            gsap.to(fades, { autoAlpha: 0, ...HIDE });
          }
        : undefined,
    });
  });

  // (No parallax on the Selected Work frame — Boyan wants it locked in step
  //  with the text beside it; drift versions were tried and cut, 2026-07-10.)

  // 2. Case-study screenshots drift inside their browser frames; the slight
  //     overscan keeps edges covered. (The frame itself is a .reveal whose
  //     enter tween owns `y`, so the parallax lives on the image instead.)
  gsap.utils.toArray<HTMLElement>('.case-frame__img').forEach((img) => {
    gsap.set(img, { scale: 1.08 });
    gsap.fromTo(
      img,
      { y: 16 },
      {
        y: -16,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.case-frame') ?? img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  });

  // (The About photo intentionally has no special treatment — it fades in
  //  with its sidebar. Wipe/zoom versions were tried and cut, 2026-07-10.)
}

/* ── magnetic buttons (desktop only) ───────────────────────────────── */

function magneticButtons() {
  document.querySelectorAll<HTMLElement>('.btn').forEach((btn) => {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });
    btn.addEventListener('mousemove', (e) => {
      if (motionDisabled) return;
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      // barely-there pull — Boyan found the stronger version distracting
      xTo(dx * 5);
      yTo(dy * 3);
    });
    btn.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* ── smooth scroll (desktop only) ──────────────────────────────────── */

async function initSmoothScroll() {
  const { default: Lenis } = await import('lenis');
  if (motionDisabled) return;
  const instance = new Lenis({
    duration: 1.1,
    anchors: true, // in-page # links glide instead of jumping
    autoRaf: true, // Lenis manages (and stops) its own rAF loop on destroy()
  });
  instance.on('scroll', ScrollTrigger.update);
  lenis = instance;
}

/* ── boot ──────────────────────────────────────────────────────────── */

/** Live teardown: if the user enables Reduce Motion mid-session, stop
 *  everything and restore the static page. */
function neutralizeMotion() {
  motionDisabled = true;
  ScrollTrigger.getAll().forEach((st) => st.kill());
  gsap.killTweensOf('*');
  gsap.set(
    [
      '.reveal',
      '.reveal-scale',
      '.split-line',
      '.svc__motif rect',
      '.svc__motif line',
      '.svc__motif circle',
      '.svc__motif path',
      '.svc__motif polyline',
      '.case-frame__img',
      '.btn',
      '[data-hero-line]',
      '[data-hero-rise]',
      '[data-hero-video]',
      '[data-hero-strip]',
    ],
    { clearProps: 'all' }
  );
  lenis?.destroy();
  lenis = undefined;
  releaseGuard();
}

if (reduced) {
  releaseGuard();
} else {
  heroIntro();
  scrollReveals();
  // Split immediately so above-the-fold headings never paint un-hidden and
  // then vanish (fonts.ready lands too late on cold caches); autoSplit
  // re-measures the line boxes itself once the real faces arrive.
  splitHeadings();
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  if (desktop) {
    sectionMoments();
    magneticButtons();
    initSmoothScroll();
  }
  window
    .matchMedia('(prefers-reduced-motion: reduce)')
    .addEventListener('change', (e) => e.matches && neutralizeMotion());
}
