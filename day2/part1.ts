import fs from "node:fs/promises";

const input = await fs.readFile("input.txt", "utf-8");

const reports = [];

for (const line of input.split("\n")) {
  if (line.trim() === "") continue;
  reports.push(line.split(" ").map(Number));
}

const safe = reports.filter((levels) => {
  let direction = null;

  for (let i = 0; i < levels.length; ++i) {
    if (i === 0) {
      // always valid
      continue;
    } else if (i === 1) {
      if (levels[1] > levels[0]) {
        direction = 1;
      } else if (levels[1] === levels[0]) {
        // must differ by at least 1
        return false;
      } else {
        direction = -1;
      }
    } else if (i > 1) {
      if (levels[i] > levels[i - 1] && direction !== 1) {
        // expected decreasing, got increasing
        return false;
      } else if (levels[i] === levels[i - 1]) {
        // must differ by at least 1
        return false;
      } else if (levels[i] < levels[i - 1] && direction !== -1) {
        // expected increasing, got decreasing
        return false;
      }
    }

    const delta = Math.abs(levels[i] - levels[i - 1]);
    if (delta < 1 || delta > 3) {
      // difference too big
      return false;
    }
  }

  return true; // lgtm
});

console.log(safe.length);
