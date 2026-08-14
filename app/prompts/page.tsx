import type { Metadata } from "next";
import { Suspense } from "react";
import { PromptExplorer } from "@/src/components/prompt-explorer";

export const metadata: Metadata = {
  title: "Explorar prompts",
  description:
    "Busca y filtra todos los prompts de la biblioteca por módulo, categoría, subcategoría, idioma y etiquetas.",
  openGraph: {
    title: "Explorar prompts",
    description:
      "Busca y filtra todos los prompts de la biblioteca por módulo, categoría, subcategoría, idioma y etiquetas.",
  },
};

export default function PromptsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          Explorar prompts
        </h1>
        <p className="mt-2 max-w-2xl text-neutral-600">
          Busca por palabras clave y combina filtros de módulo, categoría,
          subcategoría, idioma y etiquetas. La URL refleja tu búsqueda para
          que puedas guardarla o compartirla.
        </p>
      </header>
      <Suspense
        fallback={
          <p className="text-sm text-neutral-500">Cargando el explorador…</p>
        }
      >
        <PromptExplorer />
      </Suspense>
    </div>
  );
}
