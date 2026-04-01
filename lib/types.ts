export type ProductType = "b2b_saas" | "hardware" | "services" | "marketplace";
export type CompanyStage = "pre_revenue" | "early_revenue" | "growing" | "scaling";
export type TeamSize = "solo" | "small" | "medium" | "large";
export type Budget = "bootstrapped" | "low" | "mid" | "high";
export type Channel = "cold_email" | "linkedin" | "content" | "paid_ads" | "multi_channel";
export type BuildStyle = "no_code" | "ai_assisted" | "custom_code";

export interface QuizAnswers {
  product: ProductType;
  stage: CompanyStage;
  team: TeamSize;
  budget: Budget;
  channel: Channel;
  buildStyle: BuildStyle;
}

export interface ToolRecommendation {
  name: string;
  description: string;
  price: string;
  priceValue: number;
  reason: string;
  affiliateKey: string;
}

export interface LayerRecommendation {
  layer: string;
  icon: string;
  label: string;
  tools: ToolRecommendation[];
}

export interface StackRecommendation {
  layers: LayerRecommendation[];
  totalMonthlyCost: number;
  reasoning: string;
  setupOrder: string[];
  whatToSkip: string[];
  summary: string;
}

export interface QuizQuestion {
  id: keyof QuizAnswers;
  question: string;
  options: { value: string; label: string }[];
}
