import { describe, expect, it } from "vitest";
import { allPrompts } from "@/src/data";
import { searchPrompts, toSearchablePrompt } from "@/src/lib/search";
import { normalizeText } from "@/src/lib/text";

describe("normalizeText", () => {
  it("convierte a minúsculas, elimina diacríticos y colapsa espacios", () => {
    expect(normalizeText("  Depuración   AVANZADA ")).toBe("depuracion avanzada");
    expect(normalizeText("Observabilidad")).toBe("observabilidad");
  });
});

describe("toSearchablePrompt", () => {
  it("transforma las referencias taxonómicas en etiquetas legibles", () => {
    const prompt = allPrompts.find((p) => p.id === "threat-modeling");
    expect(prompt).toBeDefined();
    if (!prompt) return;
    const searchable = toSearchablePrompt(prompt);
    expect(searchable.categories).toContain("calidad, seguridad y rendimiento");
    expect(searchable.tags).toContain("checklist");
    expect(searchable.tags).toContain("api");
  });
});

describe("searchPrompts", () => {
  it("encuentra el sistema Lean Startup por categoría y etiquetas", () => {
    const results = searchPrompts(allPrompts, "Lean Startup");
    expect(results.some((r) => r.prompt.id === "guiar-ciclo-lean")).toBe(true);
    expect(results.some((r) => r.prompt.tags.includes("mvp"))).toBe(true);
  });

  it("devuelve todos los prompts si la consulta está vacía", () => {
    expect(searchPrompts(allPrompts, "   ")).toHaveLength(allPrompts.length);
  });

  it("prioriza las coincidencias en el título sobre las del contenido", () => {
    const results = searchPrompts(allPrompts, "sql");
    expect(results.length).toBeGreaterThan(0);
    // "Optimize a slow SQL query" lleva SQL en el título y en las etiquetas.
    expect(results[0]?.prompt.id).toBe("optimize-sql-query");
  });

  it("tolera errores tipográficos leves", () => {
    const results = searchPrompts(allPrompts, "arquitecura");
    expect(results.length).toBeGreaterThan(0);
    expect(
      results.some((r) => r.prompt.category === "software-architecture"),
    ).toBe(true);
  });

  it("tolera faltas de ortografía en términos técnicos", () => {
    const results = searchPrompts(allPrompts, "typescrpt");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.prompt.tags.includes("typescript"))).toBe(true);
  });

  it("es insensible a mayúsculas y acentos", () => {
    const withAccents = searchPrompts(allPrompts, "observabilidad");
    expect(withAccents.length).toBeGreaterThan(0);
    expect(
      withAccents.some((r) => r.prompt.category === "observability"),
    ).toBe(true);

    const upperCase = searchPrompts(allPrompts, "DOCKER");
    expect(upperCase.some((r) => r.prompt.tags.includes("docker"))).toBe(true);
  });

  it("encuentra prompts por nombres de categoría y subcategoría", () => {
    const byCategory = searchPrompts(allPrompts, "copywriting");
    expect(byCategory.some((r) => r.prompt.subcategories?.includes("launch-email-sequence"))).toBe(true);

    const bySubcategory = searchPrompts(allPrompts, "contenedores");
    expect(
      bySubcategory.some((r) => (r.prompt.subcategories ?? []).includes("containers")),
    ).toBe(true);
  });

  it("encuentra los prompts de onboarding por sus temas", () => {
    expect(
      searchPrompts(allPrompts, "onboarding").some(
        (result) => result.prompt.id === "prepare-project-onboarding-checklist",
      ),
    ).toBe(true);
    expect(
      searchPrompts(allPrompts, "CONTRIBUTING").some(
        (result) => result.prompt.id === "create-contributing-guide",
      ),
    ).toBe(true);
    expect(
      searchPrompts(allPrompts, "commits").some(
        (result) => result.prompt.id === "define-branch-and-commit-conventions",
      ),
    ).toBe(true);
  });

  it("encuentra los prompts del proceso de revisión de código", () => {
    expect(
      searchPrompts(allPrompts, "proceso de revisión").some(
        (result) => result.prompt.id === "define-code-review-process",
      ),
    ).toBe(true);
    expect(
      searchPrompts(allPrompts, "checklist revisión").some(
        (result) => result.prompt.id === "create-project-code-review-checklist",
      ),
    ).toBe(true);
  });

  it("encuentra los prompts de releases y cambios por sus temas", () => {
    expect(
      searchPrompts(allPrompts, "release").some(
        (result) => result.prompt.id === "generate-release-notes-from-commits",
      ),
    ).toBe(true);
    expect(
      searchPrompts(allPrompts, "migración").some(
        (result) => result.prompt.id === "turn-pull-request-into-release-note",
      ),
    ).toBe(true);
    expect(
      searchPrompts(allPrompts, "rollback").some(
        (result) => result.prompt.id === "prepare-release-checklist",
      ),
    ).toBe(true);
  });

  it("encuentra prompts en ambos idiomas", () => {
    const spanish = searchPrompts(allPrompts, "pull request");
    expect(spanish.some((r) => r.prompt.id === "review-pull-request")).toBe(true);

    const english = searchPrompts(allPrompts, "business model");
    expect(english.length).toBeGreaterThan(0);
  });

  it("devuelve una lista vacía cuando nada coincide", () => {
    expect(searchPrompts(allPrompts, "xzqwkj")).toEqual([]);
  });
});
