import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/src/components/breadcrumbs";
import { PromptCard } from "@/src/components/prompt-card";
import { Illustration } from "@/src/components/illustrations";
import { categories } from "@/src/data";
import { moduleUrl, promptUrl, promptsUrl } from "@/src/lib/query-params";
import {
  getCategoryForModule,
  getModuleById,
  getPromptsForCategory,
  getSubcategoriesForCategory,
  sortByUpdatedAtDesc,
} from "@/src/lib/taxonomy";

type PageProps = {
  params: Promise<{ module: string; category: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({
    module: category.module,
    category: category.id,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { module: moduleId, category: categoryId } = await params;
  const moduleData = getModuleById(moduleId);
  const category = getCategoryForModule(moduleId, categoryId);
  if (!moduleData || !category) {
    return { title: "Categoría no encontrada" };
  }
  return {
    title: category.label,
    description: category.description,
    openGraph: {
      title: category.label,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { module: moduleId, category: categoryId } = await params;
  const moduleData = getModuleById(moduleId);
  const category = getCategoryForModule(moduleId, categoryId);
  if (!moduleData || !category) notFound();

  const categorySubcategories = getSubcategoriesForCategory(category.id);
  const categoryPrompts = sortByUpdatedAtDesc(getPromptsForCategory(category.id));
  const explorerUrl = promptsUrl({
    module: moduleData.id,
    categories: [category.id],
  });
  const fromQuery = explorerUrl.split("?")[1] ?? "";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: moduleData.label, href: moduleUrl(moduleData.id) },
          { label: category.label },
        ]}
      />

      <header className="mt-6 flex max-w-4xl flex-col gap-5 rounded-3xl border border-brand-blue/10 bg-linear-to-br from-brand-violet-soft/70 via-white to-brand-turquoise-soft/60 p-6 sm:flex-row sm:items-center sm:p-8">
        <Illustration iconId={category.iconId} size="lg" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
            {category.label}
          </h1>
          <p className="mt-3 text-brand-slate">{category.description}</p>
          <p className="mt-4 text-sm text-brand-slate">
            {categoryPrompts.length} {categoryPrompts.length === 1 ? "prompt" : "prompts"} en esta categoría
            {" · "}
            <Link
              href={explorerUrl}
              className="inline-flex items-center gap-1 font-medium text-brand-violet underline-offset-4 hover:text-brand-coral hover:underline"
            >
              Ver en el explorador
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </p>
        </div>
      </header>

      {categorySubcategories.length > 0 && (
        <section aria-labelledby="subcategorias" className="mt-10">
          <h2 id="subcategorias" className="text-xl font-semibold tracking-tight text-brand-ink">
            Subcategorías
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {categorySubcategories.map((subcategory) => (
              <Link
                key={subcategory.id}
                href={promptsUrl({
                  module: moduleData.id,
                  categories: [category.id],
                  subcategories: [subcategory.id],
                })}
                className="rounded-full border border-brand-turquoise/30 bg-brand-turquoise-soft px-3 py-1.5 text-sm font-medium text-brand-ink transition-colors hover:border-brand-violet"
              >
                {subcategory.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="prompts-de-categoria" className="mt-10">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="prompts-de-categoria" className="text-xl font-semibold tracking-tight text-brand-ink">
            Prompts de {category.label}
          </h2>
          <span className="text-sm text-brand-slate">{categoryPrompts.length} disponibles</span>
        </div>
        {categoryPrompts.length > 0 ? (
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
        ) : (
          <p className="mt-4 rounded-2xl border border-brand-blue/10 bg-white p-5 text-sm text-brand-slate">
            Todavía no hay prompts en esta categoría. Explora otras categorías del módulo para encontrar contenido relacionado.
          </p>
        )}
      </section>
    </div>
  );
}
