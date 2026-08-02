import Fuse, { type IFuseOptions } from "fuse.js";
import type { Prompt } from "@/src/data";
import {
  getCategoryLabels,
  getSubcategoryLabels,
  getTagLabels,
} from "@/src/lib/taxonomy";
import { normalizeText } from "@/src/lib/text";

/**
 * A prompt flattened into normalized, searchable text. References to
 * taxonomy items (categories, subcategories, tags) are transformed into
 * their human-readable labels before indexing.
 */
export type SearchablePrompt = {
  prompt: Prompt;
  title: string;
  tags: string;
  description: string;
  categories: string;
  subcategories: string;
  useCases: string;
  content: string;
};

export function toSearchablePrompt(prompt: Prompt): SearchablePrompt {
  return {
    prompt,
    title: normalizeText(prompt.title),
    tags: normalizeText(getTagLabels(prompt).join(" ")),
    description: normalizeText(prompt.description),
    categories: normalizeText(getCategoryLabels(prompt).join(" ")),
    subcategories: normalizeText(getSubcategoryLabels(prompt).join(" ")),
    useCases: normalizeText((prompt.useCases ?? []).join(" ")),
    content: normalizeText(prompt.content),
  };
}

/**
 * Field weights, from highest to lowest relevance:
 * title > tags > description > categories > subcategories > use cases > content.
 */
const FUSE_KEYS: { name: keyof Omit<SearchablePrompt, "prompt">; weight: number }[] = [
  { name: "title", weight: 0.3 },
  { name: "tags", weight: 0.2 },
  { name: "description", weight: 0.2 },
  { name: "categories", weight: 0.12 },
  { name: "subcategories", weight: 0.08 },
  { name: "useCases", weight: 0.05 },
  { name: "content", weight: 0.03 },
];

const FUSE_OPTIONS: IFuseOptions<SearchablePrompt> = {
  keys: FUSE_KEYS,
  // Tolerant enough for minor typos ("arquitecura", "typescrpt"),
  // strict enough to avoid irrelevant matches.
  threshold: 0.35,
  ignoreLocation: true,
  includeScore: true,
  minMatchCharLength: 2,
};

export type PromptSearchResult = {
  prompt: Prompt;
  score: number;
};

/**
 * Searches the given prompts with fuzzy matching and returns them ordered
 * by relevance (best match first). The query is normalized so search is
 * case-insensitive and accent-insensitive.
 */
export function searchPrompts(
  prompts: Prompt[],
  query: string,
): PromptSearchResult[] {
  const normalizedQuery = normalizeText(query);
  if (normalizedQuery.length === 0) {
    return prompts.map((prompt) => ({ prompt, score: 0 }));
  }
  const fuse = new Fuse(prompts.map(toSearchablePrompt), FUSE_OPTIONS);
  return fuse
    .search(normalizedQuery)
    .map((result) => ({
      prompt: result.item.prompt,
      score: result.score ?? 1,
    }));
}
