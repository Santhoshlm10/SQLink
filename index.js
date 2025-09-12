#!/usr/bin/env node

import { program } from "commander";
import { validateCommand } from "./src/app.js";
import { STRINGS } from "./src/strings.js";

program
  .version(STRINGS.APP_VERSION)
  .name(STRINGS.APP_NAME)
  .description(STRINGS.APP_DESCRIPTION);

program
  .command("run")
  .description(STRINGS.RUN_COMMAND)
  .requiredOption("-h, --host <host>", "Database host (required)")
  .requiredOption("-u, --user <user>", "Database username (required)")
  .requiredOption("-p, --password <password>", "Database password (required)")
  .requiredOption("-P, --port <port>", "Database port (required)")
  .requiredOption("-D, --database_name <database_name>", "Database name (required)")
  .requiredOption("-o, --server_port <server_port>", "Output/server port")
  .action(async (options) => {
    await validateCommand("run", options);
  });
program
  .command("upgrade")
  .description(STRINGS.UPDATE_COMMAND)
  .action(async () => {
    await validateCommand("upgrade");
  });

program
  .command("host")
  .description(STRINGS.HOST_STATIC_FILES)
  .action(async () => {
    await validateCommand("host");
  });

program.parse(process.argv);

if (process.argv.length <= 2) {
  program.help();
}
