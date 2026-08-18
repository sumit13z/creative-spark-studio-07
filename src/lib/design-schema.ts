import { z } from "zod";

/**
 * Shared, browser-safe contract for the AI Designer.
 * The UI depends only on these types — the model/provider behind
 * `generateDesignDraft` can change without touching components.
 */

export const contentTypes = [
  { id: "deck", label: "Presentation", hint: "Slide-based narrative" },
  { id: "report", label: "Report", hint: "Long-form document" },
  { id: "infographic", label: "Infographic", hint: "One visual explainer" },
  { id: "social", label: "Social post", hint: "Square campaign asset" },
  { id: "chart", label: "Data viz", hint: "Charts and metrics" },
] as const;

export type ContentType = (typeof contentTypes)[number]["id"];

export const tones = ["Confident", "Friendly", "Editorial", "Technical", "Playful"] as const;
export const audiences = ["Investors", "Customers", "Executives", "Team", "Students"] as const;
export const palettes = ["indigo", "violet", "teal", "amber", "ink"] as const;
export type Palette = (typeof palettes)[number];

export const generateRequestSchema = z.object({
  prompt: z.string().min(3).max(600),
  contentType: z.enum(["deck", "report", "infographic", "social", "chart"]).default("deck"),
  tone: z.string().max(40).default("Confident"),
  audience: z.string().max(40).default("Customers"),
  palette: z.enum(palettes).default("indigo"),
  pageCount: z.number().int().min(3).max(8).default(5),
  variationSeed: z.number().int().min(0).max(9999).default(0),
});

export type GenerateRequest = z.input<typeof generateRequestSchema>;

export const pageSchema = z.object({
  kind: z.enum(["cover", "content", "stats", "chart", "quote"]),
  heading: z.string(),
  subheading: z.string().nullable(),
  bullets: z.array(z.string()),
  stats: z.array(z.object({ value: z.string(), label: z.string() })),
  chart: z
    .object({
      title: z.string(),
      labels: z.array(z.string()),
      values: z.array(z.number()),
    })
    .nullable(),
});

export const variationSchema = z.object({
  label: z.string(),
  styleNote: z.string(),
  palette: z.enum(palettes),
});

export const designSchema = z.object({
  title: z.string(),
  summary: z.string(),
  pages: z.array(pageSchema),
  variations: z.array(variationSchema),
});

export type DesignPage = z.infer<typeof pageSchema>;
export type DesignVariation = z.infer<typeof variationSchema>;
export type GeneratedDesign = z.infer<typeof designSchema> & {
  model: string;
  contentType: ContentType;
  palette: Palette;
};

export const promptSuggestions = [
  "Pitch deck for a climate analytics startup raising a Series A",
  "Q3 marketing performance report with channel breakdown",
  "Infographic explaining our 3-step onboarding",
  "Launch campaign post for an AI note-taking app",
];

export const generationStages = [
  "Understanding the brief",
  "Outlining the narrative",
  "Writing the copy",
  "Composing layouts",
  "Applying brand styles",
];
