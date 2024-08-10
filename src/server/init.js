import chalk from "chalk";
import express from "express";
import tableRouter from "./../server/table.js";
import procedureRouter from "./../server/procedure.js";
import figlet from "figlet";
import { createConfig } from "./../utils/config/checker.js";
import { SQLog } from "./../utils/logger/logger.js";


const websiteurl = 'https://sqlinkjs.github.io/';
const npmurl = 'https://www.npmjs.com/package/sqlink';
const githuburl = 'https://github.com/Santhoshlm10/SQLink';


const styledUrl1 = chalk.blue.underline(websiteurl);
const styledUrl2 = chalk.green.underline(npmurl);
const styledUrl3 = chalk.magenta.underline(githuburl);

const app = express();
const port = 3000;

app.use(express.json());
app.use('/table', tableRouter);
app.use('/procedure', procedureRouter)


export async function initServer(){
    console.log(
        chalk.yellow(figlet.textSync("SQLink", { horizontalLayout: "full" }))
      );
      console.log(`\t\t${chalk.yellowBright('1.0.3')}`)
      console.log(` Website: ${styledUrl1}  npm: ${styledUrl2}  Github: ${styledUrl3}\n`)
      await createConfig("config")
      app.listen(port, () => {
        SQLog.info(`Server is running on http://localhost:${port}, and is ready to respond to your queries`,true)
      });
}