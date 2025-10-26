import {
    AnimationProperties,
    PropertyValue,
    TransformProperties,
} from "./types";

/**
 * todo:
 * - implement per-property delays and curves per animation
 */

const specialPropertyUnits: { [key: string]: string } = {
    opacity: "",
};

function parseValue(value: string | number, property?: string): PropertyValue {
    const unit =
        property in specialPropertyUnits
            ? specialPropertyUnits[property]
            : "px";

    if (typeof value === "number") {
        const parsedValue: PropertyValue = {
            value: value,
            unit: unit, // no default unit
        };

        return parsedValue;
    }

    // assert(typeof value === "string");

    /**
     * regex breakdown:
     *
     * 1st group: complete value
     * 2nd group: decimal value (including period)
     * 3rd group: unit
     *
     * note: match indices are 1-indexed
     */
    const match = value.match(/^(-?\d+(\.\d+)?)([a-z%]*)$/i);

    if (match) {
        const parsedValue: PropertyValue = {
            value: parseFloat(match[1]),
            unit: match[3] || unit,
        };

        return parsedValue;
    }
}

function pause(duration: number, callback?: () => void): void {
    if (duration < 0) {
        console.error("pause duration must be non-negative");
        return;
    }

    setTimeout(() => {
        if (callback) {
            callback();
        }
    }, duration);
}

function calculateProgress(
    elapsedTime: number,
    duration: number,
    delay: number,
    easingFunction: (t: number) => number
) {
    const ratio = Math.max(Math.min(1, (elapsedTime - delay) / duration), 0);
    const progress = easingFunction(ratio);
    return progress;
}

function animate(
    target: HTMLElement,
    duration: number,
    properties: AnimationProperties,
    easingFunction: (t: number) => number,
    callback?: () => void
) {
    const startTime = performance.now();

    // parse starting properties
    const initialStyles = getComputedStyle(target);
    const startProperties: Record<string, PropertyValue> = {};

    for (const property in properties) {
        const value = initialStyles.getPropertyValue(property);
        startProperties[property] = parseValue(value, property);
    }

    // parse ending properties
    const endProperties: Record<string, PropertyValue> = {};
    let transformProperties: TransformProperties | null = null;

    for (const property in properties) {
        // handle special transform property
        if (property === "transform") {
            transformProperties = properties[property];
            continue;
        }

        const value = properties[property as keyof AnimationProperties] as
            | string
            | number;
        const parsedValue = parseValue(value, property);

        // check if units match
        if (
            startProperties[property] &&
            startProperties[property].unit !== parsedValue.unit
        ) {
            console.error(
                `target value for property ${property} in element ${target.outerHTML} has mismatching unit (${startProperties[property].unit} vs ${parsedValue.unit})`
            );
            continue;
        }

        endProperties[property] = parsedValue;
    }

    function tick(currentTime: number) {
        const ratio = Math.min(1, (currentTime - startTime) / duration);
        const progress = easingFunction(ratio);

        // update element style for each regular property
        for (const property in endProperties) {
            const startValue = startProperties[property].value;
            const endValue = endProperties[property].value;
            const unit = startProperties[property].unit;

            const currentValue =
                startValue + (endValue - startValue) * progress;

            target.style.setProperty(property, currentValue + unit);
        }

        // handle transform properties
        if (transformProperties) {
            const transformParts: string[] = [];

            if (
                transformProperties.startX !== undefined &&
                transformProperties.endX !== undefined
            ) {
                const startX = parseValue(transformProperties.startX);
                const endX = parseValue(transformProperties.endX);
                const currentX =
                    startX.value + (endX.value - startX.value) * progress;
                transformParts.push(`translateX(${currentX}${startX.unit})`);
            }

            if (
                transformProperties.startY !== undefined &&
                transformProperties.endY !== undefined
            ) {
                const startY = parseValue(transformProperties.startY);
                const endY = parseValue(transformProperties.endY);
                const currentY =
                    startY.value + (endY.value - startY.value) * progress;
                transformParts.push(`translateY(${currentY}${startY.unit})`);
            }

            if (transformParts.length > 0) {
                target.style.transform = transformParts.join(" ");
            }
        }

        // stop progress
        if (progress >= 1) {
            if (callback) callback();
            return;
        }

        // continue animation
        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}

export { pause, animate, calculateProgress };
