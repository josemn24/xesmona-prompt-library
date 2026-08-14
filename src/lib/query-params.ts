import type { CategoryId, ModuleId, PromptLanguage } from "@/src/data";
import { resolveCategoryAlias } from "@/src/data/category-aliases";
import { resolveSubcategoryAlias } from "@/src/data/subcategory-aliases";
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
  const resolvedSubcategories = params
    .getAll(QUERY_PARAM_KEYS.subcategory)
    .map(resolveSubcategoryAlias);
  const resolvedTags = [
    ...params.getAll(QUERY_PARAM_KEYS.tag),
    ...resolvedSubcategories.flatMap((alias) => alias.tagIds ?? []),
  ];
  return {
    query: params.get(QUERY_PARAM_KEYS.query) ?? "",
    module: params.get(QUERY_PARAM_KEYS.module) ?? undefined,
    categories: params
      .getAll(QUERY_PARAM_KEYS.category)
      .flatMap(resolveCategoryAlias),
    subcategories: [...new Set(resolvedSubcategories.map((alias) => alias.canonicalId))],
    tags: [...new Set(resolvedTags)],
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

/** Full URL for a prompt detail page, optionally preserving explorer filters. */
export function promptUrl(slug: string, fromQuery?: string): string {
  const query = fromQuery?.replace(/^\?/, "") ?? "";
  return query.length > 0
    ? `/prompts/${slug}?from=${encodeURIComponent(query)}`
    : `/prompts/${slug}`;
}

const MAX_RETURN_QUERY_LENGTH = 1000;

function isSafeReturnQuery(fromQuery: string | null): fromQuery is string {
  return (
    fromQuery !== null &&
    fromQuery.length > 0 &&
    fromQuery.length < MAX_RETURN_QUERY_LENGTH &&
    !fromQuery.includes("://")
  );
}

/** Restores an explorer URL only for a bounded, relative query string. */
export function promptsReturnUrl(fromQuery: string | null): string {
  return isSafeReturnQuery(fromQuery) ? `/prompts?${fromQuery}` : "/prompts";
}

export function hasPromptsReturnQuery(fromQuery: string | null): boolean {
  return isSafeReturnQuery(fromQuery);
}

export function moduleUrl(moduleId: ModuleId): string {
  return `/modules/${moduleId}`;
}

export function categoryUrl(
  moduleId: ModuleId,
  categoryId: CategoryId,
): string {
  return `${moduleUrl(moduleId)}/${categoryId}`;
}

export function subcategoryUrl(
  moduleId: ModuleId,
  categoryId: CategoryId,
  subcategoryId: string,
): string {
  return `${categoryUrl(moduleId, categoryId)}/${subcategoryId}`;
}
