export default function collapsibleSections() {
    const criteria = document.querySelectorAll("h3");
    for (const criterion of criteria) {
        criterion.innerHTML = `<button type="button" aria-expanded="false"><svg aria-hidden="true" viewBox="63.465 94.174 14.544 13.533" width="14.544" height="13.533" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com"><path fill="currentColor" d="m70.738 93.669 6.766 14.544H63.971l6.767-14.544Z" style="stroke:currentColor;transform-origin:70.7375px 100.941px" transform="rotate(90 0 0)" bx:shape="triangle 63.971 93.669 13.533 14.544 0.5 0 1@7fa21096"/></svg> ${criterion.textContent}</button>`;

        const getContent = (elem) => {
            let elems = [];
            while (elem.nextElementSibling && elem.nextElementSibling.tagName !== "H2" && elem.nextElementSibling.tagName !== "H3") {
                elems.push(elem.nextElementSibling);
                elem = elem.nextElementSibling;
            }

            elems.forEach((node) => {
                node.parentNode.removeChild(node);
            });

            return elems;
        };

        let contents = getContent(criterion);

        let wrapper = document.createElement("div");

        contents.forEach((node) => {
            wrapper.appendChild(node);
        });

        criterion.parentNode.insertBefore(wrapper, criterion.nextElementSibling);

        let btn = criterion.querySelector("button");

        btn.onclick = () => {
            let expanded = btn.getAttribute("aria-expanded") === "true" || false;

            btn.setAttribute("aria-expanded", !expanded);
        };
    }
}

collapsibleSections();
