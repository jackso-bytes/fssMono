// packages/api/src/trpc/router/getEstimate.ts
import type { TRPCRouterRecord } from "@trpc/server";
import type { ChatCompletion } from "openai/resources/index.mjs";
import OpenAI from "openai";
import { z } from "zod";

import type { GptProductInfoJson, WorldFoodFactsProductInfo } from "../types";
import { publicProcedure } from "../trpc.js";

export const getEstimateRouter = {
  getEstimate: publicProcedure
    .input(
      z.object({
        barCodeUniqueId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const openai = new OpenAI({
        apiKey: process.env.OPEN_AI_API_KEY,
        organization: process.env.OPEN_AI_ORG_ID,
        project: process.env.OPEN_AI_PROJECT_ID,
      });

      try {
        const WorldFoodFactsProductInfo = (await fetch(
          `${process.env.WORLD_OPEN_FOOD_FACTS_BASE_URL}/api/v0/product/${input.barCodeUniqueId}.json?fields=product_name,ecoscore_data`,
        ).then((res) => res.json())) as WorldFoodFactsProductInfo;

        // early return to save api calls to gpt while testing
        if (WorldFoodFactsProductInfo.product.ecoscore_data)
          return {
            gptProductInfoJson: {
              carbonEstimate: 0,
              inSeason: "We can't tell if this product is in season",
            },
            WorldFoodFactsProductInfo,
          };

        const prompt = `Provide an estimated carbon footprint, sustainability score, and seasonal availability for the following food product:\n\nProduct: ${WorldFoodFactsProductInfo.product.product_name}\n\nOutput the result in the following JSON format:\n{\n  "carbonEstimate": <estimated_carbon_footprint_per_kg>,\n "inSeason": "<season_months>"\n}`;

        const gptResponse: ChatCompletion =
          await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 150,
          });

        const gptProductInfo = gptResponse.choices[0]?.message.content?.trim();
        const gptProductInfoJson = gptProductInfo
          ? (JSON.parse(gptProductInfo) as GptProductInfoJson)
          : null;
        return { gptProductInfoJson, WorldFoodFactsProductInfo };
      } catch (error: unknown) {
        console.error(
          "Error fetching from OpenAI or World Open Food Facts",
          error,
        );

        return {
          error: {
            message: "Error fetching from OpenAI or World Open Food Facts",
            error,
          },
        };
      }
    }),
} satisfies TRPCRouterRecord;
