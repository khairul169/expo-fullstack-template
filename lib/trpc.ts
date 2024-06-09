import { httpBatchLink } from "@trpc/client";
import {
  createTRPCReact,
  type inferReactQueryProcedureOptions,
} from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { QueryClient } from "@tanstack/react-query";
import type { AppRouter } from "../server/app/router";
import { API_URL } from "./api";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [httpBatchLink({ url: API_URL + "/trpc" })],
});

export const queryClient = new QueryClient();

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type TRPCInput = inferRouterInputs<AppRouter>;
export type TRPCOutput = inferRouterOutputs<AppRouter>;

export default trpc;
