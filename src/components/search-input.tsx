"use client";

import { Search } from "lucide-react";

type SearchInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchInput({
  id,
  label,
  value,
  onChange,
  placeholder = "Buscar por título, etiqueta, categoría o contenido…",
}: SearchInputProps) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-brand-turquoise"
        aria-hidden
      />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full rounded-xl border border-brand-blue/20 bg-white py-3 pr-4 pl-10 text-sm text-brand-ink shadow-sm placeholder:text-brand-slate/60 hover:border-brand-turquoise"
      />
    </div>
  );
}
