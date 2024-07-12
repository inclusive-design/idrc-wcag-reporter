export default function determineFailures(issues, principle, notSupported) {
    const failuresFromIssues = issues.filter((issue) => issue.sc.startsWith(principle) && issue.severity === "High").map((issue) => issue.sc);

    const manualFailures = notSupported.filter((sc) => sc.startsWith(principle));

    return [...new Set(failuresFromIssues.concat(manualFailures))];
}
