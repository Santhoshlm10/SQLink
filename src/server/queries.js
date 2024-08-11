import pool from "./../mysql/connector.js"
import {QueryGenerator} from "./../utils/generator/querygenerator.js"


class SQLQueriesClass{


  async getMethod(url){
    try {
      let em_url = `/table${url}`
      let query = QueryGenerator.selectQueryGenerator(em_url)
      const [rows] = await pool.query(query)
      return {success:true,data:rows,length:rows?.length}
    } catch (error) {
      return {success:false,message:error.message}
    }
  }

  async insertMethod(url,payload){
    try {
      let em_url = `/table${url}`
      let query = QueryGenerator.insertQueryGenerator(em_url,payload);
      await pool.query(query)
      return {success:true,message:"Data inserted successfully"}
    } catch (error) {
      return {success:false,message:error.message}
    }
  }

  async updateMethod(url,payload){
    try {
      let em_url = `/table${url}`
      let query = QueryGenerator.updateQueryGenerator(em_url,payload);
      await pool.query(query)
      return {success:true,message:"Data updated successfully"}
    } catch (error) {
      return {success:false,message:error.message}
    }
  }

  async deleteMethod(url){
    try {
      let em_url = `/table${url}`
      let query = QueryGenerator.deleteQueryGenerator(em_url);
      await pool.query(query)
      return {success:true,message:"Data deleted successfully"}
    } catch (error) {
      return {success:false,message:error.message}
    }
  }

  async executeProcedure(url){
    try {
      let em_url = `/procedure${url}`
      let query = QueryGenerator.procedureGenerator(em_url);
      let [rows] = await pool.query(query)
      return {success:true,data:rows}
    } catch (error) {
      return {success:false,message:error.message}
    }
  }


}
export let SQLQueries = new SQLQueriesClass();
 