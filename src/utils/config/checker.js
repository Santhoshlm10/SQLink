
import fs from "fs";
import path from "path";
import os from "os"
import { SQLog } from "../logger/logger.js";
import { launchProvider } from "./provider.js";

const homeDir = os.homedir();

export let db_config = {}

export async function hasConfiguration(){
    const sqlinkDir = path.join(homeDir, '.sqlink');
    const propertiesFilePath = path.join(sqlinkDir, 'properties.json');
    let pathExists = fs.existsSync(propertiesFilePath)
    return pathExists
}

export function returnPropertiesPath(){
    const sqlinkDir = path.join(homeDir, '.sqlink');
    const propertiesFilePath = path.join(sqlinkDir, 'properties.json');
    return propertiesFilePath
}


export function writeConfig(configContent,ppfilePath){
    try {
        fs.writeFileSync(ppfilePath, JSON.stringify(configContent, null, 2), 'utf-8');
        SQLog.info(`Config file created at ${ppfilePath}`, false);
        SQLog.info(`Please run 'sqlink run' command to start the program with applied MySQL configuration, or use 'sqlink config' to update the configuration.`, false);
        return;
    } catch (err) {
        SQLog.error(`Error writing to file ${ppfilePath}: ${err.message}`, false);
        return;
    }
}

export async function initConfiguration(){
    const jsonFilePath = returnPropertiesPath()
    const data = await fs.readFileSync(jsonFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    db_config = jsonData
    return;
}