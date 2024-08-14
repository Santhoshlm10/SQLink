#!/usr/bin/env node


import { program } from "commander";
import { validateCommand } from "./src/app.js";

program
  .version("1.0.9")
  .name("sqlink")
  .description("SQLink is a Node.js library that turns MySQL tables into RESTful APIs with procedure execution and full CRUD support.")
  .option("run", "runs the sqlink program")
  .option("update", "updates the library to the latest version")
  .option("config", "you can update the mysql configuration from CLI")
  .arguments("option")
  .action(async(command) => {
      await validateCommand(command)
  });
program.parse(process.argv);
