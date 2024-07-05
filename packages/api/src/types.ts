export interface GptProductInfoJson {
  carbonEstimate: number;
  sustainability: number;
  inSeason: string;
}

export interface WorldFoodFactsProductInfo {
  product: {
    product_name: string;
    ecoscore_data?: EcoScoreData;
  };
}

export type GradeType = "a" | "b" | "c" | "d" | "e" | undefined;

export interface EcoScoreData {
  score: number;
  agribalyse: {
    agribalyse_food_code: string;
    co2_agriculture: number;
    co2_consumption: number;
    co2_distribution: number;
    co2_packaging: number;
    co2_processing: number;
    co2_total: number;
    co2_transportation: number;
    code: string;
    dqr: string;
    ef_agriculture: number;
    ef_consumption: number;
    ef_distribution: number;
    ef_packaging: number;
    ef_processing: number;
    ef_total: number;
    ef_transportation: number;
    is_beverage: number;
    name_en: string;
    name_fr: string;
    score: number;
    version: string;
  };
  grade: GradeType;
}
