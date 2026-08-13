import { LibraryBig } from "lucide-react";
import Link from "next/link";
import { NavLink } from "@/src/components/nav-link";
import { SITE_NAME } from "@/src/lib/i18n";

export function SiteHeader() {
  return (
    <header className="border-b border-brand-blue/10 bg-brand-cream/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 rounded-md font-semibold text-brand-ink"
        >
          <LibraryBig className="size-5 shrink-0 text-brand-coral" aria-hidden />
          <span className="truncate">{SITE_NAME}</span>
        </Link>
        <nav aria-label="Navegación principal">
          <ul className="flex items-center gap-1">
            <li>
              <NavLink href="/" label="Inicio" />
            </li>
            <li>
              <NavLink href="/prompts" label="Explorar prompts" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
