import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BackToPromptsLink } from "@/src/components/back-to-prompts-link";
import { LanguageBadge } from "@/src/components/badges";
import { CopyPromptButton } from "@/src/components/copy-prompt-button";
import { PromptCard } from "@/src/components/prompt-card";
import { PromptContent } from "@/src/components/prompt-content";
import { allPrompts } from "@/src/data";
import { formatDate } from "@/src/lib/i18n";
import { categoryUrl, moduleUrl, promptsUrl } from "@/src/lib/query-params";
import {
  getCategoryById,
  getModuleById,
  getPromptBySlug,
  getRelatedPrompts,
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
  const promptCategory = getCategoryById(prompt.category);
  const promptSubcategories = (prompt.subcategories ?? [])
    .map((id) => getSubcategoryById(id))
    .filter((subcategory) => subcategory !== undefined);
  const promptTags = prompt.tags
    .map((id) => getTagById(id))
    .filter((tag) => tag !== undefined);
  const relatedPrompts = getRelatedPrompts(prompt);
  const renderMetadata = () => (
    <dl className="grid gap-y-5 border-l-2 border-brand-blue/10 pl-4">
      <div>
        <dt className={metadataLabelClass}>Módulo</dt>
        <dd className="mt-1 text-sm">
          {promptModule ? (
            <Link
              href={moduleUrl(promptModule.id)}
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
          {promptCategory ? (
            <Link
              href={categoryUrl(prompt.module, promptCategory.id)}
              className="inline-flex items-center rounded-full border border-brand-orange/30 bg-brand-orange-soft px-2 py-0.5 text-xs font-medium text-brand-ink transition-colors hover:border-brand-coral"
            >
              {promptCategory.label}
            </Link>
          ) : (
            prompt.category
          )}
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
                  categories: [prompt.category],
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
          <time dateTime={prompt.updatedAt}>{formatDate(prompt.updatedAt)}</time>
        </dd>
      </div>
    </dl>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <span className="text-sm text-brand-slate">
            Volver a todos los prompts
          </span>
        }
      >
        <BackToPromptsLink />
      </Suspense>

      <article className="mt-8">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
            {prompt.title}
          </h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-brand-slate">
            {prompt.description}
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start lg:gap-12">
          <aside className="order-1 lg:order-2 lg:sticky lg:top-8">
            {prompt.useCases !== undefined && prompt.useCases.length > 0 && (
              <section
                aria-labelledby="casos-de-uso"
                className="rounded-2xl border border-brand-turquoise/20 bg-brand-turquoise-soft/30 p-5"
              >
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

            <section
              aria-labelledby="detalles-del-prompt"
              className="mt-8 hidden border-t border-brand-blue/10 pt-5 lg:block"
            >
              <h2
                id="detalles-del-prompt"
                className="text-sm font-semibold text-brand-slate"
              >
                Detalles del prompt
              </h2>
              <div className="mt-5">{renderMetadata()}</div>
            </section>

            <details className="mt-8 border-t border-brand-blue/10 pt-5 lg:hidden">
              <summary className="cursor-pointer list-inside text-sm font-semibold text-brand-slate marker:text-brand-violet hover:text-brand-ink">
                Ver detalles del prompt
              </summary>
              <div className="mt-5">{renderMetadata()}</div>
            </details>
          </aside>

          <div className="order-2 min-w-0 lg:order-1">
            <section aria-labelledby="contenido-prompt">
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
            </section>

            {(prompt.notes !== undefined || prompt.example !== undefined) && (
              <section
                aria-labelledby="informacion-adicional"
                className="mt-8 border-t border-brand-blue/10 pt-6"
              >
                <h2
                  id="informacion-adicional"
                  className="text-lg font-semibold text-brand-ink"
                >
                  Información adicional
                </h2>
                {prompt.notes !== undefined && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-brand-ink">
                      Notas
                    </h3>
                    <p className="mt-2 text-sm text-brand-slate">
                      {prompt.notes}
                    </p>
                  </div>
                )}
                {prompt.example !== undefined && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-brand-ink">
                      Ejemplo de uso
                    </h3>
                    <p className="mt-2 rounded-2xl border border-brand-yellow/40 bg-brand-yellow-soft p-4 text-sm text-brand-ink">
                      {prompt.example}
                    </p>
                  </div>
                )}
              </section>
            )}

          </div>
        </div>

        {relatedPrompts.length > 0 && (
          <section aria-labelledby="prompts-relacionados" className="mt-10">
            <h2
              id="prompts-relacionados"
              className="text-lg font-semibold text-brand-ink"
            >
              Prompts relacionados
            </h2>
            <ul className="mt-4 grid list-none gap-4 p-0 sm:grid-cols-2">
              {relatedPrompts.map((relatedPrompt) => (
                <li key={relatedPrompt.id}>
                  <PromptCard prompt={relatedPrompt} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  );
}
