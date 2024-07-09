import slugify from "@sindresorhus/slugify";
import successCriteria from "../_data/successcriteria.js";
import matchesLevel from "./matches-level.js";
import matchesVersion from "./matches-version.js";
import scUri from "./sc-uri.js";

/* eslint max-params: ["error", 5] */
export default async function scSupport(targetLevel, targetVersion, allIssues, notSupported = [], notApplicable = []) {
    let criteria;

    try {
        criteria = await successCriteria();
    } catch (error) {
        console.error(`Fetch failed in sc-support.js. ${error}`);
    }

    const filteredCriteria = Object.fromEntries(Object.entries(criteria).filter(([_key, criterion]) => matchesVersion(criterion.versions, targetVersion) && matchesLevel(criterion.level, targetLevel)));

    let output = `
    <table class="sc-table">
    <thead>
      <tr>
        <th>Success criteria</th>
        <th>Level</th>
        <th>Support</th>
        <th>Reference</th>
      </tr>
    </thead>
    <tbody>`;

    for (const key in filteredCriteria) {
        if (Object.hasOwn(filteredCriteria, key)) {
            const relevantIssues = allIssues.filter((issue) => issue.sc === key);

            const relevantSevereIssues = allIssues.filter((issue) => issue.sc === key && issue.severity === "High");

            let support = "Supports";

            if (notApplicable.includes(key)) {
                support = "Not applicable";
            }

            if (relevantIssues.length > 0) {
                support = "Partially supports";
            }

            if (relevantSevereIssues.length > 0 || notSupported.includes(key)) {
                support = "Does not support";
            }

            const scLabel = relevantIssues.length > 0 ? `<a href="#${slugify(criteria[key].name)}">${key}: ${criteria[key].name}</a>` : `${key}: ${criteria[key].name}`;

            const scReferenceLink = scUri(key, criteria);

            output += `<tr><td>${scLabel}</td><td>${criteria[key].level}</td><td>${support}</td><td><a href="${scReferenceLink}" target="_blank">
                  Understanding ${key} <span class="external">(external link)</span><svg aria-hidden="true" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="14" width="16"><path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M14 5C13.4477 5 13 4.55228 13 4C13 3.44772 13.4477 3 14 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4L21 10C21 10.5523 20.5523 11 20 11C19.4477 11 19 10.5523 19 10L19 6.41422L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L17.5858 5H14ZM3 7C3 5.89543 3.89543 5 5 5H10C10.5523 5 11 5.44772 11 6C11 6.55228 10.5523 7 10 7H5V19H17V14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14V19C19 20.1046 18.1046 21 17 21H5C3.89543 21 3 20.1046 3 19V7Z" fill="currentColor"></path></svg>
              </a></td></tr>`;
        }
    }

    output += `<tbody>
    </table>`;

    return output;
}
