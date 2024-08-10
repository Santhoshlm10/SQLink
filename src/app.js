import { platform } from "os";
import { SQLog } from "./utils/logger/logger.js";
import { exec } from "child_process";
import { launchProvider } from "./utils/config/provider.js";
import { createConfig, returnPropertiesPath, writeConfig } from "./utils/config/checker.js";
import { initServer } from "./server/init.js";

export async function validateCommand(command){
    if(command == "run"){
      await initServer()
    }else if(command == "update"){
      let update_command = platform == "win32" ? 'npm install -g sqlink@latest' : 'sudo npm install -g sqlink@latest'
      exec(update_command, (error, stdout, stderr) => {
        if (error) {
          SQLog.error(`Oops!, something went wrong while updating the package, please try again.`,false)
          return;
        }
        if(stdout){
            SQLog.success(`Package updated successfully!!`,false)
            return;  
        }
        if (stderr) {
          SQLog.error(`Oops!, something went wrong while updating the package, please try again.`,false)
          return;
        }})
    }else if(command == "config"){
        await launchProvider().then((res) => {
          let config_path = returnPropertiesPath()
          return {res,config_path}
        }).then((res) => {
          writeConfig(res.res,res.config_path);
        }).then(() => {
          return;
        })
    }else{
        SQLog.error("Unkown command, please press sqlite -h to see options",false)
    }
}