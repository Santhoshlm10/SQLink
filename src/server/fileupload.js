import express from "express";
import multer from "multer";
import { SQLog } from "../utils/logger/logger.js";
import { db_config, uploads_folder } from "../utils/config/checker.js";
import { getLocalIpAddress } from "../utils/config/ipconfig.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploads_folder); 
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({
    storage,
    limits: {
      fileSize: 500 * 1024 * 1024,
    },
  });
  
const fileuploadrouter = express.Router();
let current_ip = getLocalIpAddress();
fileuploadrouter.post("/", upload.single('file'), async(req,res) => {
  const port = db_config.server_port;
    try {
        SQLog.request(`File uploaded sucessfully on path: ${req.file.path}`,true)
        SQLog.response(`File access generated with URL: http://${current_ip}:${port}/file/${req.file.filename}`,true)
        return res.json({success:true,filename:req.file.filename,filepath:req.file.path,accessURL:`http://${current_ip}:${port}/file/${req.file.filename}`})
      } catch (error) {
        SQLog.error(`File upload failed ${error.message ? error.message : ''}`,true)
        return res.status(500).statusMessage("Unable to upload the file, please make sure file size is less than 500 MB")
    }
});

export default fileuploadrouter;

