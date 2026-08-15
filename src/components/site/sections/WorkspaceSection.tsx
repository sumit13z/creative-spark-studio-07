import { Folder, MessageSquare, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "../Reveal";
import { AppFrame, Avatars, DesignThumb } from "../mockups";
import { useAuthUi } from "../AuthProvider";

const sidebar = ["Home", "My Projects", "Templates", "Brand Kit", "Assets", "Shared With Me", "Trash"];
const projects = [
  { name: "Q3 Investor Update", variant: "report", palette: "indigo" },
  { name: "Launch Campaign", variant: "social", palette: "amber" },
  { name: "Onboarding Guide", variant: "infographic", palette: "violet" },
  { name: "Sales Deck v4", variant: "deck", palette: "teal" },
] as const;

export function WorkspaceSection() {
  const { open } = useAuthUi();
  return (
    <section id="workspace" className="border-y border-border bg-surface py-20 lg:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Workspace"
          title={
            <>
              Everything your team needs, <span className="text-gradient">in one workspace</span>
            </>
          }
          description="Projects, folders, shared work, brand assets and people — organised, searchable and permissioned."
        />
        <Reveal delay={100} className="mt-12">
          <AppFrame label="visualy.ai / workspace">
            <div className="grid lg:grid-cols-[190px_1fr]">
              <aside className="hidden border-r border-border bg-surface p-3 lg:block">
                <ul className="space-y-1">
                  {sidebar.map((s, i) => (
                    <li key={s}>
                      <span
                        className={
                          i === 1
                            ? "flex items-center gap-2 rounded-xl bg-primary-soft px-3 py-2 text-sm font-semibold text-accent-foreground"
                            : "flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground"
                        }
                      >
                        <Folder className="size-4" /> {s}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-2xl border border-border bg-card p-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Team</p>
                  <Avatars className="mt-2" names={["Ada Reyes", "Milo Fenn", "Sana Okoye", "Ivo Lange"]} />
                </div>
              </aside>
              <div className="p-5">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
                  <div className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2">
                    <Search className="size-4 shrink-0 text-muted-foreground" />
                    <span className="truncate text-sm text-muted-foreground">Search projects, templates, assets…</span>
                  </div>
                  <Button variant="brand" size="sm" onClick={() => open("signup")}>
                    Create New
                  </Button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["All", "Presentations", "Reports", "Social", "Shared", "Recent"].map((f, i) => (
                    <span
                      key={f}
                      className={
                        i === 0
                          ? "rounded-full gradient-brand px-3 py-1 text-[11px] font-bold text-primary-foreground"
                          : "rounded-full border border-border px-3 py-1 text-[11px] font-medium text-muted-foreground"
                      }
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {projects.map((p) => (
                    <li
                      key={p.name}
                      className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lift"
                    >
                      <div className="aspect-[4/3] border-b border-border">
                        <DesignThumb variant={p.variant} palette={p.palette} />
                      </div>
                      <div className="p-3">
                        <p className="truncate text-sm font-semibold text-ink">{p.name}</p>
                        <p className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                          <Users className="size-3" /> Shared · edited 2h ago
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground">
                  <MessageSquare className="size-4 text-primary" />
                  <span className="truncate">
                    <span className="font-semibold text-ink">Sana</span> commented on “Sales Deck v4”
                  </span>
                </div>
              </div>
            </div>
          </AppFrame>
        </Reveal>
      </div>
    </section>
  );
}
