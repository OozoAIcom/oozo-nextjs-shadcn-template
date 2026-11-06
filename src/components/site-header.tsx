import { Layers2 } from "lucide-react";
import { site } from "@/config/site";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileNavigation } from "@/components/mobile-navigation";
export function SiteHeader() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <a
          href="#main"
          aria-label="OozoAI home"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Layers2 className="size-5" aria-hidden="true" />
          </span>
          {site.name}
          <span className="hidden text-xs font-normal text-muted-foreground sm:inline">
            / foundation
          </span>
        </a>
        <nav
          aria-label="Main navigation"
          className="hidden gap-6 text-sm md:flex"
        >
          {site.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
