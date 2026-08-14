"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
};

export function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:bg-brand-yellow-soft ${
        isActive ? "text-brand-violet" : "text-brand-slate hover:text-brand-ink"
      }`}
    >
      {label}
    </Link>
  );
}
