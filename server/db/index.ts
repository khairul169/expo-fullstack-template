import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "../models";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL env is not defined");
}

const conn = new Database(DATABASE_URL);
const db = drizzle(conn, { schema });

export type DbType = typeof db;

export { conn, schema };
export default db;
