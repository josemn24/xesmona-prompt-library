"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

/**
 * Back link that restores the listing URL the user came from. The explorer
 * appends its current query string as `?from=` when linking to a detail
 * page, so filters and search survive the round trip.
 */
export function BackToPromptsLink() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const isSafeQueryString =
    from !== null && from.length > 0 && from.length < 1000 && !from.includes("://");

  const href = isSafeQueryString ? `/prompts?${from}` : "/prompts";
  const label = isSafeQueryString
    ? "Volver a los resultados"
    : "Volver a todos los prompts";

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-800 underline-offset-4 hover:underline"
    >
      <ArrowLeft className="size-4" aria-hidden />
      {label}
    </Link>
  );
}
