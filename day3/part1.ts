import fs from "node:fs/promises";

const input = await fs.readFile("input.txt", "utf-8");

const result = input
  .matchAll(/mul\((\d+),(\d+)\)/g)
  .map((match) => Number(match[1]) * Number(match[2]))
  .reduce((a, b) => a + b, 0);
console.log(result);
