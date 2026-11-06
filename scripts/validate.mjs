import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
if (process.versions.node !== "24.22.2")
  throw new Error("Use Node.js 24.22.2; do not change project versions");
const pnpm = process.env.npm_execpath;
if (
  !pnpm?.includes("pnpm") ||
  !process.env.npm_config_user_agent?.startsWith("pnpm/10.34.4 ")
) {
  throw new Error("Run corepack pnpm@10.34.4 validate");
}
async function run(args) {
  console.log(`\n> pnpm ${args.join(" ")}`);
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [pnpm, ...args], {
      cwd: fileURLToPath(new URL("../", import.meta.url)),
      stdio: "inherit",
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`${args.join(" ")} failed (${code})`)),
    );
  });
}
for (const args of [
  ["install", "--frozen-lockfile"],
  ["typecheck"],
  ["lint", "--max-warnings=0"],
  ["build"],
  ["test"],
  ["smoke:dev"],
])
  await run(args);
console.log("\nAll validation checks passed.");
