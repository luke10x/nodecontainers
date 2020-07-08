interface Coin {
    index: number;
    letter: String;
    weight: number;
}

type ScaleResult = "<" | ">" | "=";
const right = (res: ScaleResult) => res == "<";
const left = (res: ScaleResult) => res == ">";
const equal = (res: ScaleResult) => res == "=";
const scale = (plate1: Array<Coin>, plate2: Array<Coin>): ScaleResult => {
    
    const weight1 = plate1.reduce((acc, coin) => acc + coin.weight, 0);
    const weight2 = plate2.reduce((acc, coin) => acc + coin.weight, 0);
    let result: ScaleResult = "=";
    if (weight1 > weight2) {
        result = ">";
    }
    if (weight1 < weight2) {
        result = "<";
    }

    // console.log(
    //     `Weighing ${plate1.reduce((acc, coin) => acc + coin.letter, "")}` +
    //     ` ${result} ${plate2.reduce((acc, coin) => acc + coin.letter, "")}`
    // );

    return result;
};

export const twelveCoinsProblem = (weights: Array<number>): Coin | undefined => {
    const coins = weights.map((weight, index) => {
        return { index, letter: String.fromCharCode(97 + index), weight };
    });
    const [a, b, c, d, e, f, g, h, i, j, k, l] = coins;

    const r1 = scale([a, b, c, d], [e, f, g, h]);

    if (equal(r1)) {

        const d2 = scale([a, b, c], [i, j, k]);
        if (equal(d2)) {
            const r3 = scale([a], [l]);
            if (equal(r3)) return undefined;
            else return l; // + or -
        }
        if (left(d2)) {
            // abcd=efgh && abc>ijk
            // ijk-
            const r3 = scale([j], [k]);
            if (equal(r3)) return i; // -
            if (left(r3)) return k; // -
            if (right(r3)) return j; // -
        }
        if (right(d2)) {
            // abcd=efgh && abc<ijk
            // ijk+
            const r3 = scale([j], [k]);
            if (equal(r3)) return i; // +
            if (right(r3)) return k; // +
            if (left(r3))  return j; // +
        }
    }

    if (left(r1)) {

        const r2 = scale([a, b, c, e], [d, i, j, k]);
        if (equal(r2)) {
            
            // abcd>efgh && abce = dijk
            // removed fgh may be still -
            const r3 = scale([f], [g]);
            if (left(r3))  return g; // -
            if (right(r3)) return f; // -
            if (equal(r3)) return h; // -
        }
        if (left(r2)) {

            // abcd>efgh && abce > dijk
            // remaining abc may be still +
            const r3 = scale([a], [b]);
            if (left(r3))  return a; // + 
            if (right(r3)) return b; // +
            if (equal(r3)) return c; // + 
        }
        if (right(r2)) {
            
            // abcd>efgh && abce < dijk
            // d+ or e- 
            const r3 = scale([d], [i]);
            if (left(r3))  return d; // + 
            if (right(r3)) throw new Error("d-");
            if (equal(r3)) return e; // -
        }
    }

    if (right(r1)) {
        const r2 = scale([a, b, c, e], [d, i, j, k]); 
        if (equal(r2)) {
            // abcd < efgh && abce = dijk
            // fgh are possbly heavier still, but which?
            // weight 2 of them            
            const r3 = scale([f], [g]); 
            if (right(r3)) return g;//+
            if (left(r3))  return f; // +
            if (equal(r3)) return h; // + // If those 2 are equal, then this is heavier
        }
                
        if (right(r2)) {
            // abcd < efgh && abce < dijk 
            // abc is possibly lighter still, but which?
            // weight 2 of them
            const r3 = scale([a], [b]); 
            if (equal(r3)) return c; // -
            if (right(r3)) return a; // -
            if (left(r3))  return b; // -
        }
        if (left(r2)) {
            // abcd < efgh && abce > dijk
            // either e+ or d-
            const d3 = scale([i], [e]); 
            if (equal(d3)) return d; // -
            if (right(d3)) return e; // +
            if (left(d3))  throw new Error("e is + or =");
        }
    }

    throw Error("Should never reach this point");
}