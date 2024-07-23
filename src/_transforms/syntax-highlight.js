import { readFile } from "fs/promises";
import { parseHTML } from "linkedom";
import { bundledLanguages, createHighlighter } from "shiki";

export default async function (content) {
    if (this.page.outputPath && this.page.outputPath.includes(".html")) {
        const { document } = parseHTML(content);
        const codeBlocks = [...document.querySelectorAll("pre code")];

        const lightOwl = JSON.parse(await readFile(new URL("./../../node_modules/night-owl/themes/Night Owl-Light-color-theme-noitalic.json", import.meta.url)));

        lightOwl.name = "light-owl";

        const highlighter = await createHighlighter({
            themes: [lightOwl, "night-owl"],
            langs: Object.keys(bundledLanguages)
        });

        if (codeBlocks.length > 0) {
            for (const codeBlock of codeBlocks) {
                const lang = codeBlock.className.replace("language-", "");

                const html = highlighter.codeToHtml(codeBlock.textContent, {
                    lang,
                    themes: {
                        dark: "night-owl",
                        light: "light-owl"
                    },
                    defaultColor: false
                });

                codeBlock.parentNode.outerHTML = html;
            }
        }

        return "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML;
    }

    return content;
}
