import successCriteria from "../_data/successCriteria.js";

export default async function (sc, targetWcagVersion) {
  const base_uri = `https://www.w3.org/WAI/WCAG22/quickref/?versions=${targetWcagVersion}`;

  let criteria, slug;

  try {
    criteria = await successCriteria();
  } catch (error) {
    console.error(`Fetch failed in scUri.js. ${error}`);
  }

  if (criteria[sc]) {
    slug = criteria[sc]["id"] || "";
  } else {
    console.error(
      `Cannot generate URL for ${sc}, as it cannot be found in the data."`
    );
    return;
  }
  return `${base_uri}#${slug}`;
}
