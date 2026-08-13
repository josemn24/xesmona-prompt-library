import Link from "next/link";
import { HomeSearchForm } from "@/src/components/home-search-form";
import { ModuleCard } from "@/src/components/module-card";
import { PromptCard } from "@/src/components/prompt-card";
import { allPrompts, modules } from "@/src/data";
import { SITE_DESCRIPTION } from "@/src/lib/i18n";
import { sortByUpdatedAtDesc } from "@/src/lib/taxonomy";

const RECENT_PROMPTS_COUNT = 6;

export default function HomePage() {
  const recentPrompts = sortByUpdatedAtDesc(allPrompts).slice(
    0,
    RECENT_PROMPTS_COUNT,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <section className="relative overflow-hidden rounded-b-3xl border-x border-b border-brand-blue/10 bg-linear-to-br from-brand-violet-soft/70 via-white to-brand-turquoise-soft/60 px-6 py-10 sm:px-10 sm:py-14 lg:px-12">
        <div className="pointer-events-none absolute -top-24 -right-20 size-64 rounded-full bg-brand-turquoise-soft/70 blur-3xl" />
        <div className="relative">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-coral">
            Explora · crea · aprende
          </p>
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            Biblioteca de prompts de inteligencia artificial
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-brand-slate">
            {SITE_DESCRIPTION}
          </p>
          <div className="mt-6">
            <HomeSearchForm />
          </div>
        </div>
      </section>

      <section id="modulos" aria-labelledby="modulos-titulo" className="py-12">
        <h2
          id="modulos-titulo"
          className="text-xl font-semibold tracking-tight text-brand-ink"
        >
          Explorar por áreas
        </h2>
        <p className="mt-2 text-sm text-brand-slate">
          Cada área organiza sus prompts por categorías y subcategorías para
          ayudarte a encontrar el tipo de trabajo que quieres realizar.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </section>

      <section aria-labelledby="recientes" className="pb-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2
            id="recientes"
            className="text-xl font-semibold tracking-tight text-brand-ink"
          >
            Actualizados recientemente
          </h2>
          <Link
            href="/prompts"
            className="shrink-0 text-sm font-medium text-brand-violet underline-offset-4 hover:text-brand-coral hover:underline"
          >
            Ver todos
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </section>
    </div>
  );
}
