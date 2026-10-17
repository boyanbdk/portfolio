// =====================================================================
//  styles/construct/kit.js — "the construct": a Matrix-like void in the site's own palette.
//  Warm black ground, olive glyph rain, cream wireframes; the agents (agents.js) and the site (site.js) are separate parts.
//  Olive = the machine (rain). Each agent owns one colour. Cream = what gets built. Red = the bug, nothing else.
//  Needs from the piece head: HAND, CX. Helpers are prefixed mx… (styles/README.md -> names).
// =====================================================================
const MX = {
  ground: '#110e0b', ground2: '#16120e', panel: '#201a15', line: '#352d24',
  ink: '#f5f1e8', soft: '#c6bdae', mute: '#94897a',
  olive: '#a3a375', oliveHi: '#dcdca8', oliveDim: '#3d3d2c', terra: '#c9784f', red: '#e0584a',
};
const MX_SANS = '"Hanken Grotesk", -apple-system, "Helvetica Neue", "Segoe UI", Arial, sans-serif';
const MX_SERIF = 'Georgia, "Times New Roman", serif';
const MX_GLYPHS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ0123456789<>/{}=;:+*'.split('');

// ---- glyph rain, in screen space (no parallax with the camera). o.time overrides the clock (hold it to freeze), o.tint shifts it to cream.
function mxRain(o = {}) {
  const size = o.size ?? 26, cols = Math.ceil(W / size) + 1, t = o.time ?? TT, tint = o.tint ?? 0;
  ctx.save(); screen(); ctx.font = `600 ${size}px ${MONO}`; ctx.textAlign = 'center';
  for (let i = 0; i < cols; i++) {
    const R = RNG('rain', i), speed = R.r(5, 14), len = R.i(8, 26), ph = R.r(0, 60), x = i * size + size / 2;
    const rows = Math.ceil(H / size) + len, head = mod(ph + t * speed, rows + 12);
    for (let k = 0; k < len; k++) {
      const row = Math.floor(head) - k; if (row < 0 || row * size > H + size) continue;
      const g = MX_GLYPHS[RNG('g', i, row, Math.floor((Math.floor(t * 12) + i * 3) / 3)).i(0, MX_GLYPHS.length - 1)];
      const a = (k === 0 ? 1 : (1 - k / len) * 0.75) * (o.alpha ?? 0.55);
      ctx.globalAlpha = a; ctx.fillStyle = k === 0 ? MX.oliveHi : mixHex(MX.olive, MX.ink, tint);
      ctx.fillText(g, x, row * size);
    }
  }
  ctx.restore();
}
function mxVignette(a = 0.85) {
  ctx.save(); screen();
  const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.95);
  g.addColorStop(0, 'rgba(17,14,11,0)'); g.addColorStop(1, `rgba(17,14,11,${a})`);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
}

// ---- text
function mxText(str, x, y, size, color, o = {}) {
  ctx.save(); ctx.font = `${o.weight ?? 500} ${size}px ${o.font ?? MX_SANS}`; ctx.fillStyle = color;
  ctx.textAlign = o.align ?? 'left'; ctx.textBaseline = o.base ?? "alphabetic"; ctx.globalAlpha *= o.al ?? 1;
  const s = o.count != null ? str.slice(0, Math.max(0, Math.floor(o.count))) : str;
  ctx.fillText(s, x, y); const w = ctx.measureText(s).width; ctx.restore(); return w;
}
function mxRR(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }

// ---- a speech bubble pointing at (ax, ay), outlined in the speaker's colour (o.color). o.think draws a thought bubble; k = 0..1 pop
function mxBubble(str, ax, ay, k, o = {}) {
  if (k <= 0) return;
  const size = o.size ?? 34 * UNIT, pad = size * 0.55;
  ctx.save(); ctx.font = `600 ${size}px ${MX_SANS}`;
  const w = ctx.measureText(str).width + pad * 2, h = size + pad * 1.4;
  const side = o.side ?? 1, bx = ax + side * 30 * UNIT - (side < 0 ? w : 0), by = ay - h - 46 * UNIT;
  ctx.translate(ax, ay); ctx.scale(k, k); ctx.translate(-ax, -ay);
  ctx.fillStyle = o.think ? MX.panel : MX.ink; ctx.strokeStyle = o.color ?? MX.olive; ctx.lineWidth = 4;
  mxRR(bx, by, w, h, h / 2); ctx.fill(); ctx.stroke();
  if (o.think) { for (const [d, rr] of [[0.35, 10], [0.7, 6]]) { ctx.beginPath(); ctx.arc(lerp(ax, bx + w / 2, 1 - d), lerp(ay, by + h, 1 - d), rr * UNIT, 0, TAU); ctx.fill(); ctx.stroke(); } }
  else { ctx.beginPath(); const tx = side > 0 ? bx + 34 * UNIT : bx + w - 34 * UNIT; ctx.moveTo(tx, by + h - 2); ctx.lineTo(tx + side * 30 * UNIT, by + h - 2); ctx.lineTo(ax + side * 8, ay - 14 * UNIT); ctx.closePath(); ctx.fill(); }
  mxText(str, bx + pad, by + h / 2 + size * 0.36, size, o.think ? MX.ink : MX.ground, { weight: 600 });
  ctx.restore();
}

// ---- the chat window (a generic AI chat, not a copy of any product's UI)
function mxChat(o = {}) {
  fillAll(MX.ground2);
  const bw = 1000 * UNIT, bh = 128 * UNIT, bx = CX - bw / 2, by = (o.boxY ?? LY(0.52)) - bh / 2;
  if (o.greet !== false) mxText('What should we build today?', CX, by - 70 * UNIT, 58 * UNIT, MX.ink, { align: 'center', font: MX_SERIF, weight: 400, al: o.greetAl ?? 1 });
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = 40; ctx.fillStyle = MX.panel; mxRR(bx, by, bw, bh, 26 * UNIT); ctx.fill(); ctx.restore();
  ctx.strokeStyle = MX.line; ctx.lineWidth = 2; mxRR(bx, by, bw, bh, 26 * UNIT); ctx.stroke();
  const tx = bx + 40 * UNIT, ty = by + 62 * UNIT, typed = o.text ?? '';
  let tw = 0;
  if (typed.length) tw = mxText(typed, tx, ty, 36 * UNIT, MX.ink, { weight: 400 });
  else mxText('Describe what you want to build…', tx, ty, 36 * UNIT, MX.mute, { weight: 400 });
  if (o.cursor !== false && (B % 12 < 6 || o.typing)) { ctx.fillStyle = MX.ink; ctx.fillRect(tx + tw + 4, ty - 32 * UNIT, 3, 40 * UNIT); }
  // send button: olive circle with an up arrow; o.press 0..1 squashes it
  const sx = bx + bw - 60 * UNIT, sy = by + bh - 52 * UNIT, sr = 26 * UNIT * (1 - 0.15 * (o.press ?? 0));
  ctx.fillStyle = typed.length ? MX.olive : MX.line; ctx.beginPath(); ctx.arc(sx, sy, sr, 0, TAU); ctx.fill();
  ctx.strokeStyle = MX.ground2; ctx.lineWidth = 4 * UNIT; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(sx, sy + sr * 0.45); ctx.lineTo(sx, sy - sr * 0.45); ctx.moveTo(sx - sr * 0.38, sy - sr * 0.08); ctx.lineTo(sx, sy - sr * 0.45); ctx.lineTo(sx + sr * 0.38, sy - sr * 0.08); ctx.stroke();
  mxText('+', bx + 40 * UNIT, by + bh - 30 * UNIT, 34 * UNIT, MX.mute, { weight: 300 });
  return { bx, by, bw, bh, tx, ty, tw, sx, sy };
}

// =====================================================================
const STYLE = {
  name: 'construct',
  paper: MX.ground,
  backdrop(c) { fillAll(c); },
  window(P, key, src) { ctx.save(); trace(P, true); ctx.clip(); ctx.drawImage(src, 0, 0); ctx.restore(); ctx.save(); trace(P, true); ctx.lineWidth = 3; ctx.strokeStyle = MX.olive; ctx.stroke(); ctx.restore(); },
  blob(P, c) { ctx.save(); trace(P, true); ctx.fillStyle = c; ctx.fill(); ctx.restore(); },
  hero(x, y, r) { mxAgent(x, y, r * 0.6, { role: 'plan', key: 'morph' }); },
  heroColor: '#e8b04f',
  post() {},
  ones: true,   // smooth UI and camera: motion on 1s
};
