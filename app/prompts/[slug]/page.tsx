import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BackToPromptsLink } from "@/src/components/back-to-prompts-link";
import { LanguageBadge } from "@/src/components/badges";
import { CopyPromptButton } from "@/src/components/copy-prompt-button";
import { PromptContent } from "@/src/components/prompt-content";
import { allPrompts } from "@/src/data";
import { formatDate } from "@/src/lib/i18n";
import { promptsUrl } from "@/src/lib/query-params";
import {
  getCategoryById,
  getModuleById,
  getPromptBySlug,
  getSubcategoryById,
  getTagById,
} from "@/src/lib/taxonomy";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allPrompts.map((prompt) => ({ slug: prompt.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) {
    return { title: "Prompt no encontrado" };
  }
  return {
    title: prompt.title,
    description: prompt.description,
    openGraph: {
      title: prompt.title,
      description: prompt.description,
      type: "article",
    },
  };
}

const metadataLabelClass = "text-xs font-semibold uppercase tracking-wide text-brand-slate";

export default async function PromptDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) notFound();

  const promptModule = getModuleById(prompt.module);
  const promptCategories = prompt.categories
    .map((id) => getCategoryById(id))
    .filter((category) => category !== undefined);
  const promptSubcategories = (prompt.subcategories ?? [])
    .map((id) => getSubcategoryById(id))
    .filter((subcategory) => subcategory !== undefined);
  const promptTags = prompt.tags
    .map((id) => getTagById(id))
    .filter((tag) => tag !== undefined);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Suspense
        fallback={
          <span className="text-sm text-brand-slate">
            Volver a todos los prompts
          </span>
        }
      >
        <BackToPromptsLink />
      </Suspense>

      <article className="mt-6">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
            {prompt.title}
          </h1>
          <p className="mt-3 text-lg text-brand-slate">{prompt.description}</p>
        </header>

        <dl className="mt-6 grid gap-x-8 gap-y-5 rounded-2xl border border-brand-blue/10 bg-white p-5 shadow-sm sm:grid-cols-2">
          <div>
            <dt className={metadataLabelClass}>Módulo</dt>
            <dd className="mt-1 text-sm">
              {promptModule ? (
                <Link
                  href={`/modules/${promptModule.id}`}
                  className="font-medium text-brand-violet underline-offset-4 hover:text-brand-coral hover:underline"
                >
                  {promptModule.label}
                </Link>
              ) : (
                prompt.module
              )}
            </dd>
          </div>
          <div>
            <dt className={metadataLabelClass}>Idioma</dt>
            <dd className="mt-1">
              <LanguageBadge language={prompt.language} />
            </dd>
          </div>
          <div>
            <dt className={metadataLabelClass}>Categorías</dt>
            <dd className="mt-1 flex flex-wrap gap-1.5">
              {promptCategories.map((category) => (
                <Link
                  key={category.id}
                  href={promptsUrl({
                    module: prompt.module,
                    categories: [category.id],
                  })}
                  className="inline-flex items-center rounded-full border border-brand-orange/30 bg-brand-orange-soft px-2 py-0.5 text-xs font-medium text-brand-ink transition-colors hover:border-brand-coral"
                >
                  {category.label}
                </Link>
              ))}
            </dd>
          </div>
          {promptSubcategories.length > 0 && (
            <div>
              <dt className={metadataLabelClass}>Subcategorías</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {promptSubcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    href={promptsUrl({
                      module: prompt.module,
                      categories: [subcategory.category],
                      subcategories: [subcategory.id],
                    })}
                    className="inline-flex items-center rounded-full border border-brand-turquoise/30 bg-brand-turquoise-soft px-2 py-0.5 text-xs font-medium text-brand-ink transition-colors hover:border-brand-violet"
                  >
                    {subcategory.label}
                  </Link>
                ))}
              </dd>
            </div>
          )}
          {promptTags.length > 0 && (
            <div>
              <dt className={metadataLabelClass}>Etiquetas</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {promptTags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={promptsUrl({ tags: [tag.id] })}
                    className="inline-flex items-center rounded-full border border-brand-blue/15 bg-brand-blue-soft/50 px-2 py-0.5 text-xs font-medium text-brand-slate transition-colors hover:border-brand-violet"
                  >
                    {tag.label}
                  </Link>
                ))}
              </dd>
            </div>
          )}
          <div>
            <dt className={metadataLabelClass}>Última actualización</dt>
            <dd className="mt-1 text-sm text-brand-slate">
              <time dateTime={prompt.updatedAt}>
                {formatDate(prompt.updatedAt)}
              </time>
            </dd>
          </div>
        </dl>

        {prompt.useCases !== undefined && prompt.useCases.length > 0 && (
          <section aria-labelledby="casos-de-uso" className="mt-8">
            <h2
              id="casos-de-uso"
              className="text-lg font-semibold text-brand-ink"
            >
              Cuándo usar este prompt
            </h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-brand-slate">
              {prompt.useCases.map((useCase) => (
                <li key={useCase}>{useCase}</li>
              ))}
            </ul>
          </section>
        )}

        {prompt.notes !== undefined && (
          <section aria-labelledby="notas" className="mt-8">
            <h2 id="notas" className="text-lg font-semibold text-brand-ink">
              Notas
            </h2>
            <p className="mt-3 text-sm text-brand-slate">{prompt.notes}</p>
          </section>
        )}

        {prompt.example !== undefined && (
          <section aria-labelledby="ejemplo" className="mt-8">
            <h2 id="ejemplo" className="text-lg font-semibold text-brand-ink">
              Ejemplo de uso
            </h2>
            <p className="mt-3 rounded-2xl border border-brand-yellow/40 bg-brand-yellow-soft p-4 text-sm text-brand-ink">
              {prompt.example}
            </p>
          </section>
        )}

        <section aria-labelledby="contenido-prompt" className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2
              id="contenido-prompt"
              className="text-lg font-semibold text-brand-ink"
            >
              Contenido del prompt
            </h2>
            <CopyPromptButton content={prompt.content} />
          </div>
          <p className="mt-2 text-sm text-brand-slate">
            Los marcadores como{" "}
            <code className="rounded-sm bg-brand-yellow-soft px-1 font-mono text-xs font-semibold text-brand-ink">
              {"{{context}}"}
            </code>{" "}
            son huecos para que rellenes con tu información antes de usar el
            prompt.
          </p>
          <div className="mt-4">
            <PromptContent content={prompt.content} />
          </div>
          <div className="mt-4">
            <CopyPromptButton content={prompt.content} />
          </div>
        </section>
      </article>
    </div>
  );
}
