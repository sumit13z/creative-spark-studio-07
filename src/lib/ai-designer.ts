/**
 * AI generation service abstraction.
 *
 * Today this returns deterministic mock drafts so the UI can be built and tested.
 * To connect a real model later, replace `generateDesign` with a call to a
 * server function (createServerFn) that proxies your AI provider — the UI only
 * depends on the types below.
 */
export type DesignVariant = "deck" | "report" | "infographic" | "social" | "chart" | "video";

export type GenerateRequest = {
  prompt: string;
  tone?: string;
  audience?: string;
  palette?: string;
};

export type GeneratedSlide = { title: string; bullets: string[] };

export type GeneratedDesign = {
  id: string;
  title: string;
  variant: DesignVariant;
  palette: string;
  slides: GeneratedSlide[];
  layouts: string[];
};

const guess = (prompt: string): { variant: DesignVariant; palette: string } => {
  const p = prompt.toLowerCase();
  if (p.includes("report") || p.includes("quarter")) return { variant: "report", palette: "teal" };
  if (p.includes("infographic")) return { variant: "infographic", palette: "violet" };
  if (p.includes("social") || p.includes("campaign")) return { variant: "social", palette: "amber" };
  if (p.includes("chart") || p.includes("data")) return { variant: "chart", palette: "indigo" };
  if (p.includes("video") || p.includes("reel")) return { variant: "video", palette: "violet" };
  return { variant: "deck", palette: "indigo" };
};

const titleCase = (s: string) =>
  s.trim().replace(/^./, (c) => c.toUpperCase()).slice(0, 64) || "Untitled draft";

export async function generateDesign(req: GenerateRequest): Promise<GeneratedDesign> {
  await new Promise((r) => setTimeout(r, 1500));
  const { variant, palette } = guess(req.prompt);
  const subject = titleCase(req.prompt.replace(/^create (a|an)?/i, ""));

  return {
    id: Math.random().toString(36).slice(2, 9),
    title: subject,
    variant,
    palette: req.palette ?? palette,
    layouts: ["Editorial", "Bold split", "Data-led", "Minimal"],
    slides: [
      { title: "The opportunity", bullets: ["Market context", "Why now", "Our position"] },
      { title: "How it works", bullets: ["Three-step flow", "Proof points", "Outcomes"] },
      { title: "Results", bullets: ["Growth chart", "Key metrics", "Next steps"] },
    ],
  };
}

export const promptSuggestions = [
  "Create a pitch deck for a climate analytics startup",
  "Create a marketing report for Q3 performance",
  "Create an infographic explaining our onboarding",
  "Create a social media campaign for a product launch",
];
