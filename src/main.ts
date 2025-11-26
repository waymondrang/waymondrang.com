import { animateBio, enableBioAnimation } from "./animations/bio";
import { enableConnectAnimation } from "./animations/connect";
import { animateName } from "./animations/name";
import {
    animateProjects,
    enableProjectsAnimation,
} from "./animations/projects";
import { enableSkillsAnimation } from "./animations/skills";
import { enableDarkModeButton } from "./dark_mode";
import { enableInfoModal } from "./modal";
import { pause } from "./motion";
import { enableHoverTooltip } from "./tooltip";
import { scrolledToTop } from "./util";

document.addEventListener("DOMContentLoaded", () => {
    // initialization functions for animations
    enableConnectAnimation();
    enableSkillsAnimation();
    enableBioAnimation();

    pause(100, () => {
        animateBio();
    });

    pause(600, () => {
        animateName();
    });

    if (scrolledToTop()) {
        enableProjectsAnimation();

        pause(150, () => {
            animateProjects();
        });
    }

    enableInfoModal();
    enableHoverTooltip();
    enableDarkModeButton();
});
