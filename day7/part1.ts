import fs from "node:fs/promises";

const input = await fs.readFile("input.txt", "utf-8");

type Equation = { values: number[]; result: number };
const equations: Equation[] = input
  .trim()
  .split("\n")
  .map((line) => {
    const [result_str, values_str] = line.split(": ");
    return {
      result: Number(result_str),
      values: values_str.trim().split(" ").map(Number),
    };
  });

function isSolveable(equation: Equation): boolean {
  if (equation.values.length === 1) {
    if (equation.values[0] === equation.result) {
      return true;
    } else {
      return false;
    }
  } else {
    // two cases:
    // we find the first part, then multiply to get our final answer
    if (
      isSolveable({
        values: equation.values.slice(0, -1),
        result: equation.result / equation.values.at(-1)!,
      })
    ) {
      return true;
    }

    // we find the first part, then add to get our final answer
    if (
      isSolveable({
        values: equation.values.slice(0, -1),
        result: equation.result - equation.values.at(-1)!,
      })
    ) {
      return true;
    }

    // no luck
    return false;
  }
}

const result = equations
  .filter(isSolveable)
  .map((e) => e.result)
  .reduce((a, b) => a + b, 0);
console.log(result);
