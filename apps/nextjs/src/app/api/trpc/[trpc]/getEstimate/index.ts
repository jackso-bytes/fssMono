import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const appRouter = t.router({
  getEstimate: t.procedure
    .input(
      z.object({
        barCodeUniqueId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      // Fetch data from the first API
      const productRes = await fetch(
        `${process.env.WORLD_OPEN_FOOD_FACTS_BASE_URL}/api/v0/product/${input.barCodeUniqueId}.json`,
      ).then((res) => res.json());

      // Fetch data from the second API
      const data2 = await fetch(
        `https://api2.example.com/data?param=${productRes.productName}`,
      ).then((res) => res.json());

      return { productRes, data2 };
    }),
});

export type AppRouter = typeof appRouter;
