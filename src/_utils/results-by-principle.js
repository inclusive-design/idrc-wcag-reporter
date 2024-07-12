import totalsByLevel from "../_utils/totals-by-level.js";
import determineFailures from "./determine-failures.js";

export default async function resultsByPrinciple(data) {
    const { successCriteria, issues, targetLevel, targetWcagVersion, notSupported } = data;

    let totalsByLevelData;

    totalsByLevelData = await totalsByLevel(successCriteria);

    const issuesWithCriteria = issues.filter((issue) => issue?.sc !== "");

    // Use string representation of WCAG version to avoid unwanted conversion from e.g. 2.0 to index 2
    const totals = totalsByLevelData[targetWcagVersion.toString()][targetLevel];

    const perceivable = determineFailures(issuesWithCriteria, "1.", notSupported);
    const operable = determineFailures(issuesWithCriteria, "2.", notSupported);
    const understandable = determineFailures(issuesWithCriteria, "3.", notSupported);
    const robust = determineFailures(issuesWithCriteria, "4.", notSupported);

    const totalConforming = totals.perceivable - perceivable.length + (totals.operable - operable.length) + (totals.understandable - understandable.length) + (totals.robust - robust.length);

    return {
        Perceivable: {
            supported: totals.perceivable - perceivable.length,
            total: totals.perceivable
        },
        Operable: {
            supported: totals.operable - operable.length,
            total: totals.operable
        },
        Understandable: {
            supported: totals.understandable - understandable.length,
            total: totals.understandable
        },
        Robust: {
            supported: totals.robust - robust.length,
            total: totals.robust
        },
        Total: {
            supported: totalConforming,
            total: totals.all
        }
    };
}
