import { test } from "node:test";
import assert from "node:assert/strict";
import { questions } from "../assets/js/questions.js";
import { materials } from "../assets/js/content.js";
import { recommend, encodeAnswers, decodeAnswers, GEOMETRIES, MATERIALS } from "../assets/js/engine.js";

// Every possible combination of answers (5×4×3×4×4 = 960).
function* combos(i = 0, acc = {}) {
  if (i === questions.length) return yield { ...acc };
  for (const o of questions[i].options) yield* combos(i + 1, { ...acc, [questions[i].id]: o.value });
}

test("every answer combination yields a complete recommendation", () => {
  let n = 0;
  for (const a of combos()) {
    const r = recommend(a);
    assert.ok(GEOMETRIES.includes(r.geometry));
    assert.ok(MATERIALS.includes(r.material));
    assert.ok(materials[r.material], `missing material copy for ${r.material}`);
    for (const k of ["title", "narrative", "tires", "drivetrain", "wheels"])
      assert.ok(typeof r[k] === "string" && r[k].length > 10, `${k} empty for ${JSON.stringify(a)}`);
    assert.ok([40, 45, 50].includes(r.clearance));
    assert.ok(r.lookFor.length >= 3);
    n++;
  }
  assert.equal(n, 960);
});

test("share codes round-trip", () => {
  for (const a of combos()) assert.deepEqual(decodeAnswers(encodeAnswers(a, questions), questions), a);
  assert.equal(decodeAnswers("99999", questions), null);
  assert.equal(decodeAnswers("01", questions), null);
  assert.equal(decodeAnswers(undefined, questions), null);
});

test("sanity: archetypal riders get the expected build", () => {
  const racer = recommend({ use: "racing", surface: "road", terrain: "smooth", priority: "speed", budget: "high" });
  assert.equal(racer.geometry, "race");
  assert.equal(racer.material, "carbon");

  const tourer = recommend({ use: "bikepacking", surface: "adventure", terrain: "rough", priority: "durability", budget: "mid" });
  assert.equal(tourer.geometry, "adventure");
  assert.equal(tourer.material, "steel");
  assert.equal(tourer.clearance, 50);

  const starter = recommend({ use: "day", surface: "mixed", terrain: "moderate", priority: "comfort", budget: "entry" });
  assert.equal(starter.geometry, "endurance");
  assert.equal(starter.material, "aluminum");
});
