import successCriteria from "../_data/successcriteria.js";

export default function scUri(sc, criteria) {
  const baseUri = "https://www.w3.org/WAI/WCAG22/Understanding/";

  let slug;

  if (criteria[sc]) {
    slug = criteria[sc].id || "";
  } else {
    console.error(
      `Cannot generate URL for ${sc}, as it cannot be found in the data."`,
    );
    return;
  }

  return `${baseUri}${slug}.html`;
}
