import fs from "fs";
import { Command } from "commander";
import { error } from "console";
const program = new Command();

program
  .name("words")
  .description("CLI For Count Words In File")
  .version("0.0.1");

program
  .command("words")
  .description("Count Words in a File")
  .argument("<file>", "Source File")
  .action((file) => {
    fs.readFile(file, "utf-8", (error, data) => {
      if (error) {
        console.error(`Error reading file: ${error.message}`);
        return;
      }

      const words = data.split(" ").length;
      console.log(`There are ${words} words in ${file}`);
    });
  });

program.parse(process.argv);
