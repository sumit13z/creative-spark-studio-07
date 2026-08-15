import { createFileRoute } from "@tanstack/react-router";
import { AuthUiProvider } from "@/components/site/AuthProvider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/sections/Hero";
import { TrustSection } from "@/components/site/sections/TrustSection";
import { ContentTypes } from "@/components/site/sections/ContentTypes";
import { AISection } from "@/components/site/sections/AISection";
import { DataVizSection } from "@/components/site/sections/DataVizSection";
import { BrandKitSection } from "@/components/site/sections/BrandKitSection";
import { WorkspaceSection } from "@/components/site/sections/WorkspaceSection";
import { TemplatesSection } from "@/components/site/sections/TemplatesSection";
import {
  CollaborationSection,
  IntegrationGrid,
  InteractiveSection,
  SolutionsSection,
  TestimonialCarousel,
  UseCaseTabs,
} from "@/components/site/sections/ExtraSections";
import { FAQSection } from "@/components/site/sections/FAQSection";
import { CTASection } from "@/components/site/sections/CTASection";

const title = "Visualy AI — Create Presentations, Reports & Social Content With AI";
const description =
  "Visualy AI turns a prompt into on-brand presentations, reports, infographics and social content. Brand kits, live data charts and real-time collaboration in one workspace.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <AuthUiProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <TrustSection />
          <ContentTypes />
          <AISection />
          <DataVizSection />
          <BrandKitSection />
          <WorkspaceSection />
          <CollaborationSection />
          <TemplatesSection />
          <SolutionsSection />
          <UseCaseTabs />
          <InteractiveSection />
          <TestimonialCarousel />
          <IntegrationGrid />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </AuthUiProvider>
  );
}
