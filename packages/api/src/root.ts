import { authRouter } from "./router/auth";
import { getEstimateRouter } from "./router/getEstimate";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  getEstimate: getEstimateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
