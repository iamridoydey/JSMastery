import fs from "fs";
import { Command } from "commander";
const program = new Command();

program
  .name("counter")
  .description("CLI to do file-based tasks")
  .version("0.8.0");

program
  .command("count")
  .description("Count the number of lines in a file")
  .argument("<file>", "file to count")
  .action((file) => {
    console.log(file)
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err.message}`);
      } else {
        const lines = data.split("\n").length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });

program.parse();
