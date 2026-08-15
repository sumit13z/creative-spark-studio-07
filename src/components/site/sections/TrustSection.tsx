import { Reveal } from "../Reveal";
import { CompanyMark } from "../mockups";
import { stats } from "@/lib/brand";

const companies = [
  "Northbeam",
  "Lumen Foods",
  "Arcwell",
  "Politecnica",
  "Harborline",
  "Vantage Labs",
  "Corallo",
  "Meridian Health",
];

export function TrustSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="shell">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Trusted by teams creating content every day
          </p>
        </Reveal>
        <Reveal delay={80}>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-8">
            {companies.map((c) => (
              <li key={c}>
                <CompanyMark name={c} />
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={140}>
          <dl className="mt-12 grid grid-cols-2 gap-6 rounded-3xl border border-border bg-card p-8 shadow-soft sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-3xl font-extrabold text-gradient sm:text-4xl">
                    {s.value}
                  </span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
