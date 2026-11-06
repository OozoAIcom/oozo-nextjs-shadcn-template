"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main" className="mx-auto max-w-xl space-y-5 px-5 py-20">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p role="alert" className="text-muted-foreground">
        We could not load this view. Try again or return to the home page.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="outline">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </main>
  );
}
