
import fs from "fs";
import path from "path";
import os from "os"
import { SQLog } from "../logger/logger.js";
import { launchProvider } from "./provider.js";

const homeDir = os.homedir();

export async function createConfig() {
    const sqlinkDir = path.join(homeDir, '.sqlink');
    const propertiesFilePath = path.join(sqlinkDir, 'properties.json');
    
    if (!fs.existsSync(sqlinkDir)) {
        try {
            fs.mkdirSync(sqlinkDir);
        } catch (err) {
            SQLog.error(`Error creating directory ${sqlinkDir}: ${err.message}`, true);
            return;
        }
    }

    if (!fs.existsSync(propertiesFilePath)) {
        try {
            let config_props = await launchProvider();
            writeConfig(config_props,propertiesFilePath);
        } catch (err) {
            SQLog.error(`Error writing config properties: ${err.message}`, false);
            return;
        }

    } else {
        SQLog.info(`Reading configuration file from: ${propertiesFilePath} (run 'sqlink config' to update configuration)`, true);
    }
}


export function returnPropertiesPath(){
    const sqlinkDir = path.join(homeDir, '.sqlink');
    const propertiesFilePath = path.join(sqlinkDir, 'properties.json');
    return propertiesFilePath
}


export function writeConfig(configContent,ppfilePath){
    try {
        fs.writeFileSync(ppfilePath, JSON.stringify(configContent, null, 2), 'utf-8');
        SQLog.info(`Config file created at ${ppfilePath}`, true);
        SQLog.info(`Please run 'sqlink run' command to start the program with applied MySQL configuration`, false);
        return;
    } catch (err) {
        SQLog.error(`Error writing to file ${ppfilePath}: ${err.message}`, false);
        return;
    }
}
