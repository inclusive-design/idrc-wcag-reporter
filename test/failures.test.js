import test from "ava";
import determineFailures from "../src/_utils/determine-failures.js";

test("high severity issue indicates a failure", (t) => {
    let issues = [
        { sc: "2.1.2", severity: "High" },
        { sc: "2.3.1", severity: "Low" }
    ];
    let principle = 2;
    let notSupported = ["1.2.1"];
    let principleFailures = determineFailures(issues, principle, notSupported);
    t.is(1, principleFailures.length);
    t.is("2.1.2", principleFailures[0]);
});

test("manual failure indicates a failure", (t) => {
    let issues = [{ sc: "1.3.1", severity: "Low" }];
    let principle = 1;
    let notSupported = ["1.2.1"];
    let principleFailures = determineFailures(issues, principle, notSupported);
    t.is(1, principleFailures.length);
    t.is("1.2.1", principleFailures[0]);
});
