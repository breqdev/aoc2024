import fs from "node:fs/promises";

const input = await fs.readFile("input.txt", "utf-8");

const reports = [];

for (const line of input.split("\n")) {
  if (line.trim() === "") continue;
  reports.push(line.split(" ").map(Number));
}

function isValid(levels: number[]) {
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
}

function isValidWithRemoval(levels: number[]) {
  if (isValid(levels)) {
    return true;
  }

  for (let i = 0; i < levels.length; ++i) {
    const without = levels.slice(0, i).concat(levels.slice(i + 1));
    if (isValid(without)) {
      return true;
    }
  }

  return false;
}

const safe = reports.filter(isValidWithRemoval);

console.log(safe.length);
