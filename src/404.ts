import { AsciiArt } from "./ascii_art";
import { AsciiCanvas } from "./ascii_canvas";
import { enableHoverTooltip } from "./tooltip";

document.addEventListener("DOMContentLoaded", () => {
    const asciiArt = new AsciiArt();
    const asciiCanvas = new AsciiCanvas(
        " 40404",
        "1em",
        asciiArt.draw.bind(asciiArt),
        4,
        14
    );

    asciiCanvas.setup();
    asciiCanvas.enable();

    updatevh();

    enableHoverTooltip();
});

function updatevh() {
    document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
    );
}

window.addEventListener("resize", () => {
    updatevh();
});
