import { easeOutQuint } from "../easing_functions";
import { animate, pause } from "../motion";

let projectsHasAnimated = false; // track trigger state

function animateProjects(): void {
    if (projectsHasAnimated) return;
    projectsHasAnimated = true;

    const projects = document.getElementById("projects") as HTMLElement;
    if (!projects) return;

    const title = projects.querySelector("h2.sectionTitle") as HTMLElement;
    const content = projects.querySelector("div.content") as HTMLElement;
    if (!title || !content) return;

    [title, ...Array.from(content.children)].forEach((child, index) => {
        const element = child as HTMLElement;

        pause(index * 100, () => {
            animate(
                element,
                1000,
                {
                    transform: { startY: "40px", endY: 0 },
                    opacity: 1,
                },
                easeOutQuint
            );
        });
    });
}

function enableProjectsAnimation(): void {
    const projects = document.getElementById("projects") as HTMLElement;
    if (!projects) return;

    const title = projects.querySelector("h2.sectionTitle") as HTMLElement;
    const content = projects.querySelector("div.content") as HTMLElement;
    if (!title || !content) return;

    [title, ...Array.from(content.children)].forEach((child) => {
        const element = child as HTMLElement;
        element.style.opacity = "0";
    });
}

export { animateProjects, enableProjectsAnimation };
