import { easeOutQuint } from "../easing";
import { animate, pause } from "../motion";

const TRIGGER_THRESHOLD = 0.5; // percentage of visibility to trigger
const SCROLL_OFFSET = 100; // pixel offset

let connectHasAnimated = false; // track trigger state

function animateConnect(): void {
    if (connectHasAnimated) return;
    connectHasAnimated = true;

    const connectGrid = document.querySelector("#connect .grid") as HTMLElement;
    const connectChildren = connectGrid.children;

    Array.from(connectChildren).forEach((child, index) => {
        const element = child as HTMLElement;

        pause(index * 150, () => {
            animate(
                element,
                1000,
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
    const connect = document.getElementById("connect") as HTMLElement;
    if (!connect) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (
                    entry.isIntersecting &&
                    entry.intersectionRatio >= TRIGGER_THRESHOLD
                ) {
                    animateConnect();

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

    observer.observe(connect);
}

function initAnimation(): void {
    const connectGrid = document.querySelector("#connect .grid") as HTMLElement;
    if (!connectGrid) return;

    // set initial opacity to 0
    Array.from(connectGrid.children).forEach((child) => {
        const element = child as HTMLElement;
        element.style.opacity = "0";
    });
}

function enableConnectAnimation(): void {
    initAnimation();
    setupTrigger();
}

export { enableConnectAnimation };
