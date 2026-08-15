import { useState } from "react";
import { ArrowRight, Download, Pencil, RefreshCw, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "../Reveal";
import { AppFrame, Avatars, DesignThumb } from "../mockups";
import { useAuthUi } from "../AuthProvider";
import { generateDesign, promptSuggestions, type GeneratedDesign } from "@/lib/ai-designer";
import { cn } from "@/lib/utils";

export function Hero() {
  const { open } = useAuthUi();

  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 gradient-mesh" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"
        aria-hidden="true"
      />
      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-xs font-semibold text-accent-foreground shadow-soft">
              <Sparkles className="size-3.5 text-primary" />
              AI Designer now drafts full decks, reports and video
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.03] tracking-tight sm:text-6xl lg:text-[4.25rem]">
              Create stunning visual content <span className="text-gradient">with AI</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Design presentations, reports, infographics, social content and more in minutes with an
              AI-powered visual content platform built for modern teams.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="brand" size="xl" onClick={() => open("signup")}>
                Start Creating Free <ArrowRight />
              </Button>
              <Button variant="outline" size="xl" asChild>
                <a href="#templates">Explore Templates</a>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Avatars names={["Ada Reyes", "Milo Fenn", "Sana Okoye", "Ivo Lange", "Tess Marín"]} />
              <p className="text-sm text-muted-foreground">
                Loved by <span className="font-semibold text-ink">10M+</span> creators
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="mx-auto mt-14 max-w-5xl">
          <AiPromptStudio />
        </Reveal>
      </div>
    </section>
  );
}

type Phase = "idle" | "loading" | "done";

function AiPromptStudio() {
  const [prompt, setPrompt] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [design, setDesign] = useState<GeneratedDesign | null>(null);
  const [layout, setLayout] = useState(0);
  const { open } = useAuthUi();

  async function run(text: string) {
    if (!text.trim()) return;
    setPrompt(text);
    setPhase("loading");
    const result = await generateDesign({ prompt: text });
    setDesign(result);
    setLayout(0);
    setPhase("done");
  }

  return (
    <AppFrame label={`visualy.ai / ai-designer`} className="text-left">
      <div className="grid gap-0 lg:grid-cols-[1fr_1.15fr]">
        <div className="border-b border-border p-6 lg:border-b-0 lg:border-r lg:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">AI Designer</p>
          <h2 className="mt-2 text-2xl font-extrabold">What do you want to create today?</h2>
          <form
            className="mt-5"
            onSubmit={(e) => {
              e.preventDefault();
              void run(prompt);
            }}
          >
            <div className="flex items-center gap-2 rounded-2xl border border-border-strong bg-surface p-2 pl-3.5 shadow-soft transition-shadow focus-within:ring-2 focus-within:ring-ring/40">
              <Wand2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <label htmlFor="hero-prompt" className="sr-only">
                Describe what you want to create
              </label>
              <input
                id="hero-prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create…"
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <Button type="submit" variant="brand" size="sm" disabled={phase === "loading"}>
                {phase === "loading" ? "Generating…" : "Generate"}
              </Button>
            </div>
          </form>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Try one of these
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {promptSuggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => void run(s)}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-[13px] text-foreground/75 transition-colors hover:border-primary/40 hover:bg-primary-soft hover:text-accent-foreground"
                >
                  {s.replace("Create ", "")}
                </button>
              </li>
            ))}
          </ul>
          {phase === "done" && design ? (
            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => void run(prompt)}>
                <RefreshCw /> Regenerate
              </Button>
              <Button variant="outline" size="sm" onClick={() => open("signup")}>
                <Pencil /> Edit design
              </Button>
              <Button variant="soft" size="sm" onClick={() => open("signup")}>
                <Download /> Download
              </Button>
            </div>
          ) : null}
        </div>

        <div className="bg-surface p-6 lg:p-8">
          {phase === "idle" ? (
            <div className="grid h-full min-h-[300px] grid-cols-2 gap-3">
              {(["deck", "chart", "infographic", "social"] as const).map((v, i) => (
                <div
                  key={v}
                  className="overflow-hidden rounded-xl border border-border bg-card shadow-soft"
                  style={{ animation: `fade-up 0.7s ${i * 0.12}s both` }}
                >
                  <DesignThumb variant={v} palette={["indigo", "teal", "violet", "amber"][i]} />
                </div>
              ))}
            </div>
          ) : null}

          {phase === "loading" ? (
            <div className="min-h-[300px]">
              <div className="flex items-center gap-2 text-sm font-medium text-ink">
                <Sparkles className="size-4 animate-pulse text-primary" />
                Drafting structure, copy and layout…
              </div>
              <div className="mt-5 space-y-3">
                {["Outlining sections", "Writing content", "Applying brand styles", "Rendering pages"].map(
                  (step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                        <span
                          className="block h-full rounded-full gradient-brand"
                          style={{ animation: `fade-up 0.5s ${i * 0.3}s both`, width: `${100 - i * 12}%` }}
                        />
                      </span>
                      <span className="w-36 shrink-0 text-xs text-muted-foreground">{step}</span>
                    </div>
                  ),
                )}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-24 rounded-xl skeleton-shimmer" />
                ))}
              </div>
            </div>
          ) : null}

          {phase === "done" && design ? (
            <div className="min-h-[300px] animate-fade-up">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-ink">{design.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {design.slides.length * 3} pages · {design.variant} · on brand
                  </p>
                </div>
                <span className="rounded-full bg-teal/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
                  Draft ready
                </span>
              </div>
              <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
                <div className="aspect-[16/9]">
                  <DesignThumb
                    key={`${design.id}-${layout}`}
                    variant={design.variant === "video" ? "video" : design.variant}
                    palette={design.palette}
                  />
                </div>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Suggested layouts
              </p>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {design.layouts.map((l, i) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLayout(i)}
                    aria-pressed={layout === i}
                    className={cn(
                      "overflow-hidden rounded-lg border bg-card text-left transition-all hover:-translate-y-0.5",
                      layout === i ? "border-primary ring-2 ring-primary/25" : "border-border",
                    )}
                  >
                    <span className="block h-14">
                      <DesignThumb
                        variant={i % 2 === 0 ? "deck" : "report"}
                        palette={["indigo", "violet", "teal", "amber"][i]}
                      />
                    </span>
                    <span className="block truncate px-2 py-1.5 text-[11px] font-medium text-muted-foreground">
                      {l}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </AppFrame>
  );
}
