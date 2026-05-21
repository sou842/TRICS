import { useParams, Link } from "react-router-dom";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { ArrowLeft, ArrowRight, Cpu, Shield, Calendar } from "lucide-react";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Project Not Found</h1>
          <Button asChild className="mt-4">
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-20 px-6 bg-grid">
        <div className="max-w-7xl mx-auto">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary mb-4 block font-bold">{project.tag}</span>
              <h1 className="font-display text-4xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {project.desc}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1">
              <span className="text-metadata">PROJECT LOCATION</span>
              <span className="font-medium text-sm md:text-base">{project.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image */}
      <section className="px-4 md:px-6 pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-border shadow-2xl">
          <img src={project.img} alt={project.title} className="w-full aspect-[4/3] md:aspect-[21/9] object-cover" />
        </div>
      </section>

      {/* Content Grid */}
      <section className="px-6 py-12 md:py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 md:gap-16">
          <div className="lg:col-span-8 space-y-16 md:space-y-20">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Project Overview</h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {project.details}
              </p>
            </div>

            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-10">Project Milestones</h2>
              <div className="space-y-0 relative">
                {/* Vertical Line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border z-0" />
                
                {project.phases?.map((phase, idx) => (
                  <div key={phase.step} className="relative pl-12 pb-12 last:pb-0 group">
                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full bg-background border-[3px] border-foreground z-10 transition-transform group-hover:scale-125" />
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-foreground/80">
                        <Calendar className="w-4 h-4" />
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
                          {phase.date}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                        {phase.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                        {phase.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-12">
            <div className="bg-secondary/50 rounded-3xl p-8 border border-border">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8">Technical Specs</h3>
              <div className="space-y-6">
                {project.specs.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between border-b border-border/50 pb-4">
                    <span className="text-sm text-muted-foreground">{spec.label}</span>
                    <span className="font-mono font-bold text-primary">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {project.mapUrl && (
              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold px-2">Project Location</h3>
                <div className="rounded-3xl overflow-hidden border border-border aspect-square bg-muted">
                  <iframe 
                    src={project.mapUrl} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    title="Project Location"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest">Authorized Access Only</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA / Next Project */}
      <section className="px-6 py-20 md:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-center md:text-left">Ready to see more breakthroughs?</h2>
          <Button asChild variant="outline" className="rounded-full px-10 py-7 group w-full md:w-auto">
            <Link to="/projects" className="flex items-center justify-center gap-2">
              View All Initiatives <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default ProjectDetail;
