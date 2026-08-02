/**
 * Normalizes text for search: lowercase, without diacritics and with
 * collapsed whitespace, so "Observabilidad" matches "observabilidad"
 * and "Depuración" matches "depuracion".
 */
export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Splits a prompt text into segments, isolating {{placeholders}}. */
export function splitByPlaceholders(content: string): string[] {
  return content.split(/(\{\{[^{}]+\}\})/g).filter((part) => part.length > 0);
}

const PLACEHOLDER_PATTERN = /^\{\{[^{}]+\}\}$/;

export function isPlaceholder(segment: string): boolean {
  return PLACEHOLDER_PATTERN.test(segment);
}
