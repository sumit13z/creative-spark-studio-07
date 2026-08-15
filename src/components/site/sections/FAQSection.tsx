import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "../Reveal";
import { brand } from "@/lib/brand";

const faqs = [
  {
    q: "What can I create with this platform?",
    a: `${brand.name} covers presentations, documents, infographics, data visualizations, social graphics, short videos, whiteboards, forms and surveys, charts, reports and interactive content — all from one editor.`,
  },
  {
    q: "Do I need design experience?",
    a: "No. Start from a professionally designed template or describe what you need and the AI Designer produces an on-brand first draft you can refine with simple controls.",
  },
  {
    q: "How does AI creation work?",
    a: "You describe the outcome, audience and tone. The AI drafts structure, copy, layout and visuals, then returns multiple layout variations you can regenerate section by section.",
  },
  {
    q: "Can teams collaborate?",
    a: "Yes. Invite teammates to a workspace, co-edit in real time, leave comments and mentions, request approvals and restore any earlier version.",
  },
  {
    q: "Can I use my own branding?",
    a: "Brand kits store your logos, colors, fonts, buttons and assets. Applying a brand kit restyles an entire design in one click, and admins can lock brand rules.",
  },
  {
    q: "Can I export my designs?",
    a: "Export to PDF, PPTX, PNG, JPG, SVG, HTML5 and MP4, or publish a live link that stays interactive and updates when you edit.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes — a free forever plan with core templates and a monthly AI draft allowance. No credit card required to start.",
  },
  {
    q: "What integrations are supported?",
    a: "Cloud storage, communication tools, CRM, video platforms and social channels, plus import from common presentation and design file formats.",
  },
  {
    q: "Can I create presentations and reports?",
    a: "Both are first-class: slide-based decks with speaker notes and presenter view, and long-form reports with live charts and repeatable data sources.",
  },
  {
    q: "Can I use the platform for business?",
    a: "Business and Enterprise plans add brand governance, permissions, analytics, SSO, audit logs and a dedicated success manager.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title="Questions, answered"
          description="Everything you need to know before you create your first design."
        />
        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
