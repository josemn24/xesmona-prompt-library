import type { z } from "zod";
import { libraryData, type LibraryData } from "./index";
import {
  categorySchema,
  moduleSchema,
  promptSchema,
  subcategorySchema,
  tagSchema,
} from "./schema";

function formatZodIssues(
  context: string,
  issues: z.core.$ZodIssue[],
): string[] {
  return issues.map((issue) => {
    const path = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
    return `${context} — ${path}${issue.message}`;
  });
}

function findDuplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

/**
 * Validates the whole library and returns a list of human-readable errors.
 * An empty array means the data is valid. Kept as a pure function so it is
 * easy to test with mutated fixtures.
 */
export function validateLibraryData(data: LibraryData): string[] {
  const errors: string[] = [];

  // 1. Field-level validation with Zod.
  for (const moduleItem of data.modules) {
    const result = moduleSchema.safeParse(moduleItem);
    if (!result.success) {
      errors.push(
        ...formatZodIssues(`Módulo "${moduleItem.id}"`, result.error.issues),
      );
    }
  }
  for (const category of data.categories) {
    const result = categorySchema.safeParse(category);
    if (!result.success) {
      errors.push(...formatZodIssues(`Categoría "${category.id}"`, result.error.issues));
    }
  }
  for (const subcategory of data.subcategories) {
    const result = subcategorySchema.safeParse(subcategory);
    if (!result.success) {
      errors.push(
        ...formatZodIssues(`Subcategoría "${subcategory.id}"`, result.error.issues),
      );
    }
  }
  for (const tag of data.tags) {
    const result = tagSchema.safeParse(tag);
    if (!result.success) {
      errors.push(...formatZodIssues(`Etiqueta "${tag.id}"`, result.error.issues));
    }
  }
  for (const prompt of data.prompts) {
    const result = promptSchema.safeParse(prompt);
    if (!result.success) {
      errors.push(
        ...formatZodIssues(
          `Prompt "${prompt.id}" (slug: "${prompt.slug}")`,
          result.error.issues,
        ),
      );
    }
  }

  // 2. Duplicate identifiers.
  for (const id of findDuplicates(data.modules.map((m) => m.id))) {
    errors.push(`Identificador de módulo duplicado: "${id}".`);
  }
  for (const id of findDuplicates(data.categories.map((c) => c.id))) {
    errors.push(`Identificador de categoría duplicado: "${id}".`);
  }
  for (const id of findDuplicates(data.subcategories.map((s) => s.id))) {
    errors.push(`Identificador de subcategoría duplicado: "${id}".`);
  }
  for (const id of findDuplicates(data.tags.map((t) => t.id))) {
    errors.push(`Identificador de etiqueta duplicado: "${id}".`);
  }
  for (const id of findDuplicates(data.prompts.map((p) => p.id))) {
    errors.push(`Identificador de prompt duplicado: "${id}".`);
  }
  for (const slug of findDuplicates(data.prompts.map((p) => p.slug))) {
    errors.push(`Slug de prompt duplicado: "${slug}".`);
  }

  // 3. Referential integrity of the taxonomy itself.
  const moduleIds = new Set(data.modules.map((m) => m.id));
  const categoryIds = new Set(data.categories.map((c) => c.id));
  const tagIds = new Set(data.tags.map((t) => t.id));
  const categoryById = new Map(data.categories.map((c) => [c.id, c]));
  const subcategoryById = new Map(data.subcategories.map((s) => [s.id, s]));

  for (const category of data.categories) {
    if (!moduleIds.has(category.module)) {
      errors.push(
        `Categoría "${category.id}": referencia al módulo inexistente "${category.module}".`,
      );
    }
  }
  for (const subcategory of data.subcategories) {
    if (!categoryIds.has(subcategory.category)) {
      errors.push(
        `Subcategoría "${subcategory.id}": referencia a la categoría inexistente "${subcategory.category}".`,
      );
    }
  }

  // 4. Referential integrity of prompts.
  for (const prompt of data.prompts) {
    const label = `Prompt "${prompt.id}" (slug: "${prompt.slug}")`;

    if (!moduleIds.has(prompt.module)) {
      errors.push(
        `${label}: referencia al módulo inexistente "${prompt.module}".`,
      );
    }

    for (const categoryId of prompt.categories) {
      const category = categoryById.get(categoryId);
      if (!category) {
        errors.push(
          `${label}: referencia a la categoría inexistente "${categoryId}".`,
        );
        continue;
      }
      if (category.module !== prompt.module) {
        errors.push(
          `${label}: la categoría "${categoryId}" pertenece al módulo "${category.module}", no al módulo "${prompt.module}".`,
        );
      }
    }

    for (const subcategoryId of prompt.subcategories ?? []) {
      const subcategory = subcategoryById.get(subcategoryId);
      if (!subcategory) {
        errors.push(
          `${label}: referencia a la subcategoría inexistente "${subcategoryId}".`,
        );
        continue;
      }
      if (!prompt.categories.includes(subcategory.category)) {
        errors.push(
          `${label}: la subcategoría "${subcategoryId}" pertenece a la categoría "${subcategory.category}", que no está entre las categorías del prompt.`,
        );
      }
    }

    for (const tagId of prompt.tags) {
      if (!tagIds.has(tagId)) {
        errors.push(
          `${label}: referencia a la etiqueta inexistente "${tagId}".`,
        );
      }
    }
  }

  return errors;
}

/**
 * Throws an error listing every problem found in the static data.
 * Called during development and build so invalid data fails fast.
 */
export function validateLibrary(data: LibraryData = libraryData): void {
  const errors = validateLibraryData(data);
  if (errors.length > 0) {
    throw new Error(
      `Los datos de la biblioteca de prompts no son válidos (${errors.length} problema(s)):\n` +
        errors.map((error) => `  - ${error}`).join("\n"),
    );
  }
}
