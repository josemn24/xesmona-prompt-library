import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Module } from "@/src/data";
import { countPromptsForModule } from "@/src/lib/taxonomy";
import { Illustration } from "@/src/components/illustrations";

export function ModuleCard({ module }: { module: Module }) {
  const promptCount = countPromptsForModule(module.id);

  return (
    <Link
      href={`/modules/${module.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand-blue/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-brand-violet/30 hover:shadow-lg"
    >
      <div className="flex min-h-28 items-center justify-between bg-linear-to-br from-brand-violet-soft via-brand-blue-soft to-brand-yellow-soft px-5 py-4">
        <div className="flex size-20 items-center justify-center rounded-2xl bg-white/65 shadow-sm ring-1 ring-white/80 backdrop-blur-sm">
          <Illustration iconId={module.iconId} size="md" />
        </div>
        <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-brand-slate backdrop-blur-sm">
          {promptCount} {promptCount === 1 ? "prompt" : "prompts"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold text-brand-ink group-hover:text-brand-violet">
          {module.label}
        </h3>
        <p className="mt-2 min-h-24 text-sm leading-6 text-brand-slate">
          {module.description}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-brand-blue/10 pt-4 text-sm font-medium text-brand-violet">
          <span>Ver prompts</span>
          <ArrowRight
            className="size-4 text-brand-coral transition-transform group-hover:translate-x-1 group-hover:text-brand-violet"
            aria-hidden
          />
        </div>
      </div>
    </Link>
  );
}
