import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Module } from "@/src/data";
import { countPromptsForModule } from "@/src/lib/taxonomy";

export function ModuleCard({ module }: { module: Module }) {
  const promptCount = countPromptsForModule(module.id);

  return (
    <Link
      href={`/modules/${module.id}`}
      className="group flex flex-col rounded-lg border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-400"
    >
      <h3 className="font-semibold text-neutral-900 group-hover:text-blue-800">
        {module.label}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-neutral-600">
        {module.description}
      </p>
      <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-neutral-600">
        <span>
          {promptCount} {promptCount === 1 ? "prompt" : "prompts"}
        </span>
        <ArrowRight
          className="size-4 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-800"
          aria-hidden
        />
      </p>
    </Link>
  );
}
