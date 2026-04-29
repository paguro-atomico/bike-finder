# cycling-tool.github.io
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gravel Bike Finder</title>
<style>
:root {
  --bg: #ffffff;
  --bg-secondary: #f6f6f4;
  --bg-accent: #E1F5EE;
  --text: #1a1a18;
  --text-secondary: #5e5e5a;
  --text-hint: #9a9a94;
  --border: rgba(0,0,0,0.11);
  --border-strong: rgba(0,0,0,0.22);
  --accent: #1D9E75;
  --accent-dark: #0F6E56;
  --accent-light: #E1F5EE;
  --accent-border: #9FE1CB;
  --danger: #D85A30;
  --radius-md: 8px;
  --radius-lg: 12px;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1c1c1a;
    --bg-secondary: #252523;
    --text: #edede8;
    --text-secondary: #9a9a94;
    --text-hint: #606060;
    --border: rgba(255,255,255,0.09);
    --border-strong: rgba(255,255,255,0.18);
    --accent-light: #0a3d2e;
    --accent-border: #1D9E75;
    --accent-dark: #5DCAA5;
    --danger: #F0997B;
  }
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  padding: 2.5rem 1.25rem 4rem;
  line-height: 1.5;
}
.container { max-width: 680px; margin: 0 auto; }

/* header */
.guide-header { margin-bottom: 2.5rem; }
.guide-title { font-size: 22px; font-weight: 500; color: var(--text); margin-bottom: .35rem; }
.guide-sub { font-size: 14px; color: var(--text-secondary); }

/* progress */
.progress-bar { display: flex; gap: 5px; margin-bottom: 2.5rem; }
.pip { height: 3px; flex: 1; border-radius: 2px; background: var(--border); transition: background 0.3s; }
.pip.done { background: var(--accent); }
.pip.active { background: var(--text-secondary); }

/* question meta */
.step-label { font-size: 11px; font-weight: 500; color: var(--text-hint); text-transform: uppercase; letter-spacing: .08em; margin-bottom: .5rem; }
.step-title { font-size: 20px; font-weight: 500; color: var(--text); margin-bottom: .4rem; line-height: 1.35; }
.step-hint { font-size: 14px; color: var(--text-secondary); margin-bottom: 1.75rem; }

/* option cards */
.options { display: flex; flex-direction: column; gap: 10px; }
.opt {
  display: flex;
  gap: 16px;
  padding: 18px 20px;
  border: 0.5px solid var(--border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: border-color .15s, background .15s;
  background: var(--bg);
  align-items: flex-start;
  -webkit-tap-highlight-color: transparent;
}
.opt:hover { border-color: var(--border-strong); background: var(--bg-secondary); }
.opt.selected { border-color: var(--accent); background: var(--accent-light); }
.opt-icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; line-height: 1; user-select: none; }
.opt-body { flex: 1; min-width: 0; }
.opt-name { font-size: 15px; font-weight: 500; color: var(--text); margin-bottom: 5px; }
.opt.selected .opt-name { color: var(--accent-dark); }
.opt-summary { font-size: 13px; color: var(--text-secondary); margin-bottom: 10px; line-height: 1.6; }
.opt.selected .opt-summary { color: var(--accent-dark); opacity: .85; }
.opt-bullets { list-style: none; display: flex; flex-direction: column; gap: 4px; }
.opt-bullets li { font-size: 12px; color: var(--text-hint); display: flex; gap: 8px; line-height: 1.45; align-items: baseline; }
.opt-bullets li::before { content: "·"; color: var(--accent); font-size: 16px; flex-shrink: 0; line-height: 1; }
.opt.selected .opt-bullets li { color: var(--accent-dark); opacity: .75; }

/* nav */
.nav { display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; }
.nav-count { font-size: 13px; color: var(--text-hint); }
.btn {
  padding: 10px 24px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: 0.5px solid var(--border-strong);
  background: transparent;
  color: var(--text);
  font-family: inherit;
  transition: background .12s;
}
.btn:hover { background: var(--bg-secondary); }
.btn.primary { background: var(--accent); border-color: var(--accent); color: #fff; }
.btn.primary:hover { background: var(--accent-dark); }
.btn:disabled { opacity: .28; cursor: default; pointer-events: none; }

/* result */
.result-header {
  padding: 1.5rem 1.75rem;
  border-radius: var(--radius-lg);
  background: var(--accent-light);
  border: 0.5px solid var(--accent-border);
  margin-bottom: 1.25rem;
}
.result-eyebrow { font-size: 11px; font-weight: 500; color: var(--accent); text-transform: uppercase; letter-spacing: .08em; margin-bottom: .5rem; }
.result-title { font-size: 22px; font-weight: 500; color: var(--accent-dark); margin-bottom: .75rem; }
.result-narrative { font-size: 14px; color: var(--accent-dark); opacity: .9; line-height: 1.7; }

.specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 1.25rem; }
.spec-card { background: var(--bg-secondary); border-radius: var(--radius-md); padding: 14px 16px; }
.spec-label { font-size: 11px; color: var(--text-hint); text-transform: uppercase; letter-spacing: .07em; margin-bottom: 5px; font-weight: 500; }
.spec-value { font-size: 14px; font-weight: 500; color: var(--text); line-height: 1.4; }

.rec-block { border: 0.5px solid var(--border); border-radius: var(--radius-lg); padding: 16px 20px; margin-bottom: 10px; }
.rec-block-title { font-size: 11px; font-weight: 500; color: var(--text-hint); text-transform: uppercase; letter-spacing: .07em; margin-bottom: 12px; }
.rec-list { list-style: none; display: flex; flex-direction: column; gap: 9px; }
.rec-list li { font-size: 14px; color: var(--text); display: flex; gap: 10px; line-height: 1.6; align-items: baseline; }
.rec-list li::before { content: "→"; color: var(--accent); flex-shrink: 0; font-weight: 500; }
.avoid-list li::before { content: "✕"; color: var(--danger); flex-shrink: 0; font-weight: 500; }

.restart-area { text-align: center; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 0.5px solid var(--border); }
.restart-area p { font-size: 13px; color: var(--text-hint); margin-bottom: .75rem; }

@media (max-width: 480px) {
  .specs-grid { grid-template-columns: 1fr; }
  .step-title { font-size: 18px; }
  body { padding: 1.5rem 1rem 3rem; }
}
</style>
</head>
<body>
<div class="container">
  <div class="guide-header">
    <div class="guide-title">Gravel Bike Finder</div>
    <div class="guide-sub">Answer five questions to get a build recommendation tailored to how you actually ride.</div>
  </div>
  <div class="progress-bar" id="progress"></div>
  <div id="quiz"></div>
</div>

<script>
const questions = [
  {
    id: "use",
    label: "Step 1 of 5",
    title: "What will you mostly use the bike for?",
    hint: "Think about your most common scenario — not the occasional exception.",
    options: [
      {
        value: "day",
        icon: "☀",
        name: "Day rides and fitness",
        summary: "Regular rides from home — fitness loops, weekend escapes, social rides with friends. You return the same day and the bike carries little more than a small saddle bag and a couple of water bottles.",
        bullets: [
          "No overnight logistics or cargo capacity required",
          "Moderate load — mounting points are a convenience, not a necessity",
          "Route variety and ride feel matter more than long-haul endurance"
        ]
      },
      {
        value: "endurance",
        icon: "🗺",
        name: "Long days and endurance events",
        summary: "Fondos, gravel races, long-distance unsupported rides. You spend many hours — sometimes an entire day — in the saddle, and how you feel at hour six matters as much as how fast you go at hour one.",
        bullets: [
          "Events like Gravel Kings, L'Eroica, Unbound Gravel, or similar",
          "On-bike nutrition storage and hydration planning are part of the equation",
          "Saddle, handlebar position, and vibration damping become critical at this duration"
        ]
      },
      {
        value: "bikepacking",
        icon: "⛺",
        name: "Bikepacking and multi-day touring",
        summary: "Overnight or multi-day self-supported trips where the bike carries your shelter, food, clothing, and tools. Frame bags, fork bags, and a handlebar roll are part of the standard kit. The ability to fix a mechanical far from a shop is not optional — it is part of the spec.",
        bullets: [
          "Frame bag, fork bags, handlebar bag as baseline — fork mounts are non-negotiable",
          "Repairability and parts availability along the route matter",
          "Geometry should remain stable and comfortable under full load"
        ]
      },
      {
        value: "travel",
        icon: "✈",
        name: "Bike travel and destination riding",
        summary: "You pack the bike into a travel case and fly or train to the riding. Destinations vary — sometimes flat wine roads in Italy, sometimes rough gravel in the Balkans, sometimes singletrack in Scotland. The bike must handle whatever turns up without requiring specialist parts you can't source locally.",
        bullets: [
          "Must fit in a travel case — thru-axle spec and pedal compatibility matter",
          "Adapts to unknown roads: paved, gravel, rough track, loaded day rides",
          "Reliability is critical — local LBS support may not be available"
        ]
      },
      {
        value: "racing",
        icon: "🏁",
        name: "Racing and competing",
        summary: "Gravel races, timed fondos, or structured training with a power meter and performance targets. You measure progress, plan training blocks, and want the bike to give every advantage within your category. Marginal gains are worth pursuing because you are genuinely chasing them.",
        bullets: [
          "Weight, stiffness, and aerodynamics are real variables at this level",
          "Electronic shifting and quality components pay back over long race days",
          "Fit precision matters — a few millimetres of reach or saddle height makes a difference"
        ]
      }
    ]
  },
  {
    id: "surface",
    label: "Step 2 of 5",
    title: "What surfaces do you mostly ride?",
    hint: "Think about your typical week, not an ideal or exceptional outing.",
    options: [
      {
        value: "road",
        icon: "🛣",
        name: "Mostly tarmac",
        summary: "Seventy percent or more of your riding is on paved roads, bike paths, or well-maintained cycleways. Gravel sections are occasional — a connection between paved segments rather than the destination itself.",
        bullets: [
          "Aerodynamics and rolling efficiency matter more than off-road capability",
          "A narrower, more road-biased tire (35–40mm) performs better on pavement",
          "Occasional gravel does not require wide, aggressive tires or a very slack geometry"
        ]
      },
      {
        value: "mixed",
        icon: "◑",
        name: "Roughly half and half",
        summary: "A genuine split — you ride roads to reach gravel sections, or your routes naturally alternate between paved and unpaved. Neither surface dominates enough to make a single-surface optimization worthwhile.",
        bullets: [
          "Versatility is the priority — no extreme trade-offs in either direction",
          "A 40–47mm tire handles both surfaces well without compromise",
          "Endurance geometry manages both comfortably over long days"
        ]
      },
      {
        value: "gravel",
        icon: "🪨",
        name: "Mostly gravel and unpaved",
        summary: "Seventy percent or more is unpaved — gravel roads, forest tracks, dirt paths, and farm lanes. Tarmac exists mainly to connect gravel sections, not as a destination in itself.",
        bullets: [
          "Wider tires at lower pressures become meaningfully better, not marginally better",
          "Stability on loose, variable surfaces matters more than road efficiency",
          "Tread pattern and casing choice have measurable impact on grip and confidence"
        ]
      },
      {
        value: "adventure",
        icon: "🏔",
        name: "Fully off-road and remote",
        summary: "Everything is unpaved. You ride remote mountain tracks, rough singletrack, high-altitude gravel, and routes where you may not see another person for hours. Road behavior is essentially irrelevant to how you use the bike.",
        bullets: [
          "Maximum tire clearance is a hard requirement, not a nice-to-have",
          "Robust and repairable build — you may be hours from any assistance",
          "Fork cargo mounts, frame strength, and a stable loaded geometry take priority"
        ]
      }
    ]
  },
  {
    id: "terrain",
    label: "Step 3 of 5",
    title: "How rough does the terrain get?",
    hint: "Think about your hardest regular riding, not the hardest day you have ever had.",
    options: [
      {
        value: "smooth",
        icon: "〰",
        name: "Smooth and predictable",
        summary: "White roads, compacted gravel paths, flat or gently rolling cycleways, well-maintained forest tracks. Surfaces are consistent — you can hold a line without actively managing what is happening underwheel.",
        bullets: [
          "Semi-slick or lightly knobbed tires offer the best rolling efficiency here",
          "Tire width is chosen for comfort and air volume rather than grip",
          "No need for aggressive tread, reinforced sidewalls, or maximum clearance"
        ]
      },
      {
        value: "moderate",
        icon: "〜",
        name: "Moderately rough",
        summary: "Gravel roads with loose sections, forest tracks with some ruts and embedded rocks, occasional rough descents. Demanding enough that a narrow, fragile tire is a liability — but not so rough that maximum clearance or an aggressive MTB-style tread is required.",
        bullets: [
          "40–47mm tires with moderate knob pattern and decent casing handle this well",
          "Sidewall protection is worthwhile on this kind of terrain",
          "Stable geometry improves confidence without sacrificing road efficiency"
        ]
      },
      {
        value: "rough",
        icon: "⛰",
        name: "Rough and technical",
        summary: "Rocky tracks, loose shale, gnarly gravel with large embedded rocks, rooted forest trails, exposed ridge paths with unpredictable surfaces. You regularly deal with sections that demand active line choice and a bike that can take a hit.",
        bullets: [
          "50mm+ tires with real tread pattern — semi-slicks will slide and get cut",
          "Frame clearance and fork strength matter — check both chainstay and crown clearance",
          "Low centre of gravity and stable handling geometry are priorities here"
        ]
      }
    ]
  },
  {
    id: "priority",
    label: "Step 4 of 5",
    title: "What matters most to you in a bike?",
    hint: "This shapes material, geometry, and component choices more than almost anything else.",
    options: [
      {
        value: "comfort",
        icon: "🛋",
        name: "Comfort and all-day endurance",
        summary: "You want to feel good at hour five. Vibration damping, a forgiving ride quality, and a sustainable position matter more than shaving seconds on a Strava segment. Long days should feel manageable, not punishing — and the bike should help you get there.",
        bullets: [
          "Compliant frame geometry and seatpost choice reduce fatigue over distance",
          "Endurance geometry with a high stack is the foundation",
          "Tire choice and pressure have the biggest single impact on comfort — and cost nothing"
        ]
      },
      {
        value: "balanced",
        icon: "⚖",
        name: "A versatile all-rounder",
        summary: "You want a bike that does everything reasonably well. Fast enough on the road, capable on rough gravel, comfortable for long days. You are not optimizing for any single scenario — you want to cover as many situations as possible without obvious weak spots.",
        bullets: [
          "Endurance geometry at a sensible reach and stack for your body",
          "42–47mm tire width covers most situations without extreme trade-offs",
          "Electronic shifting is worth the premium at this priority level"
        ]
      },
      {
        value: "speed",
        icon: "⚡",
        name: "Performance and efficiency",
        summary: "Every watt counts. You want the lightest, stiffest, most aerodynamically efficient setup your budget allows. You are willing to accept marginal comfort trade-offs in exchange for measurable speed gains.",
        bullets: [
          "Carbon frame and wheels are the biggest performance levers",
          "Race geometry — lower stack, longer reach — for a more aggressive position",
          "2× drivetrain can give finer cadence control on variable terrain at race pace"
        ]
      },
      {
        value: "durability",
        icon: "🔩",
        name: "Longevity and repairability",
        summary: "You want a bike that lasts decades, survives rough use, and can be fixed almost anywhere in the world with basic tools and materials. You are thinking about this as a long-term investment in a tool you plan to ride for the rest of your life — not something you will replace in three years.",
        bullets: [
          "Steel and titanium are the frame materials to consider — both are repairable by welders worldwide",
          "Threaded BB standards (BSA 68mm or T47) for easy, universal servicing",
          "Mechanical groupset: simpler, fixable far from a bike shop with minimal tools"
        ]
      }
    ]
  },
  {
    id: "budget",
    label: "Step 5 of 5",
    title: "What is your budget?",
    hint: "Be realistic — the recommendation adapts to what is actually achievable at each level.",
    options: [
      {
        value: "entry",
        icon: "💶",
        name: "Under €1,500",
        summary: "Entry level. Aluminum frames, mechanical groupsets (GRX 400, SRAM Apex), and basic hydraulic disc brakes. More than enough to start riding seriously and learn what you actually want. The biggest gains at this tier come from upgrading tires and saddle — not the frame.",
        bullets: [
          "Aluminum frame with GRX 400 or Apex mechanical as baseline",
          "Hydraulic disc brakes are a minimum — do not compromise here",
          "Wheelset and groupset are natural upgrade targets as budget allows"
        ]
      },
      {
        value: "mid",
        icon: "💶💶",
        name: "€1,500 – €3,500",
        summary: "Mid range — where value-to-performance peaks for most riders. Premium aluminum or entry carbon frames, GRX 600 or 800 mechanical, or entry electronic (GRX Di2, Rival AXS). Steel and titanium custom builds become viable toward the upper end of this range. A wheelset upgrade typically has a bigger immediate impact than the frame material.",
        bullets: [
          "The best bang-for-buck tier overall for most gravel riders",
          "Electronic shifting becomes a realistic choice, not a luxury",
          "A €400–600 aftermarket wheelset transforms bikes bought at this level"
        ]
      },
      {
        value: "high",
        icon: "💶💶💶",
        name: "€3,500 – €6,000",
        summary: "High end. Quality carbon frame, electronic groupset (Di2 or AXS), better wheels included as original equipment. Performance differences from mid range are real but incremental — you are paying for build quality, weight reduction, and component refinement. Steel and titanium custom builds from good builders also sit comfortably here.",
        bullets: [
          "Carbon frame with decent OEM wheels as standard, or steel/ti custom builds",
          "Di2 or AXS is the baseline at this level",
          "A professional fit before buying makes sense at this price point"
        ]
      },
      {
        value: "top",
        icon: "✦",
        name: "Above €6,000",
        summary: "No meaningful compromises. Custom geometry, top-tier carbon, or titanium from specialist builders (Moots, Shand, Curve, Seven, Ti Cycles). Makes sense if you have ridden extensively, know your geometry numbers, and have a precise build target in mind — not where most people should start.",
        bullets: [
          "Titanium custom builds, top-tier carbon with proper lay-up at this price",
          "Full AXS Red or top-tier Di2 as the baseline",
          "Get a professional fit before specifying anything — changes are expensive later"
        ]
      }
    ]
  }
];

const matDescs = {
  carbon: {
    label: "Carbon fiber",
    reason: "The right call for your profile. Carbon is engineered for selective compliance — a well-designed carbon frame can absorb more vibration than a stiff aluminum one while staying lighter and stiffer where it counts. Worth the investment at this budget and priority level. If buying used, always tap-test and inspect carefully — internal delamination is invisible."
  },
  steel: {
    label: "Steel (chromoly)",
    reason: "An excellent match for your priorities. Chromoly steel is repairable almost anywhere in the world by any welder — a genuine consideration if you ride remote routes or travel. The ride quality is distinctive: more compliant than aluminum, with a natural liveliness. A few hundred grams heavier, but a trade-off that makes complete sense given how and where you ride."
  },
  titanium: {
    label: "Titanium",
    reason: "The long-term investment play, and the right one for your profile. Titanium is effectively corrosion-proof, practically eternal as a frame material, light enough to be competitive, and has a ride quality that no other material quite replicates. Custom builders (Shand, Moots, Seven, Curve, Enigma) are the way in. Plan for a longer lead time and specify geometry carefully — this is ideally the last frame you buy."
  },
  aluminum: {
    label: "Aluminum",
    reason: "The sensible and capable choice at this budget. Modern alloy frames are lighter than you might expect, stiff, and straightforward to service. The right platform to build on and upgrade over time — put the money saved on the frame into a better wheelset, which will have a bigger immediate impact on how the bike feels."
  }
};

const narratives = {
  race: {
    carbon: "A performance-oriented gravel build centered on efficiency. Carbon keeps weight low and stiffness high — those gains compound over a long race day and on sustained road transitions between gravel sections. Get the fit dialed precisely before committing: at this level, a few millimetres of reach or saddle height makes a measurable difference.",
    aluminum: "A capable race build on a realistic budget. Modern aluminum frames are genuinely competitive — the material has improved significantly. Put the money saved on the frame into a quality wheelset and a good groupset: both will feel more significant on race day than the frame material alone.",
    steel: "An unconventional but legitimate race choice for long-distance events. Steel's natural compliance reduces fatigue over very long days — relevant at events like Unbound or other 200km+ races. You give up a few hundred grams but gain a ride quality that is genuinely harder to match with aluminum at any price.",
    titanium: "A lifetime race bike. Titanium handles well, stays light enough to be properly competitive, and never needs replacing. A custom geometry build from a specialist is the right approach — this is a bike you specify once with exact numbers and ride for decades. Plan carefully and it will outlast everything else you own."
  },
  endurance: {
    carbon: "A quality endurance build centered on comfort and efficiency over long days. Carbon's ability to be engineered for selective compliance means a good frame in this category genuinely absorbs more vibration than a stiff aluminum alternative — not just a marketing claim when the lay-up is designed for it. Worth the investment at this budget level.",
    aluminum: "A well-sorted aluminum endurance bike is genuinely excellent. The money saved on the frame is better directed toward a quality saddle, tires at the right pressure, and a wheelset upgrade — all of which have a bigger measurable impact on day-to-day riding than frame material alone.",
    steel: "Steel endurance bikes reward long days. The natural compliance of the material reduces accumulated fatigue over hours in the saddle, and knowing the bike can be repaired almost anywhere adds a quiet confidence that matters on remote or unsupported routes. A classic and never-wrong choice for this kind of riding.",
    titanium: "A titanium endurance build sits at the top of what gravel cycling can offer. The ride quality is exceptional — a material liveliness that no other frame material quite replicates, combined with the confidence of knowing the frame will outlast everything else on the bike. Plan the build carefully with a custom builder and it becomes a lifetime companion."
  },
  adventure: {
    carbon: "Carbon for serious adventure and bikepacking riding requires careful handling — inspect for damage regularly after rough terrain, carry your repair options with awareness of what carbon cannot self-rescue from, and accept that a severe impact may mean a significant repair bill far from home. The weight advantage is real, but some riders in this category prefer a more field-repairable material for genuine peace of mind.",
    aluminum: "Aluminum is a very sensible and capable adventure platform. Durable, fixable by most bike shops worldwide, stiff enough to handle loaded riding well, and resilient to the kind of knocks that happen on rough tracks. Put budget toward fork mounting points, a quality bag setup, and a reliable groupset rather than chasing frame material.",
    steel: "The classic adventure touring material — for good reasons that have not changed. Chromoly steel is repairable almost anywhere in the world by any welder with basic equipment. The ride quality is excellent under a full load, the material ages gracefully, and the frame will outlast every other component on the bike. For multi-day self-supported riding in remote places, steel makes more practical sense than any other material.",
    titanium: "The ultimate adventure touring platform. Corrosion-proof, effectively eternal, light enough to not be a burden on long approaches, and with a ride quality that genuinely holds up over day after loaded day. A custom titanium tourer from a specialist builder is a serious long-term investment — and the right one for a rider who knows exactly what they want and plans to ride it for the rest of their life."
  }
};

let answers = {};
let step = 0;

function getRecommendation() {
  const u = answers.use, s = answers.surface, t = answers.terrain, p = answers.priority, b = answers.budget;

  let geo = { race: 0, endurance: 0, adventure: 0 };
  if (u === "racing")      { geo.race += 3; }
  if (u === "endurance")   { geo.endurance += 2; }
  if (u === "day")         { geo.endurance += 2; }
  if (u === "bikepacking") { geo.adventure += 3; }
  if (u === "travel")      { geo.adventure += 2; geo.endurance += 1; }
  if (s === "road")        { geo.race += 2; }
  if (s === "mixed")       { geo.endurance += 2; }
  if (s === "gravel")      { geo.endurance += 1; geo.adventure += 1; }
  if (s === "adventure")   { geo.adventure += 3; }
  if (t === "rough")       { geo.adventure += 2; }
  if (t === "smooth")      { geo.race += 1; }
  if (p === "speed")       { geo.race += 2; }
  if (p === "comfort")     { geo.endurance += 2; }
  if (p === "durability")  { geo.adventure += 1; }
  const geoType = Object.keys(geo).reduce((a, k) => geo[k] > geo[a] ? k : a, "endurance");

  let mat = { carbon: 0, steel: 0, titanium: 0, aluminum: 0 };
  if (p === "speed")       { mat.carbon += 3; }
  if (p === "durability")  { mat.steel += 2; mat.titanium += 2; }
  if (u === "racing")      { mat.carbon += 3; }
  if (u === "bikepacking") { mat.steel += 2; mat.titanium += 1; }
  if (u === "travel")      { mat.steel += 2; mat.titanium += 2; }
  if (b === "entry")       { mat.aluminum += 4; }
  if (b === "mid")         { mat.aluminum += 2; mat.carbon += 1; mat.steel += 1; }
  if (b === "high")        { mat.carbon += 2; mat.steel += 1; mat.titanium += 1; }
  if (b === "top")         { mat.titanium += 3; mat.carbon += 2; }
  if (t === "rough" && (u === "bikepacking" || u === "travel")) { mat.steel += 1; }
  const matType = Object.keys(mat).reduce((a, k) => mat[k] > mat[a] ? k : a, "aluminum");

  let clearance = "≥ 40mm";
  if (t === "moderate" || s === "gravel") clearance = "≥ 45mm";
  if (t === "rough" || s === "adventure" || u === "bikepacking") clearance = "≥ 50mm";

  let drivetrain = "";
  if (p === "speed" && (b === "high" || b === "top"))
    drivetrain = "2× electronic (GRX Di2 or Force/Red AXS) — finer cadence control across varied terrain at race pace";
  else if (p === "speed")
    drivetrain = "1× with a 42–44t chainring for road efficiency, or 2× mechanical if cadence precision is the priority";
  else if (p === "durability")
    drivetrain = "1× mechanical — fewer dependencies, fixable almost anywhere with basic tools, no battery to manage";
  else if (u === "racing")
    drivetrain = "1× or 2× electronic — electronic shifting pays back over a long race day, especially for 2× indexing stability";
  else if (u === "bikepacking" || u === "travel")
    drivetrain = b === "entry"
      ? "1× mechanical with a 38–40t ring and 50–52t max sprocket — simple, reliable, and easy to fix remotely"
      : "1× wireless electronic (SRAM AXS preferred for bikepacking — both derailleurs on swappable independent batteries)";
  else if (b === "entry")
    drivetrain = "1× mechanical (GRX 400 or SRAM Apex) — build here and upgrade the groupset later when the rest of the bike is dialed";
  else
    drivetrain = "1× electronic (GRX Di2 or SRAM Rival AXS) — the best balance of simplicity, weight, and long-term shifting consistency";

  let wheels = "";
  if (b === "entry")
    wheels = "Aluminum, 23–25mm internal width — solid baseline, upgrade later";
  else if (geoType === "adventure" || u === "bikepacking")
    wheels = "Aluminum, 25–28mm internal width, shallow profile (25–30mm) — prioritize durability and repairability over weight savings";
  else if (u === "travel")
    wheels = "Aluminum or entry carbon, 25mm internal — check hookless compatibility if buying carbon, and always travel with a spare tubeless valve";
  else if (p === "speed" && (b === "high" || b === "top"))
    wheels = "Carbon, 25mm internal width, 30–40mm profile — meaningful aero gains without excessive crosswind sensitivity";
  else
    wheels = "Mid-range carbon or quality aluminum, 25mm internal width — consider an aftermarket upgrade if OEM wheels feel soft";

  const must = [];
  if (clearance === "≥ 50mm")
    must.push("Minimum 50mm tire clearance — verify at both the chainstay and the fork crown, not just one");
  else if (clearance === "≥ 45mm")
    must.push("Minimum 45mm tire clearance for comfortable use on gravel terrain");
  else
    must.push("At least 40mm clearance — leaves room to go wider when riding conditions change");
  must.push("UDH-compatible derailleur hanger — universal spares, no frame-specific sourcing needed anywhere in the world");
  must.push("Hydraulic disc brakes — not a compromise worth making on any serious gravel build");
  if (u === "bikepacking" || u === "travel") {
    must.push("Three fork mounting points per leg — minimum for meaningful cargo capacity and bag versatility");
    must.push("Frame bag compatibility — internal cable routing can block some bags; check before assuming fit");
  }
  if (matType === "titanium" || matType === "steel")
    must.push("Threaded BB standard (BSA 68mm or T47) — simple to service, universally available tools and cups");
  if (p === "durability" || u === "bikepacking" || u === "travel")
    must.push("Carry a spare derailleur hanger — note your exact spec before travelling, UDH simplifies this considerably");
  if (geoType === "race" || p === "speed")
    must.push("Verify reach and stack numbers against your current fit before committing to the frame");

  const avoid = [];
  if (u !== "bikepacking" && geoType !== "adventure")
    avoid.push("Integrated cockpit unless you have an existing professional fit as a precise reference point");
  if (b === "entry" || b === "mid")
    avoid.push("Press-fit bottom bracket at this price point — sourcing and servicing adds unnecessary complexity and creaking risk");
  if (geoType !== "adventure" && p !== "durability")
    avoid.push("Deep-section carbon wheels (50mm+) on rough or gusty terrain — crosswind instability at speed is a real safety concern");
  if (u === "bikepacking" || u === "travel") {
    avoid.push("Hookless carbon rims on a touring or travel build — tire compatibility restrictions become a liability when you cannot choose your replacement");
    avoid.push("Frames with fewer than three fork mounts per leg — cargo flexibility is disproportionately limited by a single missing mount");
  }
  if (p === "durability")
    avoid.push("Electronic shifting if budget is tight — battery management and firmware dependencies add complexity far from reliable infrastructure");
  if (matType === "carbon" && (u === "bikepacking" || u === "travel"))
    avoid.push("Buying used carbon for adventure or travel use without a professional inspection — internal delamination is invisible and structural failure far from help is serious");

  const geoLabels = {
    race: "Race / all-road geometry",
    endurance: "Endurance gravel geometry",
    adventure: "Adventure / loaded touring geometry"
  };
  const titles = {
    race: "Performance gravel bike",
    endurance: "Endurance gravel bike",
    adventure: "Adventure and bikepacking build"
  };
  const narrative = (narratives[geoType] || {})[matType] || "A well-matched setup for your riding profile — prioritize fit above all else, then tire choice, then groupset.";

  return { geoType, matType, clearance, drivetrain, wheels, must, avoid, narrative, title: titles[geoType], geoLabel: geoLabels[geoType] };
}

function renderProgress() {
  document.getElementById("progress").innerHTML =
    questions.map((_, i) =>
      `<div class="pip ${i < step ? "done" : i === step ? "active" : ""}"></div>`
    ).join("");
}

function renderQuestion() {
  const q = questions[step];
  const sel = answers[q.id];
  document.getElementById("quiz").innerHTML = `
    <div class="step-label">${q.label}</div>
    <div class="step-title">${q.title}</div>
    <div class="step-hint">${q.hint}</div>
    <div class="options">
      ${q.options.map(o => `
        <div class="opt${sel === o.value ? " selected" : ""}" onclick="pick('${q.id}','${o.value}')">
          <div class="opt-icon">${o.icon}</div>
          <div class="opt-body">
            <div class="opt-name">${o.name}</div>
            <div class="opt-summary">${o.summary}</div>
            <ul class="opt-bullets">${o.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
          </div>
        </div>`).join("")}
    </div>
    <div class="nav">
      <button class="btn" ${step === 0 ? "disabled" : ""} onclick="goBack()">Back</button>
      <span class="nav-count">${step + 1} of ${questions.length}</span>
      <button class="btn primary" ${!sel ? "disabled" : ""} onclick="goNext()">Continue</button>
    </div>`;
}

function renderResult() {
  const r = getRecommendation();
  const md = matDescs[r.matType];
  document.getElementById("quiz").innerHTML = `
    <div class="result-header">
      <div class="result-eyebrow">Recommended setup</div>
      <div class="result-title">${r.title}</div>
      <div class="result-narrative">${r.narrative}</div>
    </div>
    <div class="specs-grid">
      <div class="spec-card"><div class="spec-label">Geometry</div><div class="spec-value">${r.geoLabel}</div></div>
      <div class="spec-card"><div class="spec-label">Frame material</div><div class="spec-value">${md.label}</div></div>
      <div class="spec-card"><div class="spec-label">Minimum tire clearance</div><div class="spec-value">${r.clearance}</div></div>
      <div class="spec-card"><div class="spec-label">Wheels</div><div class="spec-value">${r.wheels}</div></div>
    </div>
    <div class="rec-block">
      <div class="rec-block-title">Why ${md.label}</div>
      <ul class="rec-list"><li>${md.reason}</li></ul>
    </div>
    <div class="rec-block">
      <div class="rec-block-title">Drivetrain recommendation</div>
      <ul class="rec-list"><li>${r.drivetrain}</li></ul>
    </div>
    <div class="rec-block">
      <div class="rec-block-title">Look for</div>
      <ul class="rec-list">${r.must.map(m => `<li>${m}</li>`).join("")}</ul>
    </div>
    <div class="rec-block">
      <div class="rec-block-title">Avoid</div>
      <ul class="rec-list avoid-list">${r.avoid.map(m => `<li>${m}</li>`).join("")}</ul>
    </div>
    <div class="restart-area">
      <p>Different scenario? Start over and try a different combination.</p>
      <button class="btn" onclick="restart()">Start over</button>
    </div>`;
}

function render() {
  renderProgress();
  step >= questions.length ? renderResult() : renderQuestion();
}

function pick(id, val) { answers[id] = val; render(); }
function goBack() { if (step > 0) { step--; render(); } }
function goNext() { if (answers[questions[step].id]) { step++; render(); } }
function restart() { answers = {}; step = 0; render(); }

render();
</script>
</body>
</html>