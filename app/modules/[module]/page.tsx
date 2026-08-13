import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PromptCard } from "@/src/components/prompt-card";
import { CategoryCard } from "@/src/components/category-card";
import { Illustration } from "@/src/components/illustrations";
import { modules } from "@/src/data";
import { promptsUrl } from "@/src/lib/query-params";
import {
  getCategoriesForModule,
  getModuleById,
  getPromptsForModule,
  sortByUpdatedAtDesc,
} from "@/src/lib/taxonomy";

type PageProps = {
  params: Promise<{ module: string }>;
};

export function generateStaticParams() {
  return modules.map((module) => ({ module: module.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { module: moduleId } = await params;
  const moduleData = getModuleById(moduleId);
  if (!moduleData) {
    return { title: "Módulo no encontrado" };
  }
  return {
    title: moduleData.label,
    description: moduleData.description,
    openGraph: {
      title: moduleData.label,
      description: moduleData.description,
    },
  };
}

export default async function ModulePage({ params }: PageProps) {
  const { module: moduleId } = await params;
  const moduleData = getModuleById(moduleId);
  if (!moduleData) notFound();

  const moduleCategories = getCategoriesForModule(moduleData.id);
  const modulePrompts = sortByUpdatedAtDesc(getPromptsForModule(moduleData.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="flex max-w-4xl flex-col gap-6 rounded-3xl border border-brand-blue/10 bg-linear-to-br from-brand-violet-soft/70 via-white to-brand-turquoise-soft/60 p-6 sm:flex-row sm:items-center sm:p-8">
        <Illustration iconId={moduleData.iconId} size="lg" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
            {moduleData.label}
          </h1>
          <p className="mt-3 text-brand-slate">{moduleData.description}</p>
          <p className="mt-4 text-sm text-brand-slate">
          {modulePrompts.length}{" "}
          {modulePrompts.length === 1
            ? "prompt en este módulo"
            : "prompts en este módulo"}
          {" · "}
          <Link
            href={promptsUrl({ module: moduleData.id })}
            className="inline-flex items-center gap-1 font-medium text-brand-violet underline-offset-4 hover:text-brand-coral hover:underline"
          >
            Abrir en el explorador con este filtro aplicado
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          </p>
        </div>
      </header>

      <section aria-labelledby="categorias" className="mt-10">
        <h2
          id="categorias"
          className="text-xl font-semibold tracking-tight text-neutral-900"
        >
          Categorías
        </h2>
        <ul className="mt-4 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {moduleCategories.map((category) => (
            <li key={category.id}>
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="prompts-del-modulo" className="mt-10">
        <h2
          id="prompts-del-modulo"
          className="text-xl font-semibold tracking-tight text-neutral-900"
        >
          Prompts de {moduleData.label}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modulePrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </section>
    </div>
  );
}
