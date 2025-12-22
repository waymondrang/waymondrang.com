import { easeOutQuint } from "../easing_functions";
import { animate } from "../motion";

function animateBio(): void {
    const bio = document.getElementById("bio") as HTMLElement;

    animate(
        bio,
        1000,
        {
            transform: { startY: "30px", endY: 0 },
        },
        easeOutQuint
    );

    animate(
        bio,
        1500,
        {
            opacity: 1,
        },
        easeOutQuint
    );
}

function enableBioAnimation(): void {
    const bio = document.getElementById("bio") as HTMLElement;
    if (!bio) return;

    bio.style.opacity = "0";
}

export { animateBio, enableBioAnimation };
