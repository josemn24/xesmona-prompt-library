import { describe, expect, it } from "vitest";
import {
  categoryUrl,
  filtersFromSearchParams,
  promptUrl,
  promptsUrl,
  promptsReturnUrl,
} from "@/src/lib/query-params";

describe("URLs de navegación", () => {
  it("construye la URL canónica de categoría sin etapas ni filtros", () => {
    expect(categoryUrl("software-development", "software-architecture")).toBe(
      "/modules/software-development/software-architecture",
    );
  });
});

describe("promptsUrl", () => {
  it("genera una URL de exploración filtrada por módulo", () => {
    expect(promptsUrl({ module: "software-development" })).toBe(
      "/prompts?module=software-development",
    );
  });

  it("combina la búsqueda con el módulo y codifica sus parámetros", () => {
    expect(
      promptsUrl({ module: "artificial-intelligence", query: "RAG y agentes" }),
    ).toBe("/prompts?q=RAG+y+agentes&module=artificial-intelligence");
  });

  it("resuelve un alias antiguo a la primera categoría canónica", () => {
    const filters = filtersFromSearchParams(
      new URLSearchParams("category=apis-and-integrations"),
    );
    expect(filters.categories).toEqual(["backend-and-apis"]);
  });
});

describe("retorno desde el detalle del prompt", () => {
  it("conserva la consulta del explorador en el enlace al detalle", () => {
    expect(promptUrl("revisar-pull-request", "module=software-development&category=data")).toBe(
      "/prompts/revisar-pull-request?from=module%3Dsoftware-development%26category%3Ddata",
    );
  });

  it("restaura una consulta relativa y rechaza URLs externas", () => {
    expect(promptsReturnUrl("module=software-development")).toBe(
      "/prompts?module=software-development",
    );
    expect(promptsReturnUrl("https://example.com")).toBe("/prompts");
    expect(promptsReturnUrl(null)).toBe("/prompts");
  });
});
