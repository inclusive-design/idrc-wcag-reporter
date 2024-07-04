import successCriteria from "../_data/successcriteria.js";
import matchesLevel from "./matches-level.js";
import slugify from "@sindresorhus/slugify";

export default async function scSupport(
  targetLevel,
  allIssues,
  partiallySupported = [],
  unsupported = [],
  notApplicable = [],
) {
  let criteria;

  try {
    criteria = await successCriteria();
  } catch (error) {
    console.error(`Fetch failed in sc-support.js. ${error}`);
  }

  const filteredCriteria = Object.fromEntries(
    Object.entries(criteria).filter(([_key, criterion]) => {
      return matchesLevel(criterion.level, targetLevel);
    }),
  );

  let output = `
    <table class="sc-table">
    <thead>
      <tr>
        <th>Success criteria</th>
        <th>Level</th>
        <th>Support</th>
        <th>Issues</th>
      </tr>
    </thead>
    <tbody>`;

  for (const key in filteredCriteria) {
    if (Object.hasOwn(filteredCriteria, key)) {
      let support = "Supported";

      if (unsupported.includes(key)) {
        support = "Unsupported";
      }

      if (partiallySupported.includes(key)) {
        support = "Partially Supported";
      }

      if (notApplicable.includes(key)) {
        support = "Not applicable";
      }

      const relevantIssues = allIssues.filter((issue) =>
        issue.data.sc.includes(key),
      );

      let issues = relevantIssues.length ? "" : "None identified.";

      for (const issue of relevantIssues) {
        issues += `<li><a href="#${slugify(issue.data.title)}">${issue.data.title}</a></li>`;
      }

      output += `<tr><td>${key}: ${criteria[key].name}</td><td>${criteria[key].level}</td><td>${support}</td><td>${relevantIssues.length ? `<ul>${issues}</ul>` : issues}</td></tr>`;
    }
  }

  output += `<tbody>
    </table>`;

  return output;
}
