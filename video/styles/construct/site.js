// =====================================================================
//  styles/construct/site.js — "Pawly", a pet shop the agents build (a light, playful site: it pops in the dark void).
//  Design units: the window is 1000 × 600 (scaled by w / 1000), or 600 × 1000 on 9:16 (PW_MOBILE). Eight parts:
//    0 nav · 1 hero copy · 2 hero picture · 3 category chips · 4–7 product cards
//  Thrown items (drawn here once landed, by the scene while flying):
//    pets  0 hero dog · 1 cat · 2 bunny · 3 goldfish · 4 puppy      prices 0–3 (one of them thrown with a typo)
//  st = { built[i] 0..1 (wireframe), row[k] 0..1 + rowDir[k] ±1 (the paint sweep), pet[k] / price[k] = seconds since
//         landing (< 0 = not yet), priceBug: index still showing its typo, bugShow (outline it red), lit, sheen, live,
//         cart (orders 0..3) + cartAge, added[k] = seconds since that product was added }
// =====================================================================
const PW = { bg: '#fffaf2', ink: '#2b2118', soft: '#7a6a5a', line: '#eadfce', coral: '#ff7a59', sun: '#ffd166', mint: '#cdeccf', peach: '#ffdcc7', lilac: '#e3dafb', sky: '#cfe8fb', white: '#ffffff' };
// 9:16 renders build the phone layout of the same shop (600 × 1000 units, one column, a 2×2 grid), so the whole
// site stays big in a tall frame; the part indices and the thrown items are the same, only the geometry changes
const PW_MOBILE = PORTRAIT;
const SITE_DW = PW_MOBILE ? 600 : 1000, SITE_DH = PW_MOBILE ? 1000 : 600;
const SITE_PARTS = PW_MOBILE
  ? [[24, 58, 552, 44], [24, 116, 552, 244], [24, 374, 552, 236], [24, 626, 552, 34], [24, 676, 268, 156], [308, 676, 268, 156], [24, 842, 268, 156], [308, 842, 268, 156]]
  : [[30, 58, 940, 40], [30, 112, 470, 230], [530, 112, 440, 230], [30, 356, 940, 34], [30, 404, 220, 176], [270, 404, 220, 176], [510, 404, 220, 176], [750, 404, 220, 176]];
const SITE_ROWS = PW_MOBILE ? [[0], [1], [2], [3], [4, 5], [6, 7]] : [[0], [1, 2], [3], [4, 5, 6, 7]];
const PRODUCTS = [['Cozy cat bed', '€24', PW.peach, 'cat'], ['Carrot crunch', '€9', PW.mint, 'bunny'], ['Bubble castle', '€18', PW.sky, 'fish'], ['Squeaky bone', '€12', PW.lilac, 'puppy']];
const PRICE_TYPO = ['€24', '€9', '€18', '€120'];
const PETS = ['dog', 'cat', 'bunny', 'fish', 'puppy'];
const PW_SANS = '"Avenir Next", "Nunito", "Segoe UI", "Helvetica Neue", Arial, sans-serif';
function mxSiteParts(x, y, w) { const s = w / SITE_DW; return SITE_PARTS.map(([u, v, pw, ph]) => [x + u * s, y + v * s, pw * s, ph * s]); }
// where each thrown item lands: [cx, cy, size]
function petSlot(k, x, y, w) { const s = w / SITE_DW, P = mxSiteParts(x, y, w); if (k === 0) { const [px, py, pw, ph] = P[2]; return [px + pw * 0.5, py + ph * 0.55, 92 * s]; } if (PW_MOBILE) { const [px, py, pw, ph] = P[3 + k]; return [px + pw / 2, py + 8 * s + ph * 0.28, 32 * s]; } const [px, py, pw, ph] = P[3 + k]; return [px + pw / 2, py + ph * 0.31, 44 * s]; }
function priceSlot(k, x, y, w) { const s = w / SITE_DW, [px, py, , ph] = mxSiteParts(x, y, w)[4 + k]; return [px + 34 * s, py + ph - 22 * s, s]; }

// ---- the pets, drawn in the agents' own soft round style, centred on (cx, cy), r = head radius
function mxPet(kind, cx, cy, r) {
  ctx.save(); ctx.translate(cx, cy); ctx.lineCap = 'round';
  const eye = (x, y, k = 1) => { ctx.fillStyle = PW.ink; ctx.beginPath(); ctx.arc(x * r, y * r, 0.1 * r * k, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x * r - 0.03 * r, y * r - 0.035 * r, 0.035 * r * k, 0, TAU); ctx.fill(); };
  const blob = (x, y, rx, ry, c, rot = 0) => { ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(x * r, y * r, rx * r, ry * r, rot, 0, TAU); ctx.fill(); };
  const cheeks = () => { blob(-0.5, 0.2, 0.14, 0.09, 'rgba(255,120,100,0.35)'); blob(0.5, 0.2, 0.14, 0.09, 'rgba(255,120,100,0.35)'); };
  if (kind === 'dog' || kind === 'puppy') {
    const fur = kind === 'dog' ? '#d9a066' : '#f4efe6', ear = kind === 'dog' ? '#9c6a3c' : '#3a2e26';
    blob(-0.82, 0.05, 0.3, 0.55, ear, 0.35); blob(0.82, 0.05, 0.3, 0.55, ear, -0.35);
    blob(0, 0, 1, 0.92, fur);
    if (kind === 'puppy') { blob(0.45, -0.45, 0.22, 0.18, '#3a2e26'); blob(-0.6, 0.45, 0.12, 0.1, '#3a2e26'); }
    blob(0, 0.35, 0.42, 0.32, '#fff3e3'); eye(-0.36, -0.12); eye(0.36, -0.12);
    blob(0, 0.2, 0.15, 0.1, PW.ink); ctx.strokeStyle = PW.ink; ctx.lineWidth = 0.06 * r;
    ctx.beginPath(); ctx.moveTo(0, 0.3 * r); ctx.lineTo(0, 0.42 * r); ctx.arc(-0.1 * r, 0.42 * r, 0.1 * r, 0, Math.PI); ctx.moveTo(0, 0.42 * r); ctx.arc(0.1 * r, 0.42 * r, 0.1 * r, Math.PI, 0, true); ctx.stroke();
    blob(0.06, 0.6, 0.1, 0.13, '#ff8c8c'); cheeks();
  }
  if (kind === 'cat') {
    ctx.fillStyle = '#f2a65a'; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(s * 0.85 * r, -0.2 * r); ctx.lineTo(s * 0.7 * r, -1.05 * r); ctx.lineTo(s * 0.2 * r, -0.75 * r); ctx.fill(); }
    ctx.fillStyle = '#ffc9b5'; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(s * 0.7 * r, -0.4 * r); ctx.lineTo(s * 0.64 * r, -0.85 * r); ctx.lineTo(s * 0.35 * r, -0.68 * r); ctx.fill(); }
    blob(0, 0, 1, 0.88, '#f2a65a'); [-0.3, 0, 0.3].forEach((x) => blob(x, -0.68, 0.06, 0.16, '#d9853a'));
    eye(-0.36, -0.08, 1.1); eye(0.36, -0.08, 1.1); blob(0, 0.18, 0.09, 0.06, '#e2706a'); cheeks();
    ctx.strokeStyle = PW.ink; ctx.lineWidth = 0.04 * r; for (const s of [-1, 1]) for (const d of [-0.06, 0.08]) { ctx.beginPath(); ctx.moveTo(s * 0.35 * r, (0.28 + d) * r); ctx.lineTo(s * 1.05 * r, (0.22 + d * 2.2) * r); ctx.stroke(); }
    ctx.lineWidth = 0.06 * r; ctx.beginPath(); ctx.arc(-0.08 * r, 0.27 * r, 0.08 * r, 0.1, Math.PI - 0.1); ctx.arc(0.08 * r, 0.27 * r, 0.08 * r, 0.1, Math.PI - 0.1); ctx.stroke();
  }
  if (kind === 'bunny') {
    blob(-0.38, -1.05, 0.22, 0.62, '#f7f3ee', -0.15); blob(0.38, -1.05, 0.22, 0.62, '#f7f3ee', 0.15);
    blob(-0.38, -1.02, 0.1, 0.45, '#ffc1cc', -0.15); blob(0.38, -1.02, 0.1, 0.45, '#ffc1cc', 0.15);
    blob(0, 0, 0.95, 0.85, '#f7f3ee'); eye(-0.34, -0.08); eye(0.34, -0.08); blob(0, 0.16, 0.1, 0.07, '#ff8fa3'); cheeks();
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#d8cfc4'; ctx.lineWidth = 0.03 * r; ctx.beginPath(); ctx.rect(-0.1 * r, 0.3 * r, 0.2 * r, 0.18 * r); ctx.fill(); ctx.stroke();
  }
  if (kind === 'fish') {
    ctx.fillStyle = '#ff9a3c'; ctx.beginPath(); ctx.moveTo(0.7 * r, 0); ctx.lineTo(1.35 * r, -0.55 * r); ctx.quadraticCurveTo(1.15 * r, 0, 1.35 * r, 0.55 * r); ctx.closePath(); ctx.fill();
    blob(0, 0, 0.95, 0.72, '#ffb347'); blob(0.1, -0.62, 0.35, 0.18, '#ff9a3c', 0.3); blob(-0.1, 0.3, 0.5, 0.22, '#ffd08a');
    eye(-0.45, -0.12, 1.3); blob(-0.78, 0.18, 0.1, 0.06, '#e2706a');
    ctx.strokeStyle = 'rgba(120,180,230,0.9)'; ctx.lineWidth = 0.05 * r; [[-1.2, -0.5, 0.12], [-1.45, -0.85, 0.08], [-1.15, -1.1, 0.06]].forEach(([x, y, rr]) => { ctx.beginPath(); ctx.arc(x * r, y * r, rr * r, 0, TAU); ctx.stroke(); });
  }
  ctx.restore();
}
function mxPriceTag(str, x, y, s, bad) {
  ctx.save(); ctx.font = `800 ${17 * s}px ${PW_SANS}`; const w = ctx.measureText(str).width + 18 * s;
  ctx.fillStyle = bad ? '#ffe1dc' : '#fff1ea'; ctx.beginPath(); ctx.roundRect(x - 12 * s, y - 15 * s, w, 22 * s, 11 * s); ctx.fill();
  if (bad) { ctx.strokeStyle = MX.red; ctx.lineWidth = 2.5 * s; ctx.stroke(); }
  ctx.fillStyle = bad ? MX.red : PW.coral; ctx.fillText(str, x - 3 * s, y + 2 * s); ctx.restore();
}
const pwBounce = (age) => (age < 0 ? 0 : 1 + 0.22 * Math.exp(-age * 7) * Math.cos(age * 24) * (age < 0.6 ? 1 : 0));

// the finished look of each part (on the light page)
function mxPartFinal(i, [px, py, pw, ph], s, st) {
  const T = (str, x, y, size, color, o = {}) => mxText(str, x, y, size * s, color, { font: PW_SANS, ...o });
  if (i === 0) {
    ctx.fillStyle = PW.coral; ctx.beginPath(); ctx.arc(px + 14 * s, py + 22 * s, 9 * s, 0, TAU); ctx.fill();
    [[-9, -9], [0, -13], [9, -9]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.arc(px + (14 + dx) * s, py + (22 + dy) * s, 3.6 * s, 0, TAU); ctx.fill(); });
    T('pawly', px + 32 * s, py + 30 * s, 26, PW.ink, { weight: 800 });
    if (PW_MOBILE) {   // the phone nav: a menu button instead of the links
      ctx.strokeStyle = PW.ink; ctx.lineWidth = 2.6 * s; ctx.lineCap = 'round';
      for (const d of [-7, 0, 7]) { ctx.beginPath(); ctx.moveTo(px + pw - 176 * s, py + (20 + d) * s); ctx.lineTo(px + pw - 154 * s, py + (20 + d) * s); ctx.stroke(); }
    } else {
      ctx.save(); ctx.font = `600 ${14 * s}px ${PW_SANS}`; let x = px + 300 * s;
      for (const l of ['Dogs', 'Cats', 'Small pets', 'Fish', 'Treats']) { T(l, x, py + 26 * s, 14, PW.soft, { weight: 600 }); x += ctx.measureText(l).width + 30 * s; }
      ctx.restore();
    }
    const cx = px + pw - 70 * s, cy = py + 20 * s;   // the cart, with its order badge
    ctx.fillStyle = PW.ink; ctx.beginPath(); ctx.roundRect(cx - 30 * s, cy - 16 * s, 96 * s, 32 * s, 16 * s); ctx.fill();
    ctx.strokeStyle = PW.white; ctx.lineWidth = 2.2 * s; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(cx - 18 * s, cy - 7 * s); ctx.lineTo(cx - 13 * s, cy - 7 * s); ctx.lineTo(cx - 9 * s, cy + 5 * s); ctx.lineTo(cx + 4 * s, cy + 5 * s); ctx.lineTo(cx + 7 * s, cy - 3 * s); ctx.lineTo(cx - 11 * s, cy - 3 * s); ctx.stroke();
    T('Cart', cx + 14 * s, cy + 5 * s, 13, PW.white, { weight: 700 });
    if ((st.cart ?? 0) > 0) { const n = Math.floor(st.cart), k = pwBounce(st.cartAge ?? 9); ctx.save(); ctx.translate(cx + 60 * s, cy - 14 * s); ctx.scale(k, k); ctx.fillStyle = PW.coral; ctx.beginPath(); ctx.arc(0, 0, 11 * s, 0, TAU); ctx.fill(); T(String(n), 0, 5 * s, 13, PW.white, { align: 'center', weight: 800 }); ctx.restore(); }
  }
  if (i === 1) {
    ctx.fillStyle = PW.sun; ctx.beginPath(); ctx.roundRect(px, py + 8 * s, 214 * s, 24 * s, 12 * s); ctx.fill();
    T('NEW · Free delivery over €40', px + 12 * s, py + 25 * s, 12, PW.ink, { weight: 700 });
    T('Everything your', px, py + 86 * s, 46, PW.ink, { weight: 800 });
    const w = T('pet ', px, py + 138 * s, 46, PW.ink, { weight: 800 }); T('loves.', px + w, py + 138 * s, 46, PW.coral, { weight: 800 });
    T('Toys, treats and cozy beds, at your door tomorrow.', px, py + 170 * s, 14.5, PW.soft, { weight: 500 });
    ctx.fillStyle = PW.coral; ctx.beginPath(); ctx.roundRect(px, py + 188 * s, 136 * s, 38 * s, 19 * s); ctx.fill();
    T('Shop now  →', px + 68 * s, py + 212 * s, 15, PW.white, { align: 'center', weight: 800 });
    T('★★★★★', px + 156 * s, py + 206 * s, 13, '#f2a93b', { weight: 700 }); T('4.9 · 12k happy pets', px + 156 * s, py + 222 * s, 11.5, PW.soft, { weight: 600 });
  }
  if (i === 2) {   // the hero picture's stage: a sun disc, a few doodles (the dog is thrown in)
    ctx.fillStyle = '#fff1d6'; ctx.beginPath(); ctx.roundRect(px, py, pw, ph, 22 * s); ctx.fill();
    ctx.fillStyle = PW.sun; ctx.beginPath(); ctx.arc(px + pw * 0.5, py + ph * 0.55, 108 * s, 0, TAU); ctx.fill();
    ctx.strokeStyle = PW.coral; ctx.lineWidth = 3 * s; ctx.lineCap = 'round';
    const heart = (x, y, k) => { ctx.fillStyle = PW.coral; ctx.beginPath(); ctx.moveTo(x, y + 6 * k * s); ctx.bezierCurveTo(x - 12 * k * s, y - 4 * k * s, x - 6 * k * s, y - 12 * k * s, x, y - 5 * k * s); ctx.bezierCurveTo(x + 6 * k * s, y - 12 * k * s, x + 12 * k * s, y - 4 * k * s, x, y + 6 * k * s); ctx.fill(); };
    heart(px + 60 * s, py + 50 * s, 1.3); heart(px + pw - 56 * s, py + 70 * s, 1); heart(px + pw - 90 * s, py + ph - 40 * s, 0.8);
    ctx.fillStyle = PW.white; ctx.beginPath(); ctx.roundRect(px + 18 * s, py + ph - 52 * s, 132 * s, 36 * s, 18 * s); ctx.fill();
    T('♥  Best seller', px + 84 * s, py + ph - 29 * s, 12.5, PW.ink, { align: 'center', weight: 700 });
  }
  if (i === 3) {
    ctx.save(); ctx.font = `700 ${13 * s}px ${PW_SANS}`; let x = px;
    let full = false;
    ['All', 'Dogs', 'Cats', 'Small pets', 'Fish', 'Birds', 'Treats', 'Toys', 'Beds'].forEach((l, k) => {
      const w = ctx.measureText(l).width + 30 * s; if (full || x + w > px + pw) { full = true; return; }   // only whole chips, in order
      ctx.fillStyle = k === 0 ? PW.ink : PW.white; ctx.beginPath(); ctx.roundRect(x, py + 3 * s, w, 28 * s, 14 * s); ctx.fill();
      if (k) { ctx.strokeStyle = PW.line; ctx.lineWidth = 1.5 * s; ctx.stroke(); }
      T(l, x + 15 * s, py + 22 * s, 13, k === 0 ? PW.white : PW.ink, { weight: 700 }); x += w + 10 * s;
    });
    ctx.restore();
  }
  if (i >= 4) {
    const [name, , tile] = PRODUCTS[i - 4], added = (st.added?.[i - 4] ?? -1) >= 0;
    ctx.save(); ctx.shadowColor = 'rgba(43,33,24,0.10)'; ctx.shadowBlur = 16 * s; ctx.shadowOffsetY = 6 * s; ctx.fillStyle = PW.white; ctx.beginPath(); ctx.roundRect(px, py, pw, ph, 16 * s); ctx.fill(); ctx.restore();
    ctx.fillStyle = tile; ctx.beginPath(); ctx.roundRect(px + 8 * s, py + 8 * s, pw - 16 * s, ph * 0.56, 12 * s); ctx.fill();
    T(name, px + 14 * s, py + ph * 0.56 + (PW_MOBILE ? 28 : 34) * s, 15, PW.ink, { weight: 800 });
    const bx = px + pw - 70 * s, by = py + ph - 38 * s, k = added ? pwBounce(st.added[i - 4]) : 1;
    ctx.save(); ctx.translate(bx + 28 * s, by + 14 * s); ctx.scale(k, k); ctx.translate(-bx - 28 * s, -by - 14 * s);
    ctx.fillStyle = added ? '#3fae6a' : PW.ink; ctx.beginPath(); ctx.roundRect(bx, by, 56 * s, 28 * s, 14 * s); ctx.fill();
    T(added ? '✓ Added' : 'Add +', bx + 28 * s, by + 19 * s, 12, PW.white, { align: 'center', weight: 800 }); ctx.restore();
  }
}
// the wireframe of each part: outline drawn on, then skeleton bars
function mxPartWire(i, [px, py, pw, ph], b, s) {
  ctx.save(); ctx.strokeStyle = 'rgba(245,241,232,0.75)'; ctx.lineWidth = 1.6 * s; ctx.setLineDash([2 * (pw + ph) * b, 1e5]);
  ctx.beginPath(); ctx.roundRect(px, py, pw, ph, 12 * s); ctx.stroke(); ctx.restore();
  if (b < 1) return;
  ctx.save(); ctx.fillStyle = 'rgba(245,241,232,0.16)';
  const bars = i === 1 ? [[0, 0.04, 0.45, 0.1], [0, 0.24, 0.85, 0.14], [0, 0.46, 0.6, 0.14], [0, 0.82, 0.29, 0.16]] : i === 0 ? [[0, 0.2, 0.1, 0.6], [0.3, 0.35, 0.36, 0.3], [0.86, 0.1, 0.12, 0.8]] : i === 3 ? [[0, 0.1, 0.62, 0.8]] : i === 2 ? [[0.3, 0.2, 0.4, 0.7]] : [[0.04, 0.05, 0.92, 0.55], [0.06, 0.7, 0.55, 0.1], [0.68, 0.78, 0.26, 0.16]];
  bars.forEach(([a, c, d, e]) => { ctx.beginPath(); ctx.roundRect(px + a * pw, py + c * ph, d * pw, e * ph, 4 * s); ctx.fill(); });
  ctx.restore();
}
// the light page sweeps in row by row (full-width bands, so the gaps between parts are painted too)
function rowBand(k, x, y, w, h) {
  const s = w / SITE_DW, P = SITE_ROWS.map((r) => r.map((i) => SITE_PARTS[i]));
  const top = (j) => (j === 0 ? 44 : (P[j - 1][0][1] + P[j - 1][0][3] + P[j][0][1]) / 2), bot = (j) => (j === P.length - 1 ? SITE_DH : top(j + 1));
  return [x, y + top(k) * s, w, (bot(k) - top(k)) * s];
}
function mxSite(x, y, w, h, st) {
  const s = w / SITE_DW, parts = mxSiteParts(x, y, w), pill = Math.min(340, SITE_DW * 0.5);
  ctx.save();
  if (st.lit) { ctx.save(); ctx.shadowColor = `rgba(255,214,150,${0.55 * st.lit})`; ctx.shadowBlur = 110 * s; ctx.fillStyle = PW.bg; ctx.beginPath(); ctx.roundRect(x, y, w, h, 16 * s); ctx.fill(); ctx.restore(); }
  ctx.fillStyle = st.fill ?? 'rgba(22,18,14,0.9)'; ctx.beginPath(); ctx.roundRect(x, y, w, h, 16 * s); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, 16 * s); ctx.clip();
  // the paint: each row band sweeps in (direction per row), revealing the finished parts in it
  const edge = SITE_ROWS.map((_, k) => { const p = clamp(st.row?.[k] ?? 0), d = st.rowDir?.[k] ?? 1; return d > 0 ? [x, x + w * p] : [x + w * (1 - p), x + w]; });
  SITE_ROWS.forEach((row, k) => {
    const [bx, by, bw, bh] = rowBand(k, x, y, w, h), [e0, e1] = edge[k], p = clamp(st.row?.[k] ?? 0);
    row.forEach((i) => { if (p < 1 && (st.built?.[i] ?? 0) > 0) mxPartWire(i, parts[i], clamp(st.built[i]), s); });
    if (p <= 0) return;
    ctx.save(); ctx.beginPath(); ctx.rect(e0, by, e1 - e0, bh); ctx.clip();
    ctx.fillStyle = PW.bg; ctx.fillRect(bx, by, bw, bh);
    row.forEach((i) => mxPartFinal(i, parts[i], s, st));
    ctx.restore();
    if (p < 1) { const ex = (st.rowDir?.[k] ?? 1) > 0 ? e1 : e0; ctx.fillStyle = AG.design.c; ctx.fillRect(ex - 3 * s, by, 6 * s, bh); }
  });
  ctx.restore();
  // chrome on top: the bar, the address, the live badge
  const lightChrome = clamp(st.row?.[0] ?? 0) >= 1;
  ctx.fillStyle = lightChrome ? '#f3ebdd' : 'rgba(32,26,21,0.95)'; ctx.beginPath(); ctx.roundRect(x, y, w, 44 * s, [16 * s, 16 * s, 0, 0]); ctx.fill();
  [0, 1, 2].forEach((k) => { ctx.fillStyle = lightChrome ? ['#ff8a7a', '#ffc65c', '#7fd18b'][k] : MX.line; ctx.beginPath(); ctx.arc(x + (24 + k * 20) * s, y + 22 * s, 6 * s, 0, TAU); ctx.fill(); });
  ctx.fillStyle = lightChrome ? PW.white : MX.panel; ctx.beginPath(); ctx.roundRect(x + w / 2 - pill / 2 * s, y + 10 * s, pill * s, 24 * s, 12 * s); ctx.fill();
  mxText('pawly.shop', x + w / 2, y + 27 * s, 13 * s, lightChrome ? PW.soft : MX.soft, { align: 'center', font: MONO, weight: 500 });
  if (st.live) {
    const k = st.live; ctx.save(); ctx.globalAlpha *= clamp(k); ctx.translate(x + w - 100 * s, y + 22 * s); ctx.scale(k, k);
    ctx.fillStyle = '#dff3e4'; ctx.beginPath(); ctx.roundRect(-38 * s, -11 * s, 76 * s, 22 * s, 11 * s); ctx.fill();
    ctx.fillStyle = '#3fae6a'; ctx.beginPath(); ctx.arc(-22 * s, 0, 4 * s, 0, TAU); ctx.fill();
    mxText('LIVE', 6 * s, 4.5 * s, 11 * s, '#2a7a48', { align: 'center', font: MONO, weight: 700 }); ctx.restore();
  }
  ctx.strokeStyle = st.lit ? `rgba(255,214,150,${0.4 + 0.5 * st.lit})` : 'rgba(198,189,174,0.7)'; ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.roundRect(x, y, w, h, 16 * s); ctx.stroke();
  // the thrown items, once they have landed
  PETS.forEach((kind, k) => { const age = st.pet?.[k] ?? -1; if (age < 0) return; const [cx, cy, r] = petSlot(k, x, y, w), b = pwBounce(age); ctx.save(); ctx.translate(cx, cy + r * 0.9); ctx.scale(2 - b, b); ctx.translate(-cx, -cy - r * 0.9); mxPet(kind, cx, cy, r); ctx.restore(); });
  PRODUCTS.forEach((_, k) => { const age = st.price?.[k] ?? -1; if (age < 0) return; const [px, py] = priceSlot(k, x, y, w), b = pwBounce(age), bad = st.priceBug === k; ctx.save(); ctx.translate(px, py); ctx.scale(b, b); ctx.translate(-px, -py); mxPriceTag(bad ? PRICE_TYPO[k] : PRODUCTS[k][1], px, py, s, bad && st.bugShow); ctx.restore(); });
  // the sheen: one diagonal light band across the finished site
  if (st.sheen > 0 && st.sheen < 1) {
    ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, 16 * s); ctx.clip();
    const bx = lerp(x - 300 * s, x + w + 300 * s, EZ.io(st.sheen)), g = ctx.createLinearGradient(bx - 160 * s, y, bx + 160 * s, y + 120 * s);
    g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, 'rgba(255,255,255,0.35)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g; ctx.fillRect(x, y, w, h); ctx.restore();
  }
  ctx.restore();
  return parts;
}
