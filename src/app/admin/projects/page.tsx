"use client";

import { useState } from "react";
import { projects as initialProjects } from "@/lib/data";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  MapPin, 
  ExternalLink, 
  X, 
  Briefcase, 
  Check,
  ChevronRight,
  User,
  LayoutGrid,
  List
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localProjects, setLocalProjects] = useState(initialProjects);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Form State
  const [newProject, setNewProject] = useState({
    title: "",
    client: "",
    department: "Public Works Department (PWD)",
    location: "",
    year: "2026",
    status: "Ongoing" as const,
    progress: 0
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const project = {
      id: `p-${Date.now()}`,
      ...newProject,
      image: localProjects[0].image, // Using existing image for mock
      description: `New infrastructure development in ${newProject.location}.`,
      fullDescription: `Full development of ${newProject.title} for ${newProject.client}.`,
      milestones: [],
      gallery: []
    };
    setLocalProjects([project, ...localProjects]);
    setIsModalOpen(false);
    setNewProject({ title: "", client: "", department: "Public Works Department (PWD)", location: "", year: "2026", status: "Ongoing", progress: 0 });
    toast.success(`${project.title} registered in master portfolio.`);
  };

  const filteredProjects = localProjects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12">
      {/* Structural Header */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between border-b border-border pb-10">
        <div>
          <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            <div className="h-px w-8 bg-primary" />
            Operations / Portfolio
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl">
            Asset <span className="text-ink-soft">Directory.</span>
          </h1>
          <p className="mt-4 text-lg text-ink-soft max-w-xl">
            Master repository for all government tenders and industrial infrastructure projects.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group inline-flex items-center gap-4 bg-navy px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-ink shadow-xl"
        >
          Initialize Project Site
          <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft/40 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search assets by name, location or department..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-border px-14 py-4 text-sm focus:border-primary/30 focus:outline-none transition-all placeholder:text-ink-soft/30 font-medium"
          />
        </div>
        <div className="flex items-center gap-px bg-border border border-border">
          <button 
            onClick={() => setViewMode("list")}
            className={cn(
              "flex h-12 w-12 items-center justify-center transition-colors",
              viewMode === "list" ? "bg-ink text-white" : "bg-white text-ink-soft hover:bg-surface"
            )}
          >
            <List className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setViewMode("grid")}
            className={cn(
              "flex h-12 w-12 items-center justify-center transition-colors",
              viewMode === "grid" ? "bg-ink text-white" : "bg-white text-ink-soft hover:bg-surface"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
        <button className="inline-flex items-center gap-4 bg-white border border-border px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft hover:bg-surface transition-all">
          <Filter className="h-4 w-4" />
          Refine List
        </button>
      </div>

      {/* Operational Directory */}
      <div className={cn(
        "grid gap-px bg-border border border-border",
        viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}>
        {filteredProjects.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={cn(
              "group bg-white p-8 transition-colors hover:bg-surface",
              viewMode === "list" ? "flex flex-col md:flex-row md:items-center gap-10" : "flex flex-col gap-8"
            )}
          >
            {/* Image Preview */}
            <div className={cn(
              "shrink-0 overflow-hidden bg-surface grayscale group-hover:grayscale-0 transition-all duration-700",
              viewMode === "list" ? "h-24 w-40" : "aspect-video w-full"
            )}>
              <img src={project.image.src} alt={project.title} className="h-full w-full object-cover" />
            </div>
            
            {/* Project Details */}
            <div className="flex-1 space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 border",
                      project.status === "Completed" ? "border-emerald-500/20 text-emerald-600 bg-emerald-50" : "border-primary/20 text-primary bg-primary/5"
                    )}>
                      {project.status}
                    </span>
                    <span className="text-[10px] font-bold text-ink-soft/40 uppercase tracking-[0.2em]">
                      {project.department}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-ink tracking-tight">{project.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-ink-soft uppercase tracking-widest">
                    <MapPin className="h-3 w-3 text-primary" />
                    {project.location}
                  </div>
                </div>
                <div className="flex items-center gap-px bg-border border border-border">
                  <Link 
                    href={`/projects/${project.id}`}
                    className="flex h-10 w-10 items-center justify-center bg-white text-ink-soft hover:bg-ink hover:text-white transition-all"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  <button className="flex h-10 w-10 items-center justify-center bg-white text-ink-soft hover:bg-ink hover:text-white transition-all">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Technical Metadata */}
              <div className="grid gap-6 sm:grid-cols-3 pt-6 border-t border-border">
                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-ink-soft/40 uppercase tracking-widest">Principal Client</p>
                  <p className="text-[11px] font-bold text-ink uppercase tracking-wider">{project.client}</p>
                </div>
                <div className="space-y-1 text-right sm:text-left">
                  <p className="text-[9px] font-bold text-ink-soft/40 uppercase tracking-widest">Commission Year</p>
                  <p className="text-[11px] font-bold text-ink uppercase tracking-wider">{project.year}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest">
                    <span className="text-ink-soft/40">Efficiency</span>
                    <span className={project.status === "Completed" ? "text-emerald-600" : "text-primary"}>
                      {project.status === "Completed" ? "100" : project.progress}%
                    </span>
                  </div>
                  <div className="h-0.5 w-full bg-border">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: project.status === "Completed" ? "100%" : `${project.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={cn(
                        "h-full bg-ink",
                        project.status === "Completed" ? "bg-emerald-500" : ""
                      )} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Blueprint Modal: Register New Project */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy/80 backdrop-blur-md" 
              onClick={() => setIsModalOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white p-10 border border-border shadow-2xl"
            >
              <div className="flex items-center justify-between mb-12 border-b border-border pb-8">
                <div>
                  <h2 className="text-3xl font-bold text-ink tracking-tight">Register New Asset</h2>
                  <p className="mt-2 text-sm text-ink-soft">Initialize site parameters for government tender compliance.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="h-12 w-12 border border-border flex items-center justify-center text-ink-soft hover:bg-ink hover:text-white transition-all">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleAddProject} className="space-y-10">
                <div className="grid gap-10 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft/40">Project Title</label>
                    <div className="relative">
                      <Briefcase className="absolute right-0 top-3 h-4 w-4 text-ink-soft/20" />
                      <input 
                        type="text" 
                        required
                        value={newProject.title}
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                        placeholder="Project Reference Name"
                        className="w-full border-b border-border bg-white px-0 py-4 text-sm focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft/40">Principal Client</label>
                    <div className="relative">
                      <User className="absolute right-0 top-3 h-4 w-4 text-ink-soft/20" />
                      <input 
                        type="text" 
                        required
                        value={newProject.client}
                        onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                        placeholder="Issuing Authority"
                        className="w-full border-b border-border bg-white px-0 py-4 text-sm focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-10 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft/40">Department</label>
                    <select 
                      value={newProject.department}
                      onChange={(e) => setNewProject({...newProject, department: e.target.value})}
                      className="w-full border-b border-border bg-white px-0 py-4 text-sm focus:border-primary focus:outline-none appearance-none font-medium"
                    >
                      <option>Public Works Department (PWD)</option>
                      <option>National Health Mission (NHM)</option>
                      <option>National Highways Authority (NHAI)</option>
                      <option>Private Sector</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft/40">Site Location</label>
                    <div className="relative">
                      <MapPin className="absolute right-0 top-3 h-4 w-4 text-ink-soft/20" />
                      <input 
                        type="text" 
                        required
                        value={newProject.location}
                        onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                        placeholder="Region, State"
                        className="w-full border-b border-border bg-white px-0 py-4 text-sm focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-10 md:grid-cols-2 pb-6 border-b border-border">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft/40">Strategic Year</label>
                    <input 
                      type="text" 
                      value={newProject.year}
                      onChange={(e) => setNewProject({...newProject, year: e.target.value})}
                      className="w-full border-b border-border bg-white px-0 py-4 text-sm focus:border-primary focus:outline-none font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft/40">Initial Efficiency %</label>
                    <input 
                      type="number" 
                      min="0"
                      max="100"
                      value={newProject.progress}
                      onChange={(e) => setNewProject({...newProject, progress: parseInt(e.target.value)})}
                      className="w-full border-b border-border bg-white px-0 py-4 text-sm focus:border-primary focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="group w-full flex items-center justify-center gap-6 bg-navy py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-ink shadow-2xl"
                >
                  Confirm Asset Registry
                  <Check className="h-4 w-4 transition-transform group-hover:scale-110" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
