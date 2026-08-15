import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { AuthUiProvider, useAuthUi } from "@/components/site/AuthProvider";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { FAQSection } from "@/components/site/sections/FAQSection";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Plans for creators, teams and enterprises | Visualy AI" },
      {
        name: "description",
        content:
          "Simple pricing for AI-powered presentations, reports, infographics and video. Start free, upgrade when your team grows.",
      },
      { property: "og:title", content: "Visualy AI pricing" },
      {
        property: "og:description",
        content: "Free, Pro, Business and Enterprise plans for AI visual content creation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "Free",
    monthly: 0,
    yearly: 0,
    blurb: "For trying the platform and one-off designs.",
    features: ["5 projects", "Basic templates", "10 AI drafts / month", "PNG & JPG export"],
    cta: "Start free",
  },
  {
    name: "Pro",
    monthly: 19,
    yearly: 15,
    blurb: "For individual creators who ship constantly.",
    features: [
      "Unlimited projects",
      "All templates",
      "Unlimited AI drafts",
      "PDF, PPTX & MP4 export",
      "1 brand kit",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Business",
    monthly: 42,
    yearly: 34,
    blurb: "For teams that need consistency and control.",
    features: [
      "Everything in Pro",
      "5 brand kits",
      "Real-time collaboration",
      "Comments & approvals",
      "Analytics & engagement",
    ],
    cta: "Start 14-day trial",
  },
  {
    name: "Enterprise",
    monthly: null,
    yearly: null,
    blurb: "For organisations with governance needs.",
    features: ["SSO / SAML", "Unlimited brand kits", "Custom permissions", "Dedicated CSM", "SLA & audit logs"],
    cta: "Talk to Sales",
  },
];

const matrix = [
  { row: "AI Designer", values: ["10 / mo", "Unlimited", "Unlimited", "Unlimited"] },
  { row: "Brand kits", values: [false, "1", "5", "Unlimited"] },
  { row: "Collaboration", values: [false, "Share links", "Real-time", "Real-time + roles"] },
  { row: "Export formats", values: ["PNG, JPG", "PDF, PPTX, MP4", "All formats", "All formats"] },
  { row: "Interactive content", values: [false, true, true, true] },
  { row: "Analytics", values: [false, false, true, true] },
  { row: "SSO & audit logs", values: [false, false, false, true] },
];

function PricingPage() {
  return (
    <AuthUiProvider>
      <Navbar />
      <main className="pt-28 lg:pt-36">
        <PricingHero />
        <Comparison />
        <FAQSection />
      </main>
      <Footer />
    </AuthUiProvider>
  );
}

function PricingHero() {
  const [yearly, setYearly] = useState(true);
  const { open } = useAuthUi();

  return (
    <section className="shell pb-16">
      <SectionHeading
        eyebrow="Pricing"
        title={
          <>
            Pricing that scales with <span className="text-gradient">what you create</span>
          </>
        }
        description={`Every ${brand.name} plan includes the AI Designer, the full editor and unlimited viewers.`}
      />

      <div className="mt-8 flex items-center justify-center gap-3">
        <span className={cn("text-sm font-medium", !yearly && "text-ink")}>Monthly</span>
        <button
          type="button"
          role="switch"
          aria-checked={yearly}
          aria-label="Toggle yearly billing"
          onClick={() => setYearly((v) => !v)}
          className={cn(
            "relative h-7 w-12 rounded-full border border-border transition-colors",
            yearly ? "gradient-brand" : "bg-surface-2",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 size-5 rounded-full bg-background shadow-soft transition-transform",
              yearly ? "translate-x-6" : "translate-x-0.5",
            )}
          />
        </button>
        <span className={cn("text-sm font-medium", yearly && "text-ink")}>
          Yearly <span className="text-teal">save 20%</span>
        </span>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 70}>
            <div
              className={cn(
                "flex h-full flex-col rounded-3xl border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift",
                p.featured ? "border-primary/40 ring-1 ring-primary/20" : "border-border",
              )}
            >
              {p.featured ? (
                <span className="mb-3 inline-flex w-fit rounded-full gradient-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
                  Most popular
                </span>
              ) : null}
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="mt-1 min-h-10 text-sm text-muted-foreground">{p.blurb}</p>
              <p className="mt-5 flex items-baseline gap-1">
                {p.monthly === null ? (
                  <span className="text-3xl font-extrabold text-ink">Custom</span>
                ) : (
                  <>
                    <span className="text-4xl font-extrabold text-ink">
                      ${yearly ? p.yearly : p.monthly}
                    </span>
                    <span className="text-sm text-muted-foreground">/user / month</span>
                  </>
                )}
              </p>
              <Button
                variant={p.featured ? "brand" : "outline"}
                className="mt-5 w-full"
                onClick={() => open(p.name === "Enterprise" ? "login" : "signup")}
              >
                {p.cta}
              </Button>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2 text-foreground/80">
                    <Check className="mt-0.5 size-4 shrink-0 text-teal" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="mx-auto size-4 text-teal" />;
  if (value === false) return <Minus className="mx-auto size-4 text-muted-foreground/60" />;
  return <span className="text-sm text-foreground/80">{value}</span>;
}

function Comparison() {
  return (
    <section className="border-y border-border bg-surface py-20">
      <div className="shell">
        <SectionHeading title="Compare every plan" align="center" />
        <div className="mt-10 overflow-x-auto rounded-3xl border border-border bg-card shadow-soft">
          <table className="w-full min-w-[720px] border-collapse text-center">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 text-left text-sm font-semibold text-ink">Feature</th>
                {plans.map((p) => (
                  <th key={p.name} className="p-4 text-sm font-semibold text-ink">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((r) => (
                <tr key={r.row} className="border-b border-border last:border-0">
                  <th scope="row" className="p-4 text-left text-sm font-medium text-foreground/80">
                    {r.row}
                  </th>
                  {r.values.map((v, i) => (
                    <td key={i} className="p-4">
                      <Cell value={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-border bg-card p-8 text-center shadow-soft sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="text-xl font-bold">Need procurement, SSO and a security review?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Our team will scope rollout, training and brand governance with you.
            </p>
          </div>
          <Button variant="ink" size="lg">
            Talk to Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
