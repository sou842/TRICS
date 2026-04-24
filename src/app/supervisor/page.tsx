"use client";

import { 
  Briefcase, 
  Users, 
  HardHat, 
  CheckCircle2,
  Calendar,
  AlertCircle,
  Activity,
  ArrowRight,
  Clock,
  Shield,
  MapPin,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { projects, users } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";

export default function SupervisorDashboard() {
  // Mock logged in supervisor John (sup-1)
  const assignedProjects = projects.filter(p => p.id === "nhm-regional-center");
  // Get workers assigned to this supervisor's projects
  const assignedWorkers = [
    { id: "w-1", name: "Rahul Sharma", role: "Mason", status: "Active", projectId: "nhm-regional-center" },
    { id: "w-2", name: "Amit Kumar", role: "Electrician", status: "Active", projectId: "nhm-regional-center" },
    { id: "w-3", name: "Suresh Singh", role: "Plumber", status: "On Leave", projectId: "nhm-regional-center" },
    { id: "w-4", name: "Vikram Das", role: "Structural Welder", status: "Active", projectId: "nhm-regional-center" },
  ];

  const stats = [
    { label: "Active Sites", value: assignedProjects.length, icon: Briefcase, trend: "+0", color: "text-primary" },
    { label: "Worker Force", value: assignedWorkers.length, icon: Users, trend: "Full Strength", color: "text-emerald-500" },
    { label: "Operational Hours", value: "08:12", icon: Clock, trend: "Site Active", color: "text-sky-500" },
    { label: "Safety Incidents", value: "00", icon: Shield, trend: "Cleared", color: "text-emerald-500" },
  ];

  return (
    <div className="min-h-screen bg-grid relative pb-20">
      <div className="absolute inset-0 bg-white/60 pointer-events-none" />
      
      <div className="relative z-10 space-y-12">
        {/* Technical Header */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between border-b-2 border-ink pb-12">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center bg-navy text-white text-[10px] font-bold uppercase tracking-tighter">Site</span>
              <div className="h-px w-12 bg-border" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink-soft">Operational Command</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tighter text-ink md:text-7xl">
              Field <span className="text-primary italic">Intelligence.</span>
            </h1>
            <p className="mt-6 text-xl text-ink-soft leading-relaxed font-medium">
              Good Morning, Supervisor. {assignedProjects.length} active project sites are currently synchronised for real-time monitoring.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex flex-col border-l-2 border-primary pl-6 py-1 bg-primary/5 pr-10">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary/60">System Time</span>
              <span className="text-2xl font-bold text-ink tracking-tight uppercase">08:45 AM</span>
            </div>
            <div className="flex items-center gap-4 bg-white border border-border p-3 shadow-soft">
              <div className="h-12 w-12 bg-navy text-white flex items-center justify-center font-bold text-lg">JS</div>
              <div className="pr-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-ink">John Smith</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-ink-soft/40 italic">Regional Supervisor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Stats Grid */}
        <div className="grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 group hover:bg-surface transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={cn("flex h-10 w-10 items-center justify-center bg-surface group-hover:bg-white transition-colors", stat.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-ink-soft/40">{stat.trend}</span>
                </div>
                <p className="text-[10px] font-bold text-ink-soft/40 uppercase tracking-[0.3em] mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-ink tracking-tighter">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Active Site Monitoring */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-ink-soft flex items-center gap-4">
                <Activity className="h-4 w-4 text-primary" /> Active Site Parameters
              </h2>
              <div className="h-px flex-1 bg-border mx-8" />
            </div>

            <div className="grid gap-12">
              {assignedProjects.map((project) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="group relative bg-white border border-border shadow-2xl shadow-navy/5 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="relative md:w-64 shrink-0 overflow-hidden bg-surface">
                      <img src={project.image.src} alt={project.title} className="h-full w-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                      <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[8px] font-bold uppercase tracking-widest">Site ID: {project.id.split('-')[0].toUpperCase()}</div>
                    </div>
                    
                    <div className="flex-1 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 border border-primary/20 text-primary bg-primary/5">Ongoing Phase II</span>
                          <span className="text-[10px] font-bold text-ink-soft/40 uppercase tracking-[0.2em]">{project.department}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-ink tracking-tighter mb-4">{project.title}</h3>
                        
                        <div className="grid grid-cols-2 gap-8 mb-8">
                          <div className="space-y-1">
                            <p className="text-[9px] font-bold text-ink-soft/30 uppercase tracking-[0.2em]">Deployment Zone</p>
                            <p className="text-sm font-bold text-ink flex items-center gap-2">
                              <MapPin className="h-3 w-3 text-primary" /> {project.location}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[9px] font-bold text-ink-soft/30 uppercase tracking-[0.2em]">Operational Status</p>
                            <p className="text-sm font-bold text-emerald-600 flex items-center gap-2">
                              <Activity className="h-3 w-3" /> Real-time Active
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-border flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="text-[9px] font-bold uppercase tracking-widest text-ink">
                            Progress: <span className="text-primary">{project.progress}%</span>
                          </div>
                          <div className="h-1 w-24 bg-border rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${project.progress}%` }}
                              className="h-full bg-primary"
                            />
                          </div>
                        </div>
                        <button className="inline-flex items-center gap-4 bg-navy px-6 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-primary shadow-xl">
                          Site Command
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Site Personnel Roster */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-ink-soft flex items-center gap-4">
              <Users className="h-4 w-4 text-primary" /> Personnel Registry
            </h2>
            
            <div className="bg-white border border-border shadow-2xl shadow-navy/5">
              <div className="p-6 border-b border-border flex items-center justify-between bg-surface/30">
                <span className="text-[10px] font-bold uppercase tracking-widest text-ink-soft">Active Force: {assignedWorkers.filter(w => w.status === "Active").length}</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">Live Updates</span>
              </div>
              <div className="divide-y divide-border">
                {assignedWorkers.map((worker) => (
                  <div key={worker.id} className="p-6 group hover:bg-surface transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="h-12 w-12 bg-surface flex items-center justify-center border border-border group-hover:bg-white transition-colors overflow-hidden">
                          <span className="text-lg font-bold text-ink/20 group-hover:text-primary/40 transition-colors">{worker.name.charAt(0)}</span>
                          <div className="absolute inset-0 pointer-events-none border-4 border-white/40" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-ink tracking-tight group-hover:text-primary transition-colors">{worker.name}</p>
                          <p className="text-[9px] font-bold text-ink-soft/40 uppercase tracking-widest mt-1">{worker.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className={cn(
                          "h-2 w-2 rounded-full",
                          worker.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-orange-500"
                        )} />
                        <ChevronRight className="h-4 w-4 text-ink-soft/20 group-hover:text-ink transition-colors" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-6 border-t border-border text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft hover:bg-navy hover:text-white transition-all">
                Access Full Registry
              </button>
            </div>

            {/* Daily Briefing Card */}
            <div className="bg-navy p-10 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <AlertCircle className="h-32 w-32" />
              </div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary mb-6 relative">Field Directives</h3>
              <p className="text-xl font-bold tracking-tight mb-8 relative">Pending safety clearance for Section D structural reinforcement.</p>
              <button className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors relative">
                Read Briefing <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
