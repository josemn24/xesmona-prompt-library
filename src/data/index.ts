import { categories } from "./categories";
import { categoryAliases } from "./category-aliases";
import { modules } from "./modules";
import { moduleNavigation } from "./module-navigation";
import { artificialIntelligencePrompts } from "./prompts/artificial-intelligence";
import { businessPrompts } from "./prompts/business";
import { marketingPrompts } from "./prompts/marketing";
import { leanStartupPrompts } from "./prompts/lean-startup";
import { productivityPrompts } from "./prompts/productivity";
import { softwareDevelopmentPrompts } from "./prompts/software-development";
import { subcategories } from "./subcategories";
import { subcategoryAliases } from "./subcategory-aliases";
import { tags } from "./tags";
import type { Prompt } from "./types";

export { modules } from "./modules";
export { moduleNavigation } from "./module-navigation";
export { categories } from "./categories";
export { subcategories } from "./subcategories";
export { subcategoryAliases } from "./subcategory-aliases";
export { tags } from "./tags";
export { categoryAliases } from "./category-aliases";
export type {
  Category,
  CategoryId,
  IllustrationId,
  Module,
  ModuleId,
  ModuleNavigation,
  ModuleNavigationGroup,
  Prompt,
  PromptId,
  PromptLanguage,
  Subcategory,
  SubcategoryId,
  Tag,
  TagFacet,
  TagId,
} from "./types";
export type { CategoryAlias } from "./category-aliases";
export type { SubcategoryAlias } from "./subcategory-aliases";

export const allPrompts: Prompt[] = [
  ...softwareDevelopmentPrompts,
  ...artificialIntelligencePrompts,
  ...marketingPrompts,
  ...leanStartupPrompts,
  ...businessPrompts,
  ...productivityPrompts,
];

export type LibraryData = {
  modules: typeof modules;
  moduleNavigation: typeof moduleNavigation;
  categories: typeof categories;
  categoryAliases: typeof categoryAliases;
  subcategories: typeof subcategories;
  subcategoryAliases: typeof subcategoryAliases;
  tags: typeof tags;
  prompts: Prompt[];
};

export const libraryData: LibraryData = {
  modules,
  moduleNavigation,
  categories,
  categoryAliases,
  subcategories,
  subcategoryAliases,
  tags,
  prompts: allPrompts,
};
