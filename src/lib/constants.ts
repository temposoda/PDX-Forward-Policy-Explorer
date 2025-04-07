
export const COST_CATEGORIES = [
  { id: "all", name: "All Costs", emoji: "🔍" },
  { id: "none", name: "No Cost", emoji: "🆓" },
  { id: "minimal", name: "Minimal Cost", emoji: "💰" },
  { id: "moderate", name: "Moderate Cost", emoji: "💰💰" },
  { id: "substantial", name: "Substantial Cost", emoji: "💰💰💰" },
  { id: "variable", name: "Variable Cost", emoji: "🎲" },

] as const;

export const FISCAL_IMPACTS = [
  { id: "all", name: "All Budgets", emoji: "🔍" },
  { id: "revenue_neutral", name: "Revenue Neutral", emoji: "⚖️" },
  { id: "cost_saving", name: "Cost Saving", emoji: "💎" },
  { id: "needs_revenue", name: "Needs Revenue", emoji: "🤌" },
] as const;

export const DOMAINS = [
  { id: "all", name: "Policy Areas", emoji: "🔍" },
  { id: "housing", name: "Housing", emoji: "🏘️" },
  { id: "environment", name: "Environment", emoji: "🌱" },
  { id: "safety", name: "Safety", emoji: "🛡️" },
  { id: "democracy", name: "Democracy", emoji: "🗳️" },
  { id: "economic-development", name: "Economic Development", emoji: "📈" },
  {
    id: "infrastructure-and-transportation",
    name: "Infrastructure & Transportation",
    emoji: "🚌",
  },
  { id: "social-services", name: "Social Services", emoji: "🤝" },
  { id: "public-health", name: "Public Health", emoji: "⚕️" },
] as const;

export type CostCategory = (typeof COST_CATEGORIES)[number]["id"];
export type FiscalImpact = (typeof FISCAL_IMPACTS)[number]["id"];
export type DomainId = (typeof DOMAINS)[number]["id"];

export type DomainMap = {
  [key: string]: DomainId[];
};