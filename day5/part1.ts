import fs from "node:fs/promises";

const input = await fs.readFile("input.txt", "utf-8");

const [rules_string, orders_string] = input.split("\n\n");

const rules = rules_string
  .split("\n")
  .map((rule_string) => rule_string.trim().split("|").map(Number));

const orders = orders_string
  .trim()
  .split("\n")
  .map((order_string) => order_string.split(",").map(Number));

const result = orders
  .filter(
    (order) =>
      !rules
        .map(([before, after]) => {
          if (order.includes(before) && order.includes(after)) {
            if (order.indexOf(before) > order.indexOf(after)) {
              return false;
            }
          }

          return true;
        })
        .includes(false)
  )
  .map((order) => order[Math.floor(order.length / 2)])
  .reduce((a, b) => a + b, 0);

console.log(result);
