import express from "express";
const procedureRouter = express.Router();
procedureRouter.get('/:procedurename', async (req, res) => {
  const tablename = req.params.tablename;
  try {
    // const items = await getAllItems(req.url);
    // res.json(items);
    res.status(200).send({message:"done",success:true})
  } catch (error) {
    res.status(500).send({success:false,message:error.message})
  }
});
export default procedureRouter;


