// =====================================================================
//  styles/construct/agents.js — the four agents. Each has its own colour (it means that agent, nothing else),
//  its own body and its own prop:
//    plan   amber, round, an antenna with a bulb that lights when it has the idea
//    code   green, a rounded square, Matrix shades
//    design lilac, round, a beret, paint splats, a paint roller
//    qa     blue, a bit smaller, a monocle and a suspicious brow
//  mxAgent(x, y, r, { role, mood: calm|happy|focus|wow, look: [dx, dy], talk, squash, tilt, arms: [l, r], prop, tag, hero })
// =====================================================================
const AG = {
  plan:   { c: '#e8b04f', hi: '#f8dc9a', dk: '#8f6418', tag: 'PLAN' },
  code:   { c: '#7fb069', hi: '#c4e3ad', dk: '#3f6634', tag: 'CODE' },
  design: { c: '#b48ad8', hi: '#e0cbf2', dk: '#674588', tag: 'DESIGN' },
  qa:     { c: '#6fa3d6', hi: '#bad6f1', dk: '#355f8a', tag: 'QA' },
};
const AG_INK = '#1a1410';

function mxAgent(x, y, r, o = {}) {
  const role = o.role ?? 'plan', A = AG[role], key = o.key ?? role, R = RNG('agent', key), mood = o.mood ?? 'calm';
  if (role === 'qa') r *= 0.88;
  const bob = Math.sin(TT * TAU * 0.8 + R.r(0, 6)) * r * 0.06, sq = o.squash ?? 1, rx = r / Math.sqrt(sq), ry = r * sq;
  if (o.hero) SPARK_AT = toScreen(x, y);
  // the shadow stays on the ground while the body bobs
  ctx.save(); ctx.fillStyle = 'rgba(0,0,0,0.38)'; ctx.beginPath(); ctx.ellipse(x, y + r * 1.18, r * 0.75, r * 0.13, 0, 0, TAU); ctx.fill(); ctx.restore();
  ctx.save(); ctx.translate(x, y + bob); ctx.rotate(o.tilt ?? 0);
  // feet
  ctx.fillStyle = A.dk; for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(s * rx * 0.36, ry * 0.97, r * 0.21, r * 0.12, 0, 0, TAU); ctx.fill(); }
  // arms: angles from straight down, outward positive; idle sway by default
  const sway = Math.sin(TT * TAU * 0.9 + R.r(0, 6)) * 0.12, [al, ar] = o.arms ?? [0.45 + sway, 0.45 - sway];
  const hand = (s, a) => { const sx = s * rx * 0.86, sy = ry * 0.12, L = r * 0.62; return [sx, sy, sx + s * Math.sin(a) * L, sy + Math.cos(a) * L]; };
  const arm = (s, a) => { const [sx, sy, hx, hy] = hand(s, a); ctx.strokeStyle = A.dk; ctx.lineWidth = r * 0.13; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(hx, hy); ctx.stroke(); ctx.fillStyle = A.c; ctx.beginPath(); ctx.arc(hx, hy, r * 0.13, 0, TAU); ctx.fill(); ctx.lineWidth = r * 0.04; ctx.stroke(); return [hx, hy]; };
  // body: own shape, glow in its own colour, a lit side and a shaded side
  ctx.save(); ctx.shadowColor = A.c + 'aa'; ctx.shadowBlur = r * 0.9;
  ctx.beginPath(); if (role === 'code') ctx.roundRect(-rx, -ry, 2 * rx, 2 * ry, r * 0.55); else ctx.ellipse(0, 0, rx, ry, 0, 0, TAU);
  const g = ctx.createRadialGradient(-rx * 0.35, -ry * 0.45, r * 0.1, 0, 0, r * 1.15);
  g.addColorStop(0, A.hi); g.addColorStop(0.55, A.c); g.addColorStop(1, A.dk);
  ctx.fillStyle = g; ctx.fill(); ctx.shadowBlur = 0; ctx.lineWidth = r * 0.05; ctx.strokeStyle = A.dk; ctx.stroke(); ctx.restore();
  // a soft highlight, a belly patch
  ctx.fillStyle = 'rgba(255,255,255,0.28)'; ctx.beginPath(); ctx.ellipse(-rx * 0.42, -ry * 0.52, r * 0.2, r * 0.11, -0.6, 0, TAU); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.14)'; ctx.beginPath(); ctx.ellipse(0, ry * 0.5, rx * 0.5, ry * 0.3, 0, 0, TAU); ctx.fill();
  if (role === 'design') [['#e8b04f', -0.5, 0.35], ['#7fb069', 0.45, 0.5], ['#6fa3d6', 0.15, 0.72]].forEach(([c, fx, fy], i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(fx * rx, fy * ry, r * 0.09, r * 0.07, i, 0, TAU); ctx.fill(); });
  // cheeks
  ctx.fillStyle = 'rgba(230,110,90,0.28)'; for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(s * rx * 0.55, ry * 0.08, r * 0.13, r * 0.08, 0, 0, TAU); ctx.fill(); }
  mxFace(role, r, rx, ry, mood, o.look ?? [0, 0], o.talk, R);
  // role extras on the head
  if (role === 'plan') mxAntenna(r, ry, o.prop ?? 0);
  if (role === 'design') { ctx.save(); ctx.translate(r * 0.12, -ry * 0.88); ctx.rotate(-0.22); ctx.fillStyle = '#4a2f5e'; ctx.beginPath(); ctx.ellipse(0, 0, rx * 0.78, r * 0.24, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(0, -r * 0.22, r * 0.07, 0, TAU); ctx.fill(); ctx.restore(); }
  // arms in front, with the role's prop in the right hand
  arm(-1, al); const [hx, hy] = arm(1, ar);
  if (role === 'design') mxRoller(hx, hy, r, o.prop ?? 0);
  ctx.restore();
  if (o.tag) mxText(A.tag, x, y + r * 1.62, 22 * UNIT, A.c, { align: 'center', font: MONO, weight: 700, al: o.tag });
}

function mxFace(role, r, rx, ry, mood, [lx, ly], talk, R) {
  const blink = (B + R.i(0, 40)) % 46 < 2, ex = rx * 0.32, ey = -ry * 0.14;
  ctx.lineCap = 'round';
  if (role === 'code') {   // Matrix shades: two dark lenses, a bridge, a glint; one brow raised above them
    ctx.fillStyle = AG_INK; for (const s of [-1, 1]) { ctx.beginPath(); ctx.roundRect(s * ex - r * 0.23, ey - r * 0.12, r * 0.46, r * 0.26, r * 0.1); ctx.fill(); }
    ctx.strokeStyle = AG_INK; ctx.lineWidth = r * 0.06; ctx.beginPath(); ctx.moveTo(-ex + r * 0.2, ey - r * 0.04); ctx.lineTo(ex - r * 0.2, ey - r * 0.04); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = r * 0.035; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(s * ex - r * 0.12, ey + r * 0.06); ctx.lineTo(s * ex - r * 0.02, ey - r * 0.06); ctx.stroke(); }
    ctx.strokeStyle = AG_INK; ctx.lineWidth = r * 0.06; ctx.beginPath(); ctx.moveTo(ex - r * 0.18, ey - r * 0.26); ctx.quadraticCurveTo(ex, ey - r * 0.36, ex + r * 0.18, ey - r * 0.27); ctx.stroke();
  } else {
    for (const s of [-1, 1]) {
      const big = role === 'qa' && s > 0 ? 1.35 : 1, x = s * ex, y = ey;
      if (mood === 'happy') { ctx.strokeStyle = AG_INK; ctx.lineWidth = r * 0.07; ctx.beginPath(); ctx.arc(x, y + r * 0.06, r * 0.11, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); continue; }
      const h = blink ? 0.02 : mood === 'focus' ? 0.1 : mood === 'wow' ? 0.22 : 0.17;
      ctx.fillStyle = '#fbf7ee'; ctx.beginPath(); ctx.ellipse(x, y, r * 0.15 * big, r * h * big, 0, 0, TAU); ctx.fill();
      if (!blink) { ctx.fillStyle = AG_INK; ctx.beginPath(); ctx.arc(x + lx * r * 0.06, y + ly * r * 0.05 + r * 0.02, r * 0.085 * big, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x + lx * r * 0.06 - r * 0.03, y + ly * r * 0.05 - r * 0.02, r * 0.025 * big, 0, TAU); ctx.fill(); }
      if (role === 'qa' && s > 0) { ctx.strokeStyle = '#e6d7a8'; ctx.lineWidth = r * 0.05; ctx.beginPath(); ctx.arc(x, y, r * 0.25, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + r * 0.2, y + r * 0.16); ctx.quadraticCurveTo(x + r * 0.35, y + r * 0.5, x + r * 0.2, y + r * 0.75); ctx.stroke(); }
    }
    // brows: plan curious (both up), design soft, qa suspicious (one down, one up)
    ctx.strokeStyle = AG_INK; ctx.lineWidth = r * 0.055;
    const brow = (s, lift, tilt) => { const x = s * ex, y = ey - r * (0.27 + lift); ctx.beginPath(); ctx.moveTo(x - r * 0.12, y + s * tilt * r); ctx.lineTo(x + r * 0.12, y - s * tilt * r); ctx.stroke(); };
    if (role === 'plan') { brow(-1, mood === 'wow' ? 0.08 : 0.04, 0.04); brow(1, mood === 'wow' ? 0.08 : 0.04, 0.04); }
    if (role === 'design') { brow(-1, 0.02, -0.02); brow(1, 0.02, -0.02); }
    if (role === 'qa') { brow(-1, -0.02, -0.06); brow(1, 0.12, 0.03); }
  }
  // mouth: talks when its bubble is up
  const my = ry * 0.28, open = talk ? 0.04 + 0.1 * Math.abs(Math.sin(TT * 22)) : 0;
  ctx.strokeStyle = AG_INK; ctx.fillStyle = AG_INK; ctx.lineWidth = r * 0.055;
  if (mood === 'happy' || open > 0.06) { ctx.beginPath(); ctx.ellipse(0, my, r * 0.17, r * Math.max(open, mood === 'happy' ? 0.12 : 0), 0, 0, Math.PI); ctx.fill(); ctx.fillStyle = '#e07a6e'; ctx.beginPath(); ctx.ellipse(0, my + r * 0.07, r * 0.08, r * 0.035, 0, 0, TAU); ctx.fill(); }
  else if (mood === 'wow') { ctx.beginPath(); ctx.ellipse(0, my + r * 0.04, r * 0.07, r * 0.09, 0, 0, TAU); ctx.fill(); }
  else if (mood === 'focus') { ctx.beginPath(); ctx.moveTo(-r * 0.1, my + r * 0.04); ctx.lineTo(r * 0.12, my + r * 0.02); ctx.stroke(); }
  else { ctx.beginPath(); ctx.arc(0, my - r * 0.06, r * 0.13, 0.25 * Math.PI, 0.75 * Math.PI); ctx.stroke(); }
}
function mxAntenna(r, ry, on) {
  const tx = r * 0.18, ty = -ry - r * 0.62;
  ctx.strokeStyle = AG.plan.dk; ctx.lineWidth = r * 0.06; ctx.beginPath(); ctx.moveTo(0, -ry * 0.96); ctx.quadraticCurveTo(r * 0.02, -ry - r * 0.35, tx, ty); ctx.stroke();
  ctx.save(); ctx.shadowColor = '#fff3c4'; ctx.shadowBlur = r * 0.8 * on; ctx.fillStyle = on > 0.5 ? '#fff3c4' : AG.plan.dk;
  ctx.beginPath(); ctx.arc(tx, ty, r * 0.15, 0, TAU); ctx.fill(); ctx.restore();
  if (on > 0.5) { ctx.strokeStyle = 'rgba(255,243,196,0.8)'; ctx.lineWidth = r * 0.04; for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k - 2) * 0.5; ctx.beginPath(); ctx.moveTo(tx + Math.cos(a) * r * 0.24, ty + Math.sin(a) * r * 0.24); ctx.lineTo(tx + Math.cos(a) * r * 0.36, ty + Math.sin(a) * r * 0.36); ctx.stroke(); } }
}
function mxRoller(hx, hy, r, swing) {
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(-0.35 + swing * 0.5);
  ctx.strokeStyle = '#d8cfbf'; ctx.lineWidth = r * 0.07; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -r * 0.85); ctx.lineTo(r * 0.38, -r * 0.85); ctx.stroke();
  ctx.fillStyle = MX.ink; ctx.beginPath(); ctx.roundRect(r * 0.08, -r * 1.12, r * 0.72, r * 0.3, r * 0.12); ctx.fill();
  ctx.fillStyle = AG.design.c; ctx.fillRect(r * 0.08, -r * 0.9, r * 0.72, r * 0.08);
  ctx.restore();
}
