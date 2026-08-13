import Link from "next/link";
import type { Prompt } from "@/src/data";
import { LanguageBadge, TagBadge } from "@/src/components/badges";
import { getCategoryLabels, getModuleLabel, getTagLabels } from "@/src/lib/taxonomy";

const MAX_VISIBLE_TAGS = 3;

type PromptCardProps = {
  prompt: Prompt;
  /** Full link to the detail page; may include the current filter state. */
  href?: string;
};

export function PromptCard({ prompt, href }: PromptCardProps) {
  const tagLabels = getTagLabels(prompt);
  const visibleTags = tagLabels.slice(0, MAX_VISIBLE_TAGS);
  const hiddenTagCount = tagLabels.length - visibleTags.length;
  const categoryLabels = getCategoryLabels(prompt);
  const moduleLabel = getModuleLabel(prompt);

  return (
    <article className="flex flex-col rounded-2xl border border-brand-blue/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-turquoise/40 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-brand-ink">
          <Link
            href={href ?? `/prompts/${prompt.slug}`}
            className="underline-offset-4 hover:text-brand-violet hover:underline"
          >
            {prompt.title}
          </Link>
        </h3>
        <LanguageBadge language={prompt.language} />
      </div>

      <p className="mt-2 line-clamp-2 text-sm text-brand-slate">
        {prompt.description}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-brand-slate">
        <span className="font-medium text-brand-violet">{moduleLabel}</span>
        {categoryLabels.map((label) => (
          <span key={label} aria-hidden className="flex items-center gap-2">
            <span className="text-brand-coral">·</span>
            {label}
          </span>
        ))}
      </div>

      {tagLabels.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {visibleTags.map((label) => (
            <TagBadge key={label} label={label} />
          ))}
          {hiddenTagCount > 0 && (
            <span className="text-xs text-brand-slate">
              +{hiddenTagCount} más
            </span>
          )}
        </div>
      )}

      <div className="mt-4 pt-1">
        <Link
          href={href ?? `/prompts/${prompt.slug}`}
          className="text-sm font-medium text-brand-violet underline-offset-4 hover:text-brand-coral hover:underline"
          aria-label={`Ver el prompt: ${prompt.title}`}
        >
          Ver prompt
        </Link>
      </div>
    </article>
  );
}
