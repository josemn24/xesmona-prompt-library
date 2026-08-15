import { describe, expect, it } from "vitest";
import { allPrompts, categories } from "@/src/data";
import {
  getCategoryForModule,
  getPromptsForCategory,
  getPromptsForSubcategory,
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

  it("obtiene prompts de una subcategoría sin mezclar categorías", () => {
    const prompts = getPromptsForSubcategory("database");

    expect(prompts).toHaveLength(3);
    expect(prompts.every((prompt) => prompt.category === "project-setup-and-workflow")).toBe(true);
    expect(prompts.every((prompt) => prompt.subcategories?.includes("database"))).toBe(true);
  });

  it("obtiene los tres prompts de onboarding y convenciones", () => {
    const prompts = getPromptsForSubcategory("onboarding-and-conventions");

    expect(prompts).toHaveLength(3);
    expect(prompts.map((prompt) => prompt.id)).toEqual([
      "create-contributing-guide",
      "prepare-project-onboarding-checklist",
      "define-branch-and-commit-conventions",
    ]);
    expect(prompts.every((prompt) => prompt.language === "es")).toBe(true);
    expect(prompts.every((prompt) => prompt.category === "project-setup-and-workflow")).toBe(true);
    expect(prompts.find((prompt) => prompt.id === "create-contributing-guide")?.tags).toEqual([
      "template",
      "checklist",
      "git",
    ]);
    expect(
      prompts.find((prompt) => prompt.id === "prepare-project-onboarding-checklist")?.tags,
    ).toEqual(["checklist", "template"]);
    expect(
      prompts.find((prompt) => prompt.id === "define-branch-and-commit-conventions")?.tags,
    ).toEqual(["git", "template", "checklist"]);
  });

  it("obtiene los tres prompts de revisión de código", () => {
    const prompts = getPromptsForSubcategory("code-review");

    expect(prompts).toHaveLength(3);
    expect(prompts.map((prompt) => prompt.id)).toEqual([
      "review-pull-request",
      "define-code-review-process",
      "create-project-code-review-checklist",
    ]);
    expect(prompts.every((prompt) => prompt.language === "es")).toBe(true);
    expect(prompts.every((prompt) => prompt.category === "quality-security-performance")).toBe(true);
    expect(prompts.find((prompt) => prompt.id === "define-code-review-process")?.tags).toEqual([
      "checklist",
      "template",
      "git",
    ]);
    expect(
      prompts.find((prompt) => prompt.id === "create-project-code-review-checklist")?.tags,
    ).toEqual(["checklist", "template", "analysis"]);
  });

  it("obtiene los tres prompts de releases y cambios", () => {
    const prompts = getPromptsForSubcategory("releases-and-changes");

    expect(prompts).toHaveLength(3);
    expect(prompts.map((prompt) => prompt.id)).toEqual([
      "generate-release-notes-from-commits",
      "turn-pull-request-into-release-note",
      "prepare-release-checklist",
    ]);
    expect(prompts.every((prompt) => prompt.language === "es")).toBe(true);
    expect(prompts.every((prompt) => prompt.module === "software-development")).toBe(true);
    expect(prompts.every((prompt) => prompt.category === "delivery-and-deployment")).toBe(true);
    expect(prompts.every((prompt) => prompt.subcategories?.includes("releases-and-changes"))).toBe(true);
    expect(prompts.find((prompt) => prompt.id === "generate-release-notes-from-commits")?.slug).toBe(
      "generar-notas-release-desde-commits",
    );
    expect(prompts.find((prompt) => prompt.id === "turn-pull-request-into-release-note")?.slug).toBe(
      "convertir-pull-request-en-nota-release",
    );
    expect(prompts.find((prompt) => prompt.id === "prepare-release-checklist")?.slug).toBe(
      "preparar-checklist-release",
    );
    expect(prompts.find((prompt) => prompt.id === "generate-release-notes-from-commits")?.tags).toEqual([
      "git",
      "template",
    ]);
    expect(prompts.find((prompt) => prompt.id === "turn-pull-request-into-release-note")?.tags).toEqual([
      "git",
      "template",
    ]);
    expect(prompts.find((prompt) => prompt.id === "prepare-release-checklist")?.tags).toEqual([
      "checklist",
      "template",
      "git",
    ]);
  });

  it("obtiene los dos prompts de despliegues sin mezclar categorías", () => {
    const prompts = getPromptsForSubcategory("deployments");

    expect(prompts).toHaveLength(2);
    expect(prompts.map((prompt) => prompt.id)).toEqual([
      "design-cicd-pipeline",
      "audit-nextjs-production-readiness",
    ]);
    expect(prompts.every((prompt) => prompt.category === "delivery-and-deployment")).toBe(true);
    expect(prompts.every((prompt) => prompt.subcategories?.includes("deployments"))).toBe(true);
  });
});
