import type { PromptLanguage } from "@/src/data";
import { languageLabel } from "@/src/lib/i18n";

const baseClass =
  "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium";

export function LanguageBadge({ language }: { language: PromptLanguage }) {
  return (
    <span
      className={`${baseClass} border-brand-turquoise/30 bg-brand-turquoise-soft text-brand-ink`}
      title="Idioma del prompt"
    >
      {languageLabel(language)}
    </span>
  );
}

export function CategoryBadge({ label }: { label: string }) {
  return (
    <span
      className={`${baseClass} border-brand-orange/30 bg-brand-orange-soft text-brand-ink`}
    >
      {label}
    </span>
  );
}

export function TagBadge({ label }: { label: string }) {
  return (
    <span
      className={`${baseClass} border-brand-blue/15 bg-brand-blue-soft/50 text-brand-slate`}
    >
      {label}
    </span>
  );
}

export function ModuleBadge({ label }: { label: string }) {
  return (
    <span
      className={`${baseClass} border-brand-violet/25 bg-brand-violet-soft text-brand-ink`}
    >
      {label}
    </span>
  );
}
