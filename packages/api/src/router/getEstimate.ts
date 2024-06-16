// packages/api/src/trpc/router/getEstimate.ts
import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { publicProcedure } from "../trpc";

export const getEstimateRouter = {
  getEstimate: publicProcedure
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

      return { productRes };
    }),
} satisfies TRPCRouterRecord;
