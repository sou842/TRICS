"use client";

import { FileText, Download, Calendar, ArrowUpRight, Filter, Eye, ShieldCheck, Activity, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function SupervisorReportsPage() {
  const reports = [
    { id: "REP-001", title: "Daily Site Log - NHM Regional", date: "April 23, 2026", type: "Operational Log", status: "Synchronised" },
    { id: "REP-002", title: "Resource Utilization Audit", date: "April 20, 2026", type: "Structural Audit", status: "Verified" },
    { id: "REP-003", title: "Material Quality Assessment", date: "April 18, 2026", type: "Quality Protocol", status: "Reviewing" },
    { id: "REP-004", title: "Worker Safety Compliance V2", date: "April 15, 2026", type: "Safety Protocol", status: "Synchronised" },
  ];

  return (
    <div className="min-h-screen bg-grid relative pb-20">
      <div className="absolute inset-0 bg-white/60 pointer-events-none" />
      
      <div className="relative z-10 space-y-12">
        {/* Document Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between border-b-2 border-ink pb-10">
          <div>
            <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              <div className="h-px w-8 bg-primary" />
              Document Control / Site Intelligence
            </div>
            <h1 className="text-4xl font-bold tracking-tighter text-ink md:text-6xl">
              Operational <span className="text-ink-soft">Logs.</span>
            </h1>
            <p className="mt-4 text-lg text-ink-soft max-w-xl font-medium">
              Institutional record of field operations, safety compliance, and structural resource audits.
            </p>
          </div>
          <button className="group relative inline-flex items-center gap-6 bg-navy px-10 py-6 text-[11px] font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-ink overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 translate-y-full transition-transform group-hover:translate-y-0" />
            <span className="relative">Initiate New Audit</span>
            <ShieldCheck className="relative h-4 w-4" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col gap-px bg-border border border-border md:flex-row">
          <div className="relative flex-1 group bg-white">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft/30 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search documents by ID or protocol type..." 
              className="w-full border-none bg-transparent px-16 py-6 text-sm focus:outline-none transition-all placeholder:text-ink-soft/20 font-bold uppercase tracking-widest"
            />
          </div>
          <button className="inline-flex items-center justify-center gap-4 bg-white px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft hover:bg-surface transition-all border-l border-border lg:border-l-0">
            <Filter className="h-4 w-4" />
            Protocol Filter
          </button>
        </div>

        {/* Document List */}
        <div className="grid gap-px bg-border border border-border">
          {reports.map((report, idx) => (
            <motion.div 
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group flex flex-col gap-8 bg-white p-10 md:flex-row md:items-center md:justify-between transition-all hover:bg-surface"
            >
              <div className="flex items-center gap-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-surface border border-border group-hover:bg-white group-hover:border-primary/20 transition-all">
                  <FileText className="h-6 w-6 text-ink-soft/40 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-[10px] font-bold text-ink-soft/40 uppercase tracking-[0.3em]">{report.id}</span>
                    <span className={cn(
                      "inline-flex border px-3 py-0.5 text-[8px] font-bold uppercase tracking-widest",
                      report.status === "Verified" ? "bg-emerald-50 text-emerald-600 border-emerald-500/20" : 
                      report.status === "Reviewing" ? "bg-orange-50 text-orange-600 border-orange-500/20" : "bg-sky-50 text-sky-600 border-sky-500/20"
                    )}>
                      {report.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-ink tracking-tight group-hover:text-primary transition-colors">{report.title}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-[10px] font-bold text-ink-soft/30 uppercase tracking-[0.2em]">{report.type}</p>
                    <div className="h-1 w-1 rounded-full bg-border" />
                    <p className="text-[10px] font-bold text-ink-soft/30 uppercase tracking-[0.2em]">{report.date}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-px bg-border border border-border md:border-0 md:bg-transparent">
                <button className="flex-1 flex items-center justify-center gap-4 bg-white px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft hover:bg-navy hover:text-white transition-all md:flex-none border border-border">
                  Preview <Eye className="h-3.5 w-3.5" />
                </button>
                <button className="flex-1 flex items-center justify-center gap-4 bg-primary px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-ink transition-all md:flex-none shadow-xl">
                  Download <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Audit Disclaimer */}
        <div className="bg-surface/50 border border-border p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <Activity className="h-10 w-10 text-primary opacity-20" />
            <p className="text-[10px] font-bold text-ink-soft/40 uppercase tracking-[0.2em] max-w-md leading-relaxed">
              All documents generated within this portal are synchronised with the master structural registry. Ensure all field data is verified before official submission.
            </p>
          </div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] border-b border-primary/20 pb-1 cursor-pointer hover:text-ink transition-colors">
            View Compliance Protocol
          </span>
        </div>
      </div>
    </div>
  );
}
