import fs from "node:fs/promises";

const input = await fs.readFile("input.txt", "utf-8");

const grid = input
  .trim()
  .split("\n")
  .map((line) => line.split("").map(Number));

function bfsForNines(start_x: number, start_y: number): number {
  const explored = new Set<`${number}-${number}`>();
  const queue: `${number}-${number}`[] = [];
  const nines = new Set<`${number}-${number}`>();

  queue.push(`${start_x}-${start_y}`);

  while (queue.length > 0) {
    const posn = queue.shift()!;
    const [x, y] = posn.split("-").map(Number);

    if (grid[y][x] === 9) {
      nines.add(posn);
    } else {
      const next_step = grid[y][x] + 1;

      const candidates: `${number}-${number}`[] = [];

      if (y - 1 >= 0 && grid[y - 1][x] === next_step) {
        candidates.push(`${x}-${y - 1}`);
      }
      if (y + 1 < grid.length && grid[y + 1][x] === next_step) {
        candidates.push(`${x}-${y + 1}`);
      }
      if (x - 1 >= 0 && grid[y][x - 1] === next_step) {
        candidates.push(`${x - 1}-${y}`);
      }
      if (x + 1 < grid[0].length && grid[y][x + 1] === next_step) {
        candidates.push(`${x + 1}-${y}`);
      }

      for (const candidate of candidates) {
        if (!explored.has(candidate)) {
          queue.push(candidate);
        }
      }
    }
  }

  return nines.size;
}

let total = 0;

grid.forEach((row, y) =>
  row.forEach((cell, x) => {
    if (cell === 0) {
      total += bfsForNines(x, y);
    }
  })
);

console.log(total);
