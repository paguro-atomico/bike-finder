// Quiz content: each question has an id, a title, a hint and its options.
// Each option `icon` is a key in icons.js. Option order matters: shared
// result links encode the option index, so append new options at the end.

export const questions = [
  {
    id: "use",
    short: "Riding",
    title: "What will you mostly use the bike for?",
    hint: "Think about your most common scenario — not the occasional exception.",
    options: [
      {
        value: "day",
        icon: "day",
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
        icon: "endurance",
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
        icon: "bikepacking",
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
        icon: "travel",
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
        icon: "racing",
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
    short: "Surface",
    title: "What surfaces do you mostly ride?",
    hint: "Think about your typical week, not an ideal or exceptional outing.",
    options: [
      {
        value: "road",
        icon: "road",
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
        icon: "mixed",
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
        icon: "gravel",
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
        icon: "adventure",
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
    short: "Terrain",
    title: "How rough does the terrain get?",
    hint: "Think about your hardest regular riding, not the hardest day you have ever had.",
    options: [
      {
        value: "smooth",
        icon: "smooth",
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
        icon: "moderate",
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
        icon: "rough",
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
    short: "Priority",
    title: "What matters most to you in a bike?",
    hint: "This shapes material, geometry, and component choices more than almost anything else.",
    options: [
      {
        value: "comfort",
        icon: "comfort",
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
        icon: "balanced",
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
        icon: "speed",
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
        icon: "durability",
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
    short: "Budget",
    title: "What is your budget?",
    hint: "Be realistic — the recommendation adapts to what is actually achievable at each level.",
    options: [
      {
        value: "entry",
        icon: "entry",
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
        icon: "mid",
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
        icon: "high",
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
        icon: "top",
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
