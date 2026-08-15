/**
 * Core domain models for the prompt library.
 *
 * Identifiers are stable, URL-safe, English strings (e.g. "software-development").
 * Labels are the Spanish names displayed in the UI.
 */

export type PromptLanguage = "es" | "en";
export type TagFacet = "technology" | "objective" | "format" | "context";

export type ModuleId = string;
export type CategoryId = string;
export type SubcategoryId = string;
export type TagId = string;
export type PromptId = string;

export type IllustrationId =
  | "module-software-development"
  | "module-artificial-intelligence"
  | "module-marketing"
  | "module-business"
  | "module-productivity"
  | "architecture-blocks"
  | "browser-window"
  | "server-stack"
  | "data-cylinder"
  | "integration-plugs"
  | "deploy-package"
  | "refactor-loop"
  | "project-analysis"
  | "globe-window"
  | "test-check"
  | "git-branches"
  | "gear-cycle"
  | "pipeline"
  | "chart-radar"
  | "database-cylinder"
  | "link-nodes"
  | "shield-code"
  | "document-code"
  | "speedometer"
  | "code-refresh"
  | "prompt-wand"
  | "chat-chip"
  | "robot-compass"
  | "document-retrieval"
  | "model-score"
  | "automation-spark"
  | "editorial-calendar"
  | "search-chart"
  | "mail-growth"
  | "social-bubbles"
  | "pencil-copy"
  | "market-loupe"
  | "roadmap-flag"
  | "analysis-chart"
  | "canvas-blocks"
  | "sales-funnel"
  | "operations-gears"
  | "kanban-check"
  | "build-measure-learn"
  | "organized-files"
  | "planning-calendar"
  | "research-loupe"
  | "decision-branch"
  | "communication-bubbles"
  | "learning-book";

export type Module = {
  id: ModuleId;
  /** Stable visual identifier rendered by the illustration registry. */
  iconId: IllustrationId;
  /** Spanish label shown in the UI. */
  label: string;
  /** Short Spanish description of the knowledge area. */
  description: string;
};

/** Optional visual grouping of a module's categories. */
export type ModuleNavigationGroup = {
  id: string;
  label: string;
  description: string;
  categories: CategoryId[];
};

/** Navigation configuration for a module. It is not part of Prompt. */
export type ModuleNavigation = {
  module: ModuleId;
  groups: ModuleNavigationGroup[];
};

export type Category = {
  id: CategoryId;
  /** Stable visual identifier rendered by the illustration registry. */
  iconId: IllustrationId;
  /** Spanish label shown in the UI. */
  label: string;
  /** Short Spanish explanation of the kind of work in this category. */
  description: string;
  /** Module this category belongs to. A category has exactly one module. */
  module: ModuleId;
};

export type Subcategory = {
  id: SubcategoryId;
  /** Optional visual identifier rendered by the illustration registry. */
  iconId?: IllustrationId;
  /** Spanish label shown in the UI. */
  label: string;
  /** Category this subcategory belongs to. A subcategory has exactly one category. */
  category: CategoryId;
  /** Optional short Spanish description shown on subcategory cards. */
  description?: string;
  /** Whether the subcategory has a dedicated landing page. */
  isNavigable?: boolean;
};

export type Tag = {
  id: TagId;
  /** Label shown in the UI (technology names keep their original spelling). */
  label: string;
  facet: TagFacet;
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
  /** Exactly one canonical category belonging to `module`. */
  category: CategoryId;
  /** Optional subcategories, all belonging to `category`. */
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
