import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  History,
  MessageSquare,
  MousePointerClick,
  Quote,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "../Reveal";
import { AppFrame, Avatars, DesignThumb } from "../mockups";
import { useAuthUi } from "../AuthProvider";
import { cn } from "@/lib/utils";

/* ---------------- Collaboration ---------------- */

export function CollaborationSection() {
  const { open } = useAuthUi();
  return (
    <section id="collaborate" className="py-20 lg:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <AppFrame label="editor / Q3 Investor Update">
            <div className="relative">
              <div className="aspect-[16/10]">
                <DesignThumb variant="deck" palette="indigo" />
              </div>
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-border bg-card/95 px-2.5 py-1.5 shadow-soft">
                <Avatars names={["Ada Reyes", "Milo Fenn", "Sana Okoye"]} />
                <span className="text-[11px] font-semibold text-teal">3 editing now</span>
              </div>
              <div className="absolute bottom-5 right-4 w-56 rounded-2xl border border-border bg-card p-3 shadow-lift">
                <p className="flex items-center gap-1.5 text-[11px] font-bold text-ink">
                  <MessageSquare className="size-3.5 text-primary" /> Milo Fenn
                </p>
                <p className="mt-1 text-[12px] leading-snug text-muted-foreground">
                  @ada can we lead with retention on this slide?
                </p>
              </div>
              <span className="absolute left-1/2 top-1/2 flex items-center gap-1 rounded-full bg-violet px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                <MousePointerClick className="size-3" /> Sana
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t border-border bg-surface px-4 py-3 text-[12px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <History className="size-3.5 text-primary" /> Version history
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="size-3.5 text-primary" /> Permissions
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-primary" /> Approvals
              </span>
            </div>
          </AppFrame>
        </Reveal>
        <Reveal delay={120}>
          <SectionHeading
            align="left"
            eyebrow="Collaboration"
            title={
              <>
                Create together, <span className="text-gradient">from anywhere</span>
              </>
            }
            description="Co-edit in real time, resolve comments in context, mention teammates, control who can publish and roll back to any earlier version."
          />
          <ul className="mt-7 space-y-3">
            {["Live multiplayer editing", "Comments, mentions and approvals", "Granular roles and sharing links", "Full version history"].map(
              (b) => (
                <li key={b} className="flex gap-3 text-[15px] text-foreground/80">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary-soft">
                    <Check className="size-3 text-primary" />
                  </span>
                  {b}
                </li>
              ),
            )}
          </ul>
          <Button variant="brand" size="lg" className="mt-8" onClick={() => open("signup")}>
            Collaborate With Your Team
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Solutions ---------------- */

const solutions = [
  { title: "Business Owners", desc: "Look established from day one.", variant: "deck", palette: "indigo" },
  { title: "Marketing Teams", desc: "Ship campaign assets in hours.", variant: "social", palette: "amber" },
  { title: "Sales Teams", desc: "Personalised decks that close.", variant: "report", palette: "teal" },
  { title: "HR Teams", desc: "Onboarding people actually read.", variant: "form", palette: "violet" },
  { title: "Educators", desc: "Lessons that hold attention.", variant: "board", palette: "teal" },
  { title: "Agencies", desc: "Every client, its own brand kit.", variant: "infographic", palette: "violet" },
  { title: "Enterprise Teams", desc: "Governance, SSO and audit trails.", variant: "chart", palette: "ink" },
  { title: "Creators", desc: "Publish consistently, everywhere.", variant: "video", palette: "amber" },
] as const;

export function SolutionsSection() {
  const { open } = useAuthUi();
  return (
    <section id="solutions" className="border-y border-border bg-surface py-20 lg:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Solutions"
          title={
            <>
              Built for <span className="text-gradient">every team</span>
            </>
          }
          description="The same platform adapts to how each team communicates."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 4) * 70}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="aspect-[16/10] border-b border-border">
                  <DesignThumb variant={s.variant} palette={s.palette} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-bold">{s.title}</h3>
                  <p className="mt-1.5 flex-1 text-[13px] text-muted-foreground">{s.desc}</p>
                  <button
                    type="button"
                    onClick={() => open("signup")}
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary transition-transform group-hover:translate-x-0.5"
                  >
                    Explore <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Use cases (tabs) ---------------- */

const useCases = [
  {
    tab: "Marketing",
    heading: "Campaign assets without the agency wait",
    desc: "Draft the concept, generate every format, keep it on brand and measure what people actually read.",
    benefits: ["Multi-format resizing", "Campaign brand locks", "Engagement analytics"],
    variant: "social",
    palette: "amber",
  },
  {
    tab: "Sales",
    heading: "Decks tailored to every buyer",
    desc: "Start from an approved narrative, personalise per account and share a link that reports back.",
    benefits: ["Approved deck library", "Per-account variants", "View tracking"],
    variant: "deck",
    palette: "indigo",
  },
  {
    tab: "HR",
    heading: "People content people finish",
    desc: "Handbooks, onboarding journeys and culture updates that look designed, not dumped in a doc.",
    benefits: ["Interactive handbooks", "Survey summaries", "Policy templates"],
    variant: "form",
    palette: "violet",
  },
  {
    tab: "Education",
    heading: "Lessons that keep attention",
    desc: "Build visual lessons, activity boards and assessments, then reuse them term after term.",
    benefits: ["Lesson templates", "Class whiteboards", "Quiz builder"],
    variant: "board",
    palette: "teal",
  },
  {
    tab: "Business",
    heading: "Reporting that runs itself",
    desc: "Connect your numbers once and let recurring reports rebuild with the latest data.",
    benefits: ["Live data sources", "Scheduled reports", "Executive summaries"],
    variant: "report",
    palette: "teal",
  },
  {
    tab: "Enterprise",
    heading: "Scale visual comms safely",
    desc: "Central brand governance, SSO, granular permissions and audit logs across every department.",
    benefits: ["SSO / SAML", "Brand governance", "Audit logs"],
    variant: "chart",
    palette: "ink",
  },
] as const;

export function UseCaseTabs() {
  const [active, setActive] = useState(0);
  const uc = useCases[active]!;
  const { open } = useAuthUi();

  return (
    <section className="py-20 lg:py-28">
      <div className="shell">
        <SectionHeading eyebrow="Use cases" title="One platform, many jobs to be done" />
        <div className="-mx-5 mt-8 overflow-x-auto px-5 lg:mx-0 lg:px-0">
          <div role="tablist" aria-label="Use cases" className="flex min-w-max gap-2 lg:justify-center">
            {useCases.map((u, i) => (
              <button
                key={u.tab}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                  active === i
                    ? "border-transparent gradient-brand text-primary-foreground shadow-soft"
                    : "border-border bg-background text-foreground/70 hover:border-border-strong hover:text-ink",
                )}
              >
                {u.tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid items-center gap-10 rounded-[2rem] border border-border bg-card p-6 shadow-soft lg:grid-cols-2 lg:p-10">
          <div key={uc.tab} className="animate-fade-up">
            <h3 className="text-2xl font-extrabold sm:text-3xl">{uc.heading}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{uc.desc}</p>
            <ul className="mt-6 space-y-2.5">
              {uc.benefits.map((b) => (
                <li key={b} className="flex gap-2.5 text-[15px] text-foreground/80">
                  <Check className="mt-0.5 size-4 shrink-0 text-teal" /> {b}
                </li>
              ))}
            </ul>
            <Button variant="brand" className="mt-7" onClick={() => open("signup")}>
              Try it for {uc.tab.toLowerCase()} <ArrowRight />
            </Button>
          </div>
          <div key={`${uc.tab}-art`} className="animate-fade-up overflow-hidden rounded-2xl border border-border">
            <div className="aspect-[4/3]">
              <DesignThumb variant={uc.variant} palette={uc.palette} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Interactive content ---------------- */

export function InteractiveSection() {
  const [hot, setHot] = useState<number | null>(null);
  return (
    <section className="border-y border-border bg-surface py-20 lg:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Interactive"
            title={
              <>
                Content people <span className="text-gradient">click through</span>
              </>
            }
            description="Add hotspots, popups, links, animated charts and embedded media. Publish a live link that behaves like a product, not a PDF."
          />
          <p className="mt-6 text-sm text-muted-foreground">
            Hover a hotspot in the preview to see how layered detail works.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <AppFrame label="published / interactive report">
            <div className="relative">
              <div className="aspect-[16/10]">
                <DesignThumb variant="chart" palette="teal" />
              </div>
              {[
                { x: "22%", y: "35%", label: "Retention up 12% after onboarding redesign" },
                { x: "58%", y: "58%", label: "Peak engagement in week 3" },
                { x: "80%", y: "28%", label: "Embedded product video" },
              ].map((h, i) => (
                <button
                  key={i}
                  type="button"
                  onMouseEnter={() => setHot(i)}
                  onMouseLeave={() => setHot(null)}
                  onFocus={() => setHot(i)}
                  onBlur={() => setHot(null)}
                  aria-label={h.label}
                  style={{ left: h.x, top: h.y }}
                  className="absolute grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full gradient-brand text-[11px] font-bold text-primary-foreground shadow-glow"
                >
                  {i + 1}
                  {hot === i ? (
                    <span className="absolute left-1/2 top-8 w-48 -translate-x-1/2 rounded-xl border border-border bg-card p-2.5 text-left text-[12px] font-medium leading-snug text-ink shadow-lift">
                      {h.label}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </AppFrame>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */

const stories = [
  {
    quote:
      "We replaced three tools and a freelance designer. Our monthly investor report now takes an afternoon instead of two weeks.",
    name: "Ada Reyes",
    role: "Head of Communications",
    company: "Northbeam",
  },
  {
    quote:
      "The AI draft is the part I underestimated. It gets the structure 80% right, so our team spends time on the argument, not the layout.",
    name: "Milo Fenn",
    role: "VP Marketing",
    company: "Vantage Labs",
  },
  {
    quote:
      "Brand kits ended the endless review loop. Twelve client brands, zero off-brand slides going out the door.",
    name: "Sana Okoye",
    role: "Creative Director",
    company: "Corallo Studio",
  },
];

export function TestimonialCarousel() {
  const [i, setI] = useState(0);
  const s = stories[i]!;
  const move = (d: number) => setI((v) => (v + d + stories.length) % stories.length);

  return (
    <section className="py-20 lg:py-28">
      <div className="shell">
        <SectionHeading eyebrow="Customer stories" title="Teams that ship better content, faster" />
        <Reveal delay={100} className="mt-10">
          <div className="relative mx-auto max-w-3xl rounded-[2rem] border border-border bg-card p-8 shadow-soft sm:p-12">
            <Quote className="size-8 text-primary/30" />
            <blockquote key={s.name} className="animate-fade-up">
              <p className="mt-4 text-xl font-semibold leading-snug text-ink sm:text-2xl">{s.quote}</p>
              <footer className="mt-6 flex flex-wrap items-center gap-3">
                <Avatars names={[s.name]} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-ink">{s.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {s.role}, {s.company}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto">
                  Read case study <ArrowRight />
                </Button>
              </footer>
            </blockquote>
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-1.5">
                {stories.map((st, idx) => (
                  <button
                    key={st.name}
                    type="button"
                    aria-label={`Story ${idx + 1}`}
                    onClick={() => setI(idx)}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      idx === i ? "w-8 gradient-brand" : "w-3 bg-border-strong",
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" aria-label="Previous story" onClick={() => move(-1)}>
                  <ChevronLeft />
                </Button>
                <Button variant="outline" size="icon" aria-label="Next story" onClick={() => move(1)}>
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Integrations ---------------- */

const integrations = [
  { name: "Cloud Drive", desc: "Import and sync files" },
  { name: "Slide Import", desc: "Bring existing decks in" },
  { name: "Team Chat", desc: "Share to channels" },
  { name: "Messaging", desc: "Notify on comments" },
  { name: "File Storage", desc: "Two-way asset sync" },
  { name: "CRM", desc: "Personalise from records" },
  { name: "Design Import", desc: "Migrate from other editors" },
  { name: "Video Hosting", desc: "Embed and publish" },
  { name: "Streaming", desc: "Play inside designs" },
  { name: "Social Publishing", desc: "Schedule to channels" },
];

export function IntegrationGrid() {
  return (
    <section className="border-y border-border bg-surface py-20 lg:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Integrations"
          title={
            <>
              Connect with the tools <span className="text-gradient">you already use</span>
            </>
          }
          description="Bring your files, data and channels together — no exporting back and forth."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {integrations.map((it, i) => (
            <Reveal as="li" key={it.name} delay={(i % 5) * 60}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-sm font-bold text-accent-foreground">
                  {it.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-ink">{it.name}</p>
                  <p className="text-[12px] text-muted-foreground">{it.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
