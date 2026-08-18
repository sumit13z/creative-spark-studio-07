import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

import { designSchema, palettes } from "./design-schema";

const saveInput = z.object({
  projectId: z.string().uuid().nullable().default(null),
  title: z.string().min(1).max(160),
  prompt: z.string().max(600),
  contentType: z.string().max(40),
  tone: z.string().max(40).nullable().default(null),
  audience: z.string().max(40).nullable().default(null),
  palette: z.enum(palettes),
  variantLabel: z.string().max(60),
  design: designSchema,
  model: z.string().max(80).nullable().default(null),
  durationMs: z.number().int().nonnegative().nullable().default(null),
});

export const saveProjectDraft = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => saveInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    let projectId = data.projectId;
    const row = {
      user_id: userId,
      title: data.title,
      prompt: data.prompt,
      content_type: data.contentType,
      tone: data.tone,
      audience: data.audience,
      palette: data.palette,
      status: "draft",
      thumbnail_variant: data.contentType,
    };

    if (projectId) {
      const { error } = await supabase.from("projects").update(row).eq("id", projectId);
      if (error) throw new Error(error.message);
    } else {
      const { data: inserted, error } = await supabase
        .from("projects")
        .insert(row)
        .select("id")
        .single();
      if (error) throw new Error(error.message);
      projectId = inserted.id;
    }

    const { count } = await supabase
      .from("designs")
      .select("id", { count: "exact", head: true })
      .eq("project_id", projectId);

    await supabase.from("designs").update({ is_selected: false }).eq("project_id", projectId);

    const { data: design, error: designError } = await supabase
      .from("designs")
      .insert({
        project_id: projectId,
        user_id: userId,
        variant_label: data.variantLabel,
        palette: data.palette,
        content: data.design,
        is_selected: true,
        version: (count ?? 0) + 1,
      })
      .select("id, version")
      .single();
    if (designError) throw new Error(designError.message);

    await supabase.from("generations").insert({
      user_id: userId,
      project_id: projectId,
      prompt: data.prompt,
      settings: {
        contentType: data.contentType,
        tone: data.tone,
        audience: data.audience,
        palette: data.palette,
        variantLabel: data.variantLabel,
      },
      model: data.model,
      status: "succeeded",
      duration_ms: data.durationMs,
    });

    return { projectId, designId: design.id, version: design.version };
  });

export const listProjects = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("projects")
      .select("id, title, prompt, content_type, palette, status, updated_at")
      .order("updated_at", { ascending: false })
      .limit(60);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getProjectDetail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ projectId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: project, error } = await context.supabase
      .from("projects")
      .select("*")
      .eq("id", data.projectId)
      .single();
    if (error) throw new Error(error.message);

    const { data: designs, error: designsError } = await context.supabase
      .from("designs")
      .select("*")
      .eq("project_id", data.projectId)
      .order("version", { ascending: false });
    if (designsError) throw new Error(designsError.message);

    return { project, designs: designs ?? [] };
  });

export const deleteProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ projectId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("projects").delete().eq("id", data.projectId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
