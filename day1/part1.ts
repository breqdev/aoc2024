import fs from "node:fs/promises";

const input = await fs.readFile("input.txt", "utf-8");

const list_a: number[] = [];
const list_b: number[] = [];

for (const line of input.split("\n")) {
  if (line.trim() === "") continue;
  const [first, second] = line.trim().split(/\s+/).map(Number);
  list_a.push(first);
  list_b.push(second);
}

list_a.sort((a, b) => a - b);
list_b.sort((a, b) => a - b);

const result = list_a
  .map((a, i) => Math.abs(a - list_b[i]))
  .reduce((a, b) => a + b, 0);

console.log(result);
