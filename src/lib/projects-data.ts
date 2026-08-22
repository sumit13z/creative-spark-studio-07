/**
 * Browser-side project data access.
 *
 * All of these are ordinary Data API calls protected by row-level security, so
 * they run safely from the browser. Keeping them here (instead of in server
 * functions) is what lets the app be deployed as a static bundle.
 */
import { supabase } from "@/integrations/supabase/client";
import { designSchema, palettes } from "./design-schema";
import { z } from "zod";

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

export type SaveProjectInput = z.input<typeof saveInput>;

async function requireUserId(): Promise<string> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("Please sign in to continue.");
  return data.user.id;
}

export async function saveProjectDraft(input: SaveProjectInput) {
  const data = saveInput.parse(input);
  const userId = await requireUserId();

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
}

export async function listProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, prompt, content_type, palette, status, updated_at")
    .order("updated_at", { ascending: false })
    .limit(60);
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getProjectDetail(projectId: string) {
  const id = z.string().uuid().parse(projectId);

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);

  const { data: designs, error: designsError } = await supabase
    .from("designs")
    .select("*")
    .eq("project_id", id)
    .order("version", { ascending: false });
  if (designsError) throw new Error(designsError.message);

  return { project, designs: designs ?? [] };
}

export async function deleteProject(projectId: string) {
  const id = z.string().uuid().parse(projectId);
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { ok: true };
}
