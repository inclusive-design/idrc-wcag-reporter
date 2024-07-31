import { RenderPlugin } from "@11ty/eleventy";
import fetch from "@11ty/eleventy-fetch";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import syntaxHighlightTransform from "./src/_transforms/syntax-highlight.js";
// Import {$} from 'execa';
import newIssueUrl from "./src/_utils/new-issue-url.js";

export default function eleventy(eleventyConfig) {
    eleventyConfig.addShortcode("newIssueUrl", newIssueUrl);
    eleventyConfig.addLayoutAlias("report", "report.njk");

    eleventyConfig.addGlobalData("successCriteria", async () => {
        const url = "https://raw.githubusercontent.com/w3c/wcag/main/guidelines/wcag.json";

        try {
            const json = await fetch(url, {
                duration: "1d",
                type: "json"
            });

            const results = {};

            for (const principle of json.principles) {
                for (const guideline of principle.guidelines) {
                    for (const sc of guideline.successcriteria) {
                        results[sc.num] = {
                            number: sc.num,
                            principle: principle.handle,
                            guideline: guideline.handle,
                            name: sc.handle,
                            level: sc.level,
                            versions: sc.versions,
                            id: sc.id.replace("WCAG2:", "")
                        };
                    }
                }
            }

            return results;
        } catch (error) {
            console.error(`Fetch failed in successcriteria.js. ${error}`);
        }
    });

    eleventyConfig.addTransform("syntaxHighlight", syntaxHighlightTransform);
    eleventyConfig.addPlugin(RenderPlugin);
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        extensions: "html",
        formats: ["webp", "jpeg"],
        urlPath: "/assets/images/processed/",
        outputDir: "./_site/assets/images/processed/",
        defaultAttributes: {
            loading: "lazy",
            decoding: "async"
        }
    });

    eleventyConfig.addFilter("withoutTips", (issues) => issues.filter((item) => Object.hasOwn(item, "sc") && item.sc !== ""));

    eleventyConfig.addFilter("withoutViolations", (issues) => issues.filter((item) => item.sc === "" || !Object.hasOwn(item, "sc")));

    eleventyConfig.addAsyncFilter("formatDate", (value) =>
        new Date(value).toLocaleString("en-CA", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
    );

    eleventyConfig.addCollection("reports", (collectionApi) => collectionApi.getFilteredByGlob("src/collections/reports/*.md"));

    eleventyConfig.addPassthroughCopy({
        "src/admin/config.yml": "admin/config.yml"
    });

    eleventyConfig.addPassthroughCopy({
        "src/assets/fonts": "assets/fonts",
        "src/assets/images": "assets/images",
        "src/assets/scripts": "assets/scripts",
        "src/assets/styles": "assets/styles"
    });

    eleventyConfig.addPassthroughCopy({
        "node_modules/@zachleat/table-saw/table-saw.js": "assets/scripts/table-saw.js"
    });

    // EleventyConfig.on(
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
            data: "_data"
        },
        templateFormats: ["njk", "md", "css", "png", "jpg", "svg"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
}
