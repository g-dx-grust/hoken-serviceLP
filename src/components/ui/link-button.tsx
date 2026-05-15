import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = LinkProps & {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  prefetch?: boolean;
};

const variantClass: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-primary-fg)] hover:bg-[var(--color-primary-hover)]",
  secondary:
    "bg-[var(--color-bg-muted)] text-[var(--color-fg)] hover:bg-[var(--color-border)]",
  outline:
    "bg-transparent text-[var(--color-fg)] border border-[var(--color-border-strong)] hover:bg-[var(--color-bg-subtle)]",
  ghost:
    "bg-transparent text-[var(--color-fg)] hover:bg-[var(--color-bg-subtle)]",
};

const sizeClass: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: Props) {
  return (
    <Link
      {...rest}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[6px] font-medium transition-colors whitespace-nowrap",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
