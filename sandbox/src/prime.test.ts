import { isPrime, generateTo } from './prime';

describe("Prime numbers", () => {
  it("can detect if a number is prime", () => {
    expect(isPrime(3)).toBe(true);
    expect(isPrime(4)).toBe(false);
    expect(isPrime(7)).toBe(true);
    expect(isPrime(8)).toBe(false);
  });

  it("generates numbers until it reaches max", () => {
    expect(generateTo(20)).toEqual(
      [1, 2, 3, 5, 7, 11, 13, 17, 19]
    )
  });
});

