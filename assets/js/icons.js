// Inline line icons (24×24, stroke = currentColor). Keys match option values.

const p = (d) => `<path d="${d}"/>`;
const c = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`;

const paths = {
  // riding use
  day: c(12, 12, 4) + p("M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"),
  endurance: p("M3 17l4-6 4 3 4-7 6 10") + p("M3 21h18"),
  bikepacking: p("M3 20L12 4l9 16z") + p("M12 4v16M8.5 20l3.5-6 3.5 6"),
  travel: p("M2 16l20-7-3-2-7 2-5-4-2 1 3 5-4 1-2-1-1 1z") + p("M3 21h18"),
  racing: p("M5 21V4") + p("M5 4h13l-2 4 2 4H5"),
  // surface
  road: p("M7 21L10 3M17 21L14 3") + p("M12 5v2M12 11v2M12 17v2"),
  mixed: p("M4 21L9 3M20 21L15 3") + p("M12 5v2M12 10v2") + c(11, 17, 0.6) + c(14, 19, 0.6) + c(12, 15.5, 0.6),
  gravel: c(7, 15, 2.5) + c(15, 9, 3) + c(17, 17, 2) + c(8, 7, 1.5),
  adventure: p("M2 20l6-11 4 6 3-4 7 9z") + p("M6.5 12l1.5-3 1.5 2"),
  // terrain
  smooth: p("M2 12h20"),
  moderate: p("M2 13c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3 2.5 3 5 3"),
  rough: p("M2 16l3-6 3 4 3-8 3 7 3-4 3 5 2-2"),
  // priority
  comfort: p("M4 18c0-4 3-7 8-7s8 3 8 7") + p("M7 11V8a5 5 0 0110 0v3") + p("M3 18h18"),
  balanced: p("M12 3v18M5 21h14") + p("M4 8h16") + p("M4 8l-2 6h4zM20 8l-2 6h4z"),
  speed: p("M13 2L4 14h7l-1 8 9-12h-7z"),
  durability: c(12, 12, 3) + p("M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"),
  // budget
  entry: c(12, 12, 8) + p("M15 9.5a3 3 0 100 5M8 11h5M8 13h5"),
  mid: c(9, 12, 6) + p("M15.5 6.5a6 6 0 010 11"),
  high: c(8, 12, 5) + p("M13 7.7a5 5 0 010 8.6M17 7.7a5 5 0 010 8.6"),
  top: p("M12 2l3 7 7 .7-5.3 4.7L18 22l-6-3.7L6 22l1.3-7.6L2 9.7 9 9z"),
  // ui
  arrowRight: p("M5 12h14M13 6l6 6-6 6"),
  arrowLeft: p("M19 12H5M11 6l-6 6 6 6"),
  check: p("M5 12l5 5 9-11"),
  x: p("M6 6l12 12M18 6L6 18"),
  link: p("M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1") + p("M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"),
  print: p("M6 9V3h12v6M6 18H4v-7h16v7h-2") + p("M6 14h12v7H6z"),
  restart: p("M3 12a9 9 0 109-9 9.7 9.7 0 00-6.7 2.7L3 8") + p("M3 3v5h5"),
  info: c(12, 12, 9) + p("M12 11v6M12 7.5v.5"),
  plus: p("M12 5v14M5 12h14"),
};

export function icon(name, size = 24, cls = "") {
  return `<svg class="icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ""}</svg>`;
}
