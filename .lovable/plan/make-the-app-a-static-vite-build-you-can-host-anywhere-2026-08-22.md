# Make the app a static Vite build you can host anywhere

First, a correction on the premise: the project already builds with Vite. Nitro is not the build tool — it only packages the built output into a server bundle (currently targeting an edge worker). What actually ties the app to a server is not Nitro, it's the code: server-rendered routes plus server functions for AI generation and project CRUD.

So the real work is removing the *need* for a server, after which the build emits plain static files (`index.html` + assets) that drop onto S3, GitHub Pages, or nginx. Lovable hosting keeps working unchanged, because a static SPA is served fine there too.

## What has to move

Two things currently run on the server:

1. **Project data** (list projects, open a project, save a draft, delete). These are ordinary database reads/writes protected by row-level security — they work exactly as well from the browser. Straightforward move, no security change.
2. **AI design generation.** This one *cannot* run in the browser: it uses a private AI key, and shipping that key to the browser would let anyone spend your AI credits. It has to stay behind an endpoint.

For #2 the portable answer is a backend function hosted by Lovable Cloud (not by your static host). Your static site calls it over HTTPS, so the site itself stays fully static and portable — the AI key stays server-side. This endpoint stays available regardless of where you host the frontend.

## Trade-offs you should know about

- **No SSR.** Pages render after JavaScript loads. Marketing pages get prerendered to real HTML at build time so crawlers and social previews still see full content; the studio and dashboard become client-rendered.
- **Static hosts need a rewrite rule.** Any unknown path must serve `index.html`, otherwise deep links like `/studio` 404 on refresh. One line of nginx config, or a `404.html` copy for GitHub Pages.
- **Environment values are baked in at build time** (`VITE_*`), so a rebuild is needed to point at a different backend.

## Implementation

**SPA / static output**
- Enable SPA mode in `vite.config.ts` via `@lovable.dev/vite-tanstack-config` (`spa.enabled`), with a prerender list for `/`, `/pricing`, `/templates`.
- Keep the Nitro-based worker output as the default so Lovable Publish is untouched; the static assets are the same client build, emitted alongside.
- Add a `build:static` script and a small `deploy/` note with the nginx `try_files` snippet and the GitHub Pages `404.html` step.

**Project data to the browser**
- Add `src/lib/projects.client.ts` with `listProjects`, `getProjectDetail`, `saveProjectDraft`, `deleteProject` using the generated browser Supabase client, matching the current return shapes.
- Point `src/routes/_authenticated/projects.tsx`, `projects.$projectId.tsx` and `src/lib/ai-designer.ts` at it; drop `useServerFn` there.
- Delete `src/lib/projects.functions.ts` once nothing imports it.

**AI generation to a portable endpoint**
- Add a Cloud backend function `generate-design` holding the current logic from `ai-designer.functions.ts` (Zod validation, structured generation, model constant), requiring a signed-in user's token.
- `src/lib/ai-designer.ts` stays the single client facade — it just calls the function endpoint instead of the server function, so the provider/model remains swappable in one place.
- Delete `src/lib/ai-designer.functions.ts` and `src/lib/ai-gateway.server.ts` after the move.

**Verify**
- Build, then serve the static output with a plain static file server and click through: home, pricing, templates, sign in, generate a design, save it, open it from the dashboard, delete it, and hard-refresh `/studio` to confirm the rewrite rule.

If you would rather keep SSR and simply be able to run the app on your own Node server or Vercel/Netlify, that is a much smaller change (swap the output preset only, no code moves) — say so and I will replan.
