import { STRINGS } from "../strings.js";
import { getPool } from "./../mysql/connector.js"
import {QueryGenerator} from "./../utils/generator/querygenerator.js"


class SQLQueriesClass{

  async getMethod(url){
    try {
      let em_url = `/table${url}`
      const pool = getPool();
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
      const pool = getPool();
      let query = QueryGenerator.insertQueryGenerator(em_url,payload);
      await pool.query(query)
      return {success:true,message:STRINGS.DATA_INSERTION_SUCCESS}
    } catch (error) {
      return {success:false,message:error.message}
    }
  }

  async updateMethod(url,payload){
    try {
      let em_url = `/table${url}`
      const pool = getPool();
      let query = QueryGenerator.updateQueryGenerator(em_url,payload);
      await pool.query(query)
      return {success:true,message:STRINGS.DATA_UPDATE_SUCCESS}
    } catch (error) {
      return {success:false,message:error.message}
    }
  }

  async deleteMethod(url){
    try {
      let em_url = `/table${url}`
      const pool = getPool();
      let query = QueryGenerator.deleteQueryGenerator(em_url);
      await pool.query(query)
      return {success:true,message:STRINGS.DATA_DELETE_SUCCESS}
    } catch (error) {
      return {success:false,message:error.message}
    }
  }

  async executeProcedure(url){
    try {
      let em_url = `/procedure${url}`
      const pool = getPool();
      let query = QueryGenerator.procedureGenerator(em_url);
      let [rows] = await pool.query(query)
      return {success:true,data:rows}
    } catch (error) {
      return {success:false,message:error.message}
    }
  }

  async distinctMethod(url){
    try {
      let em_url = `/table${url}`
      const pool = getPool();
      let query = QueryGenerator.distinctQueryGenerator(em_url);
      const [rows] = await pool.query(query)
      return {success:true,data:rows}
    } catch (error) {
      return {success:false,message:error.message}
    }
  }

  async upsertMethod(url,payload){
    try {
      let em_url = `/table${url}`
      const pool = getPool();
      let query = QueryGenerator.upsertQueryGenerator(em_url);
      const [rows] = await pool.query(query)
      if(rows[0]?.["count"] >= 1){
        let query = QueryGenerator.updateQueryGenerator(em_url,payload);
        await pool.query(query)
        return {success:true,message:STRINGS.DATA_UPSERT_SUCCESS}
      }else{
        let query = QueryGenerator.insertQueryGenerator(em_url,payload);
        await pool.query(query)
        return {success:true,message:STRINGS.DATA_UPSERT_SUCCESS}
      }
    } catch (error) {
      return {success:false,message:error.message}

    }
  }
}

export let SQLQueries = new SQLQueriesClass();
 