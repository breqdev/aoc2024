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

/**
 * Return the positions in which the guard checked for obstacles along this route.
 */
function getObstacleChecks(grid: string[][]): [number, number][] {
  const checks = [];

  let y = grid.findIndex((row) => row.includes("^"))!;
  let x = grid[y].indexOf("^");
  let facing: "n" | "s" | "e" | "w" = "n";

  while (true) {
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

    checks.push([next_x, next_y] as [number, number]);
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

  return checks;
}

/**
 * Check if this grid would cause a loop.
 */
function loops(grid: string[][]): boolean {
  const poses = new Set<string>();

  let y = grid.findIndex((row) => row.includes("^"))!;
  let x = grid[y].indexOf("^");
  let facing: "n" | "s" | "e" | "w" = "n";

  while (true) {
    const key = `${x},${y},${facing}`;
    if (poses.has(key)) {
      return true;
    }
    poses.add(key);

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
      return false;
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
}

const candidates = getObstacleChecks(grid);

const blocks = new Set<string>();

for (const [candidate_x, candidate_y] of candidates) {
  const new_grid = structuredClone(grid);
  if (new_grid[candidate_y][candidate_x] !== ".") continue;

  new_grid[candidate_y][candidate_x] = "#";
  if (loops(new_grid)) {
    blocks.add(`${candidate_x},${candidate_y}`);
  }
}
console.log(blocks.size);
