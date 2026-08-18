import { createServerFn } from "@tanstack/react-start";
import { generateObject, NoObjectGeneratedError } from "ai";

import {
  designSchema,
  generateRequestSchema,
  type ContentType,
  type GeneratedDesign,
  type Palette,
} from "./design-schema";

function systemPrompt(pageCount: number) {
  return [
    "You are the lead designer and copywriter of Visualy AI, a visual content platform.",
    "You draft real, specific, publishable content — never lorem ipsum and never placeholders.",
    `Produce exactly ${pageCount} pages. Page 1 is always kind \"cover\".`,
    "Use a mix of kinds: content, stats, chart, quote. At least one page must include chart data with 3-6 labels and matching numeric values.",
    "Bullets are short (max 12 words). Stats use compact values like \"38%\" or \"$4.2M\".",
    "Set bullets to [] and stats to [] when not relevant; set subheading and chart to null when not relevant.",
    "Also propose 4 distinct visual variations (label + one-line styleNote + palette from indigo, violet, teal, amber, ink).",
  ].join(" ");
}

export const generateDesignDraft = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => generateRequestSchema.parse(input))
  .handler(async ({ data }): Promise<GeneratedDesign> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured for this project.");

    const { createLovableAiGatewayProvider, DESIGN_MODEL } = await import("./ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(apiKey);

    const userPrompt = [
      `Brief: ${data.prompt}`,
      `Format: ${data.contentType}`,
      `Tone: ${data.tone}`,
      `Audience: ${data.audience}`,
      `Brand palette: ${data.palette}`,
      data.variationSeed
        ? `This is regeneration #${data.variationSeed} — keep the brief but take a noticeably different angle, structure and wording.`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const { object } = await generateObject({
        model: gateway(DESIGN_MODEL),
        schema: designSchema,
        system: systemPrompt(data.pageCount),
        prompt: userPrompt,
      });

      return {
        ...object,
        pages: object.pages.slice(0, data.pageCount),
        variations: object.variations.slice(0, 4),
        model: DESIGN_MODEL,
        contentType: data.contentType as ContentType,
        palette: data.palette as Palette,
      };
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        throw new Error("The AI returned an unusable draft. Try rephrasing your brief.");
      }
      const message = error instanceof Error ? error.message : "Generation failed";
      throw new Error(message);
    }
  });
