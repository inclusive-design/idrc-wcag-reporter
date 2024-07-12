import newGithubIssueUrl from "new-github-issue-url";

export default function newIssueUrl(title, body, sample, issuesUrl) {
    issuesUrl ||= "";

    let issueUrl = "";

    body = sample === "all" ? `${body}\n\n##### Pages\n\n- All pages` : `${body}\n\n##### Pages\n\n- ${sample}`;

    if (issuesUrl.includes("github")) {
        issueUrl = newGithubIssueUrl({
            repoUrl: issuesUrl,
            title,
            body
        });
    }

    if (issuesUrl.includes("gitlab")) {
        issueUrl = `${issuesUrl}/-/issues/new?issue[title]=${encodeURIComponent(title)}&issue[description]=${encodeURIComponent(body)}`;
    }

    return issueUrl;
}
