import { twelveCoinsProblem } from './coins';
describe("Find counterfeit coin out of 12", () => {
    it("finds the light coin", () => {
        expect(twelveCoinsProblem([ 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10])?.letter).toBe("a");
        expect(twelveCoinsProblem([10,  9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10])?.letter).toBe("b");
        expect(twelveCoinsProblem([10, 10,  9, 10, 10, 10, 10, 10, 10, 10, 10, 10])?.letter).toBe("c");
        expect(twelveCoinsProblem([10, 10, 10,  9, 10, 10, 10, 10, 10, 10, 10, 10])?.letter).toBe("d");
        expect(twelveCoinsProblem([10, 10, 10, 10,  9, 10, 10, 10, 10, 10, 10, 10])?.letter).toBe("e");
        expect(twelveCoinsProblem([10, 10, 10, 10, 10,  9, 10, 10, 10, 10, 10, 10])?.letter).toBe("f");
        expect(twelveCoinsProblem([10, 10, 10, 10, 10, 10,  9, 10, 10, 10, 10, 10])?.letter).toBe("g");
        expect(twelveCoinsProblem([10, 10, 10, 10, 10, 10, 10,  9, 10, 10, 10, 10])?.letter).toBe("h");
        expect(twelveCoinsProblem([10, 10, 10, 10, 10, 10, 10, 10,  9, 10, 10, 10])?.letter).toBe("i");
        expect(twelveCoinsProblem([10, 10, 10, 10, 10, 10, 10, 10, 10,  9, 10, 10])?.letter).toBe("j");
        expect(twelveCoinsProblem([10, 10, 10, 10, 10, 10, 10, 10, 10, 10,  9, 10])?.letter).toBe("k");
        expect(twelveCoinsProblem([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,  9])?.letter).toBe("l");
    });

    it("finds the heavy coin", () => {
        expect(twelveCoinsProblem([11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10])?.letter).toBe("a");
        expect(twelveCoinsProblem([10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10])?.letter).toBe("b");
        expect(twelveCoinsProblem([10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10])?.letter).toBe("c");
        expect(twelveCoinsProblem([10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10])?.letter).toBe("d");
        expect(twelveCoinsProblem([10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10])?.letter).toBe("e");
        expect(twelveCoinsProblem([10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10])?.letter).toBe("f");
        expect(twelveCoinsProblem([10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10])?.letter).toBe("g");
        expect(twelveCoinsProblem([10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10])?.letter).toBe("h");
        expect(twelveCoinsProblem([10, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10])?.letter).toBe("i");
        expect(twelveCoinsProblem([10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10])?.letter).toBe("j");
        expect(twelveCoinsProblem([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 10])?.letter).toBe("k");
        expect(twelveCoinsProblem([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11])?.letter).toBe("l");
    });

    it("detects that all coins are good", () => {
        expect(twelveCoinsProblem([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10])).toBe(undefined);
    });
});
