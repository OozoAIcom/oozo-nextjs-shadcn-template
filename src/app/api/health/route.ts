export function GET() {
  return Response.json(
    { status: "ok", templateId: "oozo-nextjs-shadcn" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
