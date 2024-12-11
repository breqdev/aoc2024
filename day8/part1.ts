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

      const dx = x_2 - x_1;
      const dy = y_2 - y_1;
      const antinode_x = x_2 + dx;
      const antinode_y = y_2 + dy;

      if (
        antinode_x >= 0 &&
        antinode_x < antinodes[0].length &&
        antinode_y >= 0 &&
        antinode_y < antinodes.length
      ) {
        antinodes[antinode_y][antinode_x].add(antenna);
      }
    });
  });
});

const total = antinodes.flat().filter((cell) => cell.size >= 1).length;
console.log(total);
