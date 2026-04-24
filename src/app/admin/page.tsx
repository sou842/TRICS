"use client";

import { 
  Building2, 
  Users, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  ShieldCheck,
  FileText,
  Activity,
  ChevronRight
} from "lucide-react";
import { projects, users } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Asset Projects", value: projects.length, icon: Building2 },
    { label: "Active Supervisors", value: users.filter(u => u.role === "supervisor").length, icon: Users },
    { label: "Strategic Tenders", value: "08", icon: TrendingUp },
    { label: "Safety Compliance", value: "100%", icon: ShieldCheck },
  ];

  return (
    <div className="space-y-12">
      {/* Dashboard Header */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between border-b border-border pb-10">
        <div>
          <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            <div className="h-px w-8 bg-primary" />
            System Control
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl">
            Admin <span className="text-ink-soft">Dashboard.</span>
          </h1>
          <p className="mt-4 text-lg text-ink-soft max-w-xl">
            Real-time operational overview of national infrastructure projects and system integrity.
          </p>
        </div>
        <button className="group inline-flex items-center gap-4 bg-navy px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-ink">
          Operational Report
          <FileText className="h-4 w-4 transition-transform group-hover:scale-110" />
        </button>
      </div>

      {/* High-Contrast Stats Grid */}
      <div className="grid gap-px bg-border border border-border md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-10 group hover:bg-surface transition-colors"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex h-12 w-12 items-center justify-center bg-surface text-ink group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-[10px] font-bold text-emerald-600 tracking-widest">
                  +12.5%
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft">{stat.label}</p>
                <p className="mt-4 text-4xl font-bold text-ink tracking-tight">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        {/* Recent Projects Table View */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between border-b border-border pb-6">
            <h2 className="text-xl font-bold text-ink tracking-tight">Active Operations</h2>
            <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">
              View Directory
            </button>
          </div>
          
          <div className="space-y-1">
            {projects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (idx * 0.05) }}
                className="flex items-center justify-between bg-white border border-border p-6 hover:border-primary/20 transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 overflow-hidden bg-surface grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img src={project.image.src} alt={project.title} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink tracking-tight">{project.title}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-ink-soft mt-1">{project.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-12">
                  <div className="hidden md:block">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-ink">{project.status}</span>
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="h-0.5 w-32 bg-border">
                      <div 
                        className={cn(
                          "h-full bg-ink",
                          project.status === "Completed" ? "w-full bg-emerald-500" : "w-3/4"
                        )} 
                      />
                    </div>
                  </div>
                  <button className="h-10 w-10 border border-border flex items-center justify-center text-ink-soft hover:bg-ink hover:text-white transition-all">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Integrity & Notifications */}
        <div className="lg:col-span-4 space-y-12">
          {/* Security Card */}
          <div className="bg-navy p-10 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="mb-10 flex h-14 w-14 items-center justify-center bg-white/10 text-primary">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">System Integrity</h3>
              <p className="mt-6 text-sm leading-relaxed text-white/60">
                Encrypted government data bridge active. All 14 regional nodes operational.
              </p>
              
              <div className="mt-10 space-y-6 pt-10 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">DB Synchronicity</span>
                  <span className="text-[10px] font-bold uppercase text-emerald-400">99.9% Stable</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Portal Auth</span>
                  <span className="text-[10px] font-bold uppercase text-primary">Biometric Active</span>
                </div>
              </div>
            </div>
            {/* Structural accent */}
            <div className="absolute top-0 right-0 h-24 w-24 border-t-2 border-r-2 border-white/5 opacity-50" />
          </div>

          {/* Pending Actions */}
          <div className="border border-border p-10">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 mb-10 flex items-center gap-3">
              <Activity className="h-3 w-3" />
              Action Queue
            </h3>
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-ink">New Tender PWD-{i}</span>
                    <span className="text-[10px] font-bold text-primary italic">Priority</span>
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    Awaiting regional supervisor assignment for technical proposal phase.
                  </p>
                  <div className="mt-4 h-px w-full bg-border group-hover:bg-primary/30 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
