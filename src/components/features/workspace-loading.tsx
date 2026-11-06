import { Skeleton } from "@/components/ui/skeleton";
export function WorkspaceLoading() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading application"
      className="mx-auto max-w-6xl space-y-6 p-8"
    >
      <p role="status">Loading your workspace…</p>
      <div aria-hidden="true" className="space-y-6">
        <Skeleton className="h-12 w-2/3" />
        <Skeleton className="h-40 w-full" />
        <div className="grid gap-5 md:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    </section>
  );
}
