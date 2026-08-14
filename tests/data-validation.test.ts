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

  it("todas las categorías tienen una descripción editorial", () => {
    expect(libraryData.categories.every((category) => category.description.trim().length > 0)).toBe(true);
  });

  it("conserva los 64 prompts y sus identificadores únicos", () => {
    expect(libraryData.prompts).toHaveLength(64);
    expect(new Set(libraryData.prompts.map((prompt) => prompt.id)).size).toBe(64);
    expect(new Set(libraryData.prompts.map((prompt) => prompt.slug)).size).toBe(64);
    expect(libraryData.prompts.every((prompt) => prompt.category.length > 0)).toBe(true);
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
    prompt.category = "categoria-inexistente";
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
    // "audience-and-market" pertenece al módulo "marketing", no a "software-development".
    prompt.category = "audience-and-market";
    const errors = validateLibraryData(data);
    expect(
      errors.some(
        (e) =>
          e.includes(prompt.id) &&
          e.includes('"audience-and-market"') &&
          e.includes('pertenece al módulo "marketing"'),
      ),
    ).toBe(true);
  });

  it("detecta subcategorías que no pertenecen a las categorías del prompt", () => {
    const data = cloneLibrary();
    const prompt = firstPrompt(data);
    // "git" pertenece a "project-setup-and-workflow"; forzamos una categoría distinta.
    prompt.category = "data";
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

  it("detecta una faceta de etiqueta inválida", () => {
    const data = cloneLibrary();
    const tag = data.tags[0];
    if (!tag) throw new Error("Taxonomía vacía");
    // @ts-expect-error forzamos un valor inválido para la prueba
    tag.facet = "other";
    const errors = validateLibraryData(data);
    expect(errors.some((e) => e.includes("Invalid option"))).toBe(true);
  });

  it("detecta aliases que apuntan a categorías inexistentes", () => {
    const data = cloneLibrary();
    const alias = data.categoryAliases[0];
    if (!alias) throw new Error("No hay aliases");
    alias.canonicalIds = ["categoria-inexistente"];
    const errors = validateLibraryData(data);
    expect(
      errors.some((e) => e.includes('referencia a la categoría inexistente "categoria-inexistente"')),
    ).toBe(true);
  });

  it("detecta categorías de otro módulo dentro de un grupo de navegación", () => {
    const data = cloneLibrary();
    const navigation = data.moduleNavigation[0];
    const group = navigation?.groups[0];
    if (!group) throw new Error("No hay grupos de navegación");
    group.categories.push("audience-and-market");
    const errors = validateLibraryData(data);
    expect(
      errors.some((e) =>
        e.includes('la categoría "audience-and-market" pertenece al módulo "marketing"'),
      ),
    ).toBe(true);
  });

  it("detecta categorías de un módulo que no están agrupadas", () => {
    const data = cloneLibrary();
    const navigation = data.moduleNavigation[0];
    const group = navigation?.groups[0];
    if (!group) throw new Error("No hay grupos de navegación");
    group.categories = group.categories.filter(
      (categoryId) => categoryId !== "discovery-and-scope",
    );
    const errors = validateLibraryData(data);
    expect(
      errors.some((e) =>
        e.includes('la categoría "discovery-and-scope" no pertenece a ningún grupo'),
      ),
    ).toBe(true);
  });

  it("detecta subcategorías materializadas sin prompts", () => {
    const data = cloneLibrary();
    data.subcategories.push({
      id: "unused-subcategory",
      label: "Sin uso",
      category: "planning",
    });
    const errors = validateLibraryData(data);
    expect(errors.some((e) => e.includes('Subcategoría "unused-subcategory"'))).toBe(true);
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

  it("detecta prompts sin categoría", () => {
    const data = cloneLibrary();
    firstPrompt(data).category = "";
    const errors = validateLibraryData(data);
    expect(
      errors.some((e) =>
        e.includes("El identificador no puede estar vacío"),
      ),
    ).toBe(true);
  });
});
