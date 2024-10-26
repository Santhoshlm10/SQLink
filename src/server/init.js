import chalk from "chalk";
import express from "express";
import tableRouter from "./../server/table.js";
import procedureRouter from "./../server/procedure.js";
import fileuploadrouter from "./../server/fileupload.js";
import figlet from "figlet";
import { SQLog } from "./../utils/logger/logger.js";
import cors from "cors";
import { db_config, returnPropertiesPath } from "../utils/config/checker.js";
import { getLocalIpAddress } from "../utils/config/ipconfig.js";
import { STRINGS } from "../strings.js";
import path from "path";
import os from "os";

const websiteurl = "https://sqlinkjs.github.io/";
const npmurl = "https://www.npmjs.com/package/sqlink";
const githuburl = "https://github.com/Santhoshlm10/SQLink";

export const styledUrl1 = chalk.blue.underline(websiteurl);
export const styledUrl2 = chalk.green.underline(npmurl);
export const styledUrl3 = chalk.magenta.underline(githuburl);

export const app = express();

const homeDir = os.homedir();
const uploads_path = path.join(homeDir, ".sqlink","uploads")
app.use(cors());

app.use(express.json());
app.use("/table", tableRouter);
app.use("/procedure", procedureRouter);


// for file upload and file retrieval
app.use("/upload",fileuploadrouter)
app.use("/file", express.static(uploads_path));

export async function initServer() {
  console.log(
    chalk.yellow(figlet.textSync("SQLink", { horizontalLayout: "full" }))
  );
  console.log(`\t\t${chalk.yellowBright(STRINGS.APP_VERSION)}`);
  console.log(
    ` Website: ${styledUrl1}  npm: ${styledUrl2}  Github: ${styledUrl3}\n`
  );
  const port = db_config.server_port;
  let current_ip = getLocalIpAddress();
  const server = app.listen(port, (err) => {
    if (err) {
      SQLog.error(
        "Unable to start the server, the port might already be in use",
        false
      );
    } else {
      SQLog.info(
        `Reading configuration file from path ${returnPropertiesPath()}`,
        true
      );
      SQLog.info(
        `MySQL  is configured to use the database ${db_config.database_name} with the user ${db_config.user}`,
        true
      );
      SQLog.info(
        `Uploaded files will stored in path ${uploads_path}, and access URL is http://${current_ip}:${port}/file/FILE_NAME`,
        true
      );
      SQLog.info(
        `Server is running on http://${current_ip}:${port}, and is ready to respond to your queries`,
        true
      );
    }
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      SQLog.error(
        "Unable to start the program, port might already be in use",
        false
      );
    } else {
      SQLog.error("Unable to start the program", false);
    }
    process.exit(1);
  });
}
