import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const hello = publicProcedure
  .input(z.string().nullish())
  .query(({ input }) => {
    return `Hello ${input ?? "World"}!`;
  });
