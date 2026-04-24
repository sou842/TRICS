"use client";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { projects } from "@/lib/data";
import { CTA } from "@/components/site/CTA";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

const professionalStats = [
  { value: "250+", label: "Landmark Projects" },
  { value: "15+", label: "Core Services" },
  { value: "Govt", label: "Registered Vendor" },
  { value: "ISO", label: "Certified Firm" },
];

export default function ProjectsPage() {
  const completedProjects = projects.filter((p) => p.status === "Completed");
  const ongoingProjects = projects.filter((p) => p.status === "Ongoing");

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Structural Hero Section */}
      <section className="relative bg-white pt-40 pb-24 border-b border-border">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <nav className="mb-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink-soft">
                <Link href="/" className="hover:text-primary">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-ink">Portfolio</span>
              </nav>
              
              <h1 className="text-5xl font-bold tracking-tight text-ink md:text-7xl lg:text-8xl">
                Infrastructure <br />
                <span className="text-ink-soft">Portfolio.</span>
              </h1>
            </div>
            
            <div className="max-w-md border-l border-border pl-8">
              <p className="text-lg leading-relaxed text-ink-soft">
                A selection of our most significant contributions to national infrastructure, 
                ranging from specialized healthcare facilities to large-scale urban developments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Stats Section */}
      <section className="border-b border-border py-12">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {professionalStats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-3xl font-bold text-ink">{stat.value}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-10">
          <Tabs defaultValue="all" className="w-full">
            <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row">
              <TabsList className="h-auto w-full justify-start gap-8 bg-transparent p-0 md:w-auto">
                {["all", "completed", "ongoing"].map((val) => (
                  <TabsTrigger 
                    key={val}
                    value={val} 
                    className="relative rounded-none border-0 bg-transparent px-0 py-2 text-xs font-bold uppercase tracking-widest text-ink-soft data-[state=active]:text-ink data-[state=active]:shadow-none after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all data-[state=active]:after:w-full"
                  >
                    {val}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="hidden h-px flex-1 bg-border md:block mx-12" />
              
              <div className="text-[10px] font-bold uppercase tracking-widest text-ink-soft">
                Showing {projects.length} results
              </div>
            </div>

            <TabsContent value="all" className="mt-0 outline-none">
              <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-0 outline-none">
              <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                {completedProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="ongoing" className="mt-0 outline-none">
              <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                {ongoingProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}


