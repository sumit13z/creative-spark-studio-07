import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Product-UI chrome used across marketing mockups. */
export function AppFrame({
  children,
  className,
  label,
  toolbar = true,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
  toolbar?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-lift",
        className,
      )}
    >
      {toolbar ? (
        <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-rose/70" />
            <span className="size-2.5 rounded-full bg-amber/70" />
            <span className="size-2.5 rounded-full bg-teal/70" />
          </span>
          {label ? (
            <span className="ml-2 truncate rounded-md bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              {label}
            </span>
          ) : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}

const palettes: Record<string, string> = {
  indigo: "from-primary to-violet",
  violet: "from-violet to-rose",
  teal: "from-teal to-primary",
  amber: "from-amber to-rose",
  ink: "from-ink to-primary",
};

/** Abstract, original design thumbnail — stands in for a real rendered design. */
export function DesignThumb({
  variant = "deck",
  palette = "indigo",
  className,
}: {
  variant?: "deck" | "report" | "infographic" | "social" | "chart" | "video" | "board" | "form";
  palette?: keyof typeof palettes | string;
  className?: string;
}) {
  const grad = palettes[palette] ?? palettes["indigo"];
  return (
    <div
      className={cn("relative h-full w-full overflow-hidden bg-surface", className)}
      aria-hidden="true"
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.14]", grad)} />
      {variant === "deck" && (
        <div className="relative flex h-full flex-col justify-between p-4">
          <div className="space-y-2">
            <div className={cn("h-2.5 w-1/3 rounded-full bg-gradient-to-r", grad)} />
            <div className="h-4 w-4/5 rounded bg-ink/80" />
            <div className="h-2 w-3/5 rounded bg-ink/25" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg border border-border bg-background/80 p-2">
                <div className={cn("mb-1.5 size-4 rounded bg-gradient-to-br", grad)} />
                <div className="h-1.5 w-full rounded bg-ink/20" />
                <div className="mt-1 h-1.5 w-2/3 rounded bg-ink/10" />
              </div>
            ))}
          </div>
        </div>
      )}
      {variant === "report" && (
        <div className="relative flex h-full gap-3 p-4">
          <div className="w-1/2 space-y-1.5">
            <div className="h-3 w-2/3 rounded bg-ink/70" />
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-1.5 rounded bg-ink/12" style={{ width: `${95 - i * 7}%` }} />
            ))}
          </div>
          <div className="flex w-1/2 flex-col gap-2">
            <div className="flex-1 rounded-lg border border-border bg-background/80 p-2">
              <div className="flex h-full items-end gap-1">
                {[40, 65, 35, 80, 55].map((h, i) => (
                  <div
                    key={i}
                    className={cn("flex-1 origin-bottom rounded-sm bg-gradient-to-t", grad)}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="h-6 rounded-lg bg-primary-soft" />
          </div>
        </div>
      )}
      {variant === "infographic" && (
        <div className="relative flex h-full flex-col items-center gap-2 p-4">
          <div className="h-3 w-1/2 rounded bg-ink/70" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex w-full items-center gap-2">
              <div
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br text-[9px] font-bold text-primary-foreground",
                  grad,
                )}
              >
                {i + 1}
              </div>
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-4/5 rounded bg-ink/25" />
                <div className="h-1.5 w-3/5 rounded bg-ink/12" />
              </div>
            </div>
          ))}
        </div>
      )}
      {variant === "social" && (
        <div className="relative grid h-full grid-cols-2 gap-2 p-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                "flex flex-col justify-end rounded-lg bg-gradient-to-br p-2",
                grad,
                i % 3 === 0 ? "opacity-95" : "opacity-70",
              )}
            >
              <div className="h-1.5 w-3/4 rounded bg-background/80" />
              <div className="mt-1 h-1.5 w-1/2 rounded bg-background/50" />
            </div>
          ))}
        </div>
      )}
      {variant === "chart" && (
        <div className="relative flex h-full flex-col p-4">
          <div className="h-2.5 w-1/3 rounded bg-ink/60" />
          <svg viewBox="0 0 100 46" className="mt-auto w-full" preserveAspectRatio="none">
            <polyline
              points="0,40 15,28 30,32 45,18 60,22 75,8 100,12"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <polyline
              points="0,44 15,38 30,40 45,32 60,34 75,26 100,28"
              fill="none"
              stroke="var(--violet)"
              strokeWidth="1.6"
              strokeDasharray="3 3"
            />
          </svg>
        </div>
      )}
      {variant === "video" && (
        <div className="relative grid h-full place-items-center p-4">
          <div
            className={cn(
              "grid size-12 place-items-center rounded-full bg-gradient-to-br shadow-glow",
              grad,
            )}
          >
            <svg viewBox="0 0 24 24" className="size-5 translate-x-px" fill="white">
              <path d="M8 5v14l11-7L8 5Z" />
            </svg>
          </div>
          <div className="absolute inset-x-4 bottom-4 h-1.5 rounded-full bg-ink/10">
            <div className={cn("h-full w-2/5 rounded-full bg-gradient-to-r", grad)} />
          </div>
        </div>
      )}
      {variant === "board" && (
        <div className="relative h-full p-4">
          <div className="absolute left-4 top-4 h-12 w-16 rotate-[-4deg] rounded-md bg-amber/40" />
          <div className="absolute left-20 top-8 h-12 w-16 rotate-[3deg] rounded-md bg-teal/40" />
          <div className="absolute bottom-5 right-5 h-12 w-16 rotate-[-2deg] rounded-md bg-violet/30" />
          <svg viewBox="0 0 100 60" className="size-full">
            <path
              d="M22 22 C40 30, 50 42, 70 44"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1.4"
              strokeDasharray="3 2"
            />
          </svg>
        </div>
      )}
      {variant === "form" && (
        <div className="relative flex h-full flex-col gap-2 p-4">
          <div className="h-3 w-2/3 rounded bg-ink/70" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md border border-border bg-background/80 px-2 py-1.5">
              <div className="h-1.5 w-1/3 rounded bg-ink/20" />
            </div>
          ))}
          <div
            className={cn("mt-auto h-6 w-24 rounded-full bg-gradient-to-r", grad)}
            style={{ opacity: 0.9 }}
          />
        </div>
      )}
    </div>
  );
}

/** Neutral, original placeholder company marks for social proof. */
export function CompanyMark({ name }: { name: string }) {
  const initial = name.charAt(0);
  return (
    <div className="flex items-center gap-2.5 opacity-70 transition-opacity hover:opacity-100">
      <span
        className="grid size-8 shrink-0 place-items-center rounded-lg bg-ink/85 text-xs font-bold text-primary-foreground"
        aria-hidden="true"
      >
        {initial}
      </span>
      <span className="truncate text-sm font-semibold tracking-tight text-ink">{name}</span>
    </div>
  );
}

export function Avatars({
  names,
  className,
}: {
  names: string[];
  className?: string;
}) {
  const tones = ["bg-primary", "bg-violet", "bg-teal", "bg-amber", "bg-rose"];
  return (
    <div className={cn("flex -space-x-2", className)}>
      {names.map((n, i) => (
        <span
          key={n}
          className={cn(
            "grid size-8 place-items-center rounded-full border-2 border-background text-[11px] font-bold text-primary-foreground",
            tones[i % tones.length],
          )}
          title={n}
        >
          {n
            .split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2)}
        </span>
      ))}
    </div>
  );
}
