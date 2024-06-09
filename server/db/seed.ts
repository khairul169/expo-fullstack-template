import db, { conn } from ".";
import { seedUsers } from "./seeders/users.seeder";

const seed = async () => {
  try {
    await db.transaction(async tx => {
      // run seeders
      await seedUsers(tx);
    });
  } catch (err) {
    console.error(err);
  }

  conn.close();
};

seed();
