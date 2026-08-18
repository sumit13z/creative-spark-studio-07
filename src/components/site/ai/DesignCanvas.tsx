import { cn } from "@/lib/utils";
import type { DesignPage, Palette } from "@/lib/design-schema";

const gradients: Record<Palette, string> = {
  indigo: "from-primary to-violet",
  violet: "from-violet to-rose",
  teal: "from-teal to-primary",
  amber: "from-amber to-rose",
  ink: "from-ink to-primary",
};

export function paletteGradient(palette: Palette) {
  return gradients[palette] ?? gradients.indigo;
}

/** Renders a real generated page — the AI output is the content, not decoration. */
export function DesignCanvas({
  page,
  palette,
  density = "comfortable",
  compact = false,
  className,
}: {
  page: DesignPage;
  palette: Palette;
  density?: "comfortable" | "tight" | "editorial";
  compact?: boolean;
  className?: string;
}) {
  const grad = paletteGradient(palette);
  const pad = compact ? "p-3" : density === "tight" ? "p-5" : "p-7 sm:p-9";

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-card", className)}>
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.10]", grad)} />
      <div
        className={cn(
          "absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b",
          grad,
          density === "editorial" && "inset-x-0 bottom-auto h-1.5 w-full bg-gradient-to-r",
        )}
      />
      <div className={cn("relative flex h-full flex-col", pad)}>
        {page.kind === "cover" ? (
          <div className="flex h-full flex-col justify-center">
            <p
              className={cn(
                "font-bold uppercase tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r",
                grad,
                compact ? "text-[8px]" : "text-xs",
              )}
            >
              {page.subheading ?? "Visualy AI"}
            </p>
            <h3
              className={cn(
                "mt-2 font-extrabold leading-[1.05] tracking-tight text-ink",
                compact ? "text-[13px]" : "text-2xl sm:text-4xl",
              )}
            >
              {page.heading}
            </h3>
            {page.bullets.length ? (
              <p
                className={cn(
                  "mt-3 max-w-prose text-muted-foreground",
                  compact ? "line-clamp-2 text-[8px]" : "text-sm sm:text-base",
                )}
              >
                {page.bullets[0]}
              </p>
            ) : null}
          </div>
        ) : (
          <>
            <h3
              className={cn(
                "font-extrabold tracking-tight text-ink",
                compact ? "text-[11px] leading-tight" : "text-xl sm:text-2xl",
              )}
            >
              {page.heading}
            </h3>
            {page.subheading ? (
              <p
                className={cn(
                  "mt-1 text-muted-foreground",
                  compact ? "line-clamp-1 text-[8px]" : "text-sm",
                )}
              >
                {page.subheading}
              </p>
            ) : null}

            <div className={cn("mt-4 flex min-h-0 flex-1 flex-col gap-4", compact && "mt-2 gap-2")}>
              {page.bullets.length ? (
                <ul className={cn("space-y-2", compact && "space-y-1")}>
                  {page.bullets.slice(0, compact ? 3 : 6).map((b) => (
                    <li
                      key={b}
                      className={cn(
                        "flex gap-2 text-foreground/85",
                        compact ? "text-[8px]" : "text-sm",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-1 shrink-0 rounded-full bg-gradient-to-br",
                          grad,
                          compact ? "size-1" : "size-1.5",
                        )}
                      />
                      <span className={compact ? "line-clamp-1" : ""}>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {page.stats.length ? (
                <div
                  className={cn(
                    "grid gap-2",
                    page.stats.length > 2 ? "grid-cols-3" : "grid-cols-2",
                  )}
                >
                  {page.stats.slice(0, 3).map((s) => (
                    <div
                      key={s.label}
                      className={cn(
                        "rounded-xl border border-border bg-surface",
                        compact ? "p-1.5" : "p-3",
                      )}
                    >
                      <p
                        className={cn(
                          "font-extrabold text-transparent bg-clip-text bg-gradient-to-r",
                          grad,
                          compact ? "text-[10px]" : "text-2xl",
                        )}
                      >
                        {s.value}
                      </p>
                      <p
                        className={cn(
                          "text-muted-foreground",
                          compact ? "line-clamp-1 text-[7px]" : "text-xs",
                        )}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              {page.chart ? (
                <div className="mt-auto">
                  {!compact ? (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {page.chart.title}
                    </p>
                  ) : null}
                  <ChartBars grad={grad} chart={page.chart} compact={compact} />
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ChartBars({
  chart,
  grad,
  compact,
}: {
  chart: NonNullable<DesignPage["chart"]>;
  grad: string;
  compact: boolean;
}) {
  const max = Math.max(...chart.values, 1);
  return (
    <div className={cn("flex items-end gap-2", compact ? "h-8" : "h-28")}>
      {chart.values.slice(0, 6).map((v, i) => (
        <div key={i} className="flex h-full flex-1 flex-col justify-end gap-1">
          <span
            className={cn("w-full rounded-t-md bg-gradient-to-t", grad)}
            style={{
              height: `${Math.max(6, (v / max) * 100)}%`,
              animation: `grow-bar 0.8s ${i * 0.07}s cubic-bezier(0.16,1,0.3,1) both`,
            }}
          />
          {!compact ? (
            <span className="truncate text-center text-[10px] text-muted-foreground">
              {chart.labels[i] ?? ""}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
