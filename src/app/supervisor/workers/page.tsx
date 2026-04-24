"use client";

import { useState } from "react";
import { workers as initialWorkers, projects, siteConfig } from "@/lib/data";
import { HardHat, Search, Filter, Plus, MoreVertical, MapPin, X, User, Briefcase, Check, Activity, Shield, Zap, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function SupervisorWorkersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localWorkers, setLocalWorkers] = useState(initialWorkers);
  
  // Form State
  const [newWorker, setNewWorker] = useState({
    name: "",
    role: "Mason",
    projectId: projects[0].id,
    status: "Active" as const
  });

  const handleAddWorker = (e: React.FormEvent) => {
    e.preventDefault();
    const worker = {
      id: `w-${Date.now()}`,
      ...newWorker
    };
    setLocalWorkers([worker, ...localWorkers]);
    setIsModalOpen(false);
    setNewWorker({ name: "", role: "Mason", projectId: projects[0].id, status: "Active" });
    toast.success(`${worker.name} integrated into the operational roster.`);
  };

  const filteredWorkers = localWorkers.filter(w => 
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    w.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-grid relative pb-20">
      <div className="absolute inset-0 bg-white/60 pointer-events-none" />
      
      <div className="relative z-10 space-y-12">
        {/* Structural Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between border-b-2 border-ink pb-10">
          <div>
            <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              <div className="h-px w-8 bg-primary" />
              Human Resources / Site Operations
            </div>
            <h1 className="text-4xl font-bold tracking-tighter text-ink md:text-6xl">
              Workforce <span className="text-ink-soft">Registry.</span>
            </h1>
            <p className="mt-4 text-lg text-ink-soft max-w-xl font-medium">
              Real-time directory of certified technical personnel across all active construction zones.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center gap-6 bg-navy px-10 py-6 text-[11px] font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-ink overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/20 translate-y-full transition-transform group-hover:translate-y-0" />
            <span className="relative">Register Personnel</span>
            <Plus className="relative h-4 w-4 transition-transform group-hover:rotate-90" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col gap-px bg-border border border-border md:flex-row">
          <div className="relative flex-1 group bg-white">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft/30 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search by personnel name, role, or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-none bg-transparent px-16 py-6 text-sm focus:outline-none transition-all placeholder:text-ink-soft/20 font-bold uppercase tracking-widest"
            />
          </div>
          <button className="inline-flex items-center justify-center gap-4 bg-white px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft hover:bg-surface transition-all border-l border-border lg:border-l-0">
            <Filter className="h-4 w-4" />
            Filter by Site
          </button>
        </div>

        {/* Personnel Directory */}
        <div className="grid gap-px bg-border border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {filteredWorkers.map((worker, idx) => {
              const project = projects.find(p => p.id === worker.projectId);
              return (
                <motion.div 
                  key={worker.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group flex flex-col bg-white p-10 transition-all hover:z-20 hover:shadow-2xl hover:shadow-navy/10"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="relative h-20 w-20 bg-surface flex items-center justify-center border border-border transition-all duration-500 overflow-hidden shrink-0">
                      <div className="text-2xl font-bold text-ink/20 group-hover:text-primary/40 transition-colors">{worker.name.charAt(0)}</div>
                      <div className="absolute inset-0 pointer-events-none border-[8px] border-white/50" />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[8px] font-bold text-ink-soft/20 uppercase tracking-[0.3em] mb-2">ID: {worker.id.toUpperCase()}</span>
                      <div className="flex items-center gap-px bg-border border border-border">
                        <button className="flex h-10 w-10 items-center justify-center bg-white text-ink-soft hover:bg-navy hover:text-white transition-all shadow-sm">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 border",
                        worker.status === "Active" ? "border-emerald-500/20 text-emerald-600 bg-emerald-50" : "border-orange-500/20 text-orange-600 bg-orange-50"
                      )}>
                        {worker.status === "Active" ? "Deployment Active" : "On Leave"}
                      </span>
                      <span className="text-[10px] font-bold text-ink-soft/40 uppercase tracking-[0.2em]">{worker.role}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-ink tracking-tighter group-hover:text-primary transition-colors">{worker.name}</h3>
                  </div>

                  <div className="mt-8 pt-8 border-t border-border space-y-4">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-ink-soft uppercase tracking-wider group-hover:text-ink transition-colors">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {project?.title || "Operational Reserve"}
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-ink-soft uppercase tracking-wider group-hover:text-ink transition-colors">
                      <Activity className="h-3.5 w-3.5 text-emerald-500" />
                      Health & Safety Cleared
                    </div>
                  </div>

                  <div className="mt-10 flex gap-px bg-border border border-border">
                    <button className="flex-1 bg-white py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-ink-soft hover:bg-surface transition-all">
                      Profile Logs
                    </button>
                    <button className="flex-1 bg-white py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-white transition-all">
                      Relocate
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {filteredWorkers.length === 0 && (
            <div className="py-32 bg-white text-center space-y-6">
              <HardHat className="h-16 w-16 text-ink/10 mx-auto" />
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-ink-soft/40">No personnel detected in current parameters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Blueprint Modal: Register Personnel */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy/90 backdrop-blur-md" 
              onClick={() => setIsModalOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="relative w-full max-w-2xl bg-white border border-ink shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
              
              <div className="p-12">
                <div className="flex items-center justify-between mb-12 border-b border-border pb-8">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                      <Award className="h-4 w-4" /> Operations Registry
                    </div>
                    <h2 className="text-4xl font-bold text-ink tracking-tighter">Personnel Intake</h2>
                    <p className="mt-2 text-sm text-ink-soft uppercase tracking-wider font-medium opacity-60">Field Force Synchronisation</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="h-12 w-12 bg-surface flex items-center justify-center text-ink-soft hover:bg-ink hover:text-white transition-all">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleAddWorker} className="space-y-12">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft/40">Full Name</label>
                    <div className="relative">
                      <User className="absolute right-0 top-3 h-5 w-5 text-ink/10" />
                      <input 
                        type="text" 
                        required
                        value={newWorker.name}
                        onChange={(e) => setNewWorker({...newWorker, name: e.target.value})}
                        placeholder="OPERATIONAL NAME"
                        className="w-full border-b-2 border-border bg-white px-0 py-4 text-sm focus:border-primary focus:outline-none transition-colors font-bold uppercase tracking-widest placeholder:opacity-20"
                      />
                    </div>
                  </div>

                  <div className="grid gap-12 md:grid-cols-2">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft/40">Technical Role</label>
                      <select 
                        value={newWorker.role}
                        onChange={(e) => setNewWorker({...newWorker, role: e.target.value})}
                        className="w-full border-b-2 border-border bg-white px-0 py-4 text-sm focus:border-primary focus:outline-none appearance-none font-bold uppercase tracking-widest"
                      >
                        <option>Mason</option>
                        <option>Electrician</option>
                        <option>Plumber</option>
                        <option>Painter</option>
                        <option>Structural Welder</option>
                        <option>General Labor</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft/40">Deployment Site</label>
                      <select 
                        value={newWorker.projectId}
                        onChange={(e) => setNewWorker({...newWorker, projectId: e.target.value})}
                        className="w-full border-b-2 border-border bg-white px-0 py-4 text-sm focus:border-primary focus:outline-none appearance-none font-bold uppercase tracking-widest"
                      >
                        {projects.map(p => (
                          <option key={p.id} value={p.id}>{p.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="group w-full flex items-center justify-center gap-8 bg-navy py-8 text-[12px] font-bold uppercase tracking-[0.4em] text-white transition-all hover:bg-black shadow-2xl"
                  >
                    Integrate into Roster
                    <Zap className="h-4 w-4 fill-primary text-primary transition-transform group-hover:scale-125" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
