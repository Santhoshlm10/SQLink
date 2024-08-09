import express from "express";
import {getAllItems} from "./queries.js"
const router = express.Router();
router.get('/:tablename/:mode', async (req, res) => {
  const tablename = req.params.tablename;
  try {
    const items = await getAllItems(req.url);
    res.json(items);
  } catch (error) {
    res.status(500).send({success:false,message:error.message})
  }
});
export default router;


