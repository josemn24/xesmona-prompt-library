import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/src/components/breadcrumbs";
import { PromptCard } from "@/src/components/prompt-card";
import { subcategories } from "@/src/data";
import { categoryUrl, moduleUrl, promptUrl, promptsUrl } from "@/src/lib/query-params";
import {
  countPromptsForSubcategory,
  getCategoryById,
  getCategoryForModule,
  getModuleById,
  getPromptsForSubcategory,
  getSubcategoryById,
  isNavigableSubcategory,
  sortByUpdatedAtDesc,
} from "@/src/lib/taxonomy";

type PageProps = {
  params: Promise<{ module: string; category: string; subcategory: string }>;
};

function getNavigableSubcategory(
  moduleId: string,
  categoryId: string,
  subcategoryId: string,
) {
  const moduleData = getModuleById(moduleId);
  const category = getCategoryForModule(moduleId, categoryId);
  const subcategory = getSubcategoryById(subcategoryId);
  if (
    !moduleData ||
    !category ||
    !subcategory ||
    subcategory.category !== category.id ||
    !isNavigableSubcategory(subcategory.id)
  ) {
    return undefined;
  }
  return { moduleData, category, subcategory };
}

export function generateStaticParams() {
  return subcategories
    .filter(
      (subcategory) =>
        subcategory.isNavigable && countPromptsForSubcategory(subcategory.id) > 0,
    )
    .map((subcategory) => {
      const category = getSubcategoryById(subcategory.id);
      if (!category) return undefined;
      const parentCategory = getCategoryById(category.category);
      if (!parentCategory) return undefined;
      return {
        module: parentCategory.module,
        category: parentCategory.id,
        subcategory: subcategory.id,
      };
    })
    .filter(
      (
        params,
      ): params is {
        module: string;
        category: string;
        subcategory: string;
      } => params !== undefined,
    );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { module, category, subcategory } = await params;
  const resolved = getNavigableSubcategory(module, category, subcategory);
  if (!resolved) return { title: "Subcategoría no encontrada" };

  return {
    title: `${resolved.subcategory.label} · ${resolved.category.label}`,
    description: `Prompts de ${resolved.subcategory.label.toLowerCase()} dentro de ${resolved.category.label.toLowerCase()}.`,
    openGraph: {
      title: `${resolved.subcategory.label} · ${resolved.category.label}`,
      description: `Prompts de ${resolved.subcategory.label.toLowerCase()} dentro de ${resolved.category.label.toLowerCase()}.`,
    },
  };
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { module, category, subcategory } = await params;
  const resolved = getNavigableSubcategory(module, category, subcategory);
  if (!resolved) notFound();

  const categoryPrompts = sortByUpdatedAtDesc(
    getPromptsForSubcategory(resolved.subcategory.id),
  );
  const explorerUrl = promptsUrl({
    module: resolved.moduleData.id,
    categories: [resolved.category.id],
    subcategories: [resolved.subcategory.id],
  });
  const fromQuery = explorerUrl.split("?")[1] ?? "";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          {
            label: resolved.moduleData.label,
            href: moduleUrl(resolved.moduleData.id),
          },
          {
            label: resolved.category.label,
            href: categoryUrl(resolved.moduleData.id, resolved.category.id),
          },
          { label: resolved.subcategory.label },
        ]}
      />

      <header className="mt-6 max-w-4xl rounded-3xl border border-brand-blue/10 bg-linear-to-br from-brand-violet-soft/70 via-white to-brand-turquoise-soft/60 p-6 sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
          {resolved.subcategory.label}
        </h1>
        <p className="mt-3 text-brand-slate">{resolved.category.label}</p>
        <p className="mt-4 text-sm text-brand-slate">
          {categoryPrompts.length} {categoryPrompts.length === 1 ? "prompt" : "prompts"} en esta subcategoría
          {" · "}
          <Link
            href={explorerUrl}
            className="inline-flex items-center gap-1 font-medium text-brand-violet underline-offset-4 hover:text-brand-coral hover:underline"
          >
            Ver en el explorador
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </p>
      </header>

      <section aria-labelledby="prompts-de-subcategoria" className="mt-10">
        <div className="flex items-baseline justify-between gap-4">
          <h2
            id="prompts-de-subcategoria"
            className="text-xl font-semibold tracking-tight text-brand-ink"
          >
            Prompts de {resolved.subcategory.label}
          </h2>
          <span className="text-sm text-brand-slate">
            {categoryPrompts.length} disponibles
          </span>
        </div>
        <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {categoryPrompts.map((prompt) => (
            <li key={prompt.id}>
              <PromptCard
                prompt={prompt}
                href={promptUrl(prompt.slug, fromQuery)}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
