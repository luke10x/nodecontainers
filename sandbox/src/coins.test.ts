import { twelveCoinsProblem } from './coins';
describe("It can solve this problem", () => {
    it("It can find the light coin", () => {
        const coinWeights = [
            10, 10, 10, 10,
            10, 10, 10, 10,
            10,  5, 10, 10
        ];

        expect(twelveCoinsProblem(coinWeights)).toBe(9); 
    });
});
