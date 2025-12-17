import { animateProjectStack } from "./animations/project_stack";

function enableProjectStack(): void {
    const projectStacks = document.querySelectorAll(
        ".projectStack"
    ) as NodeListOf<HTMLDivElement>;

    projectStacks.forEach((element) => {
        const backProject = element.querySelector(".back") as HTMLDivElement;
        if (!backProject) {
            console.error("back project in project stack not found.");
            return;
        }

        const backProjectHideButton = backProject.querySelector(
            "button[name='hide']"
        ) as HTMLButtonElement;
        if (!backProjectHideButton) {
            console.log("back project has no hide button");
            return;
        }

        backProject.addEventListener("mouseup", () => {
            if (!element.classList.contains("stacked")) return;

            element.classList.remove("stacked");
            animateProjectStack();
        });

        backProjectHideButton.addEventListener("mouseup", (event) => {
            if (element.classList.contains("stacked")) return;

            element.classList.add("stacked");

            // note: without stopPropagation(), the backProject mouseup event listener will trigger
            event.stopPropagation();
        });
    });
}

export { enableProjectStack };
