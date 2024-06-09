import { router } from "../trpc";
import { auth } from "./auth";
import { hello } from "./hello";

export const appRouter = router({
  auth,
  hello,
});

export type AppRouter = typeof appRouter;
