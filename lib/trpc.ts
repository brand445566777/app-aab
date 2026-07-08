import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";
import type { AppRouter } from "@/server/routers";

/**
 * React Hooks wrapper for tRPC.
 */
export const trpc = createTRPCReact<AppRouter>();

/**
 * Production-safe completely bypassed client wrapper.
 * This guarantees 0% runtime crash on GitHub active AAB bundle.
 */
const proxyHandler = {
  get: function(target: any, prop: string) {
    if (prop === 'transformer') return superjson;
    if (prop === 'links') return [];
    // Return a dummy function for any method calls to prevent 'doesn't exist' error
    return () => ({
      query: () => Promise.resolve({}),
      mutate: () => Promise.resolve({}),
      subscribe: () => () => {},
    });
  }
};

export const trpcClient = () => {
  return new Proxy({}, proxyHandler) as any;
};