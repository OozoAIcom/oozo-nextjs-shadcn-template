export function securityHeaders({
  production = false,
  ancestors = "",
  hsts = false,
} = {}) {
  const origins = ancestors.trim().split(/\s+/).filter(Boolean);
  for (const origin of origins) {
    const url = new URL(origin);
    if (
      url.protocol !== "https:" ||
      url.origin !== origin ||
      url.username ||
      url.password
    ) {
      throw new Error(
        "OOZOAI_FRAME_ANCESTORS must contain exact HTTPS origins without paths or credentials",
      );
    }
  }
  const policy = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${production ? "" : " 'unsafe-eval'"}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self'${production ? "" : " ws: wss:"}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    `frame-ancestors ${origins.length ? origins.join(" ") : "'none'"}`,
  ].join("; ");
  return [
    { key: "Content-Security-Policy", value: policy },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=()",
    },
    ...(!origins.length ? [{ key: "X-Frame-Options", value: "DENY" }] : []),
    ...(production && hsts
      ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }]
      : []),
  ];
}
