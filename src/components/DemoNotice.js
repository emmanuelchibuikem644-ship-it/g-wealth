/**
 * G-wealth Republic — Demo Notice Banner
 */
import { AlertTriangle } from "lucide-react";

export function DemoNotice({ className }) {
  return (
    <div className={`flex items-center justify-center gap-2 rounded-lg bg-amber-50 px-4 py-2.5 text-sm text-amber-800 ${className || ""}`}>
      
      <span className="font-medium">:</span>
      <span></span>
    </div>
  );
}
