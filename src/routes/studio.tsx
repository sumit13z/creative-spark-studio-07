import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthUiProvider } from "@/components/site/AuthProvider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { DesignStudio } from "@/components/site/ai/DesignStudio";
import { Reveal } from "@/components/site/Reveal";

const title = "AI Design Studio — Generate on-brand decks & reports | Visualy AI";
const description =
  "Write a brief, tune tone, audience and palette, then let Visualy AI generate a full multi-page design with real copy, stats and charts. Regenerate, switch variations and save to your projects.";

export const Route = createFileRoute("/studio")({
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
  component: StudioPage,
});

function StudioPage() {
  return (
    <AuthUiProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-28 pb-20">
          <div className="shell">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    AI Design Studio
                  </h1>
                  <p className="mt-2 max-w-2xl text-muted-foreground">
                    From brief to finished draft: configure, generate, explore variations and save
                    it as a project.
                  </p>
                </div>
                <Link
                  to="/projects"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  My projects →
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100} className="mt-8">
              <DesignStudio />
            </Reveal>
          </div>
        </main>
        <Footer />
      </div>
    </AuthUiProvider>
  );
}
