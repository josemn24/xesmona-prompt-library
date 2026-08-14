import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/src/components/breadcrumbs";
import { SubcategoryCard } from "@/src/components/subcategory-card";
import { Illustration } from "@/src/components/illustrations";
import { categories } from "@/src/data";
import { moduleUrl, promptsUrl } from "@/src/lib/query-params";
import {
  countPromptsForCategory,
  getCategoryForModule,
  getModuleById,
  getSubcategoriesForCategory,
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
  const categoryPromptCount = countPromptsForCategory(category.id);
  const explorerUrl = promptsUrl({
    module: moduleData.id,
    categories: [category.id],
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
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
            {categoryPromptCount} {categoryPromptCount === 1 ? "prompt" : "prompts"} en esta categoría
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
          <ul className="mt-4 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {categorySubcategories.map((subcategory) => (
              <li
                key={subcategory.id}
              >
                <SubcategoryCard
                  moduleId={moduleData.id}
                  categoryId={category.id}
                  subcategory={subcategory}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

    </div>
  );
}
