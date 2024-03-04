import totalsByLevel from "../_data/totalsByLevel.js";
import countSuccesCriterionOnce from "./countSuccessCriteriaOnce.js";

export default async function scTable(
  allIssues,
  targetLevel,
  targetWcagVersion
) {
  if (!allIssues || !targetLevel) {
    return ``;
  }

  let totals_by_level;

  try {
    totals_by_level = await totalsByLevel();
  } catch (error) {
    console.error(`Fetch failed in scTable.js. ${error}`);
  }

  // use string representation of WCAG version to avoid unwanted conversion from e.g. 2.0 to index 2
  const totals = totals_by_level[targetWcagVersion.toString()][targetLevel];

  let perceivable = allIssues
    .filter((issue) => issue.data.sc && issue.data.sc.startsWith("1."))
    .reduce(countSuccesCriterionOnce, []);
  let operable = allIssues
    .filter((issue) => issue.data.sc && issue.data.sc.startsWith("2."))
    .reduce(countSuccesCriterionOnce, []);
  let understandable = allIssues
    .filter((issue) => issue.data.sc && issue.data.sc.startsWith("3."))
    .reduce(countSuccesCriterionOnce, []);
  let robust = allIssues
    .filter((issue) => issue.data.sc && issue.data.sc.startsWith("4."))
    .reduce(countSuccesCriterionOnce, []);

  let totalConforming =
    totals.perceivable -
    perceivable.length +
    (totals.operable - operable.length) +
    (totals.understandable - understandable.length) +
    (totals.robust - robust.length);
  return `
  <table class="sc-table">
  <thead>
    <tr>
      <td>Principle</td>
      <td>Results by principle</td>
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
      <td>${totals.understandable - understandable.length} of ${
    totals.understandable
  } </td>
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
