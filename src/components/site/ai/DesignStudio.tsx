import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  FolderPlus,
  Loader2,
  RefreshCw,
  Sparkles,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AppFrame } from "../mockups";
import { useAuthUi } from "../AuthProvider";
import { useAuth } from "@/hooks/useAuth";
import { DesignCanvas, paletteGradient } from "./DesignCanvas";
import { generateDesign, saveDesign } from "@/lib/ai-designer";
import {
  audiences,
  contentTypes,
  generationStages,
  palettes,
  promptSuggestions,
  tones,
  type ContentType,
  type GeneratedDesign,
  type Palette,
} from "@/lib/design-schema";

type Step = "brief" | "config" | "generating" | "ready";

const densityFor = (i: number) =>
  (["comfortable", "editorial", "tight", "comfortable"] as const)[i % 4] ?? "comfortable";

export function DesignStudio({
  initialDesign,
  initialProjectId,
  initialTitle,
  className,
}: {
  initialDesign?: GeneratedDesign;
  initialProjectId?: string;
  initialTitle?: string;
  className?: string;
}) {
  const { open } = useAuthUi();
  const { user } = useAuth();

  const [step, setStep] = useState<Step>(initialDesign ? "ready" : "brief");
  const [prompt, setPrompt] = useState(initialTitle ?? "");
  const [contentType, setContentType] = useState<ContentType>(initialDesign?.contentType ?? "deck");
  const [tone, setTone] = useState<string>("Confident");
  const [audience, setAudience] = useState<string>("Investors");
  const [palette, setPalette] = useState<Palette>(initialDesign?.palette ?? "indigo");
  const [pageCount, setPageCount] = useState(5);

  const [design, setDesign] = useState<GeneratedDesign | null>(initialDesign ?? null);
  const [variation, setVariation] = useState(0);
  const [page, setPage] = useState(0);
  const [stage, setStage] = useState(0);
  const [runs, setRuns] = useState(0);
  const [durationMs, setDurationMs] = useState(0);
  const [saving, setSaving] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(initialProjectId ?? null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (step !== "generating") return;
    setStage(0);
    const id = window.setInterval(
      () => setStage((s) => Math.min(s + 1, generationStages.length - 1)),
      1400,
    );
    return () => window.clearInterval(id);
  }, [step]);

  const activeVariation = design?.variations[variation];
  const activePalette: Palette = activeVariation?.palette ?? palette;
  const pages = design?.pages ?? [];
  const currentPage = pages[Math.min(page, Math.max(pages.length - 1, 0))];
  const grad = useMemo(() => paletteGradient(activePalette), [activePalette]);

  async function run(nextPrompt = prompt, regenerate = false) {
    if (!nextPrompt.trim()) {
      toast.error("Describe what you want to create first");
      return;
    }
    setError(null);
    setStep("generating");
    try {
      const seed = regenerate ? runs + 1 : 0;
      const { design: result, durationMs: ms } = await generateDesign({
        prompt: nextPrompt,
        contentType,
        tone,
        audience,
        palette,
        pageCount,
        variationSeed: seed,
      });
      setDesign(result);
      setDurationMs(ms);
      setRuns(seed);
      setVariation(0);
      setPage(0);
      setStep("ready");
      if (regenerate) toast.success("New direction generated");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Generation failed";
      setError(message);
      setStep(design ? "ready" : "config");
      toast.error("Generation failed", { description: message });
    }
  }

  async function save() {
    if (!design) return;
    if (!user) {
      open("signup");
      toast.info("Create a free account to save this project");
      return;
    }
    setSaving(true);
    try {
      const result = await saveDesign({
        projectId,
        title: design.title,
        prompt,
        contentType,
        tone,
        audience,
        palette: activePalette,
        variantLabel: activeVariation?.label ?? "Original",
        design,
        model: design.model,
        durationMs,
      });
      setProjectId(result.projectId);
      toast.success("Saved to your projects", { description: `Version ${result.version}` });
    } catch (e) {
      toast.error("Could not save", {
        description: e instanceof Error ? e.message : "Please try again.",
      });
    } finally {
      setSaving(false);
    }
  }

  function exportJson() {
    if (!design) return;
    const blob = new Blob([JSON.stringify(design, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${design.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AppFrame label="visualy.ai / ai-designer" className={cn("text-left", className)}>
      <div className="grid gap-0 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* Left: brief + configuration */}
        <div className="border-b border-border p-6 lg:border-b-0 lg:border-r lg:p-8">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">AI Designer</p>
            <Stepper step={step} />
          </div>

          <h2 className="mt-2 text-2xl font-extrabold">
            {step === "brief"
              ? "What do you want to create?"
              : step === "config"
                ? "Tune the direction"
                : step === "generating"
                  ? "Designing your draft…"
                  : design?.title}
          </h2>

          {step === "brief" ? (
            <>
              <form
                className="mt-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (prompt.trim()) setStep("config");
                }}
              >
                <div className="flex items-center gap-2 rounded-2xl border border-border-strong bg-surface p-2 pl-3.5 shadow-soft focus-within:ring-2 focus-within:ring-ring/40">
                  <Wand2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <label htmlFor="studio-prompt" className="sr-only">
                    Describe what you want to create
                  </label>
                  <input
                    id="studio-prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to create…"
                    className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  />
                  <Button type="submit" variant="brand" size="sm">
                    Continue <ArrowRight />
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
                      onClick={() => {
                        setPrompt(s);
                        setStep("config");
                      }}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-left text-[13px] text-foreground/75 transition-colors hover:border-primary/40 hover:bg-primary-soft hover:text-accent-foreground"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {step === "config" ? (
            <div className="mt-5 space-y-5">
              <p className="rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground/80">
                “{prompt}”
              </p>
              <Field label="Format">
                <div className="flex flex-wrap gap-2">
                  {contentTypes.map((c) => (
                    <Chip
                      key={c.id}
                      active={contentType === c.id}
                      onClick={() => setContentType(c.id)}
                      title={c.hint}
                    >
                      {c.label}
                    </Chip>
                  ))}
                </div>
              </Field>
              <Field label="Tone">
                <div className="flex flex-wrap gap-2">
                  {tones.map((t) => (
                    <Chip key={t} active={tone === t} onClick={() => setTone(t)}>
                      {t}
                    </Chip>
                  ))}
                </div>
              </Field>
              <Field label="Audience">
                <div className="flex flex-wrap gap-2">
                  {audiences.map((a) => (
                    <Chip key={a} active={audience === a} onClick={() => setAudience(a)}>
                      {a}
                    </Chip>
                  ))}
                </div>
              </Field>
              <Field label="Brand palette">
                <div className="flex flex-wrap gap-2">
                  {palettes.map((p) => (
                    <button
                      key={p}
                      type="button"
                      aria-label={p}
                      aria-pressed={palette === p}
                      onClick={() => setPalette(p)}
                      className={cn(
                        "size-8 rounded-full bg-gradient-to-br ring-offset-2 ring-offset-background transition-all",
                        paletteGradient(p),
                        palette === p ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100",
                      )}
                    />
                  ))}
                </div>
              </Field>
              <Field label={`Pages · ${pageCount}`}>
                <input
                  type="range"
                  min={3}
                  max={8}
                  value={pageCount}
                  onChange={(e) => setPageCount(Number(e.target.value))}
                  className="w-full accent-[var(--primary)]"
                />
              </Field>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <div className="flex flex-wrap gap-2">
                <Button variant="brand" size="lg" onClick={() => void run()}>
                  <Sparkles /> Generate design
                </Button>
                <Button variant="ghost" size="lg" onClick={() => setStep("brief")}>
                  <ArrowLeft /> Edit brief
                </Button>
              </div>
            </div>
          ) : null}

          {step === "generating" ? (
            <div className="mt-6 space-y-3">
              {generationStages.map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold",
                      i < stage
                        ? "gradient-brand text-primary-foreground"
                        : i === stage
                          ? "bg-primary-soft text-primary"
                          : "bg-surface-2 text-muted-foreground",
                    )}
                  >
                    {i < stage ? <Check className="size-3" /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      i <= stage ? "font-medium text-ink" : "text-muted-foreground",
                    )}
                  >
                    {s}
                  </span>
                  {i === stage ? (
                    <Loader2 className="size-3.5 animate-spin text-primary" aria-hidden="true" />
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}

          {step === "ready" && design ? (
            <div className="mt-4 space-y-5">
              <p className="text-sm text-muted-foreground">{design.summary}</p>
              <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <Meta>{design.pages.length} pages</Meta>
                <Meta>{contentType}</Meta>
                <Meta>{tone}</Meta>
                <Meta>{(durationMs / 1000).toFixed(1)}s</Meta>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Design variations
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {design.variations.map((v, i) => (
                    <button
                      key={`${v.label}-${i}`}
                      type="button"
                      aria-pressed={variation === i}
                      onClick={() => setVariation(i)}
                      className={cn(
                        "rounded-xl border bg-card p-2 text-left transition-all hover:-translate-y-0.5",
                        variation === i
                          ? "border-primary ring-2 ring-primary/25"
                          : "border-border",
                      )}
                    >
                      <span className="block h-14 overflow-hidden rounded-lg border border-border">
                        {currentPage ? (
                          <DesignCanvas
                            page={currentPage}
                            palette={v.palette}
                            density={densityFor(i)}
                            compact
                          />
                        ) : null}
                      </span>
                      <span className="mt-1.5 block truncate text-[12px] font-semibold text-ink">
                        {v.label}
                      </span>
                      <span className="block truncate text-[11px] text-muted-foreground">
                        {v.styleNote}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => void run(prompt, true)}>
                  <RefreshCw /> Regenerate
                </Button>
                <Button variant="outline" size="sm" onClick={() => setStep("config")}>
                  <Wand2 /> Change settings
                </Button>
                <Button variant="soft" size="sm" onClick={exportJson}>
                  <Download /> Export
                </Button>
                <Button variant="brand" size="sm" disabled={saving} onClick={() => void save()}>
                  {saving ? <Loader2 className="animate-spin" /> : <FolderPlus />}
                  {projectId ? "Save new version" : "Save project"}
                </Button>
              </div>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
            </div>
          ) : null}
        </div>

        {/* Right: canvas */}
        <div className="bg-surface p-6 lg:p-8">
          {step === "ready" && design && currentPage ? (
            <div className="animate-fade-up">
              <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
                <div className="aspect-[16/9]">
                  <DesignCanvas
                    key={`${variation}-${page}-${runs}`}
                    page={currentPage}
                    palette={activePalette}
                    density={densityFor(variation)}
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {pages.map((p, i) => (
                  <button
                    key={`${p.heading}-${i}`}
                    type="button"
                    aria-pressed={page === i}
                    onClick={() => setPage(i)}
                    className={cn(
                      "w-28 shrink-0 overflow-hidden rounded-lg border bg-card transition-all hover:-translate-y-0.5",
                      page === i ? "border-primary ring-2 ring-primary/25" : "border-border",
                    )}
                  >
                    <span className="block aspect-[16/9]">
                      <DesignCanvas page={p} palette={activePalette} compact />
                    </span>
                    <span className="block truncate px-2 py-1 text-[10px] font-medium text-muted-foreground">
                      {i + 1}. {p.heading}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : step === "generating" ? (
            <div className="min-h-[320px]">
              <div className="flex items-center gap-2 text-sm font-medium text-ink">
                <Sparkles className="size-4 animate-pulse text-primary" />
                {generationStages[stage]}…
              </div>
              <div className="mt-5 overflow-hidden rounded-2xl border border-border">
                <div className="aspect-[16/9] skeleton-shimmer" />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="aspect-[16/9] rounded-lg skeleton-shimmer" />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid h-full min-h-[320px] place-items-center">
              <div className="max-w-sm text-center">
                <span
                  className={cn(
                    "mx-auto grid size-12 place-items-center rounded-2xl bg-gradient-to-br",
                    grad,
                  )}
                >
                  <Sparkles className="size-6 text-primary-foreground" />
                </span>
                <p className="mt-4 text-base font-bold text-ink">
                  Your draft appears here in seconds
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Real structure, real copy, real charts — generated for your brief, then editable
                  page by page.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppFrame>
  );
}

function Stepper({ step }: { step: Step }) {
  const order: Step[] = ["brief", "config", "generating", "ready"];
  const index = order.indexOf(step);
  return (
    <ol className="flex items-center gap-1.5" aria-label="Progress">
      {order.map((s, i) => (
        <li
          key={s}
          className={cn(
            "h-1.5 rounded-full transition-all",
            i <= index ? "w-6 gradient-brand" : "w-3 bg-surface-2",
          )}
        />
      ))}
    </ol>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  title,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors",
        active
          ? "border-primary bg-primary-soft text-accent-foreground"
          : "border-border bg-background text-foreground/75 hover:border-primary/40",
      )}
    >
      {children}
    </button>
  );
}

function Meta({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] text-muted-foreground">
      {children}
    </span>
  );
}
