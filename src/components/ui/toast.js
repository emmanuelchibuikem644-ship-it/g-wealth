/**
 * G-wealth Republic — Toast Notification System
 */
import { createContext, useContext, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now().toString();
    const newToast = { id, ...toast };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), toast.duration || 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = { addToast, removeToast };
  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}

function ToastContainer({ toasts, onRemove }) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div key={toast.id} className={cn("max-w-sm rounded-lg border p-4 shadow-lg", toast.type === "error" ? "border-error bg-error-bg" : toast.type === "success" ? "border-success bg-success-bg" : "border-border bg-white")}>
          <div className="flex items-start gap-3">
            <div className={cn("mt-0.5 h-5 w-5 flex-shrink-0 rounded-full", toast.type === "error" ? "bg-error" : toast.type === "success" ? "bg-success" : "bg-slate-300")}></div>
            <div className="flex-1">
              <p className="font-medium text-slate-900">{toast.title}</p>
              {toast.message && <p className="mt-1 text-sm text-slate-600">{toast.message}</p>}
            </div>
            <button onClick={() => onRemove(toast.id)} className="text-slate-400 hover:text-slate-600">✕</button>
          </div>
        </div>
      ))}
    </div>
  );
}
