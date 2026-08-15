import { ArrowUpRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "../Reveal";
import { AppFrame } from "../mockups";
import { useAuthUi } from "../AuthProvider";

const bars = [42, 61, 48, 74, 66, 88, 79, 95];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const donut = [
  { label: "Presentations", value: 42, color: "var(--primary)" },
  { label: "Reports", value: 27, color: "var(--violet)" },
  { label: "Social", value: 19, color: "var(--teal)" },
  { label: "Video", value: 12, color: "var(--amber)" },
];

export function DataVizSection() {
  const { open } = useAuthUi();
  let offset = 0;

  return (
    <section id="data" className="border-y border-border bg-surface py-20 lg:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <Reveal>
          <AppFrame label="workspace / performance overview">
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              {[
                { k: "Designs published", v: "1,284", d: "+18.4%" },
                { k: "Avg. engagement", v: "3m 42s", d: "+9.1%" },
              ].map((kpi) => (
                <div key={kpi.k} className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{kpi.k}</p>
                  <p className="mt-1 text-2xl font-extrabold text-ink">{kpi.v}</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-teal">
                    <ArrowUpRight className="size-3.5" /> {kpi.d} vs last quarter
                  </p>
                </div>
              ))}

              <div className="rounded-2xl border border-border bg-card p-4 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">Content output by month</p>
                  <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-semibold text-accent-foreground">
                    Live data
                  </span>
                </div>
                <div className="mt-4 flex h-36 items-end gap-2" role="img" aria-label="Bar chart of monthly content output">
                  {bars.map((h, i) => (
                    <div key={months[i]} className="flex flex-1 flex-col items-center gap-1.5">
                      <span
                        className="w-full origin-bottom rounded-t-md gradient-brand animate-grow-bar"
                        style={{ height: `${h}%`, animationDelay: `${i * 70}ms` }}
                      />
                      <span className="text-[10px] text-muted-foreground">{months[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="text-sm font-bold">Mix by format</p>
                <div className="mt-3 flex items-center gap-4">
                  <svg viewBox="0 0 42 42" className="size-24 -rotate-90" role="img" aria-label="Donut chart of content mix">
                    <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--surface-2)" strokeWidth="6" />
                    {donut.map((d) => {
                      const dash = (d.value / 100) * 100;
                      const el = (
                        <circle
                          key={d.label}
                          cx="21"
                          cy="21"
                          r="15.9"
                          fill="none"
                          stroke={d.color}
                          strokeWidth="6"
                          strokeDasharray={`${dash} ${100 - dash}`}
                          strokeDashoffset={-offset}
                          strokeLinecap="butt"
                          pathLength={100}
                        />
                      );
                      offset += dash;
                      return el;
                    })}
                  </svg>
                  <ul className="space-y-1.5 text-xs">
                    {donut.map((d) => (
                      <li key={d.label} className="flex items-center gap-2 text-muted-foreground">
                        <span className="size-2 rounded-full" style={{ background: d.color }} />
                        {d.label} <span className="font-semibold text-ink">{d.value}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="text-sm font-bold">Views over time</p>
                <svg viewBox="0 0 100 50" className="mt-3 w-full" role="img" aria-label="Line chart of views over time">
                  <defs>
                    <linearGradient id="viz-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,42 L14,32 L28,36 L42,20 L56,24 L70,10 L100,14 L100,50 L0,50 Z"
                    fill="url(#viz-fill)"
                  />
                  <polyline
                    points="0,42 14,32 28,36 42,20 56,24 70,10 100,14"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </AppFrame>
        </Reveal>

        <Reveal delay={120}>
          <SectionHeading
            align="left"
            eyebrow="Data visualization"
            title={
              <>
                Turn complex data into visuals <span className="text-gradient">people understand</span>
              </>
            }
            description="Import a spreadsheet or connect a live source, then choose from 40+ chart types, KPI cards, maps and interactive dashboards. When the data changes, the design changes with it."
          />
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {["Bar, line, area & radar", "Pie, donut & funnel", "KPI and metric cards", "Maps & heatmaps", "Live data sync", "Animated reveals"].map(
              (f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-medium text-foreground/80"
                >
                  <BarChart3 className="size-4 text-primary" /> {f}
                </li>
              ),
            )}
          </ul>
          <Button variant="brand" size="lg" className="mt-8" onClick={() => open("signup")}>
            Create a Data Visualization
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
