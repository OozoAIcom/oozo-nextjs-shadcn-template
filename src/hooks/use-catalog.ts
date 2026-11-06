"use client";
import { useState } from "react";
import type { CatalogItem } from "@/config/site";
export function useCatalog(items: readonly CatalogItem[]) {
  const [query, setQuery] = useState("");
  const [descending, setDescending] = useState(false);
  const filtered = items
    .filter((item) =>
      `${item.name} ${item.category} ${item.purpose}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    )
    .sort((a, b) => (descending ? -1 : 1) * a.name.localeCompare(b.name));
  return {
    query,
    setQuery,
    descending,
    toggleSort: () => setDescending((value) => !value),
    filtered,
  };
}
