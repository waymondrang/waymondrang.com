function linear(t: number) {
    return t;
}

function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

function easeOutQuint(t: number) {
    const t1 = t - 1;
    return 1 + t1 * t1 * t1 * t1 * t1;
}

function easeInOutExpo(t: number) {
    if (t === 0 || t === 1) {
        return t;
    }

    const scaledTime = t * 2;
    const scaledTime1 = scaledTime - 1;

    if (scaledTime < 1) {
        return 0.5 * Math.pow(2, 10 * scaledTime1);
    }

    return 0.5 * (-Math.pow(2, -10 * scaledTime1) + 2);
}

function easeOutExpo(t: number) {
    if (t === 1) {
        return 1;
    }

    return -Math.pow(2, -10 * t) + 1;
}

export { linear, easeInOutCubic, easeOutQuint, easeInOutExpo, easeOutExpo };
