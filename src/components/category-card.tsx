import Link from "next/link";
import type { Category } from "@/src/data";
import { Illustration } from "@/src/components/illustrations";
import { countPromptsForCategory } from "@/src/lib/taxonomy";
import { categoryUrl } from "@/src/lib/query-params";

export function CategoryCard({ category }: { category: Category }) {
  const count = countPromptsForCategory(category.id);

  return (
    <Link
      href={categoryUrl(category.module, category.id)}
      className="group flex items-center gap-3 rounded-2xl border border-brand-blue/10 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-coral/40 hover:shadow-md"
    >
      <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-orange-soft via-brand-yellow-soft to-brand-turquoise-soft">
        <Illustration iconId={category.iconId} size="sm" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-snug text-brand-ink group-hover:text-brand-violet">
          {category.label}
        </span>
        <span className="mt-1 block text-xs text-brand-slate">
          {count} {count === 1 ? "prompt" : "prompts"}
        </span>
      </span>
    </Link>
  );
}
