import { describe, expect, it } from "vitest";
import { generateStaticParams as generateSubcategoryStaticParams } from "@/app/modules/[module]/[category]/[subcategory]/page";
import {
  allPrompts,
  categories,
  modules,
  subcategories,
  tags,
} from "@/src/data";
import {
  filtersFromSearchParams,
  categoryUrl,
  moduleUrl,
  subcategoryUrl,
} from "@/src/lib/query-params";
import {
  getCategoriesForModule,
  getCategoryForModule,
  getPromptsForSubcategory,
  isNavigableSubcategory,
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

  it("organiza Setup en subcategorías generales", () => {
    const setupSubcategories = subcategories.filter(
      (subcategory) => subcategory.category === "project-setup-and-workflow",
    );
    expect(setupSubcategories.map((subcategory) => subcategory.id)).toEqual([
      "local-environment",
      "database",
      "frontend-and-components",
      "version-control-and-collaboration",
      "onboarding-and-conventions",
    ]);
    expect(
      setupSubcategories.filter((subcategory) => subcategory.isNavigable).map(
        (subcategory) => subcategory.id,
      ),
    ).toEqual([
      "local-environment",
      "database",
      "frontend-and-components",
      "onboarding-and-conventions",
    ]);
    expect(getPromptsForSubcategory("local-environment")).toHaveLength(4);
    expect(getPromptsForSubcategory("database")).toHaveLength(3);
    expect(getPromptsForSubcategory("frontend-and-components")).toHaveLength(8);
    expect(getPromptsForSubcategory("version-control-and-collaboration")).toHaveLength(1);
    expect(getPromptsForSubcategory("onboarding-and-conventions")).toHaveLength(3);
    expect(isNavigableSubcategory("database")).toBe(true);
    expect(isNavigableSubcategory("version-control-and-collaboration")).toBe(false);
    expect(isNavigableSubcategory("onboarding-and-conventions")).toBe(true);
    expect(isNavigableSubcategory("code-review")).toBe(true);
  });

  it("mantiene la integridad de prompts, subcategorías y etiquetas", () => {
    const moduleIds = new Set(modules.map((module) => module.id));
    const categoryById = new Map(categories.map((category) => [category.id, category]));
    const subcategoryById = new Map(
      subcategories.map((subcategory) => [subcategory.id, subcategory]),
    );
    const tagIds = new Set(tags.map((tag) => tag.id));

    expect(allPrompts).toHaveLength(85);
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

  it("mantiene facetas válidas y filtros canónicos", () => {
    const validFacets = new Set(["technology", "objective", "format", "context"]);

    expect(tags.every((tag) => validFacets.has(tag.facet))).toBe(true);
    const resolved = filtersFromSearchParams(
      new URLSearchParams(
        "category=delivery-and-deployment&subcategory=releases-and-changes&tag=git",
      ),
    );
    expect(resolved.categories).toEqual(["delivery-and-deployment"]);
    expect(resolved.subcategories).toEqual(["releases-and-changes"]);
    expect(resolved.tags).toEqual(["git"]);
  });

  it("no transforma identificadores antiguos en filtros canónicos", () => {
    const resolved = filtersFromSearchParams(
      new URLSearchParams("category=devops&subcategory=supabase-migrations"),
    );
    expect(resolved.categories).toEqual(["devops"]);
    expect(resolved.subcategories).toEqual(["supabase-migrations"]);
    expect(resolved.tags).toEqual([]);
  });

  it("valida el contexto módulo-categoría de las rutas canónicas", () => {
    expect(getCategoryForModule("software-development", "software-architecture")).toBeDefined();
    expect(getCategoryForModule("marketing", "software-architecture")).toBeUndefined();
    expect(getCategoryForModule("software-development", "missing-category")).toBeUndefined();
  });

  it("genera las páginas de subcategoría navegables", () => {
    const params = generateSubcategoryStaticParams();

    expect(params).toHaveLength(7);
    expect(params).toContainEqual({
      module: "software-development",
      category: "discovery-and-scope",
      subcategory: "project-analysis",
    });
    expect(params).toContainEqual({
      module: "software-development",
      category: "project-setup-and-workflow",
      subcategory: "onboarding-and-conventions",
    });
    expect(params).toContainEqual({
      module: "software-development",
      category: "quality-security-performance",
      subcategory: "code-review",
    });
    expect(params).toContainEqual({
      module: "software-development",
      category: "delivery-and-deployment",
      subcategory: "releases-and-changes",
    });
    expect(params).not.toContainEqual(
      expect.objectContaining({
        subcategory: "version-control-and-collaboration",
      }),
    );
  });

  it("construye URLs de navegación sin etapas ni parámetros de filtro", () => {
    const modulePath = moduleUrl("software-development");
    const categoryPath = categoryUrl("software-development", "software-architecture");

    expect(modulePath).toBe("/modules/software-development");
    expect(categoryPath).toBe(
      "/modules/software-development/software-architecture",
    );
    expect(categoryPath).not.toMatch(/stage|etapa|\?/);
    expect(
      subcategoryUrl(
        "software-development",
        "project-setup-and-workflow",
        "database",
      ),
    ).toBe(
      "/modules/software-development/project-setup-and-workflow/database",
    );
  });
});
