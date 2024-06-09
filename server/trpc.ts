import { TRPCError, initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { Context } from "hono";
import { getCookie } from "hono/cookie";
import lucia from "./lib/lucia";

async function getAuthedUser(c: Context) {
  let sessionId = getCookie(c, lucia.sessionCookieName);
  if (!sessionId) {
    const authHeader = c.req.header("authorization");
    sessionId = lucia.readBearerToken(authHeader ?? "") || undefined;
  }

  if (!sessionId) {
    return { user: null, session: null };
  }

  return lucia.validateSession(sessionId);
}

export async function createContext(
  _opts: FetchCreateContextFnOptions,
  c: Context,
) {
  const { user, session } = await getAuthedUser(c);

  return { req: c.req, res: c.res, user, session };
}

export type TRPCContext = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<TRPCContext>().create();

export const router = t.router;

export const publicProcedure = t.procedure;
export const procedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user || !ctx.session?.id) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }

  return next({ ctx: { ...ctx, user: ctx.user!, session: ctx.session! } });
});
