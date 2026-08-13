import { describe, expect, it } from "vitest";
import { promptsUrl } from "@/src/lib/query-params";

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
});
