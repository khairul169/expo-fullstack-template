import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const publicProcedure = t.procedure;
export const procedure = t.procedure;
export const router = t.router;
