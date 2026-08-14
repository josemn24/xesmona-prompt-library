import Link from "next/link";
import type { Subcategory } from "@/src/data";
import { Illustration } from "@/src/components/illustrations";
import { countPromptsForSubcategory } from "@/src/lib/taxonomy";
import { promptsUrl, subcategoryUrl } from "@/src/lib/query-params";

type SubcategoryCardProps = {
  moduleId: string;
  categoryId: string;
  subcategory: Subcategory;
};

export function SubcategoryCard({
  moduleId,
  categoryId,
  subcategory,
}: SubcategoryCardProps) {
  const count = countPromptsForSubcategory(subcategory.id);
  const href = subcategory.isNavigable
    ? subcategoryUrl(moduleId, categoryId, subcategory.id)
    : promptsUrl({
        module: moduleId,
        categories: [categoryId],
        subcategories: [subcategory.id],
      });

  return (
    <Link
      href={href}
      className="group relative flex min-h-44 flex-col justify-between overflow-hidden rounded-3xl border border-brand-blue/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-violet/30 hover:shadow-lg"
    >
      <span
        aria-hidden
        className="absolute -right-8 -top-8 size-28 rounded-full bg-brand-turquoise-soft/70 transition-transform duration-300 group-hover:scale-125"
      />
      <span className="relative flex items-start justify-between gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand-orange-soft via-brand-yellow-soft to-brand-turquoise-soft">
          {subcategory.iconId ? (
            <Illustration iconId={subcategory.iconId} size="sm" />
          ) : (
            <span className="text-xl font-semibold text-brand-violet" aria-hidden>
              •
            </span>
          )}
        </span>
        <span className="mt-1 rounded-full border border-brand-blue/10 bg-white/80 px-2.5 py-1 text-xs font-semibold text-brand-slate">
          {count} {count === 1 ? "prompt" : "prompts"}
        </span>
      </span>
      <span className="relative mt-5 block min-w-0">
        <span className="block text-base font-semibold text-brand-ink group-hover:text-brand-violet">
          {subcategory.label}
        </span>
        {subcategory.description && (
          <span className="mt-2 block text-sm leading-5 text-brand-slate">
            {subcategory.description}
          </span>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-violet">
          {subcategory.isNavigable ? "Explorar subcategoría" : "Ver prompts"}
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </span>
    </Link>
  );
}
