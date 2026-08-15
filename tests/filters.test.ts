import { describe, expect, it } from "vitest";
import { allPrompts } from "@/src/data";
import {
  applyFilters,
  countActiveFilters,
  emptyFilters,
  searchAndFilter,
} from "@/src/lib/filters";

describe("applyFilters", () => {
  it("filtra los prompts Lean Startup por categoría y etiqueta", () => {
    const results = applyFilters(allPrompts, {
      ...emptyFilters,
      categories: ["validation-and-experimentation"],
      tags: ["experimentation"],
    });
    expect(results.length).toBeGreaterThanOrEqual(5);
    expect(results.every((prompt) => prompt.category === "validation-and-experimentation")).toBe(true);
    expect(results.every((prompt) => prompt.tags.includes("experimentation"))).toBe(true);
  });

  it("sin filtros devuelve todos los prompts", () => {
    expect(applyFilters(allPrompts, emptyFilters)).toHaveLength(allPrompts.length);
  });

  it("filtra por módulo", () => {
    const results = applyFilters(allPrompts, {
      ...emptyFilters,
      module: "artificial-intelligence",
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.module === "artificial-intelligence")).toBe(true);
  });

  it("filtra por varias categorías con lógica OR", () => {
    const results = applyFilters(allPrompts, {
      ...emptyFilters,
      categories: ["acquisition-and-distribution", "data"],
    });
    expect(results.length).toBeGreaterThan(0);
    for (const prompt of results) {
      expect(
        prompt.category === "acquisition-and-distribution" || prompt.category === "data",
      ).toBe(true);
    }
    // Debe incluir prompts de ambas categorías (OR, no AND).
    expect(results.some((p) => p.category === "acquisition-and-distribution")).toBe(true);
    expect(results.some((p) => p.category === "data")).toBe(true);
  });

  it("filtra por varias subcategorías con lógica OR", () => {
    const results = applyFilters(allPrompts, {
      ...emptyFilters,
      subcategories: ["unit-testing", "containers"],
    });
    expect(results.length).toBeGreaterThan(0);
    for (const prompt of results) {
      const subs = prompt.subcategories ?? [];
      expect(subs.includes("unit-testing") || subs.includes("containers")).toBe(true);
    }
  });

  it("filtra por etiquetas con lógica OR", () => {
    const results = applyFilters(allPrompts, {
      ...emptyFilters,
      tags: ["docker"],
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.tags.includes("docker"))).toBe(true);
  });

  it("filtra los cuatro prompts de setup de Next.js por etiqueta", () => {
    const results = applyFilters(allPrompts, {
      ...emptyFilters,
      tags: ["nextjs"],
    });

    expect(results).toHaveLength(4);
    expect(results.map((prompt) => prompt.id)).toEqual([
      "configure-nextjs-environment",
      "configure-nextjs-error-states",
      "configure-nextjs-metadata-seo",
      "evaluate-configure-nextjs-proxy",
    ]);
  });

  it("filtra por idioma", () => {
    const results = applyFilters(allPrompts, {
      ...emptyFilters,
      language: "en",
    });
    expect(results.length).toBeGreaterThanOrEqual(5);
    expect(results.every((p) => p.language === "en")).toBe(true);
  });

  it("combina tipos de filtro con lógica AND", () => {
    const results = applyFilters(allPrompts, {
      query: "",
      module: "software-development",
      categories: ["data"],
      subcategories: [],
      tags: ["sql"],
      language: "en",
    });
    expect(results.length).toBeGreaterThan(0);
    for (const prompt of results) {
      expect(prompt.module).toBe("software-development");
      expect(prompt.category).toBe("data");
      expect(prompt.tags).toContain("sql");
      expect(prompt.language).toBe("en");
    }
  });

  it("devuelve una lista vacía cuando ningún prompt cumple los filtros", () => {
    const results = applyFilters(allPrompts, {
      ...emptyFilters,
      module: "marketing",
      language: "en",
    });
    expect(results).toEqual([]);
  });
});

describe("searchAndFilter", () => {
  it("combina búsqueda y filtros", () => {
    const results = searchAndFilter(allPrompts, {
      ...emptyFilters,
      query: "optimizar",
      module: "software-development",
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.module === "software-development")).toBe(true);
  });

  it("sin consulta ordena por fecha de actualización descendente", () => {
    const results = searchAndFilter(allPrompts, emptyFilters);
    for (let i = 1; i < results.length; i += 1) {
      const previous = results[i - 1];
      const current = results[i];
      if (!previous || !current) continue;
      expect(previous.updatedAt >= current.updatedAt).toBe(true);
    }
  });

  it("devuelve una lista vacía cuando la búsqueda no encuentra nada", () => {
    const results = searchAndFilter(allPrompts, {
      ...emptyFilters,
      query: "xzqwkj",
    });
    expect(results).toEqual([]);
  });
});

describe("countActiveFilters", () => {
  it("cuenta cada filtro activo y cada valor múltiple", () => {
    expect(countActiveFilters(emptyFilters)).toBe(0);
    expect(
      countActiveFilters({
        query: "sql",
        module: "software-development",
        categories: ["data", "quality-security-performance"],
        subcategories: [],
        tags: ["sql"],
        language: "en",
      }),
    ).toBe(5);
  });
});
