"use client";

/**
 * G-wealth Republic — Admin Login Page
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form";
import { useAuth } from "@/components/auth/AuthContext";
import { DemoNotice } from "@/components/DemoNotice";
import { DEMO_LOGIN } from "@/lib/constants";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState(DEMO_LOGIN.email);
  const [password, setPassword] = useState(DEMO_LOGIN.password);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(email, password);
    if (result.success) {
      router.push("/admin");
    } else {
      setError(result.error || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-blue flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-10 w-10 text-blue-light" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-white">
            G-wealth <span className="text-blue-light">Republic</span>
          </h1>
          <p className="text-slate-300 mt-2">Admin Dashboard</p>
        </div>

        <DemoNotice className="mb-6" />

        <div className="rounded-xl bg-white p-8 shadow-xl">
          <h2 className="font-serif text-2xl font-bold text-navy mb-6">Administrator Sign In</h2>

          {error && <p className="mb-4 text-sm text-error">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border px-4 py-2.5 text-base focus:border-blue-light focus:outline-none focus:ring-2 focus:ring-blue-light/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-border px-4 py-2.5 pr-12 text-base focus:border-blue-light focus:outline-none focus:ring-2 focus:ring-blue-light/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full" loading={loading}>
              Sign In
            </Button>
          </form>

          <div className="mt-6 rounded-lg bg-amber-50 p-4">
            <p className="text-xs text-amber-800">
              <strong>Demo credentials:</strong><br />
              Email: {DEMO_LOGIN.email}<br />
              Password: {DEMO_LOGIN.password}
              <br /><br />
              This is a demo authentication system. In production, use secure server-side authentication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
