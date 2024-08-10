import express from "express";
import { SQLQueries } from "./queries.js";
import {SQLog} from "./../utils/logger/logger.js"

const procedureRouter = express.Router();

procedureRouter.get('/:procedurename', async (req, res) => {
  const procedure_name = req.params.procedurename;
  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  try {
    SQLog.request(`Request received from ${clientIp} for procedure ${procedure_name}`)
    const items = await SQLQueries.executeProcedure(req.url);
    SQLog.response(`Response send to ${clientIp} from procedure ${procedure_name}`)
    res.json(items);
  } catch (error) {
    res.status(500).send({success:false,message:error.message})
  }
});
export default procedureRouter;


