import { mapValue } from "./util";

type DrawFunction = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
) => void;

class AsciiCanvas {
    private mainCanvas: HTMLCanvasElement;
    private sourceCanvas: HTMLCanvasElement;
    private convertCanvas: HTMLCanvasElement;

    private mainCtx: CanvasRenderingContext2D;
    private sourceCtx: CanvasRenderingContext2D;
    private convertCtx: CanvasRenderingContext2D;

    private asciiMap: string;
    private fontSize: string;
    private charPadding: number;

    // timing variables
    private fps: number;
    private lastFrameTime: number;
    private frameInterval: number;

    // integration variables
    private resizeObserver: ResizeObserver;
    private canvasContainer: HTMLDivElement;

    private drawSourceCTX: DrawFunction;

    constructor(
        asciiMap: string,
        fontSize: string,
        drawFunction: DrawFunction,
        charPadding: number = 0,
        fps: number = 60
    ) {
        this.asciiMap = asciiMap;
        this.fontSize = fontSize;
        this.charPadding = charPadding;

        this.drawSourceCTX = drawFunction;

        this.fps = fps;
        this.frameInterval = this.fps ? 1000 / this.fps : 0;
        this.lastFrameTime = 0;
    }

    private resizeCanvas(): void {
        if (!this.canvasContainer || !this.mainCanvas) return;

        const containerWidth = this.canvasContainer.clientWidth;
        const containerHeight = this.canvasContainer.clientHeight;

        this.mainCanvas.width = containerWidth;
        this.mainCanvas.height = containerHeight;

        this.sourceCanvas.width = containerWidth;
        this.sourceCanvas.height = containerHeight;

        this.convertCanvas.height = containerWidth;
        this.convertCanvas.height = containerHeight;

        if (this.frameInterval === 0) this.draw();
    }

    setup(): void {
        const canvasContainer = document.getElementById(
            "asciiContainer"
        ) as HTMLDivElement;

        if (!canvasContainer) {
            console.error("cannot initiate ascii canvas");
            return;
        }

        this.mainCanvas = document.createElement("canvas");
        this.mainCtx = this.mainCanvas.getContext("2d");

        this.mainCanvas.id = "mainCanvas";
        canvasContainer.appendChild(this.mainCanvas);

        this.sourceCanvas = document.createElement("canvas");
        this.sourceCtx = this.sourceCanvas.getContext("2d");

        // size of convert canvas should match source canvas in case text is 1x1 px
        this.convertCanvas = document.createElement("canvas");
        this.convertCtx = this.convertCanvas.getContext("2d");

        ////////////////////
        // SETUP RESIZING //
        ////////////////////

        this.canvasContainer = canvasContainer;

        // set initial size
        this.resizeCanvas();

        this.resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === this.canvasContainer) {
                    this.resizeCanvas();
                }
            }
        });

        this.resizeObserver.observe(this.canvasContainer);
    }

    private draw(timestamp: number = 0): void {
        /////////////////////
        // LIMIT FRAMERATE //
        /////////////////////

        if (
            this.frameInterval &&
            timestamp - this.lastFrameTime < this.frameInterval
        ) {
            requestAnimationFrame((ts) => this.draw(ts));
            return;
        }

        this.lastFrameTime = timestamp;

        ////////////////////
        // RESET CANVASES //
        ////////////////////

        this.mainCtx.clearRect(
            0,
            0,
            this.mainCanvas.width,
            this.mainCanvas.height
        );

        this.sourceCtx.clearRect(
            0,
            0,
            this.sourceCanvas.width,
            this.sourceCanvas.height
        );

        this.convertCtx.clearRect(
            0,
            0,
            this.convertCanvas.width,
            this.convertCanvas.height
        );

        /////////////////
        // DRAW SOURCE //
        /////////////////

        this.drawSourceCTX(this.sourceCtx, this.sourceCanvas);

        //////////////////
        // MEASURE FONT //
        //////////////////

        // can use em or px as font size
        this.mainCtx.font = `${this.fontSize} Google Sans Code`;

        const charMeasurement = this.mainCtx.measureText("@");

        const charWidth = charMeasurement.width + this.charPadding;
        const charHeight =
            charMeasurement.actualBoundingBoxAscent +
            charMeasurement.actualBoundingBoxDescent +
            this.charPadding;

        const charCols = Math.floor(this.mainCanvas.width / charWidth);
        const charRows = Math.floor(this.mainCanvas.height / charHeight);

        /////////////
        // CONVERT //
        /////////////

        const backgroundColor = getComputedStyle(document.documentElement)
            .getPropertyValue("--font-color-2")
            .trim();

        this.mainCtx.fillStyle = backgroundColor;
        this.mainCtx.font = `${this.fontSize} Google Sans Code`;

        // downscale source canavs into convert canvas
        this.convertCtx.imageSmoothingEnabled = false;
        this.convertCtx.drawImage(this.sourceCanvas, 0, 0, charCols, charRows);
        const data = this.convertCtx.getImageData(
            0,
            0,
            charCols,
            charRows
        ).data;

        // map convertctx to text in mainctx
        for (let i = 0; i < charRows; i++) {
            for (let j = 0; j < charCols; j++) {
                const index = (j + i * charCols) * 4; // 4 values per pixel
                const avg =
                    (data[index + 0] + data[index + 1] + data[index + 2]) / 3;

                const mapIndex = Math.floor(
                    mapValue(avg, 0, 255, 0, this.asciiMap.length - 1)
                );

                this.mainCtx.fillText(
                    this.asciiMap.charAt(mapIndex),
                    (j + 0.5) * charWidth,
                    (i + 1) * charHeight // baseline adjustment
                );
            }
        }

        /////////////////////
        // DRAW NEXT FRAME //
        /////////////////////

        if (this.frameInterval) requestAnimationFrame((ts) => this.draw(ts));
    }

    enable(): void {
        if (
            !this.mainCanvas ||
            !this.sourceCanvas ||
            !this.convertCanvas ||
            !this.mainCtx ||
            !this.sourceCtx ||
            !this.convertCtx
        ) {
            console.error("cannot enable ascii canvas");
            return;
        }

        this.draw();
    }
}

export { AsciiCanvas };
