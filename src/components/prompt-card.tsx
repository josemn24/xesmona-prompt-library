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
    <article className="flex flex-col rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:border-neutral-400">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-neutral-900">
          <Link
            href={href ?? `/prompts/${prompt.slug}`}
            className="underline-offset-4 hover:text-blue-800 hover:underline"
          >
            {prompt.title}
          </Link>
        </h3>
        <LanguageBadge language={prompt.language} />
      </div>

      <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
        {prompt.description}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500">
        <span className="font-medium text-neutral-600">{moduleLabel}</span>
        {categoryLabels.map((label) => (
          <span key={label} aria-hidden className="flex items-center gap-2">
            <span className="text-neutral-300">·</span>
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
            <span className="text-xs text-neutral-500">
              +{hiddenTagCount} más
            </span>
          )}
        </div>
      )}

      <div className="mt-4 pt-1">
        <Link
          href={href ?? `/prompts/${prompt.slug}`}
          className="text-sm font-medium text-blue-800 underline-offset-4 hover:underline"
          aria-label={`Ver el prompt: ${prompt.title}`}
        >
          Ver prompt
        </Link>
      </div>
    </article>
  );
}
