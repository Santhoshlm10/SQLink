import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getPool } from "./../mysql/connector.js";
import { STRINGS } from "../strings.js";
import { SQLog } from "../utils/logger/logger.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const pool = getPool();
    SQLog.request("Request to create a new user",true)
    const [rows, fields] = await pool.query(
      `INSERT into users_created_by_sqlink(email,password) values ('${email}','${hashedPassword}')`
    );
    SQLog.response("New user created successfully",true)
    res.status(201).json({ success:true,message: STRINGS.USER_REGISTER_SUCCESS });
  } catch (error) {
    res.status(500).json({ success:false,message: "Error creating user: "+error.message });
    SQLog.error("Unable to create new user")
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const pool = getPool();
    SQLog.request("Login user request received",true)
    const [rows, fields] = await pool.query(
      `SELECT * from users_created_by_sqlink where email = '${email}'`
    );
    if (rows.length == 0) {
      return res.status(400).json({ success:false,message: STRINGS.INVALID_CREDENTIALS});
    }
    const user = rows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      SQLog.error("Unable to login user as credentials were invalid",true)
      return res.status(400).json({ success:false,message: STRINGS.INVALID_CREDENTIALS });
    }
    const token = jwt.sign({ userId: user.id }, "THISISASECRETKEYFORSQLINK", {
      expiresIn: "90d",
    });
    res.json({ success:true,token });
    SQLog.response("Login user successfull",true)
  } catch (error) {
    SQLog.error("Unable to login the user")
    res
      .status(500)
      .json({
        message: "There was an error logging in the user: " + error.message,
      });
  }
});

export default authRouter;
