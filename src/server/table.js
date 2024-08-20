import express from "express";
import { SQLog } from "../utils/logger/logger.js";
import { SQLQueries } from "../server/queries.js"



const tableRouter = express.Router();


tableRouter.get('/:tablename/:mode', async (req, res) => {
  let mode = req.params.mode
  const tablename = req.params.tablename;
  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  let items = null
  try {
    SQLog.request(`Request received from ${clientIp} for table ${tablename} of type ${mode}`)
    if (mode.startsWith("read")) {
      items = await SQLQueries.getMethod(req.url);
    } else if (mode.startsWith("distinct")) {
      items = await SQLQueries.distinctMethod(req.url);
    } else {
      res.status(500).send({ success: false, message: "mode operator seems to be invalid, accepts only 'read' for get request" })
    }
    SQLog.response(`Response send to ${clientIp} from table ${tablename} of type ${mode}`)
    res.json(items);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message })
  }
});


tableRouter.post('/:tablename/:mode', async (req, res) => {
  let mode = req.params.mode
  const tablename = req.params.tablename;
  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const payload_body = req.body;
  try {
    SQLog.request(`Request received from ${clientIp} for table ${tablename} of type ${mode}`)
    if (mode.startsWith("create")) {
      const items = await SQLQueries.insertMethod(req.url, payload_body);
      res.json(items);
    } else if (mode.startsWith("upsert")) {
      const items = await SQLQueries.upsertMethod(req.url, payload_body);
      res.json(items);
    }
    else {
      res.status(500).send({ success: false, message: "mode operator seems to be invalid, accepts only 'create' for post request" })
    }
    SQLog.response(`Response send to ${clientIp} from table ${tablename} of type ${mode}`)
  } catch (error) {
    res.status(500).send({ success: false, message: error.message })
  }
});

tableRouter.put('/:tablename/:mode', async (req, res) => {
  let mode = req.params.mode
  if (mode.startsWith("update")) {
    const tablename = req.params.tablename;
    const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const payload_body = req.body
    try {
      SQLog.request(`Request received from ${clientIp} for table ${tablename} of type ${mode}`)
      const items = await SQLQueries.updateMethod(req.url, payload_body);
      SQLog.response(`Response send to ${clientIp} from table ${tablename} of type ${mode}`)
      res.json(items);
    } catch (error) {
      res.status(500).send({ success: false, message: error.message })
    }
  } else {
    res.status(500).send({ success: false, message: "mode operator seems to be invalid, accepts only 'update' for update request" })
  }
});

tableRouter.delete('/:tablename/:mode', async (req, res) => {
  let mode = req.params.mode
  if (mode.startsWith("delete")) {
    const tablename = req.params.tablename;
    const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const payload_body = req.body
    try {
      SQLog.request(`Request received from ${clientIp} for table ${tablename} of type ${mode}`)
      const items = await SQLQueries.deleteMethod(req.url);
      SQLog.response(`Response send to ${clientIp} from table ${tablename} of type ${mode}`)
      res.json(items);
    } catch (error) {
      res.status(500).send({ success: false, message: error.message })
    }
  } else {
    res.status(500).send({ success: false, message: "mode operator seems to be invalid, accepts only 'delete' for delete request" })
  }
});
export default tableRouter;


