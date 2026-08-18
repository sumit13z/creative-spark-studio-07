import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "../Reveal";
import { Avatars } from "../mockups";
import { useAuthUi } from "../AuthProvider";
import { DesignStudio } from "../ai/DesignStudio";


export function Hero() {
  const { open } = useAuthUi();

  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 gradient-mesh" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"
        aria-hidden="true"
      />
      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-xs font-semibold text-accent-foreground shadow-soft">
              <Sparkles className="size-3.5 text-primary" />
              AI Designer now drafts full decks, reports and video
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.03] tracking-tight sm:text-6xl lg:text-[4.25rem]">
              Create stunning visual content <span className="text-gradient">with AI</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Design presentations, reports, infographics, social content and more in minutes with an
              AI-powered visual content platform built for modern teams.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="brand" size="xl" onClick={() => open("signup")}>
                Start Creating Free <ArrowRight />
              </Button>
              <Button variant="outline" size="xl" asChild>
                <a href="#templates">Explore Templates</a>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Avatars names={["Ada Reyes", "Milo Fenn", "Sana Okoye", "Ivo Lange", "Tess Marín"]} />
              <p className="text-sm text-muted-foreground">
                Loved by <span className="font-semibold text-ink">10M+</span> creators
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="mx-auto mt-14 max-w-6xl">
          <DesignStudio />
        </Reveal>
      </div>
    </section>
  );
}
