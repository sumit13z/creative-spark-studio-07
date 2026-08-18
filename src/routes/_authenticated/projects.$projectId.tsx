import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { AuthUiProvider } from "@/components/site/AuthProvider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { DesignStudio } from "@/components/site/ai/DesignStudio";
import { getProjectDetail } from "@/lib/projects.functions";
import { designSchema, type GeneratedDesign, type ContentType, type Palette } from "@/lib/design-schema";

export const Route = createFileRoute("/_authenticated/projects/$projectId")({
  head: () => ({
    meta: [
      { title: "Project — Visualy AI" },
      { name: "description", content: "Open a saved Visualy AI project, explore variations and generate new versions." },
      { property: "og:title", content: "Project — Visualy AI" },
      { property: "og:description", content: "Open a saved Visualy AI project, explore variations and generate new versions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectPage,
  errorComponent: ({ error }) => (
    <div className="grid min-h-screen place-items-center p-8 text-center text-sm text-muted-foreground">
      {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center">Project not found</div>
  ),
});

function ProjectPage() {
  const { projectId } = Route.useParams();
  const fetchDetail = useServerFn(getProjectDetail);

  const { data, isLoading, error } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchDetail({ data: { projectId } }),
  });

  const latest = data?.designs?.[0];
  const parsed = latest ? designSchema.safeParse(latest.content) : null;
  const design: GeneratedDesign | undefined =
    parsed?.success && data
      ? {
          ...parsed.data,
          model: "saved",
          contentType: (data.project.content_type as ContentType) ?? "deck",
          palette: (latest?.palette as Palette) ?? "indigo",
        }
      : undefined;

  return (
    <AuthUiProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-28 pb-20">
          <div className="shell">
            <Link to="/projects" className="text-sm font-semibold text-primary hover:underline">
              ← All projects
            </Link>
            {isLoading ? (
              <div className="mt-16 grid place-items-center">
                <Loader2 className="size-6 animate-spin text-primary" />
              </div>
            ) : error ? (
              <p className="mt-10 text-sm text-destructive">{error.message}</p>
            ) : (
              <>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {data?.project.title}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  {data?.designs.length} saved version{data?.designs.length === 1 ? "" : "s"}
                </p>
                <div className="mt-8">
                  <DesignStudio
                    initialDesign={design}
                    initialProjectId={projectId}
                    initialTitle={data?.project.prompt ?? ""}
                  />
                </div>
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </AuthUiProvider>
  );
}
