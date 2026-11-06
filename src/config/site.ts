export const site = {
  name: "OozoAI",
  title: "OozoAI application foundation",
  description:
    "An independent Next.js and shadcn/ui foundation for your next application.",
  navigation: [
    { href: "#workspace", label: "Workspace" },
    { href: "#components", label: "Components" },
    { href: "#patterns", label: "Patterns" },
  ],
} as const;
export const componentCatalog = [
  {
    name: "Button",
    category: "Actions",
    purpose: "Accessible actions and links",
  },
  { name: "Card", category: "Layout", purpose: "Composable content surfaces" },
  {
    name: "Dialog",
    category: "Overlays",
    purpose: "Focused tasks with keyboard support",
  },
  {
    name: "Dropdown menu",
    category: "Overlays",
    purpose: "Keyboard-friendly action menus",
  },
  { name: "Input", category: "Inputs", purpose: "Labeled text entry" },
  { name: "Label", category: "Inputs", purpose: "Associated form labels" },
  {
    name: "Separator",
    category: "Layout",
    purpose: "Visual content boundaries",
  },
  {
    name: "Sheet",
    category: "Overlays",
    purpose: "Responsive mobile navigation",
  },
  { name: "Skeleton", category: "Layout", purpose: "Loading placeholders" },
  { name: "Table", category: "Data", purpose: "Semantic tabular content" },
] as const;
export type CatalogItem = { name: string; category: string; purpose: string };
