import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "../Reveal";
import { useAuthUi } from "../AuthProvider";
import { stats } from "@/lib/brand";

export function CTASection() {
  const { open } = useAuthUi();
  return (
    <section className="py-16 lg:py-24">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-center shadow-lift sm:px-12 lg:py-24">
            <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-90" />
            <div
              className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full gradient-brand opacity-30 blur-3xl animate-float"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-32 -right-16 size-80 rounded-full gradient-brand opacity-25 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground">
                <Sparkles className="size-3.5" /> Free to start
              </span>
              <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] text-primary-foreground sm:text-5xl lg:text-6xl">
                Bring your ideas to life
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/75 sm:text-lg">
                Create beautiful visual content faster with AI.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button variant="brand" size="xl" onClick={() => open("signup")}>
                  Start Creating Free <ArrowRight />
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                  onClick={() => open("login")}
                >
                  Talk to Sales
                </Button>
              </div>
              <dl className="mx-auto mt-12 grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="block text-2xl font-extrabold text-primary-foreground">
                        {s.value}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-primary-foreground/60">
                        {s.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
