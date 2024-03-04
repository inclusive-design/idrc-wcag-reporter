import { EleventyRenderPlugin } from "@11ty/eleventy";
import syntaxHighlightPlugin from "@11ty/eleventy-plugin-syntaxhighlight";
import scTable from "./src/_utils/scTable.js";
import scUri from "./src/_utils/scUri.js";
import sanitizeNumber from "./src/_utils/sanitizeNumber.js";
// const newGitHubIssueUrl = require("new-github-issue-url");

export default function (eleventyConfig) {
  eleventyConfig.addFilter("sc_uri", scUri);

  eleventyConfig.addFilter("newIssueUrl", (url) => {
    if (url.indexOf("gitlab")) {
      return;
    }
  });

  eleventyConfig.addNunjucksAsyncShortcode("sc_table", scTable);

  eleventyConfig.addLayoutAlias("report", "report.njk");

  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(syntaxHighlightPlugin);

  eleventyConfig.addCollection("issues", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/issues/*.md")
      .filter(
        (item) => !(item.data.sc === "none") && !(item.data.sc === undefined)
      )
      .sort((a, b) => {
        const numbA = sanitizeNumber(a.data.sc);
        const numbB = sanitizeNumber(b.data.sc);
        if (numbA < numbB) return -1;
        if (numbA > numbB) return 1;
        return 0;
      });
  });

  eleventyConfig.addCollection("tips", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/issues/*.md")
      .filter((item) => item.data.sc === "none");
  });

  eleventyConfig.addPassthroughCopy({
    "src/admin/config.yml": "admin/config.yml",
  });

  eleventyConfig.addPassthroughCopy({
    "node_modules/decap-cms/dist/decap-cms.js": "lib/cms/decap-cms.js",
    "node_modules/decap-cms/dist/decap-cms.js.map": "lib/cms/decap-cms.js.map",
    "node_modules/prop-types/prop-types.min.js": "lib/cms/prop-types.min.js",
    "node_modules/react/umd/react.development.js":
      "lib/cms/react.development.js",
    "node_modules/react/umd/react.production.min.js":
      "lib/cms/react.production.min.js",
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
