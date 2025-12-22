interface PropertyValue {
    value: number;
    unit: string;
}

type TransformProperties = {
    startX?: string | number;
    endX?: string | number;
    startY?: string | number;
    endY?: string | number;
};

type AnimationProperties = {
    left?: number | string;
    top?: number | string;
    right?: number | string;
    bottom?: number | string;

    opacity?: number | string;

    transform?: TransformProperties;
};

export { PropertyValue, TransformProperties, AnimationProperties };
