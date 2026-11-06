import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Code2, Layers2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { ProjectEditor } from "@/components/features/project-editor";
import { CatalogChart } from "@/components/features/catalog-chart";
import { CatalogTable } from "@/components/features/catalog-table";
import { AuthenticationPreview } from "@/components/features/authentication-preview";
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-6xl px-5 pb-12 sm:px-8">
        <section
          className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center"
          aria-labelledby="welcome-heading"
        >
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
              <span className="size-1.5 rounded-full bg-foreground" />
              OOZOAI / NEXT.JS + SHADCN
            </p>
            <h1
              id="welcome-heading"
              className="max-w-xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl"
            >
              A thoughtful start.
              <br />
              <span className="text-muted-foreground">
                Room for your next idea.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
              A clean application foundation with accessible components,
              responsive layouts, and a design system you can make your own.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#workspace">
                  Explore the workspace
                  <ArrowDown aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#components">Browse components</a>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-2 text-sm font-medium">
              <Layers2 className="size-4" aria-hidden="true" />
              Your foundation
            </div>
            <ul className="space-y-4 text-sm">
              {[
                "Next.js App Router & React Server Components",
                "Tailwind CSS 4 & shadcn/Radix primitives",
                "Light, dark & system themes",
                "Typed forms, reusable patterns & clear boundaries",
              ].map((item) => (
                <li className="flex gap-3" key={item}>
                  <Check
                    className="mt-0.5 size-4 shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 border-t pt-5 font-mono text-xs text-muted-foreground">
              src/app/page.tsx <span aria-hidden="true">→</span> build from here
            </div>
          </div>
        </section>
        <section
          id="workspace"
          className="scroll-mt-6 border-t py-10"
          aria-labelledby="workspace-heading"
        >
          <p className="text-xs font-medium tracking-widest text-muted-foreground">
            01 / WORKSPACE
          </p>
          <div className="mt-3 mb-6">
            <h2
              id="workspace-heading"
              className="text-2xl font-semibold tracking-tight"
            >
              Useful patterns. Ready to adapt.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try the local editor and explore the components behind this page.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <ProjectEditor />
            <CatalogChart />
          </div>
        </section>
        <section
          id="components"
          className="scroll-mt-6 border-t py-10"
          aria-labelledby="components-heading"
        >
          <p className="text-xs font-medium tracking-widest text-muted-foreground">
            02 / COMPONENTS
          </p>
          <h2
            id="components-heading"
            className="mt-3 mb-2 text-2xl font-semibold tracking-tight"
          >
            A focused component system
          </h2>
          <p className="mb-6 max-w-2xl text-sm leading-6 text-muted-foreground">
            Use what is here first. Add missing components from the official
            shadcn registry when your application needs them.
          </p>
          <CatalogTable />
        </section>
        <section
          id="patterns"
          className="scroll-mt-6 border-t py-10"
          aria-labelledby="patterns-heading"
        >
          <p className="text-xs font-medium tracking-widest text-muted-foreground">
            03 / BUILDING BLOCKS
          </p>
          <h2
            id="patterns-heading"
            className="mt-3 mb-6 text-2xl font-semibold tracking-tight"
          >
            Extend with intention
          </h2>
          <div className="grid items-start gap-5 md:grid-cols-2">
            <AuthenticationPreview />
            <div className="rounded-xl border p-6">
              <Code2 aria-hidden="true" className="mb-4 size-5" />
              <h3 className="font-medium">Built to keep growing</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Keep server logic on the server and interactions close to the
                components that need them. The included AI instructions explain
                how to extend the foundation.
              </p>
              <a
                href="https://ui.shadcn.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1 text-sm underline underline-offset-4"
              >
                shadcn documentation
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <p className="mt-4">
                <Link
                  href="/examples"
                  className="text-sm underline underline-offset-4"
                >
                  Loading state example
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-5 py-6 text-xs text-muted-foreground sm:px-8">
          <p>OozoAI application foundation</p>
          <p>Your components. Your application.</p>
        </div>
      </footer>
    </>
  );
}
