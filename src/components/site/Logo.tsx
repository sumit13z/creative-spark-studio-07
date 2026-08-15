import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";

/** Original wordmark: layered "V" prism in the brand gradient. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-xl gradient-brand shadow-glow",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none">
        <path d="M4 5.5h5.2L12 13l2.8-7.5H20L13.6 21h-3.2L4 5.5Z" fill="white" opacity="0.95" />
        <path d="M9 5.5h3l-1.5 4L9 5.5Z" fill="white" opacity="0.6" />
      </svg>
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn("flex min-w-0 items-center gap-2.5", className)}
      aria-label={`${brand.name} home`}
    >
      <LogoMark />
      <span className="truncate text-[17px] font-extrabold tracking-tight text-ink">
        {brand.shortName}
        <span className="text-gradient"> AI</span>
      </span>
    </Link>
  );
}
