# Installation

Use Node 24.22.2 and `corepack pnpm@10.34.4`. Existing version declarations are unchanged; no global configuration or toolchain files are rewritten. On Windows use `corepack.cmd` if PowerShell blocks shims.

```sh
corepack pnpm@10.34.4 install --frozen-lockfile
corepack pnpm@10.34.4 dev --port 3000
```

No `.env` is required. See `.env.example` for optional embedding/HSTS settings. Installation uses the committed pnpm lock; do not run npm install or regenerate the retained original npm lock.

```sh
corepack pnpm@10.34.4 exec playwright install --with-deps chromium
corepack pnpm@10.34.4 validate
```

The browser command downloads Chromium; on Ubuntu `--with-deps` can install OS packages. The shared Node validation script runs identically on Windows/Ubuntu, stops on failure and never silently reuses another server. Set TEST_PORT if the default test port 3100 is occupied.

For a machine with an existing Chrome installation, set PLAYWRIGHT_CHANNEL=chrome to validate against that browser without a Chromium download. Default/CI uses Playwright Chromium. Report which browser was executed.
