# Changelog

## Version 1.0.0

- Preserve existing framework/dependency version declarations, package version, original npm lockfile, theme controls, assets and seven UI primitives.
- Add a responsive OozoAI application shell and light/dark/system themes using the existing design system.
- Add official shadcn Dialog, Table and Skeleton, plus reusable local form, sortable/searchable table, native chart, dashboard composition, status notifications and authentication handoff UI.
- Add accessible loading/error/empty states and a separate loading-example route; keep the landing page readable without JavaScript.
- Add health readiness, configurable port support, security headers and a telemetry-disabled Next launcher.
- Add a pnpm lockfile, machine-readable template contract, comprehensive AI/development/integration/security guides and Windows/Ubuntu CI.
- Add 20 unit/browser tests and development HTTP/hot-reload validation.

Known limitations: authentication and persistence are not backend implementations; two inherited shadcn CLI dependency advisories remain under the version-preservation constraint. Windows development may emit non-fatal Watchpack system-file scan warnings. See docs/security.md and docs/validation.md. Template release 1.0.0 is separate from the unchanged package version.
