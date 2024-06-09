import { TRPCError } from "@trpc/server";
import lucia from "../../lib/lucia";
import { procedure } from "../../trpc";

export const logout = procedure.mutation(async ({ ctx }) => {
  try {
    await lucia.invalidateSession(ctx.sessionId);

    const cookie = lucia.createBlankSessionCookie();
    ctx.setCookie(cookie.name, cookie.value);

    return true;
  } catch (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
    });
  }
});
