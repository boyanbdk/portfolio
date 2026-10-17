
// =====================================================================
//  ERAS, CAMERAS — no morph bridges: the dive and the return are hard cuts (scale-in / match on the site card)
// =====================================================================
const ERA_BG = ['#16120e', '#110e0b', '#16120e'];
const BRIDGES = [];
// era 1: one solo shot per agent. [t, zoom, [world x, world y] put on the screen centre], sprung between (no cuts)
const CAM1 = [
  [0, 1.0, [960, 560]],                 // the team drops in, well apart
  [CU.plan, 1.55, [520, 470]],          // PLAN: the bulb, "Got it, Boyan!", the ideas
  [CU.code - 0.25, 1.3, [720, 560]],    // CODE: code arcs into the walls
  [CU.design, 1.15, [990, 520]],        // DESIGN: painting row by row
  [CU.qa, 2.0, [1350, 730]],            // QA: extreme close-up on the last card's price
  [CU.ship, 1.25, [960, 535]],          // shipped: the whole site, big, the team around it
  [CU.pull, 0.45, [960, 530]],          // pull back: the site shrinks to the reply card
];
function camFocus() {
  return [springTrack(CAM1.map(([k, z]) => [k, z])), springTrack(CAM1.map(([k, , p]) => [k, p[0]])), springTrack(CAM1.map(([k, , p]) => [k, p[1]]))];
}
function pieceCam(era, t) {
  if (era === 0) return push(t, CU.zoom, T_DIVE, { z: 3.2, p: [680, 548], to: [W / 2, H / 2] });
  if (era !== 1) return null;
  const [z, px, py] = camFocus();
  return camOf({ z, p: [px, py], to: [W / 2, H / 2] });
}
