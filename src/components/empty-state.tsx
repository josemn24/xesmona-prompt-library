import { SearchX } from "lucide-react";
import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-6 py-14 text-center">
      <SearchX className="size-8 text-neutral-400" aria-hidden />
      <h2 className="mt-4 text-lg font-semibold text-neutral-900">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-neutral-600">{description}</p>
      {action !== undefined && <div className="mt-6">{action}</div>}
    </div>
  );
}
