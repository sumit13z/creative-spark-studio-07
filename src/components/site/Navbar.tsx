import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { ChevronDown, Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { createMenu, resourcesMenu, solutionsMenu, type NavLink } from "@/lib/brand";
import { useAuthUi } from "./AuthProvider";
import { DesignThumb } from "./mockups";

type MenuKey = "create" | "solutions" | "resources";

const menus: Record<MenuKey, { label: string; items: NavLink[]; cols: number }> = {
  create: { label: "Create", items: createMenu, cols: 3 },
  solutions: { label: "Solutions", items: solutionsMenu, cols: 2 },
  resources: { label: "Resources", items: resourcesMenu, cols: 2 },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>("create");
  const { open: openAuth } = useAuthUi();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-border shadow-soft" : "bg-background/60 backdrop-blur-sm",
      )}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="shell">
        <div className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:h-[72px] lg:grid-cols-[auto_1fr_auto]">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden justify-center lg:flex" aria-label="Main">
            <ul className="flex items-center gap-1">
              {(Object.keys(menus) as MenuKey[]).map((key) => (
                <li key={key}>
                  <button
                    type="button"
                    aria-expanded={openMenu === key}
                    onMouseEnter={() => setOpenMenu(key)}
                    onClick={() => setOpenMenu(openMenu === key ? null : key)}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground",
                      openMenu === key && "bg-accent text-accent-foreground",
                    )}
                  >
                    {menus[key].label}
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform duration-200",
                        openMenu === key && "rotate-180",
                      )}
                    />
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to="/templates"
                  onMouseEnter={() => setOpenMenu(null)}
                  className="rounded-full px-3.5 py-2 text-[15px] font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  onMouseEnter={() => setOpenMenu(null)}
                  className="rounded-full px-3.5 py-2 text-[15px] font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {user ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => void signOut()}>
                  Log out
                </Button>
                <Button variant="brand" size="sm" asChild>
                  <Link to="/projects">
                    <Sparkles /> My dashboard
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => openAuth("login")}>
                  Log in
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/pricing">Contact Sales</Link>
                </Button>
                <Button variant="brand" size="sm" onClick={() => openAuth("signup")}>
                  <Sparkles /> Sign Up Free
                </Button>
              </>
            )}
          </div>

          {/* Mobile trigger */}
          <div className="flex items-center gap-2 justify-self-end lg:hidden">
            {user ? (
              <Button variant="brand" size="sm" asChild>
                <Link to="/projects">Dashboard</Link>
              </Button>
            ) : (
              <Button variant="brand" size="sm" onClick={() => openAuth("signup")}>
                Sign Up Free
              </Button>
            )}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-xl border border-border bg-background text-ink"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mega menu */}
      {openMenu ? (
        <div className="absolute inset-x-0 top-full hidden lg:block">
          <div className="shell pb-6">
            <div className="animate-fade-up overflow-hidden rounded-3xl border border-border bg-popover shadow-lift">
              <div className="grid grid-cols-[1fr_auto]">
                <div
                  className={cn(
                    "grid gap-1 p-5",
                    menus[openMenu].cols === 3 ? "grid-cols-3" : "grid-cols-2",
                  )}
                >
                  {menus[openMenu].items.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setOpenMenu(null)}
                      className="group rounded-2xl p-3 transition-colors hover:bg-surface"
                    >
                      <span className="block text-sm font-semibold text-ink group-hover:text-primary">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">
                        {item.desc}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="w-72 border-l border-border bg-surface p-5">
                  <div className="h-40 overflow-hidden rounded-xl border border-border">
                    <DesignThumb
                      variant={openMenu === "create" ? "deck" : openMenu === "solutions" ? "report" : "infographic"}
                      palette={openMenu === "resources" ? "teal" : "indigo"}
                    />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-ink">
                    {openMenu === "create"
                      ? "Start from an AI draft"
                      : openMenu === "solutions"
                        ? "See a team workflow"
                        : "Level up your visuals"}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
                    Describe the outcome and get an editable, on-brand design in seconds.
                  </p>
                  <Button
                    variant="soft"
                    size="sm"
                    className="mt-3 w-full"
                    onClick={() => {
                      setOpenMenu(null);
                      openAuth("signup");
                    }}
                  >
                    Try the AI Designer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Mobile full-screen nav */}
      {mobileOpen ? (
        <div className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto bg-background lg:hidden">
          <div className="shell space-y-2 py-6">
            {(Object.keys(menus) as MenuKey[]).map((key) => (
              <div key={key} className="rounded-2xl border border-border">
                <button
                  type="button"
                  aria-expanded={mobileSection === key}
                  onClick={() => setMobileSection(mobileSection === key ? null : key)}
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left text-base font-semibold text-ink"
                >
                  {menus[key].label}
                  <ChevronDown
                    className={cn(
                      "size-5 text-muted-foreground transition-transform",
                      mobileSection === key && "rotate-180",
                    )}
                  />
                </button>
                {mobileSection === key ? (
                  <ul className="grid grid-cols-2 gap-1 border-t border-border p-2">
                    {menus[key].items.map((item) => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-surface"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
            <Link
              to="/templates"
              onClick={() => setMobileOpen(false)}
              className="block rounded-2xl border border-border px-4 py-3.5 text-base font-semibold text-ink"
            >
              Templates
            </Link>
            <Link
              to="/pricing"
              onClick={() => setMobileOpen(false)}
              className="block rounded-2xl border border-border px-4 py-3.5 text-base font-semibold text-ink"
            >
              Pricing
            </Link>
            <div className="grid gap-2 pt-2">
              {user ? (
                <>
                  <Button variant="brand" size="lg" asChild>
                    <Link to="/projects" onClick={() => setMobileOpen(false)}>
                      <Sparkles /> My dashboard
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setMobileOpen(false);
                      void signOut();
                    }}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="brand"
                    size="lg"
                    onClick={() => {
                      setMobileOpen(false);
                      openAuth("signup");
                    }}
                  >
                    <Sparkles /> Start Creating Free
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setMobileOpen(false);
                      openAuth("login");
                    }}
                  >
                    Log in
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
