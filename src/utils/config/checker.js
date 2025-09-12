
import fs from "fs";
import path from "path";
import os from "os"

const homeDir = os.homedir();

export let db_config = {};
export let uploads_folder = null;


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



export async function initConfiguration(options){
    await verifyUploadsFolder();
    db_config = options
    return;
}

export async function getAppLatestVersion(){
    let res = await fetch("https://registry.npmjs.com/sqlink")
    let data = await res.json();
    if(data["dist-tags"]["latest"]){
        return data["dist-tags"]["latest"]
    }
    return null;
}