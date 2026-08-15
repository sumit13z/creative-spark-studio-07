import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { brand } from "@/lib/brand";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Create",
    links: [
      { label: "Presentations", href: "/templates" },
      { label: "Infographics", href: "/templates" },
      { label: "Documents", href: "/templates" },
      { label: "Reports", href: "/templates" },
      { label: "Charts", href: "/templates" },
      { label: "Videos", href: "/templates" },
      { label: "Social Graphics", href: "/templates" },
      { label: "Whiteboards", href: "/templates" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Marketing", href: "/solutions" },
      { label: "Sales", href: "/solutions" },
      { label: "HR", href: "/solutions" },
      { label: "Education", href: "/solutions" },
      { label: "Enterprise", href: "/solutions" },
      { label: "Agencies", href: "/solutions" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/resources" },
      { label: "Templates", href: "/templates" },
      { label: "Guides", href: "/resources" },
      { label: "Tutorials", href: "/resources" },
      { label: "Webinars", href: "/resources" },
      { label: "Help Center", href: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/resources" },
      { label: "Careers", href: "/resources" },
      { label: "Contact", href: "/resources" },
      { label: "Partners", href: "/resources" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/resources" },
      { label: "Terms", href: "/resources" },
      { label: "Cookie Policy", href: "/resources" },
    ],
  },
];

const socials = [
  { label: "X", path: "M3 3h4.5l4 5.6L16.2 3H21l-6.6 8.6L21.4 21h-4.6l-4.3-6-4.9 6H3l7-8.7L3 3Z" },
  { label: "LinkedIn", path: "M4 9h3v11H4V9Zm1.5-5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM10 9h3v1.6c.6-1 1.7-1.9 3.4-1.9 2.4 0 3.6 1.6 3.6 4.4V20h-3v-6c0-1.5-.6-2.4-1.9-2.4-1.2 0-2.1.9-2.1 2.4v6h-3V9Z" },
  { label: "Instagram", path: "M12 7.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2Zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1ZM17 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4Zm2.3 14a2.3 2.3 0 0 1-2.3 2.3H7A2.3 2.3 0 0 1 4.7 17V7A2.3 2.3 0 0 1 7 4.7h10A2.3 2.3 0 0 1 19.3 7v10Z" },
  { label: "YouTube", path: "M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18 5 12 5 12 5s-6 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2C2 9 2 12 2 12s0 3 .4 4.8a2.6 2.6 0 0 0 1.8 1.8C6 19 12 19 12 19s6 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8C22 15 22 12 22 12s0-3-.4-4.8ZM10 15V9l5.2 3L10 15Z" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="shell py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_3fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The AI visual content platform for teams who need to explain, pitch and report — beautifully, every time.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-xl border border-border bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.12em] text-ink">
                  {col.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {brand.name}. All rights reserved. An original product — not
            affiliated with any other design platform.
          </p>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="sr-only">Language</span>
            <select className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground">
              <option>English (US)</option>
              <option>Español</option>
              <option>Français</option>
              <option>Deutsch</option>
              <option>日本語</option>
            </select>
          </label>
        </div>
      </div>
    </footer>
  );
}
