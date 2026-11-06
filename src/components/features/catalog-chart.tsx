import { componentCatalog } from "@/config/site";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
export function CatalogChart() {
  const counts = Object.entries(
    componentCatalog.reduce<Record<string, number>>((result, item) => {
      result[item.category] = (result[item.category] ?? 0) + 1;
      return result;
    }, {}),
  );
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          <h3>A small, composable toolkit</h3>
        </CardTitle>
        <CardDescription>
          Installed components by category. No chart library required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <svg
          viewBox="0 0 320 170"
          className="h-auto w-full text-primary"
          role="img"
          aria-label="Component categories chart"
        >
          <desc>
            {counts
              .map(([category, count]) => `${category}: ${count}`)
              .join(", ")}
          </desc>
          {counts.map(([category, count], index) => (
            <g key={category}>
              <text x="0" y={index * 33 + 20} fill="currentColor" fontSize="12">
                {category}
              </text>
              <rect
                x="82"
                y={index * 33 + 5}
                width={count * 60}
                height="20"
                rx="5"
                fill="currentColor"
                opacity={0.5 + index * 0.1}
              />
              <text
                x={92 + count * 60}
                y={index * 33 + 20}
                fill="currentColor"
                fontSize="12"
              >
                {count}
              </text>
            </g>
          ))}
        </svg>
        <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
          {counts.map(([category, count]) => (
            <div key={category} className="flex gap-1">
              <dt>{category}:</dt>
              <dd>{count}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
