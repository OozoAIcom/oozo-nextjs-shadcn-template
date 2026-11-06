import { spawn } from "node:child_process";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const [command = "dev", ...args] = process.argv.slice(2);
if (!["dev", "build", "start"].includes(command))
  throw new Error("Unsupported command");
const child = spawn(
  process.execPath,
  [require.resolve("next/dist/bin/next"), command, ...args],
  {
    stdio: "inherit",
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
  },
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => child.kill(signal));
child.on("error", (error) => {
  console.error(error);
  process.exitCode = 1;
});
child.on("exit", (code) => {
  process.exitCode = code ?? 1;
});
