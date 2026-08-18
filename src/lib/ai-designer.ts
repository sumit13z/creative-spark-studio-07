/**
 * Client-side facade for the AI Designer.
 *
 * Components only ever call `generateDesign` / `saveDesign` from here, so the
 * model, provider or even the whole generation backend can be swapped by
 * changing the server functions this file delegates to.
 */
import { generateDesignDraft } from "./ai-designer.functions";
import { saveProjectDraft } from "./projects.functions";
import { generateRequestSchema, type GenerateRequest, type GeneratedDesign } from "./design-schema";

export type GenerateResult = { design: GeneratedDesign; durationMs: number };

export async function generateDesign(req: GenerateRequest): Promise<GenerateResult> {
  const data = generateRequestSchema.parse(req);
  const started = Date.now();
  const design = await generateDesignDraft({ data });
  return { design, durationMs: Date.now() - started };
}

export type SaveArgs = Parameters<typeof saveProjectDraft>[0] extends { data: infer D } ? D : never;

export async function saveDesign(args: SaveArgs) {
  return saveProjectDraft({ data: args });
}

export * from "./design-schema";
