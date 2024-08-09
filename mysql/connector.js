import mysql from 'mysql2';
import config from "dotenv"
const test = config.config()
console.log(test)
const pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

export default pool.promise();
