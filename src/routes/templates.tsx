import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { AuthUiProvider } from "@/components/site/AuthProvider";
import { SectionHeading } from "@/components/site/Reveal";
import { TemplatesSection } from "@/components/site/sections/TemplatesSection";
import { CTASection } from "@/components/site/sections/CTASection";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Template Library — 6,000+ designs to start from | Visualy AI" },
      {
        name: "description",
        content:
          "Browse professionally designed presentation, report, infographic and social templates you can edit and brand in minutes.",
      },
      { property: "og:title", content: "Visualy AI template library" },
      {
        property: "og:description",
        content: "Thousands of editable, on-brand templates for every kind of visual content.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TemplatesPage,
});

function TemplatesPage() {
  return (
    <AuthUiProvider>
      <Navbar />
      <main className="pt-28 lg:pt-36">
        <div className="shell">
          <SectionHeading
            eyebrow="Templates"
            title={
              <>
                Start from something <span className="text-gradient">already beautiful</span>
              </>
            }
            description="Every template is fully editable, responsive and ready to take your brand kit."
          />
        </div>
        <TemplatesSection compact />
        <CTASection />
      </main>
      <Footer />
    </AuthUiProvider>
  );
}
