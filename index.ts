import {platform} from 'os';
export const add = (a) => (b) => a + b;
export function sampleFunction(x: string): string {
    return x + x;
}
console.clear();
console.log(sampleFunction('5'), platform());
