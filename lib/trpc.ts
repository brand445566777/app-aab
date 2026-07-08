import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "@/server/routers";
import { getApiBaseUrl } from "@/constants/oauth";

/**
 * React Hooks wrapper for tRPC.
 */
export const trpc = createTRPCReact<AppRouter>();

/**
 * Production-safe tRPC client builder for GitHub Active AAB.
 */
export const trpcClient = () => {
  return (trpc as any).createClient({
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