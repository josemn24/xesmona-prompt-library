"use client";

import type {
  Category,
  PromptLanguage,
  Subcategory,
  Tag,
} from "@/src/data";
import { modules } from "@/src/data";
import type { PromptFilters } from "@/src/lib/filters";
import { LANGUAGE_LABELS } from "@/src/lib/i18n";

type FilterPanelProps = {
  /** Unique prefix so several panels can coexist without duplicate DOM ids. */
  idPrefix: string;
  filters: PromptFilters;
  /** Categories available for the selected module (empty when none). */
  categories: Category[];
  /** Subcategories available for the selected categories/module. */
  subcategories: Subcategory[];
  tags: Tag[];
  onSetModule: (module: string | undefined) => void;
  onToggleCategory: (category: string) => void;
  onToggleSubcategory: (subcategory: string) => void;
  onToggleTag: (tag: string) => void;
  onSetLanguage: (language: PromptLanguage | undefined) => void;
};

const legendClass = "text-sm font-semibold text-brand-ink";
const groupClass = "mt-3 space-y-1.5";
const optionClass =
  "flex cursor-pointer items-center gap-2 rounded-lg px-1.5 py-1 text-sm text-brand-slate transition-colors hover:bg-brand-yellow-soft hover:text-brand-ink";
const inputClass = "size-4 accent-brand-violet";

export function FilterPanel({
  idPrefix,
  filters,
  categories,
  subcategories,
  tags,
  onSetModule,
  onToggleCategory,
  onToggleSubcategory,
  onToggleTag,
  onSetLanguage,
}: FilterPanelProps) {
  return (
    <div className="space-y-7">
      <fieldset>
        <legend className={legendClass}>Módulo</legend>
        <div className={groupClass} role="radiogroup" aria-label="Módulo">
          <label className={optionClass}>
            <input
              type="radio"
              name={`${idPrefix}-module`}
              checked={filters.module === undefined}
              onChange={() => onSetModule(undefined)}
              className={inputClass}
            />
            Todos los módulos
          </label>
          {modules.map((module) => (
            <label key={module.id} className={optionClass}>
              <input
                type="radio"
                name={`${idPrefix}-module`}
                checked={filters.module === module.id}
                onChange={() => onSetModule(module.id)}
                className={inputClass}
              />
              {module.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legendClass}>Categorías</legend>
        {filters.module === undefined ? (
          <p className="mt-3 text-sm text-brand-slate">
            Selecciona un módulo para ver sus categorías.
          </p>
        ) : (
          <div className={groupClass}>
            {categories.map((category) => (
              <label key={category.id} className={optionClass}>
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.id)}
                  onChange={() => onToggleCategory(category.id)}
                  className={inputClass}
                />
                {category.label}
              </label>
            ))}
          </div>
        )}
      </fieldset>

      {subcategories.length > 0 && (
        <fieldset>
          <legend className={legendClass}>Subcategorías</legend>
          <div className={groupClass}>
            {subcategories.map((subcategory) => (
              <label key={subcategory.id} className={optionClass}>
                <input
                  type="checkbox"
                  checked={filters.subcategories.includes(subcategory.id)}
                  onChange={() => onToggleSubcategory(subcategory.id)}
                  className={inputClass}
                />
                {subcategory.label}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className={legendClass}>Idioma</legend>
        <div className={groupClass} role="radiogroup" aria-label="Idioma">
          <label className={optionClass}>
            <input
              type="radio"
              name={`${idPrefix}-language`}
              checked={filters.language === undefined}
              onChange={() => onSetLanguage(undefined)}
              className={inputClass}
            />
            Todos los idiomas
          </label>
          {(["es", "en"] as const).map((language) => (
            <label key={language} className={optionClass}>
              <input
                type="radio"
                name={`${idPrefix}-language`}
                checked={filters.language === language}
                onChange={() => onSetLanguage(language)}
                className={inputClass}
              />
              {LANGUAGE_LABELS[language]}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legendClass}>Etiquetas</legend>
        <div className={groupClass}>
          {tags.map((tag) => (
            <label key={tag.id} className={optionClass}>
              <input
                type="checkbox"
                checked={filters.tags.includes(tag.id)}
                onChange={() => onToggleTag(tag.id)}
                className={inputClass}
              />
              {tag.label}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
