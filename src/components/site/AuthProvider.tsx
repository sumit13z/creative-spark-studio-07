import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { AuthDialog, type AuthMode } from "./AuthDialog";
import { AuthProvider as SessionProvider } from "@/hooks/useAuth";

type Ctx = { open: (mode?: AuthMode) => void };
const AuthUiContext = createContext<Ctx>({ open: () => {} });

export function useAuthUi() {
  return useContext(AuthUiContext);
}

export function AuthUiProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signup");

  const open = useCallback((m: AuthMode = "signup") => {
    setMode(m);
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <SessionProvider>
      <AuthUiContext.Provider value={value}>
        {children}
        <AuthDialog open={isOpen} mode={mode} onOpenChange={setIsOpen} onModeChange={setMode} />
      </AuthUiContext.Provider>
    </SessionProvider>
  );
}
