import express from "express";
import { argv } from "process";
import { styledUrl1, styledUrl2, styledUrl3 } from "./init.js";
import { STRINGS } from "../strings.js";
import chalk from "chalk";
import { SQLog } from "../utils/logger/logger.js";
import cors from "cors";
import figlet from "figlet";
import { getLocalIpAddress } from "../utils/config/ipconfig.js";
import process from "process";

const app = express();
app.use(cors());
app.use(express.json());

function pathresolver(path) {
  if ([".", "/"].includes(path)) {
    return process.cwd();
  } else {
    return path;
  }
}

export function staticHost() {
  console.log(
    chalk.cyan(figlet.textSync("SQLink Host", { horizontalLayout: "full" }))
  );
  console.log(`\t\t${chalk.yellowBright(STRINGS.APP_VERSION)}`);
  console.log(
    ` Website: ${styledUrl1}  npm: ${styledUrl2}  Github: ${styledUrl3}\n`
  );
  try {
    const path = pathresolver(argv[4]);
    const port = argv[3];
    app.use("/static", (req, res, next) => {
      SQLog.info(`Request recevied for file ${req.url}`, true);
      next();
    });
    app.use("/static", express.static(path));
    let current_ip = getLocalIpAddress();
    app.listen(port, () => {
      SQLog.info(
        `Server is ready to host files from http://${current_ip}:${port}/static${path}, query any static file in the browser to see the response`,
        true
      );
    });
  } catch (error) {
    SQLog.error(STRINGS.UNABLE_TO_START_SERVER, true);
    SQLog.error(STRINGS.HOST_ERROR_MESSAGE, true);
  }
}
