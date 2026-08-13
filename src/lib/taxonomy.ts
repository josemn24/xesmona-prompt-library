import {
  allPrompts,
  categories,
  modules,
  moduleNavigation,
  subcategories,
  tags,
} from "@/src/data";
import type {
  Category,
  CategoryId,
  Module,
  ModuleId,
  ModuleNavigation,
  Prompt,
  Subcategory,
  SubcategoryId,
  Tag,
  TagId,
} from "@/src/data";

const moduleById = new Map<ModuleId, Module>(modules.map((m) => [m.id, m]));
const navigationByModule = new Map<ModuleId, ModuleNavigation>(
  moduleNavigation.map((navigation) => [navigation.module, navigation]),
);
const categoryById = new Map<CategoryId, Category>(
  categories.map((c) => [c.id, c]),
);
const subcategoryById = new Map<SubcategoryId, Subcategory>(
  subcategories.map((s) => [s.id, s]),
);
const tagById = new Map<TagId, Tag>(tags.map((t) => [t.id, t]));
const promptBySlug = new Map<string, Prompt>(allPrompts.map((p) => [p.slug, p]));

const categoriesByModule = new Map<ModuleId, Category[]>();
for (const category of categories) {
  const list = categoriesByModule.get(category.module) ?? [];
  list.push(category);
  categoriesByModule.set(category.module, list);
}

const subcategoriesByCategory = new Map<CategoryId, Subcategory[]>();
for (const subcategory of subcategories) {
  const list = subcategoriesByCategory.get(subcategory.category) ?? [];
  list.push(subcategory);
  subcategoriesByCategory.set(subcategory.category, list);
}

export function getModuleById(id: ModuleId): Module | undefined {
  return moduleById.get(id);
}

export function getModuleNavigation(moduleId: ModuleId): ModuleNavigation | undefined {
  return navigationByModule.get(moduleId);
}

export function getCategoryById(id: CategoryId): Category | undefined {
  return categoryById.get(id);
}

/** Returns a category only when it belongs to the requested module. */
export function getCategoryForModule(
  moduleId: ModuleId,
  categoryId: CategoryId,
): Category | undefined {
  const category = categoryById.get(categoryId);
  return category?.module === moduleId ? category : undefined;
}

export function getSubcategoryById(id: SubcategoryId): Subcategory | undefined {
  return subcategoryById.get(id);
}

export function getTagById(id: TagId): Tag | undefined {
  return tagById.get(id);
}

export function getPromptBySlug(slug: string): Prompt | undefined {
  return promptBySlug.get(slug);
}

/** Categories of a module, in declaration order. */
export function getCategoriesForModule(moduleId: ModuleId): Category[] {
  return categoriesByModule.get(moduleId) ?? [];
}

/** Subcategories of the given categories, in declaration order. */
export function getSubcategoriesForCategories(
  categoryIds: CategoryId[],
): Subcategory[] {
  const result: Subcategory[] = [];
  for (const categoryId of categoryIds) {
    result.push(...(subcategoriesByCategory.get(categoryId) ?? []));
  }
  return result;
}

/** Subcategories that belong to any category of the given module. */
export function getSubcategoriesForModule(moduleId: ModuleId): Subcategory[] {
  return getSubcategoriesForCategories(
    getCategoriesForModule(moduleId).map((c) => c.id),
  );
}

export function getPromptsForModule(moduleId: ModuleId): Prompt[] {
  return allPrompts.filter((prompt) => prompt.module === moduleId);
}

export function getPromptsForCategory(categoryId: CategoryId): Prompt[] {
  return allPrompts.filter((prompt) => prompt.category === categoryId);
}

export function countPromptsForModule(moduleId: ModuleId): number {
  return getPromptsForModule(moduleId).length;
}

export function countPromptsForCategory(categoryId: CategoryId): number {
  return getPromptsForCategory(categoryId).length;
}

export function getSubcategoriesForCategory(
  categoryId: CategoryId,
): Subcategory[] {
  return subcategoriesByCategory.get(categoryId) ?? [];
}

export function getRelatedPrompts(prompt: Prompt, limit = 6): Prompt[] {
  const promptSubcategories = new Set(prompt.subcategories ?? []);
  return allPrompts
    .filter((candidate) => candidate.id !== prompt.id)
    .map((candidate) => {
      const sharedSubcategories = (candidate.subcategories ?? []).filter((id) =>
        promptSubcategories.has(id),
      ).length;
      const sharedTags = candidate.tags.filter((id) => prompt.tags.includes(id)).length;
      const score =
        sharedSubcategories * 100 +
        (candidate.category === prompt.category ? 10 : 0) +
        sharedTags;
      return { candidate, score };
    })
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.candidate.updatedAt.localeCompare(a.candidate.updatedAt),
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

/** Label of the prompt's canonical category, resolved against the taxonomy. */
export function getCategoryLabels(prompt: Prompt): string[] {
  const label = categoryById.get(prompt.category)?.label;
  return label === undefined ? [] : [label];
}

export function getSubcategoryLabels(prompt: Prompt): string[] {
  return (prompt.subcategories ?? [])
    .map((id) => subcategoryById.get(id)?.label)
    .filter((label): label is string => label !== undefined);
}

export function getTagLabels(prompt: Prompt): string[] {
  return prompt.tags
    .map((id) => tagById.get(id)?.label)
    .filter((label): label is string => label !== undefined);
}

export function getModuleLabel(prompt: Prompt): string {
  return moduleById.get(prompt.module)?.label ?? prompt.module;
}

/** Most recently updated prompts first. */
export function sortByUpdatedAtDesc(prompts: Prompt[]): Prompt[] {
  return [...prompts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
