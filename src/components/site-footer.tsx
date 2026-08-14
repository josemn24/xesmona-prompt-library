import { modules } from "@/src/data";
import { SITE_NAME } from "@/src/lib/i18n";
import { moduleUrl } from "@/src/lib/query-params";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-brand-blue/10 bg-brand-blue-soft/50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div>
          <p className="font-semibold text-brand-ink">{SITE_NAME}</p>
          <p className="mt-2 text-sm text-brand-slate">
            Biblioteca personal de prompts, pública y de solo lectura. Todo el
            contenido vive en el repositorio como datos estáticos.
          </p>
        </div>
        <nav aria-label="Módulos">
          <p className="text-sm font-semibold text-brand-ink">Módulos</p>
          <ul className="mt-2 space-y-1.5">
            {modules.map((module) => (
              <li key={module.id}>
                <Link
                  href={moduleUrl(module.id)}
                  className="text-sm text-brand-slate underline-offset-4 hover:text-brand-violet hover:underline"
                >
                  {module.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Explorar">
          <p className="text-sm font-semibold text-brand-ink">Explorar</p>
          <ul className="mt-2 space-y-1.5">
            <li>
              <Link
                href="/prompts"
                className="text-sm text-brand-slate underline-offset-4 hover:text-brand-violet hover:underline"
              >
                Todos los prompts
              </Link>
            </li>
            <li>
              <Link
                href="/prompts?language=es"
                className="text-sm text-brand-slate underline-offset-4 hover:text-brand-violet hover:underline"
              >
                Prompts en español
              </Link>
            </li>
            <li>
              <Link
                href="/prompts?language=en"
                className="text-sm text-brand-slate underline-offset-4 hover:text-brand-violet hover:underline"
              >
                Prompts en inglés
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
