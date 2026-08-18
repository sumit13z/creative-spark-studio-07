import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AuthUiProvider } from "@/components/site/AuthProvider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { deleteProject, listProjects } from "@/lib/projects.functions";
import { paletteGradient } from "@/components/site/ai/DesignCanvas";
import type { Palette } from "@/lib/design-schema";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/projects")({
  head: () => ({
    meta: [
      { title: "My projects — Visualy AI" },
      { name: "description", content: "Every design you generated with Visualy AI, versioned and ready to edit." },
      { property: "og:title", content: "My projects — Visualy AI" },
      { property: "og:description", content: "Every design you generated with Visualy AI, versioned and ready to edit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
  errorComponent: ({ error }) => (
    <div className="grid min-h-screen place-items-center p-8 text-center text-sm text-muted-foreground">
      {error.message}
    </div>
  ),
});

function ProjectsPage() {
  const fetchProjects = useServerFn(listProjects);
  const removeProject = useServerFn(deleteProject);
  const router = useRouter();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects({}),
  });

  async function remove(id: string) {
    try {
      await removeProject({ data: { projectId: id } });
      toast.success("Project deleted");
      await refetch();
      router.invalidate();
    } catch (error) {
      toast.error("Could not delete", {
        description: error instanceof Error ? error.message : undefined,
      });
    }
  }

  return (
    <AuthUiProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-28 pb-20">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">My projects</h1>
                <p className="mt-2 text-muted-foreground">
                  Everything you generated, with every saved version.
                </p>
              </div>
              <Button variant="brand" asChild>
                <Link to="/studio">
                  <Plus /> New design
                </Link>
              </Button>
            </div>

            {isLoading ? (
              <div className="mt-16 grid place-items-center">
                <Loader2 className="size-6 animate-spin text-primary" />
              </div>
            ) : !data?.length ? (
              <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
                <p className="font-bold text-ink">No projects yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Generate your first design in the AI Design Studio.
                </p>
                <Button variant="brand" className="mt-5" asChild>
                  <Link to="/studio">Open the studio</Link>
                </Button>
              </div>
            ) : (
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((p) => (
                  <li
                    key={p.id}
                    className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
                  >
                    <Link
                      to="/projects/$projectId"
                      params={{ projectId: p.id }}
                      className="block"
                    >
                      <span
                        className={cn(
                          "block h-24 bg-gradient-to-br opacity-90",
                          paletteGradient((p.palette as Palette) ?? "indigo"),
                        )}
                      />
                      <span className="block p-4">
                        <span className="block truncate font-bold text-ink">{p.title}</span>
                        <span className="mt-1 block truncate text-sm text-muted-foreground">
                          {p.prompt || p.content_type}
                        </span>
                        <span className="mt-2 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {p.content_type} · {new Date(p.updated_at).toLocaleDateString()}
                        </span>
                      </span>
                    </Link>
                    <div className="flex justify-end border-t border-border px-3 py-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => void remove(p.id)}
                        aria-label={`Delete ${p.title}`}
                      >
                        <Trash2 /> Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </AuthUiProvider>
  );
}
