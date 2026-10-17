  // =====================================================================
  //  SCORE BODY — composed in code, every sound on the frame its picture appears (fr() snaps to the first frame
  //  that shows the event: the renderer draws frame F at TT = F / 24). D Dorian, 120 BPM, the beat grid from 0.
  //  Arc: a quiet chat → a groove that thickens agent by agent → the QA peak and a riser → 0.5s of silence
  //  → the loudest hit on "Shipped" → a warm hold → it decays back into the empty chat (the loop).
  //  Each agent has its own voice: plan bright chirps, code square ticks, design soft swishes, QA low beeps.
  // =====================================================================
  const T = TIMELINE, cu = T.cues, fr = (t) => Math.ceil(t * FPS - 1e-6) / FPS;
  const beats = (t0, t1, step) => { const a = []; for (let t = Math.ceil(t0 / step - 1e-6) * step; t < t1 - 1e-6; t += step) a.push(+t.toFixed(4)); return a; };
  const VOICE = { plan: [nz('A5'), 1.0], code: [nz('D5'), 0.8], design: [nz('Fs5'), 0.9], qa: [nz('A4'), 0.9] };   // pitch, brightness

  // ---------------------------------------------------------------- MUSIC
  to = 'm';
  // 1 the chat: a low, quiet bed
  pad(0.0, T_DIVE + 0.05, ['D3', 'A3', 'F4'], 0.012, { cut: 700, att: 0.8, rel: 0.4, type: 'triangle' });
  riser(cu.zoom, T_DIVE - 0.06, 0.022);                                                      // enter → the dive
  // 2 the build: one layer per agent
  const H8 = (t0, t1, v) => beats(t0, t1, E8).forEach((t, i) => noiseHit(t, 0.04, 'highpass', 8000, 0.8, v * (i % 2 ? 0.6 : 1), 0.25));
  const KICK = (t0, t1, v) => beats(t0, t1, BEAT).forEach((t) => { sub(t, v); });
  const BASS = (t0, t1, notes, v, step = BEAT) => beats(t0, t1, step).forEach((t, i) => bass(t, nz(notes[Math.floor((t - t0) / (BEAT * 4)) % notes.length]), v));
  const ARP = (t0, t1, notes, v, step = E16) => beats(t0, t1, step).forEach((t, i) => pluck(t, nz(notes[i % notes.length]), v, ((i % 4) - 1.5) * 0.25, 0.18, 4200, t > cu.hush - BEAT ? 0 : 0.15));
  pad(T_DIVE, cu.code, ['D3', 'A3', 'C4', 'F4'], 0.022, { cut: 900, att: 0.3, rel: 0.1 });       // arrival + plan: Dm7
  H8(T_DIVE, cu.hush, 0.05);                                                                  // hats from the cut to the hush
  KICK(cu.plan, cu.hush - BEAT, 0.2);                                                         // the last kick rings out before the hush
  BASS(cu.plan, cu.code, ['D2'], 0.16);
  pad(cu.code, cu.design, ['D3', 'A3', 'C4', 'E4'], 0.024, { cut: 1100, att: 0.1, rel: 0.1 }); // code: Dm9
  BASS(cu.code, cu.design, ['D2', 'D2'], 0.17, E8);
  ARP(cu.code, cu.design, ['D4', 'F4', 'A4', 'C5'], 0.035, E8);
  pad(cu.design, cu.qa, ['Bb2', 'F3', 'D4', 'A4'], 0.026, { cut: 1300, att: 0.1, rel: 0.1 });  // design: Bbmaj7
  BASS(cu.design, cu.qa, ['Bb1', 'C2'], 0.17, E8);
  ARP(cu.design, cu.qa, ['F4', 'A4', 'D5', 'A4'], 0.04, E8);
  // 3 the QA peak: busiest (16th arps, a clap on 2 and 4), a riser into the silence
  pad(cu.qa, cu.hush, ['C3', 'G3', 'E4', 'A4'], 0.026, { cut: 1500, att: 0.1, rel: 0.05, send: 0 });   // dry: no reverb into the hush     // C6
  BASS(cu.qa, cu.hush - E8, ['C2'], 0.17, E8);
  ARP(cu.qa, cu.hush, ['E4', 'G4', 'C5', 'E5'], 0.028, E16);
  beats(cu.qa, cu.hush, BEAT).filter((t) => (t / BEAT) % 2 === 1).forEach((t) => noiseHit(t, 0.12, 'bandpass', 1800, 0.9, 0.06, 0, 0));   // claps on 2 and 4, none in the hush
  riser(cu.hush - 1.0, cu.hush - 0.2, 0.018);
  // 4 the hush (cu.hush → cu.ship): nothing. 5 the payoff: a stab + sub, then a flat warm D major hold
  ['D3', 'A3', 'D4', 'Fs4', 'A4', 'D5'].forEach((n, i) => pluck(cu.ship + i * 0.004, nz(n), 0.22, (i - 2.5) * 0.15, 0.45, 5200, 0.5));
  sub(cu.ship, 0.95);
  pad(cu.ship, T_BACK + 0.4, ['D3', 'A3', 'Fs4', 'A4'], 0.075, { cut: 2200, att: 0.02, rel: 0.6, send: 0.5 });
  BASS(cu.ship, T_BACK, ['D2', 'D2', 'G2', 'A2'], 0.22, BEAT);
  H8(cu.ship + BEAT, T_BACK - 0.5, 0.045);
  // 6 goodbye: the hold decays into the chat, the chat bed returns before the loop point
  pad(T_BACK, DURATION + 0.3, ['D3', 'A3', 'Fs4'], 0.016, { cut: 800, att: 0.2, rel: 1.2, type: 'triangle' });

  // ---------------------------------------------------------------- SOUND EFFECTS, each on its frame
  to = 's';
  // typing: one key click on every frame a letter appears (two letters in a frame = one firmer click); spaces thump
  { let prev = 0;
    for (let f = Math.round(cu.typeA * FPS); f <= Math.round(cu.typeB * FPS) + 1; f++) {
      const t = f / FPS, n = Math.round(PROMPT.length * EZ.io(seg(t, cu.typeA, cu.typeB)));
      if (n > prev) { const sp = PROMPT[n - 1] === ' '; noiseHit(t, sp ? 0.05 : 0.025, sp ? 'lowpass' : 'highpass', sp ? 900 : 3500 + (n % 3) * 600, 1.2, (sp ? 0.09 : 0.07) * (n - prev > 1 ? 1.3 : 1), ((n % 5) - 2) * 0.1); prev = n; }
    } }
  blip(fr(cu.send), nz('D5'), nz('A5'), 0.08, 0.07); noiseHit(fr(cu.send), 0.03, 'highpass', 2500, 1, 0.08);   // enter
  for (let i = 0; i < PROMPT.length; i++) if (PROMPT[i] !== ' ' && i % 3 === 0) blip(fr(cu.zoom + 0.25 + i * 0.02 + 0.08), nz('A5') * (1 + i * 0.03), nz('D4'), 0.12, 0.012, -0.4 + i * 0.04);   // letters melt
  noiseHit(T_DIVE, 0.6, 'lowpass', 3000, 0.7, 0.07, 0, 0.3, 200); sub(T_DIVE, 0.14);            // the cut into the void
  // the four agents land: a plop each, in its own pitch (contact = the spring's first touch of the ground)
  { let c = 0; while (springEase(c, SPRING.playful.k, SPRING.playful.d) < 1 && c < 1) c += 1 / 480;
    ROLES.forEach((r, i) => { const t = fr(cu.land + i * 0.2 + c); blip(t, VOICE[r][0] * 0.5, VOICE[r][0] * 0.25, 0.14, 0.12, -0.6 + i * 0.4); noiseHit(t, 0.05, 'lowpass', 600, 0.8, 0.07, -0.6 + i * 0.4); }); }
  // speech: a pop when a bubble appears, a few chirps in the speaker's voice while its mouth moves
  BUBBLES.forEach(([t0, t1, i, str, o]) => {
    const [f, b] = VOICE[ROLES[i]], ts = fr(t0), pan = ROLES[i] === 'plan' || ROLES[i] === 'code' ? -0.35 : 0.35;
    blip(ts, f * 0.8, f * 1.25, 0.05, 0.05, pan);
    if (o) return;   // thoughts are silent
    const n = Math.min(6, Math.floor((t1 - t0 - 0.25) / (TAU / 22 * 0.5)));
    for (let k = 1; k <= n; k++) { const tk = fr(t0 + k * (Math.PI / 22)), R = RNG('chirp', i, k); blip(tk, f * R.r(0.85, 1.2) * b, f * R.r(0.7, 1.3) * b, 0.06, 0.022, pan); }
  });
  chime(fr(cu.bulb), [nz('A5'), nz('E6')], 0.07, -0.4);                                       // the bulb lights
  IDEAS.forEach((_, i) => pluck(fr(cu.ideas + i * 0.18), nz(['D5', 'F5', 'A5', 'C6'][i]), 0.09, -0.5 + i * 0.25, 0.25, 6000, 0.3));   // idea cards pop
  sweep(cu.fly, fr(cu.frame) - 0.05, 0.05, 900, 3200, -0.2);                                             // the cards fly together
  sub(fr(cu.frame), 0.25); pluck(fr(cu.frame), nz('D4'), 0.08, 0, 0.4, 2400, 0.4);            // the frame pops in
  // code: a square tick as each wall starts to draw, then the price tags: a whoosh out, a tok on landing
  for (let i = 0; i < SITE_PARTS.length; i++) blip(fr(BUILD_T(i)), 2400 + i * 120, 1800, 0.03, 0.035, -0.3 + i * 0.08);
  PRODUCTS.forEach((_, k) => { const t0 = fr(PRICE_T(k)), t1 = fr(PRICE_T(k) + FLIGHT); sweep(t0, t1 - 0.05, 0.03, 700, 2600, -0.4 + k * 0.2); pluck(t1, nz(['A4', 'C5', 'D5', 'E5'][k]), 0.1, -0.3 + k * 0.25, 0.2, 5000, 0.2); noiseHit(t1, 0.03, 'bandpass', 1500, 2, 0.06); });
  // design: a roller swish across each row (panned the way it paints), then the pets: whoosh, boing on landing
  // (every whoosh stops 50ms before its landing, so each impact is its own clean attack on its frame)
  SITE_ROWS.forEach((_, k) => { const t0 = fr(PAINT_T(k)), d = PAINT_DIR[k]; noiseHit(t0, PAINT_D, 'bandpass', d > 0 ? 700 : 2400, 1.4, 0.05, d * -0.5, 0.2, d > 0 ? 2400 : 700); });
  PETS.forEach((_, k) => { const t0 = fr(PET_T(k)), t1 = fr(PET_T(k) + FLIGHT); sweep(t0, t1 - 0.05, 0.035, 600, 2200, 0.5 - k * 0.15); blip(t1, nz('D4') * (1 + k * 0.12), nz('A5') * (1 + k * 0.12), 0.1, 0.07, 0.3 - k * 0.15); noiseHit(t1, 0.03, 'lowpass', 900, 0.8, 0.05, 0.3 - k * 0.15); });   // one boing per pet: they land 0.15s apart
  // QA: the glide in, the error (two low beeps), the tap and the fix
  sweep(cu.qa, cu.qa + 0.4, 0.025, 2000, 500, 0.3);
  [0, 0.14].forEach((d, i) => { const o2 = fr(cu.bug + d); blip(o2, nz('A3') * (i ? 0.84 : 1), nz('A3') * (i ? 0.8 : 0.95), 0.11, 0.09, 0.3); });
  noiseHit(fr(cu.fixed), 0.02, 'highpass', 4000, 1, 0.08, 0.3); chime(fr(cu.fixed), [nz('D6'), nz('A6')], 0.05, 0.3);
  // the payoff: a crash with the stab (the loudest moment), the sheen, the LIVE badge, three orders
  noiseHit(cu.ship, 1.6, 'highpass', 3500, 0.6, 0.16, 0, 0.5, 9000);
  sweep(cu.sheen, cu.sheen + 1.1, 0.02, 3000, 9000, 0);
  blip(fr(cu.sheen + 0.2), nz('A5'), nz('E6'), 0.06, 0.04, 0.5);
  ORDERS.forEach(([t], k) => { const tt = fr(t); chime(tt, [nz('E6') * (1 + k * 0.06), nz('A6') * (1 + k * 0.06)], 0.03, -0.2 + k * 0.2); noiseHit(tt + 0.06, 0.08, 'bandpass', 6000, 3, 0.04); });
  // the pull back and the reply
  sweep(cu.pull, T_BACK, 0.025, 2600, 500, 0);
  chime(fr(T_BACK), [nz('D5'), nz('Fs5'), nz('A5')], 0.04, 0);
  for (let k = 0; k < 8; k++) noiseHit(fr(cu.reply + k * 0.075), 0.02, 'highpass', 4200, 1.2, 0.025, 0.1);   // the reply types out
  sweep(cu.clear, cu.clear + 0.45, 0.025, 600, 2400, 0);                                      // the chat clears
