// Recommendation engine — pure functions, no DOM.
// Every scoring rule is data: when it matches the answers it adds points to a
// geometry and/or frame material and carries a human-readable reason, so the
// result page can explain *why* it recommends what it does.

import { narratives } from "./content.js";

export const GEOMETRIES = ["endurance", "race", "adventure"]; // order = tie-break priority
export const MATERIALS = ["aluminum", "steel", "carbon", "titanium"];

const is = (key, ...values) => (a) => values.includes(a[key]);
const all = (...preds) => (a) => preds.every((p) => p(a));

export const RULES = [
  // ---- riding use
  { when: is("use", "racing"), geo: { race: 3 }, mat: { carbon: 3 }, why: "You race or train for performance" },
  { when: is("use", "endurance"), geo: { endurance: 2 }, why: "Long days and endurance events" },
  { when: is("use", "day"), geo: { endurance: 2 }, why: "Day rides and fitness loops" },
  { when: is("use", "bikepacking"), geo: { adventure: 3 }, mat: { steel: 2, titanium: 1 }, why: "You carry a load for days" },
  { when: is("use", "travel"), geo: { adventure: 2, endurance: 1 }, mat: { steel: 2, titanium: 2 }, why: "You travel with the bike, far from your shop" },
  // ---- surface
  { when: is("surface", "road"), geo: { race: 2 }, why: "Most of your riding is on tarmac" },
  { when: is("surface", "mixed"), geo: { endurance: 2 }, why: "A real tarmac / gravel split" },
  { when: is("surface", "gravel"), geo: { endurance: 1, adventure: 1 }, why: "Mostly unpaved surfaces" },
  { when: is("surface", "adventure"), geo: { adventure: 3 }, why: "Fully off-road, remote routes" },
  // ---- terrain
  { when: is("terrain", "smooth"), geo: { race: 1 }, why: "Smooth, predictable terrain" },
  { when: is("terrain", "rough"), geo: { adventure: 2 }, why: "Rough, technical terrain" },
  // ---- priority
  { when: is("priority", "speed"), geo: { race: 2 }, mat: { carbon: 3 }, why: "Performance is your priority" },
  { when: is("priority", "comfort"), geo: { endurance: 2 }, why: "Comfort over long hours is your priority" },
  { when: is("priority", "balanced"), geo: { endurance: 1 }, mat: { carbon: 1, aluminum: 1 }, why: "You want a versatile all-rounder" },
  { when: is("priority", "durability"), geo: { adventure: 1 }, mat: { steel: 2, titanium: 2 }, why: "Longevity and repairability come first" },
  // ---- budget
  { when: is("budget", "entry"), mat: { aluminum: 4 }, why: "Budget under €1,500" },
  { when: is("budget", "mid"), mat: { aluminum: 2, carbon: 1, steel: 1 }, why: "Budget €1,500–3,500" },
  { when: is("budget", "high"), mat: { carbon: 2, steel: 1, titanium: 1 }, why: "Budget €3,500–6,000" },
  { when: is("budget", "top"), mat: { titanium: 3, carbon: 2 }, why: "Budget above €6,000" },
  // ---- combinations
  {
    when: all(is("terrain", "rough"), is("use", "bikepacking", "travel")),
    mat: { steel: 1 },
    why: "Rough terrain while loaded or travelling",
  },
];

function score(answers, dimension, keys) {
  const totals = Object.fromEntries(keys.map((k) => [k, 0]));
  const reasons = Object.fromEntries(keys.map((k) => [k, []]));
  for (const rule of RULES) {
    const pts = rule[dimension];
    if (!pts || !rule.when(answers)) continue;
    for (const [k, v] of Object.entries(pts)) {
      totals[k] += v;
      reasons[k].push({ why: rule.why, points: v });
    }
  }
  // Highest score wins; ties resolved by the order of `keys`.
  const winner = keys.reduce((best, k) => (totals[k] > totals[best] ? k : best), keys[0]);
  const max = Math.max(1, ...Object.values(totals));
  const ranking = keys
    .map((k) => ({ key: k, points: totals[k], share: totals[k] / max }))
    .sort((a, b) => b.points - a.points);
  return { winner, ranking, reasons: reasons[winner].sort((a, b) => b.points - a.points) };
}

function clearanceFor({ use, surface, terrain }) {
  if (terrain === "rough" || surface === "adventure" || use === "bikepacking") return 50;
  if (terrain === "moderate" || surface === "gravel") return 45;
  return 40;
}

function tiresFor({ use, surface, terrain }, clearance) {
  if (clearance >= 50) {
    return use === "bikepacking"
      ? "47–50mm (or 650b × 2.0–2.1\") with a reinforced casing and real tread — loaded weight punishes thin sidewalls"
      : "47–50mm with an aggressive, open tread — grip and cut protection beat rolling speed here";
  }
  if (clearance >= 45) {
    return terrain === "smooth"
      ? "40–45mm with a fast centre and small shoulder knobs"
      : "40–45mm with a moderate knob pattern and sidewall protection";
  }
  return surface === "road"
    ? "35–40mm semi-slick — run it tubeless at gravel pressures for comfort without losing pace"
    : "38–42mm file-tread or semi-slick";
}

function drivetrainFor({ use, priority, budget }) {
  const highBudget = budget === "high" || budget === "top";
  if (priority === "speed" && highBudget)
    return "2× electronic (GRX Di2 or Force/Red AXS) — finer cadence control across varied terrain at race pace";
  if (priority === "speed")
    return "1× with a 42–44t chainring for road efficiency, or 2× mechanical if cadence precision is the priority";
  if (priority === "durability")
    return "1× mechanical — fewer dependencies, fixable almost anywhere with basic tools, no battery to manage";
  if (use === "racing")
    return "1× or 2× electronic — electronic shifting pays back over a long race day, especially for 2× indexing stability";
  if (use === "bikepacking" || use === "travel")
    return budget === "entry"
      ? "1× mechanical with a 38–40t ring and 50–52t max sprocket — simple, reliable, and easy to fix remotely"
      : "1× wireless electronic (SRAM AXS works well for bikepacking — swappable independent batteries)";
  if (budget === "entry")
    return "1× mechanical (GRX 400 or SRAM Apex) — build here and upgrade the groupset later when the rest of the bike is dialed";
  return "1× electronic (GRX Di2 or SRAM Rival AXS) — the best balance of simplicity, weight, and long-term shifting consistency";
}

function wheelsFor({ use, priority, budget }, geometry) {
  if (budget === "entry") return "Aluminum, 23–25mm internal width — solid baseline, upgrade later";
  if (geometry === "adventure" || use === "bikepacking")
    return "Aluminum, 25–28mm internal width, shallow profile (25–30mm) — durability and repairability over weight";
  if (use === "travel")
    return "Aluminum or entry carbon, 25mm internal — check hookless compatibility if carbon, and always travel with a spare tubeless valve";
  if (priority === "speed" && (budget === "high" || budget === "top"))
    return "Carbon, 25mm internal width, 30–40mm profile — real aero gains without excessive crosswind sensitivity";
  return "Mid-range carbon or quality aluminium, 25mm internal width — consider an upgrade if OEM wheels feel soft";
}

function lookFor({ use, priority }, { geometry, material, clearance }) {
  const touring = use === "bikepacking" || use === "travel";
  const list = [];
  if (clearance >= 50) list.push("Minimum 50mm tire clearance — verify at both the chainstay and the fork crown");
  else if (clearance >= 45) list.push("Minimum 45mm tire clearance for comfortable use on gravel terrain");
  else list.push("At least 40mm clearance — leaves room to go wider when your riding changes");
  list.push("UDH-compatible derailleur hanger — universal spares, no frame-specific sourcing anywhere in the world");
  list.push("Hydraulic disc brakes — not a compromise worth making on any serious gravel build");
  if (touring) {
    list.push("Three mounting points per fork leg — the minimum for meaningful cargo capacity");
    list.push("Frame-bag compatibility — internal routing and top-tube shape can block some bags");
  }
  if (material === "titanium" || material === "steel")
    list.push("Threaded BB (BSA 68mm or T47) — simple to service with universally available tools");
  if (priority === "durability" || touring)
    list.push("A spare derailleur hanger in your kit — UDH makes sourcing one trivial");
  if (geometry === "race" || priority === "speed")
    list.push("Reach and stack checked against your current fit before committing to a frame");
  return list;
}

function avoidList({ use, priority, budget }, { geometry, material }) {
  const touring = use === "bikepacking" || use === "travel";
  const list = [];
  if (!touring && geometry !== "adventure")
    list.push("Integrated cockpits, unless you have a professional fit as a precise reference");
  if (budget === "entry" || budget === "mid")
    list.push("Press-fit bottom brackets at this price — servicing complexity and creaking risk");
  if (geometry !== "adventure" && priority !== "durability")
    list.push("Deep-section (50mm+) carbon rims on rough or gusty terrain — crosswind instability is a real safety issue");
  if (touring) {
    list.push("Hookless carbon rims on a touring build — tire compatibility limits become a liability when you can't choose your replacement");
    list.push("Forks with fewer than three mounts per leg — one missing mount limits cargo disproportionately");
  }
  if (priority === "durability")
    list.push("Electronic shifting on a tight budget — batteries and firmware add dependencies far from infrastructure");
  if (material === "carbon" && touring)
    list.push("Used carbon for adventure or travel without a professional inspection — internal damage is invisible");
  return list;
}

export const GEOMETRY_INFO = {
  race: { label: "Race / all-road", title: "Performance gravel bike", blurb: "Lower stack, longer reach, quick handling." },
  endurance: { label: "Endurance gravel", title: "Endurance gravel bike", blurb: "Taller front end, stable, all-day position." },
  adventure: { label: "Adventure / loaded", title: "Adventure & bikepacking build", blurb: "Long wheelbase, mounts everywhere, stable under load." },
};

export function isComplete(answers, questions) {
  return questions.every((q) => q.options.some((o) => o.value === answers[q.id]));
}

export function recommend(answers) {
  const geo = score(answers, "geo", GEOMETRIES);
  const mat = score(answers, "mat", MATERIALS);
  const geometry = geo.winner;
  const material = mat.winner;
  const clearance = clearanceFor(answers);
  const ctx = { geometry, material, clearance };
  return {
    geometry,
    material,
    title: GEOMETRY_INFO[geometry].title,
    geometryLabel: GEOMETRY_INFO[geometry].label,
    narrative: narratives[geometry][material],
    clearance,
    tires: tiresFor(answers, clearance),
    drivetrain: drivetrainFor(answers),
    wheels: wheelsFor(answers, geometry),
    lookFor: lookFor(answers, ctx),
    avoid: avoidList(answers, ctx),
    scores: { geometry: geo, material: mat },
  };
}

// Compact, shareable encoding: one character per answer (option index).
export function encodeAnswers(answers, questions) {
  return questions.map((q) => q.options.findIndex((o) => o.value === answers[q.id])).join("");
}

export function decodeAnswers(code, questions) {
  if (typeof code !== "string" || code.length !== questions.length) return null;
  const answers = {};
  for (const [i, q] of questions.entries()) {
    const opt = q.options[Number(code[i])];
    if (!opt) return null;
    answers[q.id] = opt.value;
  }
  return answers;
}
