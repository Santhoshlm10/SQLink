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
fileuploadrouter.post("/", upload.array("files", 50), async (req, res) => {
  const port = db_config.server_port;
  try {
    if(!req.files){
      return res.status(500).json({
        success:false,
        message:"please use the payload key name as 'files' to upload"
      })
    }
    const req_arr = req.files.map((item) => {
      return {
        ...item,
        accessURL:`http://${current_ip}:${port}/file/${item.filename}`
      }
    })
    SQLog.request(`File upload request received`, true);
    SQLog.response(`File uploaded successfully`,true)
    return res.json({
      success: true,
      data:req_arr
    });
  } catch (error) {
    SQLog.error(
      `File upload failed ${error.message ? error.message : ""}`,
      true
    );
    return res
      .status(500)
      .json({
        success: false,
        message:
          "Unable to upload the file, please make sure file size is less than 500 MB",
      });
  }
});

export default fileuploadrouter;
