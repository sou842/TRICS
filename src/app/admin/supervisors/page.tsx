"use client";

import { useState } from "react";
import { users, projects, siteConfig } from "@/lib/data";
import { 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  MoreVertical, 
  Plus, 
  UserPlus, 
  Search, 
  Filter, 
  X, 
  Check,
  Shield,
  Briefcase,
  ExternalLink,
  Activity,
  Award,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function AdminSupervisorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const supervisors = users.filter(u => u.role === "supervisor");

  const [newSupervisor, setNewSupervisor] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Civil Engineering",
    status: "Active"
  });

  const handleOnboard = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${newSupervisor.name} has been synchronized with the central registry.`);
    setIsModalOpen(false);
    setNewSupervisor({ name: "", email: "", phone: "", department: "Civil Engineering", status: "Active" });
  };

  const filteredSupervisors = supervisors.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-grid relative pb-20">
      <div className="absolute inset-0 bg-white/60 pointer-events-none" />
      
      <div className="relative z-10 space-y-12">
        {/* Structural Header */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between border-b-2 border-ink pb-12">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center bg-navy text-white text-[10px] font-bold">HR</span>
              <div className="h-px w-12 bg-border" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink-soft">Strategic Operations</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tighter text-ink md:text-7xl">
              Personnel <span className="text-primary italic">Registry.</span>
            </h1>
            <p className="mt-6 text-xl text-ink-soft leading-relaxed">
              Managing the high-precision human infrastructure that powers {siteConfig.name}&apos;s national project portfolio.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex flex-col border-l border-border pl-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink-soft/40">Total Force</span>
              <span className="text-2xl font-bold text-ink">{supervisors.length} Certified</span>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center gap-6 bg-navy px-10 py-6 text-[11px] font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-ink overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/20 translate-y-full transition-transform group-hover:translate-y-0" />
              <span className="relative">Onboard Personnel</span>
              <UserPlus className="relative h-4 w-4 transition-transform group-hover:scale-125" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col gap-px bg-border border border-border md:flex-row">
          <div className="relative flex-1 group bg-white">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft/30 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Filter by name, credential, or regional ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-none bg-transparent px-16 py-6 text-sm focus:outline-none transition-all placeholder:text-ink-soft/20 font-bold uppercase tracking-widest"
            />
          </div>
          <button className="inline-flex items-center justify-center gap-4 bg-white px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft hover:bg-surface transition-all border-l border-border lg:border-l-0">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </button>
        </div>

        {/* Personnel Directory */}
        <div className="grid gap-px bg-border border border-border md:grid-cols-2 xl:grid-cols-3">
          {filteredSupervisors.map((supervisor, idx) => {
            const siteLoad = (supervisor.assignedProjectIds?.length || 0) * 20;
            return (
              <motion.div 
                key={supervisor.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group flex flex-col bg-white transition-all hover:z-20 hover:shadow-2xl hover:shadow-navy/10"
              >
                {/* Technical Profile Header */}
                <div className="relative p-10 border-b border-border overflow-hidden">
                  <div className="absolute top-0 right-0 p-4">
                    <span className="text-[9px] font-bold text-ink-soft/20 uppercase tracking-[0.3em]">REF: 00{idx + 1}</span>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-surface border border-border transition-all duration-700">
                      <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-ink/10 group-hover:text-primary/20">
                        {supervisor.name.charAt(0)}
                      </div>
                      <div className="absolute inset-0 pointer-events-none border-[10px] border-white/50" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-emerald-500" />
                        <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-500/20">
                          Class-A Certified
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-ink tracking-tighter leading-none">{supervisor.name}</h3>
                      <p className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">{supervisor.id}</p>
                    </div>
                  </div>
                </div>

                {/* Operations Load Indicator */}
                <div className="px-10 py-8 bg-surface/30 space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest">
                    <span className="text-ink-soft/40 flex items-center gap-2"><Zap className="h-3 w-3" /> Site Load Status</span>
                    <span className={cn(siteLoad > 60 ? "text-orange-500" : "text-emerald-500")}>{siteLoad}% Capacity</span>
                  </div>
                  <div className="h-1 w-full bg-border">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${siteLoad}%` }}
                      className={cn("h-full transition-colors", siteLoad > 60 ? "bg-orange-500" : "bg-emerald-500")}
                    />
                  </div>
                </div>

                {/* Contact Metadata */}
                <div className="p-10 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-[11px] font-bold text-ink-soft uppercase tracking-wider group-hover:text-ink transition-colors">
                      <Mail className="h-3.5 w-3.5 text-primary" />
                      {supervisor.email}
                    </div>
                    <div className="flex items-center gap-4 text-[11px] font-bold text-ink-soft uppercase tracking-wider group-hover:text-ink transition-colors">
                      <Phone className="h-3.5 w-3.5 text-primary" />
                      +91 98765 43210
                    </div>
                  </div>

                  {/* Active Site Directory */}
                  <div className="pt-8 border-t border-border">
                    <div className="mb-6 flex items-center justify-between">
                      <p className="text-[9px] font-bold text-ink-soft/40 uppercase tracking-widest">Active Site Control</p>
                      <button className="text-[9px] font-bold text-primary uppercase hover:underline">View All</button>
                    </div>
                    
                    <div className="space-y-px bg-border border border-border">
                      {supervisor.assignedProjectIds?.map(pid => {
                        const project = projects.find(p => p.id === pid);
                        return (
                          <div key={pid} className="flex items-center justify-between bg-white px-5 py-4 transition-all hover:bg-navy hover:text-white group/item">
                            <div className="flex items-center gap-3">
                              <Activity className="h-3 w-3 text-emerald-500" />
                              <span className="text-[10px] font-bold uppercase tracking-widest truncate max-w-[140px]">{project?.title || pid}</span>
                            </div>
                            <ExternalLink className="h-3 w-3 opacity-0 group-hover/item:opacity-100 transition-all scale-75" />
                          </div>
                        );
                      })}
                      {(!supervisor.assignedProjectIds || supervisor.assignedProjectIds.length === 0) && (
                        <div className="bg-white p-6 text-center italic text-[10px] text-ink-soft/40">
                          No active site assignments detected.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-8 flex gap-px bg-border mt-4">
                    <button className="flex-1 bg-white border border-border py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft transition-all hover:bg-navy hover:text-white">
                      Edit Profile
                    </button>
                    <button className="flex-1 bg-white border border-border py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary transition-all hover:bg-primary hover:text-white">
                      Assignments
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Blueprint Modal: Onboard Supervisor */}
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
              className="relative w-full max-w-3xl bg-white border border-ink shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
              
              <div className="p-12">
                <div className="flex items-center justify-between mb-12 border-b border-border pb-8">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                      <Award className="h-4 w-4" /> Institutional Registration
                    </div>
                    <h2 className="text-4xl font-bold text-ink tracking-tighter">Onboard Personnel</h2>
                    <p className="mt-2 text-sm text-ink-soft uppercase tracking-wider font-medium opacity-60">Master Registry Synchronisation</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="h-12 w-12 bg-surface flex items-center justify-center text-ink-soft hover:bg-ink hover:text-white transition-all">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleOnboard} className="space-y-12">
                  <div className="grid gap-12 md:grid-cols-2">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft/40">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={newSupervisor.name}
                        onChange={(e) => setNewSupervisor({...newSupervisor, name: e.target.value})}
                        placeholder="e.g. ARJUN VERMA"
                        className="w-full border-b-2 border-border bg-white px-0 py-4 text-sm focus:border-primary focus:outline-none transition-colors font-bold uppercase tracking-widest placeholder:opacity-20"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft/40">Institutional Email</label>
                      <input 
                        type="email" 
                        required
                        value={newSupervisor.email}
                        onChange={(e) => setNewSupervisor({...newSupervisor, email: e.target.value})}
                        placeholder={`CREDENTIALS@${siteConfig.name.toUpperCase()}.COM`}
                        className="w-full border-b-2 border-border bg-white px-0 py-4 text-sm focus:border-primary focus:outline-none transition-colors font-bold uppercase tracking-widest placeholder:opacity-20"
                      />
                    </div>
                  </div>

                  <div className="grid gap-12 md:grid-cols-2">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft/40">Operational Department</label>
                      <select 
                        value={newSupervisor.department}
                        onChange={(e) => setNewSupervisor({...newSupervisor, department: e.target.value})}
                        className="w-full border-b-2 border-border bg-white px-0 py-4 text-sm focus:border-primary focus:outline-none appearance-none font-bold uppercase tracking-widest"
                      >
                        <option>Civil Infrastructure</option>
                        <option>Mechanical Systems</option>
                        <option>Field Supervision</option>
                        <option>Safety Operations</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft/40">Secure Contact</label>
                      <input 
                        type="text" 
                        required
                        value={newSupervisor.phone}
                        onChange={(e) => setNewSupervisor({...newSupervisor, phone: e.target.value})}
                        placeholder="+91-XXXXX-XXXXX"
                        className="w-full border-b-2 border-border bg-white px-0 py-4 text-sm focus:border-primary focus:outline-none transition-colors font-bold uppercase tracking-widest placeholder:opacity-20"
                      />
                    </div>
                  </div>

                  <div className="pt-8 flex flex-col gap-6">
                    <p className="text-[9px] text-ink-soft/40 leading-relaxed max-w-lg">
                      By proceeding, you certify that this personnel has undergone mandatory safety clearances and is authorized for institutional site control under {siteConfig.fullName}.
                    </p>
                    <button 
                      type="submit" 
                      className="group w-full flex items-center justify-center gap-8 bg-navy py-8 text-[12px] font-bold uppercase tracking-[0.4em] text-white transition-all hover:bg-black shadow-2xl"
                    >
                      Authorize Personnel Registry
                      <Zap className="h-4 w-4 fill-primary text-primary transition-transform group-hover:scale-125" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
