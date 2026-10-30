/**
 * G-wealth Republic — Form Components
 */
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef(function Input({ className, type, label, error, ...props }, ref) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>}
      <input
        type={type}
        className={cn("w-full rounded-lg border border-border bg-white px-4 py-2.5 text-base text-slate-900 placeholder-slate-400 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20", error && "border-error focus:border-error", className)}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
});

export const Textarea = forwardRef(function Textarea({ className, label, error, ...props }, ref) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>}
      <textarea
        className={cn("w-full rounded-lg border border-border bg-white px-4 py-2.5 text-base text-slate-900 placeholder-slate-400 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20", error && "border-error focus:border-error", className)}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
});

export function Select({ label, error, className, children, ...props }) {
  return (
    <div className={cn("w-full", className)}>
      {label && <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>}
      <select className={cn("w-full rounded-lg border border-border bg-white px-4 py-2.5 text-base text-slate-900 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20", error && "border-error focus:border-error")} {...props}>
        {children}
      </select>
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
}

export function Checkbox({ label, className, ...props }) {
  return (
    <label className={cn("flex items-center gap-2 cursor-pointer text-sm text-slate-700", className)}>
      <input type="checkbox" className="h-4 w-4 rounded border-border text-navy focus:ring-gold" {...props} />
      {label && <span>{label}</span>}
    </label>
  );
}

export function Label({ children, className, ...props }) {
  return (
    <label className={cn("block text-sm font-medium text-slate-700 mb-1.5", className)} {...props}>
      {children}
    </label>
  );
}

export function InputGroup({ children, className }) {
  return <div className={cn("flex items-center gap-2", className)}>{children}</div>;
}
