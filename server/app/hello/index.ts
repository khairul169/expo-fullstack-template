import { z } from "zod";
import { procedure } from "../../trpc";

export const hello = procedure
  .input(z.string().nullish())
  .query(({ input }) => {
    return `Hello ${input ?? "World"}!`;
  });
