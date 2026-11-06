import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const browserErrors: string[] = [];
const externalRequests: string[] = [];
test.beforeEach(async ({ page, baseURL }) => {
  browserErrors.length = 0;
  externalRequests.length = 0;
  page.on("pageerror", (error) => browserErrors.push(error.message));
  page.on("request", (request) => {
    if (new URL(request.url()).origin !== new URL(baseURL!).origin)
      externalRequests.push(request.url());
  });
});
test.afterEach(() => {
  expect(browserErrors).toEqual([]);
  expect(externalRequests).toEqual([]);
});
test("health, security headers and production HTML smoke", async ({
  request,
}) => {
  const health = await request.get("/api/health");
  expect(health.status()).toBe(200);
  expect(await health.json()).toEqual({
    status: "ok",
    templateId: "oozo-nextjs-shadcn",
  });
  expect(health.headers()["cache-control"]).toContain("no-store");
  expect((await request.post("/api/health")).status()).toBe(405);
  const response = await request.get("/");
  expect(response.status()).toBe(200);
  const headers = response.headers();
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["content-security-policy"]).toContain("object-src 'none'");
  expect(headers["content-security-policy"]).not.toContain("unsafe-eval");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
  expect(headers["x-powered-by"]).toBeUndefined();
  expect(await response.text()).toContain("A thoughtful start.");
});
test("landing renders and static foundation works without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A thoughtful start.",
  );
  await expect(
    page.getByRole("link", { name: "Explore the workspace" }),
  ).toHaveAttribute("href", "#workspace");
  await expect(page.getByRole("table")).toBeVisible();
  await context.close();
});
test("project dialog validates, safely renders input, and restores focus", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: "Edit project",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Edit project" });
  await expect(dialog).toBeVisible();
  await page.getByLabel("Project name").fill("x");
  await page.getByRole("button", { name: "Save locally" }).click();
  await expect(page.getByLabel("Project name")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.getByLabel("Project name")).toBeFocused();
  await page.getByLabel("Project name").fill("<b>My application</b>");
  await page.getByRole("button", { name: "Save locally" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByTestId("project-name")).toHaveText(
    "<b>My application</b>",
  );
  await expect(page.getByTestId("project-name").locator("b")).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(
    page.getByRole("status").filter({ hasText: "Project updated locally" }),
  ).toBeVisible();
  await trigger.click();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
test("dialog keeps keyboard focus inside", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Edit project", exact: true }).click();
  const dialog = page.getByRole("dialog");
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((element) =>
        element.contains(document.activeElement),
      ),
    ).toBe(true);
  }
});
test("table search, empty state and sort work", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Find a component").fill("no-such-component");
  await expect(page.getByText("No components found")).toBeVisible();
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(page.getByRole("row")).toHaveCount(11);
  const sort = page.getByRole("button", { name: "Component", exact: true });
  await sort.click();
  await expect(page.getByRole("columnheader").first()).toHaveAttribute(
    "aria-sort",
    "descending",
  );
  await expect(page.locator("tbody tr").first()).toContainText("Table");
  await page.getByLabel("Find a component").fill("input");
  await expect(page.locator("tbody tr")).toHaveCount(2);
});
test("light/dark/system themes work and selection persists", async ({
  page,
}) => {
  await page.goto("/");
  for (const theme of ["Dark", "Light"]) {
    await page.getByRole("button", { name: "Toggle theme" }).click();
    await page.getByRole("menuitem", { name: theme, exact: true }).click();
    await expect(page.locator("html")).toHaveClass(
      new RegExp(theme.toLowerCase()),
    );
    await page.reload();
    await expect(page.locator("html")).toHaveClass(
      new RegExp(theme.toLowerCase()),
    );
  }
  await page.emulateMedia({ colorScheme: "dark" });
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await page.getByRole("menuitem", { name: "System", exact: true }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
});
test("mobile navigation, narrow layout and keyboard skip link", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("dialog", { name: "Navigate OozoAI" }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Components" })
    .click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page).toHaveURL(/#components$/);
});
test("authentication preview validates locally without pretending to authenticate", async ({
  page,
}) => {
  const posts: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") posts.push(request.url());
  });
  await page.goto("/");
  await page.getByLabel("Email address").fill("invalid");
  await page.getByRole("button", { name: "Preview sign-in" }).click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await page.getByLabel("Email address").fill("you@example.com");
  await page.getByRole("button", { name: "Preview sign-in" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "No email was sent" }),
  ).toBeVisible();
  expect(posts).toEqual([]);
});
for (const theme of ["light", "dark"] as const)
  test(`accessibility: ${theme}, dialog and mobile`, async ({
    page,
  }, testInfo) => {
    await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
    await page.goto("/");
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.screenshot({
      path: testInfo.outputPath(`${theme}-desktop.png`),
      fullPage: true,
    });
    await page
      .getByRole("button", { name: "Edit project", exact: true })
      .click();
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.keyboard.press("Escape");
    await page.setViewportSize({ width: 375, height: 812 });
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.evaluate(() => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
      window.scrollTo(0, 0);
    });
    await page.screenshot({
      path: testInfo.outputPath(`${theme}-mobile.png`),
      fullPage: true,
    });
  });
test("missing routes render a useful 404", async ({ page }) => {
  const response = await page.goto("/missing-page");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
});

test("loading example is accessible and can return home", async ({ page }) => {
  await page.goto("/examples");
  await expect(
    page.getByRole("heading", { name: "Loading state example" }),
  ).toBeVisible();
  await expect(page.getByRole("status")).toHaveText("Loading your workspace…");
  await page.getByRole("link", { name: "Back to the foundation" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A thoughtful start.",
  );
});
