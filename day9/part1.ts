import fs from "node:fs/promises";

const input = await fs.readFile("input.txt", "utf-8");

const source = [...input.trim()].map(Number);

const disk: (number | null)[] = [];

for (let i = 0; i < source.length; ++i) {
  if (i % 2 === 0) {
    // file
    const file_id = i / 2;
    const file_length = source[i];

    for (let j = 0; j < file_length; ++j) {
      disk.push(file_id);
    }
  } else {
    // gap
    const gap_length = source[i];
    for (let j = 0; j < gap_length; ++j) {
      disk.push(null);
    }
  }
}

while (true) {
  //   console.log(disk.map((f) => (f === null ? "." : String(f))).join(""));

  // traverse forward to try to find a gap
  let gap_idx = null;

  for (let i = 0; i < disk.length; ++i) {
    if (disk[i] === null) {
      gap_idx = i;
      break;
    }
  }

  if (gap_idx === null) break;

  // swap it with the last element
  disk[gap_idx] = disk.at(-1)!;

  // trim the end of the disk
  disk.splice(disk.length - 1, 1);
}

const total = disk.map((val, idx) => val! * idx).reduce((a, b) => a + b, 0);
console.log(total);
