# Template integration contract

The template is independent of the platform repository. `template.json` describes implemented behavior. Template release versioning is separate from the preserved package version.

1. Copy source into an application's clean directory, excluding `.git`, `node_modules`, `.next`, reports and real environment files. Preserve source, instructions, manifest and pnpm lockfile. No automatic init script or remote update hook exists.
2. Provision Node 24.22.2 and pnpm 10.34.4 and execute the manifest install command, including development dependencies for the build.
3. Allocate a port using PORT or `--port <port>`; use `--hostname 0.0.0.0` when binding a sandbox interface. Run `pnpm dev` for HMR or `pnpm build` followed by `pnpm start` for production.
4. Poll GET `/api/health` on the allocated origin for HTTP 200 and JSON status `ok` plus templateId `oozo-nextjs-shadcn`. Use an external deadline (recommended 120 seconds) and process logs on failure; never rely exclusively on console text.
5. To embed, set OOZOAI_FRAME_ANCESTORS to exact trusted HTTPS origins separated by spaces. Wildcards, paths, queries, credentials and insecure schemes are rejected. Default embedding is denied. The platform must provide origin/tenant/process isolation.
6. Forward termination signals and stop the server when the sandbox closes. The launch wrapper forwards Next flags and disables Next telemetry for dev/build/start.

Next's default port is 3000; TEST_PORT is test-only. No runtime localhost origin, fixed public URL, database, API keys, provider login or storage account is required. Standard Node execution supports future server-side sandboxes; no end-to-end platform integration or production deployment is claimed. Authentication and project examples are UI/local state only. Add authorization, validation, CSRF controls, secure sessions and persistence deliberately before using real data.
