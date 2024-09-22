import mysql from 'mysql2';
import { db_config } from '../utils/config/checker.js';
import {STRINGS} from "./../strings.js"
let pool;

export async function initialiseDatabase() {
  if (!pool) {
    const p = mysql.createPool({
      host: db_config.host,
      user: db_config.user,
      password: db_config.password,
      database: db_config.database_name,
      port: db_config.port
    });
    pool = p.promise();
  }
}

export function getPool() {
  if (!pool) {
    throw new Error(STRINGS.DATABASE_NOT_INITIALISED);
  }
  return pool;
}
