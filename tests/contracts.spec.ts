import { test, expect } from "@playwright/test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { validateProject, validateEmail } from "../src/lib/validation/project";
import { securityHeaders } from "../src/config/security.mjs";
import { CatalogChart } from "../src/components/features/catalog-chart";
import { WorkspaceLoading } from "../src/components/features/workspace-loading";
import ErrorBoundary from "../src/app/error";
const manifest = JSON.parse(readFileSync("template.json", "utf8"));
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
test("manifest matches installed framework and executable scripts", () => {
  expect(manifest.framework.version).toBe(pkg.dependencies.next);
  expect(manifest.packageManager).toEqual({ name: "pnpm", version: "10.34.4" });
  expect(manifest.node.version).toBe("24.22.2");
  for (const script of ["dev", "build", "start", "validate"])
    expect(pkg.scripts[script]).toBeTruthy();
  expect(manifest.initialization.externalRuntimeServices).toEqual([]);
});
test("project validation rejects malformed unknown input", () => {
  for (const value of [
    null,
    {},
    [],
    "text",
    { name: 42, description: "" },
    { name: "a", description: "" },
    { name: "x".repeat(81), description: "" },
    { name: "ab\ncd", description: "" },
    { name: "ab", description: "x".repeat(241) },
  ])
    expect(validateProject(value).success).toBe(false);
});
test("project validation trims text and retains safe literal markup", () => {
  expect(
    validateProject({ name: "  My project  ", description: "  Hello  " }),
  ).toEqual({
    success: true,
    data: { name: "My project", description: "Hello" },
  });
  expect(
    validateProject({ name: "<script>literal</script>", description: "" })
      .success,
  ).toBe(true);
});
test("email validation has bounds and rejects control characters", () => {
  expect(validateEmail("you@example.com")).toBe(true);
  for (const value of [
    null,
    "",
    "a@",
    "@example.com",
    "a b@example.com",
    "a@example.com\n",
    "a".repeat(255) + "@example.com",
  ])
    expect(validateEmail(value)).toBe(false);
});
test("embedding defaults to denied and trusted origins avoid XFO conflicts", () => {
  const headers = securityHeaders({ production: true });
  expect(
    headers.find((h) => h.key === "Content-Security-Policy")?.value,
  ).toContain("frame-ancestors 'none'");
  expect(headers.find((h) => h.key === "X-Frame-Options")?.value).toBe("DENY");
  const trusted = securityHeaders({
    production: true,
    ancestors: "https://builder.example https://preview.example:8443",
  });
  expect(trusted.find((h) => h.key === "X-Frame-Options")).toBeUndefined();
  expect(
    trusted.find((h) => h.key === "Content-Security-Policy")?.value,
  ).toContain(
    "frame-ancestors https://builder.example https://preview.example:8443",
  );
  for (const ancestors of [
    "*",
    "http://example.com",
    "https://example.com/path",
    "https://example.com/",
    "https://user:pass@example.com",
    "https://example.com?x=1",
  ])
    expect(() => securityHeaders({ ancestors })).toThrow();
});
test("HSTS is opt-in and production excludes development CSP capabilities", () => {
  expect(
    securityHeaders({ production: true }).some(
      (h) => h.key === "Strict-Transport-Security",
    ),
  ).toBe(false);
  expect(
    securityHeaders({ production: true, hsts: true }).some(
      (h) => h.key === "Strict-Transport-Security",
    ),
  ).toBe(true);
  expect(
    securityHeaders({ production: false, hsts: true }).some(
      (h) => h.key === "Strict-Transport-Security",
    ),
  ).toBe(false);
  expect(securityHeaders({ production: true })[0].value).not.toContain(
    "unsafe-eval",
  );
  expect(securityHeaders({ production: false })[0].value).toContain(
    "unsafe-eval",
  );
});
test("chart and loading components render meaningful accessible content", () => {
  expect(renderToStaticMarkup(createElement(CatalogChart))).toContain(
    'aria-label="Component categories chart"',
  );
  const loading = renderToStaticMarkup(createElement(WorkspaceLoading));
  expect(loading).toContain('aria-busy="true"');
  expect(loading).toContain('role="status"');
});
test("error component exposes recovery without leaking the error", () => {
  const html = renderToStaticMarkup(
    createElement(ErrorBoundary, {
      error: new Error("private-internal-detail"),
      reset: () => {},
    }),
  );
  expect(html).toContain("Try again");
  expect(html).not.toContain("private-internal-detail");
});
