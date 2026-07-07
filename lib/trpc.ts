import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink, createTRPCClient } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "@/server/routers";
import { getApiBaseUrl } from "@/constants/oauth";

/**
 * React Hooks wrapper for tRPC.
 */
export const trpc = createTRPCReact<AppRouter>();

/**
 * Standard tRPC client initialization for React Native / Expo root layout.
 */
export const trpcClient = () => {
  return createTRPCClient<AppRouter>({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: `${getApiBaseUrl()}/api/trpc`,
        async headers() {
          const headers = new Headers();
          return Object.fromEntries(headers.entries());
        },
      }),
    ],
  });
};