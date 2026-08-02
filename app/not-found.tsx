import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold text-blue-800">Error 404</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
        Página no encontrada
      </h1>
      <p className="mt-4 text-neutral-600">
        La página que buscas no existe o se ha movido. Puedes volver al inicio
        o explorar la biblioteca completa de prompts.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400"
        >
          Volver al inicio
        </Link>
        <Link
          href="/prompts"
          className="rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-900"
        >
          Explorar prompts
        </Link>
      </div>
    </div>
  );
}
