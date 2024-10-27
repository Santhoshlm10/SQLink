
import fs from "fs";
import path from "path";
import os from "os"
import { SQLog } from "../logger/logger.js";
import { launchProvider } from "./provider.js";
import { STRINGS } from "../../strings.js";

const homeDir = os.homedir();

export let db_config = {};
export let uploads_folder = null;


export async function hasConfiguration(){
    const sqlinkDir = path.join(homeDir, '.sqlink');
    const propertiesFilePath = path.join(sqlinkDir, 'properties.json');
    let pathExists = fs.existsSync(propertiesFilePath)
    return pathExists
}

// this function checks if there is a upload folder in .sqlink/uploads, if not create one.
export async function verifyUploadsFolder(){
    const uploadsFolder = path.join(homeDir,".sqlink","uploads")
    let exists = fs.existsSync(uploadsFolder)
    if(!exists){
        fs.mkdirSync(uploadsFolder, { recursive: true });
    }
    uploads_folder = uploadsFolder;
    return;
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
        SQLog.info(STRINGS.RERUN_STATEMENT, false);
        return;
    } catch (err) {
        SQLog.error(`Error writing to file ${ppfilePath}: ${err.message}`, false);
        return;
    }
}

export async function createConfigurationIfNotPresent(){
    const sqlinkDir = path.join(homeDir, '.sqlink');
    if (!fs.existsSync(sqlinkDir)) {
        fs.mkdirSync(sqlinkDir, { recursive: true });
        SQLog.info(`Directory created at ${sqlinkDir}`,true)
    }
    return true;
}

export async function initConfiguration(){
    const jsonFilePath = returnPropertiesPath()
    const data = await fs.readFileSync(jsonFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    await verifyUploadsFolder();
    db_config = jsonData
    return;
}