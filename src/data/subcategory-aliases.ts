import type { SubcategoryId, TagId } from "./types";

export type SubcategoryAlias = {
  legacyId: SubcategoryId;
  canonicalId: SubcategoryId;
  tagIds?: TagId[];
};

/**
 * Compatibility mappings for the former tool-specific subcategories of the
 * software setup category. The canonical taxonomy is intentionally broader;
 * tags preserve the technology-specific part of the old filter when useful.
 */
export const subcategoryAliases: SubcategoryAlias[] = [
  { legacyId: "local-development", canonicalId: "local-environment" },
  { legacyId: "environment-configuration", canonicalId: "local-environment" },
  {
    legacyId: "supabase-migrations",
    canonicalId: "database",
    tagIds: ["supabase"],
  },
  {
    legacyId: "supabase-schema-design",
    canonicalId: "database",
    tagIds: ["supabase"],
  },
  {
    legacyId: "supabase-seed-data",
    canonicalId: "database",
    tagIds: ["supabase"],
  },
  {
    legacyId: "shadcn-presets",
    canonicalId: "frontend-and-components",
    tagIds: ["shadcn"],
  },
  {
    legacyId: "shadcn-theming",
    canonicalId: "frontend-and-components",
    tagIds: ["shadcn"],
  },
  {
    legacyId: "shadcn-components",
    canonicalId: "frontend-and-components",
    tagIds: ["shadcn"],
  },
  {
    legacyId: "shadcn-component-gallery",
    canonicalId: "frontend-and-components",
    tagIds: ["shadcn"],
  },
  {
    legacyId: "storybook",
    canonicalId: "frontend-and-components",
    tagIds: ["storybook"],
  },
  {
    legacyId: "commits",
    canonicalId: "version-control-and-collaboration",
    tagIds: ["git"],
  },
  {
    legacyId: "git",
    canonicalId: "version-control-and-collaboration",
    tagIds: ["git"],
  },
];

const aliasesById = new Map(
  subcategoryAliases.map((alias) => [alias.legacyId, alias]),
);

export function resolveSubcategoryAlias(subcategoryId: SubcategoryId): SubcategoryAlias {
  return (
    aliasesById.get(subcategoryId) ?? {
      legacyId: subcategoryId,
      canonicalId: subcategoryId,
    }
  );
}
