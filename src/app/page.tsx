import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 relative">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <h1 className="text-4xl font-bold mb-4">Oozo Next.js Template</h1>
      <p className="text-muted-foreground mb-8">shadcn/ui + Tailwind CSS configured for AI.</p>
      <Button>Start Building</Button>
    </main>
  );
}
