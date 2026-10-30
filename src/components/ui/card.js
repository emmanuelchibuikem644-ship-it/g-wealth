/**
 * G-wealth Republic — Card Components
 */
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Card = forwardRef(function Card({ className, ...props }, ref) {
  return <div ref={ref} className={cn("rounded-xl bg-white shadow-sm", className)} {...props} />;
});

export const CardHeader = forwardRef(function CardHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cn("px-6 py-4 border-b border-border", className)} {...props} />;
});

export const CardContent = forwardRef(function CardContent({ className, ...props }, ref) {
  return <div ref={ref} className={cn("px-6 py-4", className)} {...props} />;
});

export const CardFooter = forwardRef(function CardFooter({ className, ...props }, ref) {
  return <div ref={ref} className={cn("px-6 py-4 border-t border-border", className)} {...props} />;
});

export function StatCard({ label, value, icon: Icon, trend, trendUp, className }) {
  return (
    <div className={cn("rounded-xl bg-white p-6 shadow-sm", className)}>
      <div className="flex items-center gap-4">
        {Icon && <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue/5 text-blue">{Icon}</div>}
        <div className="flex-1">
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-2xl font-bold text-blue">{value}</p>
        </div>
      </div>
      {trend && (
        <div className={cn("mt-2 flex items-center text-xs", trendUp ? "text-success" : "text-error")}>
          <span>{trendUp ? "+" : "-"}{trend}</span>
        </div>
      )}
    </div>
  );
}

export function Skeleton({ className }) {
  return <div className={cn("animate-pulse rounded-lg bg-slate-200", className)} />;
}
