import type { NextConfig } from "next";
import { securityHeaders } from "./src/config/security.mjs";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders({
          production: process.env.NODE_ENV === "production",
          ancestors: process.env.OOZOAI_FRAME_ANCESTORS ?? "",
          hsts: process.env.ENABLE_HSTS === "true",
        }),
      },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
