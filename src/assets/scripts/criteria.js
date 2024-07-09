/* global document */

const criteria = document.querySelectorAll("#executive-summary h3, #about-this-report h3, #issues h3, #scope h3");
for (const criterion of criteria) {
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("aria-expanded", false);
    button.innerHTML = `<svg viewBox="63.465 94.174 14.544 13.533" width="14.544" height="13.533" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com"><path fill="currentColor" d="m70.738 93.669 6.766 14.544H63.971l6.767-14.544Z" style="stroke:currentColor;transform-origin:70.7375px 100.941px" transform="rotate(90 0 0)" bx:shape="triangle 63.971 93.669 13.533 14.544 0.5 0 1@7fa21096"/></svg> ${criterion.textContent}`;
    button.addEventListener("click", (event) => {
        const expanded = event.target.getAttribute("aria-expanded") === "false" || false;
        event.target.setAttribute("aria-expanded", expanded);
    });
    criterion.textContent = "";
    criterion.append(button);
}
