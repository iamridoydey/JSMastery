const { resolve } = require("dns");
const fs = require("fs");

// Callback approach
// const cleanFile = (file, onDone) => {
//   fs.readFile(file, "utf-8", (error, data) => {
//     if (error) {
//       throw new Error("Error reading file");
//     }

//     // Then clean up the data
//     const cleanData = data.trim();

//     // Then write the clean data in this file again

//     fs.writeFile(file, cleanData, onDone);
//   });
// };

// function onDone() {
//   console.log("file has been cleaned");
// }
// cleanFile("a.txt", onDone);

// Promise approach
const cleanFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (error, data) => {
      if (error) {
        reject(error);
      }

      const cleanData = data.trim();

      fs.writeFile(file, cleanData, () => {
        resolve();
        console.log("Resolve printed")
      });
    });
  });
};

async function main() {
  await cleanFile("a.txt").then(() => console.log("File being readed"));

  console.log("file has been cleaned");
}

main();
