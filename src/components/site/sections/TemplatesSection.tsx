import { useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "../Reveal";
import { DesignThumb } from "../mockups";
import { useAuthUi } from "../AuthProvider";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Presentations",
  "Infographics",
  "Reports",
  "Social Media",
  "Business",
  "Marketing",
  "Education",
  "Pitch Decks",
];

type Template = {
  name: string;
  category: string;
  variant: "deck" | "report" | "infographic" | "social" | "chart" | "video" | "board" | "form";
  palette: string;
};

const templates: Template[] = [
  { name: "Series A Narrative", category: "Pitch Decks", variant: "deck", palette: "indigo" },
  { name: "Quarterly Growth Report", category: "Reports", variant: "report", palette: "teal" },
  { name: "Process Explainer", category: "Infographics", variant: "infographic", palette: "violet" },
  { name: "Campaign Launch Set", category: "Social Media", variant: "social", palette: "amber" },
  { name: "Revenue Dashboard", category: "Business", variant: "chart", palette: "indigo" },
  { name: "Product Teaser Reel", category: "Marketing", variant: "video", palette: "violet" },
  { name: "Lesson Plan Deck", category: "Education", variant: "deck", palette: "teal" },
  { name: "Customer Insight Survey", category: "Business", variant: "form", palette: "ink" },
  { name: "Workshop Whiteboard", category: "Education", variant: "board", palette: "amber" },
  { name: "Investor Update", category: "Reports", variant: "report", palette: "indigo" },
];

export function TemplatesSection({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState("All");
  const scroller = useRef<HTMLDivElement>(null);
  const { open } = useAuthUi();

  const shown = active === "All" ? templates : templates.filter((t) => t.category === active);

  const scrollBy = (dir: 1 | -1) => {
    scroller.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <section id="templates" className="py-20 lg:py-28">
      <div className="shell">
        {compact ? null : (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Templates"
              title={
                <>
                  Start faster with professionally <span className="text-gradient">designed templates</span>
                </>
              }
              description="6,000+ layouts built by working designers, ready for your brand kit and your data."
            />
            <div className="hidden shrink-0 gap-2 lg:flex">
              <Button variant="outline" size="icon" aria-label="Scroll left" onClick={() => scrollBy(-1)}>
                <ChevronLeft />
              </Button>
              <Button variant="outline" size="icon" aria-label="Scroll right" onClick={() => scrollBy(1)}>
                <ChevronRight />
              </Button>
            </div>
          </div>
        )}

        <div className="-mx-5 mt-8 overflow-x-auto px-5 pb-1 lg:mx-0 lg:px-0">
          <ul className="flex min-w-max gap-2">
            {categories.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  aria-pressed={active === c}
                  onClick={() => setActive(c)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                    active === c
                      ? "border-transparent gradient-brand text-primary-foreground shadow-soft"
                      : "border-border bg-background text-foreground/70 hover:border-border-strong hover:text-ink",
                  )}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        ref={scroller}
        className="shell mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible"
      >
        {shown.map((t, i) => (
          <Reveal
            key={t.name}
            delay={i * 60}
            className="w-[268px] shrink-0 snap-start sm:w-[300px] lg:w-auto"
          >
            <article className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
              <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
                <DesignThumb variant={t.variant} palette={t.palette} />
                <div className="absolute inset-0 grid place-items-center bg-ink/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <Button variant="brand" size="sm" onClick={() => open("signup")}>
                    Use Template <ArrowRight />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                  {t.category}
                </p>
                <h3 className="mt-1 text-[15px] font-bold">{t.name}</h3>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="shell mt-8 flex justify-center">
        <Button variant="outline" size="lg" onClick={() => open("signup")}>
          View All Templates <ArrowRight />
        </Button>
      </div>
    </section>
  );
}
