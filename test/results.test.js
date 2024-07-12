import test from "ava";
import { readFile } from "fs/promises";
import resultsByPrinciple from "../src/_utils/results-by-principle.js";
import resultsBySuccessCriterion from "../src/_utils/results-by-success-criterion.js";

const scData = JSON.parse(await readFile(new URL("../src/_data/scData.json", import.meta.url))).successCriteria;

let successCriteria = {};
scData.map((criterion) => {
    successCriteria[criterion.number] = criterion;
});

const data = {
    successCriteria,
    issues: [
        { sc: "1.3.1", severity: "High" },
        { sc: "1.3.2", severity: "Low" }
    ],
    targetLevel: "AA",
    targetWcagVersion: "2.2",
    notSupported: ["2.1.2"],
    notApplicable: ["1.2.2"]
};

test("results by principle can be generated", async (t) => {
    const results = await resultsByPrinciple(data);
    t.is(results.Perceivable.supported, 19);
    t.is(results.Operable.supported, 19);
});

test("results by success criterion can be generated", async (t) => {
    const results = await resultsBySuccessCriterion(data);
    t.is(1, results.filter((criterion) => criterion.support === "Not applicable").length);

    t.is(1, results.filter((criterion) => criterion.support === "Partially supports").length);

    t.is(2, results.filter((criterion) => criterion.support === "Does not support").length);
});
