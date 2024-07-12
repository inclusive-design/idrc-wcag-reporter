import test from "ava";
import newIssueUrl from "../src/_utils/new-issue-url.js";
import scUri from "../src/_utils/sc-uri.js";

test("success criterion URL can be generated", (t) => {
    t.is("https://www.w3.org/WAI/WCAG20/Understanding/contrast-minimum.html", scUri("1.4.3", "2.0", { "1.4.3": { id: "contrast-minimum" } }));

    t.is("https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html", scUri("1.4.3", "2.1", { "1.4.3": { id: "contrast-minimum" } }));

    t.is("https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html", scUri("1.4.3", "2.2", { "1.4.3": { id: "contrast-minimum" } }));
});

test("success criterion URL cannot be generated for invalid success criterion", (t) => {
    const error = t.throws(
        () => {
            scUri("3.3.9", "2.0", {});
        },
        { instanceOf: ReferenceError }
    );

    t.is("Cannot generate URL for 3.3.9, as it cannot be found in the data.", error.message);
});

test("new issue URL can be generated for GitHub", (t) => {
    t.is(newIssueUrl("Test issue", "Not applicable.", "all", "https://github.com/inclusive-design/idrc-wcag-reporter"), "https://github.com/inclusive-design/idrc-wcag-reporter/issues/new?body=Not+applicable.%0A%0A%23%23%23%23%23+Pages%0A%0A-+All+pages&title=Test+issue");
});

test("new issue URL can be generated for GitLab", (t) => {
    t.is(newIssueUrl("Test issue", "Not applicable.", "all", "https://gitlab.com/inclusive-design/idrc-wcag-reporter"), "https://gitlab.com/inclusive-design/idrc-wcag-reporter/-/issues/new?issue[title]=Test%20issue&issue[description]=Not%20applicable.%0A%0A%23%23%23%23%23%20Pages%0A%0A-%20All%20pages");
});
