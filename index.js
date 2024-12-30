const fs = require("fs");

fs.readFile("b.txt", "utf-8", (err, data) => {
  console.log(data);
});

console.log("This is after async file");

const data = fs.readFileSync("a.txt", "utf-8");
console.log(data);

console.log("This is after sync file");
