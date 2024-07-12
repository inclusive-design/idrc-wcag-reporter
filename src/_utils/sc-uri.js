export default function scUri(sc, version, successCriteria) {
    const simpleVersion = version.replace(".", "");
    const baseUri = `https://www.w3.org/WAI/WCAG${simpleVersion}/Understanding/`;

    let slug;

    if (successCriteria[sc]) {
        slug = successCriteria[sc].id;
    } else {
        throw new ReferenceError(`Cannot generate URL for ${sc}, as it cannot be found in the data.`);
    }

    return `${baseUri}${slug}.html`;
}
