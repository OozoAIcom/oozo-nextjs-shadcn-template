"use client";
import { Menu } from "lucide-react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
export function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          aria-label="Open navigation"
        >
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Navigate OozoAI</SheetTitle>
          <SheetDescription>
            Explore the application foundation.
          </SheetDescription>
        </SheetHeader>
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col gap-2 px-4"
        >
          {site.navigation.map((item) => (
            <SheetClose key={item.href} asChild>
              <a
                className="rounded-lg px-3 py-3 hover:bg-muted focus-visible:outline-2"
                href={item.href}
              >
                {item.label}
              </a>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
