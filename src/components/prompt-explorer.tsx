"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { allPrompts, tags, type PromptLanguage } from "@/src/data";
import { EmptyState } from "@/src/components/empty-state";
import { FilterChip } from "@/src/components/filter-chip";
import { FilterPanel } from "@/src/components/filter-panel";
import { PromptCard } from "@/src/components/prompt-card";
import { SearchInput } from "@/src/components/search-input";
import {
  hasActiveFilters,
  searchAndFilter,
  type PromptFilters,
} from "@/src/lib/filters";
import {
  filtersFromSearchParams,
  searchParamsFromFilters,
} from "@/src/lib/query-params";
import {
  getCategoriesForModule,
  getCategoryById,
  getModuleById,
  getSubcategoriesForCategories,
  getSubcategoriesForModule,
  getSubcategoryById,
  getTagById,
} from "@/src/lib/taxonomy";

const SEARCH_DEBOUNCE_MS = 300;

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function PromptExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // The URL is the single source of truth for the filter state.
  const filters = useMemo(
    () => filtersFromSearchParams(searchParams),
    [searchParams],
  );

  const [queryInput, setQueryInput] = useState(filters.query);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Keep the search box in sync when the URL changes (back/forward navigation,
  // chips), adjusting state during render instead of in an effect.
  const urlQuery = filters.query;
  const [previousUrlQuery, setPreviousUrlQuery] = useState(urlQuery);
  if (previousUrlQuery !== urlQuery) {
    setPreviousUrlQuery(urlQuery);
    setQueryInput(urlQuery);
  }

  const updateUrl = useCallback(
    (updater: (current: PromptFilters) => PromptFilters) => {
      const next = updater(filtersFromSearchParams(searchParams));
      const queryString = searchParamsFromFilters(next).toString();
      router.replace(
        queryString.length > 0 ? `${pathname}?${queryString}` : pathname,
        { scroll: false },
      );
    },
    [pathname, router, searchParams],
  );

  // Debounce typing into the URL query param.
  useEffect(() => {
    if (queryInput === urlQuery) return;
    const handle = window.setTimeout(() => {
      updateUrl((current) => ({ ...current, query: queryInput }));
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(handle);
  }, [queryInput, urlQuery, updateUrl]);

  // Close the filter drawer with Escape and lock body scroll while open.
  useEffect(() => {
    if (!drawerOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setDrawerOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const results = useMemo(
    () => searchAndFilter(allPrompts, filters),
    [filters],
  );

  // Available taxonomy options depend on the selected module/categories.
  const availableCategories = useMemo(
    () => (filters.module ? getCategoriesForModule(filters.module) : []),
    [filters.module],
  );
  const availableSubcategories = useMemo(() => {
    if (!filters.module) return [];
    return filters.categories.length > 0
      ? getSubcategoriesForCategories(filters.categories)
      : getSubcategoriesForModule(filters.module);
  }, [filters.module, filters.categories]);

  function handleSetModule(moduleId: string | undefined) {
    updateUrl((current) => {
      if (moduleId === undefined) return { ...current, module: undefined };
      const validCategoryIds = new Set(
        getCategoriesForModule(moduleId).map((category) => category.id),
      );
      const categories = current.categories.filter((id) =>
        validCategoryIds.has(id),
      );
      const validSubcategoryIds = new Set(
        (categories.length > 0
          ? getSubcategoriesForCategories(categories)
          : getSubcategoriesForModule(moduleId)
        ).map((subcategory) => subcategory.id),
      );
      return {
        ...current,
        module: moduleId,
        categories,
        subcategories: current.subcategories.filter((id) =>
          validSubcategoryIds.has(id),
        ),
      };
    });
  }

  function handleToggleCategory(categoryId: string) {
    updateUrl((current) => {
      const categories = toggleValue(current.categories, categoryId);
      let subcategories = current.subcategories;
      if (categories.length > 0) {
        const validSubcategoryIds = new Set(
          getSubcategoriesForCategories(categories).map((s) => s.id),
        );
        subcategories = subcategories.filter((id) =>
          validSubcategoryIds.has(id),
        );
      }
      return { ...current, categories, subcategories };
    });
  }

  function handleToggleSubcategory(subcategoryId: string) {
    updateUrl((current) => ({
      ...current,
      subcategories: toggleValue(current.subcategories, subcategoryId),
    }));
  }

  function handleToggleTag(tagId: string) {
    updateUrl((current) => ({
      ...current,
      tags: toggleValue(current.tags, tagId),
    }));
  }

  function handleSetLanguage(language: PromptLanguage | undefined) {
    updateUrl((current) => ({ ...current, language }));
  }

  function clearAllFilters() {
    setQueryInput("");
    router.replace(pathname, { scroll: false });
  }

  const currentQueryString = searchParams.toString();
  function promptHref(slug: string): string {
    return currentQueryString.length > 0
      ? `/prompts/${slug}?from=${encodeURIComponent(currentQueryString)}`
      : `/prompts/${slug}`;
  }

  const moduleLabel = filters.module
    ? (getModuleById(filters.module)?.label ?? filters.module)
    : undefined;

  const filterPanelProps = {
    filters,
    categories: availableCategories,
    subcategories: availableSubcategories,
    tags,
    onSetModule: handleSetModule,
    onToggleCategory: handleToggleCategory,
    onToggleSubcategory: handleToggleSubcategory,
    onToggleTag: handleToggleTag,
    onSetLanguage: handleSetLanguage,
  };

  return (
    <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
      <aside className="hidden lg:block" aria-label="Filtros">
        <FilterPanel idPrefix="sidebar" {...filterPanelProps} />
      </aside>

      <div>
        <SearchInput
          id="prompt-search"
          label="Buscar prompts"
          value={queryInput}
          onChange={setQueryInput}
        />

        <div className="mt-4 flex items-center justify-between gap-3">
          <p aria-live="polite" className="text-sm text-brand-slate">
            {results.length}{" "}
            {results.length === 1 ? "prompt encontrado" : "prompts encontrados"}
          </p>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-brand-blue/20 bg-white px-3 py-1.5 text-sm font-medium text-brand-slate transition-colors hover:border-brand-turquoise lg:hidden"
          >
            <SlidersHorizontal className="size-4" aria-hidden />
            Filtros
          </button>
        </div>

        {hasActiveFilters(filters) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {filters.query.trim().length > 0 && (
              <FilterChip
                label={`Búsqueda: ${filters.query.trim()}`}
                onRemove={() => {
                  setQueryInput("");
                  updateUrl((current) => ({ ...current, query: "" }));
                }}
              />
            )}
            {moduleLabel !== undefined && (
              <FilterChip
                label={`Módulo: ${moduleLabel}`}
                onRemove={() => handleSetModule(undefined)}
              />
            )}
            {filters.categories.map((categoryId) => (
              <FilterChip
                key={categoryId}
                label={getCategoryById(categoryId)?.label ?? categoryId}
                onRemove={() => handleToggleCategory(categoryId)}
              />
            ))}
            {filters.subcategories.map((subcategoryId) => (
              <FilterChip
                key={subcategoryId}
                label={getSubcategoryById(subcategoryId)?.label ?? subcategoryId}
                onRemove={() => handleToggleSubcategory(subcategoryId)}
              />
            ))}
            {filters.tags.map((tagId) => (
              <FilterChip
                key={tagId}
                label={getTagById(tagId)?.label ?? tagId}
                onRemove={() => handleToggleTag(tagId)}
              />
            ))}
            {filters.language !== undefined && (
              <FilterChip
                label={`Idioma: ${filters.language === "es" ? "Español" : "Inglés"}`}
                onRemove={() => handleSetLanguage(undefined)}
              />
            )}
            <button
              type="button"
              onClick={clearAllFilters}
              className="rounded-md px-2 py-1 text-xs font-medium text-brand-violet underline-offset-4 hover:text-brand-coral hover:underline"
            >
              Limpiar todos los filtros
            </button>
          </div>
        )}

        <div className="mt-6">
          {results.length === 0 ? (
            <EmptyState
              title="Ningún prompt coincide con tu búsqueda"
              description="Prueba con otras palabras clave, revisa la ortografía o quita algunos filtros para ampliar los resultados."
              action={
                hasActiveFilters(filters) ? (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="rounded-xl bg-brand-violet px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-coral"
                  >
                    Limpiar todos los filtros
                  </button>
                ) : undefined
              }
            />
          ) : (
            <ul className="grid list-none gap-4 p-0 xl:grid-cols-2">
              {results.map((prompt) => (
                <li key={prompt.id}>
                  <PromptCard prompt={prompt} href={promptHref(prompt.slug)} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filtros de búsqueda"
        >
          <button
            type="button"
            aria-label="Cerrar filtros"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-brand-ink/40"
            tabIndex={-1}
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-brand-cream shadow-xl">
            <div className="flex items-center justify-between border-b border-brand-blue/10 px-4 py-3">
              <h2 className="font-semibold text-brand-ink">Filtros</h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Cerrar panel de filtros"
                autoFocus
                className="rounded-md p-1.5 text-brand-slate transition-colors hover:bg-brand-yellow-soft"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-5">
              <FilterPanel idPrefix="drawer" {...filterPanelProps} />
            </div>
            <div className="border-t border-brand-blue/10 px-4 py-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-full rounded-xl bg-brand-violet px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-coral"
              >
                Ver {results.length}{" "}
                {results.length === 1 ? "resultado" : "resultados"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
