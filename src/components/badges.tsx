import type { PromptLanguage } from "@/src/data";
import { languageLabel } from "@/src/lib/i18n";

const baseClass =
  "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium";

export function LanguageBadge({ language }: { language: PromptLanguage }) {
  return (
    <span
      className={`${baseClass} border-blue-200 bg-blue-50 text-blue-900`}
      title="Idioma del prompt"
    >
      {languageLabel(language)}
    </span>
  );
}

export function CategoryBadge({ label }: { label: string }) {
  return (
    <span
      className={`${baseClass} border-neutral-200 bg-neutral-50 text-neutral-700`}
    >
      {label}
    </span>
  );
}

export function TagBadge({ label }: { label: string }) {
  return (
    <span
      className={`${baseClass} border-neutral-200 bg-white text-neutral-600`}
    >
      {label}
    </span>
  );
}

export function ModuleBadge({ label }: { label: string }) {
  return (
    <span
      className={`${baseClass} border-emerald-200 bg-emerald-50 text-emerald-900`}
    >
      {label}
    </span>
  );
}
