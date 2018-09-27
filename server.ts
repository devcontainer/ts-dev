import { platform } from "os";
export const add = a => b => a + b;
export function sampleFunction(x: string): string {
  return x + x;
}

console.clear();
console.log(sampleFunction("a" + 2), "x", "Edit me");
