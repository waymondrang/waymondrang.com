import { easeOutExpo, easeOutQuint } from "../easing";
import { animate } from "../motion";

function animateProjectStack() {
    const projectStackBack = document.querySelector(
        ".projectStack .back"
    ) as HTMLDivElement;

    animate(
        projectStackBack,
        1000,
        { transform: { startY: "-1rem", endY: "0" } },
        easeOutExpo
    );
}

export { animateProjectStack };
