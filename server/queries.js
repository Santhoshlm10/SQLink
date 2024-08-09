import pool from "./../mysql/connector.js"
import {convertUrlToSql} from "./../utils/generator/querygenerator.js"
export const getAllItems = async (url) => {
  try {
    let url1 = `/table${url}`
    let query = convertUrlToSql(url1)
    console.log("QUery",query,url1)
    const [rows] = await pool.query(query)
    return {success:true,data:rows,length:rows?.length}
  } catch (error) {
    return {success:false,message:error.message}
  }
};

