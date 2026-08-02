import { describe, expect, it } from "vitest";
import { libraryData, type LibraryData } from "@/src/data";
import { validateLibraryData } from "@/src/data/validation";
import type { Prompt } from "@/src/data";

function cloneLibrary(): LibraryData {
  return structuredClone(libraryData);
}

function firstPrompt(data: LibraryData): Prompt {
  const prompt = data.prompts[0];
  if (prompt === undefined) throw new Error("La biblioteca no tiene prompts");
  return prompt;
}

describe("validación de los datos estáticos", () => {
  it("los datos reales de la biblioteca son válidos", () => {
    expect(validateLibraryData(libraryData)).toEqual([]);
  });

  it("detecta identificadores de prompt duplicados", () => {
    const data = cloneLibrary();
    const duplicated = { ...firstPrompt(data), slug: "slug-unico-de-prueba" };
    data.prompts.push(duplicated);
    const errors = validateLibraryData(data);
    expect(
      errors.some((e) =>
        e.includes(`Identificador de prompt duplicado: "${duplicated.id}"`),
      ),
    ).toBe(true);
  });

  it("detecta slugs de prompt duplicados", () => {
    const data = cloneLibrary();
    const duplicated = { ...firstPrompt(data), id: "id-unico-de-prueba" };
    data.prompts.push(duplicated);
    const errors = validateLibraryData(data);
    expect(
      errors.some((e) =>
        e.includes(`Slug de prompt duplicado: "${duplicated.slug}"`),
      ),
    ).toBe(true);
  });

  it("detecta identificadores de módulo, categoría, subcategoría y etiqueta duplicados", () => {
    const data = cloneLibrary();
    const moduleItem = data.modules[0];
    const category = data.categories[0];
    const subcategory = data.subcategories[0];
    const tag = data.tags[0];
    if (!moduleItem || !category || !subcategory || !tag) {
      throw new Error("Taxonomía vacía");
    }
    data.modules.push({ ...moduleItem });
    data.categories.push({ ...category });
    data.subcategories.push({ ...subcategory });
    data.tags.push({ ...tag });
    const errors = validateLibraryData(data);
    expect(errors.some((e) => e.includes("módulo duplicado"))).toBe(true);
    expect(errors.some((e) => e.includes("categoría duplicado"))).toBe(true);
    expect(errors.some((e) => e.includes("subcategoría duplicado"))).toBe(true);
    expect(errors.some((e) => e.includes("etiqueta duplicado"))).toBe(true);
  });

  it("detecta referencias a módulos, categorías, subcategorías y etiquetas inexistentes", () => {
    const data = cloneLibrary();
    const prompt = firstPrompt(data);
    prompt.module = "modulo-inexistente";
    prompt.categories = ["categoria-inexistente"];
    prompt.subcategories = ["subcategoria-inexistente"];
    prompt.tags = ["etiqueta-inexistente"];
    const errors = validateLibraryData(data);
    expect(errors.some((e) => e.includes('módulo inexistente "modulo-inexistente"'))).toBe(true);
    expect(errors.some((e) => e.includes('categoría inexistente "categoria-inexistente"'))).toBe(true);
    expect(
      errors.some((e) => e.includes('subcategoría inexistente "subcategoria-inexistente"')),
    ).toBe(true);
    expect(errors.some((e) => e.includes('etiqueta inexistente "etiqueta-inexistente"'))).toBe(true);
  });

  it("detecta categorías que no pertenecen al módulo del prompt", () => {
    const data = cloneLibrary();
    const prompt = firstPrompt(data);
    // "seo" pertenece al módulo "marketing", no a "software-development".
    prompt.categories = [...prompt.categories, "seo"];
    const errors = validateLibraryData(data);
    expect(
      errors.some(
        (e) =>
          e.includes(prompt.id) &&
          e.includes('"seo"') &&
          e.includes('pertenece al módulo "marketing"'),
      ),
    ).toBe(true);
  });

  it("detecta subcategorías que no pertenecen a las categorías del prompt", () => {
    const data = cloneLibrary();
    const prompt = firstPrompt(data);
    // "git" pertenece a "version-control"; forzamos una categoría distinta.
    prompt.categories = ["databases"];
    prompt.subcategories = ["git"];
    const errors = validateLibraryData(data);
    expect(
      errors.some(
        (e) => e.includes(prompt.id) && e.includes('la subcategoría "git"'),
      ),
    ).toBe(true);
  });

  it("detecta fechas con formato inválido o inexistentes", () => {
    const data = cloneLibrary();
    const prompt = firstPrompt(data);
    prompt.createdAt = "15/01/2026";
    prompt.updatedAt = "2026-02-30";
    const errors = validateLibraryData(data);
    expect(errors.filter((e) => e.includes("La fecha debe tener formato ISO válido")).length).toBe(2);
  });

  it("detecta idioma de prompt inválido", () => {
    const data = cloneLibrary();
    const prompt = firstPrompt(data);
    // @ts-expect-error forzamos un valor inválido para la prueba
    prompt.language = "fr";
    const errors = validateLibraryData(data);
    expect(errors.some((e) => e.includes('El idioma debe ser "es" o "en"'))).toBe(true);
  });

  it("detecta título, descripción y contenido vacíos", () => {
    const data = cloneLibrary();
    const prompt = firstPrompt(data);
    prompt.title = "";
    prompt.description = "";
    prompt.content = "";
    const errors = validateLibraryData(data);
    expect(errors.some((e) => e.includes("El título no puede estar vacío"))).toBe(true);
    expect(errors.some((e) => e.includes("La descripción no puede estar vacía"))).toBe(true);
    expect(
      errors.some((e) => e.includes("El contenido del prompt no puede estar vacío")),
    ).toBe(true);
  });

  it("detecta prompts sin categorías", () => {
    const data = cloneLibrary();
    firstPrompt(data).categories = [];
    const errors = validateLibraryData(data);
    expect(
      errors.some((e) =>
        e.includes("El prompt debe pertenecer al menos a una categoría"),
      ),
    ).toBe(true);
  });
});
