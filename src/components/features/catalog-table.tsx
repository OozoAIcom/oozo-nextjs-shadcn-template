"use client";
import { ArrowDownAZ, Search } from "lucide-react";
import { componentCatalog } from "@/config/site";
import { useCatalog } from "@/hooks/use-catalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export function CatalogTable() {
  const { query, setQuery, descending, toggleSort, filtered } =
    useCatalog(componentCatalog);
  return (
    <div className="rounded-xl border bg-card">
      <div className="space-y-2 border-b p-5">
        <Label htmlFor="component-search">Find a component</Label>
        <div className="relative max-w-md">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-2 left-3 size-4 text-muted-foreground"
          />
          <Input
            id="component-search"
            className="pl-9"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search names, categories, or uses"
          />
        </div>
        <p role="status" className="text-xs text-muted-foreground">
          {filtered.length} of {componentCatalog.length} components
        </p>
      </div>
      <div
        role="region"
        aria-label="Installed components"
        tabIndex={0}
        className="overflow-x-auto focus-visible:outline-2"
      >
        <Table>
          <TableCaption className="px-5 pb-4">
            Components available in this template. Add more when your
            application needs them.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead aria-sort={descending ? "descending" : "ascending"}>
                <Button variant="ghost" onClick={toggleSort}>
                  Component
                  <ArrowDownAZ aria-hidden="true" />
                </Button>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Use</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="pl-5 font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-muted-foreground">
                  {item.purpose}
                </TableCell>
              </TableRow>
            ))}
            {!filtered.length && (
              <TableRow>
                <TableCell colSpan={3} className="py-12 text-center">
                  <p className="font-medium">No components found</p>
                  <p className="mt-1 text-muted-foreground">
                    Try another name or clear your search.
                  </p>
                  <Button
                    className="mt-4"
                    variant="outline"
                    onClick={() => setQuery("")}
                  >
                    Clear search
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
