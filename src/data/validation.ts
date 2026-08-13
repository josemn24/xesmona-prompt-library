import type { z } from "zod";
import { libraryData, type LibraryData } from "./index";
import {
  categorySchema,
  moduleSchema,
  moduleNavigationGroupSchema,
  moduleNavigationSchema,
  promptSchema,
  subcategorySchema,
  tagSchema,
} from "./schema";
import { idSchema } from "./schema";

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
  for (const navigation of data.moduleNavigation) {
    const result = moduleNavigationSchema.safeParse(navigation);
    if (!result.success) {
      errors.push(
        ...formatZodIssues(
          `Navegación del módulo "${navigation.module}"`,
          result.error.issues,
        ),
      );
    }
    for (const group of navigation.groups) {
      const groupResult = moduleNavigationGroupSchema.safeParse(group);
      if (!groupResult.success) {
        errors.push(
          ...formatZodIssues(
            `Grupo de navegación "${group.id}"`,
            groupResult.error.issues,
          ),
        );
      }
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
  for (const id of findDuplicates(data.moduleNavigation.map((navigation) => navigation.module))) {
    errors.push(`Configuración de navegación duplicada para el módulo: "${id}".`);
  }
  for (const id of findDuplicates(data.categoryAliases.map((alias) => alias.legacyId))) {
    errors.push(`Alias de categoría duplicado: "${id}".`);
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
  const referencedSubcategoryIds = new Set<string>();

  for (const alias of data.categoryAliases) {
    const legacyResult = idSchema.safeParse(alias.legacyId);
    if (!legacyResult.success) {
      errors.push(
        ...formatZodIssues(
          `Alias de categoría "${alias.legacyId}"`,
          legacyResult.error.issues,
        ),
      );
    }
    if (alias.canonicalIds.length === 0) {
      errors.push(
        `Alias de categoría "${alias.legacyId}": debe apuntar al menos a una categoría canónica.`,
      );
    }
    for (const canonicalId of alias.canonicalIds) {
      if (!categoryIds.has(canonicalId)) {
        errors.push(
          `Alias de categoría "${alias.legacyId}": referencia a la categoría inexistente "${canonicalId}".`,
        );
      }
    }
  }

  const legacyCategoryIds = new Set(
    data.categoryAliases.map((alias) => alias.legacyId),
  );
  for (const category of data.categories) {
    if (legacyCategoryIds.has(category.id)) {
      errors.push(
        `Categoría "${category.id}": el ID antiguo no puede aparecer en la taxonomía canónica.`,
      );
    }
  }
  for (const navigation of data.moduleNavigation) {
    if (!moduleIds.has(navigation.module)) {
      errors.push(
        `Navegación del módulo "${navigation.module}": referencia al módulo inexistente.`,
      );
      continue;
    }

    const moduleCategoryIds = new Set(
      data.categories
        .filter((category) => category.module === navigation.module)
        .map((category) => category.id),
    );
    const groupedCategoryIds = new Set<string>();
    const groupIds = findDuplicates(navigation.groups.map((group) => group.id));
    for (const groupId of groupIds) {
      errors.push(
        `Grupo de navegación duplicado en el módulo "${navigation.module}": "${groupId}".`,
      );
    }

    for (const group of navigation.groups) {
      const categoryIdsInGroup = new Set<string>();
      for (const categoryId of group.categories) {
        if (categoryIdsInGroup.has(categoryId)) {
          errors.push(
            `Grupo de navegación "${group.id}": categoría duplicada "${categoryId}".`,
          );
        }
        categoryIdsInGroup.add(categoryId);

        const category = categoryById.get(categoryId);
        if (!category) {
          errors.push(
            `Grupo de navegación "${group.id}": referencia a la categoría inexistente "${categoryId}".`,
          );
          continue;
        }
        if (category.module !== navigation.module) {
          errors.push(
            `Grupo de navegación "${group.id}": la categoría "${categoryId}" pertenece al módulo "${category.module}", no a "${navigation.module}".`,
          );
        }
        if (groupedCategoryIds.has(categoryId)) {
          errors.push(
            `Navegación del módulo "${navigation.module}": la categoría "${categoryId}" aparece en más de un grupo.`,
          );
        }
        groupedCategoryIds.add(categoryId);
      }
    }

    for (const categoryId of moduleCategoryIds) {
      if (!groupedCategoryIds.has(categoryId)) {
        errors.push(
          `Navegación del módulo "${navigation.module}": la categoría "${categoryId}" no pertenece a ningún grupo.`,
        );
      }
    }
  }

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

    const category = categoryById.get(prompt.category);
    if (!category) {
      errors.push(
        `${label}: referencia a la categoría inexistente "${prompt.category}".`,
      );
    } else if (category.module !== prompt.module) {
      errors.push(
        `${label}: la categoría "${prompt.category}" pertenece al módulo "${category.module}", no al módulo "${prompt.module}".`,
      );
    }

    for (const subcategoryId of prompt.subcategories ?? []) {
      referencedSubcategoryIds.add(subcategoryId);
      const subcategory = subcategoryById.get(subcategoryId);
      if (!subcategory) {
        errors.push(
          `${label}: referencia a la subcategoría inexistente "${subcategoryId}".`,
        );
        continue;
      }
      if (subcategory.category !== prompt.category) {
        errors.push(
          `${label}: la subcategoría "${subcategoryId}" pertenece a la categoría "${subcategory.category}", no a la categoría principal "${prompt.category}".`,
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

  for (const subcategory of data.subcategories) {
    if (!referencedSubcategoryIds.has(subcategory.id)) {
      errors.push(
        `Subcategoría "${subcategory.id}": no está utilizada por ningún prompt.`,
      );
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
