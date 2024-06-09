import type { LoginSchema } from "@shared/schema/auth.schema";
import type { User } from "../../models/users";
import lucia from "../../lib/lucia";
import type { TRPCContext } from "../../trpc";

const authService = {
  async createSession(
    ctx: TRPCContext,
    user: User,
    platform?: LoginSchema["platform"],
  ) {
    const session = await lucia.createSession(user.id, {});

    if (platform === "web") {
      const cookie = lucia.createSessionCookie(session.id);
      ctx.setCookie(cookie.name, cookie.value);
      return { ...session, id: undefined };
    }

    return session;
  },
};

export default authService;
