import fs from "node:fs/promises";

const input = await fs.readFile("input.txt", "utf-8");

let enabled = true;

const matches = input.matchAll(/(mul)\((\d+),(\d+)\)|do\(\)|don\'t\(\)/g);

let sum = 0;

for (const match of matches) {
  if (match[1] === "mul") {
    if (enabled) {
      sum += Number(match[2]) * Number(match[3]);
    }
  } else if (match[0] === "do()") {
    enabled = true;
  } else if (match[0] === "don't()") {
    enabled = false;
  }
}

console.log(sum);
