"use client";

import { X } from "lucide-react";

type FilterChipProps = {
  label: string;
  onRemove: () => void;
};

export function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 py-1 pr-1 pl-3 text-xs font-medium text-blue-900">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Quitar el filtro ${label}`}
        className="rounded-full p-0.5 transition-colors hover:bg-blue-100"
      >
        <X className="size-3.5" aria-hidden />
      </button>
    </span>
  );
}
