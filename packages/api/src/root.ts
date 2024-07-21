import { authRouter } from "../dist/router/auth.js";
import { getEstimateRouter } from "../dist/router/getEstimate.js";
import { postRouter } from "../dist/router/post.js";
import { createTRPCRouter } from "../dist/trpc.js";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  getEstimate: getEstimateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
