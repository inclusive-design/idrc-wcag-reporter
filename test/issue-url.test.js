import test from "ava";
import newIssueUrl from "../src/_utils/new-issue-url.js";

test("new issue URL can be generated for GitHub", (t) => {
  t.is(newIssueUrl('Test issue', 'Not applicable.', 'all', 'https://github.com/inclusive-design/idrc-wcag-reporter'), 'https://github.com/inclusive-design/idrc-wcag-reporter/issues/new?body=Not+applicable.%0A%0A%23%23%23%23%23+Pages%0A%0A-+All+pages&title=Test+issue');
});

test("new issue URL can be generated for GitLab", (t) => {
  t.is(newIssueUrl('Test issue', 'Not applicable.', 'all', 'https://gitlab.com/inclusive-design/idrc-wcag-reporter'), 'https://gitlab.com/inclusive-design/idrc-wcag-reporter/-/issues/new?issue[title]=Test%20issue&issue[description]=Not%20applicable.%0A%0A%23%23%23%23%23%20Pages%0A%0A-%20All%20pages');
});
