import { easeOutQuint } from "../easing_functions";
import { animate, pause } from "../motion";

// note: initialization is unnecessary because of how complicated the animation is

function animateName(): void {
    const start0 = document.getElementById("start0") as HTMLElement;
    const start1 = document.getElementById("start1") as HTMLElement;
    const tail0 = document.getElementById("tail0") as HTMLElement;
    const tail1 = document.getElementById("tail1") as HTMLElement;
    const end0 = document.getElementById("end0") as HTMLElement;
    const end1 = document.getElementById("end1") as HTMLElement;
    const replace0 = document.getElementById("replace0") as HTMLElement;
    const replace1 = document.getElementById("replace1") as HTMLElement;
    const dotcom = document.getElementById("dotcom") as HTMLElement;

    // get bounding client rects
    const start0Rect = start0.getBoundingClientRect();
    const start1Rect = start1.getBoundingClientRect();
    const tail0Rect = tail0.getBoundingClientRect();
    const tail1Rect = tail1.getBoundingClientRect();
    const end0Rect = end0.getBoundingClientRect();
    const end1Rect = end1.getBoundingClientRect();

    // calculate translation distances
    const word0TranslateX = end0Rect.left - start0Rect.left;
    const word1TranslateX = end1Rect.left - start1Rect.left;

    const word0TailTargetX = end0Rect.left + end0.offsetWidth;
    const word0TailTranslateX = word0TailTargetX - tail0Rect.left;

    const word1TailTargetX = end1Rect.left + end1.offsetWidth;
    const word1TailTranslateX = word1TailTargetX - tail1Rect.left;

    // move word 0
    animate(
        start0,
        1400,
        {
            transform: { startX: 0, endX: word0TranslateX },
        },
        easeOutQuint
    );

    animate(
        tail0,
        1400,
        {
            transform: { startX: 0, endX: word0TailTranslateX },
        },
        easeOutQuint
    );

    // move word 1
    pause(100, () => {
        animate(
            start1,
            1400,
            {
                transform: { startX: 0, endX: word1TranslateX },
            },
            easeOutQuint
        );

        animate(
            tail1,
            1200,
            {
                transform: { startX: 0, endX: word1TailTranslateX },
            },
            easeOutQuint
        );

        animate(
            dotcom,
            1000,
            {
                opacity: 0,
            },
            easeOutQuint,
            () => {
                dotcom.style.setProperty("display", "none");
            }
        );
    });

    // animate first letter of word 0
    pause(100, () => {
        animate(
            start0,
            1000,
            {
                transform: {
                    startY: "0%",
                    endY: "-25%",
                    startX: word0TranslateX,
                    endX: word0TranslateX,
                },
            },
            easeOutQuint
        );

        animate(
            start0,
            600,
            {
                opacity: 0,
            },
            easeOutQuint
        );

        pause(200, () => {
            animate(
                replace0,
                1800,
                {
                    transform: { startY: "25%", endY: "0%" },
                    opacity: 1,
                },
                easeOutQuint
            );
        });
    });

    // animate first letter of word 1
    pause(400, () => {
        animate(
            start1,
            1000,
            {
                transform: {
                    startY: "0%",
                    endY: "-25%",
                    startX: word1TranslateX,
                    endX: word1TranslateX,
                },
            },
            easeOutQuint
        );

        animate(
            start1,
            600,
            {
                opacity: 0,
            },
            easeOutQuint
        );

        pause(200, () => {
            animate(
                replace1,
                1800,
                {
                    transform: { startY: "25%", endY: "0%" },
                    opacity: 1,
                },
                easeOutQuint
            );
        });
    });
}

export { animateName };
