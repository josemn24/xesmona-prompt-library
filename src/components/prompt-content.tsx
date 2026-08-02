import { Fragment } from "react";
import { isPlaceholder, splitByPlaceholders } from "@/src/lib/text";

/**
 * Renders the full prompt text preserving whitespace and line breaks.
 * {{placeholders}} are highlighted so they are easy to spot before copying.
 */
export function PromptContent({ content }: { content: string }) {
  const segments = splitByPlaceholders(content);

  return (
    <pre className="overflow-x-auto rounded-md border border-neutral-200 bg-neutral-50 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap text-neutral-800 sm:p-5">
      {segments.map((segment, index) =>
        isPlaceholder(segment) ? (
          <mark
            key={index}
            className="rounded-sm bg-amber-100 px-0.5 font-semibold text-amber-900"
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
