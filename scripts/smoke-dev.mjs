import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const port = Number(process.env.TEST_DEV_PORT ?? 3101);
if (!Number.isInteger(port) || port < 1 || port > 65535)
  throw new Error("Invalid TEST_DEV_PORT");
const origin = `http://127.0.0.1:${port}`;
const source = new URL("../src/app/page.tsx", import.meta.url);
const original = await readFile(source, "utf8");
const marker = "Room for your next idea.";
if (!original.includes(marker))
  throw new Error(
    "Development smoke marker is missing; update the smoke test with the landing page",
  );
const probe = original.replace(marker, "Fast Refresh verification probe.");
// Never attach to an unrelated server on the requested port.
try {
  await fetch(`${origin}/api/health`, { signal: AbortSignal.timeout(1000) });
  throw new Error("Development smoke port is occupied");
} catch (error) {
  if (error.message === "Development smoke port is occupied") throw error;
}
const child = spawn(
  process.execPath,
  [
    "scripts/next.mjs",
    "dev",
    "--hostname",
    "127.0.0.1",
    "--port",
    String(port),
  ],
  {
    cwd: root,
    stdio: "inherit",
    windowsHide: true,
    detached: process.platform !== "win32",
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
  },
);
let exited = false;
child.on("exit", () => {
  exited = true;
});
child.on("error", (error) => {
  console.error(error);
  exited = true;
});
async function poll(path, predicate, timeout = 120_000) {
  const end = Date.now() + timeout;
  while (Date.now() < end) {
    if (exited)
      throw new Error(
        "Development server exited before smoke validation completed",
      );
    try {
      const response = await fetch(origin + path, {
        signal: AbortSignal.timeout(5000),
      });
      if (response.ok && (await predicate(response))) return;
    } catch {
      /* The process is allowed to be starting/recompiling until the deadline. */
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Development readiness timed out for ${path}`);
}
try {
  await poll("/api/health", async (response) => {
    const body = await response.json();
    return body.status === "ok" && body.templateId === "oozo-nextjs-shadcn";
  });
  await poll("/", async (response) => (await response.text()).includes(marker));
  await writeFile(source, probe);
  await poll(
    "/",
    async (response) =>
      (await response.text()).includes("Fast Refresh verification probe."),
    60_000,
  );
  console.log("Development HTTP readiness and hot reload PASS");
} finally {
  if ((await readFile(source, "utf8")) === probe)
    await writeFile(source, original);
  if (!exited && child.pid) {
    if (process.platform === "win32")
      await new Promise((resolve, reject) => {
        const stop = spawn(
          "taskkill.exe",
          ["/PID", String(child.pid), "/T", "/F"],
          { stdio: "ignore", windowsHide: true },
        );
        stop.on("error", reject);
        stop.on("exit", (code) =>
          code === 0 || exited
            ? resolve()
            : reject(new Error("Development server cleanup failed")),
        );
      });
    else process.kill(-child.pid, "SIGTERM");
  }
}
