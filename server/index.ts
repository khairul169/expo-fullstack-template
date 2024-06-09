import { Hono } from "hono";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./app/router";

const app = new Hono();

app.use(cors());

app.get("/", c => c.text("OK"));

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  }),
);

export default app;
