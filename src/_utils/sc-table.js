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
