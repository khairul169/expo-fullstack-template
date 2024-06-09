import { TRPCClientError, httpBatchLink } from "@trpc/client";
import {
  createTRPCReact,
  type inferReactQueryProcedureOptions,
} from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { QueryClient } from "@tanstack/react-query";
import type { AppRouter } from "server/app/router";
import { API_URL } from "./api";
import { authStore, logout } from "~/stores/authStore";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: API_URL + "/trpc",
      fetch(url, opts) {
        const headers: any = { ...(opts?.headers || {}) };
        const { sessionId } = authStore.getState();

        if (sessionId) {
          headers["authorization"] = `Bearer ${sessionId}`;
        }

        return fetch(url, {
          ...opts,
          credentials: "include",
          headers,
        });
      },
    }),
  ],
});

const MAX_RETRY = 3;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry(failureCount, err) {
        if (err instanceof TRPCClientError && err.data?.httpStatus === 401) {
          return false;
        }

        return failureCount < MAX_RETRY;
      },
      onError(err) {
        if (err instanceof TRPCClientError && err.data?.httpStatus === 401) {
          logout();
        }
      },
    },
    mutations: {
      onError(err) {
        if (err instanceof TRPCClientError && err.data?.httpStatus === 401) {
          logout();
        }
      },
    },
  },
});

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type TRPCInput = inferRouterInputs<AppRouter>;
export type TRPCOutput = inferRouterOutputs<AppRouter>;

export default trpc;
