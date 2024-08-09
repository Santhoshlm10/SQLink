#!/usr/bin/env node


import { program } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import { exec } from "child_process";
import { createConfig } from "./utils/config/checker.js";
import { SQLog } from "./utils/logger/logger.js";
import express from "express";
import  router  from "./server/endpoints.js";

const app = express();
const port = 3000;
app.use(express.json());
app.use('/table', router);

program
  .version("1.0.2")
  .name("sqlink")
  .description("sqlink is a Node.js library that connects to your MySQL or any relational database and generates RESTful APIs based on the table names you provide. Simplify your development process with automatic API creation.")
  .arguments("mode")
  .action(async(name) => {
    if(name == "run"){
      console.log(
        chalk.yellow(figlet.textSync("SQLink", { horizontalLayout: "full" }))
      );
      await createConfig()
    }else if(name == "upgrade"){
      exec('sudo npm install -g sqlink', (error, stdout, stderr) => {
        if (error) {
          SQLog.error(`Error: ${error.message}`)
          return;
        }
        if (stderr) {
          SQLog.error(`Stderr: ${stderr}`)
          return;
        }
      });
    }else{
      SQLog.error("Unknown Command, please enter sqlite -h to see options")
    }
  });
  program.parse(process.argv);
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });