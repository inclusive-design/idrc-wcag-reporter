import { EleventyRenderPlugin } from "@11ty/eleventy";
import syntaxHighlightPlugin from "@11ty/eleventy-plugin-syntaxhighlight";
import newIssueUrl from "./src/_utils/new-issue-url.js";
import scSupport from "./src/_utils/sc-support.js";
import scTable from "./src/_utils/sc-table.js";
import scUri from "./src/_utils/sc-uri.js";
import sanitizeNumber from "./src/_utils/sanitize-number.js";

export default function eleventy(eleventyConfig) {
  eleventyConfig.addFilter("scUri", scUri);

  eleventyConfig.addNunjucksAsyncShortcode("scTable", scTable);
  eleventyConfig.addNunjucksAsyncShortcode("scSupport", scSupport);
  eleventyConfig.addShortcode("newIssueUrl", newIssueUrl);
  eleventyConfig.addLayoutAlias("report", "report.njk");

  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(syntaxHighlightPlugin);

  eleventyConfig.addAsyncFilter("formatDate", (value) => {
    return new Date(value).toLocaleString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addCollection("issues", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/report/issues/*.md")
      .filter(
        (item) => !(item.data.sc === undefined) && item.data.sc.length > 0,
      )
      .sort((a, b) => {
        const sortCriterionA = a.data.sc.sort()[0];
        const sortCriterionB = b.data.sc.sort()[0];

        const numbA = sanitizeNumber(sortCriterionA);
        const numbB = sanitizeNumber(sortCriterionB);
        if (numbA < numbB) {
          return -1;
        }

        if (numbA > numbB) {
          return 1;
        }

        return 0;
      }),
  );

  eleventyConfig.addCollection("tips", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/report/issues/*.md")
      .filter(
        (item) => item.data.sc === undefined || item.data.sc.length === 0,
      ),
  );

  eleventyConfig.addPassthroughCopy({
    "src/admin/config.yml": "admin/config.yml",
  });

  eleventyConfig.addPassthroughCopy({
    "src/assets": "assets",
  });

  eleventyConfig.addPassthroughCopy({
    "node_modules/a11y-syntax-highlighting/dist/prism/a11y-dark.min.css":
      "assets/styles/a11y-dark.min.css",
    "node_modules/@zachleat/table-saw/table-saw.js":
      "assets/scripts/table-saw.js",
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    templateFormats: ["njk", "md", "css", "png", "jpg", "svg"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
