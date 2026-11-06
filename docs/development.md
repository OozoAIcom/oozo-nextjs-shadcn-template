# Development and examples

Use Node 24.22.2 / pnpm 10.34.4. Existing dependency declarations and source primitives remain intact.

| Command                        | Purpose                                                 |
| ------------------------------ | ------------------------------------------------------- |
| pnpm dev --port 3200           | Fast Refresh development server                         |
| pnpm typecheck                 | Generate Next route types and strict TypeScript checks  |
| pnpm lint                      | ESLint; warnings fail validation                        |
| pnpm build                     | Production build                                        |
| pnpm start --port 3200         | Run the production build                                |
| pnpm test                      | Unit and Chromium tests with managed production startup |
| pnpm validate                  | Frozen install, types, lint, build, tests               |
| pnpm exec shadcn add accordion | Add a missing official component on demand              |

## Source and reusable patterns

`src/app` contains routes, metadata, loading/error/not-found and health. `src/components/ui` owns shadcn primitives. `src/components/features` contains project dialog/form, catalog table, native chart and authentication UI. `src/components` contains the shared responsive shell and existing theme controls. `src/hooks` implements catalog search/sort. `src/config` provides shared site/catalog data. `src/types` holds form contracts; `src/lib/validation` validates unknown values. `tests` contains functional and browser checks. No empty placeholder modules are needed.

- Project dialog: visible labels, bounds, shared validation, first-invalid focus, Radix focus return and status notification. State is local and resets on reload.
- Table: actual installed component inventory, search, ascending/descending name sort, accessible caption and no-results state. A table engine is unnecessary for this dataset.
- Chart/dashboard: category counts derived from that inventory, native SVG plus a readable list. These are actual component counts, not fabricated customer/business statistics.
- Authentication UI: validates an email locally and explains the identity-provider integration boundary. No password, account creation, session or network call.
- Navigation: desktop anchors and mobile Radix Sheet, skip link and semantic landmarks.
- Loading/error/empty states: real route components and table no-results, with reduced-motion support. No artificial delays.

Pages remain Server Components. Client boundaries contain only interactive navigation/theme/form/table islands. System fonts and local SVG avoid remote asset requests. Use the Metadata API, meaningful headings and real per-app origins before adding canonicals/sitemaps. Do not ship a personal or placeholder production origin.

`pnpm smoke:dev` starts its own development server, polls health and HTML, verifies a temporary landing-page edit is recompiled, restores source, and stops the owned server. It is included in validate; TEST_DEV_PORT defaults to 3101. Run without concurrent source edits.

The static landing page intentionally has no root loading boundary, so its first content is readable without JavaScript. `/examples` demonstrates the reusable workspace loader with a scoped App Router loading boundary.
