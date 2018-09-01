import { add, sampleFunction } from '.';

test('adds 1 + 2 to equal 3', () => {
    expect(add(5)(3)).toBe(8);
  }
);
describe("This is a simple test", () => {
  test("Check the sampleFunction function", () => {
    expect(sampleFunction("hello")).toEqual("hellohello");
  });
});