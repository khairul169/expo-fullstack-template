import { Hono } from "hono";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./app/router";
import { createContext } from "./trpc";

const app = new Hono();

app.use(
  cors({
    origin: origin => origin,
    credentials: true,
  }),
);

app.get("/", c => c.text("OK"));

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext,
  }),
);

export default app;
