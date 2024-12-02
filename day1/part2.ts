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

const counts_b = list_b.reduce((acc, b) => {
  acc[b] = (acc[b] || 0) + 1;
  return acc;
}, {} as Record<number, number>);

const result = list_a
  .map((a) => (counts_b[a] || 0) * a)
  .reduce((a, b) => a + b, 0);

console.log(result);
