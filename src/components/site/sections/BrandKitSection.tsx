import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "../Reveal";
import { AppFrame, DesignThumb } from "../mockups";
import { useAuthUi } from "../AuthProvider";
import { cn } from "@/lib/utils";

const brands = [
  { name: "Northbeam", palette: "indigo", colors: ["var(--primary)", "var(--violet)", "var(--ink)"], font: "Inter" },
  { name: "Corallo", palette: "amber", colors: ["var(--amber)", "var(--rose)", "var(--ink)"], font: "Plus Jakarta" },
  { name: "Vantage Labs", palette: "teal", colors: ["var(--teal)", "var(--primary)", "var(--ink)"], font: "Inter Tight" },
];

export function BrandKitSection() {
  const [active, setActive] = useState(0);
  const brandKit = brands[active]!;
  const { open } = useAuthUi();

  return (
    <section id="brand" className="py-20 lg:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Brand kits"
            title={
              <>
                Keep every design <span className="text-gradient">on brand</span>
              </>
            }
            description="Store logos, colors, type, buttons and assets once. Switch brand and every page restyles instantly — useful for agencies, sub-brands and campaign variants."
          />
          <div className="mt-7 flex flex-wrap gap-2">
            {brands.map((b, i) => (
              <button
                key={b.name}
                type="button"
                aria-pressed={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                  active === i
                    ? "border-primary bg-primary-soft text-accent-foreground"
                    : "border-border bg-background text-foreground/70 hover:border-border-strong",
                )}
              >
                {b.name}
              </button>
            ))}
          </div>
          <Button variant="brand" size="lg" className="mt-7" onClick={() => open("signup")}>
            Build Your Brand Kit
          </Button>
        </Reveal>

        <Reveal delay={120}>
          <AppFrame label="brand kit / apply to design">
            <div className="grid gap-4 p-5 sm:grid-cols-[1fr_1.1fr]">
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Logo</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="grid size-8 place-items-center rounded-lg bg-ink text-xs font-bold text-primary-foreground">
                      {brandKit.name.charAt(0)}
                    </span>
                    <span className="truncate text-sm font-bold text-ink">{brandKit.name}</span>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Colors</p>
                  <div className="mt-2 flex gap-2">
                    {brandKit.colors.map((c) => (
                      <span key={c} className="size-7 rounded-lg border border-border" style={{ background: c }} />
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Typography</p>
                  <p className="mt-1 text-lg font-extrabold text-ink">{brandKit.font}</p>
                  <p className="text-xs text-muted-foreground">Heading / Body / Caption</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Buttons</p>
                  <span
                    className="mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                    style={{ background: brandKit.colors[0] }}
                  >
                    Primary action
                  </span>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border">
                <div className="h-full min-h-[280px]">
                  <DesignThumb key={brandKit.name} variant="deck" palette={brandKit.palette} />
                </div>
              </div>
            </div>
          </AppFrame>
        </Reveal>
      </div>
    </section>
  );
}
