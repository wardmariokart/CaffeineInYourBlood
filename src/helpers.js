export const bDebugLog = true;

export const modulo = (number, modulo) => ((number % modulo) + modulo) % modulo // works as expected for negative values. {-1 % 24  = -1} but {modulo(-1, 24) = 23}
export const mapRange = (startA, endA, startB, endB, value) => (value - startA) / (endA - startA)  * (endB - startB) + startB
export const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

export const leadingZeros = (integer, digits) => {
    let out = integer.toString();
    while(out.length < digits) out = '0' + out;
    return out;
}



export const TIME = {
    minutesInHour: 60,
    hoursInDay: 24,
    msInMinute: 60 * 1000,
    msInHour: 60 * 60 * 1000
}

export const msToMin = (ms, bFloor) => {
    const minutes = ms / 1000 / 60;
    return bFloor ? Math.floor(minutes) : minutes;
} 
export const minToMs = min => min * TIME.msInMinute;