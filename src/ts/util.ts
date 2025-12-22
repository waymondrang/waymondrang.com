function scrolledToTop(threshold: number = 100): boolean {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return scrollTop <= threshold;
}

function mapValue(
    rangeAValue: number,
    rangeAStart: number,
    rangeAEnd: number,
    rangeBStart: number,
    rangeBEnd: number
) {
    return (
        rangeBStart +
        (rangeBEnd - rangeBStart) *
            ((rangeAValue - rangeAStart) / (rangeAEnd - rangeAStart))
    );
}

export { mapValue, scrolledToTop };
