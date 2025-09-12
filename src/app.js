import { platform } from "os";
import { SQLog } from "./utils/logger/logger.js";
import { exec } from "child_process";
import {
  getAppLatestVersion,
  initConfiguration,
} from "./utils/config/checker.js";
import { initServer } from "./server/init.js";
import { initialiseDatabase } from "./mysql/connector.js";
import { STRINGS } from "./strings.js";
import { staticHost } from "./server/host.js";

export async function validateCommand(command, options) {
  if (command == "run") {
    await initConfiguration(options);
    await initialiseDatabase();
    await initServer(command);
  } else if (command == "upgrade") {
    let latestVersion = await getAppLatestVersion();
    if (latestVersion === STRINGS.APP_VERSION) {
      SQLog.info(STRINGS.ALREADY_UP_TO_DATE);
    } else {
      SQLog.info(`${STRINGS.NEW_VERSION_AVAILABLE} ${latestVersion}.`);
      SQLog.info(`${STRINGS.CURRENT_VERSION} ${STRINGS.APP_VERSION}`);
      let update_command =
        platform() == "win32"
          ? STRINGS.NPM_INSTALL_CMD
          : STRINGS.SUDO_NPM_INSTALL_CMD;
      exec(update_command, (error, stdout, stderr) => {
        if (error) {
          SQLog.error(STRINGS.UPDATE_ERROR, false);
          return;
        }
        if (stdout) {
          SQLog.success(STRINGS.UPDATE_SUCCESSFULLY, false);
          return;
        }
        if (stderr) {
          SQLog.error(STRINGS.UPDATE_ERROR, false);
          return;
        }
      });
    }
  } else if (command == "host") {
    staticHost();
  }else {
    SQLog.error(STRINGS.UNKNOWN_COMMAND, false);
  }
}
