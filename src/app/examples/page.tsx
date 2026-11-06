import Link from "next/link";
import { WorkspaceLoading } from "@/components/features/workspace-loading";
export default function LoadingExample() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-5 py-12">
      <Link className="text-sm underline underline-offset-4" href="/">
        Back to the foundation
      </Link>
      <h1 className="mt-6 text-3xl font-semibold">Loading state example</h1>
      <p className="mt-3 text-muted-foreground">
        A reusable skeleton for pending workspace content. This is a visual
        preview, not an active request.
      </p>
      <WorkspaceLoading />
    </main>
  );
}
