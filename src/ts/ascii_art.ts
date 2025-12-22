import { easeInOutCubic } from "./easing_functions";
import { calculateProgress } from "./motion";

class AsciiArt {
    private img: HTMLImageElement;

    private startTime: number;
    private animationDuration: number;

    constructor() {
        this.img = new Image();
        this.img.src = "/assets/img/logo gradient.png";

        this.startTime = performance.now();
        this.animationDuration = 30000;
    }

    draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        const currentTime = performance.now();

        if (currentTime - this.startTime > this.animationDuration) {
            this.startTime = performance.now();
        }

        const elapsedTime = currentTime - this.startTime;

        // moves the first ball out of the frame
        const progress1 = calculateProgress(
            elapsedTime,
            5000,
            0,
            easeInOutCubic
        );

        // moves the second ball into the frame
        const progress2 = calculateProgress(
            elapsedTime,
            5000,
            2000,
            easeInOutCubic
        );

        // moves the second ball out of frame
        const progress3 = calculateProgress(
            elapsedTime,
            5000,
            13000,
            easeInOutCubic
        );

        // moves the clone ball up after second ball
        const progress4 = calculateProgress(
            elapsedTime,
            5000,
            15000,
            easeInOutCubic
        );

        // ctx.fillStyle = "rgba(100, 100, 100)";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (this.img.complete) {
            const minEdge = Math.max(canvas.width, canvas.height);

            // center the image on the canvas
            const x = (canvas.width - minEdge) / 2;
            const y = (canvas.height - minEdge) / 2;

            // first ball
            ctx.drawImage(
                this.img,
                x + (canvas.width - x) * progress1,
                y,
                minEdge,
                minEdge
            );

            // second ball
            ctx.drawImage(
                this.img,
                x -
                    (canvas.width - x) +
                    (canvas.width - x) * progress2 +
                    (canvas.width - x) * progress3,
                y,
                minEdge,
                minEdge
            );

            // third ball
            ctx.drawImage(
                this.img,
                x - (canvas.width - x) + (canvas.width - x) * progress4,
                y,
                minEdge,
                minEdge
            );
        }
    }
}

export { AsciiArt };
