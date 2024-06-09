import { eq } from "drizzle-orm";
import db from "../../db";
import { procedure } from "../../trpc";
import { users } from "../../models";

export const user = procedure.query(async ({ ctx }) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, ctx.user.id),
    columns: { password: false },
  });
  return user;
});
