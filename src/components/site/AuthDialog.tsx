import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoMark } from "./Logo";
import { brand } from "@/lib/brand";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export type AuthMode = "signup" | "login" | "reset";

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

  async function google() {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setBusy(false);
      toast.error("Google sign-in failed", { description: result.error.message });
      return;
    }
    if (result.redirected) return;
    setBusy(false);
    onOpenChange(false);
    toast.success("Signed in");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        onOpenChange(false);
        toast.success("Account ready", { description: "You're signed in and ready to create." });
      } else if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onOpenChange(false);
        toast.success("Welcome back");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (error) throw error;
        onOpenChange(false);
        toast.success("Reset link sent", { description: `Check ${email}.` });
      }
    } catch (error) {
      toast.error("That didn't work", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setBusy(false);
    }
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
              <Button
                variant="outline"
                size="lg"
                className="mt-6 w-full"
                disabled={busy}
                onClick={() => void google()}
              >
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
