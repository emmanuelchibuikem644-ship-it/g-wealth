
/**
 * G-wealth Republic — UI Button Component
 * Premium reusable buttons with navy, gold and outline variants.
 */

import { cn } from "@/lib/utils";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-blue text-white hover:bg-blue-secondary focus-visible:ring-blue-light shadow-sm",

    blue:
      "blue-gradient text-white hover:opacity-90 focus-visible:ring-blue-light shadow-md hover:shadow-lg",

    gold:
      "bg-gold text-slate-950 hover:bg-amber-400 focus-visible:ring-gold shadow-md hover:shadow-lg",

    outline:
      "border border-border bg-white text-blue hover:bg-ivory focus-visible:ring-blue-light",

    ghost:
      "text-slate-600 hover:bg-ivory focus-visible:ring-blue-light",

    danger:
      "bg-error text-white hover:bg-error/90 focus-visible:ring-error",

    link:
      "text-blue underline-offset-2 hover:underline focus-visible:ring-blue-light",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",

    md: "px-5 py-2.5 text-base",

    lg: "px-7 py-3 text-lg font-semibold",

    xl: "px-8 py-3.5 text-lg font-semibold",
  };

  return (
    <button
      type={type}
      className={cn(
        baseClasses,
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}

      {children}
    </button>
  );
}
