import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoMark } from "./Logo";
import { brand } from "@/lib/brand";
import { toast } from "sonner";
import { Check } from "lucide-react";

export type AuthMode = "signup" | "login" | "reset";

/**
 * Auth UI shell. Handlers are isolated here so a real auth backend
 * (Lovable Cloud) can be wired into `submit` without touching the marketing site.
 */
export function AuthDialog({
  open,
  mode,
  onOpenChange,
  onModeChange,
}: {
  open: boolean;
  mode: AuthMode;
  onOpenChange: (v: boolean) => void;
  onModeChange: (m: AuthMode) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const titles: Record<AuthMode, string> = {
    signup: "Create your free account",
    login: `Welcome back to ${brand.name}`,
    reset: "Reset your password",
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    await new Promise((r) => setTimeout(r, 700));
    setBusy(false);
    onOpenChange(false);
    toast.success(
      mode === "reset" ? "Reset link sent" : "Account ready",
      { description: "Connect a backend to enable real accounts." },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl p-0">
        <div className="p-6 sm:p-8">
          <DialogHeader className="items-start space-y-3">
            <LogoMark />
            <DialogTitle className="text-left text-2xl font-extrabold">{titles[mode]}</DialogTitle>
          </DialogHeader>

          {mode !== "reset" ? (
            <>
              <Button variant="outline" size="lg" className="mt-6 w-full" onClick={() => submit}>
                <span className="text-base font-bold">G</span> Continue with Google
              </Button>
              <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or use email
                <span className="h-px flex-1 bg-border" />
              </div>
            </>
          ) : null}

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="auth-email">Work email</Label>
              <Input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-11 rounded-xl"
              />
            </div>
            {mode !== "reset" ? (
              <div className="space-y-1.5">
                <Label htmlFor="auth-password">Password</Label>
                <Input
                  id="auth-password"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="h-11 rounded-xl"
                />
              </div>
            ) : null}
            <Button type="submit" variant="brand" size="lg" className="w-full" disabled={busy}>
              {busy
                ? "One moment…"
                : mode === "signup"
                  ? "Start creating free"
                  : mode === "login"
                    ? "Log in"
                    : "Send reset link"}
            </Button>
          </form>

          {mode === "signup" ? (
            <ul className="mt-5 space-y-1.5 text-sm text-muted-foreground">
              {["Free forever plan", "No credit card required", "Unlimited AI drafts on Pro"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="size-4 text-teal" /> {t}
                  </li>
                ),
              )}
            </ul>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            {mode === "login" ? (
              <>
                <button
                  type="button"
                  className="font-semibold text-primary hover:underline"
                  onClick={() => onModeChange("reset")}
                >
                  Forgot password?
                </button>
                <span>·</span>
                <button
                  type="button"
                  className="font-semibold text-primary hover:underline"
                  onClick={() => onModeChange("signup")}
                >
                  Create an account
                </button>
              </>
            ) : (
              <button
                type="button"
                className="font-semibold text-primary hover:underline"
                onClick={() => onModeChange("login")}
              >
                Already have an account? Log in
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
