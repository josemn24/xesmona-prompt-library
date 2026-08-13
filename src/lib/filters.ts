import type {
  CategoryId,
  ModuleId,
  Prompt,
  PromptLanguage,
  SubcategoryId,
  TagId,
} from "@/src/data";
import { searchPrompts } from "@/src/lib/search";
import { sortByUpdatedAtDesc } from "@/src/lib/taxonomy";

export type PromptFilters = {
  query: string;
  module?: ModuleId;
  categories: CategoryId[];
  subcategories: SubcategoryId[];
  tags: TagId[];
  language?: PromptLanguage;
};

export const emptyFilters: PromptFilters = {
  query: "",
  categories: [],
  subcategories: [],
  tags: [],
};

/**
 * Applies the taxonomy filters to a list of prompts.
 *
 * OR logic within the same filter type (any selected category matches),
 * AND logic between different filter types (module AND category AND ...).
 */
export function applyFilters(
  prompts: Prompt[],
  filters: PromptFilters,
): Prompt[] {
  return prompts.filter((prompt) => {
    if (filters.module !== undefined && prompt.module !== filters.module) {
      return false;
    }
    if (
      filters.categories.length > 0 &&
      !filters.categories.some((categoryId) =>
        prompt.category === categoryId,
      )
    ) {
      return false;
    }
    if (filters.subcategories.length > 0) {
      const promptSubcategories = prompt.subcategories ?? [];
      if (
        !filters.subcategories.some((subcategoryId) =>
          promptSubcategories.includes(subcategoryId),
        )
      ) {
        return false;
      }
    }
    if (
      filters.tags.length > 0 &&
      !filters.tags.some((tagId) => prompt.tags.includes(tagId))
    ) {
      return false;
    }
    if (filters.language !== undefined && prompt.language !== filters.language) {
      return false;
    }
    return true;
  });
}

/**
 * Combines filters and fuzzy search. Without a query, results are ordered
 * by last update (most recent first); with a query, by relevance.
 */
export function searchAndFilter(
  prompts: Prompt[],
  filters: PromptFilters,
): Prompt[] {
  const filtered = applyFilters(prompts, filters);
  if (filters.query.trim().length === 0) {
    return sortByUpdatedAtDesc(filtered);
  }
  return searchPrompts(filtered, filters.query).map((result) => result.prompt);
}

export function countActiveFilters(filters: PromptFilters): number {
  return (
    (filters.module === undefined ? 0 : 1) +
    filters.categories.length +
    filters.subcategories.length +
    filters.tags.length +
    (filters.language === undefined ? 0 : 1)
  );
}

export function hasActiveFilters(filters: PromptFilters): boolean {
  return filters.query.trim().length > 0 || countActiveFilters(filters) > 0;
}
