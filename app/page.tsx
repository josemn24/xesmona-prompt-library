import { ArrowRight } from "lucide-react";
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
      <section className="relative overflow-hidden rounded-b-3xl border-x border-b border-brand-blue/10 bg-linear-to-br from-brand-violet-soft via-brand-cream to-brand-yellow-soft py-14 sm:py-20">
        <div className="pointer-events-none absolute -top-24 -right-20 size-64 rounded-full bg-brand-turquoise-soft/70 blur-3xl" />
        <div className="relative">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-coral">
          Explora · crea · aprende
        </p>
        <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          Biblioteca de prompts de inteligencia artificial
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-slate">
          {SITE_DESCRIPTION}
        </p>
        <div className="mt-8">
          <HomeSearchForm />
        </div>
        <p className="mt-6 text-sm text-brand-slate">
          <Link
            href="/prompts"
            className="inline-flex items-center gap-1.5 font-medium text-brand-violet underline-offset-4 hover:text-brand-coral hover:underline"
          >
            Explorar los {allPrompts.length} prompts
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </p>
        </div>
      </section>

      <section aria-labelledby="modulos" className="py-12">
        <h2
          id="modulos"
          className="text-xl font-semibold tracking-tight text-brand-ink"
        >
          Explorar por módulo
        </h2>
        <p className="mt-2 text-sm text-brand-slate">
          Cada módulo es una gran área de conocimiento, con sus categorías y
          subcategorías.
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
