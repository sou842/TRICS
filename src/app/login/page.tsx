"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Circle, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { siteConfig } from "@/lib/data";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock Authentication Logic
    try {
      let role = "";
      if (email === "admin@trics.com" && password === "admin123") {
        role = "admin";
      } else if (email === "john@trics.com" && password === "sup123") {
        role = "supervisor";
      }

      if (role) {
        // Set session via server action
        const { loginAction } = await import("./actions");
        await loginAction(role, email);
        
        toast.success(`Welcome back, ${role === "admin" ? "Admin" : "Supervisor John"}`);
        router.push(role === "admin" ? "/admin" : "/supervisor");
        router.refresh(); // Refresh to update middleware state
      } else {
        toast.error("Invalid credentials. Use admin@trics.com / john@trics.com");
      }
    } catch (error) {
      toast.error("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-md">
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary mx-auto">
              <Lock className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-ink">Partner Portal</h1>
            <p className="text-ink-soft">Access the management system for {siteConfig.name} projects.</p>
          </div>

          <div className="rounded-[28px] border border-border bg-white p-8 shadow-2xl md:p-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink/40 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink/20" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@trics.com"
                    className="w-full rounded-xl border border-border bg-surface pl-12 pr-4 py-4 text-sm transition-all focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink/40 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink/20" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-border bg-surface pl-12 pr-4 py-4 text-sm transition-all focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="group w-full flex items-center justify-center gap-3 rounded-xl bg-navy py-5 text-sm font-bold text-white transition-all hover:bg-black disabled:opacity-50"
              >
                {isLoading ? "Authenticating..." : "Sign In to Portal"}
                {!isLoading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-border space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink/30 justify-center">
                <ShieldCheck className="h-3 w-3" />
                Authorized Personnel Only
              </div>
              <div className="text-[10px] text-center text-ink-soft bg-surface py-2 rounded-lg">
                <p><strong>Admin:</strong> admin@trics.com / admin123</p>
                <p><strong>Supervisor:</strong> john@trics.com / sup123</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

