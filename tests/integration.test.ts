import { describe, expect, it } from "vitest";
import {
  allPrompts,
  categories,
  categoryAliases,
  modules,
  subcategories,
  tags,
} from "@/src/data";
import {
  filtersFromSearchParams,
  categoryUrl,
  moduleUrl,
} from "@/src/lib/query-params";
import {
  getCategoriesForModule,
  getCategoryForModule,
} from "@/src/lib/taxonomy";

const EXPECTED_MODULE_IDS = [
  "software-development",
  "artificial-intelligence",
  "marketing",
  "business",
  "productivity",
];

describe("integración final de la arquitectura", () => {
  it("conserva los cinco módulos canónicos y sus categorías", () => {
    expect(modules.map((module) => module.id)).toEqual(EXPECTED_MODULE_IDS);

    for (const moduleItem of modules) {
      const moduleCategories = getCategoriesForModule(moduleItem.id);
      expect(moduleCategories.length).toBeGreaterThan(0);
      expect(moduleCategories.every((category) => category.module === moduleItem.id)).toBe(true);
    }
    expect(categories).toHaveLength(33);
  });

  it("mantiene la integridad de prompts, subcategorías y etiquetas", () => {
    const moduleIds = new Set(modules.map((module) => module.id));
    const categoryById = new Map(categories.map((category) => [category.id, category]));
    const subcategoryById = new Map(
      subcategories.map((subcategory) => [subcategory.id, subcategory]),
    );
    const tagIds = new Set(tags.map((tag) => tag.id));

    expect(allPrompts).toHaveLength(72);
    for (const prompt of allPrompts) {
      const category = categoryById.get(prompt.category);
      expect(moduleIds.has(prompt.module)).toBe(true);
      expect(category?.module).toBe(prompt.module);
      expect(prompt.category.length).toBeGreaterThan(0);
      expect(
        (prompt.subcategories ?? []).every(
          (subcategoryId) => subcategoryById.get(subcategoryId)?.category === prompt.category,
        ),
      ).toBe(true);
      expect(prompt.tags.every((tagId) => tagIds.has(tagId))).toBe(true);
    }
  });

  it("mantiene facetas válidas y aliases fuera de la taxonomía canónica", () => {
    const categoryIds = new Set(categories.map((category) => category.id));
    const validFacets = new Set(["technology", "objective", "format", "context"]);

    expect(tags.every((tag) => validFacets.has(tag.facet))).toBe(true);
    for (const alias of categoryAliases) {
      expect(categoryIds.has(alias.legacyId)).toBe(false);
      expect(alias.canonicalIds.every((categoryId) => categoryIds.has(categoryId))).toBe(true);

      const resolved = filtersFromSearchParams(
        new URLSearchParams(`category=${alias.legacyId}`),
      );
      expect(resolved.categories).toEqual([alias.canonicalIds[0]]);
    }
  });

  it("valida el contexto módulo-categoría de las rutas canónicas", () => {
    expect(getCategoryForModule("software-development", "software-architecture")).toBeDefined();
    expect(getCategoryForModule("marketing", "software-architecture")).toBeUndefined();
    expect(getCategoryForModule("software-development", "missing-category")).toBeUndefined();
  });

  it("construye URLs de navegación sin etapas ni parámetros de filtro", () => {
    const modulePath = moduleUrl("software-development");
    const categoryPath = categoryUrl("software-development", "software-architecture");

    expect(modulePath).toBe("/modules/software-development");
    expect(categoryPath).toBe(
      "/modules/software-development/software-architecture",
    );
    expect(categoryPath).not.toMatch(/stage|etapa|\?/);
  });
});
