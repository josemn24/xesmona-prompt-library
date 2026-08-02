import { categories } from "./categories";
import { modules } from "./modules";
import { artificialIntelligencePrompts } from "./prompts/artificial-intelligence";
import { businessPrompts } from "./prompts/business";
import { marketingPrompts } from "./prompts/marketing";
import { productivityPrompts } from "./prompts/productivity";
import { softwareDevelopmentPrompts } from "./prompts/software-development";
import { subcategories } from "./subcategories";
import { tags } from "./tags";
import type { Prompt } from "./types";

export { modules } from "./modules";
export { categories } from "./categories";
export { subcategories } from "./subcategories";
export { tags } from "./tags";
export type {
  Category,
  CategoryId,
  Module,
  ModuleId,
  Prompt,
  PromptId,
  PromptLanguage,
  Subcategory,
  SubcategoryId,
  Tag,
  TagId,
} from "./types";

export const allPrompts: Prompt[] = [
  ...softwareDevelopmentPrompts,
  ...artificialIntelligencePrompts,
  ...marketingPrompts,
  ...businessPrompts,
  ...productivityPrompts,
];

export type LibraryData = {
  modules: typeof modules;
  categories: typeof categories;
  subcategories: typeof subcategories;
  tags: typeof tags;
  prompts: Prompt[];
};

export const libraryData: LibraryData = {
  modules,
  categories,
  subcategories,
  tags,
  prompts: allPrompts,
};
