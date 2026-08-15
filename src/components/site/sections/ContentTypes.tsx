import { ArrowRight } from "lucide-react";
import { Reveal, SectionHeading } from "../Reveal";
import { DesignThumb } from "../mockups";
import { useAuthUi } from "../AuthProvider";

const types = [
  { title: "Presentations", desc: "Narrative decks with presenter view and speaker notes.", variant: "deck", palette: "indigo" },
  { title: "Documents", desc: "Proposals, one-pagers and ebooks that read beautifully.", variant: "report", palette: "teal" },
  { title: "Infographics", desc: "Turn dense processes into a single clear visual.", variant: "infographic", palette: "violet" },
  { title: "Data Visualizations", desc: "Connect data and let charts update themselves.", variant: "chart", palette: "indigo" },
  { title: "Social Media", desc: "Every format, resized and on brand automatically.", variant: "social", palette: "amber" },
  { title: "Videos", desc: "Animated stories built from your slides.", variant: "video", palette: "violet" },
  { title: "Whiteboards", desc: "Workshop, map and decide together in real time.", variant: "board", palette: "amber" },
  { title: "Forms & Surveys", desc: "Beautiful forms with visual result summaries.", variant: "form", palette: "ink" },
  { title: "Reports", desc: "Recurring reporting that rebuilds on schedule.", variant: "report", palette: "indigo" },
  { title: "Charts", desc: "40+ chart types with live, editable data.", variant: "chart", palette: "teal" },
] as const;

export function ContentTypes() {
  const { open } = useAuthUi();
  return (
    <section id="create" className="border-y border-border bg-surface py-20 lg:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="One platform"
          title={
            <>
              Ten kinds of content, <span className="text-gradient">one workflow</span>
            </>
          }
          description="Stop stitching tools together. Draft, design, brand, publish and measure everything in the same workspace."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {types.map((t, i) => (
            <Reveal as="li" key={t.title} delay={(i % 5) * 70}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lift">
                <div className="aspect-[4/3] overflow-hidden border-b border-border transition-transform duration-500 group-hover:scale-[1.03]">
                  <DesignThumb variant={t.variant} palette={t.palette} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-bold">{t.title}</h3>
                  <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                    {t.desc}
                  </p>
                  <button
                    type="button"
                    onClick={() => open("signup")}
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary transition-transform group-hover:translate-x-0.5"
                  >
                    Create one <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
