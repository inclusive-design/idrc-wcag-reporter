import slugify from "@sindresorhus/slugify";
import matchesLevel from "./matches-level.js";
import matchesVersion from "./matches-version.js";
import scUri from "./sc-uri.js";

export default async function scSupport(successCriteria, allIssues, data) {
    const { targetLevel, targetWcagVersion, notSupported = [], notApplicable = [] } = data;

    const filteredCriteria = Object.fromEntries(Object.entries(successCriteria).filter(([_key, criterion]) => matchesVersion(criterion.versions, targetWcagVersion) && matchesLevel(criterion.level, targetLevel)));

    let result = [];

    for (const key in filteredCriteria) {
        const relevantIssues = allIssues.filter((issue) => issue.sc === key);
        const relevantSevereIssues = relevantIssues.filter((issue) => issue.severity === "High");

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

        const scReferenceLink = scUri(key, successCriteria);

        result.push({
            key,
            label: `${key}: ${successCriteria[key].name}`,
            level: successCriteria[key].level,
            support,
            link: relevantIssues.length > 0 ? `#${slugify(successCriteria[key].name)}` : false,
            referenceLink: scReferenceLink
        });
    }

    return result;
}
