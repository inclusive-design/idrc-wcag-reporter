import matchesLevel from "../src/_utils/matches-level.js";
import matchesVersion from "../src/_utils/matches-version.js";
import test from "ava";

test("target levels match expectations", (t) => {
  t.true(matchesLevel("A", "A"));
  t.true(matchesLevel("A", "AA"));
  t.true(matchesLevel("A", "AAA"));
  t.false(matchesLevel("AA", "A"));
  t.true(matchesLevel("AA", "AA"));
  t.true(matchesLevel("AA", "AAA"));
  t.false(matchesLevel("AAA", "A"));
  t.false(matchesLevel("AAA", "AA"));
  t.true(matchesLevel("AAA", "AAA"));
});

test("target versions match expectations", (t) => {
  t.true(matchesVersion(["2.0", "2.1", "2.2"], "2.0"));
  t.true(matchesVersion(["2.0", "2.1", "2.2"], "2.1"));
  t.true(matchesVersion(["2.0", "2.1", "2.2"], "2.2"));
  t.false(matchesVersion(["2.1", "2.2"], "2.0"));
  t.true(matchesVersion(["2.1", "2.2"], "2.1"));
  t.true(matchesVersion(["2.1", "2.2"], "2.2"));
  t.false(matchesVersion(["2.2"], "2.0"));
  t.false(matchesVersion(["2.2"], "2.1"));
  t.true(matchesVersion(["2.2"], "2.2"));
});
