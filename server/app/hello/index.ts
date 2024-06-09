import { z } from "zod";
import { procedure } from "../../trpc";

export const hello = procedure
  .input(z.string().nullish())
  .query(({ input, ctx }) => {
    return `Hello ${input ?? "World"}! User: ${ctx.user.username}`;
  });
