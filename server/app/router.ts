import { router } from "../trpc";
import { hello } from "./hello";

export const appRouter = router({
  hello,
});

export type AppRouter = typeof appRouter;
