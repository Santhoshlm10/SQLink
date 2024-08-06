#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";

program
  .version("1.0.0")
  .description("My Node CLI")
  .option("-n, --name <type>", "Add your name")
  .action((options) => {
    console.log(chalk.blue(`Hey, ${options.name}!`));
    console.log(chalk.green(`Hey, ${options.name}!`));
    console.log(chalk.red(`Hey, ${options.name}!`));
  });

program.parse(process.argv);