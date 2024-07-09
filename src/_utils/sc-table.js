/* eslint-disable unicorn/no-array-callback-reference */
/* eslint-disable unicorn/no-array-reduce */
import totalsByLevel from "../_data/totalsbylevel.js";
import countSuccessCriterionOnce from "./count-success-criteria-once.js";

export default async function scTable(allIssues, targetLevel, targetWcagVersion) {
    if (!allIssues || !targetLevel) {
        return "";
    }

    let totalsByLevelData;

    try {
        totalsByLevelData = await totalsByLevel();
    } catch (error) {
        console.error(`Fetch failed in sc-table.js. ${error}`);
    }

    // Use string representation of WCAG version to avoid unwanted conversion from e.g. 2.0 to index 2
    const totals = totalsByLevelData[targetWcagVersion.toString()][targetLevel];

    const perceivable = allIssues.filter((issue) => issue.sc.startsWith("1.")).reduce(countSuccessCriterionOnce, []);
    const operable = allIssues.filter((issue) => issue.sc.startsWith("2.")).reduce(countSuccessCriterionOnce, []);
    const understandable = allIssues.filter((issue) => issue.sc.startsWith("3.")).reduce(countSuccessCriterionOnce, []);
    const robust = allIssues.filter((issue) => issue.sc.startsWith("4.")).reduce(countSuccessCriterionOnce, []);

    const totalConforming = totals.perceivable - perceivable.length + (totals.operable - operable.length) + (totals.understandable - understandable.length) + (totals.robust - robust.length);
    return `
  <table class="sc-table">
  <thead>
    <tr>
      <th>Principle</th>
      <th>Results by principle</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td>Perceivable</td>
    <td>${totals.perceivable - perceivable.length} of ${totals.perceivable}</td>
  </tr>
  <tr>
      <td>Operable</td>
      <td>${totals.operable - operable.length} of ${totals.operable} </td>
  </tr>
  <tr>
      <td>Understandable</td>
      <td>${totals.understandable - understandable.length} of ${totals.understandable}</td>
  </tr>
  <tr>
      <td>Robust</td>
      <td>${totals.robust - robust.length} of ${totals.robust} </td>
  </tr>
  <tr>
      <td>Total</td>
      <td>${totalConforming} of ${totals.all}</td>
  </tr>
  <tbody>
  </table>`;
}
