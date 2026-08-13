import { describe, expect, it } from "vitest";
import { allPrompts, categories } from "@/src/data";
import {
  getCategoryForModule,
  getPromptsForCategory,
  getRelatedPrompts,
  getSubcategoriesForCategory,
} from "@/src/lib/taxonomy";

describe("helpers de navegación por taxonomía", () => {
  it("devuelve únicamente prompts de la categoría solicitada", () => {
    const prompts = getPromptsForCategory("backend-and-apis");

    expect(prompts.length).toBeGreaterThan(0);
    expect(prompts.every((prompt) => prompt.category === "backend-and-apis")).toBe(true);
  });

  it("resuelve las subcategorías de una categoría sin mezclar categorías", () => {
    const subcategories = getSubcategoriesForCategory("software-architecture");

    expect(subcategories.length).toBeGreaterThan(0);
    expect(subcategories.every((subcategory) => subcategory.category === "software-architecture")).toBe(true);
  });

  it("prioriza coincidencias de subcategoría y excluye el prompt actual", () => {
    const prompt = allPrompts.find((candidate) => candidate.slug === "descubrir-atributos-de-calidad");
    if (!prompt) throw new Error("No se encontró el prompt de prueba");

    const related = getRelatedPrompts(prompt);

    expect(related.length).toBeGreaterThan(0);
    expect(related.length).toBeLessThanOrEqual(6);
    expect(related.every((candidate) => candidate.id !== prompt.id)).toBe(true);
    expect(related[0]?.subcategories).toContain("quality-attributes");
  });

  it("solo considera válida una categoría dentro de su propio módulo", () => {
    const category = categories.find((candidate) => candidate.id === "software-architecture");
    expect(category?.module).toBe("software-development");
    expect(getCategoryForModule("software-development", category?.id ?? "")).toEqual(category);
    expect(getCategoryForModule("marketing", category?.id ?? "")).toBeUndefined();
  });
});
