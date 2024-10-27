// this function is going to verify if there is a table for users_created_by_sqlink to manage
// authentication and it gets created in case if there is no table for the same name

import { getPool } from "../../mysql/connector.js";
import { STRINGS } from "../../strings.js";
import { SQLog } from "../logger/logger.js";

export const USERS_TABLE = "users_created_by_sqlink"
export async function verifyUserAuth(){
    try {
        const pool = getPool();
        const [rows] = await pool.query(`select count(1) from ${USERS_TABLE}`)
    } catch (error) {
        SQLog.info(STRINGS.NO_USERS_TABLE,true)
        await createUsersTable();
    }
}

async function createUsersTable(){
    try {
        const pool = getPool();
        const [data] = await pool.query(`
            CREATE TABLE users_created_by_sqlink (
            userId int NOT NULL AUTO_INCREMENT,
            email varchar(255) NOT NULL UNIQUE,
            password varchar(255) NOT NULL,
            created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (userId)
        )`) 
    } catch (error) {
        SQLog.error("Unable to create users table: "+error.message,true)
    }
}