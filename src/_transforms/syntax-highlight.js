import { parseHTML } from "linkedom";
import { codeToHtml } from "shiki";

export default async function (content) {
    if (this.page.outputPath && this.page.outputPath.includes(".html")) {
        const { document } = parseHTML(content);
        const codeBlocks = [...document.querySelectorAll("pre code")];

        if (codeBlocks.length > 0) {
            for (const codeBlock of codeBlocks) {
                const lang = codeBlock.className.replace("language-", "");
                const html = await codeToHtml(codeBlock.textContent, {
                    lang,
                    theme: "night-owl"
                });

                codeBlock.parentNode.outerHTML = html;
            }
        }

        return "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML;
    }

    return content;
}
