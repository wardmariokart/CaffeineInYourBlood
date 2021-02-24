export const bDebugLog = true;

export const modulo = (number, modulo) => ((number % modulo) + modulo) % modulo // works as expected for negative values. {-1 % 24  = -1} but {modulo(-1, 24) = 23}

export const leadingZeros = (integer, digits) => {let out = integer.toString; while(out.length < digits) out = '0' + out; return out;}