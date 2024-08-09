
import fs from "fs";
import path from "path";
import os from "os"
import { SQLog } from "../logger/logger.js";

const homeDir = os.homedir();

export async function createConfig() {
    const sqlinkDir = path.join(homeDir, '.sqlink');
    const propertiesFilePath = path.join(sqlinkDir, 'properties.json');
    
    if (!fs.existsSync(sqlinkDir)) {
        try {
            fs.mkdirSync(sqlinkDir);
        } catch (err) {
            SQLog.error(`Error creating directory ${sqlinkDir}: ${err.message}`)
            return;
        }
    }

    if (!fs.existsSync(propertiesFilePath)) {
        const propertiesContent = {
            "database": {
                "host": "localhost",
                "port": 3306,
                "user": "root",
                "password": "password",
                "database": "mydb"
            },
            "server": {
                "port": 3000
            }
        }

        try {
            fs.writeFileSync(propertiesFilePath, JSON.stringify(propertiesContent, null, 2), 'utf-8');
            SQLog.info(`Config file created at ${propertiesFilePath}`)
        } catch (err) {
            SQLog.error(`Error writing to file ${propertiesFilePath}: ${err.message}`)
        }
    } else {
        SQLog.info(`Reading configuration file from: ${propertiesFilePath}`)
    }
}

