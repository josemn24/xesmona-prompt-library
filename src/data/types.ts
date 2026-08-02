/**
 * Core domain models for the prompt library.
 *
 * Identifiers are stable, URL-safe, English strings (e.g. "software-development").
 * Labels are the Spanish names displayed in the UI.
 */

export type PromptLanguage = "es" | "en";

export type ModuleId = string;
export type CategoryId = string;
export type SubcategoryId = string;
export type TagId = string;
export type PromptId = string;

export type Module = {
  id: ModuleId;
  /** Spanish label shown in the UI. */
  label: string;
  /** Short Spanish description of the knowledge area. */
  description: string;
};

export type Category = {
  id: CategoryId;
  /** Spanish label shown in the UI. */
  label: string;
  /** Module this category belongs to. A category has exactly one module. */
  module: ModuleId;
};

export type Subcategory = {
  id: SubcategoryId;
  /** Spanish label shown in the UI. */
  label: string;
  /** Category this subcategory belongs to. A subcategory has exactly one category. */
  category: CategoryId;
};

export type Tag = {
  id: TagId;
  /** Label shown in the UI (technology names keep their original spelling). */
  label: string;
};

export type Prompt = {
  id: PromptId;
  /** Unique, URL-safe identifier used in /prompts/[slug]. */
  slug: string;
  title: string;
  description: string;
  /** Full prompt text. May contain {{placeholders}} shown as plain text. */
  content: string;
  language: PromptLanguage;

  /** Exactly one module. */
  module: ModuleId;
  /** One or more categories, all belonging to `module`. */
  categories: CategoryId[];
  /** Optional subcategories, each belonging to one of `categories`. */
  subcategories?: SubcategoryId[];
  /** Zero or more cross-cutting tags. */
  tags: TagId[];

  useCases?: string[];
  notes?: string;
  example?: string;

  /** ISO date: YYYY-MM-DD. */
  createdAt: string;
  /** ISO date: YYYY-MM-DD. */
  updatedAt: string;
};
