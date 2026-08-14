import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold text-brand-coral">Error 404</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
        Página no encontrada
      </h1>
      <p className="mt-4 text-brand-slate">
        La página que buscas no existe o se ha movido. Puedes volver al inicio
        o explorar la biblioteca completa de prompts.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl border border-brand-blue/20 bg-white px-4 py-2 text-sm font-medium text-brand-slate transition-colors hover:border-brand-turquoise"
        >
          Volver al inicio
        </Link>
        <Link
          href="/prompts"
          className="rounded-xl bg-brand-violet px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-coral"
        >
          Explorar prompts
        </Link>
      </div>
    </div>
  );
}
