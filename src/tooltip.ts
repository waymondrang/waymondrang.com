function enableHoverTooltip() {
    const tooltip = document.getElementById("hoverTooltip") as HTMLElement;

    if (!tooltip) {
        console.error("hover tooltip element not found");
        return;
    }

    let targetElement: HTMLElement | null = null;
    let touching: boolean = false;

    function isExternalLink(url: string): boolean {
        try {
            const linkUrl = new URL(url, window.location.href);
            return linkUrl.hostname !== window.location.hostname;
        } catch {
            return false;
        }
    }

    function setTooltipText(target: HTMLElement | null) {
        if (!target) {
            console.warn("trying to set tooltip text using undefined target");
            return;
        }

        let tooltipContent = "";

        // Check if target is an anchor element
        if (target.tagName.toLowerCase() === "a") {
            const href = target.getAttribute("href");
            if (!href) return;

            const isExternal = isExternalLink(href);
            const targetBlank = target.getAttribute("target") === "_blank";

            // tooltip content for anchor elements
            tooltipContent = `<span>${href}</span>`;

            if (isExternal || targetBlank) {
                tooltipContent += `<span class="material-symbols-outlined symbol">arrow_outward</span>`;
            }

            // wrap in content div
            tooltipContent = `<div class="content">${tooltipContent}</div>`;
        } else {
            // Use data-tooltip-content attribute for non-anchor elements
            const dataTooltipContent = target.getAttribute(
                "data-tooltip-content"
            );
            const dataTooltipRawContent = target.getAttribute(
                "data-tooltip-content-raw"
            );

            if (!dataTooltipContent) {
                if (!dataTooltipRawContent) return;

                tooltipContent = `${dataTooltipRawContent}`;

                tooltipContent = `<div class="rawContent">${tooltipContent}</div>`;
                // note: do not wrap raw content in content div
            } else {
                tooltipContent = `<span>${dataTooltipContent}</span>`;

                // wrap in content div
                tooltipContent = `<div class="content">${tooltipContent}</div>`;
            }
        }

        tooltip.innerHTML = tooltipContent;
    }

    function showTooltip(target: HTMLElement, event: MouseEvent | Touch): void {
        setTooltipText(target);
        tooltip.classList.add("visible");
        updateTooltip(event);
    }

    function hideTooltip(): void {
        tooltip.classList.remove("visible");
        targetElement = null;
        touching = false;
    }

    function updateTooltip(event: MouseEvent | Touch): void {
        if (!targetElement) {
            return;
        }

        // note: need to get rect here because of dynamic width of text
        const tooltipRect = tooltip.getBoundingClientRect();
        const padding = 10;

        let x = event.clientX + padding;
        let y = event.clientY - tooltipRect.height - padding;

        // display tooltip on left of mouse if overflowing
        if (x + tooltipRect.width + padding > window.innerWidth) {
            x = event.clientX - tooltipRect.width - padding;
        }

        // if still overflowing display as left as possible
        if (x < 0) {
            x = padding;
        }

        // display tooltip beneath mouse if overflowing or if specified by user
        if (y < 0 || targetElement.classList.contains("hoverTipBottom")) {
            y = event.clientY + padding;
        }

        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
    }

    // desktop mouse handlers
    document.addEventListener("mouseover", (event) => {
        const target = event.target as Element;

        const hoverElement = target.closest(".hoverTip") as HTMLElement;

        if (hoverElement && hoverElement !== targetElement) {
            targetElement = hoverElement;
            showTooltip(hoverElement, event as MouseEvent);
        }
    });

    document.addEventListener("mouseout", (event) => {
        const relatedTarget = (event as MouseEvent).relatedTarget as Element;

        // check if we're leaving a hover link
        if (
            targetElement &&
            !targetElement.contains(relatedTarget) &&
            !tooltip.contains(relatedTarget)
        ) {
            hideTooltip();
        }
    });

    document.addEventListener("mousemove", (event) => {
        if (targetElement && tooltip.classList.contains("visible")) {
            updateTooltip(event);
        }
    });

    // touch event handlers
    document.addEventListener("touchstart", (event) => {
        const target = event.target as Element;
        const hoverElement = target.closest(".hoverTip") as HTMLElement;

        if (hoverElement) {
            event.preventDefault();

            targetElement = hoverElement;
            touching = true;

            showTooltip(hoverElement, event.touches[0]);
        } else {
            //
            if (tooltip.classList.contains("visible")) {
                hideTooltip();
            }
        }
    });

    // hide tooltip on scroll (only on mobile)
    document.addEventListener(
        "scroll",
        () => {
            if (touching && tooltip.classList.contains("visible")) {
                hideTooltip();
            }
        },
        { passive: true }
    );

    // hide tooltip on window resize
    window.addEventListener("resize", () => {
        if (tooltip.classList.contains("visible")) {
            hideTooltip();
        }
    });

    // subscribe to potential tooltip content changes
    document.addEventListener("updatetooltip", () => {
        setTooltipText(targetElement);
    });
}

export { enableHoverTooltip };
