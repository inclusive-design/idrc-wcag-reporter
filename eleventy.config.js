import { EleventyRenderPlugin } from "@11ty/eleventy";
import syntaxHighlightPlugin from "@11ty/eleventy-plugin-syntaxhighlight";
import newIssueUrl from "./src/_utils/new-issue-url.js";
import scSupport from "./src/_utils/sc-support.js";
import scTable from "./src/_utils/sc-table.js";
import sanitizeNumber from "./src/_utils/sanitize-number.js";
import { $ } from "execa";

export default function eleventy(eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode("scTable", scTable);
  eleventyConfig.addNunjucksAsyncShortcode("scSupport", scSupport);
  eleventyConfig.addShortcode("newIssueUrl", newIssueUrl);
  eleventyConfig.addLayoutAlias("report", "report.njk");

  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(syntaxHighlightPlugin);

  eleventyConfig.addFilter("withoutTips", (issues) => {
    return issues.filter(
      (item) =>
        Object.prototype.hasOwnProperty.call(item, "sc") && item.sc !== "",
    );
  });

  eleventyConfig.addFilter("withoutViolations", (issues) => {
    return issues.filter(
      (item) =>
        item.sc === "" || !Object.prototype.hasOwnProperty.call(item, "sc"),
    );
  });

  eleventyConfig.addShortcode("renderString", async function (content, format) {
    return eleventyConfig.javascriptFunctions.renderTemplate.call(
      this,
      content,
      format,
    );
  });

  eleventyConfig.addAsyncFilter("formatDate", (value) =>
    new Date(value).toLocaleString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  );

  eleventyConfig.addCollection("reports", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/collections/reports/*.md"),
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

  // eleventyConfig.on(
  //   "eleventy.after",
  //   async ({ _dir, results, _runMode, _outputMode }) => {
  //     for (const result of results) {
  //       if (result.inputPath.startsWith("./src/collections/reports/")) {
  //         const { stdout } =
  //           await $`weasyprint --pdf-variant=pdf/ua-1 ${result.outputPath} ./_site${result.url}report.pdf`;
  //       }
  //     }
  //   },
  // );

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
