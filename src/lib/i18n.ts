import type { PromptLanguage } from "@/src/data";

export const SITE_NAME = "Biblioteca de prompts de IA";
export const SITE_DESCRIPTION =
  "Encuentra, consulta y copia prompts organizados para desarrollo de software, inteligencia artificial, marketing, negocios y productividad.";

export const LANGUAGE_LABELS: Record<PromptLanguage, string> = {
  es: "Español",
  en: "Inglés",
};

export function languageLabel(language: PromptLanguage): string {
  return LANGUAGE_LABELS[language];
}

/** Formats an ISO date (YYYY-MM-DD) for display, e.g. "15 de enero de 2026". */
export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
