import fs from "node:fs/promises";

const input = await fs.readFile("input.txt", "utf-8");

const grid: string[][] = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const antennas: Map<string, [number, number][]> = new Map();

grid.forEach((row, y) =>
  row.forEach((cell, x) => {
    if (cell === ".") return;

    if (!antennas.has(cell)) {
      antennas.set(cell, []);
    }

    antennas.get(cell)!.push([x, y]);
  })
);

const antinodes: Set<string>[][] = grid.map((row) =>
  row.map((cell) => new Set())
);

antennas.entries().forEach(([antenna, positions]) => {
  positions.forEach(([x_1, y_1]) => {
    positions.forEach(([x_2, y_2]) => {
      if (x_1 === x_2 && y_1 === y_2) {
        return;
      }

      const rise = y_2 - y_1;
      const run = x_2 - x_1;

      for (let x_t = 0; x_t < grid[0].length; ++x_t) {
        const y_t = (rise / run) * (x_t - x_1) + y_1;

        if (Math.floor(y_t) !== y_t) continue;

        if (x_t >= 0 && x_t < grid[0].length && y_t >= 0 && y_t < grid.length) {
          antinodes[y_t][x_t].add(antenna);
        }
      }
    });
  });
});

const total = antinodes.flat().filter((cell) => cell.size >= 1).length;
console.log(total);
