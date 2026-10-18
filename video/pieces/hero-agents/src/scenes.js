// =====================================================================
//  SCENES — the chat, the construct, the reply. World coords are 1920×1080 on 16:9; on 9:16 (P9) they are
//  1080×1920 with the site across the middle and the agents stacked above and below it.
//  In the construct each agent gets a solo shot (plan → code → design → QA); the camera glides between them.
//  The agents build "Pawly", a pet shop, by literally throwing its parts in: the coder throws the prices
//  (one with a typo), the designer paints the page and flings in the pets, QA catches the typo.
// =====================================================================
const P9 = PORTRAIT;
const SITE = P9 ? [200, 420, 680, 1133] : [460, 230, 1000, 600];   // 9:16: the phone layout of the shop (600×1000 units), centred          // the site: x, y, w, h (world)
const ROLES = ['plan', 'code', 'design', 'qa'];
const AR = P9 ? 80 : 70;                                                  // agent radius
const ROW = P9 ? [[330, 760], [750, 760], [330, 1160], [750, 1160]] : [[420, 600], [780, 600], [1140, 600], [1500, 600]];   // the arrival line-up, well apart
const STATION = P9 ? [[105, 560], [975, 560], [105, 1390], [975, 1390]] : [[350, 480], [350, 730], [1570, 480], [1570, 730]];   // around the site while it is built
const DESIGN_SPOT = P9 ? [180, 1780] : [1560, 450];                      // where the designer throws the pets from
const PLAN_RISE = P9 ? [110, 380] : [350, 360];                          // the planner rises for the payoff, so its bubble clears the site
const IDEA_R = P9 ? [220, 380, -160, 40] : [300, 250, -165, 45];          // idea cards around the planner: rx, ry, first angle, step
// the roller alternates direction row by row; the phone layout has 6 rows, so its sweeps are quicker (all done by CU.throw)
const PAINT_DIR = SITE_ROWS.map((_, k) => (k % 2 ? 1 : -1)), PAINT_STEP = P9 ? 0.22 : 0.3, PAINT_D = P9 ? 0.2 : 0.28, PAINT_T = (k) => CU.design + 0.05 + k * PAINT_STEP;
const BUILD_T = (i) => CU.code + 0.25 + i * 0.18;
const FLIGHT = 0.45, PRICE_T = (k) => CU.code + 0.9 + k * 0.2, PET_T = (k) => CU.throw + k * 0.15;
const CODE_HAND = [STATION[1][0] + 60, STATION[1][1] - 70], DESIGN_HAND = [DESIGN_SPOT[0] - 50, DESIGN_SPOT[1] - 80];
const ORDERS = [[CU.ship + 0.55, 0], [CU.ship + 0.95, 3], [CU.ship + 1.35, 1]];   // [time, product]: the first orders
const pushOut = (k0, k1) => popS(k0) * (1 - ev(k1 - 0.15, 0.15));

// ---------------------------------------------------------------- era 0: the chat
function sceneChat() {
  const n = Math.round(PROMPT.length * EZ.io(seg(TT, CU.typeA, CU.typeB)));
  const melting = TT >= CU.zoom + 0.25;
  const L = mxChat({ text: melting ? '​' : PROMPT.slice(0, n), typing: TT > CU.typeA && TT < CU.typeB, cursor: !melting, press: TT >= CU.send ? Math.exp(-(TT - CU.send) * 10) : 0 });
  if (melting) {   // the typed letters turn into glyphs and fall: the prompt becomes the rain
    ctx.save(); let x = L.tx;
    for (let i = 0; i < PROMPT.length; i++) {
      ctx.font = `400 ${36 * MX_K}px ${MX_SANS}`; const ch = PROMPT[i], w = ctx.measureText(ch).width, u = Math.max(0, TT - (CU.zoom + 0.25 + i * 0.02));
      if (ch !== ' ') {
        const g = u > 0.08 ? MX_GLYPHS[RNG('melt', i, Math.floor(TT * 12)).i(0, MX_GLYPHS.length - 1)] : ch;
        ctx.fillStyle = u > 0.08 ? MX.oliveHi : MX.ink; ctx.font = `${u > 0.08 ? 600 : 400} ${36 * MX_K}px ${u > 0.08 ? MONO : MX_SANS}`;
        ctx.fillText(g, x, L.ty + u * u * 260);
      }
      x += w;
    }
    ctx.restore();
    mxRain({ alpha: 0.6 * ev(CU.zoom + 0.3, 0.45) });
  }
}

// ---------------------------------------------------------------- era 1: the construct
function paintEdge(k) {   // the paint edge of row k (world) and its progress
  const [bx, by, bw, bh] = rowBand(k, ...SITE), u = ev(PAINT_T(k), PAINT_D);
  return { x: PAINT_DIR[k] > 0 ? bx + bw * u : bx + bw * (1 - u), y: by + bh / 2, u };
}
function designerPos() {   // rides the paint edge row by row, then hops to its throwing spot
  const last = SITE_ROWS.length - 1, endT = PAINT_T(last) + PAINT_D;
  if (TT >= endT) { const e = paintEdge(last), v = EZ.io(seg(TT, endT, CU.throw)); return [lerp(e.x, DESIGN_SPOT[0], v), lerp(e.y - 40, DESIGN_SPOT[1], v)]; }
  for (let k = last; k >= 0; k--) {
    if (TT < PAINT_T(k)) continue;
    const e = paintEdge(k); if (TT < PAINT_T(k) + PAINT_D) return [e.x, e.y - 40];
    const n = paintEdge(k + 1), v = EZ.io(seg(TT, PAINT_T(k) + PAINT_D, PAINT_T(k + 1)));
    return [lerp(e.x, n.x, v), lerp(e.y, n.y, v) - 40];
  }
  const e = paintEdge(0); return [e.x, e.y - 40];
}
function qaSpot() { const [px, py] = priceSlot(3, SITE[0], SITE[1], SITE[2]); return P9 ? [px + 385, py - 40] : [px + 300, py - 70]; }
function agentPos(i) {
  const keys = [[0, ROW[i]], [6.0 + i * 0.08, STATION[i]]];
  if (i === 3) keys.push([CU.qa - 0.1, qaSpot()], [CU.ship - 0.3, STATION[3]]);
  if (i === 0) keys.push([CU.ship - 0.3, PLAN_RISE]);
  let x = springTrack(keys.map(([t, p]) => [t, p[0]])), y = springTrack(keys.map(([t, p]) => [t, p[1]]));
  if (i === 2 && TT >= CU.design - 0.35 && TT < CU.qa + 0.6) {   // the designer leaves its station, paints, throws, springs back
    const d = designerPos(), into = EZ.io(seg(TT, CU.design - 0.35, PAINT_T(0))), back = EZ.io(seg(TT, CU.qa, CU.qa + 0.6));
    x = lerp(lerp(x, d[0], into), STATION[2][0], back); y = lerp(lerp(y, d[1], into), STATION[2][1], back);
  }
  const land = CU.land + i * 0.2, drop = TT < land ? -900 : springMove(land, -900, 0, SPRING.playful);
  const hop = TT >= CU.ship ? -Math.abs(Math.sin((TT - CU.ship - i * 0.12) * TAU * 1.2)) * 46 * Math.exp(-(TT - CU.ship) * 0.9) : 0;
  return [x, y + drop + hop];
}
function squashOf(i) {   // stretched while falling, a squash on landing that rings out
  const land = CU.land + i * 0.2 + 0.18, d = TT - land;
  if (TT < CU.land + i * 0.2) return 1; if (d < 0) return 1.12;
  return 1 - 0.2 * Math.exp(-d * 7) * Math.cos(d * 26);
}
function rainClock() { return TT < CU.hush ? TT : TT < CU.ship ? CU.hush : TT - (CU.ship - CU.hush); }
// a thrown item in flight: from o to d along an arc, spinning, growing into its landing size
function flight(o, d, t0) { const u = seg(TT, t0, t0 + FLIGHT); return { u, x: lerp(o[0], d[0], u), y: lerp(o[1], d[1], u) - 260 * 4 * u * (1 - u), rot: (1 - u) * -TAU * 0.9, k: lerp(0.55, 1, u) }; }
function siteState(TTn = TT) {
  const parts = mxSiteParts(...SITE), n = ORDERS.filter(([t]) => TTn >= t);
  return {
    built: parts.map((_, i) => clamp((TTn - BUILD_T(i)) / 0.4)),
    row: SITE_ROWS.map((_, k) => clamp((TTn - PAINT_T(k)) / PAINT_D)), rowDir: PAINT_DIR,
    pet: PETS.map((_, k) => TTn - (PET_T(k) + FLIGHT)), price: PRODUCTS.map((_, k) => TTn - (PRICE_T(k) + FLIGHT)),
    priceBug: TTn < CU.fixed ? 3 : null, bugShow: TTn >= CU.bug && TTn < CU.fixed,
    lit: TTn >= CU.ship ? 1 - 0.35 * clamp((TTn - CU.ship - 0.5) / 1.2) : 0, sheen: seg(TTn, CU.sheen, CU.sheen + 1.1), live: popS(CU.sheen + 0.2),
    cart: n.length, cartAge: n.length ? TTn - n[n.length - 1][0] : 9,
    added: PRODUCTS.map((_, k) => { const o = ORDERS.find(([, j]) => j === k); return o && TTn >= o[0] ? TTn - o[0] : -1; }),
  };
}
const BUBBLES = [
  [CU.gotIt, CU.fly, 0, 'Got it, Boyan!'],                 // closes before the idea cards fly through it
  [CU.code + 0.3, 7.3, 1, 'Writing the code…'],
  [7.4, 8.45, 1, 'Prices, incoming!'],
  [CU.design + 0.2, 9.4, 2, 'Hmm… cuter?', { think: true }],
  [CU.throw - 0.05, 10.6, 2, 'Catch!'],
  [CU.bug, CU.fixed, 3, '€120 for a bone?!'],
  [CU.fixed + 0.05, CU.hush, 3, 'Fixed: €12 ✓'],
  [CU.ship + 0.25, 14.3, 0, 'Shipped, Boyan.'],
];
const IDEAS = ['cozy + playful', 'cute pets', 'prices', 'quick cart'];
function sceneConstruct() {
  fillAll(MX.ground);
  const shipT = TT >= CU.ship ? 1 - ev(CU.ship + 0.25, 0.9) : 0;
  mxRain({ time: rainClock(), alpha: 0.45 + 0.4 * shipT, tint: shipT });
  // the finished site sits on a soft warm glow
  if (TT >= CU.ship) { const gx = SITE[0] + SITE[2] / 2, gy = SITE[1] + SITE[3] + 30, g = ctx.createRadialGradient(gx, gy, 20, gx, gy, 700); g.addColorStop(0, `rgba(255,214,150,${0.16 * ev(CU.ship, 0.6)})`); g.addColorStop(1, 'rgba(255,214,150,0)'); ctx.save(); ctx.fillStyle = g; ctx.fillRect(gx - 800, gy - 100, 1600, 220); ctx.restore(); }
  const parts = mxSiteParts(...SITE), pos = ROLES.map((_, i) => agentPos(i)), [, fx, fy] = camFocus();
  // the site: its frame pops in as the ideas land, walls draw on (code), the page sweeps in (design), items land
  const frameK = popS(CU.frame);
  if (frameK > 0) {
    ctx.save(); const cx = SITE[0] + SITE[2] / 2, cy = SITE[1] + SITE[3] / 2;
    ctx.translate(cx, cy); ctx.scale(frameK, frameK); ctx.translate(-cx, -cy);
    mxSite(...SITE, siteState());
    ctx.restore();
  }
  // code streams: glyphs arc from the coder's raised hands into each wall as it is drawn
  const [cx0, cy0] = pos[1];
  parts.forEach(([px, py, pw, ph], i) => {
    const t0 = BUILD_T(i); if (TT < t0 - 0.25 || TT > t0 + 0.45) return;
    const a = ev(t0 - 0.25, 0.1) * (1 - ev(t0 + 0.3, 0.15)), sx = cx0 + AR * 0.9, sy = cy0 - AR * 0.8, ex = px + pw / 2, ey = py + ph / 2, mx = (sx + ex) / 2, my = Math.min(sy, ey) - 180;
    ctx.save(); ctx.font = `700 24px ${MONO}`; ctx.textAlign = 'center';
    for (let k = 0; k < 12; k++) {
      const u = mod(k / 12 + TT * 2.4, 1), q = 1 - u, x = q * q * sx + 2 * q * u * mx + u * u * ex, y = q * q * sy + 2 * q * u * my + u * u * ey;
      ctx.globalAlpha = a * Math.sin(u * Math.PI); ctx.fillStyle = k % 3 ? AG.code.c : AG.code.hi;
      ctx.fillText(MX_GLYPHS[RNG('pour', i, k, Math.floor(TT * 12)).i(0, MX_GLYPHS.length - 1)], x, y);
    }
    ctx.restore();
  });
  // thrown items in flight: price tags from the coder, pets from the designer (they land in mxSite)
  const s = SITE[2] / 1000;
  PRODUCTS.forEach((_, k) => {
    const t0 = PRICE_T(k); if (TT < t0 || TT >= t0 + FLIGHT) return;
    const [px, py] = priceSlot(k, ...SITE.slice(0, 3)), f = flight(CODE_HAND, [px, py], t0);
    ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.rot * 0.4); ctx.scale(f.k * 1.4, f.k * 1.4); mxPriceTag(k === 3 ? PRICE_TYPO[k] : PRODUCTS[k][1], 0, 0, s, false); ctx.restore();
  });
  PETS.forEach((kind, k) => {
    const t0 = PET_T(k); if (TT < t0 || TT >= t0 + FLIGHT) return;
    const [px, py, r] = petSlot(k, ...SITE.slice(0, 3)), f = flight(DESIGN_HAND, [px, py], t0);
    ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.rot); ctx.translate(-f.x, -f.y); mxPet(kind, f.x, f.y, r * f.k); ctx.restore();
  });
  // idea cards: pop out around the planner, then fly into the middle and become the site's frame
  IDEAS.forEach((str, i) => {
    const k = popS(CU.ideas + i * 0.18), fly = EZ.io(seg(TT, CU.fly + i * 0.06, CU.frame + 0.05 + i * 0.06)); if (k <= 0 || fly >= 1) return;
    const a = (IDEA_R[2] + i * IDEA_R[3]) * DEG, hx = ROW[0][0] + Math.cos(a) * IDEA_R[0], hy = ROW[0][1] - 30 + Math.sin(a) * IDEA_R[1];
    const x = lerp(hx, SITE[0] + SITE[2] / 2, fly), y = lerp(hy, SITE[1] + SITE[3] / 2, fly), s2 = k * (1 - fly * 0.8);
    ctx.save(); ctx.translate(x, y); ctx.rotate(RNG('card', i).n(0.1) * (1 - fly)); ctx.scale(s2, s2);
    ctx.font = `600 30px ${MX_SANS}`; const w = ctx.measureText(str).width + 52;
    ctx.fillStyle = MX.ink; mxRR(-w / 2, -34, w, 68, 14); ctx.fill(); ctx.strokeStyle = AG.plan.c; ctx.lineWidth = 4; ctx.stroke();
    mxText(str, 0, 2, 30, MX.ground, { align: 'center', base: 'middle', weight: 600 });
    ctx.restore();
  });
  // the agents: each looks at whatever the camera is on, unless it is the one acting
  ROLES.forEach((role, i) => {
    if (TT < CU.land + i * 0.2) return;
    const [x, y] = pos[i], talk = BUBBLES.some(([t0, t1, j, , o]) => j === i && !o && TT >= t0 && TT < t1 - 0.1);
    const d = Math.hypot(fx - x, fy - y) || 1, look = d < 60 ? [0, 0] : [(fx - x) / d, (fy - y) / d];
    let mood = 'calm', arms, prop = 0;
    const ship = TT >= CU.ship, wave = Math.sin(TT * TAU * 2.2 + i) * 0.35;
    const throwArm = (ts) => { const a = ts.map((t) => seg(TT, t - 0.18, t + 0.08)).find((u) => u > 0 && u < 1); return a == null ? null : lerp(3.0, 1.2, EZ.o2(a)); };
    if (role === 'plan') { mood = TT >= CU.bulb && TT < CU.gotIt ? 'wow' : talk ? 'happy' : 'calm'; prop = ev(CU.bulb, 0.15); if (TT >= CU.ideas && TT < CU.fly + 0.3) arms = [2.3 + wave * 0.4, 2.3 - wave * 0.4]; }
    if (role === 'code' && TT >= CU.code && TT < CU.design) { mood = 'focus'; arms = [2.0 + Math.sin(TT * 30) * 0.12, 2.0 + Math.cos(TT * 30) * 0.12]; const t = throwArm(PRODUCTS.map((_, k) => PRICE_T(k))); if (t != null) { arms = [0.6, t]; mood = 'happy'; } }
    if (role === 'design' && TT >= CU.design && TT < CU.qa) { mood = TT >= CU.throw - 0.1 ? 'happy' : 'focus'; arms = [0.5, 2.5]; prop = 0.5 + 0.5 * Math.sin(TT * TAU * 3); const t = throwArm(PETS.map((_, k) => PET_T(k))); if (t != null) arms = [t, 0.4]; }
    if (role === 'qa' && TT >= CU.qa && TT < CU.ship) { mood = TT >= CU.bug && TT < CU.bug + 0.35 ? 'wow' : TT >= CU.fixed ? 'happy' : 'focus'; if (TT >= CU.fixed - 0.25 && TT < CU.fixed + 0.3) arms = [1.7, 0.45]; }
    if (ship) { mood = 'happy'; arms = [2.5 + wave, 2.5 - wave]; }
    mxAgent(x, y, AR, { role, key: role, hero: role === 'plan', mood, talk, look: ship ? [0, 0] : look, arms, prop: role === 'plan' ? (ship ? 1 : prop) : prop, squash: squashOf(i), tag: TT >= CU.land + i * 0.2 + 0.3 && TT < CU.plan + 0.3 ? ev(CU.land + i * 0.2 + 0.3, 0.2) * (1 - ev(CU.plan, 0.3)) : 0 });
  });
  // speech bubbles, at screen size, outlined in the speaker's colour
  BUBBLES.forEach(([t0, t1, i, str, o = {}]) => {
    const k = TT >= t0 && TT < t1 ? pushOut(t0, t1) : 0; if (k <= 0) return;
    const [x, y] = pos[i], [ax, ay] = toScreen(x, y - AR * (ROLES[i] === 'plan' ? 1.75 : 1.15));
    DEFER.push(() => mxBubble(str, ax, ay, k, { ...o, side: ax > W * 0.62 ? -1 : 1, color: AG[ROLES[i]].c, size: P9 ? 46 : undefined }));
  });
  DEFER.push(() => mxVignette(0.75 - 0.3 * ev(CU.ship, 0.6)));
}

// ---------------------------------------------------------------- era 2: the reply, then the chat empties (= frame 0)
function sceneReply() {
  const clr = TT < CU.clear ? 0 : springMove(CU.clear, 0, 1, SPRING.snappy);
  mxChat({ boxY: lerp(LY(P9 ? 0.76 : 0.86), LY(0.52), clr), greetAl: clr, greet: clr > 0.02 });
  if (clr >= 0.999) return;
  ctx.save(); ctx.globalAlpha *= 1 - clr; ctx.translate(0, -clr * 500);
  // the site card: exactly where the pull-back left the site (the last construct camera), finished
  const [, z, [px, py]] = CAM1[CAM1.length - 1], card = [W / 2 + z * (SITE[0] - px), H / 2 + z * (SITE[1] - py), SITE[2] * z, SITE[3] * z];
  // 9:16: the prompt, the avatars and the reply stack above the card (bigger, for a phone)
  const L = P9 ? { ps: 46, pr: W - 60, py: card[1] - 340, ph: 90, pp: 76, pt: 38, pb: 61, prr: 28, ax: 90, ad: 44, ay: card[1] - 175, ar: 28, lx: 66, ly: card[1] - 70, ls: 50 }
    : { ps: 34, pr: 1460, py: 110, ph: 70, pp: 56, pt: 28, pb: 47, prr: 22, ax: 470, ad: 34, ay: 330, ar: 22, lx: 620, ly: 344, ls: 38 };
  ctx.font = `400 ${L.ps}px ${MX_SANS}`; const mw = ctx.measureText(PROMPT).width + L.pp;
  ctx.fillStyle = MX.panel; mxRR(L.pr - mw, L.py, mw, L.ph, L.prr); ctx.fill();
  mxText(PROMPT, L.pr - mw + L.pt, L.py + L.pb, L.ps, MX.ink, { weight: 400 });
  ROLES.forEach((role, k) => mxAgent(L.ax + k * L.ad, L.ay, L.ar, { role, key: 'av' + role, mood: 'happy', arms: [0.4, 0.4] }));
  const line = 'Done, Boyan. pawly.shop is live.';
  mxText(line, L.lx, L.ly, L.ls, MX.ink, { weight: 500, count: line.length * ev(CU.reply, 0.6) });
  const st = siteState(CU.pull); st.lit = 0.65 * (1 - ev(CU.reply, 0.8)); st.sheen = 0; st.live = 1; st.fill = MX.ground2;
  mxSite(...card, st);
  ctx.restore();
}
