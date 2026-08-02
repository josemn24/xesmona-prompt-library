<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: personal AI prompt library

Public, read-only prompt library. No database, no auth, no API routes: all
content is static TypeScript data in `src/data/`, fully statically rendered.

## Conventions

- **Interface in Spanish** (labels, messages, metadata); prompt content may be
  Spanish or English (`language: "es" | "en"` per prompt).
- Taxonomy: Module → Category → Subcategory, plus cross-cutting Tags. Ids are
  stable URL-safe English `kebab-case`; `label` holds the Spanish display name.
  A prompt has exactly one module, 1+ categories of that module, optional
  subcategories of its categories, and 0+ tags.
- After changing anything in `src/data/`, run `npm run test` (Zod validation +
  cross-reference checks) — invalid data also fails `npm run build`, because
  `app/layout.tsx` calls `validateLibrary()`.
- Keep React Server Components by default. Client Components (`"use client"`)
  only for: search input, filter panel/drawer, clipboard button, back link.
  Any component using `useSearchParams` must stay behind a `<Suspense>`
  boundary (its parent page does this).
- Explorer filter state lives in the URL query string; parsing/serializing is
  in `src/lib/query-params.ts`. Pure search/filter logic (unit-tested) is in
  `src/lib/search.ts` and `src/lib/filters.ts`.

## Commands

- `npm run dev` / `npm run build` / `npm run start`
- `npm run lint` (ESLint flat config; `next lint` does not exist in Next.js 16)
- `npm run typecheck`
- `npm run test` (Vitest, tests in `tests/`)
