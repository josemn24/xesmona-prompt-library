import { Search } from "lucide-react";

/**
 * Server-rendered search form: a plain GET form submits to /prompts?q=…
 * without requiring any client-side JavaScript.
 */
export function HomeSearchForm() {
  return (
    <form action="/prompts" role="search" className="w-full max-w-xl">
      <label htmlFor="home-search" className="sr-only">
        Buscar prompts
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-brand-turquoise"
            aria-hidden
          />
          <input
            id="home-search"
            name="q"
            type="search"
            autoComplete="off"
            placeholder="Busca por título, tecnología o tema: pull request, SQL, SEO…"
            className="w-full rounded-xl border border-brand-blue/20 bg-white py-3 pr-4 pl-10 text-sm text-brand-ink shadow-sm placeholder:text-brand-slate/60 hover:border-brand-turquoise"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-brand-violet px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-coral"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
