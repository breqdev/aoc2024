import fs from "node:fs/promises";

const input = await fs.readFile("input.txt", "utf-8");

const grid: string[][] = [];

for (const line of input.split("\n")) {
  if (!line) continue;

  const row = [];
  for (const cell of line) {
    row.push(cell);
  }

  grid.push(row);
}

let count = 0;

for (let row_idx = 1; row_idx < grid.length - 1; ++row_idx) {
  for (let col_idx = 1; col_idx < grid[0].length - 1; ++col_idx) {
    if (grid[row_idx][col_idx] === "A") {
      // check first diagonal
      const tl = grid[row_idx - 1][col_idx - 1];
      const br = grid[row_idx + 1][col_idx + 1];
      if ((tl === "M" && br === "S") || (tl === "S" && br === "M")) {
        // check second diagonal
        const tr = grid[row_idx - 1][col_idx + 1];
        const bl = grid[row_idx + 1][col_idx - 1];
        if ((tr === "M" && bl === "S") || (tr === "S" && bl === "M")) {
          count += 1;
        }
      }
    }
  }
}

console.log(count);
