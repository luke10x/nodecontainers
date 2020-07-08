export const isPrime = (number: number) => {
    for (let divisor = 2; divisor <= Math.sqrt(number); divisor++) {
        if (number % divisor === 0) {
            return false;
        } 
    }
    return true;
}

export const generateTo = (max: number) => {
    let accum = [];
    for (let i = 1; i <= max; i++) {
        if (isPrime(i)) {
            accum.push(i);
        }
    }
    return accum;
}
