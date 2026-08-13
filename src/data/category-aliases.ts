import type { CategoryId } from "./types";

export type CategoryAlias = {
  legacyId: CategoryId;
  canonicalIds: CategoryId[];
};

export const categoryAliases: CategoryAlias[] = [
  { legacyId: "frontend-development", canonicalIds: ["frontend-and-experience"] },
  { legacyId: "backend-development", canonicalIds: ["backend-and-apis"] },
  { legacyId: "web-development", canonicalIds: ["frontend-and-experience"] },
  { legacyId: "quality-and-testing", canonicalIds: ["quality-security-performance"] },
  { legacyId: "version-control", canonicalIds: ["project-setup-and-workflow"] },
  { legacyId: "devops", canonicalIds: ["delivery-and-deployment"] },
  { legacyId: "ci-cd", canonicalIds: ["delivery-and-deployment"] },
  { legacyId: "databases", canonicalIds: ["data"] },
  { legacyId: "apis-and-integrations", canonicalIds: ["backend-and-apis", "integrations"] },
  { legacyId: "software-security", canonicalIds: ["quality-security-performance"] },
  { legacyId: "technical-documentation", canonicalIds: ["maintenance-and-evolution"] },
  { legacyId: "performance", canonicalIds: ["quality-security-performance"] },
  { legacyId: "refactoring", canonicalIds: ["maintenance-and-evolution"] },
  { legacyId: "rag", canonicalIds: ["knowledge-and-rag"] },
  { legacyId: "agents", canonicalIds: ["agents-and-automation"] },
  { legacyId: "ai-automation", canonicalIds: ["agents-and-automation"] },
  { legacyId: "content-strategy", canonicalIds: ["content-creation"] },
  { legacyId: "seo", canonicalIds: ["acquisition-and-distribution"] },
  { legacyId: "email-marketing", canonicalIds: ["conversion-and-retention"] },
  { legacyId: "social-media", canonicalIds: ["acquisition-and-distribution"] },
  { legacyId: "copywriting", canonicalIds: ["content-creation"] },
  { legacyId: "market-research", canonicalIds: ["audience-and-market"] },
  { legacyId: "business-strategy", canonicalIds: ["strategy-and-business-model"] },
  { legacyId: "business-analysis", canonicalIds: ["opportunities-and-discovery"] },
  { legacyId: "business-models", canonicalIds: ["strategy-and-business-model"] },
  { legacyId: "sales", canonicalIds: ["sales-and-growth"] },
  { legacyId: "operations", canonicalIds: ["operations-and-projects"] },
  { legacyId: "project-management", canonicalIds: ["operations-and-projects"] },
  { legacyId: "lean-startup", canonicalIds: ["validation-and-experimentation"] },
];

const aliasesById = new Map(categoryAliases.map((alias) => [alias.legacyId, alias]));

export function resolveCategoryAlias(categoryId: CategoryId): CategoryId[] {
  const canonicalIds = aliasesById.get(categoryId)?.canonicalIds;
  return canonicalIds === undefined ? [categoryId] : canonicalIds.slice(0, 1);
}
