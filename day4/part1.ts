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

// search left in each row looking for XMAS or SAMX
for (const row of grid) {
  for (let window_start = 0; window_start < row.length - 3; ++window_start) {
    const word = row.slice(window_start, window_start + 4).join("");

    if (["XMAS", "SAMX"].includes(word)) {
      count += 1;
    }
  }
}

// search down in each col looking for XMAS or SAMX
for (let col_idx = 0; col_idx < grid[0].length; ++col_idx) {
  for (let window_start = 0; window_start < grid.length - 3; ++window_start) {
    const word =
      grid[window_start][col_idx] +
      grid[window_start + 1][col_idx] +
      grid[window_start + 2][col_idx] +
      grid[window_start + 3][col_idx];

    if (["XMAS", "SAMX"].includes(word)) {
      count += 1;
    }
  }
}

// search in the down-right diagonal
for (let col_idx = 0; col_idx < grid[0].length - 3; ++col_idx) {
  for (let window_start = 0; window_start < grid.length - 3; ++window_start) {
    const word =
      grid[window_start][col_idx] +
      grid[window_start + 1][col_idx + 1] +
      grid[window_start + 2][col_idx + 2] +
      grid[window_start + 3][col_idx + 3];

    if (["XMAS", "SAMX"].includes(word)) {
      count += 1;
    }
  }
}

// search in the down-left diagonal
for (let col_idx = 3; col_idx < grid[0].length; ++col_idx) {
  for (let window_start = 0; window_start < grid.length - 3; ++window_start) {
    const word =
      grid[window_start][col_idx] +
      grid[window_start + 1][col_idx - 1] +
      grid[window_start + 2][col_idx - 2] +
      grid[window_start + 3][col_idx - 3];

    if (["XMAS", "SAMX"].includes(word)) {
      count += 1;
    }
  }
}

console.log(count);
