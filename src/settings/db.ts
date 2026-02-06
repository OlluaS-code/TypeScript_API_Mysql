import mysql, { Pool } from "mysql2/promise";
import { config } from "./config";

export class Database {
  private static instance: Pool;

  private constructor() {}

  public static getInstance(): Pool {
    if (!Database.instance) {
      Database.instance = mysql.createPool({
        host: config.DB_HOST,
        user: config.DB_USER,
        password: config.DB_PASS,
        database: config.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    }

    return Database.instance;
  }
}

export const pool = Database.getInstance();
