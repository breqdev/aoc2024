import fs from "node:fs/promises";

const input = await fs.readFile("input.txt", "utf-8");

const source = [...input.trim()].map(Number);

type Entry =
  | { file_id: number; length: number }
  | { empty: true; length: number };

const disk: Entry[] = [];

for (let i = 0; i < source.length; ++i) {
  if (i % 2 === 0) {
    // file
    const file_id = i / 2;
    const length = source[i];
    disk.push({ file_id, length });
  } else {
    // gap
    const length = source[i];
    disk.push({ empty: true, length });
  }
}

for (let i = disk.length - 1; i >= 0; --i) {
  // console.log(
  //   disk
  //     .map((item) => {
  //       if ("empty" in item) {
  //         return ".".repeat(item.length);
  //       } else {
  //         return String(item.file_id).repeat(item.length);
  //       }
  //     })
  //     .join("")
  // );

  if ("file_id" in disk[i]) {
    // this is a file, try relocating it!
    const file = disk[i];

    for (let j = 0; j < i; ++j) {
      if ("empty" in disk[j]) {
        // this is a gap, try placing it here!
        const gap = disk[j];

        if (file.length < gap.length) {
          // found something! but it's a bit smaller, we still have a gap after

          // fill the gap where the file was
          disk[i] = { empty: true, length: file.length };

          // try to merge our newly created gap with the ones before or after it?
          if (i + 1 < disk.length && "empty" in disk[i + 1]) {
            disk[i].length += disk[i + 1].length;
            disk.splice(i + 1, 1);
          }
          if (i - 1 >= 0 && "empty" in disk[i - 1]) {
            disk[i - 1].length += disk[i].length;
            disk.splice(i, 1);
          }

          // no need to do anything special here, we'll hit the gap on the next iteration
          disk.splice(j + 1, 0, {
            empty: true,
            length: gap.length - file.length,
          });
          disk[j] = file;

          break;
        } else if (file.length === gap.length) {
          // perfect fit!
          disk[j] = file;

          // fill the gap where the file was
          disk[i] = { empty: true, length: file.length };

          // try to merge our newly created gap with the ones before or after it?
          if (i + 1 < disk.length && "empty" in disk[i + 1]) {
            disk[i].length += disk[i + 1].length;
            disk.splice(i + 1, 1);
          }
          if (i - 1 >= 0 && "empty" in disk[i - 1]) {
            disk[i - 1].length += disk[i].length;
            disk.splice(i, 1);
          }

          break;
        }
      }
    }
  }
}

let total = 0;
let index = 0;

for (let diskItem = 0; diskItem < disk.length; ++diskItem) {
  const item = disk[diskItem];
  for (let i = 0; i < item.length; ++i) {
    if ("file_id" in item) {
      total += index * item.file_id;
    }

    index += 1;
  }
}

console.log(total);
