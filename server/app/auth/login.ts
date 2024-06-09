import db from "../../db";
import { publicProcedure } from "../../trpc";
import { loginSchema } from "@shared/schema/auth.schema";
import { users } from "../../models";
import { eq, or } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { verifyPassword } from "../../lib/utils";
import authService from "./auth.service";

export const login = publicProcedure
  .input(loginSchema)
  .mutation(async ({ ctx, input }) => {
    const { platform } = input;

    const [user] = await db
      .select()
      .from(users)
      .where(
        or(eq(users.email, input.username), eq(users.username, input.username)),
      )
      .limit(1);

    if (!user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Username or password incorrect",
      });
    }

    const isPasswordValid = await verifyPassword(
      input.password,
      user.password || "",
    );
    if (!isPasswordValid) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Username or password incorrect",
      });
    }

    try {
      return authService.createSession(ctx, user, platform);
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  });
