// UI layer: hash routing + rendering. All logic lives in engine.js.
//
// Routes
//   #/          landing
//   #/q/<n>     question n (1-based)
//   #/r/<code>  result for an encoded set of answers (shareable)

import { questions } from "./questions.js";
import { materials } from "./content.js";
import { icon } from "./icons.js";
import {
  recommend, encodeAnswers, decodeAnswers, GEOMETRY_INFO,
} from "./engine.js";

const view = document.getElementById("view");
let answers = {};
let advanceTimer = null;

const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
const go = (hash) => { location.hash = hash; };
const firstUnanswered = () => questions.findIndex((q) => !answers[q.id]);

// ---------------------------------------------------------------- landing
function renderHome() {
  view.className = "view view-home";
  view.innerHTML = `
    <section class="hero">
      <p class="eyebrow">Gravel bike finder</p>
      <h1 class="hero-title">Ride the bike<br>your roads <em>ask for.</em></h1>
      <p class="hero-sub">Five honest questions about how you really ride. One spec sheet back: geometry, frame material, tire clearance, drivetrain — and the traps to avoid.</p>
      <div class="hero-actions">
        <a class="btn btn-primary btn-lg" href="#/q/1">Start the finder ${icon("arrowRight", 20)}</a>
        <span class="hero-meta">5 questions · about 2 minutes · no sign-up</span>
      </div>
    </section>

    <section class="steps" aria-label="How it works">
      ${[
        ["01", "Tell us how you ride", "Use, surface, terrain, priorities and budget — your typical week, not your dream ride."],
        ["02", "Get a spec sheet", "Geometry, material, clearance, tires, drivetrain and wheels, with the reasoning shown."],
        ["03", "Shop with a checklist", "Know what to look for and what to avoid before you walk into a shop."],
      ].map(([n, t, d]) => `
        <article class="step-card">
          <span class="step-num">${n}</span>
          <h2>${t}</h2>
          <p>${d}</p>
        </article>`).join("")}
    </section>

    <section class="roadmap-teaser">
      <div>
        <p class="eyebrow">Coming next</p>
        <h2>Real bikes, real rider feedback.</h2>
        <p>We're building the next stage: matching your spec sheet to actual models, and scoring them from aggregated reviews and rider feedback — tires, wheels and components to follow.</p>
      </div>
      <ul class="teaser-list">
        <li>${icon("check", 18)} Bikes that match your sheet</li>
        <li>${icon("check", 18)} Review scores from many sources, in one place</li>
        <li>${icon("check", 18)} Side-by-side comparisons</li>
      </ul>
    </section>`;
}

// ---------------------------------------------------------------- progress (elevation profile)
const PROFILE = "M0,62 C40,60 60,40 100,44 S160,58 200,40 S260,12 300,22 S360,50 400,38 S460,8 500,18 S560,40 600,30";

function renderProfile(step) {
  const n = questions.length;
  const xs = questions.map((_, i) => Math.round(((i + 0.5) / n) * 600));
  const fillTo = step >= n ? 600 : xs[step];
  return `
    <div class="profile" role="progressbar" aria-valuemin="1" aria-valuemax="${n}" aria-valuenow="${Math.min(step + 1, n)}" aria-label="Question ${Math.min(step + 1, n)} of ${n}">
      <svg viewBox="0 0 600 76" preserveAspectRatio="none" aria-hidden="true">
        <defs><clipPath id="done"><rect x="0" y="0" width="${fillTo}" height="76"/></clipPath></defs>
        <path class="profile-area" d="${PROFILE} L600,76 L0,76Z"/>
        <path class="profile-area done" d="${PROFILE} L600,76 L0,76Z" clip-path="url(#done)"/>
        <path class="profile-line" d="${PROFILE}"/>
      </svg>
      <ol class="profile-labels">
        ${questions.map((q, i) => {
          const state = i < step ? "done" : i === step ? "current" : "";
          const clickable = i < step || answers[q.id];
          return `<li class="${state}" style="left:${(xs[i] / 600) * 100}%">
            ${clickable ? `<a href="#/q/${i + 1}">` : "<span>"}<b>${i + 1}</b><span class="lbl">${q.short}</span>${clickable ? "</a>" : "</span>"}
          </li>`;
        }).join("")}
      </ol>
    </div>`;
}

// ---------------------------------------------------------------- question
function renderQuestion(step) {
  const q = questions[step];
  const sel = answers[q.id];
  view.className = "view view-quiz";
  view.innerHTML = `
    ${renderProfile(step)}
    <section class="question">
      <p class="eyebrow">Checkpoint ${step + 1} of ${questions.length}</p>
      <h1 class="q-title" tabindex="-1">${q.title}</h1>
      <p class="q-hint">${q.hint}</p>
      <div class="options" role="radiogroup" aria-label="${esc(q.title)}">
        ${q.options.map((o) => `
          <div class="opt${sel === o.value ? " selected" : ""}">
            <button type="button" class="opt-main" role="radio" aria-checked="${sel === o.value}" data-value="${o.value}">
              <span class="opt-icon">${icon(o.icon, 26)}</span>
              <span class="opt-text">
                <span class="opt-name">${o.name}</span>
                <span class="opt-summary">${o.summary}</span>
              </span>
              <span class="opt-check">${icon("check", 18)}</span>
            </button>
            <details class="opt-details">
              <summary>What this means for the bike</summary>
              <ul>${o.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
            </details>
          </div>`).join("")}
      </div>
      <nav class="q-nav">
        <a class="btn btn-ghost" href="${step === 0 ? "#/" : `#/q/${step}`}">${icon("arrowLeft", 18)} Back</a>
        <button type="button" class="btn btn-primary" id="next" ${sel ? "" : "disabled"}>
          ${step === questions.length - 1 ? "See my build" : "Continue"} ${icon("arrowRight", 18)}
        </button>
      </nav>
    </section>`;

  const next = () => {
    if (!answers[q.id]) return;
    if (step + 1 < questions.length) go(`#/q/${step + 2}`);
    else go(`#/r/${encodeAnswers(answers, questions)}`);
  };

  view.querySelectorAll(".opt-main").forEach((btn) => {
    btn.addEventListener("click", () => {
      answers[q.id] = btn.dataset.value;
      view.querySelectorAll(".opt").forEach((el) => el.classList.remove("selected"));
      view.querySelectorAll(".opt-main").forEach((b) => b.setAttribute("aria-checked", "false"));
      btn.closest(".opt").classList.add("selected");
      btn.setAttribute("aria-checked", "true");
      view.querySelector("#next").disabled = false;
      clearTimeout(advanceTimer);
      advanceTimer = setTimeout(next, 420); // short pause so the selection is visible
    });
  });
  view.querySelector("#next").addEventListener("click", next);
}

// ---------------------------------------------------------------- result
const MAT_SHORT = { aluminum: "Aluminum", steel: "Steel", carbon: "Carbon", titanium: "Titanium" };

function bars(ranking, labels, winner) {
  return `<ul class="bars">${ranking.map((r) => `
    <li class="${r.key === winner ? "win" : ""}">
      <span class="bar-label">${labels[r.key]}</span>
      <span class="bar-track"><span class="bar-fill" style="width:${Math.round(r.share * 100)}%"></span></span>
      <span class="bar-val">${r.points}</span>
    </li>`).join("")}</ul>`;
}

function renderResult(code) {
  const decoded = decodeAnswers(code, questions);
  if (!decoded) return go("#/");
  answers = decoded;
  const r = recommend(answers);
  const mat = materials[r.material];
  const geoLabels = Object.fromEntries(Object.entries(GEOMETRY_INFO).map(([k, v]) => [k, v.label]));

  view.className = "view view-result";
  view.innerHTML = `
    ${renderProfile(questions.length)}
    <section class="result-head">
      <p class="eyebrow">Your build</p>
      <h1 class="result-title" tabindex="-1">${r.title}</h1>
      <p class="result-narrative">${r.narrative}</p>
      <ul class="answer-chips" aria-label="Your answers">
        ${questions.map((q, i) => {
          const o = q.options.find((x) => x.value === answers[q.id]);
          return `<li><a href="#/q/${i + 1}" title="Change ${q.short.toLowerCase()}">${icon(o.icon, 16)}<span>${q.short}:</span> ${o.name}</a></li>`;
        }).join("")}
      </ul>
    </section>

    <section class="spec-sheet" aria-label="Spec sheet">
      <div class="sheet-top">
        <span class="sheet-tag">Spec sheet</span>
        <span class="sheet-code">#${code}</span>
      </div>
      <div class="sheet-hero">
        <div class="big-spec"><span class="k">Geometry</span><span class="v">${r.geometryLabel}</span><span class="s">${GEOMETRY_INFO[r.geometry].blurb}</span></div>
        <div class="big-spec"><span class="k">Frame</span><span class="v">${MAT_SHORT[r.material]}</span><span class="s">${mat.label}</span></div>
        <div class="big-spec"><span class="k">Tire clearance</span><span class="v">≥ ${r.clearance}<small>mm</small></span><span class="s">Check chainstay and fork crown</span></div>
      </div>
      <dl class="sheet-rows">
        <div><dt>Tires</dt><dd>${r.tires}</dd></div>
        <div><dt>Drivetrain</dt><dd>${r.drivetrain}</dd></div>
        <div><dt>Wheels</dt><dd>${r.wheels}</dd></div>
      </dl>
    </section>

    <section class="why">
      <h2 class="section-title">Why this build</h2>
      <div class="why-grid">
        <article class="panel">
          <h3>Geometry fit</h3>
          ${bars(r.scores.geometry.ranking, geoLabels, r.geometry)}
          <p class="panel-note">Driven by: ${r.scores.geometry.reasons.map((x) => x.why.toLowerCase()).join(" · ") || "a balanced profile"}.</p>
        </article>
        <article class="panel">
          <h3>Frame material fit</h3>
          ${bars(r.scores.material.ranking, MAT_SHORT, r.material)}
          <p class="panel-note">Driven by: ${r.scores.material.reasons.map((x) => x.why.toLowerCase()).join(" · ")}.</p>
        </article>
      </div>
      <article class="panel panel-wide">
        <h3>Why ${mat.label.toLowerCase()}</h3>
        <p>${mat.reason}</p>
      </article>
    </section>

    <section class="checklists">
      <article class="panel list-good">
        <h2 class="section-title">${icon("check", 22)} Look for</h2>
        <ul>${r.lookFor.map((x) => `<li>${x}</li>`).join("")}</ul>
      </article>
      <article class="panel list-bad">
        <h2 class="section-title">${icon("x", 22)} Avoid</h2>
        <ul>${r.avoid.map((x) => `<li>${x}</li>`).join("")}</ul>
      </article>
    </section>

    <section class="result-actions">
      <button type="button" class="btn btn-primary" id="copy">${icon("link", 18)} <span>Copy link to this build</span></button>
      <button type="button" class="btn btn-ghost" id="print">${icon("print", 18)} Print / save PDF</button>
      <a class="btn btn-ghost" href="#/q/1" id="restart">${icon("restart", 18)} Start over</a>
    </section>

    <section class="roadmap-teaser compact">
      <div>
        <p class="eyebrow">Coming next</p>
        <h2>Bikes that match this sheet.</h2>
        <p>Soon this spec sheet will list real models that fit it, scored from aggregated reviews and rider feedback.</p>
      </div>
    </section>`;

  view.querySelector("#copy").addEventListener("click", async (e) => {
    const label = e.currentTarget.querySelector("span");
    try {
      await navigator.clipboard.writeText(location.href);
      label.textContent = "Link copied";
    } catch {
      label.textContent = "Copy the address bar";
    }
    setTimeout(() => { label.textContent = "Copy link to this build"; }, 2200);
  });
  view.querySelector("#print").addEventListener("click", () => window.print());
  view.querySelector("#restart").addEventListener("click", () => { answers = {}; });
}

// ---------------------------------------------------------------- router
function route() {
  clearTimeout(advanceTimer);
  const hash = location.hash.replace(/^#\/?/, "");
  const [page, arg] = hash.split("/");

  if (page === "q") {
    const step = Math.max(0, Math.min(questions.length - 1, (parseInt(arg, 10) || 1) - 1));
    const gap = firstUnanswered();
    // Don't let people skip ahead past an unanswered question.
    if (gap !== -1 && gap < step) return go(`#/q/${gap + 1}`);
    renderQuestion(step);
  } else if (page === "r") {
    renderResult(arg);
  } else {
    renderHome();
  }

  document.querySelectorAll(".site-nav a").forEach((a) => {
    a.toggleAttribute("aria-current", a.getAttribute("href") === `#/${page === "q" ? "q/1" : ""}`);
  });
  window.scrollTo(0, 0);
  (view.querySelector("h1[tabindex]") || view).focus({ preventScroll: true });
}

window.addEventListener("hashchange", route);
route();

