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
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400"
        aria-hidden
      />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full rounded-md border border-neutral-300 bg-white py-2.5 pr-4 pl-10 text-sm text-neutral-900 placeholder:text-neutral-400 hover:border-neutral-400"
      />
    </div>
  );
}
