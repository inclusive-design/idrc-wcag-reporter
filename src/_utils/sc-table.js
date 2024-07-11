import totalsByLevel from "../_utils/totals-by-level.js";
import countSuccessCriterionOnce from "./count-success-criteria-once.js";

export default async function scTable(successCriteria, allIssues, data) {
    const { targetLevel, targetWcagVersion } = data;

    let totalsByLevelData;

    totalsByLevelData = await totalsByLevel(successCriteria);

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
