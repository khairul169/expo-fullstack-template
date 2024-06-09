import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import db, { conn } from "./";

const main = async () => {
  // This will run migrations on the database, skipping the ones already applied
  migrate(db, { migrationsFolder: "./db/migrations" });

  // Don't forget to close the connection, otherwise the script will hang
  conn.close();
};

main();
