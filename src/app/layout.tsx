import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: { default: site.title, template: "%s | OozoAI" },
  description: site.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
