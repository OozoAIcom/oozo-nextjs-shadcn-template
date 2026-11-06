# OozoAI Next.js + shadcn template

An independent application foundation for OozoAI: Next.js 16.4.5, React 19.3.0, TypeScript, Tailwind CSS 4, shadcn/ui, Radix, Lucide and next-themes. Existing version declarations and primitives are preserved.

## Start

Use Node.js **24.22.2** and pnpm **10.34.4**, without changing your global tools:

```sh
corepack pnpm@10.34.4 install --frozen-lockfile
corepack pnpm@10.34.4 dev
```

Port defaults to 3000. Pass `--port 3200` or set `PORT` for another port. No environment file, service account, database or credentials are required.

```sh
corepack pnpm@10.34.4 build
corepack pnpm@10.34.4 start --port 3200
corepack pnpm@10.34.4 exec playwright install --with-deps chromium
corepack pnpm@10.34.4 validate
```

Validation includes locked installation, TypeScript, ESLint, production build, component/browser/accessibility tests, managed startup and HTTP smoke checks. CI runs the same validation on Windows and Ubuntu. Browser installation is an explicit prerequisite, not an install hook.

## Included examples

Responsive navigation, light/dark/system themes, a validated local project editor in a dialog, filterable/sortable component table, accessible native chart, dashboard composition, local status notifications, authentication handoff UI, loading and empty states. Authentication UI does not create accounts or sessions; local edits do not persist or transmit data.

Use existing components first. Install only missing official components:

```sh
corepack pnpm@10.34.4 exec shadcn info
corepack pnpm@10.34.4 exec shadcn add accordion
```

The original `radix-nova` style is retained. No competing UI library or older template's component files are used.

- [Installation](docs/installation.md)
- [Development and examples](docs/development.md)
- [AI development guide](.oozo-instructions.md)
- [Integration contract](docs/integration.md) and [manifest](template.json)
- [Security and network inventory](docs/security.md)
- [Change log](CHANGELOG.md)

The original npm lockfile is retained as historical input; pnpm-lock.yaml is canonical for this workflow. Do not regenerate both locks with competing package managers. The package's existing version is preserved; the template release is versioned separately in the manifest.

No deployment, analytics, remote fonts, tracking or provider credentials are included. Dependencies retain their respective upstream licenses/notices in their installed packages; no third-party ownership is claimed.
