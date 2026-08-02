import type { PromptLanguage } from "@/src/data";
import { emptyFilters, type PromptFilters } from "@/src/lib/filters";

/**
 * The filter state lives in the URL so searches are shareable and the back
 * button restores the previous state. Multi-value filters (category,
 * subcategory, tag) use repeated params:
 * /prompts?q=api&category=databases&category=performance&tag=sql
 */
export const QUERY_PARAM_KEYS = {
  query: "q",
  module: "module",
  category: "category",
  subcategory: "subcategory",
  tag: "tag",
  language: "language",
} as const;

export function filtersFromSearchParams(
  params: URLSearchParams,
): PromptFilters {
  const language = params.get(QUERY_PARAM_KEYS.language);
  return {
    query: params.get(QUERY_PARAM_KEYS.query) ?? "",
    module: params.get(QUERY_PARAM_KEYS.module) ?? undefined,
    categories: params.getAll(QUERY_PARAM_KEYS.category),
    subcategories: params.getAll(QUERY_PARAM_KEYS.subcategory),
    tags: params.getAll(QUERY_PARAM_KEYS.tag),
    language:
      language === "es" || language === "en"
        ? (language as PromptLanguage)
        : undefined,
  };
}

export function searchParamsFromFilters(
  filters: PromptFilters,
): URLSearchParams {
  const params = new URLSearchParams();
  const query = filters.query.trim();
  if (query.length > 0) params.set(QUERY_PARAM_KEYS.query, query);
  if (filters.module !== undefined) {
    params.set(QUERY_PARAM_KEYS.module, filters.module);
  }
  for (const category of filters.categories) {
    params.append(QUERY_PARAM_KEYS.category, category);
  }
  for (const subcategory of filters.subcategories) {
    params.append(QUERY_PARAM_KEYS.subcategory, subcategory);
  }
  for (const tag of filters.tags) {
    params.append(QUERY_PARAM_KEYS.tag, tag);
  }
  if (filters.language !== undefined) {
    params.set(QUERY_PARAM_KEYS.language, filters.language);
  }
  return params;
}

/** Full URL for the explorer with the given filters applied. */
export function promptsUrl(filters: Partial<PromptFilters>): string {
  const params = searchParamsFromFilters({ ...emptyFilters, ...filters });
  const queryString = params.toString();
  return queryString.length > 0 ? `/prompts?${queryString}` : "/prompts";
}
