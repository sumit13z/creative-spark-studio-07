import { useEffect, useState } from "react";
import { ArrowRight, Check, Download, Pencil, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "../Reveal";
import { AppFrame, DesignThumb } from "../mockups";
import { useAuthUi } from "../AuthProvider";
import { cn } from "@/lib/utils";

const steps = ["Prompt", "Structure", "Design", "Ready"];

const bullets = [
  "Describe the goal — the AI writes structure and copy",
  "Pick a tone, audience and visual style",
  "Regenerate any single section, not the whole design",
  "Everything lands editable in the full editor",
];

export function AISection() {
  const { open } = useAuthUi();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setStep((s) => (s + 1) % (steps.length + 1)), 1800);
    return () => window.clearInterval(id);
  }, []);

  const active = Math.min(step, steps.length - 1);

  return (
    <section id="ai" className="py-20 lg:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="AI Designer"
            title={
              <>
                Turn an idea into a polished design <span className="text-gradient">in seconds</span>
              </>
            }
            description="The AI Designer is not a template picker. It plans your narrative, writes the words, chooses the layout and applies your brand — then hands you a fully editable file."
          />
          <ul className="mt-7 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex gap-3 text-[15px] text-foreground/80">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary-soft">
                  <Check className="size-3 text-primary" />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="brand" size="lg" onClick={() => open("signup")}>
              <Sparkles /> Try the AI Designer
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#templates">See what it makes</a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <AppFrame label="ai-designer / new draft">
            <div className="border-b border-border bg-surface p-5">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
                <Sparkles className="size-4 shrink-0 text-primary" />
                <span className="truncate text-sm text-foreground/80">
                  “A 10-slide investor update with our Q3 metrics”
                </span>
              </div>
              <ol className="mt-4 flex items-center gap-2">
                {steps.map((s, i) => (
                  <li key={s} className="flex flex-1 items-center gap-2">
                    <span
                      className={cn(
                        "grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold transition-colors",
                        i <= active
                          ? "gradient-brand text-primary-foreground"
                          : "bg-surface-2 text-muted-foreground",
                      )}
                    >
                      {i < active ? "✓" : i + 1}
                    </span>
                    <span
                      className={cn(
                        "hidden text-[11px] font-semibold uppercase tracking-wider sm:block",
                        i <= active ? "text-ink" : "text-muted-foreground",
                      )}
                    >
                      {s}
                    </span>
                    {i < steps.length - 1 ? (
                      <span className="h-px flex-1 bg-border" aria-hidden="true" />
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>

            <div className="p-5">
              <div className="overflow-hidden rounded-xl border border-border">
                <div className="aspect-[16/9]">
                  {active < 2 ? (
                    <div className="grid h-full grid-rows-3 gap-2 bg-surface p-4">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="rounded-lg skeleton-shimmer" />
                      ))}
                    </div>
                  ) : (
                    <DesignThumb key={active} variant="deck" palette="indigo" />
                  )}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {["Editorial", "Bold split", "Data-led", "Minimal"].map((l, i) => (
                  <div
                    key={l}
                    className={cn(
                      "overflow-hidden rounded-lg border bg-card",
                      i === 0 ? "border-primary ring-2 ring-primary/20" : "border-border",
                    )}
                  >
                    <span className="block h-12">
                      <DesignThumb
                        variant={i % 2 ? "report" : "deck"}
                        palette={["indigo", "violet", "teal", "amber"][i] ?? "indigo"}
                      />
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw /> Regenerate
                </Button>
                <Button variant="outline" size="sm" onClick={() => open("signup")}>
                  <Pencil /> Edit
                </Button>
                <Button variant="soft" size="sm" onClick={() => open("signup")}>
                  <Download /> Download
                </Button>
                <Button variant="ghost" size="sm" className="ml-auto" onClick={() => open("signup")}>
                  Save to Projects <ArrowRight />
                </Button>
              </div>
            </div>
          </AppFrame>
        </Reveal>
      </div>
    </section>
  );
}
