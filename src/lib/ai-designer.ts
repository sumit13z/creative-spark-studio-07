/**
 * Client-side facade for the AI Designer.
 *
 * Components only ever call `generateDesign` / `saveDesign` from here.
 * Generation runs in a backend function (the AI key must never reach the
 * browser); everything else is a row-level-security protected Data API call.
 * Because nothing here needs an application server, the frontend can be
 * deployed as a purely static bundle.
 */
import { supabase } from "@/integrations/supabase/client";

import { saveProjectDraft, type SaveProjectInput } from "./projects-data";
import {
  designSchema,
  generateRequestSchema,
  type ContentType,
  type GenerateRequest,
  type GeneratedDesign,
  type Palette,
} from "./design-schema";

export type GenerateResult = { design: GeneratedDesign; durationMs: number };

/** Backend endpoint holding the model + provider. Swap it here only. */
const GENERATE_FUNCTION = "generate-design";

export async function generateDesign(req: GenerateRequest): Promise<GenerateResult> {
  const data = generateRequestSchema.parse(req);
  const started = Date.now();

  const { data: result, error } = await supabase.functions.invoke(GENERATE_FUNCTION, {
    body: data,
  });

  if (error) {
    let message = error.message;
    const response = (error as { context?: Response }).context;
    if (response && typeof response.json === "function") {
      try {
        const payload = (await response.clone().json()) as { error?: string };
        if (payload?.error) message = payload.error;
      } catch {
        // keep the transport-level message
      }
    }
    throw new Error(message || "Generation failed");
  }

  const payload = result as { design?: unknown; model?: string } | null;
  const parsed = designSchema.safeParse(payload?.design);
  if (!parsed.success) {
    throw new Error("The AI returned an unusable draft. Try rephrasing your brief.");
  }

  const design: GeneratedDesign = {
    ...parsed.data,
    pages: parsed.data.pages.slice(0, data.pageCount),
    variations: parsed.data.variations.slice(0, 4),
    model: payload?.model ?? "ai",
    contentType: data.contentType as ContentType,
    palette: data.palette as Palette,
  };

  return { design, durationMs: Date.now() - started };
}

export type SaveArgs = SaveProjectInput;

export async function saveDesign(args: SaveArgs) {
  return saveProjectDraft(args);
}

export * from "./design-schema";
