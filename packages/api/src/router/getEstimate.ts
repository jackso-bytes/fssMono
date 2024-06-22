// packages/api/src/trpc/router/getEstimate.ts
import type { TRPCRouterRecord } from "@trpc/server";
import OpenAI from "openai";
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
      const openai = new OpenAI({
        apiKey: `${process.env.OPEN_AI_API_KEY}`,
        organization: `${process.env.OPEN_AI_ORG_ID}`,
        project: `${process.env.OPEN_AI_PROJECT_ID}`,
      });
      // world open food facts call
      try {
        const productRes = await fetch(
          `${process.env.WORLD_OPEN_FOOD_FACTS_BASE_URL}/api/v0/product/${input.barCodeUniqueId}.json`,
        ).then((res) => res.json());
        const prompt = `Provide an estimated carbon footprint, sustainability score, and seasonal availability for the following food product:\n\nProduct: ${productRes.product.brands}\n\nOutput the result in the following JSON format:\n{\n  "carbonEstimate": <estimated_carbon_footprint_per_kg>,\n  "sustainability": <sustainability_score_out_of_10>,\n  "inSeason": "<season_months>"\n}`;

        if (productRes.product.ecoscore_data) return productRes;

        const gptResponse = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 150,
        });

        const productInfo = gptResponse.choices[0]?.message.content?.trim();
        const productInfoJson = productInfo ? JSON.parse(productInfo) : null;
        return { productInfoJson };
      } catch (error) {
        console.error(
          "Error fetching from openai or world open food facts",
          error,
        );
        return {
          error: {
            message: "Error fetching from openai or world open food facts",
            error,
          },
        };
      }
    }),
} satisfies TRPCRouterRecord;
