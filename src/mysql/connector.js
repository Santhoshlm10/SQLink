import mysql from 'mysql2';
import { db_config } from '../utils/config/checker.js';

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
    throw new Error('Database pool not initialized. Call initialiseDatabase() first.');
  }
  return pool;
}
