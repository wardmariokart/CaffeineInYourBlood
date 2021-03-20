export const easeInExpo = (t) =>  {
    const d = 1;
    return (t === 0) ? 0 : Math.pow(2, 10 * (t / d - 1));
}

export const easeOutQuad = (t) => {
    return -1 * (t /= 1) * (t - 2);
}

export const easeOutBack = (t, b = 0, c = 1, d = 1) => {
    let s = 1.70158; 
    s = 5;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}