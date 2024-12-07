import fs from "node:fs/promises";

const input = await fs.readFile("input.txt", "utf-8");

const grid: string[][] = [];

for (const row of input.split("\n")) {
  if (!row) continue;

  const grid_row: string[] = [];
  for (const char of row.trim()) {
    grid_row.push(char);
  }

  grid.push(grid_row);
}

const positions = new Set<string>();

let y = grid.findIndex((row) => row.includes("^"))!;
let x = grid[y].indexOf("^");
let facing: "n" | "s" | "e" | "w" = "n";

while (true) {
  positions.add(`${x},${y}`);

  let next_x: number;
  let next_y: number;
  switch (facing) {
    case "n":
      next_x = x;
      next_y = y - 1;
      break;
    case "s":
      next_x = x;
      next_y = y + 1;
      break;
    case "e":
      next_x = x + 1;
      next_y = y;
      break;
    case "w":
      next_x = x - 1;
      next_y = y;
      break;
  }

  if (
    next_x < 0 ||
    next_x >= grid[0].length ||
    next_y < 0 ||
    next_y >= grid.length
  ) {
    break;
  }

  const cell = grid[next_y][next_x];

  if (cell === "#") {
    switch (facing) {
      case "n":
        facing = "e";
        break;
      case "s":
        facing = "w";
        break;
      case "e":
        facing = "s";
        break;
      case "w":
        facing = "n";
        break;
    }
  } else {
    x = next_x;
    y = next_y;
  }
}

console.log(positions.size);
