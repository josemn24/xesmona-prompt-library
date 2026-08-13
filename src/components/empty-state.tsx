import { SearchX } from "lucide-react";
import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-brand-turquoise/40 bg-brand-turquoise-soft/50 px-6 py-14 text-center">
      <SearchX className="size-8 text-brand-turquoise" aria-hidden />
      <h2 className="mt-4 text-lg font-semibold text-brand-ink">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-brand-slate">{description}</p>
      {action !== undefined && <div className="mt-6">{action}</div>}
    </div>
  );
}
