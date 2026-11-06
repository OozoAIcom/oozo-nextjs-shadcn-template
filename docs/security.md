# Security baseline

No credentials, analytics, remote assets, tracking scripts, update scripts or installation lifecycle hooks are added. The shared Next launcher sets NEXT_TELEMETRY_DISABLED=1 in dev/build/start. Directly bypassing that wrapper bypasses this setting.

Input is validated from unknown values with length/control-character bounds; React renders text without raw HTML. Demo form data is local, ephemeral and never uploaded. Authentication UI handles no passwords and creates no account/session. Adding a backend requires server validation, authorization for every user/tenant operation, request limits, secure cookies and appropriate CSRF protections. UI validation is not authorization.

Headers include nosniff, strict-origin-when-cross-origin, restrictive Permissions Policy and CSP. Embedding defaults to denied; optional exact trusted HTTPS ancestors support platform previews without contradicting X-Frame-Options. HSTS is opt-in after HTTPS deployment. CSP permits inline scripts/styles needed by Next hydration and next-themes, and development-only eval/WebSockets. This is not nonce-based strict CSP; strengthening it requires a separately tested dynamic-rendering/deployment choice.

Keep secrets in server-only code and environment values. NEXT*PUBLIC* variables are public browser bundle data. `.env*` remains ignored except the credential-free example. No error stack, cookie, environment value or submitted content is returned by the health endpoint. Operator responsibilities include TLS, reverse-proxy limits, dependency updates and sandbox isolation.

## Intended outbound dependencies

| Stage                    | Destination and purpose                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| Corepack/package install | Configured registry (normally registry.npmjs.org), public package metadata and locked tarballs |
| Explicit component add   | ui.shadcn.com official registry and package registry; downloaded source must be reviewed       |
| Explicit browser install | Playwright Microsoft/CDN download hosts; Chromium test binaries                                |
| CI                       | GitHub checkout/tool distribution and failure artifact storage                                 |
| Development browser      | Own app origin and development WebSocket for HMR                                               |
| Production browser       | Own app origin only for HTML/local assets/routes                                               |

No app data is transmitted to Bolt.diy, StackBlitz, an OozoAI service or other external APIs. Documentation links navigate only when clicked. Package-manager/CDN requests include normal network request metadata. New services must be opt-in, documented and tested. Preserve third-party notices and review lockfile changes. Audit results are time-specific; do not conceal vulnerabilities by suppressing tests or downgrading frameworks.

## Inherited dependency audit findings

The production dependency audit reports two existing shadcn CLI transitive dependencies: deepmerge 4.3.1 (low, [GHSA-gcqx-w48m-w2h4](https://github.com/advisories/GHSA-gcqx-w48m-w2h4), no patched version reported) and minimatch 10.2.6 (moderate, [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)). Both versions are present in the original npm lockfile. The CLI is not imported into application runtime code; its Tailwind CSS is compiled at build time. Only trusted official registry inputs are supported. Existing dependency version declarations are preserved under the user's constraint; no override, forced major upgrade or audit suppression is applied. The baseline is not represented as vulnerability-free.
