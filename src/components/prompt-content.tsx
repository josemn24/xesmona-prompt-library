import { Fragment } from "react";
import { isPlaceholder, splitByPlaceholders } from "@/src/lib/text";

/**
 * Renders the full prompt text preserving whitespace and line breaks.
 * {{placeholders}} are highlighted so they are easy to spot before copying.
 */
export function PromptContent({ content }: { content: string }) {
  const segments = splitByPlaceholders(content);

  return (
    <pre className="overflow-x-auto rounded-2xl border border-brand-violet/15 bg-brand-violet-soft/40 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap text-brand-ink sm:p-5">
      {segments.map((segment, index) =>
        isPlaceholder(segment) ? (
          <mark
            key={index}
            className="rounded-sm bg-brand-yellow-soft px-0.5 font-semibold text-brand-ink"
          >
            {segment}
          </mark>
        ) : (
          <Fragment key={index}>{segment}</Fragment>
        ),
      )}
    </pre>
  );
}
