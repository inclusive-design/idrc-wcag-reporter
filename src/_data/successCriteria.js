import fetch from "@11ty/eleventy-fetch";

export default async function () {
  let url =
    "https://raw.githubusercontent.com/w3c/wcag/main/guidelines/wcag.json";

  try {
    let json = await fetch(url, {
      duration: "1d",
      type: "json",
    });

    let results = {};

    json.principles.forEach((principle) => {
      principle.guidelines.forEach((guideline) => {
        guideline.successcriteria.forEach((sc) => {
          results[sc.num] = {
            principle: principle.handle,
            guideline: guideline.handle,
            name: sc.handle,
            level: sc.level,
            versions: sc.versions,
            id: sc.id.replace("WCAG2:", ""),
          };
        });
      });
    });

    return results;
  } catch (error) {
    console.error(`Fetch failed in successCriteria.js. ${error}`);
  }
}
