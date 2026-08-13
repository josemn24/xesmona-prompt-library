# Prompt Library (Biblioteca de prompts de IA)

A public, read-only personal library of AI prompts, focused mainly on software
development and also covering artificial intelligence, marketing, business and
productivity.

The application lets visitors browse prompts by module, category and
subcategory, search them with fuzzy matching, filter by module, category,
subcategory, language and tags, open any prompt's detail page and copy its
content to the clipboard.

There is no authentication, database, CMS, admin panel or backend of any kind:
all content lives in TypeScript files inside this repository and the site is
fully statically generated.

## Interface language

The entire interface (navigation, labels, buttons, empty states, error and
confirmation messages) is in **Spanish**. Prompt content may be written in
Spanish or English; every prompt declares its language explicitly (`es` or
`en`) and the UI displays it as "Español" or "Inglés".

## Technology stack

- **Next.js (App Router)** with React Server Components by default; Client
  Components only where browser interactivity is required (search, filters,
  clipboard, mobile filter drawer).
- **React 19** and **TypeScript** with strict typing.
- **Tailwind CSS v4** for styling (CSS Modules are intentionally not used;
  utility classes cover the design).
- **Fuse.js** for client-side fuzzy search.
- **Lucide React** for icons.
- **Zod** for static data validation.
- **Vitest** for unit tests.
- **ESLint** (flat config, `eslint-config-next`).
- Deployable to **Vercel** with zero configuration and no environment
  variables.

## Folder structure

```text
app/                              # Next.js App Router
  layout.tsx                      # Root layout (Spanish metadata, header, footer)
  page.tsx                        # Home page
  not-found.tsx                   # 404 page
  globals.css                     # Tailwind v4 theme and base styles
  prompts/page.tsx                # Prompt explorer (search + filters)
  prompts/[slug]/page.tsx         # Static prompt detail pages
  modules/[module]/page.tsx       # Static module pages
src/
  data/
    types.ts                      # Domain models (Module, Category, Prompt, …)
    modules.ts                    # Module taxonomy data
    categories.ts                 # Category taxonomy data
    subcategories.ts              # Subcategory taxonomy data
    tags.ts                       # Tag data
    prompts/                      # Prompt content, one file per module
      software-development.ts
      artificial-intelligence.ts
      marketing.ts
      business.ts
      productivity.ts
    index.ts                      # Aggregates and re-exports all data
    schema.ts                     # Zod schemas for every model
    validation.ts                 # Cross-reference and duplicate validation
  lib/
    text.ts                       # Text normalization (accents, case), placeholders
    taxonomy.ts                   # Lookup helpers over the taxonomy
    search.ts                     # Fuse.js index building and weighted search
    filters.ts                    # Pure filter logic (AND between types, OR within)
    query-params.ts               # URL query string <-> filter state
    i18n.ts                       # Site name, language labels, date formatting
  components/                     # UI components (server by default)
tests/                            # Vitest unit tests
```

## Getting started

Requires Node.js 20+ and npm.

```bash
npm install       # install dependencies
npm run dev       # start the development server at http://localhost:3000
```

## Available scripts

```bash
npm run dev         # development server
npm run build       # production build (fully static output)
npm run start       # serve the production build
npm run lint        # run ESLint
npm run typecheck   # run the TypeScript compiler without emitting
npm run test        # run the Vitest unit tests once
npm run test:watch  # run the tests in watch mode
```

## How to add a new prompt

1. Open the file for its module in `src/data/prompts/` (for example
   `software-development.ts`).
2. Add a new object to the exported array following the `Prompt` type from
   `src/data/types.ts`:

```ts
{
  id: "my-new-prompt",                    // unique, URL-safe
  slug: "my-new-prompt",                  // unique, URL-safe, used in /prompts/[slug]
  title: "…",
  description: "…",
  content: `…`,                           // the full prompt; may include {{placeholders}}
  language: "es",                         // "es" or "en"
  module: "software-development",         // must exist in modules.ts
  categories: ["quality-and-testing"],    // one or more, must belong to the module
  subcategories: ["unit-testing"],        // optional, must belong to a chosen category
  tags: ["typescript"],                   // zero or more, must exist in tags.ts
  useCases: ["…"],                        // optional
  notes: "…",                             // optional
  example: "…",                           // optional
  createdAt: "2026-08-02",                // ISO date YYYY-MM-DD
  updatedAt: "2026-08-02",
}
```

3. Run `npm run test` (or `npm run build`) to validate the data. The detail
   page is generated statically at the next build; no other file needs to
   change.

Placeholders such as `{{code}}` or `{{context}}` are plain text: they are
highlighted on the detail page and copied verbatim.

## How to add a module, category, subcategory or tag

- **Module**: add it to `src/data/modules.ts` with a valid `iconId` from the
  illustration registry, then create a prompt file
  `src/data/prompts/<module-id>.ts` and include it in the `allPrompts` array
  in `src/data/index.ts`. The module page and the explorer filters pick it up
  automatically.
- **Category**: add it to `src/data/categories.ts` with the `module` it
  belongs to and a valid `iconId`. Module and category illustrations are
  rendered by the shared SVG registry in `src/components/illustrations.tsx`.
- **Subcategory**: add it to `src/data/subcategories.ts` with the `category`
  it belongs to.
- **Tag**: add it to `src/data/tags.ts`. Tags are cross-cutting and available
  to every module.

All identifiers must be stable, unique, URL-safe English strings
(`kebab-case`); the Spanish name goes in `label`.

## How data validation works

`src/data/validation.ts` runs two levels of checks over all static content:

1. **Field-level validation with Zod** (`src/data/schema.ts`): required
   fields, non-empty titles/descriptions/content, slug and id formats, ISO
   `YYYY-MM-DD` dates that are real calendar dates, and `es`/`en` languages.
2. **Cross-reference validation**: duplicate ids and slugs in every
   collection, references to nonexistent modules/categories/subcategories/
   tags, categories that do not belong to the prompt's module, and
   subcategories that do not belong to one of the prompt's categories.

`validateLibrary()` is called from the root layout module, so **development
and production builds fail with a detailed, itemized error message** when any
piece of content is invalid. The same checks are covered by unit tests in
`tests/data-validation.test.ts`, using `validateLibraryData()`, the pure
(error-collecting) version of the validator.

## Search and filters

- Search runs client-side with Fuse.js over normalized text
  (case-insensitive, accent-insensitive, typo-tolerant), with weighted
  fields: title > tags > description > category names > subcategory names >
  use cases > full content.
- Filters use OR logic within the same type and AND logic between types.
  Selecting a module restricts the available categories and subcategories.
- The whole state lives in the URL query string
  (`/prompts?q=sql&module=software-development&tag=sql&language=en`), so
  searches are shareable and the back button restores the previous state,
  including when returning from a prompt detail page.

## Testing

Unit tests live in `tests/` and cover:

- Static data validation (valid data passes, every failure mode is detected).
- Duplicate id and slug detection.
- Search weighting (title matches rank above content-only matches).
- Typo tolerance and accent/case insensitivity.
- Module, multi-category, subcategory, tag and language filtering.
- Combined search + filters and empty-result behavior.

Run them with `npm run test`.

## Deployment to Vercel

The project is a standard Next.js app with no environment variables and no
external services:

1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import it in Vercel (framework preset "Next.js" is detected automatically).
3. Deploy. `npm run build` produces a fully static site; every content page
   is prerendered at build time.

Any change to the TypeScript data files takes effect on the next deployment.
