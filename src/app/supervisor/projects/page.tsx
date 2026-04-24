"use client";

import { projects } from "@/lib/data";
import { Briefcase, MapPin, Calendar, ArrowUpRight, Plus, Activity, Layers, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SupervisorProjectsPage() {
  // Mock assigned projects for John
  const myProjects = projects.filter(p => p.id === "nhm-regional-center");

  return (
    <div className="min-h-screen bg-grid relative pb-20">
      <div className="absolute inset-0 bg-white/60 pointer-events-none" />
      
      <div className="relative z-10 space-y-12">
        {/* Structural Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between border-b-2 border-ink pb-10">
          <div>
            <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              <div className="h-px w-8 bg-primary" />
              Operational Portfolio
            </div>
            <h1 className="text-4xl font-bold tracking-tighter text-ink md:text-6xl">
              Assigned <span className="text-ink-soft">Assets.</span>
            </h1>
            <p className="mt-4 text-lg text-ink-soft max-w-xl">
              Official register of active infrastructure development sites under your technical supervision.
            </p>
          </div>
          <div className="flex flex-col items-end border-r-2 border-primary pr-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">Active Sites</span>
            <span className="text-3xl font-bold text-ink tracking-tighter">0{myProjects.length}</span>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {myProjects.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white border border-border shadow-2xl shadow-navy/5 overflow-hidden transition-all hover:border-primary/30"
            >
              {/* Image Header with Grayscale Transition */}
              <div className="aspect-[21/9] w-full overflow-hidden bg-surface transition-all duration-1000">
                <img 
                  src={project.image.src} 
                  alt={project.title} 
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <span className="bg-white px-3 py-1 text-[8px] font-bold uppercase tracking-widest shadow-sm">Site: {project.id.toUpperCase()}</span>
                  <span className="bg-primary text-white px-3 py-1 text-[8px] font-bold uppercase tracking-widest shadow-sm">Active Duty</span>
                </div>
              </div>

              <div className="p-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Layers className="h-4 w-4 text-primary" />
                    <span className="text-[10px] font-bold text-ink-soft/40 uppercase tracking-[0.2em]">{project.department}</span>
                  </div>
                  <span className="text-[10px] font-bold text-ink/30 uppercase tracking-[0.3em]">EST. {project.year}</span>
                </div>

                <h3 className="text-3xl font-bold text-ink tracking-tighter mb-6 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <div className="grid grid-cols-2 gap-10 mb-10">
                  <div className="space-y-2">
                    <p className="text-[9px] font-bold text-ink-soft/30 uppercase tracking-[0.2em]">Deployment Zone</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-ink">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {project.location}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] font-bold text-ink-soft/30 uppercase tracking-[0.2em]">Operational Health</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                      <Activity className="h-3.5 w-3.5" /> Synchronised
                    </div>
                  </div>
                </div>
                
                {/* Progress Indicators */}
                <div className="space-y-4 pt-10 border-t border-border">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-ink-soft/40">Construction Efficiency</span>
                    <span className="text-primary">{project.progress}%</span>
                  </div>
                  <div className="h-1 w-full bg-border overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      className="h-full bg-primary" 
                    />
                  </div>
                </div>

                <div className="mt-12 flex items-center gap-px bg-border border border-border">
                  <Link 
                    href={`/projects/${project.id}`} 
                    className="flex-1 flex items-center justify-center gap-4 bg-white py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft hover:bg-navy hover:text-white transition-all group/btn"
                  >
                    Site Plan <ExternalLink className="h-3 w-3 opacity-40 group-hover/btn:opacity-100" />
                  </Link>
                  <button className="flex-1 flex items-center justify-center gap-4 bg-white py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-white transition-all">
                    Update Logs <Activity className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Blueprint Empty State */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-border bg-surface/10 p-20 text-center group">
            <div className="h-20 w-20 bg-white border border-border flex items-center justify-center text-ink-soft/20 transition-all group-hover:border-primary/30 group-hover:text-primary/30 mb-8">
              <Plus className="h-8 w-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-ink uppercase tracking-tight">Assignment Request</h4>
              <p className="text-[10px] text-ink-soft/40 mt-3 font-bold uppercase tracking-[0.2em] max-w-[200px] mx-auto leading-relaxed">
                Contact administration to register a new project site to your regional command.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
