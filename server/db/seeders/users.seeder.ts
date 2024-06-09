import { sql } from "drizzle-orm";
import type { DbType } from "..";
import { hashPassword } from "../../lib/utils";
import { users } from "../../models";

export async function seedUsers(tx: DbType) {
  const [usersCount] = await tx
    .select({ count: sql<number>`COUNT(*)` })
    .from(users);

  if (usersCount.count > 0) {
    return;
  }

  await tx
    .insert(users)
    .values([
      {
        name: "Admin",
        username: "admin",
        password: await hashPassword("admin"),
        email: "admin@mail.com",
      },
    ])
    .returning();
}
