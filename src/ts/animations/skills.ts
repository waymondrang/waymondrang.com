import { easeOutQuint } from "../easing_functions";
import { animate, pause } from "../motion";

const TRIGGER_THRESHOLD = 0.5; // percentage of visibility to trigger
const SCROLL_OFFSET = 100; // pixel offset

let skillHasAnimated = false; // track trigger state

function animateSkills(): void {
    if (skillHasAnimated) return;
    skillHasAnimated = true;

    const skillsContent = document.querySelector(
        "#skills .content"
    ) as HTMLElement;
    const skillsChildren = skillsContent.children;

    Array.from(skillsChildren).forEach((child, index) => {
        const element = child as HTMLElement;

        pause(index * 200, () => {
            animate(
                element,
                1200,
                {
                    transform: { startY: "20px", endY: 0 },
                    opacity: 1,
                },
                easeOutQuint
            );
        });
    });
}

function setupTrigger(): void {
    const skills = document.getElementById("skills") as HTMLElement;
    if (!skills) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (
                    entry.isIntersecting &&
                    entry.intersectionRatio >= TRIGGER_THRESHOLD
                ) {
                    animateSkills();

                    // disconnect observer to prevent re-triggering
                    observer.disconnect();
                }
            });
        },
        {
            threshold: TRIGGER_THRESHOLD,
            rootMargin: `-${SCROLL_OFFSET}px 0px -${SCROLL_OFFSET}px 0px`,
        }
    );

    observer.observe(skills);
}

function initAnimation(): void {
    const skillsContent = document.querySelector(
        "#skills .content"
    ) as HTMLElement;
    if (!skillsContent) return;

    // set initial opacity to 0
    Array.from(skillsContent.children).forEach((child) => {
        const element = child as HTMLElement;
        element.style.opacity = "0";
    });
}

function enableSkillsAnimation(): void {
    initAnimation();
    setupTrigger();
}

export { enableSkillsAnimation };
