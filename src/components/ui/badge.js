/**
 * G-wealth Republic — Badge Components
 */
import { cn } from "@/lib/utils";

export function Badge({ children, variant = "default", className, ...props }) {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-success-bg text-success",
    warning: "bg-warning-bg text-warning",
    error: "bg-error-bg text-error",
    blue: "bg-blue/10 text-blue",
    navy: "bg-blue text-white",
    outline: "border border-border bg-transparent text-slate-600",
    info: "bg-blue-50 text-blue-700",
  };
  return (
    <span className={cn("inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium", variants[variant], className)} {...props}>
      {children}
    </span>
  );
}

export function StatusBadge({ status, label, color, className }) {
  const colorMap = {
    success: "bg-success-bg text-success",
    warning: "bg-warning-bg text-warning",
    error: "bg-error-bg text-error",
    blue: "bg-blue/10 text-blue",
    navy: "bg-blue text-white",
    info: "bg-blue-50 text-blue-700",
    slate: "bg-slate-100 text-slate-700",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-medium", colorMap[color || "slate"], className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label || status}
    </span>
  );
}

export function DemoBadge({ className }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
      DEMO
    </span>
  );
}
